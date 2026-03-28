import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const athleteRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      gsap.from([line1Ref.current, line2Ref.current], {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.4,
        ease: "expo.out"
      });

      gsap.from(athleteRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.6,
        ease: "expo.out",
        delay: 0.3
      });

      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.8
      });

      // Parallax on athlete
      gsap.to(athleteRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // Stats Counter Animation
      statsRefs.current.forEach((el) => {
        if (!el) return;
        const targetValue = parseInt(el.getAttribute('data-target') || '0');
        gsap.fromTo(el, 
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 847, suffix: '+', label: 'Members' },
    { value: 12, suffix: '', label: 'Coaches' },
    { value: 6, suffix: 'AM', label: 'Open' },
  ];

  return (
    <section 
      ref={containerRef}
      id="home"
      className="relative h-[100dvh] w-full bg-forge overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Layer 0: Background Layer - Technical Grid + Halo */}
      <div className="absolute inset-0 z-[0] bg-black" />
      
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 z-[1] opacity-[0.1] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Halo Effect: CSS radial-gradient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-[2] pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(184, 255, 87, 0.15) 0%, transparent 70%)' 
        }}
      />

      {/* Subtle White Curved Vector Line */}
      <div className="absolute top-1/2 left-0 w-full h-[300px] z-[15] pointer-events-none opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1440 300" fill="none" preserveAspectRatio="none">
          <path d="M-50 150C200 250 500 50 720 150C940 250 1240 50 1490 150" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Headline Container - Sandwich Layering */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* Middle Layer 1: Train with (Behind Athlete) */}
          <div 
            ref={line1Ref}
            className="w-full flex justify-center gap-[12vw] sm:gap-[10vw] md:gap-[8vw] z-[30] relative font-dm font-black text-[clamp(2rem,12vw,8.5rem)] leading-[0.9] tracking-tighter"
            style={{ textShadow: '0 10px 60px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.5)' }}
          >
            <span className="text-acid">Train</span>
            <span className="text-white">with</span>
          </div>

          {/* Top Layer: the best. (In Front of Athlete) */}
          <div 
            ref={line2Ref}
            className="w-full flex justify-center gap-[15vw] sm:gap-[12vw] md:gap-[10vw] z-[30] relative font-dm font-black text-[clamp(2rem,12vw,8.5rem)] leading-[0.9] tracking-tighter mt-[-2vw]"
            style={{ textShadow: '0 10px 60px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.5)' }}
          >
            <span className="text-white">the</span>
            <span className="text-acid">best.</span>
          </div>
        </div>
      </div>

      {/* Subject Layer: Shirtless Male Athlete */}
      <img
        ref={athleteRef}
        src="/images/shirtless-male-bodybuilder-holding-dumbbells2.png"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[65%] sm:h-[75%] md:h-[85%] w-auto object-contain z-[20] select-none pointer-events-none opacity-90"
        alt="FORGE Elite Athlete"
        referrerPolicy="no-referrer"
      />

      {/* Layer 4: CTA Row - Rounded buttons and solid backgrounds */}
      <div 
        ref={ctaRef}
        className="absolute bottom-24 md:bottom-32 left-0 right-0 z-[40] flex flex-col md:flex-row items-center justify-center gap-6"
      >
        <button className="bg-acid text-forge font-bebas text-2xl px-12 py-4 tracking-wider rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-2xl shadow-acid/20">
          CLAIM YOUR SPOT
        </button>
        <button className="bg-white/10 backdrop-blur-md text-white font-dm text-sm px-10 py-5 tracking-widest uppercase rounded-full hover:bg-white/20 transition-all transform hover:scale-105 shadow-2xl">
          WATCH THE TOUR ↓
        </button>
      </div>

      {/* Layer 4: Stats Row */}
      <div className="absolute bottom-0 left-0 right-0 z-[40] bg-forge/60 backdrop-blur-md border-t border-white/[0.06] py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="flex items-baseline">
                <span 
                  ref={el => statsRefs.current[idx] = el}
                  data-target={stat.value}
                  className="font-bebas text-4xl md:text-5xl text-acid"
                >
                  0
                </span>
                <span className="font-bebas text-2xl md:text-3xl text-acid ml-0.5">{stat.suffix}</span>
              </div>
              <span className="font-dm text-[10px] md:text-xs text-white/30 tracking-[0.2em] uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
