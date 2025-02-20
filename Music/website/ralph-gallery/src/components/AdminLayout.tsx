import { useRouter } from "next/router";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import {
  HomeIcon,
  PhotoIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut(auth);
      await router.push("/admin/login");
    } catch (error) {
      console.error("Failed to logout:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    router.push(path);
  };

  // Show loading spinner while checking auth
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!user && router.pathname !== "/admin/login") {
    router.push("/admin/login");
    return null;
  }

  // Don't show admin layout on login page
  if (router.pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          className="fixed left-0 top-0 h-screen w-64 bg-white/5 backdrop-blur-sm z-50"
        >
          <div className="p-6">
            <h1 className="text-xl font-light text-white">Admin Dashboard</h1>
          </div>
          <nav className="mt-6">
            <button
              onClick={(e) => handleNavigation(e, "/admin")}
              className={`w-full flex items-center gap-2 px-6 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors ${
                router.pathname === "/admin" ? "text-white bg-white/5" : ""
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={(e) => handleNavigation(e, "/admin/gallery")}
              className={`w-full flex items-center gap-2 px-6 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors ${
                router.pathname === "/admin/gallery"
                  ? "text-white bg-white/5"
                  : ""
              }`}
            >
              <PhotoIcon className="w-5 h-5" />
              Gallery
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-6 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </div>
  );
}
