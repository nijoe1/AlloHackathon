import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="fixed z-50 top-0 left-0 w-full">
      <div className="w-screen bg-gradient-to-r from-gray via-gray to-gray-800 border border-4 border-black rounded-md ">
        <div className="flex justify-between mx-6 ml-10 mb-4">
          <div onClick={() => router.push("/")} className="mt-2 cursor-pointer">
            <p className="font-semibold text-gray-200 mt-3 text-2xl">
              🚀RocketFunding
            </p>
          </div>
          <div className="flex justify-center mx-auto">
            <div className=" px-1 py-1 rounded-3xl flex mt-4 ">
              <div
                onClick={() => router.push("/userProfiles")}
                className="bg-gray-100 rounded-3xl px-2 py-1 mx-1 cursor-pointer "
              >
                <p className=" text-center text-md font-semibold my-auto text-black">
                  Profiles
                </p>
              </div>
              <div
                onClick={() => router.push("/pools")}
                className="bg-gray-100 rounded-3xl px-2 py-1 mx-1 cursor-pointer"
              >
                <p className="text-center text-md font-semibold my-auto text-black">
                  Pools
                </p>
              </div>
              <div
                onClick={() => router.push("/create")}
                className="bg-gray-100 rounded-3xl px-2 py-1 mx-1 cursor-pointer"
              >
                <p className="text-center text-md font-semibold my-auto text-black">
                  Create
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ConnectButton
              accountStatus="full"
              showBalance={false}
              chainStatus="full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
