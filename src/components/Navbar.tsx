import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Training', href: '#training' },
    { name: 'About', href: '#about' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[50] transition-all duration-300 ${
        isScrolled ? 'bg-forge/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <HashLink smooth to="/#home" className="font-bebas text-3xl text-acid tracking-wider">
          FORGE
        </HashLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <HashLink 
              key={link.name}
              smooth
              to={`/${link.href}`}
              className="font-dm text-sm tracking-[0.2em] uppercase text-white/50 hover:text-acid transition-colors"
            >
              {link.name}
            </HashLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <HashLink smooth to="/#contact">
            <button className="bg-acid text-forge font-bold px-8 py-2.5 text-sm tracking-widest rounded-full hover:bg-white transition-colors shadow-lg shadow-acid/10">
              START TODAY
            </button>
          </HashLink>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-forge z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <button 
          className="absolute top-6 right-6 text-white p-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={32} />
        </button>
        
        {navLinks.map((link) => (
          <HashLink 
            key={link.name}
            smooth
            to={`/${link.href}`}
            className="font-bebas text-5xl text-white hover:text-acid transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </HashLink>
        ))}
        
        <HashLink smooth to="/#contact" onClick={() => setIsMenuOpen(false)}>
          <button className="mt-4 bg-acid text-forge font-bold px-12 py-4 text-xl tracking-widest rounded-full">
            START TODAY
          </button>
        </HashLink>
      </div>
    </nav>
  );
}
