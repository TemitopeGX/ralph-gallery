export const theme = {
  colors: {
    primary: "#FF4D00", // Orange accent
    background: "#0A0A0A", // Dark background
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255,255,255,0.7)",
      muted: "rgba(255,255,255,0.5)",
    },
    border: "rgba(255,255,255,0.1)",
  },
  transitions: {
    default: "all 0.3s ease",
    slow: "all 0.5s ease",
  },
};

export const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  },
};
