import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingContact } from "@/components/ui/FloatingContact";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Hair Club | Distinction Capillaire & Luxe",
  description: "Boutique de luxe spécialisée dans les mèches brutes et perruques sur mesure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} antialiased bg-white text-black`}
      >
        <Navbar />
        <main>{children}</main>
        <FloatingContact />
        <footer className="py-16 px-6 border-t border-luxury-gold/10 text-center bg-white">
          <div className="mb-8 flex justify-center">
            <Image
              src="/logohair.png"
              alt="HAIR CLUB"
              width={160}
              height={80}
              className="h-20 w-auto opacity-80 object-contain mx-auto"
            />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-medium">
            &copy; {new Date().getFullYear()} xcompany. Tous droits réservés.
          </p>
        </footer>
      </body>
    </html>
  );
}
