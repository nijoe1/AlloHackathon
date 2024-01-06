import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import { RiNftLine } from "react-icons/ri";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { useRef } from "react";
import { Badge } from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import { FaTwitter } from "react-icons/fa6";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { Code } from "@chakra-ui/react";
import {
  useAccount,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESSES } from "@/constants/contracts";

import { parseEther } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "@/components/navbar";
const Create = () => {
  // const chainID = useChainId();
  const toast = useToast();
  const assistID = "asst_4YruN6LyHritMXIFQX0NGmht";
  const threadId = "thread_0xBV2sYKFkHvwbD6IQefwc9B";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [inputPrompt, setInputPrompt] = useState<string>();
  const [assistantID, setAssistantID] = useState<string>();
  const [agentDetails, setAgentDetails] = useState<{
    agentName: string;
    agentDesc: string;
    agentInstruc: string;
    agentPrice: string;
    agentBP: string;
    agentCategory: string;
    agentImage: string | undefined;
  }>({
    agentName: "",
    agentDesc: "",
    agentPrice: "",
    agentInstruc: "",
    agentBP: "",
    agentCategory: "",
    agentImage: undefined,
  });
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [threadMessages, setThreadMessages] = useState<any>();

  const [threadID, setThreadID] = useState<string>();
  const [openToContribution, setOpenToContribution] = useState<boolean>(false);
  const [tweet, setTweet] = useState<boolean>(false);
  const [mail, setMail] = useState<boolean>(false);
  const [file, setFile] = useState("");
  const [codeInterpreter, setCodeInterpreter] = useState<boolean>(false);
  const [fileInterpreter, setFileInterpreter] = useState<boolean>(false);
  const [imageGeneration, setImageGeneration] = useState<boolean>(false);

  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    //@ts-ignore
    hiddenFileInput?.current?.click();
  };
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    setFile(fileUploaded);
  };





  

  const registerAgent = async (_assistantID: string) => {
    try {
      if (
        agentDetails.agentBP == "" &&
        agentDetails.agentPrice == "" &&
        agentDetails.agentName == ""
      ) {
        console.log("Agent Details missing");
        return;
      }


      // const data = await publicClient?.simulateContract({
      //   account,
      //   address: CONTRACT_ADDRESSES,
      //   abi: CONTRACT_ABI,
      //   functionName: "registerAgent",
      //   args: [
      //     // {
      //     //   // struct
      //     // },
      //   ],
      // });
      // console.log(data);
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
      console.log(transaction);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-white via-white to-rose-100">
      <div className="fixed z-50 top-0 left-0 w-full ">
        {" "}
        <Navbar />
      </div>
      <div className="flex flex-col mt-16  border border-t-4 border-black"></div>
      <div className="flex justify-between mx-10 pt-3 pb-2">
        <p className="text-black mt-1 text-2xl font-bold">Create an Agent</p>
        <div>
          <Button
            // @ts-ignore
            ref={btnRef}
            className="mx-3 bg-black border border-b-4 border-black"
            colorScheme=""
            onClick={onOpen}
          >
            Configure
          </Button>
          <Button
            // onClick={() => createAssistant()}
            className="mx-3 border border-b-4 border-black"
          >
            Create
          </Button>
          {/* <ConnectButton */}
        </div>
      </div>
      <hr className="h-0.5 bg-black" />
      <div className="flex   items-center mx-50">
        <div className="mt-10 w-1/2 mx-auto my-auto bg-indigo-100 px-10 flex flex-col border-2 border-black rounded-2xl">
          <div className="mt-5">
            <p className="text-black text-2xl font-semibold text-center">
              Profile Details
            </p>
          </div>
          <div className="mx-auto mt-6">
          </div>
          <div className="flex flex-col items-center text-center mx-auto ">
            <div className="mt-7">
              <p className="text-xl text-black font-semibold">Name</p>
              <input
                type="text"
                placeholder="be creative ..."
                className="px-5 py-2 rounded-xl mt-2 w-full font-semibold border border-black"
                onChange={(e) =>
                  setAgentDetails({
                    ...agentDetails,
                    agentName: e.target.value,
                  })
                }
                value={agentDetails.agentName}
              ></input>
            </div>
            
            <div className="mt-5">
              <p className="text-xl text-black font-semibold">
                Description
              </p>
              <textarea
                placeholder="tell what the agent does ..."
                className="px-5 py-2 rounded-xl mt-2 w-full font-semibold h-36 border border-black"
                onChange={(e) =>
                  setAgentDetails({
                    ...agentDetails,
                    agentDesc: e.target.value,
                  })
                }
                value={agentDetails.agentDesc}
              ></textarea>
            </div>
            <div className="mt-5">
              <p className="text-xl text-black font-semibold">
                X profile link
              </p>
              <textarea
                placeholder="tell what the agent does ..."
                className="px-5 py-2 rounded-xl mt-2 w-full font-semibold border border-black"
                onChange={(e) =>
                  setAgentDetails({
                    ...agentDetails,
                    agentDesc: e.target.value,
                  })
                }
                value={agentDetails.agentDesc}
              ></textarea>
            </div>
            <div className="mt-5">
              <p className="text-xl text-black font-semibold">
                Organization website
              </p>
              <textarea
                placeholder="tell what the agent does ..."
                className="px-5 py-2 rounded-xl mt-2 w-full font-semibold h-36 border border-black"
                onChange={(e) =>
                  setAgentDetails({
                    ...agentDetails,
                    agentDesc: e.target.value,
                  })
                }
                value={agentDetails.agentDesc}
              ></textarea>
            </div>
          </div>
        </div>
        {/* <div className="w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-100"></div> */}
        
      </div>
      <div className="flex flex-col mt-16">
        <Drawer
          isOpen={isOpen}
          placement="right"
          size="md"
          closeOnEsc={false}
          closeOnOverlayClick={false}
          onClose={onClose}
          colorScheme="orange"
        >
          <div className="flex flex-col mt-16"></div>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader className="bg-indigo-100" fontSize="x-large">
              Configure Profile Roles
            </DrawerHeader>
            <DrawerBody className="bg-indigo-100">
              <div className="flex flex-col">
                <div>
                  <p className="text-xl text-black font-semibold">
                    Price of Agent
                  </p>
                  <input
                    type="number"
                    className="mt-2 px-5 w-full rounded-xl py-2 border border-black"
                    placeholder="in ethers"
                    onChange={(e) =>
                      setAgentDetails({
                        ...agentDetails,
                        agentPrice: e.target.value,
                      })
                    }
                    value={agentDetails.agentPrice}
                  ></input>
                </div>
                <div className="mt-6">
                  <p className="text-xl text-black font-semibold">
                    Basis point ( BP )
                  </p>
                  <input
                    type="number"
                    className="mt-2 px-5 w-full rounded-xl py-2 border border-black"
                    placeholder="in % like 10%"
                    onChange={(e) =>
                      setAgentDetails({
                        ...agentDetails,
                        agentBP: e.target.value,
                      })
                    }
                    value={agentDetails.agentBP}
                  ></input>
                </div>
                <div className="mt-6">
                  <p className="text-xl text-black font-semibold">Category</p>
                  <input
                    type="text"
                    className="mt-2 px-5 w-full rounded-xl py-2 border border-black"
                    placeholder="like coding , fitness"
                    onChange={(e) =>
                      setAgentDetails({
                        ...agentDetails,
                        agentCategory: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="mt-6">
                  <p className="text-xl text-black font-semibold">
                    Open to Contributions ( training )
                  </p>
                  <div className="mt-2">
                    <Badge colorScheme="red" className="mx-3">
                      no
                    </Badge>
                    <Switch
                      size="lg"
                      onChange={() =>
                        setOpenToContribution(!openToContribution)
                      }
                      colorScheme="orange"
                    />
                    <Badge colorScheme="green" className="mx-3">
                      yes
                    </Badge>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xl text-black font-semibold">Actions</p>
                  <div className="mt-2 flex">
                    <div className="mx-3">
                      <p className="text-sm font-mono">Post on </p>
                      <div
                        className={` ${
                          tweet === true && "border-2 border-blue-500"
                        } border-2 border-black rounded-full px-3 py-2.5 w-12 mt-3 cursor-pointer`}
                        onClick={() => setTweet(!tweet)}
                      >
                        <FaTwitter
                          className={`${
                            tweet === true && "text-blue-500 text-2xl"
                          } text-black text-2xl`}
                        />
                      </div>
                    </div>
                    <div className="mx-3">
                      <p className="text-sm font-mono">Mint NFT</p>
                      <div
                        className={` border-2 border-black rounded-full px-3 py-2.5 w-12 mt-3 cursor-pointer`}
                      >
                        <RiNftLine className={`text-black text-2xl`} />
                      </div>
                    </div>
                    <div className="mx-3">
                      <p className="text-sm font-mono">Send</p>
                      <div
                        className={` ${
                          mail === true && "border-2 border-red-500"
                        } border-2 border-black rounded-full px-2.5 py-2.5 w-12 mt-3 cursor-pointer`}
                        onClick={() => setMail(!mail)}
                      >
                        <IoIosMail
                          className={`${
                            mail === true && "text-red-500 text-2xl text-center"
                          } text-black text-2xl text-center`}
                        />
                      </div>
                    </div>
                    <div className="mx-3">
                      <p className="text-sm font-mono text-center">Send Tx</p>
                      <div
                        className={` border-2 border-black rounded-full px-2.5 py-2.5 w-12 mt-3 cursor-pointer`}
                        onClick={() => setMail(!mail)}
                      >
                        <FaEthereum
                          className={`text-black text-2xl text-center`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="text-sm font-mono">Tools</p>
                    <div className="flex justify-between w-full mt-2">
                      <p className="text-md font-semibold">Image Generation</p>
                      <Switch
                        size="lg"
                        onChange={() => setImageGeneration(!imageGeneration)}
                        colorScheme="orange"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter className="bg-indigo-100">
              <button
                onClick={() => onClose()}
                className="mx-auto px-10 py-2 bg-pink-200 border-b-4 text-black font-semibold text-xl border border-black rounded-xl"
              >
                Save Configuration
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Create;
