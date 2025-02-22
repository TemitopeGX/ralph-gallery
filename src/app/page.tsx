"use client";

import FeaturedCollectionsSection from "@/components/FeaturedCollections";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowRight,
  FaCamera,
  FaImage,
  FaAward,
  FaMapMarker,
  FaEnvelope,
  FaPhone,
  FaVideo,
  FaFilm,
} from "react-icons/fa";
import ParticlesBackground from "@/components/ParticlesBackground";
import RotatingText from "@/components/RotatingText";
import ScrollingImages from "@/components/ScrollingImages";
import { Project } from "@/types";
import SignatureCaptures from "@/components/SignatureCaptures";
import LuxuryServices from "@/components/LuxuryServices";
import HeroTitle from "@/components/HeroTitle";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const aboutSection = document.getElementById("about");
          if (!aboutSection || !imageRef.current || !textRef.current) return;

          const rect = aboutSection.getBoundingClientRect();
          const isScrollingDown = currentScrollY > lastScrollY;
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;

          if (isInView) {
            // Calculate how far the section is through the viewport
            const progress = 1 - rect.top / window.innerHeight;
            // Clamp progress between 0 and 1
            const clampedProgress = Math.min(Math.max(progress, 0), 1);

            // Apply transforms based on scroll progress
            if (isScrollingDown) {
              imageRef.current.style.transform = `translateX(${
                -20 * (1 - clampedProgress)
              }px)`;
              imageRef.current.style.opacity = String(clampedProgress);
              textRef.current.style.transform = `translateX(${
                20 * (1 - clampedProgress)
              }px)`;
              textRef.current.style.opacity = String(clampedProgress);
            } else {
              imageRef.current.style.transform = `translateX(${
                -20 * clampedProgress
              }px)`;
              imageRef.current.style.opacity = String(1 - clampedProgress);
              textRef.current.style.transform = `translateX(${
                20 * clampedProgress
              }px)`;
              textRef.current.style.opacity = String(1 - clampedProgress);
            }
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <ParticlesBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-28">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-r from-gold/20 to-transparent blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-l from-gold/20 to-transparent blur-[100px] animate-pulse-slow animation-delay-2000" />

          {/* Lens Image with Blend Effect */}
          <div className="absolute right-0 top-0 w-[800px] h-[800px] opacity-20 mix-blend-soft-light">
            <Image
              src="/images/lens.png"
              alt="Camera Lens"
              fill
              className="object-contain animate-float"
              priority
            />
            {/* Radial gradient overlay for better blending */}
            <div className="absolute inset-0 bg-radial-gradient-dark pointer-events-none" />
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-block mb-6 px-4 py-2 bg-gold/10 rounded-full border border-gold/20">
                <span className="text-gold text-sm tracking-wider">
                  Premium Photography Services
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-light mb-8">
                <span className="gradient-text">Timeless</span> Moments in{" "}
                <span className="gradient-text">Perfect Light</span>
              </h1>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl">
                Where artistry meets precision, creating photographs that tell
                your unique story with elegance and authenticity
              </p>
              <div className="flex gap-6">
                <Link
                  href="/gallery"
                  className="group px-8 py-4 bg-gradient-to-r from-gold to-gold-light rounded-full text-black font-medium hover:shadow-[0_0_30px_rgba(184,134,11,0.3)] transition-all duration-500"
                >
                  <span className="flex items-center gap-2">
                    Explore Gallery
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </Link>
                <Link
                  href="#contact"
                  className="px-8 py-4 border border-gold rounded-full hover:bg-gold/10 transition-all duration-500 relative group overflow-hidden"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <ScrollingImages />
              <RotatingText />
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-gold/20 rounded-full animate-spin-slower" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-gold/20 rounded-full animate-spin-slower animation-delay-2000" />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Title Section */}
      <HeroTitle />

      {/* About Section */}
      <section className="py-32 relative" id="about">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent" />
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className="relative transform transition-all duration-300 ease-out"
              ref={imageRef}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/about.jpg"
                  alt="Professional Photographer"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/20 rounded-xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/20 rounded-xl -z-10" />
            </div>
            <div
              className="transform transition-all duration-300 ease-out"
              ref={textRef}
            >
              <div className="inline-block mb-6">
                <span className="text-gold text-sm tracking-[0.3em] uppercase relative">
                  About Us
                </span>
                <div className="h-px bg-gradient-to-r from-gold to-transparent mt-2 w-20" />
              </div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Passionate About <span className="text-gold">Photography</span>
              </h2>
              <p className="text-gray-400 mb-8">
                With years of experience in capturing life's most precious
                moments, we bring a unique blend of artistry and technical
                expertise to every shoot. Our passion lies in telling your story
                through compelling visuals that will be cherished for
                generations.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-light mb-2">Our Vision</h3>
                  <p className="text-gray-400 text-sm">
                    To create timeless photographs that capture the essence of
                    every moment
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-2">Our Approach</h3>
                  <p className="text-gray-400 text-sm">
                    Blending artistic vision with technical excellence
                  </p>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors group"
              >
                Learn More About Us
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard number="500+" text="Happy Clients" icon={<FaCamera />} />
            <StatsCard
              number="10+"
              text="Years Experience"
              icon={<FaAward />}
            />
            <StatsCard
              number="50k+"
              text="Photos Delivered"
              icon={<FaImage />}
            />
            <StatsCard number="100%" text="Satisfaction" icon={<FaAward />} />
          </div>
        </div>
      </section>

      {/* Luxury Services */}
      <LuxuryServices />

      {/* Services Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="text-gold text-sm tracking-[0.3em] uppercase">
                Our Services
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-2" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light mt-6 mb-4">
              What We <span className="text-gold">Offer</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive photography and videography services tailored to
              your needs
            </p>
          </div>

          {/* Services Cards - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <ServiceCard
              title="Wedding Photography"
              description="Capturing your special day with elegance and style, creating timeless memories that last forever"
              icon={<FaCamera className="w-8 h-8" />}
            />
            <ServiceCard
              title="Portrait Sessions"
              description="Professional portraits that reflect your personality and capture your authentic self"
              icon={<FaImage className="w-8 h-8" />}
            />
            <ServiceCard
              title="Event Coverage"
              description="Comprehensive coverage for all your special events, ensuring no moment goes unmissed"
              icon={<FaAward className="w-8 h-8" />}
            />
          </div>

          {/* Services Cards - Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ServiceCard
              title="Live Streaming"
              description="Professional live streaming services for events, ensuring your special moments reach audiences worldwide"
              icon={<FaVideo className="w-8 h-8" />}
            />
            <ServiceCard
              title="Documentary"
              description="Storytelling through visual narratives, capturing real-life stories with depth and authenticity"
              icon={<FaFilm className="w-8 h-8" />}
            />
          </div>
        </div>
      </section>

      {/* Signature Captures - Moved above Contact */}
      <SignatureCaptures />

      {/* Contact Section */}
      <section className="py-32 relative" id="contact">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-block mb-6">
                <span className="text-gold text-sm tracking-[0.3em] uppercase relative">
                  Get In Touch
                </span>
                <div className="h-px bg-gradient-to-r from-gold to-transparent mt-2 w-20" />
              </div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Let's Create Your <span className="text-gold">Story</span>
              </h2>
              <p className="text-gray-400 mb-8">
                Whether you're planning a wedding, need professional portraits,
                or want to capture a special event, we're here to help bring
                your vision to life.
              </p>
              <div className="space-y-6">
                <ContactInfo
                  icon={<FaMapMarker />}
                  title="Location"
                  content="Lagos, Nigeria"
                />
                <ContactInfo
                  icon={<FaEnvelope />}
                  title="Email"
                  content="contact@ralphgallery.com"
                />
                <ContactInfo
                  icon={<FaPhone />}
                  title="Phone"
                  content="+234 123 456 7890"
                />
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gold/10">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="bg-black/50 border border-gold/20 rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="bg-black/50 border border-gold/20 rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full bg-black/50 border border-gold/20 rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-black/50 border border-gold/20 rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-medium py-4 rounded-lg hover:shadow-[0_0_30px_rgba(184,134,11,0.3)] transition-all duration-500"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatsCard({
  number,
  text,
  icon,
}: {
  number: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group p-8 bg-gold/5 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-500">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 flex items-center justify-center text-gold mb-4 group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div className="text-3xl font-light text-gold mb-2">{number}</div>
        <div className="text-gray-400">{text}</div>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group p-8 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-500">
      <div className="w-16 h-16 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-light mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
      <div className="mt-6"></div>
    </div>
  );
}

function ContactInfo({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 flex items-center justify-center text-gold bg-gold/10 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-gray-400">{content}</p>
      </div>
    </div>
  );
}
