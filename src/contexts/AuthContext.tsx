"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user?.email); // Debug log
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in...");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Sign in successful:", userCredential.user.email);

      // Wait a bit for the auth state to update
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (userCredential.user) {
        router.push("/admin");
        router.refresh();
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push("/auth/signin");
      router.refresh(); // Force a refresh of the page
    } catch (error: any) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
