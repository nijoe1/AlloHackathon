import { useToast } from "@chakra-ui/react";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";

import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/HackRegistry";

import React, { useState, useRef } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Box,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MdOutlineAttachFile, MdWeb } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { fileToBase64 } from "@/utils/utils";

import { BsTwitterX } from "react-icons/bs";

import axios from "axios";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();

  const toast = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    profileName: "",
    profileDescription: "",
    profileImage: "",
    twitterLink: "",
    websiteLink: "",
    githubLink: "",
  });

  const handleFileChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
    setProfileDetails({ ...profileDetails, profileImage: fileUploaded.name });
  };
  
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [file, setFile] = useState<any>("");

  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    //@ts-ignore
    hiddenFileInput?.current?.click();
  };

  const handleSubmit = async () => {
    if (!profileDetails.profileName || !profileDetails.profileDescription) {
      toast({ title: "Please fill in all fields", status: "warning" });
      return;
    }

    const selectedFile = file;

    let base64Image = await fileToBase64(selectedFile);

    const formData = new FormData();

    // Append other profile details to the form data

    formData.append("image", String(base64Image));
    // Append other profile details to the form data
    formData.append("name", profileDetails.profileName);
    formData.append("description", profileDetails.profileDescription);
    formData.append("twitterLink", profileDetails.twitterLink);
    formData.append("websiteLink", profileDetails.websiteLink);
    formData.append("githubLink", profileDetails.githubLink);

    setIsUploading(true); // Start uploading

    try {
      const response = await axios.post("/api/uploadProfile", formData);
      const { metadataCid } = response.data;
      console.log("Metadata uploaded to IPFS with CID:", metadataCid);

      setIsUploading(false); // Stop uploading

      toast({
        title: "Profile Metadata Uploaded successfully",
        status: "success",
      });

      setIsProcessingTransaction(true);
      const res = await createProfile(metadataCid);

      setIsProcessingTransaction(false);
      if (!res) {
        toast({
          title: "Transaction rejected",
          status: "error",
        });
        return;
      }
      toast({
        title: "Profile Created successfully",
        status: "success",
      });

      setTimeout(() => {
        router.push("/"); // Replace '/' with the path to your home page
      }, 1000);

      // Now you can proceed to use these CIDs as needed
    } catch (error) {
      console.error("Error uploading:", error);
      toast({ title: "Error uploading", status: "error" });
    }
  };

  const getLoadingMessage = () => {
    if (isUploading) {
      return "Uploading file and metadata...";
    }
    if (isProcessingTransaction) {
      return "Processing transaction...";
    }
    return "";
  };

  const createProfile = async (metadata: string) => {
    try {
      if (
        profileDetails.profileDescription == "" &&
        profileDetails.profileImage == undefined &&
        profileDetails.profileName == ""
      ) {
        console.log("Profile Details missing");
        return;
      }

      const data = await publicClient?.simulateContract({
        account,
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "createProfile",
        args: [
          profileDetails.profileName,
          {
            protocol: BigInt(1),
            pointer: metadata,
          },
        ],
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
      console.log(transaction);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <Box
      className="bg-gradient-to-r from-gray via-gray to-gray-800"
      w="full"
      h="100vh"
    >
      <VStack mt="20" spacing="4" align="stretch">
        <Box
          w="50%"
          mx="auto"
          bg="indigo.100"
          p="6"
          borderRadius="xl"
          border="2px"
          borderColor="gray.100"
          mt={20}
          className="bg-gray-100"
          boxShadow="md"
        >
          <Text fontSize="2xl" fontWeight="semibold" textAlign="center" mb="4">
            Create Organization Profile
          </Text>
          <VStack spacing="4">
            <Input
              placeholder="Organization Name"
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  profileName: e.target.value,
                })
              }
              value={profileDetails.profileName}
            />
            <Textarea
              placeholder="Description"
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  profileDescription: e.target.value,
                })
              }
              value={profileDetails.profileDescription}
            />
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BsTwitterX color="blue" />}
              />
              <Input
                type="url"
                placeholder="Twitter Profile Link"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    twitterLink: e.target.value,
                  })
                }
                value={profileDetails.twitterLink}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdWeb color="green" />}
              />
              <Input
                type="url"
                placeholder="Website Link"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    websiteLink: e.target.value,
                  })
                }
                value={profileDetails.websiteLink}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaGithub color="black" />}
              />
              <Input
                type="url"
                placeholder="GitHub Profile Link"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    githubLink: e.target.value,
                  })
                }
                value={profileDetails.githubLink}
              />
            </InputGroup>
            <HStack spacing="2">
              <Button
                onClick={() => handleClick()}
                leftIcon={<MdOutlineAttachFile />}
              >
                Upload Image
              </Button>
              <Text fontSize="sm">{file ? file.name : "No file selected"}</Text>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
              />
            </HStack>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={isUploading || isProcessingTransaction}
            >
              Create Profile
            </Button>
            {isUploading || isProcessingTransaction ? (
              <Text fontSize="md">{getLoadingMessage()}</Text>
            ) : null}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Create;
