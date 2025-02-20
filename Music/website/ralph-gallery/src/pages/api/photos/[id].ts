import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case "PUT":
      try {
        const updatedPhoto = await Photo.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );
        if (!updatedPhoto) {
          return res.status(404).json({ error: "Photo not found" });
        }
        res.status(200).json(updatedPhoto);
      } catch (error) {
        res.status(500).json({ error: "Failed to update photo" });
      }
      break;

    case "DELETE":
      try {
        const deletedPhoto = await Photo.findByIdAndDelete(id);
        if (!deletedPhoto) {
          return res.status(404).json({ error: "Photo not found" });
        }
        res.status(200).json({ message: "Photo deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete photo" });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
