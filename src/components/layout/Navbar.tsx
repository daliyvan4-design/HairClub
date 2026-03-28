"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/prestations", label: "Prestations" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-luxury-gold/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logohair.png"
            alt="Hair Club"
            width={120}
            height={48}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs uppercase tracking-widest transition-colors duration-300 hover:text-luxury-gold ${
                scrolled ? "text-luxury-gray" : "text-white/90"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/reservation"
            className="text-xs uppercase tracking-widest bg-luxury-gold text-black font-bold px-5 py-2 border border-luxury-gold hover:bg-transparent hover:text-luxury-gold transition-all duration-300 active:scale-95"
          >
            Réserver
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? "text-luxury-gray" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-black/95 backdrop-blur-md border-t border-luxury-gold/20 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-widest text-white/80 hover:text-luxury-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/reservation"
            onClick={() => setOpen(false)}
            className="text-xs uppercase tracking-widest bg-luxury-gold text-black font-bold px-5 py-3 text-center border border-luxury-gold hover:bg-transparent hover:text-luxury-gold transition-all duration-300"
          >
            Réserver
          </Link>
        </nav>
      )}
    </header>
  );
}
