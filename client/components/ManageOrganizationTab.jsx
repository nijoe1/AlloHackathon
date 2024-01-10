import React, { useState, useEffect, use } from "react";
import { getOrgMembers } from "@/utils/utils";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  Flex,
  Switch,
  Center,
  Text,
  Icon,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const StyledTable = chakra(Table, {
  baseStyle: {
    width: "full",
    "th, td": {
      textAlign: "center",
    },
  },
});

import { HATS_ABI, HATS_CONTRACT_ADDRESS } from "@/constants/Hats";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { getProfileHats } from "@/utils/tableland";

const ManageOrganizationTab = ({ orgID }) => {
  const [detailsFetched, setDetailsFetched] = useState(false);
  const [newMembers, setNewMembers] = useState([]);
  const [showRemoveToggle, setShowRemoveToggle] = useState(false);
  const [members, setMembers] = useState();
  const [Hats, setHats] = useState();
  useEffect(() => {
    async function fetch() {
      let res = await getOrgMembers(orgID);
      let OrgData = await getProfileHats(orgID);
      let HATS = [OrgData.adminHat, OrgData.managerHat, OrgData.reviewerHat];

      console.log(HATS);
      setMembers(res.result);
      setHats(HATS);
      console.log(res.HATSIDs);
      setDetailsFetched(!detailsFetched);
    }
    if (!detailsFetched) fetch();
  }, [orgID, detailsFetched]);

  const handleAddMember = () => {
    setNewMembers([...newMembers, { role: "Manager", address: "" }]);
  };

  const handleRoleChange = (index, role) => {
    const updatedMembers = [...newMembers];
    updatedMembers[index].role = role;
    setNewMembers(updatedMembers);
  };

  const handleAddressChange = (index, address) => {
    const updatedMembers = [...newMembers];
    updatedMembers[index].address = address;
    setNewMembers(updatedMembers);
  };

  const handleAssignRoles = () => {
    // Implement logic to assign roles to new members
    console.log("Assigning roles to new members:", newMembers);
    assignNewRoles(newMembers);
  };

  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const assignNewRoles = async (newMembers) => {
    const roleToHatIndex = {
      Admin: 0,
      Manager: 2,
      Reviewer: 1,
    };

    const hatidArray = newMembers.map(({ role }) => Hats[roleToHatIndex[role]]);
    const addressArray = newMembers.map(({ address }) => address);
    console.log(hatidArray, addressArray);
    try {
      const data = await publicClient?.simulateContract({
        account,
        address: HATS_CONTRACT_ADDRESS,
        abi: HATS_ABI,
        functionName: "batchMintHats",
        args: [hatidArray, addressArray],
      });

      if (!walletClient) {
        console.log("Wallet client not found");
        return;
      }
      console.log(data);

      // @ts-ignore
      const hash = await walletClient.writeContract(data.request);
      console.log(hash);
      console.log("Transaction Sent");
      const transaction = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <VStack spacing={4} width="full" className="bg-gray-100">
      <Center>
        <div className="flex flex-wrap items-center gap-2 ">
          <Text fontSize="md" fontWeight="semibold" textAlign="center" mb={4}>
            {"Add Members"}
          </Text>
          <Switch
            isChecked={showRemoveToggle}
            onChange={() => setShowRemoveToggle(!showRemoveToggle)}
            mb={4}
          />
          <Text fontSize="md" fontWeight="semibold" textAlign="center" mb={4}>
            {"Remove members"}
          </Text>
        </div>
      </Center>

      <StyledTable variant="simple">
        <Thead>
          <Tr>
            <Th>Role</Th>
            <Th>Address</Th>
            {showRemoveToggle && <Th>Remove</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {detailsFetched &&
            members.map((member, index) => (
              <Tr key={index}>
                <Td>{member.role}</Td>
                <Td>{member.address}</Td>
                {showRemoveToggle && (
                  <Td>
                    <Button colorScheme="red">Remove</Button>
                  </Td>
                )}
              </Tr>
            ))}
          {!showRemoveToggle &&
            newMembers.map((member, index) => (
              <Tr key={index}>
                <Td>
                  <Select
                    value={member.role}
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                  >
                    <option value="Manager">Manager</option>
                    <option value="Reviewer">Reviewer</option>
                  </Select>
                </Td>
                <Td>
                  <Input
                    value={member.address}
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                    placeholder="Enter address"
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </StyledTable>

      {!showRemoveToggle && (
        <Center>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="blue"
            onClick={handleAddMember}
          >
            Add Member
          </Button>
        </Center>
      )}

      {!showRemoveToggle && newMembers.length > 0 && (
        <Flex justifyContent="flex-end" width="full">
          <Button colorScheme="green" onClick={handleAssignRoles}>
            Assign Roles
          </Button>
        </Flex>
      )}
    </VStack>
  );
};

export default ManageOrganizationTab;
