import Image from "next/image";

const frames = [
  { src: "/assets/images/showcase/frame-1.JPG", label: "Collection Lisse" },
  { src: "/assets/images/showcase/frame-2.JPG", label: "Collection Bouclée" },
  { src: "/assets/images/showcase/frame-3.JPG", label: "Collection Wavy" },
];

export function AestheticShowcase() {
  return (
    <section className="py-24 px-6 bg-luxury-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-luxury-gold mb-4">Notre Univers</p>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white">
            Sublimez votre <span className="text-luxury-gradient italic">Beauté</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frames.map((frame, i) => (
            <div key={i} className="group relative overflow-hidden aspect-[3/4]">
              <Image
                src={frame.src}
                alt={frame.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              {/* Gold bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="h-px w-8 bg-luxury-gold mb-3" />
                <p className="text-xs uppercase tracking-[0.3em] text-white font-medium">{frame.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
