import { MongoClient } from "mongodb";

// Add debug logging
console.log("Setting up MongoDB connection...");

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
console.log("MongoDB URI exists:", !!uri);

const options = {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 30000,
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    console.log("Creating new MongoDB client connection...");
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const getDb = async () => {
  try {
    console.log("Attempting to get database connection...");
    const client = await clientPromise;
    const db = client.db("photography-portfolio");

    // Test the connection
    await db.command({ ping: 1 });
    console.log("Successfully connected to MongoDB database");

    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default clientPromise;
