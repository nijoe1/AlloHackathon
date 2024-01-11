import React, { useEffect, useState } from "react";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import HeroAnimation from "@/components/Animation/HeroAnimation";
export default function Home() {
  // useState and useEffect to fetch and set dynamic data

  return (
    <div>
      <div className="w-screen h-screen bg-gradient-to-r from-gray-700 to-gray-800">
        <div className="w-5/6 mt-20 flex flex-col justify-center mx-auto mb-2">
          <div className="mt-20 mx-auto p-6 bg-gray-100 shadow-xl rounded-lg max-w-4xl">
            <div className="items-center text-center">
              <p className="font-md font-mono text-black font-bold mt-2">
                Welcome to rocketFunding, where your innovative ideas find the
                support they deserve. Our platform enables organizations to
                initiate and participate in dynamic funding pools, fostering a
                community of growth and success. Utilizing a unique blend of
                Allo Quadratic Voting Strategy and Sablier Strategy together
                with Access Control using the Hats Protocol, we ensure fair and
                continuous project financing.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() =>
                  window.open(
                    "https://github.com/nijoe1/AlloHackathon",
                    "_blank",
                  )
                }
                className="mt-5 bg-gradient-to-r from-gray-100 to bg-gray-500 hover:from-gray-500 hover:to-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full"
              >
                Source Code
              </button>
            </div>
          </div>
          <div className="mt-30">
            {" "}
            <HeroAnimation></HeroAnimation>
          </div>

          {/* Powered By Section */}
          <div className="mt-20 flex flex-col items-center text-center rounded-xl">
            <h2 className="text-2xl font-bold mb-5 text-bolder text-gray-100">
              Powered By
            </h2>
            <div className="flex flex-wrap justify-center  items-center gap-8">
              <div className="flex flex-col items-center text-center">
                <img
                  src={
                    "https://gateway.lighthouse.storage/ipfs/QmUsSbCJbBAxVshMjfho9tdtXaWMfDxY4Skshja7ZAwZsf"
                  }
                  alt="Allo"
                  className="h-16 rounded-xl"
                />
                <p className="text-bolder text-gray-100 text-2xl mt-2">Allo</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://gateway.lighthouse.storage/ipfs/QmZCYxNUHghpEg7V59a2dXYC1C7DdxEayiwrYpJV9jwoaN"
                  alt="Sablier"
                  className="h-16 rounded-xl"
                />
                <p className="text-bolder text-gray-100 text-2xl mt-2">
                  Sablier
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://gateway.lighthouse.storage/ipfs/QmY8chhuhg6DxatLdpGQvCjFHwpBxxiWmQSvuFymw6tZ5S"
                  alt="Hats"
                  className="h-16 rounded-xl"
                />
                <p className="text-bolder text-gray-100 text-2xl mt-2">Hats</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://gateway.lighthouse.storage/ipfs/QmX817fdeegqAKkYXTZ5Q9fSYyXMgy7uEXfs1GWE8AKNdT"
                  alt="Hats"
                  className="h-16 rounded-xl"
                />
                <p className="text-bolder text-gray-100 text-2xl mt-2">
                  Tableland
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
