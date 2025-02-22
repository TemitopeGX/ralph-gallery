"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white z-50"
      >
        <FaTimes className="w-6 h-6" />
      </button>

      {/* Navigation buttons */}
      <button
        onClick={handlePrevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
      >
        <FaArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
      >
        <FaArrowRight className="w-6 h-6" />
      </button>

      {/* Main image */}
      <div className="relative w-full max-w-6xl h-[80vh] mx-4">
        <Image
          src={project.images[currentImageIndex].url}
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          fill
          className="object-contain"
        />

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white/80">
          {currentImageIndex + 1} / {project.images.length}
        </div>
      </div>
    </div>
  );
}
