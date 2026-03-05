"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export default function Reservation() {
    const [formData, setFormData] = useState({
        nom: "",
        telephone: "",
        date: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate booking storage
        const bookings = JSON.parse(localStorage.getItem("hair_club_bookings") || "[]");
        bookings.push({ ...formData, id: Date.now(), status: "En attente" });
        localStorage.setItem("hair_club_bookings", JSON.stringify(bookings));

        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="pt-32 pb-24 px-6 flex flex-col items-center justify-center min-h-[70vh] text-center bg-white">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8 text-luxury-gold"
                >
                    <CheckCircle2 size={80} strokeWidth={1} />
                </motion.div>
                <h1 className="text-4xl font-display font-medium mb-6 uppercase text-black">Merci, {formData.nom} !</h1>
                <p className="text-luxury-gray max-w-md mx-auto mb-10">
                    Votre demande de rendez-vous pour le <span className="text-luxury-gold font-medium">{formData.date}</span> a été enregistrée. Notre équipe vous contactera par téléphone pour confirmer.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>Prendre un autre RDV</Button>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto bg-white min-h-screen">
            <div className="text-center mb-16 animate-premium">
                <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 uppercase tracking-tighter text-black">
                    Réserver un <span className="text-luxury-gold italic">Rendez-vous</span>
                </h1>
                <p className="text-luxury-gray text-sm uppercase tracking-widest max-w-xl mx-auto font-light leading-loose">
                    Remplissez le formulaire ci-dessous. Nous vous rappellerons pour finaliser votre expérience.
                </p>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-8 bg-white p-8 md:p-12 border border-black/10 shadow-2xl rounded-sm"
            >
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold block font-bold">Nom Complet</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-luxury-gold transition-all text-lg font-light text-black placeholder:text-black/20"
                        placeholder="Ex: Sarah Johnson"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold block font-bold">Numéro de Téléphone</label>
                    <input
                        required
                        type="tel"
                        className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-luxury-gold transition-all text-lg font-light text-black placeholder:text-black/20"
                        placeholder="Ex: 06 12 34 56 78"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold block font-bold">Date Souhaitée</label>
                    <input
                        required
                        type="date"
                        className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-luxury-gold transition-all text-lg font-light text-black accent-luxury-gold [color-scheme:light]"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        style={{
                            WebkitCalendarPickerIndicator: {
                                filter: 'invert(58%) sepia(34%) saturate(714%) hue-rotate(3deg) brightness(92%) contrast(85%)',
                            }
                        } as any}
                    />
                </div>

                <div className="pt-8 text-center">
                    <Button type="submit" className="w-full py-5 text-lg bg-luxury-gold text-white hover:bg-black transition-all shadow-xl shadow-luxury-gold/20">
                        CONFIRMER LA DEMANDE
                    </Button>
                    <p className="mt-6 text-[10px] text-center text-luxury-gray uppercase tracking-widest leading-relaxed">
                        VOS DONNÉES SONT TRAITÉES AVEC LA PLUS GRANDE CONFIDENTIALITÉ.
                    </p>
                </div>
            </motion.form>
        </div>
    );
}
