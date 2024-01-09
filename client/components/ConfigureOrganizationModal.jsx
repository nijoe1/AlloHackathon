import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  chakra,
  Center,
} from "@chakra-ui/react";

import ManageOrganizationTab from "./ManageOrganizationTab";
import CreatePoolModal from "./CreatePoolModal";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

const ConfigureOrganizationModal = ({ profileID }) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const StyledModalBody = chakra(ModalBody, {
    baseStyle: {
      overflowY: "auto",
      maxHeight: "70vh",
      "::-webkit-scrollbar": {
        width: "4px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "gray.200",
        borderRadius: "24px",
      },
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  // ... other states and hooks

  return (
    <>
      <Button colorScheme={"blue"}onClick={onOpen}>Configure Organization</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configure Organization</ModalHeader>
          <ModalCloseButton />
          <StyledModalBody>
            <Center>
              <Tabs variant="enclosed" isFitted>
                <TabList mb="1em">
                  <Tab>Create Pool</Tab>
                  <Tab>Manage Organization</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    {/* Pool Creation Form */}
                    <CreatePoolModal profileID={profileID} />
                  </TabPanel>

                  <TabPanel>
                    {/* Organization Management Form */}
                    <ManageOrganizationTab orgID={profileID} />{" "}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Center>
          </StyledModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfigureOrganizationModal;
