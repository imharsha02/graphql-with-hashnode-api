"use client";
import React from "react";
import { motion } from "framer-motion";

const FloatingChartShapes = () => {
  const colors = {
    blue: "rgba(166, 206, 227, 0.3)",
    green: "rgba(51, 160, 44, 0.2)",
    lightGreen: "rgba(178, 223, 138, 0.25)",
    red: "rgba(227, 26, 28, 0.2)",
    orange: "rgba(253, 191, 111, 0.25)",
    purple: "rgba(202, 178, 214, 0.3)",
  };

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Cute Bar Chart */}
      <motion.svg
        className="absolute top-20 -right-16 w-48 h-32"
        viewBox="0 0 200 100"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.7,
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <rect x="20" y="60" width="20" height="40" rx="4" fill={colors.blue} />
        <rect x="60" y="40" width="20" height="60" rx="4" fill={colors.green} />
        <rect
          x="100"
          y="20"
          width="20"
          height="80"
          rx="4"
          fill={colors.orange}
        />
        <rect
          x="140"
          y="50"
          width="20"
          height="50"
          rx="4"
          fill={colors.purple}
        />
      </motion.svg>

      {/* Cute Pie Chart */}
      <motion.svg
        className="absolute bottom-40 -left-16 w-40 h-40"
        viewBox="0 0 100 100"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.7,
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <path d="M50 50 L50 0 A50 50 0 0 1 100 50 Z" fill={colors.blue} />
        <path d="M50 50 L100 50 A50 50 0 0 1 50 100 Z" fill={colors.green} />
        <path d="M50 50 L50 100 A50 50 0 0 1 0 50 Z" fill={colors.orange} />
        <path d="M50 50 L0 50 A50 50 0 0 1 50 0 Z" fill={colors.purple} />
      </motion.svg>

      {/* Cute Line Chart */}
      <motion.svg
        className="absolute top-1/2 -right-20 w-48 h-32"
        viewBox="0 0 200 100"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.7,
          y: [-10, 10, -10],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <path
          d="M20 80 Q50 20 80 60 T140 40 T180 30"
          fill="none"
          stroke={colors.blue}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="20" cy="80" r="4" fill={colors.orange} />
        <circle cx="80" cy="60" r="4" fill={colors.orange} />
        <circle cx="140" cy="40" r="4" fill={colors.orange} />
        <circle cx="180" cy="30" r="4" fill={colors.orange} />
      </motion.svg>

      {/* Cute Dots Grid */}
      <motion.svg
        className="absolute top-1/3 -left-20 w-32 h-32"
        viewBox="0 0 100 100"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.7,
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={20 + col * 20}
              cy={20 + row * 20}
              r="4"
              fill={
                colors[
                  Object.keys(colors)[
                    Math.floor(Math.random() * Object.keys(colors).length)
                  ]
                ]
              }
            />
          ))
        )}
      </motion.svg>
    </div>
  );
};

export default FloatingChartShapes;
