import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { plans } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const proCardRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);

  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({});

  const toggleAccordion = (planName: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [planName]: !prev[planName]
    }));
  };

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>, isPro: boolean) => {
    gsap.to(e.currentTarget, {
      y: -12,
      scale: 1.02,
      boxShadow: isPro 
        ? "0 0 60px rgba(184, 255, 87, 0.2)" 
        : "0 20px 60px rgba(0, 0, 0, 0.8)",
      borderColor: isPro ? "#b8ff57" : "rgba(255, 255, 255, 0.3)",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>, isPro: boolean) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: isPro ? 1.04 : 1,
      boxShadow: isPro 
        ? "0 0 40px rgba(184, 255, 87, 0.1)" 
        : "none",
      borderColor: isPro ? "#b8ff57" : "#1e1e1e",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading words stagger
      if (headingRef.current) {
        const words = headingRef.current.innerText.split(' ');
        headingRef.current.innerHTML = words.map(word => `<span class="inline-block mr-[0.2em]">${word}</span>`).join('');
        
        gsap.fromTo(headingRef.current.children, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Cards stagger
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            },
            onComplete: () => {
              // Clear transform so it doesn't interfere with hover if we were using CSS
              // But we are using GSAP for hover now for better control
            }
          }
        );
      }

      // Pro card glow animation (subtle pulse)
      if (proCardRef.current) {
        gsap.to(proCardRef.current, {
          boxShadow: "0 0 40px rgba(184, 255, 87, 0.25)",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut"
        });
      }

      // Guarantee reveal
      if (guaranteeRef.current) {
        gsap.fromTo(guaranteeRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: guaranteeRef.current,
              start: "top 98%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Refresh ScrollTrigger to account for pinning in previous sections
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="pricing"
      className="min-h-screen bg-[#080808] py-24 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="font-bebas text-xs tracking-[.2em] text-acid mb-4 block">
            04 / INVESTMENT
          </span>
          <h2 
            ref={headingRef}
            className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none"
          >
            CHOOSE YOUR LEVEL
          </h2>
          <p className="font-dm text-white/40 text-sm mt-4 max-w-md uppercase tracking-widest">
            Every plan includes full facility access. No initiation fees. Cancel anytime.
          </p>
        </div>

        {/* Pricing Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {plans.map((plan) => {
            const isPro = plan.name === "FORGE PRO";
            const isOpen = openAccordions[plan.name] || false;
            return (
              <div 
                key={plan.name}
                ref={isPro ? proCardRef : null}
                onMouseEnter={(e) => handleCardMouseEnter(e, isPro)}
                onMouseLeave={(e) => handleCardMouseLeave(e, isPro)}
                className={`relative border bg-[#111] p-8 transition-colors duration-500 group rounded-2xl ${
                  isPro 
                    ? 'border-acid scale-[1.04] z-10' 
                    : 'border-[#1e1e1e]'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-acid text-forge text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 uppercase whitespace-nowrap z-20 shadow-[0_0_20px_rgba(184,255,87,0.4)] rounded-full">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-bebas text-2xl text-white/60 tracking-wider group-hover:text-white transition-colors">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="font-bebas text-7xl text-white group-hover:text-acid transition-colors duration-500">
                      ${plan.price}
                    </span>
                    <span className="font-dm text-xl text-white/40 mb-2">/mo</span>
                  </div>
                </div>

                {/* Accordion Toggle */}
                <button 
                  onClick={() => toggleAccordion(plan.name)}
                  className="flex items-center justify-between w-full py-4 border-y border-white/5 mb-4 group/toggle"
                >
                  <span className="font-bebas text-sm tracking-widest text-white/40 group-hover/toggle:text-acid transition-colors">
                    {isOpen ? 'HIDE FEATURES' : 'VIEW FEATURES'}
                  </span>
                  <motion.span 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-acid"
                  >
                    ↓
                  </motion.span>
                </button>

                {/* Features Accordion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-4 mb-8 pt-2 pb-4">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3 group/item">
                            <span className="text-acid font-bold text-lg leading-none mt-0.5 group-hover/item:scale-110 transition-transform">✓</span>
                            <span className="font-dm text-white/60 text-sm leading-tight group-hover/item:text-white/90 transition-colors">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  className={`w-full py-4 font-dm text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 transform active:scale-95 rounded-full ${
                    isPro 
                      ? 'bg-acid text-forge hover:bg-white hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(184,255,87,0.3)]' 
                      : 'border border-white/20 text-white hover:border-acid hover:text-acid hover:bg-white/5 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)]'
                  }`}
                >
                  SELECT PLAN
                </button>
              </div>
            );
          })}
        </div>

        {/* Guarantee Section */}
        <div 
          ref={guaranteeRef}
          className="mt-24 pt-12 border-t border-white/[0.06] flex flex-wrap justify-center gap-x-12 gap-y-6"
        >
          {[
            "30-Day Money-Back Guarantee",
            "No Lock-In Contracts",
            "Results or We Refund"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-acid shadow-[0_0_8px_#b8ff57]" />
              <span className="font-dm text-xs text-white/30 uppercase tracking-widest">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
