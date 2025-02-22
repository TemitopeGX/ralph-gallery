"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function ScrollingImages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const media = [
    {
      type: "image",
      src: "/images/gallery-1.jpg",
      alt: "Gallery Image 1",
    },
    {
      type: "image",
      src: "/images/gallery-2.jpg",
      alt: "Gallery Image 2",
    },
    {
      type: "image",
      src: "/images/gallery-3.jpg",
      alt: "Gallery Image 3",
    },
    {
      type: "gif",
      src: "/videos/photography-1.gif",
      alt: "Photography Process",
    },
    {
      type: "gif",
      src: "/videos/photography-2.gif",
      alt: "Photography Showcase",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % media.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [media.length]);

  const renderMedia = (item: (typeof media)[0], index: number) => {
    const isActive = index === activeIndex;
    const isNext = index === (activeIndex + 1) % media.length;
    const transformClass = isActive
      ? "opacity-100 scale-100 rotate-0"
      : isNext
      ? "opacity-0 translate-x-full rotate-6"
      : "opacity-0 -translate-x-full -rotate-6";

    return (
      <div
        key={item.src}
        className={`absolute inset-0 transition-all duration-700 transform ${transformClass}`}
      >
        <div className="relative w-full h-full">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={95}
            className={`object-cover transition-transform duration-700 ${
              isActive ? "scale-100" : "scale-105"
            }`}
            priority={index === 0}
            unoptimized={item.type === "gif"}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-[600px] w-full rounded-2xl overflow-hidden">
      {/* Very subtle blur effect */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-10" />

      {/* Media */}
      {media.map((item, index) => renderMedia(item, index))}

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {media.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-gold w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-4 left-4 w-12 h-12 border border-gold/20 rounded-lg" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border border-gold/20 rounded-lg" />
      </div>

      {/* Combined gradient and glass effect */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(to top, 
              rgba(0,0,0,0.3) 0%,
              rgba(0,0,0,0.1) 30%,
              rgba(0,0,0,0.05) 50%,
              rgba(0,0,0,0.1) 70%,
              rgba(0,0,0,0.2) 100%
            )
          `,
        }}
      />
    </div>
  );
}
