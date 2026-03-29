import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, CheckCircle2, MapPin, Clock, Phone, Mail, User, Target, Search, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    goal: '',
    source: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scarcityRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main card animation
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Scarcity line animation
      if (scarcityRef.current) {
        gsap.from(scarcityRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: scarcityRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Animate success state
    setTimeout(() => {
      gsap.from(".success-content", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
    }, 10);
  };

  const inputClasses = "w-full bg-white/[0.03] border border-white/10 text-white placeholder-white/20 px-5 py-4 rounded-2xl text-sm font-dm focus:border-acid focus:bg-white/[0.06] focus:outline-none transition-all mb-4";
  const selectClasses = "w-full bg-white/[0.03] border border-white/10 text-white px-5 py-4 rounded-2xl text-sm font-dm focus:border-acid focus:bg-white/[0.06] focus:outline-none transition-all mb-4 appearance-none cursor-pointer";

  return (
    <section 
      ref={containerRef}
      id="contact"
      className="min-h-screen bg-[#080808] py-32 px-6 relative overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-acid/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-acid/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          ref={cardRef}
          className="bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-[1fr_400px]"
        >
          {/* LEFT COLUMN: FORM */}
          <div className="p-10 lg:p-16">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-acid/10 border border-acid/20 rounded-full mb-6">
                <ShieldCheck className="w-4 h-4 text-acid" />
                <span className="font-bebas text-xs tracking-[0.2em] text-acid">RESERVE YOUR SESSION</span>
              </div>
              <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none">
                START YOUR <span className="text-acid italic">JOURNEY</span>
              </h2>
              <p ref={scarcityRef} className="font-dm text-sm text-acid/60 mt-4 flex items-center gap-2">
                We have 11 spots remaining this month. Claim yours before they're gone.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <User className="absolute left-5 top-4.5 w-4 h-4 text-white/20" />
                    <input 
                      type="text" 
                      placeholder="FULL NAME" 
                      required
                      className={`${inputClasses} pl-12 mb-0`}
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-5 top-4.5 w-4 h-4 text-white/20" />
                    <input 
                      type="email" 
                      placeholder="EMAIL ADDRESS" 
                      required
                      className={`${inputClasses} pl-12 mb-0`}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="relative mb-4">
                  <Phone className="absolute left-5 top-4.5 w-4 h-4 text-white/20" />
                  <input 
                    type="tel" 
                    placeholder="PHONE NUMBER" 
                    required
                    className={`${inputClasses} pl-12 mb-0`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="relative">
                    <Target className="absolute left-5 top-4.5 w-4 h-4 text-white/20" />
                    <select 
                      required
                      className={`${selectClasses} pl-12 mb-0`}
                      value={formData.goal}
                      onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    >
                      <option value="" disabled>PRIMARY GOAL?</option>
                      <option value="fat-loss">FAT LOSS</option>
                      <option value="muscle-gain">MUSCLE GAIN</option>
                      <option value="athletic">ATHLETIC PERFORMANCE</option>
                      <option value="general">GENERAL FITNESS</option>
                      <option value="competition">COMPETITION PREP</option>
                    </select>
                    <div className="absolute right-5 top-4.5 pointer-events-none text-white/20">↓</div>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-5 top-4.5 w-4 h-4 text-white/20" />
                    <select 
                      required
                      className={`${selectClasses} pl-12 mb-0`}
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                    >
                      <option value="" disabled>HOW'D YOU HEAR?</option>
                      <option value="instagram">INSTAGRAM</option>
                      <option value="google">GOOGLE</option>
                      <option value="referral">REFERRAL</option>
                      <option value="walked-past">WALKED PAST</option>
                      <option value="other">OTHER</option>
                    </select>
                    <div className="absolute right-5 top-4.5 pointer-events-none text-white/20">↓</div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-acid text-forge py-5 rounded-2xl font-bebas text-2xl tracking-wider hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group shadow-[0_10px_30px_rgba(184,255,87,0.2)]"
                >
                  CLAIM YOUR SPOT <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="font-dm text-[10px] text-white/20 text-center mt-6 uppercase tracking-widest">
                  🔒 Your data is encrypted and secure. No spam.
                </p>
              </form>
            ) : (
              <div className="success-content py-12 text-center lg:text-left">
                <div className="w-24 h-24 bg-acid/10 rounded-3xl flex items-center justify-center mb-8 mx-auto lg:mx-0">
                  <CheckCircle2 className="w-12 h-12 text-acid" />
                </div>
                <h3 className="font-bebas text-5xl text-white mb-4">WE'LL BE IN TOUCH</h3>
                <p className="font-dm text-white/50 text-lg max-w-md">Our head coach will reach out within 24 hours to schedule your assessment.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-10 px-8 py-3 border border-white/10 rounded-xl text-white/40 font-bebas text-lg tracking-widest hover:text-acid hover:border-acid transition-all"
                >
                  ← BACK TO FORM
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: INFO */}
          <div className="bg-[#111] p-10 lg:p-12 relative flex flex-col justify-between border-l border-white/5">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1570829460005-c840387bb1ca?auto=format&fit=crop&w=600&q=80" 
                alt="Gym Exterior" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10">
              <span className="font-bebas text-xs tracking-[.2em] text-acid mb-12 block">
                05 / FIND US
              </span>

              <div className="space-y-10">
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-4 h-4 text-acid" />
                    <p className="font-dm text-[10px] text-white/30 tracking-widest uppercase">Address</p>
                  </div>
                  <h4 className="font-bebas text-2xl text-white group-hover:text-acid transition-colors">12th floor,Rupayan Shopping Square,Sayem Sobhan Anvir Road, Bashundara R/A, , Dhaka, Bangladesh, 1229</h4>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-4 h-4 text-acid" />
                    <p className="font-dm text-[10px] text-white/30 tracking-widest uppercase">Hours</p>
                  </div>
                  <h4 className="font-bebas text-2xl text-white group-hover:text-acid transition-colors">Sat–Thur: 6:45 AM–10:45 PM<br/>Fri: 3 PM–10:45 PM</h4>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-4 h-4 text-acid" />
                    <p className="font-dm text-[10px] text-white/30 tracking-widest uppercase">Phone</p>
                  </div>
                  <h4 className="font-bebas text-2xl text-white group-hover:text-acid transition-colors">+8801738-228808</h4>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 relative z-10">
              <div className="h-48 bg-black/40 border border-white/5 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-acid/50 hover:bg-black/60 transition-all group overflow-hidden">
                <div className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700">
                  <img src="https://picsum.photos/seed/map/400/300" alt="Map" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-acid/10 rounded-full flex items-center justify-center border border-acid/20 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-acid" />
                  </div>
                  <span className="font-bebas text-xl text-white tracking-widest">OPEN IN MAPS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
