import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchMobile = window.innerWidth < 768 || "ontouchstart" in window;

    if (reduced) return;

    // On touch screens/mobile devices, disable Lenis touch hijacking to ensure native 120Hz smooth scrolling
    if (isTouchMobile) {
      ScrollTrigger.config({ ignoreMobileResize: true });
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <>{children}</>;
}
