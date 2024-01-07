import { getProfileHats } from "@/utils/graphFunctions";

import { encodePacked } from "viem";

import {
  getAllProfilesAdminHat,
  getProfilesData,
  getProfileAdminHat,
} from "@/utils/tableland";

import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/HackRegistry";

export const formatCurrency = (value) => {
  value = BigInt(value) / BigInt(10 ** 18);

  let formattedValue;

  if (value < BigInt(1000)) {
    // If value is less than a thousand
    formattedValue = `$${value.toString()}`;
  } else if (value < BigInt(1000000)) {
    // If value is less than a million
    formattedValue = `$${value / BigInt(1000)}K`;
  } else if (value < BigInt(1000000000)) {
    // If value is less than a billion
    formattedValue = `$${value / BigInt(1000000)}M`;
  } else if (value < BigInt(1000000000000)) {
    // If value is less than a trillion
    formattedValue = `$${value / BigInt(1000000000)}B`;
  } else {
    // If value is a trillion or more
    formattedValue = `$${value / BigInt(1000000000000)}T`;
  }

  return formattedValue;
};

export const calculateRemainingTime = (currentTime, endTime) => {
  let remainingTimeInSeconds = endTime - currentTime;
  remainingTimeInSeconds = parseInt(remainingTimeInSeconds);
  const days = Math.floor(remainingTimeInSeconds / (3600 * 24));
  const hours = Math.floor((remainingTimeInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);

  let formattedTime = "";
  if (days > 0) formattedTime += `${days}d `;
  if (hours > 0) formattedTime += `${hours}h `;
  if (minutes > 0) formattedTime += `${minutes}m`;

  return formattedTime || "ENDED";
};

export const getUserOrganizations = async (address) => {
  const profiles = await getAllProfilesAdminHat();
  let partOfProfiles = [];
  for (const profile of profiles) {
    const adminHat = profile.adminHat;
    let data = encodePacked(["uint256"], [adminHat]);
    let resp = await getProfileHats(data);
    const searchAdmin = resp.hat.wearers[0].id == address?.toLowerCase();
    if (searchAdmin) {
      let data = await getProfilesData([profile.profileID]);
      let obj = { profileData: data, type: "ADMIN" };
      partOfProfiles.push(obj);
      continue;
    }
    for (const wearer of resp.hat.subhats.wearers) {
      if (wearer.id == address?.toLowerCase()) {
        let data = await getProfilesData([profile.profileID]);
        let obj = { profileData: data, type: "MANAGER" };
        partOfProfiles.push(obj);
        continue;
      }
    }

    for (const wearer of resp.hat.subhats.subhats.wearers) {
      if (wearer.id == address?.toLowerCase()) {
        let data = await getProfilesData([profile.profileID]);
        let obj = { profileData: data, type: "REVIEWER" };
        partOfProfiles.push(obj);
        continue;
      }
    }
  }

  return partOfProfiles;
};

export const getOrgMembers = async (profileID) => {
  const adminHat = await getProfileAdminHat(profileID);
  console.log(adminHat);
  let data = encodePacked(["uint256"], [adminHat]);
  let resp = await getProfileHats(data);
  let RolesArray = parseHatObjectOneDimensional(resp);
  console.log(RolesArray);
  return RolesArray;
};

function parseHatObjectOneDimensional(hatData) {
  const addressAccessMap = new Map(); // To track access role for each address

  function parseHat(hat, access) {
    hat.wearers.forEach((wearer) => {
      const wearerAddress = wearer.id;

      if (!addressAccessMap.has(wearerAddress)) {
        addressAccessMap.set(wearerAddress, access);
      } else if (
        access === "Manager" &&
        addressAccessMap.get(wearerAddress) !== "Admin"
      ) {
        addressAccessMap.set(wearerAddress, access);
      } else if (
        access === "Reviewer" &&
        addressAccessMap.get(wearerAddress) !== "Admin" &&
        addressAccessMap.get(wearerAddress) !== "Manager"
      ) {
        addressAccessMap.set(wearerAddress, access);
      }
    });

    if (hat.subHats && hat.subHats.length > 0) {
      if (access === "Admin") {
        parseHat(hat.subHats[0], "Manager"); // First subhat is Manager
        for (let i = 1; i < hat.subHats.length; i++) {
          parseHat(hat.subHats[i], "Reviewer"); // Other subhats are Reviewers
        }
      }
    }
  }

  parseHat(hatData.hat, "Admin");

  const result = Array.from(addressAccessMap, ([address, role]) => ({
    role,
    address,
  }));

  return result;
}
export const getUserAdminOrgs = async (address) => {
  const profiles = await getAllProfilesAdminHat();
  let partOfProfiles = [];
  for (const profile of profiles) {
    const adminHat = profile.adminHat;
    let data = encodePacked(["uint256"], [adminHat]);
    let resp = await getProfileHats(data);
    const searchAdmin = resp.hat.wearers[0].id == address?.toLowerCase();
    if (searchAdmin) {
      let data = await getProfilesData([profile.profileID]);
      let obj = { profileData: data, type: "ADMIN" };
      partOfProfiles.push(obj);
      continue;
    }
  }

  return partOfProfiles;
};
