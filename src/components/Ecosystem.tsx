import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Wrench, ShieldCheck, Radio, Store, Activity, MapPin, 
  LayoutGrid, TrendingUp, Cpu, ArrowRight, CheckCircle2, Zap
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "./ui/scroll-reveal";

const DATA = [
  {
    category: "EV Owners",
    num: "01",
    desc: "A seamless ownership experience powered by real-time infrastructure and doorstep mechanics.",
    image: "/ai-gallery/ev_workshop_bay.png",
    tagline: "Doorstep Mechanic & Live Telemetry Network",
    items: [
      { 
        title: "Certified Doorstep Service", 
        desc: "Technicians come to you. Diagnosed, repaired, and signed off — without visiting a service centre.", 
        icon: Wrench,
        image: "/gallery/handover.png",
        badge: "Same-Day Doorstep"
      },
      { 
        title: "Genuine Parts", 
        desc: "Compatibility-verified parts for your exact 2W/3W model. Warranty tracked seamlessly.", 
        icon: ShieldCheck,
        image: "/tools/battery-analyzer.png",
        badge: "100% OEM Grade"
      },
      { 
        title: "Real-Time Updates", 
        desc: "Know exactly where your technician is and when your vehicle is ready.", 
        icon: Radio,
        image: "/gallery/scanner.png",
        badge: "Live GPS Tracking"
      },
    ],
  },
  {
    category: "Franchise Partners",
    num: "02",
    desc: "A turn-key OS to launch, manage, and scale your EV service centre profitably.",
    image: "/ev-master-workshop-hero.png",
    tagline: "Turn-Key EV Workshop OS & Payout Engine",
    items: [
      { 
        title: "Launch-Ready Business", 
        desc: "Walk into a fully-built operation. Bookings, billing, parts — all managed from Day 1.", 
        icon: Store,
        image: "/ev-service-centre-real-hero.png",
        badge: "Day 1 Turnkey"
      },
      { 
        title: "Transparent Earnings", 
        desc: "Commission calculated automatically. Payout dashboard always live. No manual reconciliation.", 
        icon: Activity,
        image: "/gallery/hydraulic-lift.png",
        badge: "Automated Payouts"
      },
      { 
        title: "Own Your Territory", 
        desc: "Geo-protected zones, your customers, your brand — backed by national infrastructure.", 
        icon: MapPin,
        image: "/gallery/lounge.png",
        badge: "Protected Geo-Zone"
      },
    ],
  },
  {
    category: "Ecosystem Edge",
    num: "03",
    desc: "The underlying architecture that unifies the entire multi-brand service grid.",
    image: "/ai-gallery/ev_battery_tech.png",
    tagline: "Multi-Brand Grid & Neural AI OS",
    items: [
      { 
        title: "15+ Modules, One Login", 
        desc: "Bookings, inventory, CRM, fleet, billing, and analytics — no switching tools.", 
        icon: LayoutGrid,
        image: "/tools/ev-scanner.png",
        badge: "Unified Cloud OS"
      },
      { 
        title: "Scales to 100 Centres", 
        desc: "Same platform from your first franchise outlet to a citywide network.", 
        icon: TrendingUp,
        image: "/tools/fast-charger-tester.png",
        badge: "Pan-India Scale"
      },
      { 
        title: "AI-Assisted Control", 
        desc: "Automation handles routine operations. Owners stay in charge of key decisions.", 
        icon: Cpu,
        image: "/tools/bms-diagnostic.png",
        badge: "Neural AI Engine"
      },
    ],
  },
];

