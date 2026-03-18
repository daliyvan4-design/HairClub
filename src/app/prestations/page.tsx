"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Phone } from "lucide-react";

interface Service {
    nom: string;
    prix: string;
}

const SERVICES: Service[] = [
    { nom: "Shampoing simple", prix: "10 000 F" },
    { nom: "Shampoing simple + defaire les cheveux", prix: "15 000 F" },
    { nom: "Soins de meche", prix: "15 000 F" },
    { nom: "Bain d’huile", prix: "20 000 F" },
    { nom: "Pose closure sans colle", prix: "10 000 F" },
    { nom: "Pose closure avec colle", prix: "15 000 F" },
    { nom: "Pose frontale sans colle", prix: "15 000 F" },
    { nom: "Pose frontale avec colle", prix: "20 000 F" },
    { nom: "Blanchiment, Customisation & Pose frontale", prix: "35 000 F" },
    { nom: "Blanchiment & Customisation frontale", prix: "15 000 F" },
    { nom: "Blanchiment de closure", prix: "10 000 F" },
    { nom: "Confection de frontal + Blanchiment", prix: "20 000 F" },
    { nom: "Customisation de closure + Blanchiment", prix: "15 000 F" },
    { nom: "Confection + Blanchiment + Customisation", prix: "30 000 F" },
    { nom: "Customisation", prix: "15 000 F" },
    { nom: "Boucle grossi", prix: "10 000 F" },
    { nom: "Boucle Hollywoodienne", prix: "15 000 F" },
    { nom: "Mise en forme", prix: "10 000 F" },
    { nom: "Brushing", prix: "10 000 F" },
    { nom: "Brushing + Lissage", prix: "15 000 F" },
    { nom: "Customisation à la naïja", prix: "À partir de 20 000 F" },
];

export default function Prestations() {
    const [bgVideo] = useState("/assets/videos/prestations-bg.mp4");

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Video Header Section */}
            <div className="relative h-[50vh] w-full overflow-hidden flex items-center justify-center bg-black">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.35] grayscale"
                    src={bgVideo}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 mix-blend-multiply" />

                <div className="relative z-10 text-center animate-premium px-6 mt-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-8xl font-display font-medium mb-6 uppercase tracking-tighter text-white drop-shadow-2xl">
                            Nos <span className="text-luxury-gold italic">Tarifs</span>
                        </h1>
                        <p className="text-luxury-gold text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] max-w-xl mx-auto font-bold opacity-90">
                            Prestations & L'art de la distinction
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="py-24 px-6 max-w-5xl mx-auto">
                {/* Menu Design */}
                <div className="bg-white px-8 py-16 md:p-20 shadow-2xl shadow-black/[0.03] border border-black/[0.05] relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                    <div className="text-center mb-16 relative z-10">
                        <h2 className="text-3xl font-display uppercase tracking-[0.15em] text-black mb-4">
                            Carte des <span className="text-luxury-gold italic">Services</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent w-32 mx-auto" />
                    </div>

                    <div className="space-y-6 relative z-10">
                        {SERVICES.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className="group flex items-end justify-between hover:bg-black/[0.02] p-2 -mx-2 rounded-sm transition-colors duration-300"
                            >
                                <span className="text-sm md:text-base font-medium text-black uppercase tracking-wide">
                                    {item.nom}
                                </span>
                                
                                <div className="flex-grow border-b-2 border-dotted border-black/10 mx-4 mb-[6px] group-hover:border-luxury-gold/40 transition-colors duration-300" />
                                
                                <span className="text-sm md:text-base font-bold text-luxury-gold whitespace-nowrap">
                                    {item.prix}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Contact */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-20 pt-16 border-t border-black/[0.08] text-center relative z-10"
                    >
                        <p className="text-luxury-gray text-xs uppercase tracking-widest font-light mb-8 max-w-lg mx-auto leading-relaxed">
                            Pour toute demande sur mesure ou pour réserver votre séance, notre équipe est à votre disposition.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a href="tel:+2250170434143">
                                <Button className="bg-luxury-gold hover:bg-black text-white px-10 py-6 flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-luxury-gold/20 font-bold tracking-[0.2em] uppercase text-[10px]">
                                    <Phone size={14} />
                                    Nous Contacter
                                </Button>
                            </a>
                            <a href="/reservation">
                                <Button variant="outline" className="px-10 py-6 text-[10px] tracking-[0.2em] font-bold uppercase border-black text-black hover:bg-black hover:text-white transition-all duration-500">
                                    Réserver en ligne
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
