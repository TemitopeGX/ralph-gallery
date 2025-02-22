"use client";

import { useEffect, useRef } from "react";

export default function RotatingText() {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = "CAPTURING MOMENTS • CREATING MEMORIES • ";
    if (!circleRef.current) return;

    const chars = text.split("");
    circleRef.current.innerHTML = "";

    chars.forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.transform = `rotate(${i * (360 / chars.length)}deg)`;
      circleRef.current?.appendChild(span);
    });
  }, []);

  return (
    <div className="absolute -right-20 top-20 w-[200px] h-[200px] animate-spin-slow">
      <div
        ref={circleRef}
        className="w-full h-full rounded-full text-gold text-sm tracking-[0.3em]"
        style={{
          position: "relative",
        }}
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              transformOrigin: "0 100px",
              top: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
