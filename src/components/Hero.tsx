// import { useLayoutEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export default function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const line1Ref = useRef<HTMLSpanElement>(null);
//   const line2Ref = useRef<HTMLSpanElement>(null);
//   const athleteRef = useRef<HTMLImageElement>(null);
//   const ctaRef = useRef<HTMLDivElement>(null);
//   const statsRefs = useRef<(HTMLSpanElement | null)[]>([]);

//   useLayoutEffect(() => {
//     if (typeof window === "undefined") return;

//     const ctx = gsap.context(() => {

//       // ✅ GSAP controls centering (no Tailwind transform conflict)
//       gsap.set(athleteRef.current, {
//         xPercent: -50,
//         yPercent: -50,
//         transformOrigin: "center center"
//       });

//       // 🔥 Master timeline
//       const tl = gsap.timeline();

//       // Headline animation
//       tl.from([line1Ref.current, line2Ref.current], {
//         y: 100,
//         opacity: 0,
//         stagger: 0.15,
//         duration: 1.2,
//         ease: "expo.out"
//       })

//       // Curve line animation (synced)
//       .fromTo(
//         ".curve-line",
//         { opacity: 0, y: 40 },
//         { opacity: 0.2, y: 0, duration: 1.2, ease: "power2.out" },
//         "-=1"
//       )

//       // Athlete animation
//       .from(athleteRef.current, {
//         y: 80,
//         opacity: 0,
//         duration: 1.4,
//         ease: "expo.out"
//       }, "-=0.8")

//       // CTA animation
//       .from(ctaRef.current, {
//         y: 30,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power2.out"
//       }, "-=0.6");

//       // 🚀 Parallax
//       gsap.to(athleteRef.current, {
//         yPercent: 10,
//         ease: "none",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: 1.2
//         }
//       });

//       // 🔢 Stats counter
//       statsRefs.current.forEach((el) => {
//         if (!el) return;

//         const targetValue = parseInt(el.dataset.target || '0');

