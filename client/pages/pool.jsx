import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Stack,
  Link as ChakraLink,
  Checkbox,
  Input,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

import ReactMarkdown from "react-markdown";

import Loading from "@/components/Animation/Loading";

import RegistrationModal from "@/components/RegistrationModal";

import { getPool } from "@/utils/tableland";

import {
  calculateRemainingCreditsForAllocator,
  formatCurrency,
  processPoolStateAndRemainingTime,
  calculateQuadraticVotingPercentages,
  fetchRecipientMetadata,
  sortRecipientsByPercentage,
  getTime,
  alreadyReviewedRecipient,
  getUserProfileRole,
  formatDuration,
} from "@/utils/utils";

import { STRATEGY_ABI } from "@/constants/QVHatsSablierStrategy";

import { DAI_ABI, DAI_ADDRESS } from "@/constants/DAI";

import { ALLO_CONTRACT_ABI, ALLO_CONTRACT_ADDRESS } from "@/constants/Allo";

import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import { AbiCoder } from "ethers";

const Pool = () => {
  const router = useRouter();
  const toast = useToast();
  const { poolID } = router.query;
  const [pool, setPool] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [Access, setAccess] = useState("");
  const [detailsFetched, setDetailsFetched] = useState(false);
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegModalOpen, setRegModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [reviewVotes, setReviewVotes] = useState({});
  const [allocationVotes, setAllocationVotes] = useState({});
  const [toggleReview, setToggleReview] = useState(false);

  const [selectedRecipients, setSelectedRecipients] = useState({});

  // Function to handle recipient selection
  const handleRecipientSelection = (recipientID, isSelected) => {
    setSelectedRecipients((prev) => ({
      ...prev,
      [recipientID]: isSelected,
    }));
    if (pool.poolState != "ProjectsRoundTwoEvaluation") {
      handleReviewVoteChange(recipientID, 2);
    } else {
      handleReviewVoteChange(recipientID, 6);
    }
  };

  // Function to handle review vote changes
  const handleReviewVoteChange = (recipientID, vote) => {
    setReviewVotes((prevVotes) => ({ ...prevVotes, [recipientID]: vote }));
    console.log(reviewVotes);
  };

  // Function to handle allocation vote changes
  const handleAllocationVoteChange = (recipientAddress, vote) => {
    setAllocationVotes((prev) => ({ ...prev, [recipientAddress]: vote }));
  };

  const handleViewRecipient = async (recipientID) => {
    const recipient = recipients.find((r) => r.recipientID === recipientID);
    if (recipient) {
      const metadata = await fetchRecipientMetadata(recipient);
      setSelectedRecipient({ ...recipient, metadata });
      openModal();
    }
  };

  const handleRegistrationSubmit = (formData) => {
    console.log("Submitted data:", formData);
    // Implement submission logic here
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openRegModal = () => setRegModalOpen(true);
  const closeRegModal = () => setRegModalOpen(false);

  useEffect(() => {
    console.log(allocationVotes);
  }, [allocationVotes, selectedRecipients]);

  const reviewRecipients = async (recipients, roundOne) => {
    const recipientIDs = Object.keys(recipients);
    let votes = Object.values(recipients);
    let roundTwoCancelations = [];
    if (!roundOne) {
      votes = votes.map((vote) => {
        roundTwoCancelations.push(6);
      });
    }
    try {
      const data = await publicClient?.simulateContract({
        account,
        address: pool.poolDetails.strategy,
        abi: STRATEGY_ABI,
        functionName: "reviewRecipients",
        args: [recipientIDs, roundOne ? votes : roundTwoCancelations],
      });
      console.log(data);
      if (!walletClient) {
        console.log("Wallet client not found");
        return;
      }
      // @ts-ignore
      const hash = await walletClient.writeContract(data.request);
      console.log("Transaction Sent");
      const transaction = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });
      toast({
        title: "You Successfully reviewed the pool applicants",
        status: "success",
        colorScheme: "blue",
      });

      setTimeout(() => {
        router.reload();
      }, 1500);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const AllocateVotes = async (recipients) => {
    const recipientIDs = Object.keys(recipients);
    const votes = Object.values(recipients);
    const dataArray = [];
    const poolIDs = [];
    const abiCoder = new AbiCoder();
    for (let i = 0; i < recipientIDs.length; i++) {
      let data = abiCoder.encode(
        ["address", "uint256"],
        [recipientIDs[i], votes[i]]
      );
      dataArray.push(data);
      poolIDs.push(poolID);
    }

    try {
      const data = await publicClient?.simulateContract({
        account,
        address: ALLO_CONTRACT_ADDRESS,
        abi: ALLO_CONTRACT_ABI,
        functionName: "batchAllocate",
        args: [poolIDs, dataArray],
      });
      console.log(data);
      if (!walletClient) {
        console.log("Wallet client not found");
        return;
      }
      // @ts-ignore
      const hash = await walletClient.writeContract(data.request);
      console.log("Transaction Sent");
      const transaction = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });

      toast({
        title:
          "You Successfully allocated creadits to the selected pool applicants",
        status: "success",
        colorScheme: "blue",
      });

      setTimeout(() => {
        router.reload(); // Replace '/' with the path to your home page
      }, 1500);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const Distribute = async () => {
    let addressArray = [];
    recipients.map((recipient, index) => {
      if (
        recipient.reviewStatusRoundOne == "Accepted" &&
        recipient.isCanceledRoundTwo == "false"
      )
        addressArray.push(recipient.recipientAddress);
    });

    if (addressArray.length == 0) {
      return;
    }

    try {
      const data = await publicClient?.simulateContract({
        account,
        address: ALLO_CONTRACT_ADDRESS,
        abi: ALLO_CONTRACT_ABI,
        functionName: "distribute",
        args: [poolID, addressArray, "0x00"],
      });
      console.log(data);
      if (!walletClient) {
        console.log("Wallet client not found");
        return;
      }
      // @ts-ignore
      const hash = await walletClient.writeContract(data.request);
      console.log("Transaction Sent");
      const transaction = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });

      toast({
        title: "You Successfully Distributed the funds",
        status: "success",
        colorScheme: "blue",
      });
      setTimeout(() => {
        router.reload(); // Replace '/' with the path to your home page
      }, 1500);
      return true;
    } catch (error) {
      console.log(error);
      toast({
        title: "Distribution failed only admin can distribute",
        status: "warning",
      });
      return false;
    }
  };

  const processPoolsWithMetadata = async (pools) => {
    const processedPools = [];

    try {
      let pool = pools[0];
      let CID = pool.poolDetails.poolMetadata;
      console.log(CID);
      const metadataResponse = await axios.get(`https://ipfs.io/ipfs/${CID}`);
      const metadata = metadataResponse.data;
      if (metadata.metadata) {
        const metadataResponse2 = await axios.get(`${metadata.metadata}`);
        metadata.image = metadataResponse2.data.image;
      }

      const time = await getTime();
      let poolState;
      let remainingTime;
      let res = processPoolStateAndRemainingTime(pool, time);
      poolState = res.poolState;
      remainingTime = res.remainingTime;
      let poolAmount1 = await publicClient.readContract({
        address: DAI_ADDRESS,
        abi: DAI_ABI,
        functionName: "balanceOf",
        args: [pool.poolDetails.strategy],
      });

      let poolAmount = formatCurrency(poolAmount1.toString());

      processedPools.push({
        ...pool,
        metadata,
        poolState,
        poolAmount: poolAmount.toString(),
        remainingTime,
      });
    } catch (error) {
      console.error("Error processing pools:", error);
      return []; // Return an empty array or handle the error as needed
    }

    return processedPools;
  };

  useEffect(() => {
    const fetchData = async () => {
      const pooll = await getPool(poolID);
      const processedPools = await processPoolsWithMetadata([pooll[0]]);

      const role = await getUserProfileRole(
        account,
        processedPools[0]?.poolDetails.adminHat
      );
      setAccess(role);
      console.log(processedPools);
      setPool(processedPools[0]);
      let registrants = processedPools[0]?.registeredRecipients;

      if (processedPools[0]?.allocatorsInfo && registrants) {
        let percentages = calculateQuadraticVotingPercentages(
          processedPools[0].allocatorsInfo
        );
        registrants.forEach((registrant) => {
          registrant.poolPercentage = percentages[registrant.recipientID];
        });
      }

      sortRecipientsByPercentage(registrants);
      setRecipients(registrants);
      setDetailsFetched(true);
    };

    if (poolID && !detailsFetched) fetchData();
  }, [poolID]);

  return (
    <div className="bg-gradient-to-r from-gray via-gray to-gray-800">
      {detailsFetched && pool ? (
        <div className="my-[10%]">
          <Box w="full">
            <Flex
              direction="column"
              align="center"
              bg="gray.100"
              className="text-black font-bold"
              p={6}
              mx="35%"
              mt="5%"
              borderRadius="lg"
              boxShadow="md"
            >
              {Access && (
                <Badge colorScheme={Access === "ADMIN" ? "red" : "blue"} mb={5}>
                  {" "}
                  {`You are wearing the ${Access} Hat`}
                </Badge>
              )}

              <AspectRatio ratio={1} w="150px" mb={4}>
                <Image
                  src={
                    detailsFetched
                      ? `data:image/png;base64,${pool?.metadata.image}`
                      : "placeholder_image_url"
                  }
                  alt="Pool Image"
                  borderRadius="full"
                />
              </AspectRatio>

              <Text fontSize="3xl" fontWeight="bold" mb={2}>
                {detailsFetched ? pool?.metadata.name : "Loading Pool Name..."}
              </Text>

              <Text
                bg="gray.100"
                rounded="md"
                borderTop="1px"
                borderColor="gray.300"
                fontSize="sm"
                color="gray.700"
                p={3}
                mb={2}
                noOfLines={3}
                overflowY="scroll"
                className="flex flex-col items-center"
              >
                {pool.metadata.description}
              </Text>

              <Badge
                colorScheme={
                  pool?.poolState === "RegistrationPeriod" ? "green" : "red"
                }
                mb={4}
              >
                {pool?.poolState || "ENDED"} {pool?.remainingTime || "0"}
              </Badge>

              <Flex
                className="flex items-center text-center"
                direction="row"
                align="center"
                gap={8}
                mb={4}
              >
                <Tooltip
                  placement="top"
                  label="Round One Distribution Percentage"
                >
                  <div className="flex flex-col items-center border border-gray-300 border-1 p-2 rounded">
                    <Text>ROD</Text>
                    <Text>{pool.poolDetails?.ROP || 50}%</Text>
                  </div>
                </Tooltip>
                <div className="flex flex-col items-center border border-gray-300 border-1 p-2 rounded">
                  <Text>Pool Amount </Text>
                  <Text>{pool.poolAmount} DAI</Text>
                </div>
                <Tooltip placement="top" label="Projects Working Duration">
                  <div className="flex flex-col items-center border border-gray-300 border-1 p-2 rounded">
                    <Text>PWD </Text>
                    <Text>{formatDuration(pool.poolDetails?.PWDs || 1)}</Text>
                  </div>
                </Tooltip>
                <Tooltip
                  placement="top"
                  label="Voting Threshold is the amount of votes that someone needs to get accepted or rejected from the pool"
                >
                  <div className="flex flex-col items-center border border-gray-300 border-1 p-2 rounded">
                    <Text>Threshold </Text>
                    <Text>{pool.poolDetails?.threshold || 1}</Text>
                  </div>
                </Tooltip>
              </Flex>

              {pool.poolState === "RegistrationPeriod" && (
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      router.push({
                        pathname: `/profile`,
                        query: { orgID: pool.poolDetails?.creatorProfileID },
                      });
                    }}
                  >
                    View Creator
                  </Button>
                  <Button colorScheme="blue" onClick={openRegModal}>
                    Apply in Pool
                  </Button>
                </div>
              )}
            </Flex>

            <RegistrationModal
              isOpen={isRegModalOpen}
              onClose={closeRegModal}
              onSubmit={handleRegistrationSubmit}
              poolID={poolID}
            />

            <Box className="flex flex-col items-center " mx="30%" my={3}>
              {(Access == "ADMIN" ||
                Access == "MANAGER" ||
                Access == "REVIEWER") &&
                (pool.poolState == "RegistrationPeriod" ||
                  pool.poolState == "AllocationPeriod" ||
                  pool.poolState == "ProjectsRoundTwoEvaluation") && (
                  <Box
                    mx="10%"
                    my={3}
                    className="flex flex-col items-center text-gray-300"
                  >
                    <Text fontSize="l" fontWeight="bold">
                      {pool.poolState == "RegistrationPeriod"
                        ? "Review Projects"
                        : pool.poolState == "AllocationPeriod"
                          ? `Allocate VotesRemaining: ${calculateRemainingCreditsForAllocator(
                              pool.allocatorsInfo,
                              account?.toLowerCase(),
                              pool.poolDetails?.votesPerAllocator
                            )}`
                          : pool.poolState == "ProjectsRoundTwoEvaluation"
                            ? "Evaluate Projects"
                            : ""}
                    </Text>
                    <div className="flex flex-wrap items-center">
                      <Switch
                        colorScheme="blue"
                        defaultChecked={toggleReview}
                        onChange={(e) => {
                          setToggleReview(!toggleReview);
                          // Update your review object here as needed
                        }}
                      />
                    </div>
                  </Box>
                )}
              <Box
                mx="10%"
                my={3}
                className="flex flex-col items-center bg-gray-100 rounded-xl"
              >
                <Table colorScheme="black" className="rounded-xl" size="md">
                  <Thead rounded={"xl"}>
                    <Tr rounded={"xl"}>
                      <Th
                        isNumeric
                        textAlign="center"
                        align="center"
                        rounded={"xl"}
                      >
                        Rank
                      </Th>
                      <Th
                        textAlign="center"
                        border="1px"
                        borderColor="gray.300"
                      >
                        Project
                      </Th>
                      <Th
                        textAlign="center"
                        border="1px"
                        borderColor="gray.300"
                      >
                        Status
                      </Th>

                      {(Access === "MANAGER" ||
                        Access === "ADMIN" ||
                        Access === "REVIEWER") &&
                        (pool.poolState === "RegistrationPeriod" ||
                          pool.poolState === "AllocationPeriod" ||
                          pool.poolState === "ProjectsRoundTwoEvaluation") &&
                        toggleReview && (
                          <Th
                            textAlign="center"
                            border="1px"
                            borderColor="gray.300"
                          >
                            Accept?
                          </Th>
                        )}
                      {(Access === "MANAGER" || Access === "ADMIN") &&
                        pool.poolState === "AllocationPeriod" &&
                        toggleReview && (
                          <Th
                            textAlign="center"
                            border="1px"
                            borderColor="gray.300"
                          >
                            Allocate Votes
                          </Th>
                        )}
                      <Th
                        textAlign="center"
                        border={"1px"}
                        borderColor="gray.300"
                      >
                        Details
                      </Th>
                      {/* {toggleReview &&  */}
                      <Th textAlign="center">Select</Th>
                      {/* // } */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recipients.map(
                      (recipient, index) =>
                        (recipient.reviewStatusRoundOne === "Accepted" ||
                          recipient.reviewStatusRoundOne === "Pending") && (
                          <Tr key={index}>
                            <Td isNumeric borderColor="gray.300">
                              <Flex textAlign="center" ml={3}>
                                <Tooltip
                                  placement="top"
                                  label={`Recieved ${(
                                    recipient.poolPercentage * 100
                                  ).toFixed(2)}% of votes`}
                                >
                                  <Text>{index + 1}</Text>
                                </Tooltip>
                              </Flex>
                            </Td>
                            <Td border="1px" borderColor="gray.300">
                              <Flex align="center" mx={"23%"}>
                                <Text>
                                  {recipient.name ? recipient.name : ""}
                                </Text>
                                <ChakraLink
                                  as={Button}
                                  onClick={() => {
                                    router.push({
                                      pathname: `/profile/`,
                                      query: {
                                        orgID: recipient.recipientID,
                                      },
                                    });
                                  }}
                                >
                                  <FaExternalLinkAlt />
                                </ChakraLink>
                              </Flex>
                            </Td>
                            <Td border="1px" borderColor="gray.300">
                              <Badge
                                colorScheme={
                                  recipient?.reviewStatusRoundOne === "Accepted"
                                    ? "green"
                                    : recipient?.reviewStatusRoundOne ===
                                        "Rejected"
                                      ? "red"
                                      : "yellow" || "yellow"
                                }
                              >
                                {recipient?.reviewStatusRoundOne}
                              </Badge>
                            </Td>

                            {(Access === "MANAGER" ||
                              Access === "ADMIN" ||
                              Access === "REVIEWER") &&
                              (pool.poolState == "AllocationPeriod" ||
                                pool.poolState == "RegistrationPeriod" ||
                                pool.poolState ==
                                  "ProjectsRoundTwoEvaluation") &&
                              toggleReview && (
                                <Td
                                  textAlign="center"
                                  border="1px"
                                  borderColor="gray.300"
                                >
                                  <Switch
                                    colorScheme="blue"
                                    defaultChecked={true}
                                    disabled={
                                      (!selectedRecipients[
                                        recipient.recipientAddress
                                      ] ||
                                        (recipient.reviewStatusRoundOne ==
                                          "Accepted" &&
                                          pool.poolState !=
                                            "ProjectsRoundTwoEvaluation") ||
                                        (recipient.reviewStatusRoundOne ==
                                          "Rejected" &&
                                          pool.poolState !=
                                            "ProjectsRoundTwoEvaluation")) &&
                                      (!alreadyReviewedRecipient(recipient) ||
                                        (pool.poolState ==
                                          "ProjectsRoundTwoEvaluation" &&
                                          recipient.isCanceledRoundTwo ==
                                            "false"))
                                    }
                                    onChange={(e) => {
                                      handleReviewVoteChange(
                                        recipient.recipientAddress,
                                        e.target.checked ? 2 : 3
                                      );
                                    }}
                                  />
                                </Td>
                              )}
                            {(Access === "MANAGER" || Access === "ADMIN") &&
                              pool.poolState == "AllocationPeriod" &&
                              toggleReview && (
                                <Td
                                  textAlign="center"
                                  border="1px"
                                  borderColor="gray.300"
                                >
                                  <Input
                                    type="number"
                                    size="sm"
                                    width="100px"
                                    disabled={
                                      !selectedRecipients[
                                        recipient.recipientAddress
                                      ]
                                    }
                                    onChange={(e) => {
                                      handleAllocationVoteChange(
                                        recipient.recipientAddress,
                                        e.target.value
                                      );
                                      // Update your allocation object here as needed
                                    }}
                                  />
                                </Td>
                              )}
                            <Td
                              textAlign="center"
                              border={"1px"}
                              borderColor="gray.300"
                            >
                              <Button
                                onClick={() =>
                                  handleViewRecipient(recipient.recipientID)
                                }
                              >
                                View
                              </Button>
                            </Td>
                            <Td textAlign="center" borderColor="gray.300">
                              <Checkbox
                                colorScheme="blue"
                                className="border border-black rounded-sm"
                                onChange={(e) =>
                                  handleRecipientSelection(
                                    recipient.recipientAddress,
                                    e.target.checked
                                  )
                                }
                              />
                            </Td>
                          </Tr>
                        )
                    )}
                  </Tbody>
                </Table>
              </Box>
              <div></div>
            </Box>
            <Box w="full" className="flex flex-col items-center mt-5">
              {pool.poolState == "RegistrationPeriod" && Access != "NONE" ? (
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    await reviewRecipients(reviewVotes, true);
                  }}
                >
                  Review
                </Button>
              ) : pool.poolState == "AllocationPeriod" &&
                (Access == "ADMIN" || Access == "MANAGER") ? (
                <div className="flex flex-col items-center">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      colorScheme="blue"
                      onClick={async () => {
                        await reviewRecipients(reviewVotes, true);
                      }}
                    >
                      Review
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={async () => {
                        await AllocateVotes(allocationVotes);
                      }}
                    >
                      Allocate
                    </Button>
                  </div>
                </div>
              ) : pool.poolState == "ProjectsRoundTwoEvaluation" &&
                Access != "NONE" ? (
                <div>
                  <Button
                    colorScheme="blue"
                    onClick={async () => {
                      await reviewRecipients(reviewVotes, false);
                    }}
                  >
                    Cancel Projects
                  </Button>
                </div>
              ) : (
                (pool.poolState == "WaitingForStreamDistribution" ||
                  pool.poolState == "WaitingForFinalDistribution") &&
                Access == "ADMIN" && (
                  <div>
                    <Button
                      colorScheme="blue"
                      onClick={async () => {
                        await Distribute();
                      }}
                    >
                      {pool.poolState == "WaitingForStreamDistribution"
                        ? "DistributeRoundOne"
                        : "DistributeRoundTwo"}
                    </Button>
                  </div>
                )
              )}
            </Box>

            {/* Recipient Details Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
              <ModalOverlay />
              <ModalContent my="auto">
                <ModalHeader>{selectedRecipient?.metadata.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <ReactMarkdown>
                    {selectedRecipient?.metadata.description}
                  </ReactMarkdown>
                  {/* Markdown for milestones */}
                  <ReactMarkdown>
                    {selectedRecipient?.metadata.milestones}
                  </ReactMarkdown>
                </ModalBody>
              </ModalContent>
            </Modal>

            {/* Registration Modal (existing logic) */}
            <RegistrationModal
              isOpen={
                detailsFetched &&
                pool.reviewStatusRoundOne === "RegistrationPeriod"
              }
              onClose={closeModal}
              poolID={poolID}
              onSubmit={handleRegistrationSubmit}
            />
          </Box>
        </div>
      ) : (
        <Box
          w="1/2"
          className="bg-gradient-to-r from-gray-700 to-gray-800"
          bg="bg-gradient-to-r from-gray-700 to-gray-800"
        >
          <Loading />
        </Box>
      )}
    </div>
  );
};

export default Pool;
