export interface GalleryCard {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const WORKSHOP_GALLERY_CARDS: GalleryCard[] = [
  // FAR LEFT — gallery images
  {
    src: "/ai-gallery/abstract_3d.png",
    x: -349,
    y: 510,
    w: 140,
    h: 190,
  },
  {
    src: "/ai-gallery/ev_charging_hub.png",
    x: -202,
    y: 440,
    w: 140,
    h: 190,
  },
  {
    src: "/ai-gallery/nature_flowers.png",
    x: -55,
    y: 370,
    w: 140,
    h: 190,
  },
  {
    src: "/ai-gallery/ev_battery_tech.png",
    x: -55,
    y: 572,
    w: 140,
    h: 160,
  },

  // COLUMN 1 — black cat
  {
    src: "/ai-gallery/cat_on_car.png",
    x: 88,
    y: 308,
    w: 142,
    h: 165,
  },
  {
    src: "/ai-gallery/indoor_plant.png",
    x: 88,
    y: 482,
    w: 142,
    h: 160,
  },

  // COLUMN 2 — plant + portrait + mountain car
  {
    src: "/ai-gallery/indoor_plant.png",
    x: 235,
    y: 217,
    w: 140,
    h: 132,
  },
  {
    src: "/ai-gallery/warm_portrait.png",
    x: 235,
    y: 357,
    w: 140,
    h: 132,
  },
  {
    src: "/ai-gallery/mountain_car.png",
    x: 235,
    y: 498,
    w: 140,
    h: 130,
  },
  {
    src: "/images/ev_sports_car.png",
    x: 235,
    y: 640,
    w: 140,
    h: 150,
  },

  // COLUMN 3 — cat + flowers + ruins (ancient arch)
  {
    src: "/ai-gallery/cat_red_hood.png",
    x: 384,
    y: 148,
    w: 140,
    h: 98,
  },
  {
    src: "/ai-gallery/nature_flowers.png",
    x: 384,
    y: 255,
    w: 140,
    h: 151,
  },
  {
    src: "/ai-gallery/ancient_arch.png",
    x: 384,
    y: 415,
    w: 140,
    h: 140,
  },
  {
    src: "/ai-gallery/ev_workshop_bay.png",
    x: 384,
    y: 567,
    w: 140,
    h: 155,
  },

  // COLUMN 4 — chair + abstract + mountain car
  {
    src: "/ai-gallery/cinematic_chair.png",
    x: 532,
    y: 69,
    w: 140,
    h: 168,
  },
  {
    src: "/ai-gallery/abstract_3d.png",
    x: 532,
    y: 246,
    w: 140,
    h: 163,
  },
  {
    src: "/ai-gallery/mountain_car.png",
    x: 532,
    y: 418,
    w: 140,
    h: 138,
  },
  {
    src: "/images/ev_superbike.png",
    x: 532,
    y: 568,
    w: 140,
    h: 150,
  },

  // COLUMN 5 — astronaut + dark car + faces
  {
    src: "/ai-gallery/astronaut_moon.png",
    x: 680,
    y: 41,
    w: 140,
    h: 201,
  },
  {
    src: "/ev-workshop-careers.png",
    x: 680,
    y: 251,
    w: 140,
    h: 181,
  },
  {
    src: "/ai-gallery/warm_portrait.png",
    x: 680,
    y: 441,
    w: 140,
    h: 145,
  },
  {
    src: "/ai-gallery/ev_battery_tech.png",
    x: 680,
    y: 596,
    w: 140,
    h: 160,
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
  return (
    <section className={`hero-gallery-section relative h-screen min-h-[640px] overflow-hidden bg-[#020403] text-white font-sans border-t border-white/10 ${className}`}>
      {/* LEFT TEXT CONTENT */}
      <div className="absolute left-6 sm:left-[6%] md:left-[8%] top-[8%] md:top-[10%] z-20">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[68px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white font-serif">
          {titleLine1}
          <br />
          {titleLine2}
          <br />
          {titleLine3}
        </h2>
      </div>

      {/* IMAGE DESIGN CANVAS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full max-w-[1200px] left-[10%] sm:left-[20%] md:left-[26%] lg:left-[30%] scale-90 sm:scale-100 md:scale-110 lg:scale-125 origin-left">
          {cards.map((card, index) => (
            <div
              key={index}
              className="absolute overflow-hidden rounded-[13px] border border-white/12 hover:border-[#00D084] transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl group"
              style={{
                left: `${card.x}px`,
                top: `${card.y}px`,
                width: `${card.w}px`,
                height: `${card.h}px`,
              }}
            >
              <img
                src={card.src}
                alt="Gallery artwork"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
