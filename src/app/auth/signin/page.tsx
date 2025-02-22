"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthErrorAlert from "@/components/ui/AuthErrorAlert";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Submitting form..."); // Debug log
      await signIn(email, password);
    } catch (error: any) {
      console.error("Sign in error in component:", error); // Debug log
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white/5 p-8 rounded-2xl border border-gold/20 max-w-md w-full">
        <h1 className="text-2xl font-light text-white mb-6">Admin Sign In</h1>

        {error && (
          <div className="mb-6">
            <AuthErrorAlert error={error} onClose={() => setError("")} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-gold/20 rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-gold/20 rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-medium py-4 rounded-lg hover:shadow-[0_0_30px_rgba(184,134,11,0.3)] transition-all duration-500 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
