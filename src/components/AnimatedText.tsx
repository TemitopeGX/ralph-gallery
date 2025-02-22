"use client";

import { useEffect } from "react";
import SplitType from "split-type";

export default function AnimatedText() {
  useEffect(() => {
    const text = new SplitType(".split-text", {
      types: "chars",
      tagName: "span",
    });

    const chars = document.querySelectorAll(".char");
    chars.forEach((char, i) => {
      setTimeout(() => {
        (char as HTMLElement).classList.add("revealed");
      }, i * 50);
    });

    return () => {
      if (text) text.revert();
    };
  }, []);

  return null;
}
