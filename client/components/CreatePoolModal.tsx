import React, { use, useEffect, useRef, useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Switch,
  Text,
  HStack,
  Button,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/RocketFundingRegistry";
import { DAI_ABI, DAI_ADDRESS } from "@/constants/DAI";
import { useRouter } from "next/router";
import axios from "axios";
import { fileToBase64 } from "@/utils/utils";
import { MdOutlineAttachFile } from "react-icons/md";

const CreatePoolModal = (profileID: any) => {
  const router = useRouter();
  const [registrationNow, setRegistrationNow] = useState(false);
  const [file, setFile] = useState<any>("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [poolForm, setPoolForm] = useState({
    poolName: "",
    poolDescription: "",
    poolImage: undefined as any,
    RegistrationDurationDays: 0,
    RegistrationDurationHours: 0, // Add hours field
    RegistrationDurationMinutes: 0, // Add minutes field
    allocationDurationDays: 0,
    allocationDurationHours: 0, // Add hours field
    allocationDurationMinutes: 0, // Add minutes field
    projectsWorkingDurationDays: 0,
    projectsWorkingDurationHours: 0, // Add hours field
    projectsWorkingDurationMinutes: 0, // Add minutes field
    projectsReviewingDurationDays: 0,
    projectsReviewingDurationHours: 0, // Add hours field
    projectsReviewingDurationMinutes: 0, // Add minutes field
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
  }, [poolForm, file]);

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
          BigInt((poolForm.startingPoolAmount + 1) * 10 ** 18),
        ],
      });
      console.log(approve);

      if (poolForm.startingPoolAmount > 0) {
        setIsProcessingApproval(true);
        const approveTransactionHash = await walletClient?.writeContract(
          approve.request,
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
            maxVoiceCreditsPerAllocator: BigInt(
              poolForm.maxVotesPerAllocator + 1,
            ),
            params: {
              roundOnePercentage: poolForm.roundOnePercentage,
              voteThreshold: poolForm.votesThreshold,
              registrationBeginsIn: 0,
              registrationDuration: calculateTime(
                poolForm.RegistrationDurationDays,
                poolForm.RegistrationDurationHours,
                poolForm.RegistrationDurationMinutes,
              ),
              allocationDuration: calculateTime(
                poolForm.allocationDurationDays,
                poolForm.allocationDurationHours,
                poolForm.allocationDurationMinutes,
              ),
              projectsWorkingDuration: calculateTime(
                poolForm.projectsWorkingDurationDays,
                poolForm.projectsWorkingDurationHours,
                poolForm.projectsWorkingDurationMinutes,
              ),
              projectsOutComeReviewDuration: calculateTime(
                poolForm.projectsReviewingDurationDays,
                poolForm.projectsReviewingDurationHours,
                poolForm.projectsReviewingDurationMinutes,
              ),
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

  const calculateTime = (days: any, hours: any, minutes: any) =>
    days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60;

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    setPoolForm({ ...poolForm, poolImage: event.target.files[0] });
  };

  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    //@ts-ignore
    hiddenFileInput?.current?.click();
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

    const selectedFile = file;

    let base64Image = await fileToBase64(selectedFile);

    const formData = new FormData();

    // Append other profile details to the form data
    formData.append("name", poolForm.poolName);
    formData.append("description", poolForm.poolDescription);
    formData.append("image", String(base64Image));
    formData.append("tokenAddress", poolForm.tokenAddress);
    formData.append("startingPoolAmount", String(poolForm.startingPoolAmount));
    formData.append(
      "allocationDurationDays",
      String(
        calculateTime(
          poolForm.allocationDurationDays,
          poolForm.allocationDurationHours,
          poolForm.allocationDurationMinutes,
        ),
      ),
    );
    formData.append(
      "projectsWorkingDurationDays",
      String(
        calculateTime(
          poolForm.projectsWorkingDurationDays,
          poolForm.projectsWorkingDurationHours,
          poolForm.projectsWorkingDurationMinutes,
        ),
      ),
    );
    formData.append(
      "projectsReviewingDurationDays",
      String(
        calculateTime(
          poolForm.projectsReviewingDurationDays,
          poolForm.projectsReviewingDurationHours,
          poolForm.projectsReviewingDurationMinutes,
        ),
      ),
    );
    formData.append("roundOnePercentage", String(poolForm.roundOnePercentage));
    formData.append(
      "maxVotesPerAllocator",
      String(poolForm.maxVotesPerAllocator),
    );

    setIsUploading(true); // Start uploading

    try {
      const response = await axios.post("/api/uploadPool", formData);
      const { metadataCid } = response.data;

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
      <VStack spacing={4} width={300} bg={"gray.100"}>
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          <FormLabel>Pool Name</FormLabel>
          <Input
            placeholder="Enter pool name"
            value={poolForm.poolName}
            onChange={(e) =>
              setPoolForm({ ...poolForm, poolName: e.target.value })
            }
          />
        </FormControl>
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
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
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
          <FormLabel>Pool Image</FormLabel>
          <HStack spacing="2">
            <Button
              onClick={() => handleClick()}
              leftIcon={<MdOutlineAttachFile />}
            >
              Upload Image
            </Button>
            <div>
              <Text fontSize="sm">
                {file?.name ? file?.name : "No file selected"}
              </Text>
            </div>

            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
          </HStack>
        </FormControl>
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
          <HStack align="center">
            <Switch
              id="registration-now"
              size="md"
              onChange={() => setRegistrationNow(!registrationNow)}
            />
            <FormLabel htmlFor="registration-now" mb="0">
              Registration Starts Now?
            </FormLabel>
          </HStack>
        </FormControl>
        {!registrationNow && (
          <FormControl
            isRequired
            border="1px"
            borderColor="blue.500"
            p={3}
            borderRadius="md"
          >
            {" "}
            <FormLabel>Registration Start Date</FormLabel>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
              minDate={new Date()}
            />
          </FormControl>
        )}
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
          <Tooltip
            placement="top"
            label="Acceptance Threshold: The minimum number of votes required for a project to be accepted into the pool"
          >
            <FormLabel>Acceptance Threshold</FormLabel>
          </Tooltip>
          <NumberInput
            min={0}
            onChange={(val: any) =>
              setPoolForm({
                ...poolForm,
                votesThreshold: val,
              })
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
          <Tooltip
            placement="top"
            label="Registration Duration defines the time that profiles can register into the pool"
          >
            <FormLabel>Registration Duration (days, hours, minutes)</FormLabel>
          </Tooltip>
          <HStack>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  RegistrationDurationDays: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  RegistrationDurationHours: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  RegistrationDurationMinutes: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
        </FormControl>
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
          <Tooltip
            placement="top"
            label="Allocation Starts after the end of the registration period"
          >
            <FormLabel>Allocation Duration (days, hours, minutes)</FormLabel>
          </Tooltip>
          <HStack>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  allocationDurationDays: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  allocationDurationHours: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  allocationDurationMinutes: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
        </FormControl>
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
          <Tooltip
            placement="top"
            label="Projects Work Period: Starts after Round One Distribution, following proposal acceptance, based on Sablier Stream allocations."
          >
            <FormLabel>
              Projects Working Duration (days, hours, minutes)
            </FormLabel>
          </Tooltip>
          <HStack>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  projectsWorkingDurationDays: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  projectsWorkingDurationHours: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  projectsWorkingDurationMinutes: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
        </FormControl>

        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
          <Tooltip
            placement="top"
            label="Projects Reviewing Period: Starts after Project Working Period is Over, Organization members can find out if projects completed their objectives otherwise disqualify them from the second Distribution."
          >
            <FormLabel>
              Projects Reviewing Duration (days, hours, minutes)
            </FormLabel>
          </Tooltip>
          <HStack>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  projectsReviewingDurationDays: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  projectsReviewingDurationHours: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              min={0}
              onChange={(val: any) =>
                setPoolForm({
                  ...poolForm,
                  projectsReviewingDurationMinutes: val,
                })
              }
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
        </FormControl>
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
          <Tooltip
            placement="top"
            label="The percentage to distribute in the first round after allocation period is over. Distribution happens using Sablier Streaming Protocol"
          >
            <FormLabel>Round One Distribution Percentage</FormLabel>
          </Tooltip>
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
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
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
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
          <Tooltip placement="top" label="Default Token DAI Stablecoin">
            <FormLabel>Token Address</FormLabel>
          </Tooltip>
          <Input
            placeholder="Enter token address"
            value={poolForm.tokenAddress}
            onChange={(e) =>
              setPoolForm({ ...poolForm, tokenAddress: e.target.value })
            }
          />
        </FormControl>
        <FormControl
          isRequired
          border="1px"
          borderColor="blue.500"
          p={3}
          borderRadius="md"
        >
          {" "}
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
        <Button colorScheme="blue" onClick={handleSubmit}>
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
