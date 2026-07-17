import { useEffect, useRef } from "react";
import gsap from "gsap";

interface UseInfiniteColumnsProps {
  direction: "up" | "down";
  duration: number; // Duration of one full loop in seconds
  isHovered: boolean; // Hover state of the parent wall to slow down movement
}

/**
 * Custom hook to create a seamless infinite vertical marquee using GSAP.
 * Operates on percentage translations (yPercent) to prevent layout thrashing
 * and ensure hardware-accelerated 60fps animations.
 */
export function useInfiniteColumns({ direction, duration, isHovered }: UseInfiniteColumnsProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    // We start from 0 to -50% for upward, and -50% to 0 for downward.
    // The container elements must be duplicated once internally.
    const startVal = direction === "up" ? 0 : -50;
    const endVal = direction === "up" ? -50 : 0;

    // Reset initial positioning
    gsap.set(el, { yPercent: startVal });

    // GSAP context to ensure safe cleanup
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        el,
        { yPercent: startVal },
        {
          yPercent: endVal,
          duration: duration,
          ease: "none",
          repeat: -1,
          overwrite: "auto",
        }
      );
      tweenRef.current = tween;
    }, el);

    return () => {
      ctx.revert();
    };
  }, [direction, duration]);

  // Handle speed scaling based on hover state
  useEffect(() => {
    if (tweenRef.current) {
      // Smoothly transition between normal speed (1) and hover speed (0.35)
      gsap.to(tweenRef.current, {
        timeScale: isHovered ? 0.35 : 1,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  return targetRef;
}
