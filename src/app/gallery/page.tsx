import Image from "next/image";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="text-center relative z-10 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6">
          Gallery{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
            Coming Soon
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          We're curating a collection of our finest work. Check back soon to
          explore our portfolio.
        </p>

        {/* Decorative Line */}
        <div className="h-px w-48 mx-auto mt-8 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
    </div>
  );
}
