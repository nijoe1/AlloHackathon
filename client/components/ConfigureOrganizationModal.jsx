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

const ConfigureOrganizationModal = ({ profileID }) => {
  const StyledModalBody = chakra(ModalBody, {
    baseStyle: {
      overflowY: "auto",
      maxHeight: "70vh",
      "::-webkit-scrollbar": {
        width: "4px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "gray.100",
        borderRadius: "24px",
      },
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col items-center mt-5 bg-gray-100">
      <Button colorScheme={"blue"} onClick={onOpen}>
        Configure Organization
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="4xl"
        bg={"gray.100"}
      >
        <ModalOverlay />
        <ModalContent bg={"gray.100"}>
          <ModalHeader>Configure Organization</ModalHeader>
          <ModalCloseButton />
          <StyledModalBody>
            <Center>
              <Tabs variant="enclosed" isFitted>
                <TabList mb="1em">
                  <Tab>Create Pool</Tab>
                  <Tab>Manage Hats</Tab>
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
    </div>
  );
};

export default ConfigureOrganizationModal;
