import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("photography-portfolio");

    const images = await db
      .collection("images")
      .find({})
      .sort({ createdAt: -1 })
      .limit(100) // Limit the number of images returned
      .toArray();

    return NextResponse.json(images);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error fetching images",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const file = formData.get("file") as Blob;

    if (!title || !category || !file) {
      console.error("Missing fields:", { title, category, file });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert blob to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64Image}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader
      .upload(dataURI, {
        folder: "photography-portfolio",
        resource_type: "auto",
      })
      .catch((error) => {
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload image to Cloudinary");
      });

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db("photography-portfolio");

    const image = {
      title,
      category,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      createdAt: new Date(),
      userId: session.user.id,
    };

    const result = await db.collection("images").insertOne(image);

    return NextResponse.json({
      _id: result.insertedId,
      ...image,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error uploading image",
      },
      { status: 500 }
    );
  }
}
