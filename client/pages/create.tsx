import React, { useState } from "react";
import { Button, Input, InputGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";

import { useRef } from "react";
import { MdOutlineAttachFile } from "react-icons/md";

import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESSES } from "@/constants/contracts";

import { getProfileHats } from "@/utils/graphFunctions";

import { encodePacked } from "viem";

import {
  getAllProfilesAdminHat,
  getAllPoolsCreatedByProfile,
  getAllPoolsRegisteredByProfile,
} from "@/utils/tableland";

import Navbar from "@/components/navbar";
const Create = () => {
  const toast = useToast();
  const [profileDetails, setProfileDetails] = useState<{
    profileName: string;
    profileDescription: string;
    profileImage: string | undefined;
    twitterLink: string | undefined;
    websiteLink: string | undefined;
  }>({
    profileName: "",
    profileDescription: "",
    profileImage: undefined,
    twitterLink: "",
    websiteLink: "",
  });
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [file, setFile] = useState("");

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

  const get = async () => {
    // console.log(
    //   (
    //     await getAllPoolsCreatedByProfile(
    //       "0x33bb7a6647db8acad7e60a7dff816dc2948f27e3e0ffbc3df380a9369ba77a0c"
    //     )
    //   )[0].registeredRecipients[0].allocations
    //   // await getAllPoolsRegisteredByProfile(
    //   //   "0x12a70e17d1e208e2030a847ceee962a0d0ce437455bcb14f2f52624a0e86a551"
    //   // )
    // );
    // const allocations = (
    //   await getAllPoolsCreatedByProfile(
    //     "0x33bb7a6647db8acad7e60a7dff816dc2948f27e3e0ffbc3df380a9369ba77a0c"
    //   )
    // )[0].registeredRecipients[0].allocations;

    // console.log(JSON.parse(allocations).allocationFrom);

    const adminHat = (await getAllProfilesAdminHat())[0].adminHat;

    console.log(adminHat);

    const data = encodePacked(["uint256"], [adminHat]);

    console.log(data);

    const resp = await getProfileHats(data);

    console.log(resp);


  };

  const createProfile = async (_assistantID: string) => {
    try {
      if (
        profileDetails.profileDescription == "" &&
        profileDetails.profileImage == undefined &&
        profileDetails.profileName == ""
      ) {
        console.log("Profile Details missing");
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
      <div className="flex mt-20  items-center mx-50">
        <div className="mt-10 w-1/3 mx-auto my-auto bg-indigo-100 px-10 flex flex-col border-2 border-black rounded-2xl">
          <div className="mt-5">
            <p className="text-black text-2xl font-semibold text-center">
              Create Organization Profile
            </p>
          </div>
          <div className="mx-auto mt-6"></div>
          <div className="flex flex-col items-center text-center mx-auto ">
            <div className="mt-7">
              <p className="text-xl text-black font-semibold">Name</p>
              <input
                type="text"
                placeholder="be creative ..."
                className="px-5 py-2 rounded-xl mt-2 w-full font-semibold border border-black"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    profileName: e.target.value,
                  })
                }
                value={profileDetails.profileName}
              ></input>
            </div>
            <div className="mt-5">
              <p className="text-xl text-black font-semibold">Upload pfp</p>
              <InputGroup className="px-5 py-2 rounded-xl mt-2 w-full font-semibold h-9 border border-black">
                {file ? (
                  <p className="text-xs w-20 overflow">
                    {/* @ts-ignore */}
                    {file?.name}
                  </p>
                ) : (
                  <div>
                    <MdOutlineAttachFile
                      onClick={handleClick}
                      className="text-xl cursor-pointer"
                    ></MdOutlineAttachFile>
                    <input
                      type="file"
                      onChange={handleChange}
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </InputGroup>
            </div>

            <div className="mt-5">
              <p className="text-xl text-black font-semibold">Description</p>
              <textarea
                placeholder="tell what the agent does ..."
                className="px-5 py-2 rounded-xl mt-2 w-full font-semibold h-36 border border-black"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    profileDescription: e.target.value,
                  })
                }
                value={profileDetails.profileDescription}
              ></textarea>
            </div>

            <div className="mt-5">
              <p className="text-xl text-black font-semibold">X profile link</p>
              <textarea
                placeholder="tell what the agent does ..."
                className="px-5 py-2 rounded-xl mt-2 w-full font-semibold border border-black"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    twitterLink: e.target.value,
                  })
                }
                value={profileDetails.twitterLink}
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
                  setProfileDetails({
                    ...profileDetails,
                    websiteLink: e.target.value,
                  })
                }
                value={profileDetails.websiteLink}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col items-center text-center mx-auto mt-5 mb-2">
            <Button
              onClick={async () => {
                await get();
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
