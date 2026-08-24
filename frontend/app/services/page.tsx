'use client';

import Link from 'next/link';
import { ArrowLeft, Wrench, Network, Cpu } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="bg-[#0b1c30] min-h-screen text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0b1c30]/90 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#004ac6] to-[#06B6D4] flex items-center justify-center text-white font-black text-base shadow-lg group-hover:scale-105 transition-transform">
              HT
            </div>
            <span className="font-extrabold text-2xl tracking-wide hidden sm:inline">
              HighTeQ <span className="text-[#06B6D4]">Madagascar</span>
            </span>
          </Link>

          <Link 
            href="/dashboard"
            className="px-4 py-2 text-sm font-bold text-[#06B6D4] hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">Solutions & Expertise</span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-2 mb-4">
              Nos Services Informatiques
            </h1>
            <p className="text-white/60 max-w-2xl">
              Des solutions techniques adaptées aux besoins des particuliers et des entreprises à Madagascar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#06B6D4]/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Maintenance & Optimisation</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Nettoyage complet, dépannage, mise à niveau matérielle et logiciels pour garantir des performances optimales.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#06B6D4]/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Network className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Installation Réseau</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Conception et mise en place d'infrastructures réseau haut débit et sécurisées pour votre entreprise.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#06B6D4]/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Réparation Express</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Diagnostic gratuit et réparation rapide de laptops, pc de bureau et smartphones par nos techniciens certifiés.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
