import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/firebase-admin";

export async function adminAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split("Bearer ")[1];
    await auth.verifyIdToken(token);
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
}
