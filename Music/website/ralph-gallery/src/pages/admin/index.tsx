import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPhotos: 0,
    categories: 0,
    featured: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-light">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Total Photos",
              value: stats.totalPhotos,
              description: "Photos in gallery",
            },
            {
              title: "Categories",
              value: stats.categories,
              description: "Active categories",
            },
            {
              title: "Featured",
              value: stats.featured,
              description: "Featured photos",
            },
          ].map((stat) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 p-6 backdrop-blur-sm"
            >
              <h3 className="text-white/70 text-sm">{stat.title}</h3>
              <p className="text-4xl font-light mt-2">{stat.value}</p>
              <p className="text-white/50 text-sm mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  );
}
