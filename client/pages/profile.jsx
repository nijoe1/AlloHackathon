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
  useColorModeValue,
  Stack,
  VStack,
} from "@chakra-ui/react";

import ConfigureOrganizationModal from "@/components/ConfigureOrganizationModal";
import Navbar from "@/components/navbar";

import {
  getAllPoolsCreatedByProfile,
  getAllPoolsRegisteredByProfile,
  getProfileDetails,
} from "@/utils/tableland";

import { calculateRemainingTime, formatCurrency } from "@/utils/utils";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/HackRegistry";
import { DAI_ABI, DAI_ADDRESS } from "@/constants/DAI";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

// ... Existing dummyCreatedPools and other imports

const OrganizationProfile = (profileID) => {
  const router = useRouter();
  const { orgID, Access } = router.query;
  const [createdPools, setCreatedPools] = useState([]);
  const [registeredPools, setRegisteredPools] = useState([]);
  const [detailsFetched, setDetailsFetched] = useState(false);
  const [creatorMetadata, setCreatorMetadata] = useState([]);
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const boxBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const getTime = async () => {
    const time = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "getTime",
    });
    return time;
  };

  const processPoolsWithMetadata = async (pools) => {
    try {
      let id = 0;
      let creatorMetadata = {};
      const processedPoolsPromises = pools.map(async (pool) => {
        let CID = pool.poolDetails.poolMetadata;
        const metadataResponse = await axios.get(`https://ipfs.io/ipfs/${CID}`);
        const metadata = metadataResponse.data;
        console.log(metadata);
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
      const profile = await getProfileDetails(orgID);
      const pools = await getAllPoolsCreatedByProfile(orgID);
      let creatorMetadata = await axios.get(
        `https://ipfs.io/ipfs/${profile[0]?.metadata}`
      );
      setCreatorMetadata(creatorMetadata.data);

      const processedPools = await processPoolsWithMetadata(pools);
      console.log(creatorMetadata.data);
      setCreatedPools(processedPools);
    };

    if (orgID && !detailsFetched) fetchData();
  }, [orgID, detailsFetched]);

  return (
    <Box bg={bgColor} w="full">
      <Navbar />
      <Flex
        direction="column"
        align="center"
        bg="blue.200"
        p={6}
        mx="10%"
        color="white"
        mt={8}
        borderRadius="lg"
        boxShadow="md"
      >
        <AspectRatio ratio={1} w="150px" mb={4}>
          <Image
            src={
              creatorMetadata.image
                ? `data:image/jpeg;base64,${creatorMetadata.image}`
                : "loading"
            }
            alt="Pool Image"
            borderRadius="full"
          />
        </AspectRatio>
        <Text fontSize="3xl" fontWeight="bold">
          {creatorMetadata.name ? creatorMetadata.name : "Loading Pool Name..."}
        </Text>
        <Text fontSize="md">
          {creatorMetadata.description
            ? creatorMetadata.description
            : "Loading Description..."}
        </Text>
        <Stack direction="row" spacing={4} mt={8}>
          <Badge colorScheme="green">Total Distributed: $500K</Badge>
          <Badge colorScheme="blue">Total Received: $200K</Badge>
        </Stack>
        <div className="flex flex-col items-center mt-5">
          <ConfigureOrganizationModal profileID={orgID} />
        </div>
      </Flex>

      <Tabs isFitted variant="enclosed" colorScheme="blue" my={4}>
        <TabList mb="1em" mx={"20%"}>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            Created Pools
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
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
            >
              {createdPools.map((pool, index) => (
                <VStack
                  key={index}
                  bg={boxBgColor}
                  boxShadow="md"
                  p={5}
                  rounded="lg"
                  spacing={4}
                  align="stretch"
                >
                  <AspectRatio
                    ratio={4 / 3}
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image
                      src={`data:image/png;base64,${pool.metadata.image}`}
                      alt={pool.metadata.name}
                    />
                  </AspectRatio>
                  <Text fontWeight="bold" fontSize="lg">
                    {pool.metadata.name ? pool.metadata.name : "Pool Name"}
                  </Text>
                  <Text fontSize="sm" color="gray.600" noOfLines={3}>
                    {pool.metadata.description
                      ? pool.metadata.description
                      : "Pool Description"}
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
                    colorScheme="teal"
                    onClick={() =>
                      router.push({
                        pathname: `/pool`,
                        query: {
                          poolID: pool.poolID,
                          Access: Access,
                        },
                      })
                    }
                  >
                    View Pool
                  </Button>
                </VStack>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>{/* Content for Registered Pools */}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default OrganizationProfile;
