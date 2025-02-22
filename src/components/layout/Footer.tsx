import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebook, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#B8860B10_1px,transparent_1px),linear-gradient(to_bottom,#B8860B10_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-light tracking-wider">
              RALPH<span className="text-[#B8860B]">GALLERY</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Capturing life's precious moments with elegance and authenticity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#B8860B] font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/#about">About Us</FooterLink>
              <FooterLink href="/#contact">Contact</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#B8860B] font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <FooterLink href="/services/weddings">
                Wedding Photography
              </FooterLink>
              <FooterLink href="/services/portraits">
                Portrait Sessions
              </FooterLink>
              <FooterLink href="/services/events">Event Coverage</FooterLink>
              <FooterLink href="/services/commercial">
                Commercial Shoots
              </FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#B8860B] font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Lagos, Nigeria</li>
              <li>contact@ralphgallery.com</li>
              <li>+234 123 456 7890</li>
            </ul>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <SocialLink href="#" icon={<FaInstagram />} />
              <SocialLink href="#" icon={<FaTwitter />} />
              <SocialLink href="#" icon={<FaFacebook />} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Ralph Gallery. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made by TemitopeGX
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-400 hover:text-[#B8860B] transition-colors"
      >
        {children}
      </Link>
    </li>
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
