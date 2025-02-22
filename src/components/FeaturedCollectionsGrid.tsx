"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import ProjectModal from "./ProjectModal";
import { Project } from "@/types";

interface FeaturedCollectionsGridProps {
  projects: Project[];
}

export default function FeaturedCollectionsGrid({
  projects,
}: FeaturedCollectionsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="relative group cursor-pointer overflow-hidden aspect-square"
            onClick={() => setSelectedProject(project)}
          >
            <Image
              src={project.thumbnail.url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm mb-4">{project.category}</p>
                <FaArrowRight className="inline-block" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
