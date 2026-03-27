import { Phone, MapPin } from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/VonaxGGVQFh8aXhZ9?g_st=ipc";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-4">
            Contact &amp; <span className="text-luxury-gold italic">Infos</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-luxury-gray">
            Nous sommes à votre écoute pour toute demande personnalisée.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div className="flex flex-col gap-10">
            {/* Coordonnées */}
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-black font-semibold mb-6">
                Nos Coordonnées
              </h2>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gray mb-1">Téléphone</p>
                    <a href="tel:+2250170434143" className="text-black font-medium hover:text-luxury-gold transition-colors">
                      +225 01 70 43 41 43
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gray mb-1">Boutique &amp; Salon</p>
                    <p className="text-black font-medium leading-relaxed">
                      Deux plateaux 7e tranche ENA,<br />
                      face à l&apos;agence Orange
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux */}
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-black font-semibold mb-6">
                Suivez-nous
              </h2>
              <div className="flex gap-4">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/hairclubabidjan_?igsh=MXMzMnQ3a3M5Y2lxZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-luxury-gold">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/17wu6tyngK/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-luxury-gold">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@hairclubabidjan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all duration-300"
                  aria-label="TikTok"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-luxury-gold">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.53V6.77a4.85 4.85 0 01-1-.08z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right — Map */}
          <div className="relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.3!2d-3.99!3d5.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjEnNDIuMCJOIDPCsDU5JzI0LjAiVw!5e0!3m2!1sfr!2sci!4v1"
              width="100%"
              height="360"
              style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-80"
            />
            <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
              <div className="bg-white/95 backdrop-blur-sm border border-luxury-gold/20 p-6 m-4 max-w-[200px] pointer-events-auto">
                <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold mb-3">Visitez-nous</p>
                <p className="text-xs text-luxury-gray font-light italic leading-relaxed mb-4">
                  &ldquo;Une immersion dans l&apos;univers de la distinction capillaire.&rdquo;
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-[10px] px-4 py-2 block text-center"
                >
                  Ouvrir Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
