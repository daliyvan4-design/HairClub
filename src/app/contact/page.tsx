"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Contact() {
    return (
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20 animate-premium">
                <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 uppercase tracking-tighter">
                    Contact & <span className="text-luxury-gold italic">Infos</span>
                </h1>
                <p className="text-luxury-gray text-sm uppercase tracking-widest max-w-xl mx-auto font-light">
                    Nous sommes à votre écoute pour toute demande personnalisée.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-display uppercase tracking-widest border-b border-luxury-gold/20 pb-4">Nos Coordonnées</h2>

                        <div className="flex items-start gap-6 group">
                            <div className="p-3 bg-luxury-secondary text-luxury-gold border border-black/5 transition-colors group-hover:border-luxury-gold/30">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-luxury-gray mb-1">Téléphone</p>
                                <a href="tel:+1234567890" className="text-xl font-light hover:text-luxury-gold transition-colors">+1 (234) 567-890</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="p-3 bg-luxury-secondary text-luxury-gold border border-black/5 transition-colors group-hover:border-luxury-gold/30">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-luxury-gray mb-1">Email</p>
                                <a href="mailto:contact@hairclub.luxury" className="text-xl font-light hover:text-luxury-gold transition-colors">contact@hairclub.luxury</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="p-3 bg-luxury-secondary text-luxury-gold border border-black/5 transition-colors group-hover:border-luxury-gold/30">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-luxury-gray mb-1">Boutique & Salon</p>
                                <address className="not-italic text-xl font-light leading-relaxed">
                                    Quartier de la Mode, Rue de la Distinction
                                </address>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-display uppercase tracking-widest border-b border-luxury-gold/20 pb-4">Suivez-nous</h2>
                        <div className="flex gap-4">
                            <a href="#" className="p-4 bg-luxury-secondary text-luxury-gold border border-black/5 hover:border-luxury-gold transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-4 bg-luxury-secondary text-luxury-gold border border-black/5 hover:border-luxury-gold transition-all">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="relative aspect-square md:aspect-auto bg-luxury-secondary border border-black/10 overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale opacity-40 transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="text-center p-8 bg-white/90 backdrop-blur-sm border border-luxury-gold/20 max-w-xs animate-premium">
                            <p className="text-xs uppercase tracking-[0.3em] text-luxury-gold mb-2">Visitez-nous</p>
                            <p className="text-sm font-light text-black/70 italic leading-relaxed">
                                "Une immersion dans l'univers de la distinction capillaire."
                            </p>
                            <div className="mt-6">
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Hair+Club+Luxury+Boutique"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="outline" className="text-[10px] px-6 py-2">Ouvrir Maps</Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
