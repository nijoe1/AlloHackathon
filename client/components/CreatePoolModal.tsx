import React, { use, useEffect, useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Switch,
  HStack,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  Tooltip,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/HackRegistry";
import { DAI_ABI, DAI_ADDRESS } from "@/constants/DAI";
import { useRouter } from "next/router";
import axios from "axios";

const CreatePoolModal = (profileID: any) => {
  const router = useRouter();
  const [registrationNow, setRegistrationNow] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [poolForm, setPoolForm] = useState({
    poolName: "",
    poolDescription: "",
    poolImage: null,
    allocationDurationDays: 0,
    projectsWorkingDurationDays: 0,
    projectsReviewingDurationDays: 0,
    roundOnePercentage: 0,
    maxVotesPerAllocator: 0,
    tokenAddress: "0x8d573a4EBe0AC93d9cBCF1A3046C91DbF2ADD45A", // DAI Stablecoin
    startingPoolAmount: 0,
    votesThreshold: 1,
  });

  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [isUploading, setIsUploading] = useState(false);
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [isProcessingApproval, setIsProcessingApproval] = useState(false);
  const getLoadingMessage = () => {
    if (isUploading) {
      return "Uploading Pool metadata...";
    }
    if (isProcessingTransaction) {
      return "Processing transaction...";
    }
    if (isProcessingApproval) {
      return "Processing Token approval...";
    }
    return "";
  };

  useEffect(() => {
    console.log(poolForm);
  }, [poolForm]);

  const createPool = async (metadata: any) => {
    console.log(metadata);
    console.log(profileID.profileID);
    try {
      const approve = await publicClient?.simulateContract({
        account,
        address: DAI_ADDRESS,
        abi: DAI_ABI,
        functionName: "approve",
        args: [
          CONTRACT_ADDRESS,
          BigInt(poolForm.startingPoolAmount * 10 ** 18),
        ],
      });
      console.log(approve);

      if (poolForm.startingPoolAmount > 0) {
        setIsProcessingApproval(true);
        const approveTransactionHash = await walletClient?.writeContract(
          approve.request
        );
        const ApprovalTransaction =
          await publicClient.waitForTransactionReceipt({
            hash: approveTransactionHash as `0x`,
          });
        setIsProcessingApproval(false);
      }

      const data = await publicClient?.simulateContract({
        account,
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "createPoolWithQVHatsSablierStrategy",
        args: [
          profileID.profileID,
          {
            maxVoiceCreditsPerAllocator: BigInt(poolForm.maxVotesPerAllocator),
            params: {
              roundOnePercentage: poolForm.roundOnePercentage,
              voteThreshold: poolForm.votesThreshold,
              registrationBeginsIn: 0,
              registrationDuration: 14400,
              allocationDuration: poolForm.allocationDurationDays,
              projectsWorkingDuration: poolForm.projectsWorkingDurationDays,
              projectsOutComeReviewDuration:
                poolForm.projectsReviewingDurationDays,
              reviewerHatId: BigInt(0),
              poolManagerHatId: BigInt(0),
              data: "0x0000",
            },
          },
          poolForm.tokenAddress as `0x${string}`,
          BigInt(poolForm.startingPoolAmount * 10 ** 18),
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
      console.log("Transaction Sent");
      const transaction = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });
      setIsProcessingTransaction(false);
      return true;
    } catch (error) {
      return false;
    }
  };

  // const calculateSeconds = (days: any) => days * 24 * 60 * 60;
  const calculateSeconds = (days: any) => days * 60;

  const handleFileChange = (event: any) => {
    setPoolForm({ ...poolForm, poolImage: event.target.files[0] });
  };

  const handleSubmit = async () => {
    if (
      !poolForm.poolName ||
      !poolForm.poolDescription ||
      !poolForm.poolImage ||
      !poolForm.tokenAddress ||
      !poolForm.startingPoolAmount
    ) {
      toast({ title: "Please fill in all fields", status: "warning" });
      return;
    }

    const formData = new FormData();
    if (poolForm.poolImage) {
      formData.append("file", poolForm.poolImage);
    }

    // Append other profile details to the form data
    formData.append("name", poolForm.poolName);
    formData.append("description", poolForm.poolDescription);
    formData.append("image", poolForm.poolImage);
    formData.append("tokenAddress", poolForm.tokenAddress);
    formData.append("startingPoolAmount", String(poolForm.startingPoolAmount));
    formData.append(
      "allocationDurationDays",
      String(poolForm.allocationDurationDays)
    );
    formData.append(
      "projectsWorkingDurationDays",
      String(poolForm.projectsWorkingDurationDays)
    );
    formData.append(
      "projectsReviewingDurationDays",
      String(poolForm.projectsReviewingDurationDays)
    );
    formData.append("roundOnePercentage", String(poolForm.roundOnePercentage));
    formData.append(
      "maxVotesPerAllocator",
      String(poolForm.maxVotesPerAllocator)
    );

    setIsUploading(true); // Start uploading

    try {
      const response = await axios.post("/api/uploadPool", formData);
      const { fileCid, metadataCid } = response.data;
      console.log("File uploaded to IPFS with CID:", fileCid);
      console.log("Metadata uploaded to IPFS with CID:", metadataCid);

      setIsUploading(false); // Stop uploading

      toast({
        title: "Profile Metadata Uploaded successfully",
        status: "success",
      });

      const res = await createPool(metadataCid);

      if (!res) {
        toast({
          title: "Transaction rejected",
          status: "error",
        });
        return;
      }
      toast({
        title: "Pool Created successfully",
        status: "success",
      });

      setTimeout(() => {
        router.reload(); // Replace '/' with the path to your home page
      }, 1300);

      // Now you can proceed to use these CIDs as needed
    } catch (error) {
      toast({ title: "Error Creating Pool", status: "error" });
    }
  };

  return (
    <>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Pool Name</FormLabel>
          <Input
            placeholder="Enter pool name"
            value={poolForm.poolName}
            onChange={(e) =>
              setPoolForm({ ...poolForm, poolName: e.target.value })
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Pool Description</FormLabel>
          <Input
            onChange={(val) =>
              setPoolForm({
                ...poolForm,
                poolDescription: val.target.value,
              })
            }
            value={poolForm.poolDescription}
            placeholder="Enter pool description"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Pool Image</FormLabel>
          <Input type="file" onChange={handleFileChange} accept="image/*" />
        </FormControl>
        <HStack align="center">
          <Switch
            id="registration-now"
            size="md"
            onChange={() => setRegistrationNow(!registrationNow)}
          />
          <FormLabel htmlFor="registration-now" mb="0">
            Registration Starts Now
          </FormLabel>
        </HStack>
        {!registrationNow && (
          <FormControl>
            <FormLabel>Registration Start Date</FormLabel>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
              minDate={new Date()}
            />
          </FormControl>
        )}

        <FormControl isRequired>
          <FormLabel>Registration End Date</FormLabel>
          <DatePicker
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
            minDate={startDate}
          />
        </FormControl>
        <FormControl isRequired>
          <Tooltip label="Allocation starts after Registration ends. Duration in days.">
            <FormLabel>Allocation Duration (in days)</FormLabel>
          </Tooltip>
          <NumberInput
            min={0}
            onChange={(val) =>
              setPoolForm({
                ...poolForm,
                allocationDurationDays: calculateSeconds(val),
              })
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <Tooltip label="Duration for projects to work after first distribution. Duration in days.">
            <FormLabel>Projects Working Duration (in days)</FormLabel>
          </Tooltip>
          <NumberInput
            min={0}
            onChange={(val) =>
              setPoolForm({
                ...poolForm,
                projectsWorkingDurationDays: calculateSeconds(val),
              })
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <Tooltip label="Duration for reviewing project outcomes after working duration. Duration in days.">
            <FormLabel>Projects Reviewing Duration (in days)</FormLabel>
          </Tooltip>
          <NumberInput
            min={0}
            onChange={(val) =>
              setPoolForm({
                ...poolForm,
                projectsReviewingDurationDays: calculateSeconds(val),
              })
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Round One Distribution Percentage</FormLabel>
          <NumberInput
            max={100}
            min={0}
            onChange={(val: any) =>
              setPoolForm({
                ...poolForm,
                roundOnePercentage: val,
              })
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Maximum Votes Per Allocator</FormLabel>
          <NumberInput
            min={0}
            onChange={(val: any) =>
              setPoolForm({
                ...poolForm,
                maxVotesPerAllocator: val,
              })
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Token Address</FormLabel>
          <Input
            placeholder="Enter token address"
            value={poolForm.tokenAddress}
            onChange={(e) =>
              setPoolForm({ ...poolForm, tokenAddress: e.target.value })
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Starting Pool Amount</FormLabel>
          <NumberInput
            min={0}
            onChange={(val: any) =>
              setPoolForm({
                ...poolForm,
                startingPoolAmount: val,
              })
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Create Pool
        </Button>
        {isUploading || isProcessingTransaction ? (
          <div>
            <span style={{ fontSize: "md" }}>{getLoadingMessage()}</span>
          </div>
        ) : null}
      </VStack>
    </>
  );
};

export default CreatePoolModal;
