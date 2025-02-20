import { motion } from "framer-motion";
import Head from "next/head";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import PhotoModal from "@/components/PhotoModal";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";

// Gallery categories and images
const categories = [
  "All",
  "Portrait",
  "Landscape",
  "Street",
  "Architecture",
  "Event",
];

interface Photo {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  type: "single" | "multiple";
  additionalImages?: string[];
  createdAt: string;
}

interface GalleryProps {
  initialPhotos: Photo[];
}

export default function Gallery({ initialPhotos }: GalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos || []);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/photos");
      if (!res.ok) throw new Error("Failed to fetch photos");
      const data = await res.json();
      setPhotos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load photos");
      console.error("Error fetching photos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialPhotos?.length) {
      fetchPhotos();
    }
  }, [initialPhotos]);

  const filteredPhotos = photos?.length
    ? selectedCategory === "All"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory)
    : [];

  return (
    <Layout>
      <Head>
        <title>Gallery | Photography Portfolio</title>
        <meta name="description" content="View our photography collection" />
      </Head>

      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-light transition-colors rounded-full
                  ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Status Messages */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchPhotos}
                className="mt-4 px-4 py-2 bg-black text-white hover:bg-black/90"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Gallery Grid */}
          {!isLoading && !error && filteredPhotos && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden cursor-pointer"
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={photo.featured}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white font-light text-lg mb-1">
                      {photo.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-white/70 text-sm">
                        {photo.category}
                      </span>
                      {photo.type === "multiple" && (
                        <span className="text-white/70 text-sm">
                          +{photo.additionalImages?.length || 0} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && !error && filteredPhotos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No photos found in this category.</p>
            </div>
          )}
        </div>

        {/* Photo Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <PhotoModal
              photo={selectedPhoto}
              onClose={() => setSelectedPhoto(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/photos`);

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const data = await res.json();
    const photos = Array.isArray(data) ? data : [];

    return {
      props: {
        initialPhotos: photos,
      },
    };
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    return {
      props: {
        initialPhotos: [],
      },
    };
  }
};
