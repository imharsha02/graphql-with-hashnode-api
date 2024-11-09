"use client";
import React, { useState, useCallback, useEffect } from "react";

interface Shape {
  id: number;
  x: number;
  y: number;
  rotation: number;
  type: "pie" | "bar" | "line";
  color: string;
  touched: boolean;
  speed: number;
  direction: number;
}

interface Position {
  x: number;
  y: number;
}

const FloatingDataBackground: React.FC = () => {
  const colors = [
    "rgb(31, 120, 180, 0.3)",
    "rgb(51, 160, 44, 0.3)",
    "rgb(227, 26, 28, 0.3)",
    "rgb(255, 127, 0, 0.3)",
    "rgb(202, 178, 214, 0.3)",
    "rgb(106, 61, 154, 0.3)",
    "rgb(255, 255, 153, 0.3)",
    "rgb(177, 89, 40, 0.3)",
  ];

  const generateInitialPosition = (index: number, total: number): Position => {
    const margin = 20; // Keep shapes away from edges
    return {
      x: margin + Math.random() * (100 - 2 * margin),
      y: margin + Math.random() * (100 - 2 * margin),
    };
  };

  const [shapes, setShapes] = useState<Shape[]>(() =>
    Array.from({ length: 15 }, (_, i) => {
      const position = generateInitialPosition(i, 15);
      return {
        id: i,
        x: position.x,
        y: position.y,
        rotation: Math.random() * 360,
        type: ["pie", "bar", "line"][
          Math.floor(Math.random() * 3)
        ] as Shape["type"],
        color: colors[i % colors.length],
        touched: false,
        speed: 0.1 + Math.random() * 0.2,
        direction: Math.random() * Math.PI * 2,
      };
    })
  );

  // Add autonomous movement
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => {
          const newX = shape.x + Math.cos(shape.direction) * shape.speed;
          const newY = shape.y + Math.sin(shape.direction) * shape.speed;

          // Bounce off edges
          let newDirection = shape.direction;
          if (newX <= 0 || newX >= 100) {
            newDirection = Math.PI - newDirection;
          }
          if (newY <= 0 || newY >= 100) {
            newDirection = -newDirection;
          }

          return {
            ...shape,
            x: Math.max(0, Math.min(100, newX)),
            y: Math.max(0, Math.min(100, newY)),
            direction: newDirection,
            rotation: shape.rotation + 0.2,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setShapes((prevShapes) =>
        prevShapes.map((shape) => {
          const dx = x - shape.x;
          const dy = y - shape.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 20) {
            const angle = Math.atan2(dy, dx);
            const repelX = shape.x - Math.cos(angle) * 2;
            const repelY = shape.y - Math.sin(angle) * 2;
            return {
              ...shape,
              x: Math.max(0, Math.min(100, repelX)),
              y: Math.max(0, Math.min(100, repelY)),
              touched: true,
            };
          }
          return {
            ...shape,
            touched: false,
          };
        })
      );
    },
    []
  );

  const renderShape = (shape: Shape) => {
    const size = 40;
    const style: React.CSSProperties = {
      position: "absolute",
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      transform: shape.touched
        ? `translate(-50%, -50%) rotate(${shape.rotation}deg) scale(1.25)`
        : `translate(-50%, -50%) rotate(${shape.rotation}deg) scale(1)`,
      transition: "transform 0.3s ease-out",
      willChange: "transform",
      pointerEvents: "none",
    };

    switch (shape.type) {
      case "pie":
        return (
          <svg key={shape.id} width={size} height={size} style={style}>
            <path d="M20,20 L20,5 A15,15 0 0,1 33,20 Z" fill={shape.color} />
            <path
              d="M20,20 L33,20 A15,15 0 0,1 20,35 Z"
              fill={shape.color}
              opacity={0.7}
            />
          </svg>
        );
      case "bar":
        return (
          <svg key={shape.id} width={size} height={size} style={style}>
            <rect x="8" y="12" width="6" height="20" fill={shape.color} />
            <rect
              x="17"
              y="8"
              width="6"
              height="24"
              fill={shape.color}
              opacity={0.8}
            />
            <rect
              x="26"
              y="16"
              width="6"
              height="16"
              fill={shape.color}
              opacity={0.6}
            />
          </svg>
        );
      case "line":
        return (
          <svg key={shape.id} width={size} height={size} style={style}>
            <path
              d="M4,28 Q12,12 20,24 T36,16"
              fill="none"
              stroke={shape.color}
              strokeWidth="3"
              opacity={0.8}
            />
          </svg>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background to-background/95"
      onPointerMove={handlePointerMove}
    >
      {/* Grid Background */}
      <svg className="absolute w-full h-full opacity-20">
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
              className="text-muted-foreground/20"
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
              className="text-muted-foreground/30"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Shapes Container */}
      <div className="absolute inset-0">
        {shapes.map((shape) => renderShape(shape))}
      </div>
    </div>
  );
};

export default FloatingDataBackground;
