import { Project } from "@/types";
import FeaturedCollectionsGrid from "./FeaturedCollectionsGrid";
import { featuredCollections } from "@/data/featured-collections";

export default function FeaturedCollectionsSection() {
  return (
    <div className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          Featured Collections
        </h2>
        <FeaturedCollectionsGrid projects={featuredCollections} />
      </div>
    </div>
  );
}
