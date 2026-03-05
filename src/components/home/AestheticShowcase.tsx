"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getMedia } from "@/lib/media-db";

const DEFAULT_SHOWCASE = [
    {
        id: 1,
        title: "Mèches Premium",
        subtitle: "Sélection Rare",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "L'Art du Sur-Mesure",
        subtitle: "Confection Elite",
        image: "https://images.unsplash.com/photo-1522337360788-8b13df772ce5?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Éclat & Pureté",
        subtitle: "Qualité Ultime",
        image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800",
    },
];

export function AestheticShowcase() {
    const [items, setItems] = useState(DEFAULT_SHOWCASE);

    useEffect(() => {
        const loadShowcase = async () => {
            const saved = localStorage.getItem("hair_club_showcase");
            if (saved) {
                const parsed = JSON.parse(saved);
                const hydrated = await Promise.all(
                    parsed.map(async (item: any) => {
                        const blob = await getMedia(`showcase_${item.id}`);
                        return blob ? { ...item, image: URL.createObjectURL(blob) } : item;
                    })
                );
                setItems(hydrated);
            }
        };
        loadShowcase();
    }, []);

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
