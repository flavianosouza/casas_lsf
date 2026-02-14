"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/plantas", label: "Plantas" },
  { href: "/custos", label: "Custos" },
  { href: "/metodos", label: "Métodos" },
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-500 tracking-tighter hover:scale-105 transition-transform">
          CASAS<span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">LSF</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300 ${pathname === l.href ? "text-white border-b-2 border-blue-500 pb-1" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/simulador" className="hidden md:inline-flex btn-primary text-sm px-6 py-2.5 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
          Simular Grátis
        </Link>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-6 space-y-4 animate-fade-in">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block text-lg font-medium transition-colors ${pathname === l.href ? "text-blue-400" : "text-gray-300 hover:text-white"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/simulador" onClick={() => setOpen(false)} className="btn-primary w-full text-center py-3 mt-4">
            Simular Grátis
          </Link>
        </div>
      )}
    </nav>
  );
}
