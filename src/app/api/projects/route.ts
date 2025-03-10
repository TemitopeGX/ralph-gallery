import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { auth } from "@/lib/firebase";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Add interface for MongoDB document
interface ProjectDocument {
  _id: string;
  [key: string]: any;
}

export async function GET(request: Request) {
  console.log("API route called: /api/projects");

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    // Test MongoDB connection
    let db;
    try {
      console.log("Testing MongoDB connection...");
      db = await getDb();
      if (!db) throw new Error("Database connection failed");
    } catch (error) {
      console.error("MongoDB error:", error);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500, headers }
      );
    }

    // Verify auth token
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401, headers }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Invalid authorization header" },
        { status: 401, headers }
      );
    }

    // Fetch projects
    try {
      const projects = await db
        .collection("projects")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return NextResponse.json(
        { projects: projects.map((p) => ({ ...p, _id: p._id.toString() })) },
        { status: 200, headers }
      );
    } catch (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json(
        { error: "Error fetching projects" },
        { status: 500, headers }
      );
    }
  } catch (error) {
    console.error("Unhandled API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    );
  }
}

// Add type for file
interface CustomFile extends File {
  type: string;
  arrayBuffer(): Promise<ArrayBuffer>;
}

export async function POST(request: Request) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401, headers }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as "single" | "multiple";
    const mainImageFile = formData.get("mainImage") as CustomFile;
    const additionalFiles = formData.getAll("additionalImages") as CustomFile[];

    if (!title || !category || !type || !mainImageFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers }
      );
    }

    // Upload main image
    const mainImageBuffer = await mainImageFile.arrayBuffer();
    const mainImageBase64 = Buffer.from(mainImageBuffer).toString("base64");
    const mainImageDataURI = `data:${mainImageFile.type};base64,${mainImageBase64}`;

    const mainUploadResponse = await cloudinary.uploader.upload(
      mainImageDataURI,
      {
        folder: "photography-portfolio",
      }
    );

    // Upload additional images
    const additionalUploadPromises = additionalFiles
      .filter((file): file is CustomFile => file instanceof File)
      .map(async (file) => {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        const dataURI = `data:${file.type};base64,${base64}`;
        return cloudinary.uploader.upload(dataURI, {
          folder: "photography-portfolio",
        });
      });

    const additionalUploadResponses = await Promise.all(
      additionalUploadPromises
    );

    // Create project document
    const db = await getDb();
    const projectsCollection = db.collection("projects");

    const thumbnailImage = {
      url: mainUploadResponse.secure_url,
      publicId: mainUploadResponse.public_id,
      createdAt: new Date().toISOString(),
    };

    const images = [
      thumbnailImage,
      ...additionalUploadResponses.map((response: any) => ({
        url: response.secure_url,
        publicId: response.public_id,
        createdAt: new Date().toISOString(),
      })),
    ];

    const project = {
      title,
      category,
      description,
      type,
      thumbnail: thumbnailImage,
      images,
      createdAt: new Date().toISOString(),
      userId: decodedToken.uid,
    };

    console.log("Saving project:", project); // Debug log

    const result = await projectsCollection.insertOne(project);
    console.log("Project saved with ID:", result.insertedId); // Debug log

    return NextResponse.json(
      {
        _id: result.insertedId.toString(),
        ...project,
      },
      { status: 201, headers }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Error creating project",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers }
    );
  }
}
