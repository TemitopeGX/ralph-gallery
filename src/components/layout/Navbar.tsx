"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Check if we're navigating to a section on the current page
    if (href.startsWith("/#") && pathname === "/") {
      const targetId = href.replace("/", "");
      const element = document.querySelector(targetId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (href.startsWith("/")) {
      // For page navigation
      router.push(href);
    } else if (href.startsWith("#")) {
      // For same-page section navigation
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/40 backdrop-blur-md ${
        isScrolled ? "bg-black/80 py-4" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-light tracking-wider hover:text-[#B8860B] transition-colors"
            onClick={(e) => handleNavigation(e, "/")}
          >
            RALPH<span className="text-[#B8860B]">GALLERY</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" onClick={handleNavigation}>
              Home
            </NavLink>
            <NavLink href="/gallery" onClick={handleNavigation}>
              Gallery
            </NavLink>
            <NavLink href="/#about" onClick={handleNavigation}>
              About
            </NavLink>
            <NavLink href="/#contact" onClick={handleNavigation}>
              Contact
            </NavLink>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <SocialLink href="#" icon={<FaInstagram />} />
            <SocialLink href="#" icon={<FaTwitter />} />
            <SocialLink href="#" icon={<FaFacebook />} />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#B8860B] hover:text-[#B8860B]/80 transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => onClick(e, href)}
      className="text-sm tracking-wider hover:text-[#B8860B] transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#B8860B] transition-all group-hover:w-full" />
    </Link>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 hover:border-[#B8860B] hover:text-[#B8860B] transition-colors"
    >
      {icon}
    </Link>
  );
}
