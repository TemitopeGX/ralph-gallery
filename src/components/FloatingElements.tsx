"use client";

export default function FloatingElements() {
  const floatingElements = [
    { top: "15%", left: "20%", delay: "0s" },
    { top: "70%", left: "35%", delay: "2s" },
    { top: "45%", left: "70%", delay: "4s" },
  ];

  return (
    <div className="absolute inset-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#B8860B_0%,transparent_50%)] opacity-10" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#B8860B10_1px,transparent_1px),linear-gradient(to_bottom,#B8860B10_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-5" />

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#B8860B] rounded-full animate-firefly"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
