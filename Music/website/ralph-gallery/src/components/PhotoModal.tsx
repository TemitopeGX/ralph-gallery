import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Photo {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  type: "single" | "multiple";
  additionalImages?: string[];
}

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Ensure we include the main image and additional images
  const allImages =
    photo.type === "multiple"
      ? [photo.imageUrl, ...(photo.additionalImages || [])]
      : [photo.imageUrl];

  // Handle keyboard navigation and escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handlePrevious = () => {
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80">
      <div className="min-h-screen px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative mx-auto max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Image container */}
          <div className="relative aspect-[4/3] bg-gray-100">
            <Image
              src={allImages[currentImageIndex]}
              alt={photo.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />

            {/* Navigation arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors cursor-pointer"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors cursor-pointer"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>

          {/* Photo details */}
          <div className="p-6 bg-white">
            <h3 className="text-xl font-light mb-2 text-gray-900">
              {photo.title}
            </h3>
            {photo.description && (
              <p className="text-gray-600 text-sm">{photo.description}</p>
            )}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-gray-500 text-sm">{photo.category}</span>
              {allImages.length > 1 && (
                <span className="text-gray-500 text-sm">
                  {allImages.length} photos
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
