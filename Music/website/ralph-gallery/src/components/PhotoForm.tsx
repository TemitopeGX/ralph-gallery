import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";
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

interface PhotoFormProps {
  photo?: Photo | null;
  onClose: () => void;
  onSuccess: () => void;
}

const categories = ["Portrait", "Landscape", "Street", "Architecture", "Event"];

export default function PhotoForm({
  photo,
  onClose,
  onSuccess,
}: PhotoFormProps) {
  const [formData, setFormData] = useState({
    title: photo?.title || "",
    description: photo?.description || "",
    category: photo?.category || categories[0],
    featured: photo?.featured || false,
    type: photo?.type || "single",
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      if (mainImage) {
        formDataToSend.append("mainImage", mainImage);
      }

      additionalImages.forEach((file) => {
        formDataToSend.append("additionalImages", file);
      });

      const url = photo ? `/api/photos/${photo._id}` : "/api/photos";
      const method = photo ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!res.ok) throw new Error("Failed to save photo");

      onSuccess();
    } catch (err) {
      console.error("Error saving photo:", err);
      setError("Failed to save photo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setMainImage(file);
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    setAdditionalImages((prev) => [...prev, ...files]);
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white/5 backdrop-blur-sm p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light">
            {photo ? "Edit Photo" : "Add New Photo"}
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 text-red-500 p-3 text-sm">
              {error}
            </div>
          )}

          {/* Main Image Upload */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Main Image
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-[4/3] border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors cursor-pointer group"
            >
              {mainImage || photo?.imageUrl ? (
                <Image
                  src={
                    mainImage
                      ? URL.createObjectURL(mainImage)
                      : photo?.imageUrl || ""
                  }
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 group-hover:text-primary/70 transition-colors">
                  <PhotoIcon className="w-12 h-12 mb-2" />
                  <span>Click to upload image</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm text-white/70 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-2 text-white focus:border-primary focus:ring-0"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm text-white/70 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-2 text-white focus:border-primary focus:ring-0"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm text-white/70 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-2 text-white focus:border-primary focus:ring-0"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="rounded border-white/10 bg-white/5 text-primary focus:ring-0"
              />
              <label htmlFor="featured" className="text-sm text-white/70">
                Featured Photo
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white/70 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : photo
                ? "Save Changes"
                : "Add Photo"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
