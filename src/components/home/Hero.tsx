"use client";

import { useState } from "react";
import Link from "next/link";

const videos = ["/assets/videos/hero-1.mp4", "/assets/videos/hero-2.mp4"];

export function Hero() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background — key forces re-mount on video change */}
      <video
        key={videos[current]}
        autoPlay
        muted
        playsInline
        onEnded={() => setCurrent((prev) => (prev + 1) % videos.length)}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videos[current]} type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.5em] text-luxury-gold mb-6 animate-premium">
          Bienvenue chez Hair Club
        </p>

        <h1 className="mb-6 animate-premium leading-tight">
          <span
            className="block text-5xl md:text-7xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            L&apos;Excellence
          </span>
          <span
            className="block text-5xl md:text-7xl font-bold italic text-luxury-gold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Capillaire
          </span>
        </h1>

        <p className="text-base md:text-lg text-white/80 font-light mb-10 max-w-xl mx-auto animate-premium leading-relaxed">
          Découvrez notre collection de mèches brutes et perruques de luxe.
        </p>

        <div className="flex flex-col gap-4 items-center animate-premium">
          <Link
            href="/reservation"
            className="w-full max-w-xs bg-white text-black text-sm font-bold uppercase tracking-widest py-4 text-center hover:bg-luxury-gold transition-colors duration-300"
          >
            Prendre RDV
          </Link>
          <Link
            href="/prestations"
            className="w-full max-w-xs border border-white text-white text-sm font-bold uppercase tracking-widest py-4 text-center hover:bg-white hover:text-black transition-colors duration-300"
          >
            Nos Prestations
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
        <div className="w-px h-10 bg-luxury-gold/60" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold/60">Défiler</p>
      </div>
    </section>
  );
}
