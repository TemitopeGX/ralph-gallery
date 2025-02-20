import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const [totalPhotos, featured] = await Promise.all([
      Photo.countDocuments(),
      Photo.countDocuments({ featured: true }),
    ]);

    // Get unique categories
    const categories = await Photo.distinct("category");

    res.status(200).json({
      totalPhotos,
      categories: categories.length,
      featured,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}
