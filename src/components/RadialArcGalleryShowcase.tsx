import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * RadialArcGalleryShowcase
 * Dynamic GSAP ScrollTrigger Fan-Out gallery dome
 */

const ARC_CARDS = [
  {
    image: "/gallery/hydraulic-lift.png",
    title: "Hydraulic Lift Bay",
    angle: -84,
  },
  {
    image: "/gallery/battery-lab.png",
    title: "Battery Diagnostic Lab",
    angle: -60,
  },
  {
    image: "/ev-service-centre-real-hero.png",
    title: "Master Technicians",
    angle: -36,
  },
  {
    image: "/gallery/scanner.png",
    title: "CAN-Bus Telemetry Scan",
    angle: -12,
  },
  {
    image: "/gallery/handover.png",
    title: "Vehicle Key Ceremony",
    angle: 12,
  },
  {
    image: "/tools/fast-charger-tester.png",
    title: "DC Charger Tester",
    angle: 36,
  },
  {
    image: "/gallery/lounge.png",
    title: "VIP Customer Lounge",
    angle: 60,
  },
  {
    image: "/tools/bms-diagnostic.png",
    title: "BMS Cell Balancer",
    angle: 84,
  },
];

export default function RadialArcGalleryShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [geom, setGeom] = useState({
    radius: 480,
    centerY: 510,
    cardW: 154,
    cardH: 182,
    containerH: 640,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setGeom({
          radius: 220,
          centerY: 260,
          cardW: 85,
          cardH: 102,
          containerH: 360,
        });
      } else if (w < 1024) {
        setGeom({
          radius: 340,
          centerY: 380,
          cardW: 122,
          cardH: 144,
          containerH: 480,
        });
      } else if (w < 1280) {
        setGeom({
          radius: 420,
          centerY: 450,
          cardW: 138,
          cardH: 160,
          containerH: 560,
        });
      } else {
        setGeom({
          radius: 480,
          centerY: 510,
          cardW: 154,
          cardH: 182,
          containerH: 640,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center 40%",
          scrub: 1.2,
        },
      });

      cardsRef.current.forEach((cardEl, i) => {
        if (!cardEl) return;
        const card = ARC_CARDS[i];
        const rad = (card.angle * Math.PI) / 180;
        const finalX = Math.sin(rad) * geom.radius;
        const finalY = geom.centerY - Math.cos(rad) * geom.radius;

        // Set initial fan-folded state
        gsap.set(cardEl, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: geom.centerY - geom.radius * 0.35,
          rotation: 0,
          scale: 0.55,
          opacity: 0.15,
        });

        // Scrubbed fan-out animation into full 180° radial arc dome
        tl.to(
          cardEl,
          {
            x: finalX,
            y: finalY,
            rotation: card.angle,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
          },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [geom]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#020403] text-white font-serif py-16 px-4 overflow-hidden border-t border-white/10 select-none"
    >
      {/* ---------- DOME ARC CONTAINER ---------- */}
      <div
        className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-end pb-4"
        style={{ height: `${geom.containerH}px` }}
      >
        {/* SEMI-CIRCULAR ARC CARDS LAYER (GSAP SCROLL FAN-OUT) */}
        <div className="absolute inset-0 pointer-events-none">
          {ARC_CARDS.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="absolute pointer-events-auto rounded-[20px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden border border-white/20 hover:border-[#00D084] shadow-[0_25px_50px_rgba(0,0,0,0.9)] bg-black cursor-pointer group transition-all duration-300 left-1/2 top-0"
              style={{
                width: `${geom.cardW}px`,
                height: `${geom.cardH}px`,
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover rounded-[20px] sm:rounded-[28px] md:rounded-[32px] group-hover:scale-108 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                <span className="text-[10px] font-sans font-bold text-[#00D084] leading-tight">
                  {card.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* MINIMAL LIGHT TYPOGRAPHY CONTENT INSIDE ARC */}
        <div className="relative z-20 text-center max-w-xl mx-auto px-4 space-y-4 mb-4 -translate-y-24 sm:-translate-y-32">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white"
          >
            Explore Our EV Service Gallery
          </motion.h2>
        </div>
      </div>

      {/* ---------- 3-COLUMN MINIMAL FEATURES GRID ---------- */}
      <div className="relative z-20 max-w-4xl mx-auto w-full px-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8 text-center">
          {/* Feature 1 */}
          <div className="space-y-1 sm:border-r border-white/10 sm:pr-4">
            <h4 className="text-sm font-serif font-bold text-white">Realistic Results</h4>
            <p className="text-[11px] font-serif text-white/40">
              Telemetric 40-point diagnostic reports
            </p>
          </div>

          {/* Feature 2 */}
          <div className="space-y-1 sm:border-r border-white/10 sm:px-4">
            <h4 className="text-sm font-serif font-bold text-white">Fast Service</h4>
            <p className="text-[11px] font-serif text-white/40">
              Same-day servicing & CCTV lounge access
            </p>
          </div>

          {/* Feature 3 */}
          <div className="space-y-1 sm:pl-4">
            <h4 className="text-sm font-serif font-bold text-white">OEM Certified</h4>
            <p className="text-[11px] font-serif text-white/40">
              100% factory parts & warranty protection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
