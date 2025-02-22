"use client";

import { useEffect, useRef } from "react";

export default function HeroTitle() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = scrollTextRef.current;
    if (!section || !text) return;

    let position = 0;
    let animationFrameId: number;
    let isVisible = true;

    const animate = () => {
      position -= 0.15;
      if (position <= -100) position = 0;
      text.style.transform = `translate3d(${position}%, 0, 0)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Initialize animations
    const animateText = (inView: boolean) => {
      if (titleRef.current && subtitleRef.current) {
        const text = titleRef.current.textContent || "";
        const subtext = subtitleRef.current.textContent || "";

        titleRef.current.innerHTML = text
          .split("")
          .map(
            (char, i) =>
              `<span 
                class="inline-block transition-all duration-700 opacity-0" 
                style="
                  transform: translateY(${inView ? "-100px" : "100px"});
                  transition-delay: ${i * 50}ms;
                  animation: ${
                    inView ? "dropIn" : "dropOut"
                  } 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards ${i * 50}ms;
                "
              >${char}</span>`
          )
          .join("");

        subtitleRef.current.innerHTML = subtext
          .split("")
          .map(
            (char, i) =>
              `<span 
                class="inline-block transition-all duration-700 opacity-0"
                style="
                  transform: translateY(${inView ? "-50px" : "50px"});
                  transition-delay: ${i * 50 + 500}ms;
                  animation: ${
                    inView ? "dropIn" : "dropOut"
                  } 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards ${
                i * 50 + 500
              }ms;
                "
              >${char}</span>`
          )
          .join("");
      }
    };

    // Add floating animation when in view
    const addFloatingAnimation = () => {
      if (titleRef.current && subtitleRef.current) {
        const chars = titleRef.current.getElementsByTagName("span");
        const subChars = subtitleRef.current.getElementsByTagName("span");

        [...chars, ...subChars].forEach((char, i) => {
          // Combine the existing transform with floating animation
          const currentTransform = char.style.transform;
          char.style.animation = `floatChar 3s ease-in-out infinite ${
            i * 100
          }ms`;
          // Keep the character visible and in position
          char.style.opacity = "1";
          char.style.transform = "translateY(0)";
        });
      }
    };

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
            animateText(true);
            setTimeout(addFloatingAnimation, 2000); // Add floating after initial animation
          } else if (!entry.isIntersecting && isVisible) {
            isVisible = false;
            animateText(false);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% visible
      }
    );

    observer.observe(section);
    animateText(true); // Initial animation
    setTimeout(addFloatingAnimation, 2000); // Initial floating effect

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-20 scroll-text-wrapper relative w-screen overflow-hidden bg-gradient-to-b from-black/50 via-black to-black/50"
    >
      <style jsx>{`
        @keyframes dropIn {
          0% {
            opacity: 0;
            transform: translateY(-100px);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dropOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            transform: translateY(100px);
          }
        }

        @keyframes floatChar {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px) scale(1.05); /* Added subtle scale */
          }
        }

        /* Add combined animation */
        @keyframes dropInAndFloat {
          0% {
            opacity: 0;
            transform: translateY(-100px);
          }
          30% {
            opacity: 1;
            transform: translateY(0);
          }
          40%,
          100% {
            opacity: 1;
            animation-timing-function: ease-in-out;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="text-center pt-16 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />

        <h1
          ref={titleRef}
          className="text-white md:text-[8em] text-[3em] font-black tracking-tight font-heading uppercase leading-none relative z-10"
        >
          RALPH GALLERY
          <div className="absolute -inset-x-4 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent transform -translate-y-1/2" />
        </h1>
        <span
          ref={subtitleRef}
          className="font-heading tracking-[24px] md:tracking-[36px] font-bold text-gold block text-center mt-4 relative z-10 text-xl md:text-2xl"
        >
          PHOTOGRAPHY
          <div className="absolute inset-x-0 -bottom-2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </span>
      </div>

      <div
        ref={scrollTextRef}
        className="md:text-[20em] text-[10em] tracking-tight font-black text-white whitespace-nowrap font-heading opacity-[0.03] absolute left-0 -bottom-20 pointer-events-none select-none"
        style={{ willChange: "transform" }}
      >
        A Media Professional A Media Professional
      </div>
    </div>
  );
}
