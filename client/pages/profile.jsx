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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  Tooltip,
  IconButton,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";

import ConfigureOrganizationModal from "@/components/ConfigureOrganizationModal";

import Loading from "@/components/Animation/Loading";

import PoolsTable from "@/components/RegisteredPoolsTable";

import {
  getAllPoolsCreatedByProfile,
  getAllPoolsRegisteredByProfile,
  getProfilesData,
} from "@/utils/tableland";

import {
  formatCurrency,
  getUserProfileRole,
  processPoolStateAndRemainingTime,
} from "@/utils/utils";

import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
} from "@/constants/RocketFundingRegistry";
import { DAI_ABI, DAI_ADDRESS } from "@/constants/DAI";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

const OrganizationProfile = () => {
  const router = useRouter();
  const { orgID } = router.query;
  const [createdPools, setCreatedPools] = useState([]);
  const [balance, setBalance] = useState(0);
  const [anchor, setAnchor] = useState("");
  const [registeredPools, setRegisteredPools] = useState([]);
  const [fundsInfo, setFundsInfo] = useState({});
  const [detailsFetched, setDetailsFetched] = useState(false);
  const [creatorMetadata, setCreatorMetadata] = useState([]);
  const [Access, setAccess] = useState("USER");
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const [currentTime, setCurrentTime] = useState(0);

  const getTime = async () => {
    const time = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "getTime",
    });
    return time;
  };

  const processPoolsWithMetadata = async (pools, time) => {
    try {
      const processedPoolsPromises = pools.map(async (pool) => {
        let CID = pool.poolDetails.poolMetadata;
        const metadataResponse = await axios.get(`https://ipfs.io/ipfs/${CID}`);
        const metadata = metadataResponse.data;

        const state = processPoolStateAndRemainingTime(pool, time);
        const poolState = state.poolState;
        let remainingTime = state.remainingTime;

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
      // const profile = await getProfileDetails(orgID);
      const profile = await getProfilesData([orgID]);
      if (!profile[0]?.adminHat) return;
      const role = await getUserProfileRole(account, profile[0].adminHat);
      const regPools = await getAllPoolsRegisteredByProfile(orgID);
      setRegisteredPools(regPools);
      setAccess(role);
      setFundsInfo({
        fundsReceived: profile[0].fundsReceived,
        fundsDistributed: profile[0].fundsDistributed,
      });
      setAnchor(profile[0].profileAddress);

      const getBalance = await publicClient.readContract({
        address: DAI_ADDRESS,
        abi: DAI_ABI,
        functionName: "balanceOf",
        args: [profile[0].profileAddress],
      });

      setBalance(getBalance);
      const time = await getTime();
      setCurrentTime(time);

      const pools = await getAllPoolsCreatedByProfile(orgID);
      let creatorMetadata = await axios.get(
        `https://ipfs.io/ipfs/${profile[0]?.metadata}`,
      );
      setCreatorMetadata(creatorMetadata.data);
      const processedPools = await processPoolsWithMetadata(pools, time);
      setCreatedPools(processedPools);
      setDetailsFetched(true);
    };

    if (orgID && !detailsFetched) fetchData();
  }, [orgID, detailsFetched]);

  return (
    <div className="bg-gradient-to-r from-gray via-gray to-gray-800  my-[7%]">
      {detailsFetched ? (
        <Box className="gray-130" w="full">
          <Flex
            direction="column"
            align="center"
            bg="gray.200"
            p={6}
            mx="35%"
            mt="5%"
            borderRadius="lg"
            boxShadow="lg"
            border="1px"
            borderColor="gray.300"
            _hover={{ transform: "scale(1.02)", boxShadow: "2xl" }}
          >
            {" "}
            <Badge
              colorScheme={
                Access == "ADMIN"
                  ? "red"
                  : Access === "MANAGER"
                    ? "purple"
                    : "blue"
              }
              mb={5}
            >
              {`You are wearing the ${Access} Hat`}
            </Badge>
            <AspectRatio ratio={1} w="150px" mb={4}>
              <Image
                src={
                  creatorMetadata.image
                    ? `data:image/jpeg;base64,${creatorMetadata.image}`
                    : "path/to/fallback/image.jpg"
                }
                alt="Creator Image"
                borderRadius="full"
              />
            </AspectRatio>
            <Text fontSize="3xl" fontWeight="bold" color="gray.700">
              {creatorMetadata.name
                ? creatorMetadata.name
                : "Loading Pool Name..."}
            </Text>
            <Text
              p={3}
              mt={3}
              mb={2}
              bg="gray.100"
              rounded="md"
              borderTop="1px"
              borderColor={"gray.300"}
              fontSize="sm"
              color="gray.700"
              noOfLines={5}
              overflowY={"scroll"}
            >
              {creatorMetadata.description}
            </Text>
            <Stack
              direction="col"
              className="flex flex-col items-center"
              spacing={4}
              mt={8}
            >
              <Badge colorScheme="green">{`Total Distributed: ${formatCurrency(
                fundsInfo.fundsDistributed,
              )}`}</Badge>
              <Badge colorScheme="blue">{`Total Received: ${formatCurrency(
                fundsInfo.fundsReceived,
              )}`}</Badge>
            </Stack>
            {Access == "ADMIN" && (
              <div>
                <ConfigureOrganizationModal profileID={orgID} />
              </div>
            )}
            {/* Social media links (if applicable) */}
            <Stack direction="row" spacing={4} mt={4}>
              {creatorMetadata.websiteLink && (
                <Tooltip label="Website" hasArrow>
                  <IconButton
                    as="a"
                    href={creatorMetadata.websiteLink}
                    icon={<FaGlobe />}
                    aria-label="Website Link"
                    size="md"
                  />
                </Tooltip>
              )}
              {creatorMetadata.githubLink && (
                <Tooltip label="GitHub" hasArrow>
                  <IconButton
                    as="a"
                    href={creatorMetadata.githubLink}
                    icon={<FaGithub />}
                    aria-label="GitHub Link"
                    size="md"
                  />
                </Tooltip>
              )}
              {creatorMetadata.twitterLink && (
                <Tooltip label="Twitter" hasArrow>
                  <IconButton
                    as="a"
                    href={creatorMetadata.twitterLink}
                    icon={<FaTwitter />}
                    aria-label="Twitter Link"
                    size="md"
                  />
                </Tooltip>
              )}
            </Stack>
          </Flex>

          <Tabs isFitted variant="enclosed" colorScheme="blue" my={4}>
            <TabList mb="1em" mx={"20%"}>
              <Tab _selected={{ color: "gray.100", bg: "blue.500" }}>
                Created Pools
              </Tab>
              <Tab _selected={{ color: "gray.100", bg: "blue.500" }}>
                Registered Pools
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid
                  templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                  gap={6}
                  px={4}
                  mx={"20%"}
                  mb={"4%"}
                >
                  {createdPools.map((pool, index) => (
                    <VStack
                      key={index}
                      bg="white"
                      boxShadow="lg"
                      p={5}
                      rounded="lg"
                      spacing={4}
                      align="stretch"
                      border="1px"
                      borderColor="gray.300"
                      _hover={{ transform: "scale(1.02)", boxShadow: "2xl" }}
                    >
                      <Text fontWeight="bold" fontSize="xl" textAlign="center">
                        {pool.metadata.name ? pool.metadata.name : "Pool Name"}
                      </Text>
                      <AspectRatio
                        ratio={4 / 3}
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        <Image
                          src={`data:image/png;base64,${pool.metadata.image}`}
                          alt={pool.metadata.name}
                          fallbackSrc="path/to/fallback/image.jpg"
                        />
                      </AspectRatio>

                      <Text
                        p={3}
                        mt={3}
                        mb={2}
                        bg="gray.100"
                        rounded="md"
                        borderTop="1px"
                        borderColor={"gray.300"}
                        fontSize="sm"
                        color="gray.700"
                        noOfLines={3}
                        overflowY={"scroll"}
                      >
                        {pool.metadata.description}
                      </Text>

                      <Badge
                        className="text-center mx-auto"
                        colorScheme={
                          pool.poolState === "RegistrationPeriod"
                            ? "green"
                            : pool.poolState === "AllocationPeriod"
                              ? "red"
                              : "yellow"
                        }
                      >
                        {pool.poolState + " " + pool.remainingTime}
                      </Badge>

                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        justifyContent="space-between"
                        w="full"
                        mt={3}
                      >
                        <div className="flex flex-col items-center">
                          <Text fontSize="sm">Round One Distribution</Text>
                          <Text fontSize="sm">{pool.poolDetails.ROP}%</Text>
                        </div>
                        <div className="flex flex-col items-center">
                          <Text fontSize="sm">Pool Amount</Text>
                          <Text fontSize="sm">{pool.poolAmount} DAI</Text>
                        </div>
                      </Stack>

                      <Button
                        mt={5}
                        colorScheme="blue"
                        w="full"
                        onClick={() =>
                          router.push({
                            pathname: `/pool`,
                            query: { poolID: pool.poolID },
                          })
                        }
                      >
                        View Pool
                      </Button>
                    </VStack>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel>
                <PoolsTable
                  pools={registeredPools}
                  profileID={orgID}
                  balance={balance}
                  anchorAddress={anchor}
                  current={currentTime}
                  Access={Access}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      ) : (
        <div className="bg-gradient-to-r from-gray via-gray to-gray-800">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default OrganizationProfile;
