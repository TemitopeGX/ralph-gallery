"use client";

import Image from "next/image";
import { FaPhotoVideo, FaPlay } from "react-icons/fa";

const captures = [
  {
    id: 1,
    title: "Timeless Elegance",
    description: "Capturing moments that last forever",
    category: "Portrait",
    image: "/images/gallery-1.jpg",
  },
  {
    id: 2,
    title: "Royal Portraits",
    description: "Every frame tells a story of nobility",
    category: "Events",
    image: "/images/gift-habeshaw-9H89nR7Ct9o-unsplash.jpg",
  },
  {
    id: 3,
    title: "Modern Luxury",
    description: "Where contemporary meets classic",
    category: "Fashion",
    image: "/images/ayo-ogunseinde-UqT55tGBqzI-unsplash.jpg",
  },
  {
    id: 4,
    title: "Premium Collection",
    description: "Exclusive photography for discerning clients",
    category: "Luxury",
    image: "/images/gabrielle-henderson-pL1qsBqCatk-unsplash.jpg",
  },
];

export default function SignatureCaptures() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-10" />
        {/* Improved Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-gold/10 via-gold/5 to-transparent blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-gold/10 via-gold/5 to-transparent blur-[80px] animate-pulse-slow animation-delay-2000" />
        {/* Additional Decorative Lines */}
        <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <div className="flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border border-gold/20 mb-6 relative group">
              <div className="absolute inset-0 rounded-full bg-gold/5 blur-sm group-hover:blur-md transition-all duration-500" />
              <FaPhotoVideo className="w-10 h-10 text-gold relative z-10" />
            </div>
            <span className="text-gold text-sm tracking-[0.4em] uppercase relative">
              Signature Collection
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-3" />
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mt-8 mb-6">
            Masterful{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold to-gold-light font-normal">
              Captures
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Where artistry meets sophistication, creating timeless memories with
            unparalleled attention to detail.
          </p>
        </div>

        {/* Enhanced Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {captures.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold/5 via-gold/5 to-transparent border border-gold/10 hover:border-gold/30 transition-all duration-700"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="aspect-[3/4] relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-gold/90 text-sm font-light mb-3 tracking-wider">
                      {item.category}
                    </div>
                    <h3 className="text-2xl font-light text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {item.description}
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <button className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
                        <FaPlay className="w-3 h-3" />
                        <span className="text-sm">View Gallery</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <a
            href="/gallery"
            className="relative group px-8 py-4 rounded-full overflow-hidden inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 group-hover:from-gold/30 group-hover:via-gold/20 group-hover:to-gold/30 transition-all duration-500" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent blur-xl" />
            <span className="relative text-gold border border-gold/20 px-8 py-4 rounded-full">
              View Full Collection
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
