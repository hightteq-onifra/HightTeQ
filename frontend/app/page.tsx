'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="bg-kinetic-gradient h-full min-h-screen text-white font-body overflow-hidden relative">
      {/* Style global pour les gradients et animations */}
      <style jsx global>{`
        .bg-kinetic-gradient {
          background: radial-gradient(circle at 15% 50%, rgba(0, 74, 198, 0.4) 0%, transparent 50%),
                      radial-gradient(circle at 85% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
                      #0b1c30;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(0, 74, 198, 0.4) 100%);
          filter: blur(4px);
          z-index: 0;
        }
      `}</style>

      {/* Decorative Orbs */}
      <div className="floating-orb w-64 h-64 top-[-10%] left-[-5%]"></div>
      <div className="floating-orb w-96 h-96 bottom-[-20%] left-[-10%] opacity-50"></div>
      <div className="floating-orb w-80 h-80 top-[10%] right-[-5%] opacity-60"></div>
      <div className="floating-orb w-48 h-48 bottom-[-10%] right-[10%] opacity-70"></div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      ></div>

      <div className="relative z-10 flex flex-col h-full min-h-screen container mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-center w-full mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-white text-[#0b1c30] flex items-center justify-center font-display font-bold text-xl">
              HT
            </div>
            <span className="font-display font-bold text-2xl tracking-wide">
              HighTeQ <span className="text-[#06B6D4]">Madagascar</span>
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <button
              className="text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
              onClick={toggleModal}
            >
              Se Connecter
            </button>
            <Link
              className="bg-[#004ac6] hover:bg-[#3b82f6] text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors"
              href="/inscription"
            >
              S'inscrire
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-7xl mx-auto h-full pb-12">
          <div className="flex-1 flex flex-col justify-center max-w-2xl z-10 w-full pt-10 lg:pt-0">
            <h1 className="font-display font-bold text-5xl lg:text-7xl leading-[1.1] mb-6 tracking-tight">
              L'Excellence <br />
              <span className="font-normal italic text-white/90">Technologique</span> <br />
              Haute Performance
            </h1>
            <p className="text-lg lg:text-xl text-[#cbdbf6] mb-10 max-w-lg font-light leading-relaxed">
              Votre destination premium pour le matériel informatique de pointe et les services d'experts à Madagascar.
            </p>

            <div className="flex flex-wrap gap-3 mt-auto">
              <div className="bg-white text-[#0b1c30] px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold shadow-sm">
                <div className="bg-[#004ac6] text-white rounded-full p-0.5">
                  <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                100% Authentique
              </div>
              <div className="bg-white text-[#0b1c30] px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold shadow-sm">
                <div className="bg-[#004ac6] text-white rounded-full p-0.5">
                  <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                Garantie Officielle
              </div>
              <div className="bg-white text-[#0b1c30] px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold shadow-sm">
                <div className="bg-[#004ac6] text-white rounded-full p-0.5">
                  <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                Support Expert
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full h-full items-center justify-end hidden lg:flex">
            <div className="relative w-[120%] h-auto max-w-[900px] right-[-10%] transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out z-10 drop-shadow-2xl">
              <Image
                alt="Ordinateur Portable HighTeQ"
                src="/img/ordinateur.png"
                width={900}
                height={600}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg"
              />
            </div>
          </div>
        </main>
      </div>

      {/* Modal - Choisir son profil (Thème Sombre / Bleu HighTeQ) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 transition-all duration-300">
          <div className="bg-[#0b1c30] text-white px-8 py-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] max-w-xl w-full relative border border-white/10">
            {/* Bouton Fermer */}
            <button
              className="absolute top-5 right-5 text-white/50 hover:text-white p-1 transition-colors cursor-pointer"
              onClick={toggleModal}
            >
              <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" x2="6" y1="6" y2="18"></line>
                <line x1="6" x2="18" y1="6" y2="18"></line>
              </svg>
            </button>

            {/* Titre */}
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white text-center mb-8 tracking-wide">
              Choisissez votre profil
            </h2>

            {/* Cartes de sélection de profil */}
            <div className="grid grid-cols-2 gap-4">
              {/* Carte Admin */}
              <Link
                href="/login/admin"
                className="group flex flex-col items-center justify-center p-8 bg-white/5 hover:bg-[#004ac6]/30 rounded-2xl border border-white/10 hover:border-[#06B6D4] transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                <div className="w-16 h-16 mb-4 text-white group-hover:scale-110 group-hover:text-[#06B6D4] transition-all flex items-center justify-center">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"/>
                  </svg>
                </div>
                <span className="font-bold text-sm tracking-wider uppercase text-white/90 group-hover:text-white">
                  ADMIN
                </span>
              </Link>

              {/* Carte Utilisateur */}
              <Link
                href="/login/user"
                className="group flex flex-col items-center justify-center p-8 bg-white/5 hover:bg-[#004ac6]/30 rounded-2xl border border-white/10 hover:border-[#06B6D4] transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                <div className="w-16 h-16 mb-4 text-white group-hover:scale-110 group-hover:text-[#06B6D4] transition-all flex items-center justify-center">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <span className="font-bold text-sm tracking-wider uppercase text-white/90 group-hover:text-white">
                  UTILISATEUR
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}