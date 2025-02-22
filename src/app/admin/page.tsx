"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { FaEdit, FaTrash, FaImage, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { Project } from "@/types";
import DeleteModal from "@/components/DeleteModal";

interface GalleryImage {
  _id: string;
  title: string;
  category: string;
  url: string;
  publicId: string;
  createdAt: string;
}

export default function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectType, setProjectType] = useState<"single" | "multiple">(
    "single"
  );
  const [description, setDescription] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin");
      } else {
        // Only fetch projects when we have a user
        fetchProjects();
      }
    }
  }, [loading, user, router]);

  const fetchProjects = async () => {
    try {
      if (!user) {
        console.log("No user found");
        return;
      }

      const token = await user.getIdToken(true);

      const response = await fetch("/api/projects", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data || !Array.isArray(data.projects)) {
        console.error("Invalid data structure:", data);
        throw new Error("Invalid response format");
      }

      setProjects(data.projects);
      setError(null);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch projects"
      );
    }
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage || !title || !category) {
      setError("Please fill in all fields");
      return;
    }

    setUploadLoading(true);
    setError(null);

    try {
      // Get fresh token
      const token = await user?.getIdToken(true);
      if (!token) {
        throw new Error("No authentication token available");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("type", projectType);
      formData.append("file", selectedImage);

      if (projectType === "multiple") {
        additionalImages.forEach((file) => {
          formData.append("additionalFiles", file);
        });
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      // Reset form and refresh projects
      setTitle("");
      setCategory("");
      setDescription("");
      setSelectedImage(null);
      setProjectType("single");
      setAdditionalImages([]);

      // Clear file inputs
      const fileInputs = document.querySelectorAll(
        'input[type="file"]'
      ) as NodeListOf<HTMLInputElement>;
      fileInputs.forEach((input) => {
        input.value = "";
      });

      await fetchProjects();
    } catch (error) {
      console.error("Upload error:", error);
      setError(
        error instanceof Error ? error.message : "Error creating project"
      );
    } finally {
      setUploadLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setTitle(project.title);
    setCategory(project.category);
    setDescription(project.description);
    setProjectType(project.type);
    // You might want to scroll to the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    if (!selectedProject) return;

    try {
      // Get fresh token
      const token = await user?.getIdToken(true);
      if (!token) {
        throw new Error("No authentication token available");
      }

      const response = await fetch(`/api/projects/${selectedProject._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete project");
      }

      await fetchProjects();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Delete error:", error);
      setError(
        error instanceof Error ? error.message : "Error deleting project"
      );
    }
  };

  const handleViewImages = (project: Project) => {
    // We'll implement this later with a modal to show all project images
    console.log("View images for project:", project);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#B8860B]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A0A0A] via-black to-[#1A1A1A] -z-10" />

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light tracking-tight">
                Admin <span className="text-[#B8860B]">Dashboard</span>
              </h1>
              <p className="text-gray-400 mt-2 text-lg">
                {projects.length} Projects in your portfolio
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 px-4 py-2 bg-[#B8860B] rounded-lg hover:bg-[#B8860B]/90 transition-all transform hover:scale-105"
              >
                <FaPlus className="w-4 h-4" />
                <span>New Project</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-[#B8860B] text-[#B8860B] rounded-lg hover:bg-[#B8860B]/10 transition-all"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Projects Grid */}
          <div className="lg:col-span-8 lg:order-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-[#B8860B] transition-all duration-300 hover:scale-[1.02]"
                >
                  <Image
                    src={project.thumbnail.url}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-medium text-lg mb-1">
                          {project.title}
                        </h3>
                        <p className="text-[#B8860B] text-sm mb-3">
                          {project.category}
                        </p>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm hover:scale-110 transform"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProject(project);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors backdrop-blur-sm hover:scale-110 transform"
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4 text-red-500" />
                          </button>
                          {project.type === "multiple" && (
                            <button
                              onClick={() => handleViewImages(project)}
                              className="p-2 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors backdrop-blur-sm hover:scale-110 transform"
                              title="View Images"
                            >
                              <FaImage className="w-4 h-4 text-blue-500" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Form */}
          <div className="lg:col-span-4 lg:order-1">
            <div className="sticky top-8">
              <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-8 border border-gray-800/50">
                <h2 className="text-2xl font-light mb-8">
                  Create New <span className="text-[#B8860B]">Project</span>
                </h2>
                <form onSubmit={handleImageUpload} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Project Type Selection */}
                  <div className="bg-black/30 p-1 rounded-lg grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      onClick={() => setProjectType("single")}
                      className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                        projectType === "single"
                          ? "bg-[#B8860B] text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      Single Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setProjectType("multiple")}
                      className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                        projectType === "multiple"
                          ? "bg-[#B8860B] text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      Multiple Images
                    </button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter project title"
                        className="w-full px-4 py-2.5 bg-black/30 rounded-lg border border-gray-800 focus:border-[#B8860B] focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm text-gray-400">Category</label>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category"
                        className="w-full px-4 py-2.5 bg-black/30 rounded-lg border border-gray-800 focus:border-[#B8860B] focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm text-gray-400">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter project description"
                        rows={4}
                        className="w-full px-4 py-2.5 bg-black/30 rounded-lg border border-gray-800 focus:border-[#B8860B] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* File Uploads */}
                    <div className="space-y-4">
                      <div className="relative group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setSelectedImage(e.target.files?.[0] || null)
                          }
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          required
                        />
                        <div className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center group-hover:border-[#B8860B] transition-all duration-300 bg-black/30">
                          <FaImage className="w-8 h-8 mx-auto text-gray-600 group-hover:text-[#B8860B] transition-colors duration-300 mb-3" />
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {selectedImage
                              ? selectedImage.name
                              : "Click to upload main image"}
                          </p>
                        </div>
                      </div>

                      {projectType === "multiple" && (
                        <div className="relative group">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              setAdditionalImages(files);
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center group-hover:border-[#B8860B] transition-all duration-300 bg-black/30">
                            <FaImage className="w-8 h-8 mx-auto text-gray-600 group-hover:text-[#B8860B] transition-colors duration-300 mb-3" />
                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                              {additionalImages.length
                                ? `${additionalImages.length} files selected`
                                : "Click to upload additional images"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={uploadLoading}
                    className="w-full bg-[#B8860B] text-white py-3 px-4 rounded-lg hover:bg-[#B8860B]/90 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    {uploadLoading ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2" />
                        Uploading...
                      </span>
                    ) : (
                      "Create Project"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          project={selectedProject!}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
