"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMedia } from "@/lib/media-db";

const slides = [
    {
        type: "video",
        url: "https://cdn.pixabay.com/vimeo/328494056/hair-22920.mp4?width=1280",
        title: "L'Excellence Capillaire",
        subtitle: "Découvrez notre collection de mèches brutes et perruques de luxe.",
    },
    {
        type: "image",
        url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=1920",
        title: "Sur-Mesure & Distinction",
        subtitle: "Une confection artisanale pour une allure unique.",
    }
];

export function Hero() {
    const [current, setCurrent] = useState(0);
    const [activeSlides, setActiveSlides] = useState(slides);

    useEffect(() => {
        const loadHeroContent = async () => {
            const savedHero = localStorage.getItem("hair_club_hero_videos");
            if (savedHero) {
                const urls = JSON.parse(savedHero);

                // Rehydrate from IndexedDB
                const hydratedHero = await Promise.all(urls.map(async (url: string, idx: number) => {
                    const blob = await getMedia(`hero_${idx}`);
                    const finalUrl = blob ? URL.createObjectURL(blob) : url;

                    return {
                        type: "video",
                        url: finalUrl,
                        title: idx === 0 ? "L'Excellence Capillaire" : "Beauté & Distinction",
                        subtitle: idx === 0 ? "Collection de mèches brutes et perruques de luxe." : "L'art de la confection artisanale."
                    };
                }));

                if (hydratedHero.length > 0) setActiveSlides(hydratedHero as any);
            }
        };
        loadHeroContent();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % activeSlides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [activeSlides]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <AnimatePresence>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {activeSlides[current].type === "video" ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            key={activeSlides[current].url}
                            className="h-full w-full object-cover"
                            src={activeSlides[current].url}
                        />
                    ) : (
                        <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${activeSlides[current].url})` }}
                        />
                    )}

                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="max-w-4xl"
                >
                    <span className="text-white uppercase tracking-[0.4em] text-xs mb-4 block animate-premium drop-shadow-md">
                        Bienvenue chez Hair Club
                    </span>
                    <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tighter leading-none text-white drop-shadow-lg">
                        {activeSlides[current].title.split(" ").map((word, i) => (
                            <span key={i} className={i % 2 !== 0 ? "text-luxury-gold" : ""}>
                                {word}{" "}
                            </span>
                        ))}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        {activeSlides[current].subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/reservation">
                            <Button className="px-10 py-4 text-base bg-white text-black hover:bg-luxury-gold hover:text-white border-none shadow-xl transition-all">
                                Prendre RDV
                            </Button>
                        </Link>
                        <Link href="/prestations">
                            <Button variant="outline" className="px-10 py-4 text-base border-white text-white hover:bg-white hover:text-black">
                                Nos Prestations
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                {activeSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={cn(
                            "h-1 transition-all duration-500",
                            current === i ? "w-12 bg-luxury-gold" : "w-6 bg-white/40"
                        )}
                    />
                ))}
            </div>
        </section>
    );
}
