import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook that initializes GSAP text slide-up animations for all target elements in a container.
 */
export function useGSAPTextReveal(containerRef?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      const scope = containerRef?.current || document.body;
      const textElements = scope.querySelectorAll<HTMLElement>(
        ".gsap-text-reveal, h1, h2, h3, .gsap-slide-up"
      );

      const ctx = gsap.context(() => {
        textElements.forEach((el) => {
          if (el.dataset.gsapAnimated === "true") return;
          el.dataset.gsapAnimated = "true";

          gsap.fromTo(
            el,
            {
              y: 50,
              opacity: 0,
              willChange: "transform, opacity",
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        });
      }, scope);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef]);
}

/**
 * GSAP Text wrapper component for sliding text upwards as the user scrolls.
 */
export function GSAPText({
  children,
  className = "",
  delay = 0,
  y = 50,
  duration = 1.1,
  stagger = 0,
  as: Component = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  as?: any;
  [key: string]: any;
}) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !textRef.current) return;

    const el = textRef.current;
    const ctx = gsap.context(() => {
      const targets = stagger > 0 ? Array.from(el.children) : el;

      gsap.fromTo(
        targets,
        {
          y,
          opacity: 0,
          willChange: "transform, opacity",
        },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, y, duration, stagger]);

  return (
    <Component ref={textRef} className={className} {...props}>
      {children}
    </Component>
  );
}

/**
 * Sequential GSAP Header component that slides badge, title, and subtitle upwards in sequence using GSAP.
 */
export function GSAPHeader({
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
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const el = containerRef.current;

    const ctx = gsap.context(() => {
      const children = Array.from(el.children);

      gsap.fromTo(
        children,
        {
          y: 45,
          opacity: 0,
          willChange: "transform, opacity",
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {badge && (
        <div>
          <span className={`text-[10px] uppercase tracking-[0.25em] font-mono font-bold ${badgeColor}`}>
            {badge}
          </span>
        </div>
      )}
      <div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-3 mb-4">
          {title}{" "}
          {highlight && <span className={highlightColor}>{highlight}</span>}
        </h2>
      </div>
      {subtitle && (
        <div>
          <p className="text-muted-foreground text-sm font-light leading-relaxed">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
