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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tighter hover:opacity-80 transition-opacity">
          CASAS<span className="text-blue-500">LSF</span>
        </Link>

        {/* Desktop Links - Centered */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-gray-400 hover:text-white transition-all duration-300 relative group py-2`}
            >
              {l.label}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${pathname === l.href ? "scale-x-100" : ""}`}></span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/simulador" className="btn-primary rounded-full px-8 py-3 text-sm tracking-tight">
            Simular Grátis
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
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
