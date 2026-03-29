import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, Venus, CalendarDays } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scheduleData = [
    {
      title: "COMBINED SESSIONS",
      time: "06:45 AM — 10:45 PM",
      days: "SATURDAY — THURSDAY",
      icon: Users,
      desc: "Open floor training for all members. High-intensity environment.",
      accent: false
    },
    {
      title: "FEMALE ONLY HOURS",
      time: "12:00 PM — 03:00 PM",
      days: "SATURDAY — THURSDAY",
      icon: Venus,
      desc: "Dedicated private hours for our female athletes.",
      accent: true
    },
    {
      title: "FRIDAY OPEN SESSION",
      time: "03:00 PM — 10:45 PM",
      days: "FRIDAY ONLY",
      icon: CalendarDays,
      desc: "End the week strong. Full facility access for all members.",
      accent: false
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="schedule"
      className="bg-forge py-32 px-6 relative overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div>

            <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none">
              TRAINING <span className="text-acid italic">SCHEDULE</span>
            </h2>
          </div>
          <p className="font-dm text-white/40 text-sm max-w-xs uppercase tracking-widest leading-relaxed">
            Precision timing for peak performance. Plan your assault on mediocrity.
          </p>
        </div>
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {scheduleData.map((item, idx) => (
            <div 
              key={idx}
              className={`group relative p-10 rounded-[2rem] border transition-all duration-500 ${
                item.accent 
                ? 'bg-acid border-acid shadow-[0_20px_50px_rgba(184,255,87,0.15)]' 
                : 'bg-[#111] border-white/5 hover:border-acid/30'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                item.accent ? 'bg-forge text-acid' : 'bg-acid/10 text-acid'
              }`}>
                <item.icon size={28} />
              </div>

              <h3 className={`font-bebas text-3xl mb-2 tracking-wide ${
                item.accent ? 'text-forge' : 'text-white'
              }`}>
                {item.title}
              </h3>

              <div className="space-y-1 mb-8">
                <div className="flex items-center gap-2">
                  <Clock size={14} className={item.accent ? 'text-forge/60' : 'text-acid'} />
                  <p className={`font-bebas text-xl ${item.accent ? 'text-forge' : 'text-white/80'}`}>
                    {item.time}
                  </p>
                </div>
                <p className={`font-dm text-[10px] uppercase tracking-[0.2em] font-bold ${
                  item.accent ? 'text-forge/40' : 'text-white/30'
                }`}>
                  {item.days}
                </p>
              </div>

              <p className={`font-dm text-sm leading-relaxed ${
                item.accent ? 'text-forge/70' : 'text-white/40'
              }`}>
                {item.desc}
              </p>

              {/* Decorative Corner Element */}
              <div className={`absolute top-6 right-6 font-bebas text-4xl opacity-[0.05] select-none ${
                item.accent ? 'text-forge' : 'text-white'
              }`}>
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-center gap-4">
          <div className="w-2 h-2 rounded-full bg-acid animate-pulse" />
          <p className="font-dm text-[10px] text-white/20 uppercase tracking-[0.3em]">
            Facility remains closed on public holidays unless specified otherwise
          </p>
        </div>
      </div>
    </section>
  );
}
