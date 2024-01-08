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
  useColorModeValue,
  Stack,
  Link as ChakraLink,
  Checkbox,
  Input,
  Switch,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

import ReactMarkdown from "react-markdown";

import Navbar from "@/components/navbar";

import RegistrationModal from "@/components/RegistrationModal";

import { getPool } from "@/utils/tableland";

import { calculateRemainingTime, formatCurrency } from "@/utils/utils";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/HackRegistry";

import { STRATEGY_ABI } from "@/constants/QVHatsSablierStrategy";

import { DAI_ABI, DAI_ADDRESS } from "@/constants/DAI";

import { ALLO_CONTRACT_ABI, ALLO_CONTRACT_ADDRESS } from "@/constants/Allo";

import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import { encodeFunctionData } from "viem";

import { AbiCoder } from "ethers";

const Pool = () => {
  const router = useRouter();
  const { poolID, Access } = router.query;
  const [pool, setPool] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [detailsFetched, setDetailsFetched] = useState(false);
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegModalOpen, setRegModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [reviewVotes, setReviewVotes] = useState({});
  const [allocationVotes, setAllocationVotes] = useState({});
  const [toggleReview, setToggleReview] = useState(true);

  const [selectedRecipients, setSelectedRecipients] = useState({});

  // Function to handle recipient selection
  const handleRecipientSelection = (recipientID, isSelected) => {
    setSelectedRecipients((prev) => ({
      ...prev,
      [recipientID]: isSelected,
    }));
  };

  const reviewRecipients = async (recipients) => {
    const recipientIDs = Object.keys(recipients);
    const votes = Object.values(recipients);
    try {
      const data = await publicClient?.simulateContract({
        account,
        address: pool.poolDetails.strategy,
        abi: STRATEGY_ABI,
        functionName: "reviewRecipients",
        args: [recipientIDs, votes],
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
      return true;
    } catch (error) {
      console.log(error);
      return false;
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

  function calculateRemainingVotes() {
    let remainingVotes = 0;

    pool.allocatorsInfo.forEach((allocator) => {
      const totalVotesAllocated = Math.sqrt(allocator.totalVotesAllocated);

      allocator.allocations.forEach((allocation) => {
        if (allocation.recipientID === account.toLowerCase()) {
          remainingVotes +=
            pool.poolDetails.votesPerAllocator - totalVotesAllocated;
        }
      });
    });

    return remainingVotes;
  }

  useEffect(() => {
    // Do something with allocationVotes
    console.log(allocationVotes);
  }, [allocationVotes]); // Dependency array ensures this runs when allocationVotes changes
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openRegModal = () => setRegModalOpen(true);
  const closeRegModal = () => setRegModalOpen(false);

  const fetchRecipientMetadata = async (recipient) => {
    const metadataResponse = await axios.get(
      `https://cloudflare-ipfs.com/ipfs/${recipient.metadata}`
    );
    return metadataResponse.data;
  };

  function sortRecipientsByPercentage(recipients) {
    recipients.sort((a, b) => {
      const percentageA = (a.totalVotesReceived / a.totalVotesAllocated) * 100;
      const percentageB = (b.totalVotesReceived / b.totalVotesAllocated) * 100;
      return percentageB - percentageA; // Sort in descending order
    });
  }

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

  const getTime = async () => {
    const time = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "getTime",
    });
    return time;
  };

  function alreadyReviewedRecipient(recipient) {
    try {
      return recipient.reviews.some(
        (review) => review.reviewedBy === account.toLowerCase()
      );
    } catch {
      return false;
    }
  }

  const processPoolsWithMetadata = async (pools) => {
    try {
      const processedPoolsPromises = pools.map(async (pool) => {
        let CID = pool.poolDetails.poolMetadata;
        const metadataResponse = await axios.get(
          `https://cloudflare-ipfs.com/ipfs/${CID}`
        );
        const metadata = metadataResponse.data;
        const time = await getTime();
        const poolState =
          time < pool.poolDetails.RETs
            ? "RegistrationPeriod"
            : time < pool.poolDetails.AETs
            ? "AllocationPeriod"
            : "WorkingPeriod";
        let remainingTime;
        if (poolState === "WorkingPeriod") {
          remainingTime = calculateRemainingTime(
            time,
            BigInt(pool.poolDetails.DistributionStartTime) +
              BigInt(pool.poolDetails.PWDs)
          );
        } else if (poolState === "AllocationPeriod") {
          remainingTime = calculateRemainingTime(
            time,
            BigInt(pool.poolDetails.AETs)
          );
        } else {
          remainingTime = calculateRemainingTime(
            time,
            BigInt(pool.poolDetails.RETs)
          );
        }

        let poolAmount1 = await publicClient.readContract({
          address: DAI_ADDRESS,
          abi: DAI_ABI,
          functionName: "balanceOf",
          args: [pool.poolDetails.strategy],
        });

        let poolAmount = formatCurrency(poolAmount1.toString());

        // Return a new object with the original pool data and the fetched metadata
        return {
          ...pool,
          metadata,
          poolState: poolState,
          poolAmount: poolAmount.toString(),
          remainingTime: remainingTime,
        };
      });

      // Wait for all promises to resolve
      const processedPools = await Promise.all(processedPoolsPromises);
      return processedPools;
    } catch (error) {
      console.error("Error processing pools:", error);
      return []; // Return an empty array or handle the error as needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const pool = await getPool(poolID);
      const processedPools = await processPoolsWithMetadata([pool[0]]);
      console.log(processedPools);
      setPool(processedPools[0]);
      let registrants = processedPools[0].registeredRecipients;
      let totalVotesAllocated =
        processedPools[0].poolDetails.totalVotesAllocated;
      registrants.forEach((registrant) => {
        let totalVotesReceived = registrant.totalVotesReceived;
        registrant.poolPercentage = totalVotesReceived / totalVotesAllocated;
      });
      console.log(registrants);

      sortRecipientsByPercentage(registrants);
      setRecipients(registrants);
      setDetailsFetched(true);
    };

    if (poolID && !detailsFetched) fetchData();
  });

  return (
    <Box w="full">
      <Navbar />
      <Flex
        direction="column"
        align="center"
        bg="blue.200"
        p={6}
        mx="20%"
        color="white"
        mt={8}
        borderRadius="lg"
        boxShadow="md"
      >
        <AspectRatio ratio={1} w="150px" mb={4}>
          <Image
            src={
              detailsFetched
                ? pool.metadata.image
                : "https://cloudflare-ipfs.com/ipfs/Qmf9bVdXsccGcuissvdKdkW4fkm8mhh37EDtEqZDeiGqZX"
            }
            alt="Pool Image"
            borderRadius="full"
          />
        </AspectRatio>
        <Text fontSize="3xl" fontWeight="bold">
          {detailsFetched ? pool.metadata.name : "Loading Pool Name..."}
        </Text>
        <Text fontSize="md">
          {detailsFetched
            ? pool.metadata.description
            : "Loading Description..."}
        </Text>
        <Badge
          colorScheme={
            pool.poolState === "RegistrationPeriod" ? "green" : "red"
          }
        >
          {pool.poolState} {pool.remainingTime}
        </Badge>
        <Stack direction="row" spacing={4} mt={4}>
          <Text>Round One Distribution: {pool.poolDetails?.ROP}%</Text>
          <Text>Pool Amount: {pool.poolAmount} DAI</Text>
        </Stack>
        {pool.poolState == "RegistrationPeriod" && (
          <Button colorScheme="blue" mt={4} onClick={openRegModal}>
            Register
          </Button>
        )}
      </Flex>

      <RegistrationModal
        isOpen={isRegModalOpen}
        onClose={closeRegModal}
        onSubmit={handleRegistrationSubmit}
        poolID={poolID}
      />

      <Box className="flex flex-col items-center " mx="30%" my={3}>
        {(Access == "ADMIN" || Access == "MANAGER") && (
          <Box mx="10%" my={3} className="flex flex-col items-center">
            <Text fontSize="l" fontWeight="bold">
              {pool.poolState == "RegistrationPeriod"
                ? "Review Projects"
                : pool.poolState == "AllocationPeriod"
                ? "Allocate Votes"
                : "Working Period"}
            </Text>
            <div className="flex flex-wrap items-center">
              <Switch
                colorScheme="green"
                defaultChecked={toggleReview}
                onChange={(e) => {
                  setToggleReview(!toggleReview);
                  // Update your review object here as needed
                }}
              />
            </div>
          </Box>
        )}
        <Table variant="simple" colorScheme="black">
          <Thead>
            <Tr>
              <Th>Project</Th>
              <Th>Status</Th>
              <Th isNumeric>Allocations %</Th>
              {(Access === "MANAGER" ||
                Access === "ADMIN" ||
                (Access === "REVIEWER" &&
                  (pool.poolState == "RegistrationPeriod" ||
                    pool.poolState == "AllocationPeriod"))) &&
                toggleReview && <Th>Accept?</Th>}
              {(Access === "MANAGER" || Access === "ADMIN") &&
                pool.poolState == "AllocationPeriod" &&
                toggleReview && <Th>AllocateVotes</Th>}
              <Th>Details</Th>
              {toggleReview && <Th>Select</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {recipients.map(
              (recipient, index) =>
                (recipient.reviewStatusRoundOne === "Accepted" ||
                  recipient.reviewStatusRoundOne === "Pending") && (
                  <Tr key={index}>
                    <Td>
                      <Flex align="center">
                        <Text mr={2}>{recipient.name}</Text>
                        <ChakraLink
                          as={Button}
                          onClick={() =>
                            router.push(
                              `/OrganizationProfile/${recipient.recipientID}`
                            )
                          }
                        >
                          <FaExternalLinkAlt />
                        </ChakraLink>
                      </Flex>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={
                          recipient.reviewStatusRoundOne === "Accepted"
                            ? "green"
                            : recipient.reviewStatusRoundOne === "Rejected"
                            ? "red"
                            : "yellow"
                        }
                      >
                        {recipient.reviewStatusRoundOne}
                      </Badge>
                    </Td>
                    <Td isNumeric>{recipient.poolPercentage * 100}%</Td>
                    {(Access === "MANAGER" ||
                      Access === "ADMIN" ||
                      (Access === "REVIEWER" &&
                        (pool.poolStatus == "RegistrationPeriod" ||
                          pool.poolStatus == "AllocationPeriod"))) &&
                      toggleReview && (
                        <Td textAlign="center">
                          <Switch
                            colorScheme="green"
                            defaultChecked={true}
                            disabled={
                              (!selectedRecipients[
                                recipient.recipientAddress
                              ] ||
                                recipient.reviewStatusRoundOne == "Accepted" ||
                                recipient.reviewStatusRoundOne == "Rejected") &&
                              alreadyReviewedRecipient(recipient)
                            }
                            onChange={(e) => {
                              handleReviewVoteChange(
                                recipient.recipientAddress,
                                e.target.checked ? 2 : 3
                              );
                              // Update your review object here as needed
                            }}
                          />
                        </Td>
                      )}
                    {(Access === "MANAGER" || Access === "ADMIN") &&
                      pool.poolState == "AllocationPeriod" &&
                      toggleReview && (
                        <Td textAlign="center">
                          <Input
                            type="number"
                            size="sm"
                            width="100px"
                            disabled={
                              !selectedRecipients[recipient.recipientAddress]
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
                    <Td textAlign="center">
                      <Button
                        onClick={() =>
                          handleViewRecipient(recipient.recipientID)
                        }
                      >
                        View
                      </Button>
                    </Td>
                    {toggleReview && (
                      <Td textAlign="center">
                        <Checkbox
                          onChange={(e) =>
                            handleRecipientSelection(
                              recipient.recipientAddress,
                              e.target.checked
                            )
                          }
                        />
                      </Td>
                    )}
                  </Tr>
                )
            )}
          </Tbody>
        </Table>
        <div></div>
      </Box>
      <Box w="full">
        <Flex mx="80%" width="full">
          {pool.poolState == "RegistrationPeriod" ? (
            <Button
              onClick={async () => {
                await reviewRecipients(reviewVotes);
              }}
            >
              Review
            </Button>
          ) : pool.poolState == "AllocationPeriod" ? (
            <div>
              {" "}
              <Button
                onClick={async () => {
                  await AllocateVotes(allocationVotes);
                }}
              >
                {`Allocate`}
              </Button>
              <Text>Remaining Votes: {calculateRemainingVotes()}</Text>
            </div>
          ) : (
            <div></div>
          )}
        </Flex>
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
          detailsFetched && pool.reviewStatusRoundOne === "RegistrationPeriod"
        }
        onClose={closeModal}
        poolID={poolID}
        onSubmit={handleRegistrationSubmit}
      />
    </Box>
  );
};

export default Pool;
