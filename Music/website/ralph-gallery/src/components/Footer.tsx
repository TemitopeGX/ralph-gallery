import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "next/image";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Gallery", href: "/gallery" },
      { name: "About", href: "/#about" },
      { name: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Social",
    links: [
      { name: "Instagram", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "Facebook", href: "#" },
      { name: "LinkedIn", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [email, setEmail] = useState("");

  // Show back to top button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    setEmail("");
    // Show success message
  };

  return (
    <footer className="relative z-10 bg-background py-12 mt-auto">
      {/* Lens Effect Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 1 }}
          className="absolute -left-1/4 -bottom-1/4 w-[600px] h-[600px] border-[1px] border-white/20 rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.02 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -right-1/4 -top-1/4 w-[800px] h-[800px] border-[1px] border-white/20 rounded-full"
        />
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl font-light text-white mb-4"
            >
              Join Our Creative Journey
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/70 mb-8"
            >
              Subscribe to our newsletter for photography tips, updates, and
              exclusive content.
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleNewsletterSubmit}
              className="flex gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-none px-4 py-2 text-white placeholder:text-white/30 focus:border-primary focus:ring-0"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary px-6 py-2 text-white hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <Image
                src="/images/logo.png"
                alt="Ralph Gallery Logo"
                width={400}
                height={200}
                className="h-32 w-auto object-contain"
              />
            </Link>
            <div className="flex gap-4">
              {[
                { icon: FaInstagram, name: "Instagram" },
                { icon: FaTwitter, name: "Twitter" },
                { icon: FaFacebookF, name: "Facebook" },
                { icon: FaLinkedinIn, name: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white/50 text-sm tracking-wider mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 10 }}
                      className="text-white/70 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Ralph Gallery. All rights reserved.
            </p>
            <div className="flex gap-8">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-white/50 hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-white/50 hover:text-primary text-sm transition-colors"
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleBackToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ArrowUpIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md z-50 border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-white/70 text-sm">
                  We use cookies to enhance your experience. By continuing to
                  visit this site you agree to our use of cookies.
                </p>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCookieBanner(false)}
                    className="px-6 py-2 bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    Accept
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCookieBanner(false)}
                    className="px-6 py-2 border border-white/20 text-white hover:bg-white/5 transition-colors"
                  >
                    Decline
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
