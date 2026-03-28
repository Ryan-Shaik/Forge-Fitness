import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#instagram' },
    { name: 'Facebook', icon: Facebook, href: '#facebook' },
    { name: 'Twitter', icon: Twitter, href: '#twitter' },
  ];

  return (
    <footer className="bg-[#050505] border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center flex-wrap gap-8">
        
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-6">
          <span className="font-bebas text-3xl text-acid tracking-wider">
            FORGE
          </span>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <p className="font-dm text-[10px] md:text-xs text-white/25 uppercase tracking-widest">
            © 2025 FORGE Performance. All rights reserved.
          </p>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-8">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.href}
              className="flex items-center gap-2 font-dm text-[10px] md:text-xs text-white/30 hover:text-acid tracking-[.2em] uppercase transition-colors group"
            >
              <social.icon size={14} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">{social.name}</span>
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
