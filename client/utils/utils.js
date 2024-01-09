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
    console.log(data);

    let resp = await getProfileHats(data);
    const searchAdmin = resp?.hat?.wearers[0]?.id == address?.toLowerCase();

    if (searchAdmin === true) {
      let data = await getProfilesData([profile?.profileID]);
      let obj = { profileData: data, type: "ADMIN" };
      partOfProfiles.push(obj);
      continue;
    }
    console.log(resp?.hat);
    if (resp?.hat?.subHats[0]?.wearers) {
      for (const wearer of resp?.hat?.subHats[0]?.wearers) {
        if (wearer.id == address?.toLowerCase()) {
          let data = await getProfilesData([profile?.profileID]);
          let obj = { profileData: data, type: "MANAGER" };
          partOfProfiles.push(obj);
          continue;
        }
      }
    }
    if (resp?.hat?.subHats[0]?.subHats[0]?.wearers) {
      console.log("checking");

      for (const wearer of resp?.hat?.subHats[0]?.subHats[0]?.wearers) {
        console.log("checking");

        if (wearer?.id == address?.toLowerCase()) {
          let data = await getProfilesData([profile.profileID]);
          let obj = { profileData: data, type: "REVIEWER" };
          partOfProfiles.push(obj);
          continue;
        }
      }
    }
  }

  return partOfProfiles;
};

export const fileToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1]; // Extract the base64 part
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      reject(new Error("No file provided"));
    }
  });
};

export const getOrgMembers = async (profileID) => {
  const adminHat = await getProfileAdminHat(profileID);
  let data = encodePacked(["uint256"], [adminHat]);
  let resp = await getProfileHats(data);
  let res = parseHatObjectOneDimensional(resp);
  return res;
};

function parseHatObjectOneDimensional(hatData) {
  const addressAccessMap = new Map(); // To track access role for each address

  function parseHat(hat, access) {
    hat?.wearers?.forEach((wearer) => {
      const wearerAddress = wearer.id;

      if (!addressAccessMap.has(wearerAddress)) {
        addressAccessMap.set(wearerAddress, access);
      }
    });

    if (hat.subHats && hat.subHats.length > 0) {
      if (access === "Admin") {
        parseHat(hat.subHats[0], "Manager"); // First subhat is Manager
      } else if (access === "Manager") {
        hat.subHats[0].wearers.forEach((wearer) => {
          const wearerAddress = wearer.id;

          if (!addressAccessMap.has(wearerAddress)) {
            addressAccessMap.set(wearerAddress, "Reviewer");
          }
        });
      }
    }
  }

  parseHat(hatData.hat, "Admin");

  const result = Array.from(addressAccessMap, ([address, role]) => ({
    role,
    address,
  }));
  return { result };
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
