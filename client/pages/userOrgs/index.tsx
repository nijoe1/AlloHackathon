import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Image,
  Text,
  Link,
  Grid,
  GridItem,
  Badge,
  Button,
} from "@chakra-ui/react";
import { FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";
import Navbar from "@/components/navbar";
import Loading from "@/components/Animation/Loading";
import { getUserOrganizations, formatCurrency } from "@/utils/utils";

import { useAccount } from "wagmi";

const Index = () => {
  const router = useRouter();
  const { address: account } = useAccount();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchIPFSMetadata(ipfsHash: string) {
    const metadataUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
    try {
      const response = await fetch(metadataUrl);
      if (!response.ok) throw new Error("Failed to fetch IPFS metadata");
      return await response.json();
    } catch (error) {
      console.error("Error fetching IPFS metadata:", error);
      return null;
    }
  }

  async function getOrganizations() {
    const orgs = await getUserOrganizations(account);
    const orgsWithMetadata = await Promise.all(
      orgs.map(async (org) => {
        const metadata = await fetchIPFSMetadata(
          `${org?.profileData[0]?.ProfileMetadata}`
        );

        let obj = {
          ...org,

          description: metadata?.description as string,

          image: metadata?.image,

          twitter: metadata?.twitterLink,
          website: metadata?.websiteLink,
          github: metadata?.githubLink,
        };
        return obj;
      })
    );

    setOrganizations(orgsWithMetadata);
    console.log(orgsWithMetadata);
    setIsLoading(false);
  }

  useEffect(() => {
    getOrganizations();
  }, [account]);

  return (
    <Box
      w="full"
      className="bg-gradient-to-r from-gray-700 to-gray-800"
      bg="bg-gradient-to-r from-gray-700 to-gray-800"
    >
      {isLoading ? (
        <Box
          w="1/2"
          className="bg-gradient-to-r from-gray-700 to-gray-800"
          bg="bg-gradient-to-r from-gray-700 to-gray-800"
        >
          <Loading />
        </Box>
      ) : (
        <Grid
          p={5}
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={50}
          mt={{ base: "12%", md: "7%" }}
          mx="13%"
          bg="gradient-to-r from-gray-700 to-gray-800"
        >
          {organizations.map((orgData, index) => (
            <GridItem
              key={index}
              bg="gray.100"
              boxShadow="xl"
              p={5}
              rounded="xl"
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
              border="1px solid"
              width={300}
              height={500}
              borderColor="gray.200"
            >
              <Badge
                colorScheme={
                  orgData.type === "ADMIN"
                    ? "red"
                    : orgData.type === "MANAGER"
                    ? "purple"
                    : "blue"
                }
                fontSize="sm"
                mb={3}
              >
                {orgData.type}
              </Badge>
              <Box className="flex flex-col items-center">
                <Text mb="3" fontWeight="bold" fontSize="lg">
                  {orgData.profileData[0].name}
                </Text>
                <Image
                  src={`data:image/png;base64,${orgData.image}`}
                  alt={orgData.profileData[0].name}
                  borderRadius="lg"
                  w="120"
                  h="120"
                  mt={2}
                />
              </Box>

              <Box
                p={3}
                mt={10}
                mb={1}
                bg="gray.50"
                rounded="md"
                border="2px solid"
                borderColor="gray.200"
              >
                <Text fontSize="sm" color="gray.600" noOfLines={1}>
                  {orgData.description}
                </Text>
              </Box>

              <Box mt={4} className="flex flex-col items-center">
                <Badge colorScheme="green" fontSize="2xsm">
                  Funded{" "}
                  {formatCurrency(orgData.profileData[0].fundsDistributed)} In{" "}
                  {orgData.profileData[0].poolsCreated} Pools
                </Badge>
                <Badge colorScheme="blue" fontSize="2xsm" mt={1}>
                  Received{" "}
                  {formatCurrency(orgData.profileData[0].fundsReceived)} From{" "}
                  {orgData.profileData[0].poolsRegistered} Pools
                </Badge>
              </Box>

              <Button
                mt={9}
                colorScheme="blue"
                w="full"
                onClick={() =>
                  router.push({
                    pathname: `/profile`,
                    query: {
                      orgID: orgData?.profileData[0]?.profileID,
                      Access: orgData.type,
                    },
                  })
                }
              >
                View Details
              </Button>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Index;
