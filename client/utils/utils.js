import { getProfileHats } from "@/utils/graphFunctions";

import { encodePacked } from "viem";

import {
  getAllProfilesAdminHat,
  getProfilesData,
  getProfileAdminHat,
} from "@/utils/tableland";
import axios from "axios";
import { getPublicClient } from "wagmi/actions";

import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
} from "@/constants/RocketFundingRegistry";

const publicClient = getPublicClient();

export const formatCurrency = (value) => {
  if (!value) return "$0";
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

export const formatDuration = (remainingTimeInSeconds) => {
  remainingTimeInSeconds = parseInt(remainingTimeInSeconds);
  const days = Math.floor(remainingTimeInSeconds / (3600 * 24));
  const hours = Math.floor((remainingTimeInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);

  let formattedTime = "";
  if (days > 0) formattedTime += `${days}d `;
  if (hours > 0) formattedTime += `${hours}h `;
  if (minutes > 0) formattedTime += `${minutes}m`;

  return formattedTime;
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

export const getUserProfileRole = async (address, adminHat) => {
  let data = encodePacked(["uint256"], [adminHat]);
  console.log(data);

  let resp = await getProfileHats(data);
  const searchAdmin = resp?.hat?.wearers[0]?.id == address?.toLowerCase();

  if (searchAdmin === true) {
    return "ADMIN";
  }
  console.log(resp?.hat);
  if (resp?.hat?.subHats[0]?.wearers) {
    for (const wearer of resp?.hat?.subHats[0]?.wearers) {
      if (wearer.id == address?.toLowerCase()) {
        return "MANAGER";
      }
    }
  }
  if (resp?.hat?.subHats[0]?.subHats[0]?.wearers) {
    console.log("checking");

    for (const wearer of resp?.hat?.subHats[0]?.subHats[0]?.wearers) {
      console.log("checking");

      if (wearer?.id == address?.toLowerCase()) {
        return "REVIEWER";
      }
    }
  }
  return "NONE";
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

export const processPoolStateAndRemainingTime = (pool, currentTime) => {
  let poolState;
  let remainingTime = 0;

  if (0 <= BigInt(pool.poolDetails.RETs) - currentTime) {
    poolState = "RegistrationPeriod";
    remainingTime = calculateRemainingTime(
      currentTime,
      BigInt(pool.poolDetails.RETs)
    );
  } else if (0 < BigInt(pool.poolDetails.AETs) - currentTime) {
    poolState = "AllocationPeriod";
    remainingTime = calculateRemainingTime(
      currentTime,
      BigInt(pool.poolDetails.AETs)
    );
  } else if (pool.poolDetails.DistributionStartTime == 0) {
    poolState = "WaitingForStreamDistribution";
    // Assuming no time limit for this state, or set a specific end time if applicable
  } else if (
    0 <
    BigInt(pool.poolDetails.DistributionStartTime) +
      BigInt(pool.poolDetails.PWDs) -
      currentTime
  ) {
    poolState = "WorkingPeriod";
    remainingTime = calculateRemainingTime(
      currentTime,
      BigInt(pool.poolDetails.DistributionStartTime) +
        BigInt(pool.poolDetails.PWDs)
    );
  } else if (
    0 <=
    BigInt(pool.poolDetails.DistributionStartTime) +
      BigInt(pool.poolDetails.PWDs) +
      BigInt(pool.poolDetails.PRDs) -
      currentTime
  ) {
    poolState = "ProjectsRoundTwoEvaluation";
    remainingTime = calculateRemainingTime(
      currentTime,
      BigInt(pool.poolDetails.DistributionStartTime) +
        BigInt(pool.poolDetails.PWDs) +
        BigInt(pool.poolDetails.PRDs)
    );
  } else if (!IsSecondDistributionDone(pool.registeredRecipients)) {
    poolState = "WaitingForFinalDistribution";
    remainingTime = "";
    // Assuming no time limit for this state, or set a specific end time if applicable
  } else {
    poolState = "Ended";
    remainingTime = "";
    // No remaining time as the pool is disabled
  }

  return { poolState, remainingTime };
};

function IsSecondDistributionDone(recipients) {
  if (!recipients.distributions) return false;
  for (const recipient of recipients) {
    const secondDistribution = recipient.distributions.find(
      (distribution) => distribution.streamID === "0"
    );

    if (secondDistribution) {
      return true; // Found a recipient with a second distribution with streamID "0"
    }
  }

  return false; // No recipient with a second distribution with streamID "0" found
}

export const calculateActualCredits = (voteResult) => {
  // Assuming voteResult is the square root of totalCredits * 1e18
  // First square the voteResult to get back to totalCredits * 1e18
  const totalCreditsScaled = Math.pow(voteResult, 2);

  // Then, divide by the scaling factor (1e18) to get the actual credits
  const actualCredits = totalCreditsScaled / 10 ** 18;

  return actualCredits;
};

export const calculateQuadraticVotingPercentages = (allocators) => {
  // Normalize votes from string to number
  const normalizeVotes = (voteString) => Number(voteString);

  // Create a map to store unique allocators by their IDs
  let uniqueAllocators = {};
  allocators.forEach((allocator) => {
    uniqueAllocators[allocator.allocatorID] = allocator;
  });

  // Aggregate votes for each recipient across unique allocators
  let totalVotes = {};
  Object.values(uniqueAllocators).forEach((allocator) => {
    allocator.allocations.forEach((allocation) => {
      const recipientID = allocation.recipientID;
      const votesAmount = normalizeVotes(allocation.votesAmount);

      if (!totalVotes[recipientID]) {
        totalVotes[recipientID] = 0;
      }
      totalVotes[recipientID] += votesAmount;
    });
  });

  // Calculate total votes sum
  let totalVotesSum = Object.values(totalVotes).reduce(
    (sum, current) => sum + current,
    0
  );

  // Calculate percentage of total votes for each recipient
  let percentages = {};
  for (const [recipientID, votes] of Object.entries(totalVotes)) {
    percentages[recipientID] = votes / totalVotesSum;
  }

  return percentages;
};

export const calculateRemainingCreditsForAllocator = (
  allocators,
  allocatorID,
  maxCredits
) => {
  // Find the unique allocator entry

  if (!allocators) return maxCredits;
  const allocator = allocators.find(
    (allocator) => allocator.allocatorID === allocatorID
  );

  if (!allocator) {
    console.error("Allocator not found");
    return maxCredits;
  }

  // Sum up the square roots of votesAmount to find total credits used
  let totalCreditsUsed = allocator.allocations.reduce((total, allocation) => {
    return total + Math.pow(Number(allocation.votesAmount), 2);
  }, 0);

  // Convert totalCreditsUsed from QV format to normal format by taking the square root
  let totalUsedCredits = totalCreditsUsed / 10 ** 18;

  // Calculate remaining credits (not in QV format)
  let remainingCredits = maxCredits - totalUsedCredits;

  // Ensure remaining credits is not negative
  remainingCredits = Math.max(remainingCredits, 0);

  remainingCredits < 1
    ? (remainingCredits = 0)
    : (remainingCredits = remainingCredits);

  return (remainingCredits - 1).toFixed(0);
};

export const fetchRecipientMetadata = async (recipient) => {
  const metadataResponse = await axios.get(
    `https://ipfs.io/ipfs/${recipient.metadata}`
  );
  return metadataResponse.data;
};

export const sortRecipientsByPercentage = (recipients) => {
  recipients?.sort((a, b) => {
    const percentageA = a.poolPercentage;
    const percentageB = b.poolPercentage;
    return percentageB - percentageA; // Sort in descending order
  });
};

export const getTime = async () => {
  const time = await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getTime",
  });
  return time;
};

export const alreadyReviewedRecipient = (recipient) => {
  try {
    return recipient.reviews.some(
      (review) => review.reviewedBy === account.toLowerCase()
    );
  } catch {
    return false;
  }
};

export const filterStreamsByRecipient = (streams, recipient) => {
  const filteredStreams = streams.filter(
    (stream) => stream.recipient === recipient
  );
  const streamInfoMap = new Map();
  filteredStreams.forEach((stream) => {
    streamInfoMap.set(
      stream.id.replace(
        "0x483bdd560de53dc20f72dc66acdb622c5075de34-421614-",
        ""
      ),
      stream
    );
  });
  return streamInfoMap;
};
