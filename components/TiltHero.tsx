import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TiltHero = ({ onSearch }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // More responsive spring config for physical feel
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };

  // Reduced rotation range for more subtle effect
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [5, -5]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-5, 5]),
    springConfig
  );

  // Add subtle scale effect
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative p-12 rounded-3xl
                       bg-gradient-to-br from-primary/5 via-primary/10 to-background
                       backdrop-blur-md border-2 border-primary/20
                       shadow-[0_0_50px_-12px] shadow-primary/20
                       hover:shadow-[0_0_50px_-6px] hover:shadow-primary/30
                       transition-shadow duration-300"
            style={{
              perspective: 2000,
              rotateX: rotateX,
              rotateY: rotateY,
              scale,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Inner content wrapper with 3D effect */}
            <motion.div
              className="relative z-10"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(40px)",
              }}
            >
              <h1 className="text-7xl font-black mb-8 tracking-tight pr-4">
                Hash
                <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  Profiles
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Discover and explore Hashnode user profiles. Search for your
                favorite content creators.
              </p>
            </motion.div>

            {/* Enhanced decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Background elements */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default TiltHero;
