import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Project } from "@/types";

export async function GET() {
  try {
    const database = await clientPromise;

    if (!database) {
      throw new Error("Database connection not established");
    }

    const projects = await database
      .collection("projects")
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    const transformedProjects = projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
      thumbnail: {
        ...project.thumbnail,
        url: project.thumbnail.url.startsWith("http")
          ? project.thumbnail.url
          : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${project.thumbnail.publicId}`,
      },
    })) as Project[];

    return NextResponse.json(transformedProjects);
  } catch (error: any) {
    console.error("Error fetching featured projects:", error);
    return NextResponse.json([]);
  }
}