//         gsap.fromTo(el,
//           { innerText: 0 },
//           {
//             innerText: targetValue,
//             duration: 1.8,
//             snap: { innerText: 1 },
//             ease: "power1.out",
//             scrollTrigger: {
//               trigger: el,
//               start: "top 90%",
//               once: true
//             }
//           }
//         );
//       });

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   const stats = [
//     { value: 847, suffix: '+', label: 'Members' },
//     { value: 12, suffix: '', label: 'Coaches' },
//     { value: 6, suffix: 'AM', label: 'Open' },
//   ];

//   return (
//     <section
//       ref={containerRef}
//       className="relative h-[100dvh] w-full bg-black overflow-hidden flex items-center justify-center"
//     >

//       {/* Background */}
//       <div className="absolute inset-0 bg-black z-0" />

//       {/* Halo */}
//       <div
//         className="absolute inset-0 z-[2] pointer-events-none"
//         style={{
//           background: 'radial-gradient(circle at center, rgba(184, 255, 87, 0.15) 0%, transparent 70%)'
//         }}
//       />

//       {/* Curve Line */}
//       <div className="absolute top-1/2 left-0 w-full h-[300px] z-[15] pointer-events-none opacity-20 curve-line">
//         <svg
//           width="100%"
//           height="100%"
//           viewBox="0 0 1440 300"
//           fill="none"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M-50 150C200 250 500 50 720 150C940 250 1240 50 1490 150"
//             stroke="white"
//             strokeWidth="1.5"
//           />
//         </svg>
//       </div>

//       {/* Headline */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 text-center">
//         <div
//           ref={line1Ref}
//           className="font-black text-[clamp(2rem,12vw,8.5rem)] tracking-tight"
//         >
//           <span className="text-lime-400">Train</span>{' '}
//           <span className="text-white">with</span>
//         </div>

//         <div
//           ref={line2Ref}
//           className="font-black text-[clamp(2rem,12vw,8.5rem)] tracking-tight -mt-4"
//         >
//           <span className="text-white">the</span>{' '}
//           <span className="text-lime-400">best.</span>
//         </div>
//       </div>

//       {/* Athlete */}
//       <img
//         ref={athleteRef}
//         src="/images/shirtless-male-bodybuilder-holding-dumbbells2.png"
//         alt="Elite athlete lifting dumbbells"
//         className="absolute top-1/2 left-1/2 h-[75%] object-contain z-20 pointer-events-none select-none"
//       />

//       {/* CTA */}
//       <div
//         ref={ctaRef}
//         className="absolute bottom-28 flex gap-6 z-40"
//       >
//         <button className="bg-lime-400 text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition">
//           CLAIM YOUR SPOT
//         </button>
//         <button className="bg-white/10 text-white px-10 py-4 rounded-full backdrop-blur hover:bg-white/20 transition">
//           WATCH THE TOUR ↓
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur border-t border-white/10 py-6 z-40">
//         <div className="flex justify-around max-w-5xl mx-auto">
//           {stats.map((stat, idx) => (
//             <div key={idx} className="text-center">
//               <div className="flex justify-center items-baseline">
//                 <span
//                   ref={el => statsRefs.current[idx] = el}
//                   data-target={stat.value}
//                   className="text-lime-400 text-4xl font-bold"
//                 >
//                   0
//                 </span>
//                 <span className="text-lime-400 ml-1">{stat.suffix}</span>
//               </div>
//               <p className="text-white/40 text-xs tracking-widest mt-1">
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//     </section>
//   );
// }

import { useLayoutEffect, useRef } from 'react';
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

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {

      // ✅ Center athlete via GSAP (no transform conflict)
      gsap.set(athleteRef.current, {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "center center"
      });

      // ✅ Halo setup + pulse
      gsap.set(".halo-glow", {
        transformOrigin: "center center"
      });

      gsap.to(".halo-glow", {
        scale: 1.1,
        opacity: 0.8,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // 🔥 Master timeline
      const tl = gsap.timeline();

      // Headline
      tl.from([line1Ref.current, line2Ref.current], {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out"
      })

      // Curve fade
      .fromTo(
        ".curve-line",
        { opacity: 0, y: 40 },
        { opacity: 0.2, y: 0, duration: 1.2, ease: "power2.out" },
        "-=1"
      )

      // 🔥 SVG draw animation
      .fromTo(
        ".curve-path",
        {
          strokeDasharray: 2000,
          strokeDashoffset: 2000
        },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out"
        },
        "-=1"
      )

      // Athlete
      .from(athleteRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out"
      }, "-=0.8")

      // CTA
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // 🚀 Parallax
      gsap.to(athleteRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });

      // 🔢 Stats
      statsRefs.current.forEach((el) => {
        if (!el) return;

        const targetValue = parseInt(el.dataset.target || '0');

        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 1.8,
            snap: { innerText: 1 },
            ease: "power1.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true
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
      className="relative h-[100dvh] w-full bg-black overflow-hidden flex items-center justify-center"
    >

      {/* Background */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* 🔥 Halo Glow */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none halo-glow"
        style={{
          background: 'radial-gradient(circle at center, rgba(184, 255, 87, 0.15) 0%, transparent 70%)'
        }}
      />

      {/* 🔥 Curve Line */}
      <div className="absolute top-1/2 left-0 w-full h-[300px] z-[15] pointer-events-none opacity-20 curve-line">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 300"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            className="curve-path"
            d="M-50 150C200 250 500 50 720 150C940 250 1240 50 1490 150"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Headline */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 text-center">
        <div
          ref={line1Ref}
          className="font-black text-[clamp(2rem,12vw,8.5rem)] tracking-tight"
        >
          <span className="text-lime-400">Train</span>{' '}
          <span className="text-white">with</span>
        </div>

        <div
          ref={line2Ref}
          className="font-black text-[clamp(2rem,12vw,8.5rem)] tracking-tight -mt-4"
        >
          <span className="text-white">the</span>{' '}
          <span className="text-lime-400">best.</span>
        </div>
      </div>

      {/* Athlete */}
      <img
        ref={athleteRef}
        src="/images/shirtless-male-bodybuilder-holding-dumbbells2.png"
        alt="Elite athlete lifting dumbbells"
        className="absolute top-1/2 left-1/2 h-[75%] object-contain z-20 pointer-events-none select-none"
      />

      {/* CTA */}
      <div
        ref={ctaRef}
        className="absolute bottom-28 flex gap-6 z-40"
      >
        <button className="bg-lime-400 text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition">
          CLAIM YOUR SPOT
        </button>
        <button className="bg-white/10 text-white px-10 py-4 rounded-full backdrop-blur hover:bg-white/20 transition">
          WATCH THE TOUR ↓
        </button>
      </div>

      {/* Stats */}
      <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur border-t border-white/10 py-6 z-40">
        <div className="flex justify-around max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="flex justify-center items-baseline">
                <span
                  ref={el => statsRefs.current[idx] = el}
                  data-target={stat.value}
                  className="text-lime-400 text-4xl font-bold"
                >
                  0
                </span>
                <span className="text-lime-400 ml-1">{stat.suffix}</span>
              </div>
              <p className="text-white/40 text-xs tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}