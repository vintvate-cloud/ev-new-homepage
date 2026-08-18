import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Wrench, ShieldCheck, Radio, Store, Activity, MapPin, 
  LayoutGrid, TrendingUp, Cpu, ArrowRight 
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "./ui/scroll-reveal";

const DATA = [
  {
    category: "EV Owners",
    num: "01",
    desc: "A seamless ownership experience powered by real-time infrastructure and doorstep mechanics.",
    items: [
      { title: "Certified Doorstep Service", desc: "Technicians come to you. Diagnosed, repaired, and signed off — without visiting a service centre.", icon: Wrench },
      { title: "Genuine Parts", desc: "Compatibility-verified parts for your exact 2W/3W model. Warranty tracked seamlessly.", icon: ShieldCheck },
      { title: "Real-Time Updates", desc: "Know exactly where your technician is and when your vehicle is ready.", icon: Radio },
    ],
  },
  {
    category: "Franchise Partners",
    num: "02",
    desc: "A turn-key OS to launch, manage, and scale your EV service centre profitably.",
    items: [
      { title: "Launch-Ready Business", desc: "Walk into a fully-built operation. Bookings, billing, parts — all managed from Day 1.", icon: Store },
      { title: "Transparent Earnings", desc: "Commission calculated automatically. Payout dashboard always live. No manual reconciliation.", icon: Activity },
      { title: "Own Your Territory", desc: "Geo-protected zones, your customers, your brand — backed by national infrastructure.", icon: MapPin },
    ],
  },
  {
    category: "Ecosystem Edge",
    num: "03",
    desc: "The underlying architecture that unifies the entire multi-brand service grid.",
    items: [
      { title: "15+ Modules, One Login", desc: "Bookings, inventory, CRM, fleet, billing, and analytics — no switching tools.", icon: LayoutGrid },
      { title: "Scales to 100 Centres", desc: "Same platform from your first franchise outlet to a citywide network.", icon: TrendingUp },
      { title: "AI-Assisted Control", desc: "Automation handles routine operations. Owners stay in charge of key decisions.", icon: Cpu },
    ],
  },
];

const Card = ({ data, i, progress, range, targetScale }: any) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 pt-10">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${i * 40}px)` }}
        className="relative flex flex-col justify-between w-full max-w-[1300px] mx-auto min-h-[90vh] rounded-[2.5rem] border border-border bg-card p-8 md:p-14 shadow-lg overflow-hidden origin-top transition-colors duration-300"
      >

        {/* Ambient glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00D084] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 h-full">
          {/* Left Column: Editorial Header */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-[#00D084]" />
                <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
                  Phase {data.num}
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-[76px] font-semibold tracking-[-0.03em] text-foreground mb-6 uppercase leading-[0.85] text-balance transition-colors duration-300">
                {data.category}
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-sm leading-relaxed font-light transition-colors duration-300">
                {data.desc}
              </p>
            </div>
            
            <div className="hidden lg:block mt-auto pb-2">
               <div className="w-12 h-px bg-border mb-6" />
               <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">System Architecture</p>
            </div>
          </div>

          {/* Right Column: Bento Features */}
          <StaggerContainer staggerDelay={0.1} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {data.items.map((item: any, idx: number) => (
              <StaggerItem 
                key={idx} 
                className={`group flex flex-col justify-between p-6 md:p-8 rounded-[24px] bg-muted/20 hover:bg-[#00D084]/[0.02] border border-border hover:border-[#00D084]/30 transition-all duration-500 ease-out ${idx === 0 ? 'sm:col-span-2' : ''}`}
              >
                <div className="flex justify-between items-start mb-8 md:mb-12">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground group-hover:bg-[#00D084] group-hover:text-background group-hover:border-[#00D084] transition-all duration-500 ease-out">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-[#00D084] -rotate-45 group-hover:rotate-0 transition-all duration-500 ease-out" />
                </div>
                
                <div>
                  <h3 className="text-[22px] font-medium text-foreground/90 mb-3 tracking-tight group-hover:text-foreground transition-colors">{item.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-[1.6] font-light group-hover:text-foreground/60 transition-colors">{item.desc}</p>
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
         <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] text-foreground mb-6 leading-tight transition-colors duration-300">
            India Has No One<br />Doing What We Do.
         </h2>
         <p className="text-lg text-muted-foreground max-w-xl font-light transition-colors duration-300">
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
