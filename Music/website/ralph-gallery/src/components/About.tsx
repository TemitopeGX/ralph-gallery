import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen bg-background py-20 overflow-hidden"
    >
      {/* Lens Effect Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute left-1/4 top-1/4 w-[400px] h-[400px] border-[1px] border-white/20 rounded-full"
        />
        <motion.div
          style={{ y }}
          className="absolute -right-1/4 top-1/2 w-[800px] h-[800px] border-[1px] border-white/10 rounded-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-primary mb-4 tracking-[0.3em] text-sm">
            ABOUT ME
          </h2>
          <h3 className="text-5xl font-light tracking-tight">
            The Story Behind the Lens
          </h3>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="aspect-[4/5] overflow-hidden"
            >
              <img
                src="/images/photographer.jpg"
                alt="Photographer"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="absolute -bottom-8 -right-8 w-40 h-40 border border-primary/20"
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="absolute -top-8 -left-8 w-40 h-40 border border-primary/20"
            />
          </motion.div>

          {/* Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-white/70 leading-relaxed">
                With over a decade of experience behind the lens, I've dedicated
                my life to capturing the extraordinary in the ordinary. My
                journey in photography began with a simple passion for
                preserving moments, but it has evolved into a pursuit of
                artistic excellence.
              </p>
              <p className="text-white/70 leading-relaxed">
                Every frame tells a story, every shot captures an emotion. I
                specialize in finding the perfect balance between technical
                precision and artistic expression, creating images that resonate
                with both heart and mind.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8 pt-8"
            >
              {[
                { label: "Projects Completed", value: "500+" },
                { label: "Happy Clients", value: "200+" },
                { label: "Awards Received", value: "15+" },
                { label: "Years Experience", value: "10+" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <h4 className="text-3xl font-light text-white mb-2">
                    {stat.value}
                  </h4>
                  <p className="text-sm text-white/50 group-hover:text-primary transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <p className="text-2xl font-light text-white/90 italic">
                "Photography is the story I fail to put into words"
              </p>
              <p className="text-white/50 mt-2">- Your Name</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
