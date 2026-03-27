"use client";

import { useState } from "react";
import { Phone, X, MessageCircle } from "lucide-react";

const PHONE = "+2250170434143";
const WHATSAPP_URL = `https://wa.me/${PHONE.replace("+", "")}?text=Bonjour%20Hair%20Club%2C%20je%20souhaite%20obtenir%20des%20informations.`;
const CALL_URL = `tel:${PHONE}`;

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Actions */}
      {open && (
        <div className="flex flex-col items-end gap-3 animate-premium">
          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white shadow-lg shadow-black/10 border border-luxury-gold/20 px-4 py-3 hover:border-luxury-gold transition-all duration-300 group"
          >
            <span className="text-xs uppercase tracking-widest text-luxury-gray group-hover:text-black transition-colors whitespace-nowrap">
              WhatsApp
            </span>
            <div className="w-8 h-8 bg-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle size={16} className="text-white" />
            </div>
          </a>

          {/* Appel */}
          <a
            href={CALL_URL}
            className="flex items-center gap-3 bg-white shadow-lg shadow-black/10 border border-luxury-gold/20 px-4 py-3 hover:border-luxury-gold transition-all duration-300 group"
          >
            <span className="text-xs uppercase tracking-widest text-luxury-gray group-hover:text-black transition-colors whitespace-nowrap">
              +225 01 70 43 41 43
            </span>
            <div className="w-8 h-8 bg-luxury-gold flex items-center justify-center shrink-0">
              <Phone size={16} className="text-black" />
            </div>
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-luxury-gold shadow-xl shadow-luxury-gold/30 flex items-center justify-center hover:bg-luxury-gold-light transition-all duration-300 active:scale-95"
        aria-label="Contact rapide"
      >
        {open ? (
          <X size={20} className="text-black" />
        ) : (
          <Phone size={20} className="text-black" />
        )}
      </button>
    </div>
  );
}
