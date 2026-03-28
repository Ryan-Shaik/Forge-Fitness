import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../data/content';
import { Star, ShieldCheck, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entry animation for cards
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children, 
          { 
            y: 60, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.18,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Refresh ScrollTrigger to account for pinning in previous sections (Gallery)
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -10,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(184,255,87,0.1)"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      boxShadow: "0 0 0 rgba(0,0,0,0)"
    });
  };

  return (
    <section 
      ref={containerRef}
      id="testimonials"
      className="bg-[#080808] py-32 px-6 relative overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-acid/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-acid/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-acid/10 border border-acid/20 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-acid" />
            <span className="font-bebas text-xs tracking-[0.2em] text-acid">VERIFIED RESULTS</span>
          </div>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none">
            MEMBERS DON'T <span className="text-acid italic">LIE</span>
          </h2>
          <p className="font-dm text-white/40 text-sm mt-6 max-w-xl mx-auto leading-relaxed">
            We don't sell memberships. We sell transformations. Join the community of the relentless and see why we are the standard.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative border border-white/5 p-10 bg-[#111] rounded-3xl transition-all duration-500 cursor-default group flex flex-col"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-acid text-acid" />
                ))}
              </div>

              {/* Quote Icon */}
              <Quote className="absolute top-8 right-8 w-10 h-10 text-white/[0.03] group-hover:text-acid/10 transition-colors duration-500" />

              {/* Quote Text */}
              <div className="flex-grow">
                <p className="font-dm text-white/80 text-lg leading-relaxed mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/5 mb-8" />

              {/* Bottom Row */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-acid to-[#8ecf3a] flex items-center justify-center text-forge font-bold text-lg shadow-[0_10px_20px_rgba(184,255,87,0.2)] transform group-hover:rotate-3 transition-transform">
                  {item.initials}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bebas text-white text-xl tracking-wide leading-none">
                      {item.name}
                    </h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-acid" />
                  </div>
                  <p className="font-dm text-acid/60 text-[11px] font-bold uppercase tracking-widest mt-2">
                    {item.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="font-bebas text-2xl text-white">IRON ELITE</div>
          <div className="font-bebas text-2xl text-white">RAW POWER</div>
          <div className="font-bebas text-2xl text-white">FORGE ATHLETICS</div>
          <div className="font-bebas text-2xl text-white">RELENTLESS CO.</div>
        </div>
      </div>
    </section>
  );
}
