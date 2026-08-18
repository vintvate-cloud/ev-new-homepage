import React from "react";
import { motion, Variants } from "framer-motion";

// Container for staggering children elements sequentially
export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0.05,
  once = true,
  amount = 0.05,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  [key: string]: any;
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Child item inside a StaggerContainer that animates sequentially
export const StaggerItem = ({
  children,
  className = "",
  yOffset = 25,
  scaleOffset = 0.98,
  duration = 0.6,
  as = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  scaleOffset?: number;
  duration?: number;
  as?: "div" | "button" | "a" | "span" | "article" | "li";
  [key: string]: any;
}) => {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      scale: scaleOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const Component = (motion as any)[as] || motion.div;

  return (
    <Component variants={itemVariants} className={className} {...props}>
      {children}
    </Component>
  );
};

// Standalone section or element reveal
export const Reveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  yOffset = 30,
  direction = "up",
  once = true,
  amount = 0.05,
  as = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  amount?: number | "some" | "all";
  as?: "div" | "button" | "a" | "span" | "article" | "section";
  [key: string]: any;
}) => {
  let initialPos: { opacity: number; x: number; y: number; scale: number } = {
    opacity: 0,
    x: 0,
    y: 0,
    scale: 0.98,
  };

  if (direction === "up") initialPos.y = yOffset;
  else if (direction === "down") initialPos.y = -yOffset;
  else if (direction === "left") initialPos.x = yOffset;
  else if (direction === "right") initialPos.x = -yOffset;

  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      initial={initialPos}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      viewport={{ once, amount }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

// Sequential Header helper (badge -> heading -> subtitle)
export const SequentialHeader = ({
  badge,
  title,
  highlight,
  subtitle,
  className = "text-center max-w-2xl mx-auto mb-16",
  badgeColor = "text-[#00D084]",
  highlightColor = "text-[#00D084]",
}: {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
  badgeColor?: string;
  highlightColor?: string;
}) => {
  return (
    <StaggerContainer className={className} staggerDelay={0.1}>
      {badge && (
        <StaggerItem yOffset={15} scaleOffset={0.95}>
          <span className={`text-[10px] uppercase tracking-[0.25em] font-bold ${badgeColor}`}>
            {badge}
          </span>
        </StaggerItem>
      )}
      <StaggerItem yOffset={20}>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-3 mb-4">
          {title}{" "}
          {highlight && <span className={highlightColor}>{highlight}</span>}
        </h2>
      </StaggerItem>
      {subtitle && (
        <StaggerItem yOffset={15}>
          <p className="text-muted-foreground text-sm font-light leading-relaxed">
            {subtitle}
          </p>
        </StaggerItem>
      )}
    </StaggerContainer>
  );
};
