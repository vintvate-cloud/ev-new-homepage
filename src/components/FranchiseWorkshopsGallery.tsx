import { useState } from "react";
import { motion } from "framer-motion";
import { GalleryLightbox, LightboxItem } from "./GalleryLightbox";

export interface GalleryCard {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title?: string;
}

export const WORKSHOP_GALLERY_CARDS: GalleryCard[] = [
  // FAR LEFT — gallery images
  {
    src: "/ai-gallery/abstract_3d.png",
    x: -349,
    y: 510,
    w: 140,
    h: 190,
    title: "3D EV Component Architecture",
  },
  {
    src: "/ai-gallery/ev_charging_hub.png",
    x: -202,
    y: 440,
    w: 140,
    h: 190,
    title: "Commercial EV Charging Hub",
  },
  {
    src: "/ai-gallery/nature_flowers.png",
    x: -55,
    y: 370,
    w: 140,
    h: 190,
    title: "Eco-Friendly Workshop Ambience",
  },
  {
    src: "/ai-gallery/ev_battery_tech.png",
    x: -55,
    y: 572,
    w: 140,
    h: 160,
    title: "HV Battery Module Diagnostic Bench",
  },

  // COLUMN 1 — black cat
  {
    src: "/ai-gallery/cat_on_car.png",
    x: 88,
    y: 308,
    w: 142,
    h: 165,
    title: "EV Lifestyle & Community",
  },
  {
    src: "/ai-gallery/indoor_plant.png",
    x: 88,
    y: 482,
    w: 142,
    h: 160,
    title: "Green Infrastructure Facility",
  },

  // COLUMN 2 — plant + portrait + mountain car
  {
    src: "/ai-gallery/indoor_plant.png",
    x: 235,
    y: 217,
    w: 140,
    h: 132,
    title: "Lounge Ecosystem",
  },
  {
    src: "/ai-gallery/warm_portrait.png",
    x: 235,
    y: 357,
    w: 140,
    h: 132,
    title: "Certified Master Service Lead",
  },
  {
    src: "/ai-gallery/mountain_car.png",
    x: 235,
    y: 498,
    w: 140,
    h: 130,
    title: "All-Terrain EV Diagnostic Run",
  },
  {
    src: "/images/ev_sports_car.png",
    x: 235,
    y: 640,
    w: 140,
    h: 150,
    title: "Performance Sport Tuning",
  },

  // COLUMN 3 — cat + flowers + ruins (ancient arch)
  {
    src: "/ai-gallery/cat_red_hood.png",
    x: 384,
    y: 148,
    w: 140,
    h: 98,
    title: "EV Design Aesthetics",
  },
  {
    src: "/ai-gallery/nature_flowers.png",
    x: 384,
    y: 255,
    w: 140,
    h: 151,
    title: "Zero Emission Sustainable Care",
  },
  {
    src: "/ai-gallery/ancient_arch.png",
    x: 384,
    y: 415,
    w: 140,
    h: 140,
    title: "Heritage Tech Synthesis",
  },
  {
    src: "/ai-gallery/ev_workshop_bay.png",
    x: 384,
    y: 567,
    w: 140,
    h: 155,
    title: "Multi-Bay Hydraulic Service Hub",
  },

  // COLUMN 4 — chair + abstract + mountain car
  {
    src: "/ai-gallery/cinematic_chair.png",
    x: 532,
    y: 69,
    w: 140,
    h: 168,
    title: "Executive Customer Lounge",
  },
  {
    src: "/ai-gallery/abstract_3d.png",
    x: 532,
    y: 246,
    w: 140,
    h: 163,
    title: "CAN-Bus Sensor Mapping",
  },
  {
    src: "/ai-gallery/mountain_car.png",
    x: 532,
    y: 418,
    w: 140,
    h: 138,
    title: "Long-Range EV Highway Test",
  },
  {
    src: "/images/ev_superbike.png",
    x: 532,
    y: 568,
    w: 140,
    h: 150,
    title: "High Voltage Superbike Diagnostics",
  },

  // COLUMN 5 — astronaut + dark car + faces
  {
    src: "/ai-gallery/astronaut_moon.png",
    x: 680,
    y: 41,
    w: 140,
    h: 201,
    title: "Next-Gen Autonomous Tech",
  },
  {
    src: "/ev-workshop-careers.png",
    x: 680,
    y: 251,
    w: 140,
    h: 181,
    title: "OEM Franchise Workshop Bay",
  },
  {
    src: "/ai-gallery/warm_portrait.png",
    x: 680,
    y: 441,
    w: 140,
    h: 145,
    title: "Dedicated Franchise Partner Support",
  },
  {
    src: "/ai-gallery/ev_battery_tech.png",
    x: 680,
    y: 596,
    w: 140,
    h: 160,
    title: "Thermal Battery Management Lab",
  },
];

