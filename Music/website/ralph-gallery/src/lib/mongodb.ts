import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

async function dbConnect() {
  if (isConnected) {
    return mongoose;
  }

  try {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    const db = await mongoose.connect(MONGODB_URI, opts);
    isConnected = !!db.connections[0].readyState;

    console.log("MongoDB connected successfully");
    return mongoose;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default dbConnect;
