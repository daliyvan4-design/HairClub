"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Hide Navbar on Admin page
    if (pathname === "/admin") return null;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Accueil", href: "/" },
        { name: "Nos Prestations", href: "/prestations" },
        { name: "Réserver", href: "/reservation" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-2",
                isScrolled ? "bg-white/90 backdrop-blur-md border-b border-luxury-gold/20 py-1 shadow-sm" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="relative h-20 w-40 flex items-center">
                    <img
                        src="/logohair.png"
                        alt="HAIR CLUB"
                        className="h-full w-full object-contain"
                        onError={(e) => {
                            // Fallback to text if image fails
                            (e.target as any).style.display = 'none';
                            (e.target as any).nextSibling.style.display = 'block';
                        }}
                    />
                    <span style={{ display: 'none' }} className="text-2xl font-display font-bold tracking-tighter text-luxury-gold">
                        HAIR CLUB<span className="text-black">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => {
                        const isDynamicPage = pathname === "/" || pathname === "/prestations";
                        const isStaticPage = !isDynamicPage;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm uppercase tracking-widest transition-colors duration-300",
                                    isStaticPage
                                        ? "text-luxury-gold font-medium"
                                        : (isScrolled ? "text-luxury-black hover:text-luxury-gold" : "text-white hover:text-luxury-gold")
                                )}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    <Link href="/reservation">
                        <Button variant="primary" className="py-2 text-xs">
                            Réserver
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <a href="tel:+2250170434143" className="text-luxury-gold">
                        <Phone size={20} />
                    </a>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="focus:outline-none text-luxury-gold"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out md:hidden",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-6 right-6 text-luxury-gold"
                >
                    <X size={32} />
                </button>
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl uppercase tracking-[0.2em] text-luxury-gold hover:text-black transition-colors duration-300 font-bold"
                    >
                        {link.name}
                    </Link>
                ))}
                <Link href="/reservation" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" className="mt-4 px-12">
                        Réserver
                    </Button>
                </Link>
            </div>
        </nav>
    );
}
