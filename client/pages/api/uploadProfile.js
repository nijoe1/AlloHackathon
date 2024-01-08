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

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the form data:", err);
      return res.status(500).send("Error parsing the form data");
    }

    try {
      const file = files.file[0];
      if (!file) {
        throw new Error("File is undefined");
      }

      // Upload file to IPFS
      const fileStream = fs.createReadStream(file.filepath);
      const fileFormData = new FormData();
      fileFormData.append("file", fileStream);
      const fileResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fileFormData,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${fileFormData._boundary}`,
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      fs.unlinkSync(file.filepath); // Delete the file after uploading

      // Prepare JSON metadata
      const metadata = {
        name: fields.name[0],
        description: fields.description[0],
        image: `https://cloudflare-ipfs.com/ipfs/{fileResponse.data.IpfsHash}`, // Linking the image uploaded in the previous step
        websiteLink: fields.websiteLink[0],
        githubLink: fields.githubLink[0],
        twitterLink: fields.twitterLink[0],
      };

      // Upload JSON metadata to IPFS
      const metadataResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      res.status(200).json({
        fileCid: fileResponse.data.IpfsHash,
        metadataCid: metadataResponse.data.IpfsHash,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error processing the request");
    }
  });
}