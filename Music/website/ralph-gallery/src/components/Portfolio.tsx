import { motion } from "framer-motion";
import { useState } from "react";
import { portfolioImages } from "@/utils/images";

const categories = ["All", "Portrait", "Landscape", "Wedding", "Street"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = portfolioImages.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  return (
    <section id="portfolio" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-light text-center mb-12"
        >
          Portfolio
        </motion.h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm transition-colors border ${
                activeCategory === category
                  ? "bg-black text-white border-black"
                  : "text-gray-600 hover:text-black border-transparent hover:border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative aspect-[4/5] overflow-hidden bg-gray-100"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-light">{image.title}</h3>
                  <p className="text-sm mt-2 text-gray-200">{image.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
