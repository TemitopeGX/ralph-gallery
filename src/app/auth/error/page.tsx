"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white/5 p-8 rounded-2xl border border-gold/20 max-w-md w-full">
        <h1 className="text-2xl font-light text-white mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-400 mb-6">
          {error === "CredentialsSignin"
            ? "Invalid email or password"
            : "An error occurred during authentication"}
        </p>
        <Link
          href="/auth/signin"
          className="block w-full text-center bg-gold text-black py-3 rounded-lg hover:bg-gold-light transition-colors"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
