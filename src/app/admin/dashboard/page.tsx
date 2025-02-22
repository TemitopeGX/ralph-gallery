"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin");
      } else {
        // Redirect to the main admin page
        router.push("/admin");
      }
    }
  }, [user, loading, router]);

  // Show loading state while checking auth and redirecting
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#B8860B]" />
    </div>
  );
}
