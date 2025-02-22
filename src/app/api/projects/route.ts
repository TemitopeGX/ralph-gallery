import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { adminAuth } from "@/lib/firebase-admin";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    // Basic validation
    if (!request.headers.get("Authorization")) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401, headers }
      );
    }

    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Invalid authorization header" },
        { status: 401, headers }
      );
    }

    // Verify Firebase token
    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      console.log("Token verified for user:", decodedToken.uid);
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json(
        {
          error: "Invalid token",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 401, headers }
      );
    }

    // Get database connection
    let db;
    try {
      db = await getDb();
    } catch (error) {
      console.error("Database connection failed:", error);
      return NextResponse.json(
        {
          error: "Database connection failed",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500, headers }
      );
    }

    // Fetch projects
    try {
      const projects = await db
        .collection("projects")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      // Transform MongoDB documents to plain objects
      const transformedProjects = projects.map((project) => ({
        ...project,
        _id: project._id.toString(),
      }));

      return NextResponse.json({ projects: transformedProjects }, { headers });
    } catch (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json(
        {
          error: "Error fetching projects",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500, headers }
      );
    }
  } catch (error) {
    console.error("Unhandled API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers }
    );
  }
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
      decodedToken = await adminAuth.verifyIdToken(token);
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
    const mainImageFile = formData.get("file") as Blob;
    const additionalFiles = formData.getAll("additionalFiles");

    if (!title || !category || !type || !mainImageFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers }
      );
    }

    // Upload main image
    const mainImageData = await mainImageFile.arrayBuffer();
    const mainImageBuffer = Buffer.from(mainImageData);
    const mainImageBase64 = mainImageBuffer.toString("base64");
    const mainImageDataURI = `data:${mainImageFile.type};base64,${mainImageBase64}`;

    const mainUploadResponse = await cloudinary.uploader.upload(
      mainImageDataURI,
      {
        folder: "photography-portfolio",
      }
    );

    // Upload additional images
    const additionalUploadPromises = additionalFiles
      .filter((file): file is Blob => file instanceof Blob)
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

    const project = {
      title,
      category,
      description,
      type,
      thumbnail: thumbnailImage,
      images: [
        thumbnailImage,
        ...additionalUploadResponses.map((response) => ({
          url: response.secure_url,
          publicId: response.public_id,
          createdAt: new Date().toISOString(),
        })),
      ],
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
