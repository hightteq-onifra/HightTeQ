'use client';

import Link from 'next/link';

export default function LoginSelectionPage() {
  return (
    <div className="min-h-screen bg-[#0b1c30] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-[#06B6D4] font-semibold">HighTeQ</p>
          <h1 className="mt-4 text-4xl font-extrabold">Connexion</h1>
          <p className="mt-3 text-white/70">Choisissez votre type de compte pour continuer.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/login/admin"
            className="group rounded-3xl border border-white/10 bg-white/5 p-8 text-left transition hover:-translate-y-1 hover:border-[#06B6D4] hover:bg-[#004ac6]/20"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#004ac6]/30 text-[#06B6D4]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z" />
              </svg>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#06B6D4]">Profil</p>
            <h2 className="mt-4 text-3xl font-bold">Administrateur</h2>
            <p className="mt-3 text-white/70">Gérez les produits, services et commandes.</p>
          </Link>

          <Link
            href="/login/user"
            className="group rounded-3xl border border-white/10 bg-white/5 p-8 text-left transition hover:-translate-y-1 hover:border-[#06B6D4] hover:bg-[#004ac6]/20"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#004ac6]/30 text-[#06B6D4]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#06B6D4]">Profil</p>
            <h2 className="mt-4 text-3xl font-bold">Client</h2>
            <p className="mt-3 text-white/70">Accédez à votre espace, commandes et panier.</p>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-white/70 hover:text-white">
            ← Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
