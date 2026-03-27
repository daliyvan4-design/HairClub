import { Hero } from "@/components/home/Hero";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Sparkles, Scissors, ShoppingBag } from "lucide-react";
import { AestheticShowcase } from "@/components/home/AestheticShowcase";

const specialties = [
  {
    icon: <Sparkles className="text-luxury-gold" size={32} />,
    title: "Perruques sur mesure",
    description: "Une création unique adaptée à votre visage et à votre style personnel.",
  },
  {
    icon: <ShoppingBag className="text-luxury-gold" size={32} />,
    title: "Mèches brutes",
    description: "La plus haute qualité de cheveux naturels sourcés avec éthique et soin.",
  },
  {
    icon: <Scissors className="text-luxury-gold" size={32} />,
    title: "Confection Artisanale",
    description: "Un savoir-faire français pour des finitions invisibles et durables.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />

      {/* Intro Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-8 animate-premium text-black">
            Hair Club — <span className="text-luxury-gold italic">La distinction capillaire</span>
          </h2>
          <p className="text-lg text-luxury-gray font-light leading-relaxed mb-12">
            Plus qu'une boutique, une expérience de luxe où chaque mèche est sélectionnée pour son éclat et chaque perruque est une œuvre d'art façonnée à la main.
          </p>
          <div className="h-px w-24 bg-luxury-gold mx-auto" />
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {specialties.map((item, i) => (
              <div
                key={i}
                className="premium-card bg-white border-black/5 flex flex-col items-center text-center group"
              >
                <div className="mb-6 transform transition-transform duration-500 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-4 tracking-wide uppercase text-black">
                  {item.title}
                </h3>
                <p className="text-sm text-luxury-gray leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Aesthetic Showcase */}
      <AestheticShowcase />

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522337360788-8b13df772ce5?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-black">
            Sublimez votre <span className="text-luxury-gold">Allure</span>
          </h2>
          <p className="text-xl text-luxury-gray mb-12 font-light">
            Prenez rendez-vous pour une consultation personnalisée dans notre salon privé.
          </p>
          <Link href="/reservation">
            <Button className="px-12 py-5 text-lg shadow-xl shadow-luxury-gold/20">Prendre un Rendez-vous</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
