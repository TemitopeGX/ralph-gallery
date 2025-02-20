import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const phrases = ["CAPTURE", "CREATE", "INSPIRE"];

export default function Hero() {
  const containerRef = useRef(null);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for lens animations
  const lensRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const lensScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const lensOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.6]);
  const lensBlur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 4]);

  // Phrase rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Lens Effect Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/90 to-black" />

        {/* 3D Rotating Lens */}
        <motion.div
          className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
          style={{
            rotate: lensRotate,
            scale: lensScale,
            opacity: lensOpacity,
            filter: `blur(${lensBlur}px)`,
          }}
        >
          <img
            src="/images/camera-lens.png"
            alt="Camera Lens"
            className="w-full h-full object-contain"
          />

          {/* Lens Flare Effects */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
            style={{
              rotate: useTransform(scrollYProgress, [0, 1], [-45, 45]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]),
            }}
          />
        </motion.div>

        {/* Additional Decorative Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-primary/20 blur-xl"
          style={{
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 0.8]),
            opacity: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.3, 0.6, 0.1]
            ),
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="min-h-screen flex flex-col justify-center">
          {/* Main Content */}
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-primary mb-4 tracking-[0.3em] text-sm">
                WELCOMETO RALPH-GALERY
              </h2>
              <div className="relative h-32 mb-6 overflow-hidden">
                {phrases.map((phrase, index) => (
                  <motion.h1
                    key={phrase}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                      y: currentPhrase === index ? 0 : 100,
                      opacity: currentPhrase === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute text-7xl lg:text-8xl font-light tracking-tighter"
                  >
                    {phrase}
                  </motion.h1>
                ))}
              </div>
              <motion.p
                className="text-white/70 text-lg max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Transforming fleeting moments into timeless memories through the
                lens of artistic vision and technical excellence.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-4 gap-8 mb-12"
            >
              {[
                { number: "10+", label: "Years Experience" },
                { number: "250+", label: "Projects" },
                { number: "180+", label: "Clients" },
                { number: "15+", label: "Awards" },
              ].map((stat, index) => (
                <div key={stat.label} className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10"
                  >
                    <h3 className="text-3xl font-light text-white mb-1">
                      {stat.number}
                    </h3>
                    <p className="text-sm text-white/50">{stat.label}</p>
                  </motion.div>
                  <div className="absolute inset-0 bg-white/5 -skew-x-12 group-hover:bg-white/10 transition-colors duration-300" />
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-8"
            >
              <Link
                href="/gallery"
                className="group relative px-8 py-4 bg-primary overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  Explore Gallery
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <Link
                href="#contact"
                className="text-white/50 hover:text-white transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-5 h-5 border-2 border-white/30 rounded-full flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-white/30 rounded-full" />
        </motion.div>
        <span className="text-white/30 text-sm tracking-widest">SCROLL</span>
      </motion.div>
    </section>
  );
}
