"use client";
import React from "react";
import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  const [isReducedMotion, setIsReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const isLowPowered = navigator.hardwareConcurrency <= 4;
    if (isLowPowered) setIsReducedMotion(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-background to-background/95">
      {/* Grid Background */}
      <svg
        className="absolute w-full h-full opacity-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="small-grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-muted-foreground/30"
            />
          </pattern>
          <pattern
            id="grid"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <rect width="120" height="120" fill="url(#small-grid)" />
            <path
              d="M 120 0 L 0 0 0 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-muted-foreground/40"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {!isReducedMotion && (
        <>
          {/* Primary Diagonal Shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/30 to-transparent blur-xl"
            animate={{
              x: ["-100%", "100%"],
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity,
            }}
          />

          {/* Secondary Diagonal Shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-bl from-transparent via-primary/20 to-transparent blur-lg"
            animate={{
              x: ["100%", "-100%"],
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 12,
              ease: "linear",
              repeat: Infinity,
            }}
          />

          {/* Horizontal Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-md"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 6,
              ease: "linear",
              repeat: Infinity,
            }}
          />

          {/* Pulsing Circles */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl"
                style={{
                  left: `${30 + i * 30}%`,
                  top: `${20 + i * 25}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 2,
                }}
              />
            ))}
          </div>

          {/* Subtle Mesh Overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
              backgroundSize: '20px 20px',
            }}
          />
        </>
      )}
    </div>
  );
};