/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#B8860B",
          light: "#DAA520",
          dark: "#8B6914",
        },
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        firefly: "firefly 4s ease infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        firefly: {
          "0%, 100%": {
            opacity: 0,
            transform: "translateY(0) scale(0.3)",
          },
          "50%": {
            opacity: 0.3,
            transform: "translateY(-20px) scale(1)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "radial-gradient-dark":
          "radial-gradient(circle at center, transparent 0%, black 70%)",
      },
    },
  },
  plugins: [],
};
