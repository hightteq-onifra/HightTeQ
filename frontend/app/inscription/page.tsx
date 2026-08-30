'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    telephone: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/utilisateurs/inscription/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          telephone: form.telephone,
          password: form.password,
          role: 'client', // Alefa direct 'client' ny role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data?.username?.[0] ||
          data?.telephone?.[0] ||
          data?.email?.[0] ||
          data?.password?.[0] ||
          data?.detail ||
          'Erreur lors de l’inscription.';
        throw new Error(message);
      }

      setSuccess('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
      
      // Redirect direct any amin'ny login ho an'ny user/client
      setTimeout(() => router.push('/login/user'), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l’inscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1c30] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#071324] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#06B6D4] font-semibold">HighTeQ</p>
          <h1 className="mt-4 text-3xl font-extrabold">Créer un compte</h1>
          <p className="mt-2 text-sm text-white/60">Inscription client</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Nom d’utilisateur</label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(event) => handleChange('username', event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#06B6D4] focus:outline-none"
              placeholder="highteq_user"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => handleChange('email', event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#06B6D4] focus:outline-none"
                placeholder="vous@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Téléphone</label>
              <input
                type="tel"
                required
                value={form.telephone}
                onChange={(event) => handleChange('telephone', event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#06B6D4] focus:outline-none"
                placeholder="+261 34 ..."
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Mot de passe</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) => handleChange('password', event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#06B6D4] focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Confirmer le mot de passe</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#06B6D4] focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#004ac6] to-[#06B6D4] px-4 py-3 font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Inscription...' : 'S’inscrire'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/70">
          Vous avez déjà un compte ?{' '}
          <Link href="/login/user" className="font-medium text-[#06B6D4] hover:text-cyan-300">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}