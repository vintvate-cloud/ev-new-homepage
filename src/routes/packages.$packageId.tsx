import { createFileRoute, Link } from '@tanstack/react-router';
import { PACKAGES } from '../data/packages';
import { useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle2, Clock, ShieldCheck, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute('/packages/$packageId')({
  component: PackageDetails,
});

function PackageDetails() {
  const { packageId } = Route.useParams();
  const pkg = PACKAGES.find(p => p.id === packageId);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Parallax image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Fade up elements
      gsap.fromTo(".fade-up", 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "expo.out",
          delay: 0.2
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [packageId]);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#050906] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Package Not Found</h1>
          <Link to="/" className="text-[#00D084] hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const Icon = pkg.icon;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050906] text-white selection:bg-[#00D084] selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 mix-blend-difference">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to OS
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[80vh] min-h-[600px] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-[#050906]">
          <img 
            ref={imageRef}
            src={pkg.img} 
            alt={pkg.title} 
            className="w-full h-[120%] object-cover opacity-50 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050906] via-[#050906]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050906]/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 pb-20">
          <div className="flex items-center gap-4 mb-8 fade-up">
            <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 flex items-center justify-center border border-[#00D084]/50 backdrop-blur-md text-[#00D084]">
              <Icon className="w-6 h-6" />
            </div>
            <span className="px-4 py-2 rounded-full border border-white/20 text-xs font-bold tracking-widest uppercase bg-white/5 backdrop-blur-md text-white">
              {pkg.tag}
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-semibold tracking-tighter leading-[0.9] text-white mb-6 fade-up">
            {pkg.title}
          </h1>
          <p className="text-2xl md:text-3xl font-light text-white/60 max-w-3xl fade-up">
            {pkg.desc}
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="relative w-full py-32 bg-[#050906]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Left Column: Long Description & Features */}
            <div className="lg:col-span-7 fade-up">
              <h2 className="text-3xl md:text-5xl font-semibold mb-10 tracking-tight text-white/90">
                Uncompromising Quality. <br/>
                <span className="text-[#00D084] italic font-serif">Absolute Clarity.</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-20">
                {pkg.longDesc}
              </p>

              <div className="border-t border-white/10 pt-16">
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-white/40 mb-10">
                  Included Services
                </h3>
                <ul className="flex flex-col gap-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-5">
                      <div className="mt-1 bg-[#00D084]/10 rounded-full p-1 border border-[#00D084]/30">
                        <CheckCircle2 className="w-5 h-5 text-[#00D084]" />
                      </div>
                      <span className="text-2xl font-medium text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Pricing & Meta */}
            <div className="lg:col-span-5 fade-up lg:pl-10">
              <div className="sticky top-32 p-10 md:p-14 rounded-[40px] bg-[#0a0f0c] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00D084]/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="text-sm font-bold tracking-[0.3em] uppercase text-[#00D084] mb-8">
                    Investment
                  </div>
                  
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-6xl md:text-7xl font-bold tracking-tighter text-white">{pkg.price}</span>
                    <span className="text-2xl text-white/30 line-through">{pkg.oldPrice}</span>
                  </div>
                  
                  <div className="inline-block bg-[#00D084]/20 text-[#00D084] px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase border border-[#00D084]/30 mb-12">
                    {pkg.save}
                  </div>

                  <div className="flex flex-col gap-6 mb-12 text-white/60 text-lg">
                    <div className="flex items-center gap-4">
                      <Clock className="w-6 h-6 text-white/40" />
                      <span>{pkg.validity}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <ShieldCheck className="w-6 h-6 text-white/40" />
                      <span>Guaranteed OEM Parts</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Zap className="w-6 h-6 text-white/40" />
                      <span>Priority Support</span>
                    </div>
                  </div>

                  <button className="w-full py-6 rounded-full bg-white text-black font-bold text-lg hover:bg-[#00D084] transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,208,132,0.3)]">
                    Secure Package
                  </button>
                  <p className="text-center text-sm text-white/30 mt-6 font-mono">
                    Terms & Conditions apply.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
