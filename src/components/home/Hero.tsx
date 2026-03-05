"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const slides = [
    {
        type: "video",
        url: "/assets/videos/hero-1.mp4",
        title: "L'Excellence Capillaire",
        subtitle: "Découvrez notre collection de mèches brutes et perruques de luxe.",
    },
    {
        type: "video",
        url: "/assets/videos/hero-2.mp4",
        title: "Beauté & Distinction",
        subtitle: "Une confection artisanale pour une allure unique.",
    }
];

export function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        key={slides[current].url}
                        className="h-full w-full object-cover"
                        src={slides[current].url}
                    />
                    <div className="absolute inset-0 bg-black/40" />
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
                        {slides[current].title.split(" ").map((word, i) => (
                            <span key={i} className={i % 2 !== 0 ? "text-luxury-gold" : ""}>
                                {word}{" "}
                            </span>
                        ))}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        {slides[current].subtitle}
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
                {slides.map((_, i) => (
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
