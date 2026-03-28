import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in content when section is in view
      gsap.from(contentRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });

      // Subtle parallax on the video
      gsap.to(videoRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="about"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/images/websitevideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-60"
        />
        
        {/* Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-black/90 z-10" />
      </div>

      {/* Content Overlay */}
      <div 
        ref={contentRef}
        className="relative z-20 max-w-7xl mx-auto px-6 text-center"
      >
        <span className="font-bebas text-acid text-xl tracking-[0.4em] mb-6 block">
          OUR PHILOSOPHY
        </span>
        <h2 className="font-bebas text-[clamp(3rem,10vw,8rem)] text-white leading-[0.9] mb-8">
          WHERE <span className="text-acid">STRENGTH</span> <br />
          MEETS <span className="italic">SCIENCE</span>
        </h2>
        
        <div className="max-w-2xl mx-auto space-y-6 font-dm text-white/70 text-lg md:text-xl leading-relaxed">
          <p>
            FORGE isn't a playground—it's a laboratory for human potential. We stripped away the neon lights, the mirrors, and the vanity to leave only what matters: the work.
          </p>
          <p className="hidden md:block">
            Our methodology is rooted in the relentless pursuit of progress. Whether you're an elite athlete or a dedicated beginner, the standard remains the same—absolute effort.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="mt-12 flex flex-wrap justify-center gap-12 opacity-50">
          <div className="text-center">
            <p className="font-bebas text-4xl text-white">25K</p>
            <p className="font-dm text-[10px] uppercase tracking-widest text-white/60">SQ FT FACILITY</p>
          </div>
          <div className="text-center">
            <p className="font-bebas text-4xl text-white">50+</p>
            <p className="font-dm text-[10px] uppercase tracking-widest text-white/60">ELITE COACHES</p>
          </div>
          <div className="text-center">
            <p className="font-bebas text-4xl text-white">24/7</p>
            <p className="font-dm text-[10px] uppercase tracking-widest text-white/60">ACCESS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