const Card = ({ data, i, progress, range, targetScale }: any) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 pt-10">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${i * 40}px)` }}
        className="relative flex flex-col justify-between w-full max-w-[1300px] mx-auto min-h-[90vh] rounded-[2.5rem] border border-border bg-card p-6 md:p-12 overflow-hidden origin-top transition-colors duration-300"
      >

        {/* Full Card Ambient Graphic Background */}
        <img 
          src={data.image} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 filter blur-sm pointer-events-none" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-card via-card/95 to-card/90 pointer-events-none" />

        {/* Ambient glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00D084] opacity-[0.06] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full">
          {/* Left Column: Editorial Header with Filled Visual Graphic Hero (Shadows Removed, Bold Text) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full bg-[#00D084] animate-pulse" />
                <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#00D084] font-mono font-extrabold">
                  Phase {data.num}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-[68px] font-black tracking-[-0.03em] text-white mb-4 uppercase leading-[0.85] text-balance transition-colors duration-300">
                {data.category}
              </h2>
              <p className="text-base lg:text-lg text-white/95 max-w-sm leading-relaxed font-bold mb-6 transition-colors duration-300">
                {data.desc}
              </p>
            </div>

            {/* Filled Hero Graphic Panel for Left Column (No Shadows) */}
            <div className="relative flex-1 min-h-[220px] w-full rounded-2xl overflow-hidden border border-white/20 bg-black/70 group">
              <img 
                src={data.image} 
                alt={data.category}
                className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700 filter"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap className="w-4 h-4 text-[#00D084]" />
                  <span className="text-xs font-mono font-black text-[#00D084] uppercase tracking-wider">
                    {data.tagline}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-white font-mono border-t border-white/20 pt-2.5 mt-1 font-bold">
                  <span>SYSTEM GRID</span>
                  <span className="text-[#00D084] font-black">100% OPERATIONAL</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center justify-between pt-4 pb-2 border-t border-border/50">
               <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-mono font-bold">System Architecture</span>
               <span className="text-[10px] font-mono font-extrabold text-[#00D084] bg-[#00D084]/15 border border-[#00D084]/30 px-2.5 py-0.5 rounded-full">GRID v4.2</span>
            </div>
          </div>

          {/* Right Column: Bento Features with FULL BACKGROUND FILLED IMAGES & BOLD TEXT */}
          <StaggerContainer staggerDelay={0.1} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {data.items.map((item: any, idx: number) => (
              <StaggerItem 
                key={idx} 
                className={`group relative overflow-hidden flex flex-col justify-between p-6 md:p-8 rounded-[24px] bg-muted/20 border border-white/15 hover:border-[#00D084]/60 transition-all duration-500 ease-out min-h-[220px] ${idx === 0 ? 'sm:col-span-2 min-h-[240px]' : ''}`}
              >
                {/* FULL IMAGE FILLING THE BENTO CARD */}
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 filter brightness-95 pointer-events-none z-0"
                  />
                )}
                {/* Dark Glass Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040806] via-[#040806]/90 to-black/50 pointer-events-none z-0" />

                {/* Header row with Icon, Badge & Arrow (No Shadows) */}
                <div className="flex justify-between items-start mb-6 z-10 relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/30 bg-black/70 backdrop-blur-md text-[#00D084] group-hover:bg-[#00D084] group-hover:text-background group-hover:border-[#00D084] transition-all duration-500 ease-out">
                      <item.icon className="h-5 w-5" />
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#00D084] bg-black/80 backdrop-blur-md border border-[#00D084]/40 px-3 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70 backdrop-blur-md border border-white/20 group-hover:border-[#00D084]/50">
                    <ArrowRight className="h-4 w-4 text-white group-hover:text-[#00D084] -rotate-45 group-hover:rotate-0 transition-all duration-500 ease-out" />
                  </div>
                </div>

                {/* Card Title & Description in Bold Typography */}
                <div className="z-10 relative mt-auto">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084]" />
                    <span className="text-[10px] font-mono text-[#00D084] uppercase font-black tracking-wider">VERIFIED HARDWARE PROTOCOL</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight group-hover:text-[#00D084] transition-colors">{item.title}</h3>
                  <p className="text-[13.5px] text-white/95 leading-[1.6] font-bold group-hover:text-white transition-colors">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </motion.div>
    </div>
  )
}

export function Ecosystem() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="relative w-full bg-background font-sans selection:bg-[#00D084] selection:text-[#020403] transition-colors duration-300">
      
      {/* Intro Header */}
      <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-24 text-center flex flex-col items-center">
         <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-[-0.04em] text-foreground mb-6 leading-tight transition-colors duration-300">
            India Has No One<br />Doing What We Do.
         </h2>
         <p className="text-lg text-foreground/95 max-w-xl font-bold transition-colors duration-300">
           No OEM franchise. No multi-brand EV service platform. No unified ecosystem for 2W & 3W repairs, parts, and payouts — until now.
         </p>
      </div>

      <div className="relative z-10 w-full px-4 lg:px-8 pb-32">
        {DATA.map((col, i) => {
          const targetScale = 1 - ((DATA.length - i) * 0.05);
          return (
            <Card 
              key={i} 
              i={i} 
              data={col} 
              progress={scrollYProgress} 
              range={[i * 0.25, 1]} 
              targetScale={targetScale} 
            />
          )
        })}
      </div>
    </section>
  )
}



