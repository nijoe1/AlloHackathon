import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Link,
  Box,
  Flex,
  Heading,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { SABLIER_ABI, SABLIER_ADDRESS } from "@/constants/Sablier";
import { DAI_ABI, DAI_ADDRESS } from "@/constants/DAI";
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "@/constants/RocketFundingRegistry";
import { encodeFunctionData } from "viem";
import { formatCurrency, filterStreamsByRecipient } from "@/utils/utils";
import { getRecipientStreams } from "@/utils/graphFunctions";
import Loading from "@/components/Animation/Loading";

const PoolsTable = ({
  pools,
  profileID,
  balance,
  anchorAddress,
  current,
  Access,
}) => {
  const toast = useToast();
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [streamInfo, setStreamInfo] = useState([]);
  const [detailsFetched, setDetailsFetched] = useState(false);
  const [currentTime, setCurrentTime] = useState(current);
  useEffect(() => {
    async function fetch() {
      let Streams = await getRecipientStreams(anchorAddress.toLowerCase());
      const streamInfo = filterStreamsByRecipient(
        Streams.streams,
        anchorAddress
      );
      setStreamInfo(streamInfo);

      console.log(pools);
      // console.log(streamInfo);
      setDetailsFetched(!detailsFetched);
    }
    if (!detailsFetched) fetch();
  }, []);

  // Timer to update the current time every 0.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(currentTime + BigInt(1));
    }, 1000);
    return () => clearInterval(timer);
  });

  // Function to calculate the current amount in an active stream
  const calculateCurrentAmount = useCallback(
    (stream) => {
      if (currentTime > stream.endTime) {
        return stream.depositAmount;
      }
      const elapsedTime = currentTime - BigInt(stream.startTime);
      const rate = stream.depositAmount / stream.duration;
      return BigInt(elapsedTime) * BigInt(rate);
    },
    [currentTime]
  );

  const HandleWithdrawStream = async (streamID) => {
    try {
      console.log(streamID);
      console.log(profileID);
      console.log(account);
      const withdrawData = encodeFunctionData({
        abi: SABLIER_ABI,
        functionName: "withdrawMax",
        args: [streamID, account],
      });

      const withdrawWithAnchor = await publicClient?.simulateContract({
        account,
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "callWithAnchor",
        args: [profileID, SABLIER_ADDRESS, 0, withdrawData],
      });

      console.log(withdrawWithAnchor);
      if (!walletClient) {
        console.log("Wallet client not found");
        return;
      }
      // @ts-ignore
      const hash = await walletClient.writeContract(withdrawWithAnchor.request);
      console.log("Transaction Sent");
      const transaction = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });
      toast({
        title: "You Successfully Withdrew the StreamID " + streamID,
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
  const HandleWithdrawBalance = async () => {
    try {
      const approveData = encodeFunctionData({
        abi: DAI_ABI,
        functionName: "approve",
        args: [account, balance],
      });

      const approve = await publicClient?.simulateContract({
        account,
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "callWithAnchor",
        args: [profileID, DAI_ADDRESS, 0, approveData],
      });

      // @ts-ignore
      const hash = await walletClient.writeContract(approve.request);
      console.log("Transaction Sent");

      toast({
        title: "You Successfully Approved anchor to withdraw DAI",
        status: "success",
        colorScheme: "blue",
      });

      const transaction = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });

      const transfer = await publicClient?.simulateContract({
        account,
        address: DAI_ADDRESS,
        abi: DAI_ABI,
        functionName: "transferFrom",
        args: [anchorAddress, account, balance],
      });

      // @ts-ignore
      const hash2 = await walletClient.writeContract(transfer.request);
      console.log("Transaction Sent");
      const transaction2 = await publicClient.waitForTransactionReceipt({
        hash: hash2,
      });

      toast({
        title:
          "You Successfully Transfered DAI from Anchor to your profile admin account",
        status: "success",
        colorScheme: "blue",
      });

      if (!walletClient) {
        console.log("Wallet client not found");
        return;
      }
      setTimeout(() => {
        router.reload(); // Replace '/' with the path to your home page
      }, 1000);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <div>
      {detailsFetched ? (
        <div>
          <Flex
            className="flex flex-col items-center"
            alignItems="center"
            mb={4}
          >
            {Access == "ADMIN" && (
              <Button colorScheme="blue" onClick={HandleWithdrawBalance}>
                Withdraw Balance: {formatCurrency(balance)}
              </Button>
            )}
          </Flex>
          <Box
            p={4}
            bg="white"
            boxShadow="md"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.200"
            mx={"15%"}
          >
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>Pool ID</Th>
                  <Th>Status</Th>
                  <Th>Stream Distributions</Th>
                  <Th>Round Two Distributions</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pools.map((pool) => (
                  <Tr key={pool.poolID}>
                    <Td>
                      <Link
                        href={`/pool?poolID=${pool.poolID}`}
                        color="blue.500"
                      >
                        {pool.poolID}
                      </Link>
                    </Td>
                    <Td>
                      {pool.poolDetails.reviewStatusRoundOne == "Pending"
                        ? "Pending"
                        : pool.poolDetails.reviewStatusRoundOne == "Accepted" &&
                            pool.poolDetails.isCanceledRoundTwo != "true"
                          ? "Accepted"
                          : pool.poolDetails.reviewStatusRoundOne != "Accepted"
                            ? "Rejected"
                            : "CancelledRoundTwo"}
                    </Td>
                    <Td>
                      {pool.distributions
                        .filter((dist) => dist.streamID !== "0")
                        .map((dist, index) => {
                          const stream = streamInfo.get(dist.streamID);
                          return (
                            <div className="flex flex-col items-center">
                              <Text key={index}>
                                Streamed:{" "}
                                {formatCurrency(calculateCurrentAmount(stream))}
                                /{formatCurrency(stream.depositAmount)}
                              </Text>
                              <Text key={index}>
                                Withdrawn:{" "}
                                {formatCurrency(
                                  stream.depositAmount - stream.intactAmount
                                )}
                              </Text>
                            </div>
                          );
                        })}
                    </Td>
                    <Td>
                      {pool.distributions
                        .filter((dist) => dist.streamID === "0")
                        .map((dist, index) => {
                          return (
                            <div className="flex flex-col items-center">
                              <Text key={index}>
                                {formatCurrency(dist.distributionAmount)}
                              </Text>
                            </div>
                          );
                        })}
                    </Td>
                    <Td>
                      {pool.distributions
                        .filter((dist) => dist.streamID !== "0")
                        .map((dist, index) => (
                          <Button
                            key={index}
                            colorScheme="blue"
                            size="sm"
                            disabled={Access != "ADMIN"}
                            onClick={() => HandleWithdrawStream(dist.streamID)}
                          >
                            Withdraw Stream
                          </Button>
                        ))}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default PoolsTable;
