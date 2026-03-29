import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import gsap from 'gsap';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isMenuOpen]);

  // GSAP Animation
  useEffect(() => {
    const menu = menuRef.current;
    const links = linksRef.current;

    if (!menu) return;

    const tl = gsap.timeline({ paused: true });

    tl.set(menu, { display: 'flex' })
      .fromTo(
        menu,
        { y: '-100%' },
        { y: '0%', duration: 0.6, ease: 'power4.out' }
      )
      .fromTo(
        links,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.3'
      );

    if (isMenuOpen) {
      tl.play();
    } else {
      gsap.to(menu, {
        y: '-100%',
        duration: 0.5,
        ease: 'power4.in',
        onComplete: () => {
          gsap.set(menu, { display: 'none' });
        },
      });
    }
  }, [isMenuOpen]);

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
        <img src="/images/forge_fitness_logo.jpg" alt="Forge Fitness Logo" className="h-full w-20 rounded-full" />
        <HashLink
          smooth
          to="/#home"
          className="font-bebas text-3xl text-acid tracking-wider"
        >
          FORGE FITNESS
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
          className="md:hidden text-white p-2 z-[70]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* GSAP Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-screen h-screen bg-forge z-[60] hidden flex-col items-center justify-center gap-8 md:hidden"
      >
        {navLinks.map((link, i) => (
          <HashLink
            key={link.name}
            smooth
            to={`/${link.href}`}
            ref={(el) => (linksRef.current[i] = el!)}
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