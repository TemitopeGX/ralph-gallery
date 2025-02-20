import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import CustomCursor from "@/components/CustomCursor";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProvider>
      <CustomCursor />
      <Layout>
        <AnimatePresence mode="wait">
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </AuthProvider>
  );
}
