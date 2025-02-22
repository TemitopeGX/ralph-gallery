import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("photography-portfolio");

    // Get project to delete its images from Cloudinary
    const project = await db
      .collection("projects")
      .findOne({ _id: new ObjectId(params.id) });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete images from Cloudinary
    const deletePromises = project.images.map((image: { publicId: string }) =>
      cloudinary.uploader.destroy(image.publicId)
    );
    await Promise.all(deletePromises);

    // Delete project from MongoDB
    await db.collection("projects").deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Error deleting project" },
      { status: 500 }
    );
  }
}
