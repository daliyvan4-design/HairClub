"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Phone } from "lucide-react";
const DEFAULT_PRESTATIONS = [
    { id: 1, nom: "Soin des Cheveux", description: "Rituels profonds pour restaurer l'éclat et la force de vos cheveux naturels.", image: "/assets/images/prestations/soin-cheveux.jpg", categorie: "SOINS" },
    { id: 2, nom: "Soin des Perruques", description: "Entretien complet et revitalisation pour préserver la beauté de vos fibres.", image: "/assets/images/prestations/soin-perruques.jpg", categorie: "ENTRETIEN" },
    { id: 3, nom: "Conception sur Mesure", description: "Création artisanale unique, adaptée à vos mesures et à votre style.", image: "/assets/images/prestations/conception.jpg", categorie: "CRÉATION" },
    { id: 4, nom: "Pose de Perruque", description: "Installation professionnelle pour un rendu naturel et une fixation parfaite.", image: "/assets/images/prestations/pose.jpg", categorie: "POSE" },
    { id: 5, nom: "Mèches Brutes", description: "Sélection de cheveux 100% naturels pour une texture et une brillance pure.", image: "/assets/images/prestations/meches-brutes.jpg", categorie: "AUTRES" },
];

export default function Prestations() {
    const [bgVideo] = useState("/assets/videos/prestations-bg.mp4");
    const [items] = useState(DEFAULT_PRESTATIONS);

    // Dynamic loading removed to prioritize performance and global consistency

    return (
        <div className="min-h-screen bg-white">
            {/* Video Header Section */}
            <div className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src={bgVideo}
                    onError={(e) => {
                        // Fallback opacity if video fails
                        (e.target as any).style.display = 'none';
                    }}
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className="relative z-10 text-center animate-premium px-6">
                    <h1 className="text-5xl md:text-8xl font-display font-medium mb-4 uppercase tracking-tighter text-white drop-shadow-lg">
                        Nos <span className="text-luxury-gold italic">Prestations</span>
                    </h1>
                    <p className="text-white/80 text-xs uppercase tracking-[0.4em] max-w-xl mx-auto font-light drop-shadow-md">
                        L'art de la distinction capillaire par Hair Club
                    </p>
                </div>
            </div>

            <div className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group relative flex flex-col bg-white border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-700"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.nom || (item as any).title}
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-active:scale-110 grayscale group-hover:grayscale-0 group-active:grayscale-0"
                                />
                                <div className="absolute top-4 left-4 size-fit bg-black/80 backdrop-blur-md px-3 py-1">
                                    <span className="text-[10px] text-luxury-gold uppercase tracking-widest font-bold">
                                        {item.categorie || (item as any).category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-10 flex flex-col flex-1">
                                <h3 className="text-2xl font-display uppercase tracking-widest mb-4 text-black">
                                    {item.nom || (item as any).title}
                                </h3>
                                <p className="text-luxury-gray text-sm leading-relaxed font-light mb-8 flex-1 italic">
                                    {item.description}
                                </p>
                                <a href="tel:+2250170434143" className="block mt-auto">
                                    <Button className="w-full bg-luxury-gold hover:bg-black text-white py-6 flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-luxury-gold/20 font-bold tracking-[0.2em] uppercase text-[10px]">
                                        <Phone size={16} />
                                        Contactez-nous
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center border-t border-black/5 pt-16">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-tighter text-black mb-8">
                        Une envie <span className="text-luxury-gold italic">particulière ?</span>
                    </h2>
                    <a href="/contact">
                        <Button variant="outline" className="px-16 py-4 text-[10px] tracking-widest uppercase border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white transition-all">
                            Demander un devis
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
