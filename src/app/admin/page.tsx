"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Trash2, ShieldCheck, Plus, LayoutGrid, Video, Users, PhoneCall, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Booking {
    id: number;
    nom: string;
    telephone: string;
    date: string;
    status: "En attente" | "Confirmé";
}

import { saveMedia, getMedia, deleteMedia } from "@/lib/media-db";

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [heroVideos, setHeroVideos] = useState<string[]>([]);
    const [collectionVideo, setCollectionVideo] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState<"reservations" | "videos">("reservations");
    const [resTab, setResTab] = useState<"pending" | "confirmed">("pending");

    useEffect(() => {
        const loadAll = async () => {
            const savedBookings = localStorage.getItem("hair_club_bookings");
            if (savedBookings) setBookings(JSON.parse(savedBookings));

            const savedHero = localStorage.getItem("hair_club_hero_videos");
            const heroUrls = savedHero ? JSON.parse(savedHero) : ["/assets/videos/hero-1.mp4", "/assets/videos/hero-2.mp4"];

            // Rehydrate Blobs from IndexedDB
            const hydratedHero = await Promise.all(heroUrls.map(async (url: string, i: number) => {
                const blob = await getMedia(`hero_${i}`);
                return blob ? URL.createObjectURL(blob) : url;
            }));
            setHeroVideos(hydratedHero);

            const savedCollVideo = localStorage.getItem("hair_club_collection_video");
            const collBlob = await getMedia("collection_bg");
            setCollectionVideo(collBlob ? URL.createObjectURL(collBlob) : savedCollVideo || "");

            setIsLoaded(true);
        };
        loadAll();
    }, []);

    const toggleStatus = (id: number) => {
        const updated = bookings.map(b =>
            b.id === id ? { ...b, status: b.status === "En attente" ? "Confirmé" : "En attente" } : b
        );
        setBookings(updated as any);
        localStorage.setItem("hair_club_bookings", JSON.stringify(updated));
    };

    const deleteBooking = (id: number) => {
        if (!confirm("Supprimer cette réservation ?")) return;
        const updated = bookings.filter(b => b.id !== id);
        setBookings(updated);
        localStorage.setItem("hair_club_bookings", JSON.stringify(updated));
    };

    /* Prestations management removed - Now hardcoded */

    const saveVideos = () => {
        localStorage.setItem("hair_club_hero_videos", JSON.stringify(heroVideos));
        localStorage.setItem("hair_club_collection_video", collectionVideo);
        alert("Configuration vidéo enregistrée !");
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 100 * 1024 * 1024) return alert("Le fichier est trop volumineux (Max 100Mo).");

        const url = URL.createObjectURL(file);
        if (idx !== undefined) {
            const n = [...heroVideos];
            n[idx] = url;
            setHeroVideos(n);
            await saveMedia(`hero_${idx}`, file);
        } else {
            setCollectionVideo(url);
            await saveMedia("collection_bg", file);
        }
    };

    /* Prestations & Vitrine management removed - Now hardcoded */

    if (!isLoaded) return null;

    const filteredBookings = bookings.filter(b =>
        resTab === "pending" ? b.status === "En attente" : b.status === "Confirmé"
    ).sort((a, b) => b.id - a.id);

    return (
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen bg-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-2 text-luxury-gold">
                            <ShieldCheck size={18} />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Espace Privé Administrateur</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mb-2">
                        <img src="/logohair.png" alt="Logo" className="h-16 w-auto" />
                        <h1 className="text-4xl md:text-5xl font-display font-medium uppercase tracking-tighter text-black">
                            Hair Club — <span className="text-luxury-gold italic">Dashboard</span>
                        </h1>
                    </div>
                </div>

                <button
                    onClick={() => setActiveTab("reservations")}
                    className={cn("px-6 py-2 text-[10px] uppercase tracking-widest transition-all", activeTab === "reservations" ? "bg-white text-luxury-gold shadow-sm font-bold" : "text-luxury-gold opacity-50 hover:opacity-100")}
                >
                    Réservations
                </button>
                <button
                    onClick={() => setActiveTab("videos")}
                    className={cn("px-6 py-2 text-[10px] uppercase tracking-widest transition-all", activeTab === "videos" ? "bg-white text-luxury-gold shadow-sm font-bold" : "text-luxury-gold opacity-50 hover:opacity-100")}
                >
                    Vidéos
                </button>
            </div>

            {/* TAB: RESERVATIONS */}
            {activeTab === "reservations" && (
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-black/5 pb-4">
                        <div className="flex gap-8">
                            <button
                                onClick={() => setResTab("pending")}
                                className={cn("text-xs uppercase tracking-widest pb-4 -mb-4 transition-all relative", resTab === "pending" ? "text-luxury-gold font-bold border-b-2 border-luxury-gold" : "text-luxury-gold opacity-50 hover:opacity-100")}
                            >
                                En attente ({bookings.filter(b => b.status === "En attente").length})
                            </button>
                            <button
                                onClick={() => setResTab("confirmed")}
                                className={cn("text-xs uppercase tracking-widest pb-4 -mb-4 transition-all relative", resTab === "confirmed" ? "text-luxury-gold font-bold border-b-2 border-luxury-gold" : "text-luxury-gold opacity-50 hover:opacity-100")}
                            >
                                Confirmées ({bookings.filter(b => b.status === "Confirmé").length})
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white border border-black/10 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-black/5 bg-luxury-secondary/30">
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-luxury-gray">Client</th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-luxury-gray">Téléphone</th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-luxury-gray">Date Souhaitée</th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-luxury-gray text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-20 text-center text-luxury-gray/40 font-light italic">
                                            Aucune réservation dans cette catégorie.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <motion.tr
                                            key={booking.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="border-b border-black/[0.03] hover:bg-luxury-secondary/20 transition-colors"
                                        >
                                            <td className="px-6 py-5">
                                                <p className="font-medium text-black uppercase text-sm tracking-wide">{booking.nom}</p>
                                            </td>
                                            <td className="px-6 py-5 text-luxury-gold">
                                                <a href={`tel:${booking.telephone}`} className="flex items-center gap-2 hover:underline font-mono">
                                                    <PhoneCall size={14} />
                                                    {booking.telephone}
                                                </a>
                                            </td>
                                            <td className="px-6 py-5 text-luxury-gray text-sm">{booking.date}</td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        onClick={() => toggleStatus(booking.id)}
                                                        className={cn(
                                                            "p-2 rounded-full transition-colors",
                                                            booking.status === "Confirmé" ? "bg-black/5 text-luxury-gray hover:bg-black/10" : "bg-luxury-gold/10 text-luxury-gold hover:bg-luxury-gold/20"
                                                        )}
                                                        title={booking.status === "Confirmé" ? "Passer en attente" : "Confirmer"}
                                                    >
                                                        {booking.status === "Confirmé" ? <Clock size={16} /> : <CheckCircle size={16} />}
                                                    </button>
                                                    <button
                                                        onClick={() => deleteBooking(booking.id)}
                                                        className="p-2 text-black/10 hover:text-red-500 transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


            {/* TAB: VIDEOS */}
            {activeTab === "videos" && (
                <div className="max-w-3xl space-y-12">
                    <div className="premium-card bg-white border-black/10">
                        <div className="flex items-center gap-3 mb-8">
                            <Video className="text-luxury-gold" size={20} />
                            <h2 className="text-lg font-display uppercase tracking-wider text-black">Gestion des Médias</h2>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-luxury-gold border-b border-black/5 pb-2">Vidéos Hero (Accueil)</h3>
                                {heroVideos.map((url, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 p-4 bg-luxury-secondary/30 border border-black/5 rounded-sm relative">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-[10px] uppercase tracking-widest text-luxury-gray">Slide {idx + 1}</label>
                                            <button
                                                onClick={() => setHeroVideos(heroVideos.filter((_, i) => i !== idx))}
                                                className="text-black/20 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex-1 bg-white border border-black/5 px-4 py-3 text-sm text-luxury-gray italic truncate">
                                                {url || "Aucune vidéo sélectionnée"}
                                            </div>
                                            <label className="cursor-pointer bg-white border border-black/5 px-6 py-3 hover:bg-luxury-gold hover:text-white transition-all flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                                                <Upload size={14} />
                                                Uploader
                                                <input type="file" className="hidden" accept="video/*" onChange={(e) => handleVideoUpload(e, idx)} />
                                            </label>
                                        </div>
                                        {url.startsWith('blob:') && <p className="text-[9px] text-green-600 font-medium">Vidéo locale prête (Session temporaire)</p>}
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    onClick={() => setHeroVideos([...heroVideos, ""])}
                                    className="w-full text-xs font-bold"
                                    disabled={heroVideos.length >= 5}
                                >
                                    + Ajouter un slide vidéo
                                </Button>
                            </div>

                            <div className="space-y-4 pt-4">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-luxury-gold border-b border-black/5 pb-2">Vidéo de fond (Prestations)</h3>
                                <div className="flex flex-col gap-2 p-4 bg-luxury-secondary/30 border border-black/5 rounded-sm">
                                    <label className="text-[10px] uppercase tracking-widest text-luxury-gray">Vidéo de fond</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-white border border-black/5 px-4 py-3 text-sm text-luxury-gray italic truncate">
                                            {collectionVideo || "Aucune vidéo sélectionnée"}
                                        </div>
                                        <label className="cursor-pointer bg-white border border-black/5 px-6 py-3 hover:bg-luxury-gold hover:text-white transition-all flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                                            <Upload size={14} />
                                            Uploader
                                            <input type="file" className="hidden" accept="video/*" onChange={(e) => handleVideoUpload(e)} />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button onClick={saveVideos} className="flex-1 py-5 text-sm tracking-widest shadow-xl shadow-luxury-gold/10">ENREGISTRER TOUTE LA CONFIGURATION</Button>
                                <Button variant="outline" onClick={() => {
                                    setHeroVideos(["/assets/videos/hero-1.mp4", "/assets/videos/hero-2.mp4"]);
                                    setCollectionVideo("/assets/videos/prestations-bg.mp4");
                                }} className="px-8">Réinitialiser</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
