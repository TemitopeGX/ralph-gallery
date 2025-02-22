"use client";

import Image from "next/image";
import { FaCrown, FaGem, FaStar } from "react-icons/fa";

const luxuryServices = [
  {
    id: 1,
    title: "Royal Events",
    description: "Exclusive coverage for your most prestigious occasions",
    icon: <FaCrown className="w-8 h-8" />,
    features: ["Private Sessions", "Premium Locations", "Elite Service"],
  },
  {
    id: 2,
    title: "Luxury Portraits",
    description: "Timeless elegance captured in every frame",
    icon: <FaGem className="w-8 h-8" />,
    features: ["High-End Retouching", "Premium Prints", "Digital Collection"],
  },
  {
    id: 3,
    title: "Premium Experience",
    description: "Where sophistication meets artistic vision",
    icon: <FaStar className="w-8 h-8" />,
    features: ["Style Consultation", "Location Scouting", "Luxury Album"],
  },
];

export default function LuxuryServices() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/texture.png')] opacity-20" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-2xl" />

        {/* Content */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/20">
              <FaCrown className="w-8 h-8 text-gold" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
            Experience <span className="text-gold font-normal">Royal</span>{" "}
            Treatment
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Indulge in our premium photography services, where every detail is
            crafted to perfection and every moment is captured with elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {luxuryServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-gold/5 via-gold/5 to-transparent border border-gold/10 hover:border-gold/20 transition-all duration-500"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gold/10 text-gold">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-light text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="bg-gradient-to-r from-gold to-gold-light text-black font-medium px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(184,134,11,0.3)] transition-all duration-500 inline-block"
          >
            Book Your Luxury Session
          </a>
        </div>
      </div>
    </section>
  );
}
