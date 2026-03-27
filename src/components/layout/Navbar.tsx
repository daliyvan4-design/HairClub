"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/prestations", label: "Prestations" },
  { href: "/contact", label: "Contact" },
  { href: "/reservation", label: "Réserver" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-luxury-gold/10">
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
              className="text-xs uppercase tracking-widest text-luxury-gray hover:text-luxury-gold transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-luxury-gray" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-white border-t border-luxury-gold/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-widest text-luxury-gray hover:text-luxury-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
