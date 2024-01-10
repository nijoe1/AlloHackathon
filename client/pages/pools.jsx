import React, { useState, useEffect, use } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  AspectRatio,
  Image,
  Text,
  Badge,
  Button,
  Grid,
  Stack,
  VStack,
  Flex,
  Tooltip,
  GridItem,
} from "@chakra-ui/react";

import Loading from "@/components/Animation/Loading";

import { getAllActivePools } from "@/utils/tableland";

import {
  formatCurrency,
  processPoolStateAndRemainingTime,
  formatDuration,
} from "@/utils/utils";

import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
} from "@/constants/RocketFundingRegistry";
import { DAI_ABI, DAI_ADDRESS } from "@/constants/DAI";
import { usePublicClient } from "wagmi";

const Pools = () => {
  const router = useRouter();
  const [activePools, setActivePools] = useState([]);
  const [detailsFetched, setDetailsFetched] = useState(false);
  const publicClient = usePublicClient();

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
      const time = await getTime();
      const pools = await getAllActivePools(time.toString());
      const processedPools = await processPoolsWithMetadata(pools, time);
      setActivePools(processedPools);
      setDetailsFetched(true);
    };

    if (!detailsFetched) fetchData();
  }, [detailsFetched]);

  return (
    <div className="bg-gradient-to-r from-gray via-gray to-gray-800  my-[7%]">
      {detailsFetched ? (
        <Box className="gray-130" w="full">
          <Grid
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={6}
            px={4}
            mx={"20%"}
            mb={"4%"}
          >
            {activePools.map((pool, index) => (
              <VStack
                key={index}
                bg="white"
                boxShadow="lg"
                p={5}
                content="center"
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
                <AspectRatio ratio={4 / 3} borderRadius="lg" overflow="hidden">
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

                <Box w="full">
                  <Flex
                    className="flex items-center text-center"
                    direction="row"
                    gap={2}
                    mb={4}
                  >
                    <Tooltip
                      placement="top"
                      label="Round One Distribution Percentage"
                    >
                      <div className="flex flex-col items-center border border-gray-300 border-1 p-2 rounded">
                        <Text>ROD</Text>
                        <Text>{pool.poolDetails?.ROP}%</Text>
                      </div>
                    </Tooltip>
                    <div className="flex flex-col items-center border border-gray-300 border-1 p-2 rounded">
                      <Text>amount </Text>
                      <Text>{pool.poolAmount}DAI</Text>
                    </div>
                    <Tooltip placement="top" label="Projects Working Duration">
                      <div className="flex flex-col items-center border border-gray-300 border-1 p-2 rounded">
                        <Text>PWD </Text>
                        <Text>{formatDuration(pool.poolDetails?.PWDs)}</Text>
                      </div>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      label="Voting Threshold is the amount of votes that someone needs to get accepted or rejected from the pool"
                    >
                      <div className="flex flex-col items-center border border-gray-300 border-1 p-2 rounded">
                        <Text>Thres</Text>
                        <Text>{pool.poolDetails?.threshold}</Text>
                      </div>
                    </Tooltip>
                  </Flex>
                </Box>

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
        </Box>
      ) : (
        <div className="bg-gradient-to-r from-gray via-gray to-gray-800">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Pools;
