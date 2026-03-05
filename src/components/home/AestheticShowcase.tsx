"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const DEFAULT_SHOWCASE = [
    {
        id: 1,
        title: "Mèches Premium",
        subtitle: "Sélection Rare",
        image: "/assets/images/showcase/frame-1.jpg",
    },
    {
        id: 2,
        title: "L'Art du Sur-Mesure",
        subtitle: "Confection Elite",
        image: "/assets/images/showcase/frame-2.jpg",
    },
    {
        id: 3,
        title: "Éclat & Pureté",
        subtitle: "Qualité Irréprochable",
        image: "/assets/images/showcase/frame-3.jpg",
    },
];

export function AestheticShowcase() {
    const [items] = useState(DEFAULT_SHOWCASE);

    // Dynamic loading removed to prioritize global performance

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            className="group relative aspect-[3/4] overflow-hidden bg-luxury-secondary rounded-sm shadow-xl"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-luxury-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                    {item.subtitle}
                                </span>
                                <h3 className="text-white text-2xl font-display uppercase tracking-widest">
                                    {item.title}
                                </h3>
                            </div>
                            <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/30 transition-all duration-700 m-4 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
