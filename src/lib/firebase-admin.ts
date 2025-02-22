import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Add debug logging
console.log("Initializing Firebase Admin...");
console.log("Project ID:", process.env.FIREBASE_ADMIN_PROJECT_ID);
console.log("Client Email:", process.env.FIREBASE_ADMIN_CLIENT_EMAIL);
console.log("Private Key exists:", !!process.env.FIREBASE_ADMIN_PRIVATE_KEY);

if (
  !process.env.FIREBASE_ADMIN_PROJECT_ID ||
  !process.env.FIREBASE_ADMIN_CLIENT_EMAIL ||
  !process.env.FIREBASE_ADMIN_PRIVATE_KEY
) {
  throw new Error(
    "Missing Firebase Admin SDK credentials in environment variables"
  );
}

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    // The private key comes as a string with "\n" characters
    // We need to replace them with actual newlines
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
};

// Initialize Firebase Admin if it hasn't been initialized already
const apps = getApps();
const firebaseAdmin =
  apps.length === 0 ? initializeApp(firebaseAdminConfig) : apps[0];

export const adminAuth = getAuth(firebaseAdmin);

// Verify initialization
console.log("Firebase Admin initialized successfully");
