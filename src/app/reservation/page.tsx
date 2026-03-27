"use client";

import { useState } from "react";
import { submitReservation } from "@/app/admin/actions";
import { CheckCircle, XCircle, ChevronDown } from "lucide-react";

const categories = [
  {
    title: "Soins & Entretien",
    items: [
      "Shampoing simple",
      "Shampoing simple + défaire les cheveux",
      "Soins de mèche",
      "Bain d'huile",
    ],
  },
  {
    title: "Pose",
    items: [
      "Pose closure sans colle",
      "Pose closure avec colle",
      "Pose frontale sans colle",
      "Pose frontale avec colle",
    ],
  },
  {
    title: "Blanchiment & Customisation",
    items: [
      "Blanchiment, Customisation & Pose frontale",
      "Blanchiment & Customisation frontale",
      "Blanchiment de closure",
      "Confection de frontal + Blanchiment",
      "Customisation de closure + Blanchiment",
      "Confection + Blanchiment + Customisation",
      "Customisation",
    ],
  },
  {
    title: "Coiffage",
    items: [
      "Boucle grossi",
      "Boucle Hollywoodienne",
      "Mise en forme",
      "Brushing",
      "Brushing + Lissage",
      "Customisation à la naïja",
    ],
  },
];

const heures = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

export default function ReservationPage() {
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [prestationError, setPrestationError] = useState(false);

  function toggle(item: string) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
    setPrestationError(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selected.length === 0) {
      setPrestationError(true);
      return;
    }
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    selected.forEach((p) => fd.append("prestation", p));
    const res = await submitReservation(fd);
    setResult(res);
    setLoading(false);
    if (res.success) {
      (e.target as HTMLFormElement).reset();
      setSelected([]);
      setOpen(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-64 flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/videos/hero-2.mp4"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-6 pb-10 max-w-3xl mx-auto w-full">
          <p className="text-xs uppercase tracking-[0.4em] text-luxury-gold mb-2">Votre Consultation</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Réservation</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {result && (
          <div className={`flex items-start gap-4 p-6 mb-10 border ${
            result.success ? "border-green-400/40 bg-green-50 text-green-800" : "border-red-400/40 bg-red-50 text-red-800"
          }`}>
            {result.success ? <CheckCircle className="shrink-0 mt-0.5" size={20} /> : <XCircle className="shrink-0 mt-0.5" size={20} />}
            <p className="text-sm font-light">{result.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Identité */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-luxury-gold mb-5 pb-2 border-b border-luxury-gold/20">
              Vos informations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Prénom" name="prenom" required />
              <Field label="Nom" name="nom" required />
              <Field label="Téléphone" name="telephone" type="tel" required />
              <Field label="Email" name="email" type="email" required />
            </div>
          </div>

          {/* Rendez-vous */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-luxury-gold mb-5 pb-2 border-b border-luxury-gold/20">
              Votre rendez-vous
            </h2>
            <div className="flex flex-col gap-5">

              {/* Prestations — liste dépliante multi-choix */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-luxury-gray mb-2">
                  Prestations souhaitées <span className="text-luxury-gold">*</span>
                </label>

                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className={`w-full flex items-center justify-between px-4 py-3 border text-sm text-left transition-colors ${
                    prestationError ? "border-red-400" : open ? "border-luxury-gold" : "border-luxury-gray/30 hover:border-luxury-gold/50"
                  }`}
                >
                  <span className={selected.length === 0 ? "text-luxury-gray" : "text-black"}>
                    {selected.length === 0
                      ? "Sélectionner les prestations..."
                      : `${selected.length} prestation${selected.length > 1 ? "s" : ""} sélectionnée${selected.length > 1 ? "s" : ""}`}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-luxury-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Pills des sélectionnées */}
                {selected.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selected.map((p) => (
                      <span
                        key={p}
                        onClick={() => toggle(p)}
                        className="flex items-center gap-1 text-[11px] bg-luxury-gold/10 border border-luxury-gold/30 text-black px-3 py-1 cursor-pointer hover:bg-red-50 hover:border-red-300 transition-colors"
                      >
                        {p}
                        <span className="text-luxury-gray hover:text-red-500">×</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Dropdown */}
                {open && (
                  <div className="border border-luxury-gold/30 border-t-0 bg-white shadow-lg max-h-72 overflow-y-auto">
                    {categories.map((cat) => (
                      <div key={cat.title}>
                        <div className="px-4 py-2 bg-luxury-secondary/60 sticky top-0">
                          <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
                            {cat.title}
                          </p>
                        </div>
                        {cat.items.map((item) => {
                          const checked = selected.includes(item);
                          return (
                            <label
                              key={item}
                              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-luxury-secondary/40 transition-colors border-b border-luxury-gray/5 ${
                                checked ? "bg-luxury-gold/5" : ""
                              }`}
                            >
                              <div className={`w-4 h-4 border shrink-0 flex items-center justify-center transition-colors ${
                                checked ? "bg-luxury-gold border-luxury-gold" : "border-luxury-gray/40"
                              }`}>
                                {checked && (
                                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                    <path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm text-black">{item}</span>
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={checked}
                                onChange={() => toggle(item)}
                              />
                            </label>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}

                {prestationError && (
                  <p className="text-xs text-red-500 mt-1">Veuillez sélectionner au moins une prestation.</p>
                )}
              </div>

              {/* Date + Heure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-luxury-gray mb-2">
                    Date <span className="text-luxury-gold">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border border-luxury-gray/30 px-4 py-3 text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-luxury-gray mb-2">
                    Heure <span className="text-luxury-gold">*</span>
                  </label>
                  <select
                    name="heure"
                    required
                    className="w-full border border-luxury-gray/30 px-4 py-3 text-sm focus:outline-none focus:border-luxury-gold transition-colors bg-white"
                  >
                    <option value="">Choisir...</option>
                    {heures.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-luxury-gray mb-2">
              Message (optionnel)
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full border border-luxury-gray/30 px-4 py-3 text-sm focus:outline-none focus:border-luxury-gold transition-colors resize-none"
              placeholder="Précisions sur votre demande..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-luxury py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required }: {
  label: string; name: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest text-luxury-gray mb-2">
        {label} {required && <span className="text-luxury-gold">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border border-luxury-gray/30 px-4 py-3 text-sm focus:outline-none focus:border-luxury-gold transition-colors"
      />
    </div>
  );
}
