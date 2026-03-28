import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryItems } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !pinRef.current) return;

      const horizontalTween = gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 48),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + trackRef.current!.scrollWidth,
          invalidateOnRefresh: true,
        }
      });

      // Animate each card as it enters the viewport during horizontal scroll
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        
        const isAccent = galleryItems[idx]?.accent;

        gsap.from(card, {
          scale: 0.92,
          opacity: 0,
          rotation: isAccent ? -1 : 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 85%",
            toggleActions: "play none none reverse",
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="training" className="overflow-hidden bg-forge">
      {/* Heading Block */}
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="font-bebas text-[clamp(2.5rem,6vw,6rem)] text-white leading-none">
          INSIDE THE <span className="text-acid">FORGE</span>
        </h2>
        <p className="font-dm text-white/40 mt-4 max-w-md uppercase tracking-widest text-sm">
          A 25,000 sq ft high-performance ecosystem designed for those who demand more from their training.
        </p>
      </div>

      {/* Pin Container */}
      <div ref={pinRef} className="h-screen flex items-center">
        {/* Horizontal Track */}
        <div ref={trackRef} className="flex gap-8 px-6 md:px-12 pb-12 w-fit">
          {galleryItems.map((item, idx) => (
            <div 
              key={item.id}
              ref={el => cardRefs.current[idx] = el}
              className={`w-[320px] md:w-[420px] h-[480px] md:h-[580px] flex-shrink-0 relative overflow-hidden rounded-[2.5rem] group shadow-2xl ${item.accent ? 'bg-acid' : 'bg-[#111]'}`}
            >
              {/* Full-cover image */}
              <img 
                src={item.img} 
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Bottom-up Gradient for text legibility */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ 
                  background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.4) 30%, transparent 60%)' 
                }} 
              />

              {/* Ghost Number */}
              <div className="absolute top-6 right-8 font-bebas text-[10rem] leading-none opacity-[0.08] text-white select-none z-20">
                {item.id}
              </div>

              {/* Content */}
              <div className="absolute bottom-10 left-10 z-30">
                <h3 
                  className={`font-bebas text-4xl leading-none ${item.accent ? 'text-acid' : 'text-white'}`}
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
                >
                  {item.label}
                </h3>
                <p 
                  className={`font-dm text-xs mt-3 uppercase tracking-[0.2em] ${item.accent ? 'text-white/80' : 'text-white/50'}`}
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                >
                  {item.sub}
                </p>
              </div>
            </div>
          ))}

          {/* Last Item: CTA Card */}
          <div className="w-[320px] md:w-[420px] h-[480px] md:h-[580px] flex-shrink-0 relative overflow-hidden rounded-[2.5rem] bg-[#0c0c0c] border border-white/5 flex flex-col items-center justify-center gap-10 p-10 text-center group hover:border-acid/50 transition-all duration-500 shadow-2xl">
            <div className="space-y-4">
              <h3 className="font-bebas text-6xl text-white leading-none">
                READY TO <span className="text-acid italic">TRAIN?</span>
              </h3>
              <p className="font-dm text-white/40 text-xs uppercase tracking-[0.2em] max-w-[200px] mx-auto leading-relaxed">
                The elite 1% is waiting. Your transformation starts now.
              </p>
            </div>
            <button className="bg-acid text-forge font-bebas text-2xl px-12 py-5 tracking-wider rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(184,255,87,0.2)]">
              JOIN THE FORGE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
