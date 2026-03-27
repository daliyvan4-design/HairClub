const categories = [
  {
    title: "Soins & Entretien",
    items: [
      { label: "Shampoing simple", price: "10 000 F" },
      { label: "Shampoing simple + défaire les cheveux", price: "15 000 F" },
      { label: "Soins de mèche", price: "15 000 F" },
      { label: "Bain d'huile", price: "20 000 F" },
    ],
  },
  {
    title: "Pose",
    items: [
      { label: "Pose closure sans colle", price: "10 000 F" },
      { label: "Pose closure avec colle", price: "15 000 F" },
      { label: "Pose frontale sans colle", price: "15 000 F" },
      { label: "Pose frontale avec colle", price: "20 000 F" },
    ],
  },
  {
    title: "Blanchiment & Customisation",
    items: [
      { label: "Blanchiment, Customisation & Pose frontale", price: "35 000 F" },
      { label: "Blanchiment & Customisation frontale", price: "15 000 F" },
      { label: "Blanchiment de closure", price: "10 000 F" },
      { label: "Confection de frontal + Blanchiment", price: "20 000 F" },
      { label: "Customisation de closure + Blanchiment", price: "15 000 F" },
      { label: "Confection + Blanchiment + Customisation", price: "30 000 F" },
      { label: "Customisation", price: "15 000 F" },
    ],
  },
  {
    title: "Coiffage",
    items: [
      { label: "Boucle grossi", price: "10 000 F" },
      { label: "Boucle Hollywoodienne", price: "15 000 F" },
      { label: "Mise en forme", price: "10 000 F" },
      { label: "Brushing", price: "10 000 F" },
      { label: "Brushing + Lissage", price: "15 000 F" },
      { label: "Customisation à la naïja", price: "À partir de 20 000 F" },
    ],
  },
];

export default function PrestationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Video hero */}
      <div className="relative h-80 flex items-end overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/videos/prestations-bg.mp4"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 px-6 pb-12 max-w-7xl mx-auto w-full">
          <p className="text-xs uppercase tracking-[0.4em] text-luxury-gold mb-3">
            Grille tarifaire
          </p>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white">
            Prestations
          </h1>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-4 text-center">
        <p className="text-luxury-gray font-light leading-relaxed">
          Toutes nos prestations sont réalisées par des stylistes expérimentées,
          dans un cadre luxueux et bienveillant. Tarifs en francs CFA.
        </p>
        <div className="h-px w-16 bg-luxury-gold mx-auto mt-8" />
      </div>

      {/* Price grid */}
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-14">
        {categories.map((cat) => (
          <div key={cat.title}>
            {/* Category header */}
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xs uppercase tracking-[0.35em] text-luxury-gold font-semibold whitespace-nowrap">
                {cat.title}
              </h2>
              <div className="flex-1 h-px bg-luxury-gold/20" />
            </div>

            {/* Items */}
            <div className="flex flex-col divide-y divide-luxury-gray/10">
              {cat.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 group hover:bg-luxury-secondary/40 px-3 -mx-3 transition-colors duration-200"
                >
                  <span className="text-sm md:text-base text-black font-light group-hover:text-black transition-colors">
                    {item.label}
                  </span>
                  <span className="text-sm md:text-base font-semibold text-luxury-gold whitespace-nowrap ml-6">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-luxury-black py-20 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-luxury-gold mb-4">
          Prête à vous sublimer ?
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
          Réservez votre séance
        </h2>
        <a href="/reservation" className="btn-luxury px-12 py-4 text-base">
          Prendre Rendez-vous
        </a>
      </div>
    </div>
  );
}
