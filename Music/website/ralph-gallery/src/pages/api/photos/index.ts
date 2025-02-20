import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { auth } from "@/config/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization token" });
    }

    await dbConnect();

    switch (req.method) {
      case "GET":
        try {
          const photos = await Photo.find().sort({ createdAt: -1 });
          res.status(200).json(photos);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch photos" });
        }
        break;

      case "POST":
        try {
          const photo = await Photo.create(req.body);
          res.status(201).json(photo);
        } catch (error) {
          res.status(500).json({ error: "Failed to create photo" });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
