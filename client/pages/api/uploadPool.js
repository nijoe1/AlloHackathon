// pages/api/files.js
import axios from "axios";
import { IncomingForm } from "formidable";
import FormData from "form-data";
import fs from "fs";

const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields) => {
    if (err) {
      console.error("Error parsing the form data:", err);
      return res.status(500).send("Error parsing the form data");
    }

    try {
      // const file = files.file[0];
      // if (!file) {
      //   throw new Error("File is undefined");
      // }

      // Prepare JSON metadata
      const metadataFormData = {
        name: fields.name[0],
        description: fields.description[0],
        image: fields.image[0],
        tokenAddress: fields.tokenAddress[0],
        startingPoolAmount: fields.startingPoolAmount[0],
        allocationDurationDays: fields.allocationDurationDays[0],
        projectsWorkingDurationDays: fields.projectsWorkingDurationDays[0],
        projectsReviewingDurationDays: fields.projectsReviewingDurationDays[0],
        roundOnePercentage: fields.roundOnePercentage[0],
        maxVotesPerAllocator: fields.maxVotesPerAllocator[0],
      };

      // Upload JSON metadata to IPFS
      const metadataResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadataFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      res.status(200).json({
        metadataCid: metadataResponse.data.IpfsHash,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error processing the request");
    }
  });
}
