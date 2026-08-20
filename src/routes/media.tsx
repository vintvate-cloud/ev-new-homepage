import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  Play,
  Flame,
  X,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Route = createFileRoute("/media")({
  component: MediaPage,
});

const POPULAR_MOVIES = [
  {
    id: "pop-1",
    title: "AUTOBOT ACADEMY",
    subtitle: "Docuseries Episode 1",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-in-a-high-tech-factory-42868-large.mp4",
    tag: "Originals",
    year: "2026",
  },
  {
    id: "pop-2",
    title: "PUNE CITY LAUNCH",
    subtitle: "Coverage & Highlights",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-factory-42867-large.mp4",
    tag: "ET Auto",
    year: "2026",
  },
  {
    id: "pop-3",
    title: "THERMAL SAFETY",
    subtitle: "BMS Anomaly Testing",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-in-a-high-tech-factory-42868-large.mp4",
    tag: "Diagnostics",
    year: "2026",
  },
  {
    id: "pop-4",
    title: "CNBC INTERVIEW",
    subtitle: "Future of EV Service",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-factory-42867-large.mp4",
    tag: "CNBC TV18",
    year: "2026",
  },
  {
    id: "pop-5",
    title: "BMS FLASHING",
    subtitle: "Firmware SOP Demo",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-in-a-high-tech-factory-42868-large.mp4",
    tag: "Tech Demo",
    year: "2025",
  },
  {
    id: "pop-6",
    title: "COMMERCIAL FLEET SLA",
    subtitle: "24/7 RSA Mobile Vans",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-factory-42867-large.mp4",
    tag: "Fleet Care",
    year: "2025",
  },
];

const RIGHT_SLIDE_CARDS = [
  {
    id: "r-1",
    title: "Multi-Brand Workshop OS Architecture",
    publication: "Economic Times Auto",
    desc: "How Autobot OS connects 40+ Indian cities with real-time diagnostic logging & automated parts dispatch.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    tag: "OS Tech",
  },
  {
    id: "r-2",
    title: "Thermal Safety & BMS Cell Balancing SOPs",
    publication: "CNBC TV18 Focus",
    desc: "Ashwini Tiwari discusses active battery safety cutoffs and thermal runaway prevention in commercial fleets.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
    tag: "Safety SOP",
  },
  {
    id: "r-3",
    title: "Pan-India Franchise Expansion Model",
    publication: "Financial Express",
    desc: "Zero-franchise-fee founding partner model empowering regional mechanics and EV workshop entrepreneurs.",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80",
    tag: "Expansion",
  },
];

function MediaPage() {
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);
  const cardsUpRef = useRef<HTMLDivElement>(null);
  const cardsRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero text slow fade-out as cards move up over the hero
      gsap.to(heroTextRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -50,
        ease: "power1.out",
        scrollTrigger: {
          trigger: cardsOverlayRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 0.6,
        },
      });

      // 2. Cards container rises up onto the fixed hero section
      gsap.fromTo(
        cardsUpRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsUpRef.current,
            start: "top 90%",
            end: "top 45%",
            scrub: 0.6,
          },
        }
      );

      // 3. Section 2 cards slide in from the right on further scroll
      gsap.fromTo(
        cardsRightRef.current,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRightRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.6,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#070908] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      {/* Navigation Header */}
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main Container */}
      <div className="relative min-h-screen">
        
        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Hero Poster Image - 100% Crystal Clear */}
          <img
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&auto=format&fit=crop&q=85"
            alt="Brand Assets & Media Library"
            className="w-full h-full object-cover object-center opacity-100 pointer-events-none"
          />

          {/* Hero Content Container (Text slowly fades out as cards rise over it) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 max-w-3xl space-y-3 z-10 transition-all pointer-events-none"
          >
            {/* Title - Bold & Clear */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              Brand Assets & Media Library
            </h1>

            {/* Description - Bold & Clear */}
            <p className="text-lg sm:text-xl font-bold text-white leading-relaxed max-w-2xl drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
              Download logos, banners, images and promotional materials for MY EV SERVICE
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY LAYER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={cardsOverlayRef}
          className="relative z-10 bg-[#070908] min-h-screen mt-[calc(100vh-80px)] pt-12 rounded-t-[40px] border-t border-white/10 shadow-2xl"
        >
          
          {/* CARDS RISING UP ANIMATEDLY (GSAP SCRUBBED FROM BOTTOM OVER HERO) */}
          <section ref={cardsUpRef} className="px-6 lg:px-12 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white flex items-center gap-2.5">
                <Flame className="w-6 h-6 text-[#00D084]" /> Popular Features & Coverage
              </h2>
              <span className="text-xs font-mono text-white/50">Scroll to Explore</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {POPULAR_MOVIES.map((movie) => (
                <motion.div
                  key={movie.id}
                  onClick={() => setSelectedMedia(movie)}
                  whileHover={{ scale: 1.06, y: -6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group relative rounded-2xl border border-white/10 overflow-hidden bg-[#111613] hover:border-[#00D084] transition-all duration-300 cursor-pointer shadow-2xl h-72 sm:h-80 flex flex-col justify-between"
                >
                  {/* Poster Image */}
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Top Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 text-[9px] font-mono font-bold text-[#00D084] border border-white/15">
                    {movie.tag}
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-[#00D084] text-[#020403] flex items-center justify-center shadow-[0_0_25px_rgba(0,208,132,0.8)] scale-95 group-hover:scale-105 transition-transform">
                      <Play className="w-5 h-5 fill-[#020403] ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Title Label */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider line-clamp-1 group-hover:text-[#00D084] transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-[10px] text-white/60 font-mono mt-0.5">{movie.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CARDS SLIDING IN FROM THE RIGHT (GSAP SCRUBBED FROM RIGHT) */}
          <section ref={cardsRightRef} className="px-6 lg:px-12 py-16 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white flex items-center gap-2.5">
                <Video className="w-6 h-6 text-[#00D084]" /> Featured Stories & Spotlights
              </h2>
              <span className="text-xs font-mono text-white/50">Slide from Right</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {RIGHT_SLIDE_CARDS.map((card) => (
                <motion.div
                  key={card.id}
                  onClick={() => setSelectedMedia(card)}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-[#0b0f0c]/90 border border-white/10 hover:border-[#00D084]/50 rounded-3xl overflow-hidden transition-all duration-300 group cursor-pointer shadow-2xl flex flex-col justify-between"
                >
                  <div className="relative h-52 overflow-hidden bg-black/40">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0c] via-transparent to-black/30" />

                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-[#00D084]">
                      {card.tag}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <div className="w-12 h-12 rounded-full bg-[#00D084] text-[#020403] flex items-center justify-center shadow-[0_0_25px_rgba(0,208,132,0.8)]">
                        <Play className="w-5 h-5 fill-[#020403] ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <span className="text-xs font-mono font-bold text-[#00D084]">{card.publication}</span>
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-white group-hover:text-[#00D084] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Video Modal Player */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#0e1310] border border-white/20 rounded-3xl max-w-3xl w-full p-6 relative overflow-hidden shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#00D084] uppercase font-bold">
                  {selectedMedia.publication || selectedMedia.tag || "MY EV MEDIA"}
                </span>
                <h3 className="text-xl font-bold text-white">{selectedMedia.title}</h3>
              </div>
              <button
                onClick={() => setSelectedMedia(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
              <video
                src={selectedMedia.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-factory-42867-large.mp4"}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
