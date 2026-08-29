'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function decodeJwtPayload(token: string) {
  try {
    const base64Payload = token.split('.')[1];
    const normalized = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(normalized);
    return JSON.parse(decoded);
  } catch {
    return {};
  }
}

export default function LoginRolePage() {
  const params = useParams<{ role?: string }>();
  const router = useRouter();
  const roleParam = (params.role || 'user').toLowerCase();
  const isAdminFlow = roleParam === 'admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!['admin', 'user'].includes(roleParam)) {
      router.replace('/login');
    }
  }, [roleParam, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/utilisateurs/connexion/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.non_field_errors?.[0] || 'Identifiants incorrects');
      }

      const payload = decodeJwtPayload(data.access);
      const finalRole = payload.role || 'client';

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('userRole', finalRole);
      localStorage.setItem('username', payload.username || username);

      if (finalRole !== 'admin' && isAdminFlow) {
        setError('Ce compte n’est pas un compte administrateur.');
        setLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue pendant la connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1c30] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#071324] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#06B6D4] font-semibold">HighTeQ</p>
          <h1 className="mt-4 text-3xl font-extrabold">
            {isAdminFlow ? 'Connexion Admin' : 'Connexion Client'}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {isAdminFlow ? 'Accédez à votre espace administrateur.' : 'Accédez à votre espace client.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Nom d’utilisateur</label>
            <input
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#06B6D4] focus:outline-none"
              placeholder="Entrez votre nom d’utilisateur"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#06B6D4] focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#004ac6] to-[#06B6D4] px-4 py-3 font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-white/70">
          <Link href="/inscription" className="hover:text-white">
            Créer un compte
          </Link>
          <Link href="/login" className="hover:text-white">
            Choisir un profil
          </Link>
        </div>
      </div>
    </div>
  );
}
