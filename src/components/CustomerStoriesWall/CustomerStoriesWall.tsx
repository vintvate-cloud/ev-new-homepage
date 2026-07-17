import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Review, CustomerStoriesWallProps } from "./types";
import { Column } from "./Column";
import { dummyReviews as defaultReviews } from "./dummyReviews";
import "./styles.css";

/**
 * CustomerStoriesWall: A luxury moving editorial grid of reviews and case studies
 * inspired by premium design websites (e.g. Apple, high-end startups).
 * Uses GSAP for seamless loop marquee movement and Framer Motion for scroll reveals.
 */
export const CustomerStoriesWall: React.FC<CustomerStoriesWallProps> = ({
  reviews = defaultReviews,
  heading = "Stories from the people who built with us.",
  subheading = "From rapid prototypes to enterprise grid systems. Our platform powers specialized EV networks, logistics pipelines, and multi-brand fleet infrastructure worldwide.",
  speedMultiplier = 1,
  gap = 24,
  className = "",
}) => {
  const [isWallHovered, setIsWallHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(1200);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Handle window resizing to dynamically partition reviews and prevent layout loss
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax mouse interaction (max 8-10px)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates (-1 to 1)
    const normX = (clientX - innerWidth / 2) / (innerWidth / 2);
    const normY = (clientY - innerHeight / 2) / (innerHeight / 2);
    
    setMouseOffset({
      x: normX * 8, // max 8px horizontal offset
      y: normY * 8, // max 8px vertical offset
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsWallHovered(false);
  };

  // Determine partitioning of columns based on responsiveness width
  const isDesktop = screenWidth >= 1024;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  const columnData = (() => {
    if (isDesktop) {
      // 3 Columns on Desktop
      return [
        {
          id: "col-1",
          reviews: reviews.filter((_, idx) => idx % 3 === 0),
          direction: "up" as const,
          duration: 80 / speedMultiplier,
        },
        {
          id: "col-2",
          reviews: reviews.filter((_, idx) => idx % 3 === 1),
          direction: "down" as const,
          duration: 100 / speedMultiplier,
        },
        {
          id: "col-3",
          reviews: reviews.filter((_, idx) => idx % 3 === 2),
          direction: "up" as const,
          duration: 120 / speedMultiplier,
        },
      ];
    } else if (isTablet) {
      // 2 Columns on Tablet
      return [
        {
          id: "col-1",
          reviews: reviews.filter((_, idx) => idx % 2 === 0),
          direction: "up" as const,
          duration: 80 / speedMultiplier,
        },
        {
          id: "col-2",
          reviews: reviews.filter((_, idx) => idx % 2 === 1),
          direction: "down" as const,
          duration: 100 / speedMultiplier,
        },
      ];
    } else {
      // 1 Column on Mobile
      return [
        {
          id: "col-1",
          reviews: reviews,
          direction: "up" as const,
          duration: 90 / speedMultiplier,
        },
      ];
    }
  })();

  // Motion variants for section reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const wallVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isSectionInView ? "visible" : "hidden"}
      variants={containerVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full min-h-screen py-32 bg-[var(--background)] text-[var(--foreground)] overflow-hidden ${className}`}
    >
      {/* Header aligned with standard responsive content width */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 mb-20">
        <div className="max-w-5xl">
          <motion.h2
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-[100px] font-sans font-semibold tracking-[-0.04em] leading-[0.9] text-[var(--foreground)]"
          >
            {heading}
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="mt-8 text-base lg:text-lg text-[var(--foreground)] opacity-50 font-light leading-relaxed max-w-2xl"
          >
            {subheading}
          </motion.p>
        </div>
      </div>

      {/* Wall spans full width (edge to edge) */}
      <motion.div
        variants={wallVariants}
        onMouseEnter={() => setIsWallHovered(true)}
        className="relative w-full h-[720px] md:h-[840px] stories-wall-container px-4 md:px-8"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Column Grid (edge to edge) */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full overflow-hidden w-full max-w-none"
          style={{ gap: `${gap}px` }}
        >
          {columnData.map((col, idx) => (
            <Column
              key={col.id}
              reviews={col.reviews}
              direction={col.direction}
              duration={col.duration}
              isHovered={isWallHovered}
              gap={gap}
              // Add staggered starting translations for an organic look
              className={idx === 1 ? "md:pt-16" : idx === 2 ? "lg:pt-32" : ""}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};
