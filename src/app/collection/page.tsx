"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface CollectionItem {
    id: number;
    title: string;
    category: string;
    image: string;
}

export default function Collection() {
    const [bgVideo, setBgVideo] = useState("");
    const [collectionItems, setCollectionItems] = useState<CollectionItem[]>([]);

    useEffect(() => {
        const savedColl = localStorage.getItem("hair_club_collection_video");
        if (savedColl) setBgVideo(savedColl);

        const savedItems = localStorage.getItem("hair_club_collection_items");
        if (savedItems) setCollectionItems(JSON.parse(savedItems));
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Video Header Section */}
            <div className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
                {bgVideo ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                        src={bgVideo}
                    />
                ) : (
                    <div className="absolute inset-0 bg-luxury-black opacity-90" />
                )}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                <div className="relative z-10 text-center animate-premium px-6">
                    <h1 className="text-5xl md:text-8xl font-display font-medium mb-4 uppercase tracking-tighter text-white drop-shadow-lg">
                        Notre <span className="text-luxury-gold italic">Collection</span>
                    </h1>
                    <p className="text-white/80 text-xs uppercase tracking-[0.4em] max-w-xl mx-auto font-light drop-shadow-md">
                        L'art de la distinction capillaire par Hair Club
                    </p>
                </div>
            </div>

            <div className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {collectionItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group relative overflow-hidden aspect-[3/4] bg-luxury-secondary shadow-sm hover:shadow-xl transition-shadow duration-500"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                                <div className="absolute inset-0 border-[1px] border-luxury-gold m-6 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                                <p className="text-luxury-gold text-xs uppercase tracking-[0.2em] mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-bold">
                                    {item.category}
                                </p>
                                <h3 className="text-2xl font-display font-medium uppercase tracking-wide text-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {item.title}
                                </h3>
                                <div className="mt-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                    <Button variant="outline" className="text-[10px] px-6 py-2">Détails</Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {collectionItems.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-luxury-gray italic">La collection est en cours de mise à jour...</p>
                    </div>
                )}

                <div className="mt-24 text-center">
                    <Button variant="outline" className="px-16 py-4 text-xs tracking-widest uppercase">Découvrir plus</Button>
                </div>
            </div>
        </div>
    );
}
