import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

// This will later be fetched from the admin dashboard/backend
const recentPhotos = [
  {
    src: "/images/gallery/1.jpg",
    title: "Urban Light",
    date: "March 2024",
  },
  {
    src: "/images/gallery/2.jpg",
    title: "Natural Portrait",
    date: "March 2024",
  },
  {
    src: "/images/gallery/3.jpg",
    title: "City Nights",
    date: "March 2024",
  },
];

export default function Gallery() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  return (
    <section className="relative bg-[#FF4D00]/5 py-32">
      {/* Lens Effect Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute -right-1/4 top-1/4 w-[600px] h-[600px] border-[1px] border-[#FF4D00]/20 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary mb-4 tracking-[0.3em] text-sm">
              LATEST SHOTS
            </h2>
            <h3 className="text-4xl font-light text-white">Recent Captures</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Link
              href="/gallery"
              className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              View Full Gallery
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Recent Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPhotos.map((photo, index) => (
            <motion.div
              key={photo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative aspect-[4/5] overflow-hidden bg-black/20 rounded-sm"
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                priority={index === 0}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <motion.div
                className="absolute inset-x-0 bottom-0 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: hoveredImage === index ? 1 : 0,
                  y: hoveredImage === index ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-primary text-sm mb-2">{photo.date}</p>
                <h4 className="text-2xl font-light text-white">
                  {photo.title}
                </h4>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:hidden"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary hover:bg-white/90 transition-colors"
          >
            View Full Gallery
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