interface FranchiseWorkshopsGalleryProps {
  titleLine1?: string;
  titleLine2?: string;
  titleLine3?: string;
  cards?: GalleryCard[];
  className?: string;
}

export function FranchiseWorkshopsGallery({
  titleLine1 = "Developed",
  titleLine2 = "Franchise",
  titleLine3 = "Workshops",
  cards = WORKSHOP_GALLERY_CARDS,
  className = "",
}: FranchiseWorkshopsGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const lightboxItems: LightboxItem[] = cards.map((card, i) => ({
    image: card.src,
    title: card.title || `Workshop Gallery Photo #${i + 1}`,
    description: "State-of-the-art EV service hub facility and franchise infrastructure.",
    category: "FRANCHISE WORKSHOP SHOWCASE",
  }));

  return (
    <section className={`hero-gallery-section relative h-[580px] sm:h-[640px] md:h-screen min-h-[540px] md:min-h-[640px] overflow-hidden bg-[#020403] text-white font-sans border-t border-white/10 ${className}`}>
      {/* SECTION HEADER (Identical across Mobile & Desktop) */}
      <div className="absolute left-5 sm:left-[6%] md:left-[8%] top-[5%] sm:top-[8%] md:top-[10%] z-20 pointer-events-none">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[68px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white font-serif">
          {titleLine1}
          <br />
          {titleLine2}
          <br />
          {titleLine3}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#00D084] font-medium font-sans pointer-events-auto">
          Tap any image to explore in full view
        </p>
      </div>

      {/* FIXED CARD CANVAS (Identical 2D layout scaled proportionally for phone, tablet, and desktop) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full max-w-[1200px] left-[16%] sm:left-[20%] md:left-[26%] lg:left-[30%] scale-[0.65] sm:scale-[0.80] md:scale-[1.0] lg:scale-[1.18] xl:scale-[1.28] origin-left">
          {cards.map((card, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCardIndex(index);
                  setLightboxOpen(true);
                }}
                className="absolute z-30 pointer-events-auto overflow-hidden rounded-[13px] border border-white/12 hover:border-[#00D084] transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl group touch-manipulation"
                style={{
                  left: `${card.x}px`,
                  top: `${card.y}px`,
                  width: `${card.w}px`,
                  height: `${card.h}px`,
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                {/* Internal Image Continuous Vertical Scroll Container */}
                <motion.div
                  className="flex flex-col w-full h-[200%]"
                  animate={{
                    y: isEven ? ["0%", "-50%"] : ["-50%", "0%"],
                  }}
                  transition={{
                    duration: 12 + (index % 3) * 4,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  <img
                    src={card.src}
                    alt={card.title || "Gallery artwork"}
                    className="w-full h-1/2 object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <img
                    src={card.src}
                    alt={card.title || "Gallery artwork loop"}
                    className="w-full h-1/2 object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={activeCardIndex}
        onIndexChange={setActiveCardIndex}
      />
    </section>
  );
}

