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
            mx="20%"
            mb="4%"
          >
            {activePools.map((pool, index) => (
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
                  {pool.metadata.name || "Pool Name"}
                </Text>

                <AspectRatio ratio={4 / 3} borderRadius="lg">
                  <Image
                    src={`data:image/png;base64,${pool.metadata.image}`}
                    alt={pool.metadata.name}
                    fallbackSrc="path/to/fallback/image.jpg"
                  />
                </AspectRatio>

                <Text
                  p={7}
                  mt={3}
                  bg="gray.100"
                  rounded="md"
                  borderTop="1px"
                  borderColor="gray.300"
                  fontSize="sm"
                  color="gray.700"
                  noOfLines={3}
                  overflowY="scroll"
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
                  {`${pool.poolState} ${pool.remainingTime}`}
                </Badge>

                <Flex justify="space-between" w="full">
                  {/* Information Boxes */}
                  {renderInfoBoxes(pool)}
                </Flex>

                <Button
                  colorScheme="blue"
                  w="full"
                  onClick={() => router.push(`/pool?poolID=${pool.poolID}`)}
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

function renderInfoBoxes(pool) {
  const infoData = [
    {
      label: "ROD",
      value: `${pool.poolDetails?.ROP}%`,
      tooltip: "Round One Distribution Percentage",
    },
    { label: "", value: `${pool.poolAmount} DAI`, tooltip: "Pool Amount" },
    {
      label: "PWD",
      value: formatDuration(pool.poolDetails?.PWDs),
      tooltip: "Projects Working Duration",
    },
    {
      label: "Thres",
      value: pool.poolDetails?.threshold,
      tooltip: "Voting Threshold",
    },
  ];

  return infoData.map((item, index) => (
    <Tooltip key={index} label={item.tooltip} placement="top">
      <Box className="flex flex-col items-center border border-gray-300 p-2 rounded">
        <Text>{item.label}</Text>
        <Text>{item.value}</Text>
      </Box>
    </Tooltip>
  ));
}
