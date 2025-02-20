import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import PhotoForm from "@/components/PhotoForm";
import { auth } from "@/config/firebase";

interface Photo {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  type: "single" | "multiple";
  additionalImages?: string[];
}

export default function AdminGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    console.log("Gallery page mounted");
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching photos...");

      const token = await auth.currentUser?.getIdToken();
      console.log("Got auth token:", token ? "yes" : "no");

      const res = await fetch("/api/photos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch photos");
      const data = await res.json();
      console.log("Photos fetched:", data.length);
      setPhotos(data);
    } catch (err) {
      console.error("Error fetching photos:", err);
      setError("Failed to load photos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/photos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete photo");
      setPhotos(photos.filter((photo) => photo._id !== id));
    } catch (err) {
      console.error("Error deleting photo:", err);
      alert("Failed to delete photo");
    }
  };

  const handleEdit = (photo: Photo) => {
    setEditingPhoto(photo);
    setShowForm(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-light">Gallery Management</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary px-4 py-2 text-white hover:bg-primary/90 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Add New Photo
          </motion.button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchPhotos}
              className="mt-4 px-4 py-2 bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <motion.div
                key={photo._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative bg-white/5 backdrop-blur-sm"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(photo)}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(photo._id)}
                        className="p-2 bg-white/10 hover:bg-red-500/50 text-white rounded-full transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light">{photo.title}</h3>
                  <p className="text-white/50 text-sm">{photo.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {showForm && (
            <PhotoForm
              photo={editingPhoto}
              onClose={() => {
                setShowForm(false);
                setEditingPhoto(null);
              }}
              onSuccess={() => {
                setShowForm(false);
                setEditingPhoto(null);
                fetchPhotos();
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
