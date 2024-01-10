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
  Tooltip,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import Loading from "@/components/Animation/Loading";
import { getUserOrganizations, formatCurrency } from "@/utils/utils";
import { FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";

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
    <Box w="full" className="bg-gradient-to-r from-gray-700 to-gray-800">
      {isLoading ? (
        <Loading />
      ) : (
        <Grid
          p={5}
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={6}
          justifyContent="center"
          mt={{ base: "12%", md: "7%" }}
          mx="13%"
          bg="gradient-to-r from-gray-700 to-gray-800"
        >
          {organizations.map((orgData, index) => (
            <GridItem
              key={index}
              bg="white"
              boxShadow="lg"
              p={5}
              rounded="lg"
              border="1px"
              borderColor={"gray.300"}
              _hover={{ transform: "scale(1.02)", boxShadow: "2xl" }}
              className="flex flex-col items-center justify-center"
            >
              <Badge
                colorScheme={
                  orgData.type === "ADMIN"
                    ? "red"
                    : orgData.type === "MANAGER"
                    ? "purple"
                    : "blue"
                }
                mb={3}
              >
                {orgData.type}
              </Badge>

              <Box textAlign="center">
                <Text mb={2} fontWeight="bold" fontSize="xl">
                  {orgData.profileData[0].name}
                </Text>
                <Image
                  src={`data:image/png;base64,${orgData.image}`}
                  alt={orgData.profileData[0].name}
                  borderRadius="full"
                  boxSize="100px"
                  objectFit="cover"
                  fallbackSrc="path/to/fallback/image.jpg"
                />
              </Box>

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
                noOfLines={2}
              >
                {orgData.description}
              </Text>

              <Box mt={3} textAlign="center">
                <Tooltip label="Twitter" hasArrow>
                  <IconButton
                    as="a"
                    href={orgData.twitter}
                    icon={<FaTwitter />}
                    aria-label="Twitter Link"
                    size="md"
                    m={1}
                  />
                </Tooltip>
                <Tooltip label="GitHub" hasArrow>
                  <IconButton
                    as="a"
                    href={orgData.github}
                    icon={<FaGithub />}
                    aria-label="GitHub Link"
                    size="md"
                    m={1}
                  />
                </Tooltip>
                <Tooltip label="Website" hasArrow>
                  <IconButton
                    as="a"
                    href={orgData.website}
                    icon={<FaGlobe />}
                    aria-label="Website Link"
                    size="md"
                    m={1}
                  />
                </Tooltip>
              </Box>

              <Button
                mt={5}
                colorScheme="blue"
                w="full"
                onClick={() =>
                  router.push(
                    `/profile?orgID=${orgData?.profileData[0]?.profileID}`
                  )
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
