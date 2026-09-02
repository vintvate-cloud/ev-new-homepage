import React, { useEffect, useState } from "react";

/**
 * EngageAudiencesHero
 * Adapted EV Workshop Showcase component
 */

const photos = [
  {
    src: "/gallery/hydraulic-lift.png",
    alt: "Multi-Bay Hydraulic Lift Setup",
    rotate: -6,
  },
  {
    src: "/gallery/battery-lab.png",
    alt: "High-Voltage Battery Diagnostic Lab",
    rotate: 4,
  },
  {
    src: "/ev-service-centre-real-hero.png",
    alt: "Autobot Certified Master Technicians",
    rotate: -4,
  },
  {
    src: "/gallery/scanner.png",
    alt: "Touchscreen CAN-Bus Scanner",
    rotate: 5,
  },
  {
    src: "/gallery/handover.png",
    alt: "Customer Vehicle Handover Ceremony",
    rotate: -5,
  },
  {
    src: "/tools/fast-charger-tester.png",
    alt: "DC Fast Charger Diagnostics Bench",
    rotate: 4,
  },
  {
    src: "/gallery/lounge.png",
    alt: "Customer Waiting Lounge & CCTV",
    rotate: -6,
  },
];

export default function EngageAudiencesHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="relative w-full overflow-hidden bg-[#020403] border-t border-white/10 pt-20 pb-16"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600&display=swap');

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes drawArrow {
          from { stroke-dashoffset: 120; opacity: 0; }
          to   { stroke-dashoffset: 0; opacity: 1; }
        }
        .eah-rise {
          opacity: 0;
          animation: riseIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .eah-photo {
          opacity: 0;
          animation: floatIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
        }
        .eah-photo:hover {
          transform: translateY(-10px) rotate(0deg) scale(1.05) !important;
          box-shadow: 0 30px 50px -12px rgba(0,208,132,0.35);
          z-index: 20;
        }
        .eah-arrow-path {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: drawArrow 1.1s 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .eah-cta {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .eah-cta:hover {
          transform: translateY(-3px) scale(1.035);
          box-shadow: 0 18px 30px -8px rgba(0, 208, 132, 0.55);
        }
        @media (prefers-reduced-motion: reduce) {
          .eah-rise, .eah-photo, .eah-arrow-path { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ---------- Copy block ---------- */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        {/* Badge */}
        <div
          className="eah-rise mb-7 inline-flex items-center rounded-full border border-[#00D084]/40 bg-[#00D084]/15 px-5 py-2 text-[13px] font-semibold text-[#00D084] shadow-md"
          style={{ animationDelay: "0.05s" }}
        >
          Join over 10,000+ happy EV owners
        </div>

        {/* Headline */}
        <h1
          className="eah-rise text-white font-serif"
          style={{
            animationDelay: "0.15s",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.06,
            fontSize: "clamp(2.1rem, 5.4vw, 3.6rem)",
          }}
        >
          Explore Our Workshop
          <br />
          <span className="text-white/40 font-light">with State-of-the-Art Care</span>
        </h1>

        {/* Subtext */}
        <p
          className="eah-rise mt-6 max-w-lg text-[15.5px] leading-relaxed text-white/60 font-serif"
          style={{ animationDelay: "0.28s" }}
        >
          See our certified technicians, OEM battery diagnostic labs, precision tools, and happy EV owners across our Pune service hubs.
        </p>
      </div>

      {/* ---------- Decorative annotations ---------- */}
      {/* Small tick mark */}
      <svg
        className="eah-rise absolute left-[15%] top-[228px] hidden sm:block"
        style={{ animationDelay: "0.5s" }}
        width="26"
        height="34"
        viewBox="0 0 26 34"
        fill="none"
      >
        <path
          d="M4 4L10 30"
          stroke="#00D084"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M15 8L20 26"
          stroke="#00D084"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* "Elevate your EV" script + curved arrow */}
      <div
        className="eah-rise absolute right-[10%] top-[150px] hidden select-none flex-col items-end text-right md:flex"
        style={{ animationDelay: "0.45s" }}
      >
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "22px",
            lineHeight: 1.15,
            color: "#00D084",
            transform: "rotate(-6deg)",
          }}
        >
          Elevate
          <br />
          your EV care
        </span>
        <svg
          width="60"
          height="46"
          viewBox="0 0 60 46"
          fill="none"
          className="mt-1"
        >
          <path
            className="eah-arrow-path"
            d="M4 4C18 6 44 10 50 26C53 34 48 38 44 40"
            stroke="#00D084"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="eah-arrow-path"
            d="M36 38L44 40L45 32"
            stroke="#00D084"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ---------- Photo strip ---------- */}
      <div className="relative mt-14 flex justify-center gap-4 sm:gap-6 px-4 overflow-x-auto no-scrollbar py-6">
        {photos.map((photo, i) => (
          <div
            key={photo.src + i}
            className="eah-photo h-[220px] w-[140px] flex-shrink-0 overflow-hidden rounded-[24px] border border-white/20 shadow-[0_18px_35px_-10px_rgba(0,0,0,0.8)] sm:h-[280px] sm:w-[170px] md:h-[320px] md:w-[190px]"
            style={{
              transform: `rotate(${photo.rotate}deg)`,
              animationDelay: `${0.4 + i * 0.08}s`,
              marginTop: i % 2 === 0 ? "0px" : "12px",
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* ---------- CTA button ---------- */}
      <div className="relative z-20 mt-4 flex justify-center pb-8">
        <button
          onClick={() => {
            const el = document.getElementById("centre-location-map");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="eah-cta eah-rise rounded-full bg-[#00D084] hover:bg-[#00e08f] px-9 py-4 text-[14px] font-bold text-[#020403] uppercase tracking-wider shadow-[0_14px_28px_-8px_rgba(0,208,132,0.55)] cursor-pointer"
          style={{ animationDelay: "1s" }}
        >
          Book Your EV Service Now
        </button>
      </div>
    </section>
  );
}
