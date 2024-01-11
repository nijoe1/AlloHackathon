import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";

import { getUserAdminOrgs } from "@/utils/utils";

import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import axios from "axios";
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "@/constants/RocketFundingRegistry";
import router from "next/router";

const RegistrationModal = ({ isOpen, onClose, onSubmit, poolID }) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const toast = useToast();
  const [projects, setProjects] = useState([]);
  const [fetched, setFetched] = useState(false);
  const { address: account } = useAccount();
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    milestones: "",
    selectedProjectId: "",
    selectedProjectMetadata: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "selectedProject") {
      const project = projects.find((p) => p.profileID === e.target.value);
      setFormData({
        ...formData,
        selectedProjectId: project.profileID,
        selectedProjectMetadata: project.metadata,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    async function fetch() {
      const orgs = await getUserAdminOrgs(account);
      console.log(orgs);
      let proj = [];
      const projects = orgs.map((org) => {
        proj.push({
          name: org.profileData[0]?.name,
          profileID: org.profileData[0]?.profileID,
          metadata: org.profileData[0]?.ProfileMetadata,
        });
      });
      setProjects(proj);
      setFetched(true);
      // console.log(proj);
    }
    if (!fetched && isOpen) fetch();
  }, [fetched, isOpen]);

  const registerProfileInPool = async (metadata) => {
    try {
      const data = await publicClient?.simulateContract({
        account,
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "registerRecipient",
        args: [
          poolID,
          formData.selectedProjectId,
          {
            protocol: BigInt(1),
            pointer: metadata,
          },
        ],
      });

      if (!walletClient) {
        console.log("Wallet client not found");
        return;
      }
      console.log(data);

      setIsProcessingTransaction(true);
      // @ts-ignore
      const hash = await walletClient.writeContract(data.request);
      console.log(hash);
      toast({
        title: "You Successfully registered your project in the pool",
        status: "success",
        colorScheme: "blue",
      });

      const transaction = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });
      setIsProcessingTransaction(false);
      setTimeout(() => {
        router.reload(); // Replace '/' with the path to your home page
      }, 1000);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    onSubmit(formData);
    if (!formData.projectName) {
      toast({ title: "Please fill in all fields", status: "warning" });
      return;
    }

    const formData2 = new FormData();

    // Append other profile details to the form data
    formData2.append("name", formData.projectName);
    formData2.append("description", formData.description);
    formData2.append("milestones", formData.milestones);
    formData2.append("metadata", formData.selectedProjectMetadata);

    setIsUploading(true); // Start uploading

    try {
      const response = await axios.post("/api/uploadRegistrant", formData2);
      const { metadataCid } = response.data;
      console.log("Metadata uploaded to IPFS with CID:", metadataCid);

      setIsUploading(false); // Stop uploading

      toast({
        title: "Profile Metadata Uploaded successfully",
        status: "success",
        colorScheme: "blue",
      });

      const res = await registerProfileInPool(metadataCid);

      if (!res) {
        toast({
          title: "Transaction rejected",
          status: "error",
        });
        return;
      }

      setTimeout(() => {
        router.reload();
      }, 1500);

      // Now you can proceed to use these CIDs as needed
    } catch (error) {
      toast({
        title: "Error Registring your Profile into the pool",
        status: "error",
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register Project Proposal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Project Name</FormLabel>
            <Input name="projectName" onChange={handleChange} />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" onChange={handleChange} />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Milestones (Markdown supported)</FormLabel>
            <Textarea name="milestones" onChange={handleChange} />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Choose a Project</FormLabel>
            <Select
              name="selectedProject"
              onChange={handleChange}
              value={formData.selectedProjectId}
            >
              <option value="">Select Project</option>
              {projects.map((project, index) => (
                <option key={index} value={project.profileID}>
                  {project.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit Proposal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegistrationModal;
