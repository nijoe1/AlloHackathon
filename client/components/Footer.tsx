import React from "react";
import { Button } from "@chakra-ui/react";

const Footer = () => {
  return (
    <div className="fixed z-50 bottom-0 left-0 w-full">
      <footer className=" bg-gradient-to-r from-gray via-gray to-gray-800 border border-4 border-black rounded-md py-4 mx-1px border flex col items-center text-center text-gray-100 max-w-full">
        <hr className="my-8 border-blue-gray-50" />
        <Button color="gray-200" size="sm" className="mx-auto block text-black">
          Copyright &copy; 2024 RocketFunding, All rights reserved.
        </Button>
      </footer>
    </div>
  );
};

export default Footer;
