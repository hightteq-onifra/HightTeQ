'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Cpu, Package2, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { productsCatalog } from '../products-catalog';

interface ProductDetailPageProps {
  params: { id: string };
}

const parsePrice = (price: string) => {
  const numeric = price.replace(/[^0-9]/g, '');
  return Number(numeric || 0);
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const product = productsCatalog.find((item) => item.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0b1c30] text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-6xl font-black mb-4">404</p>
          <p className="text-xl font-semibold mb-6">Produit non trouvé</p>
          <p className="text-white/60 mb-8">Désolé, le produit que vous cherchez n'existe pas dans notre catalogue.</p>
          <Link href="/produit" className="inline-block px-6 py-3 bg-[#06B6D4] text-[#0b1c30] rounded-xl font-semibold hover:bg-cyan-400 transition">
            Retourner au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b1c30] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
        <Link href="/produit" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#06B6D4]">
          <ArrowLeft className="h-4 w-4" /> Retour au catalogue
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#06B6D4]">
              <Cpu className="h-4 w-4" /> {product.badge}
            </div>

            <div className="flex h-80 items-center justify-center rounded-3xl border border-dashed border-white/15 bg-black/20">
              {product.image ? (
                <div className="h-full w-full rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
              ) : (
                <div className="text-center text-white/60">
                  <Package2 className="mx-auto mb-3 h-12 w-12" />
                  <p>Image à venir</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-lg shadow-black/20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">{product.badge}</p>
            <h1 className="mt-3 text-3xl font-black">{product.title}</h1>

            <div className="mt-6 rounded-2xl border border-[#06B6D4]/20 bg-[#06B6D4]/10 p-4">
              <p className="text-sm text-white/60">Prix</p>
              <p className="mt-1 text-3xl font-black text-[#06B6D4]">{product.price}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Caractéristiques</h2>
              <ul className="mt-4 space-y-3">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#06B6D4]" /> {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button 
                onClick={handleAddToCart}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  added 
                    ? 'bg-cyan-500 text-[#0b1c30]' 
                    : 'bg-[#06B6D4] text-[#0b1c30] hover:bg-cyan-400'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Ajouté au panier !
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" /> Ajouter au panier
                  </>
                )}
              </button>
              <Link href="/produit" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-[#06B6D4] hover:text-white">
                Voir d’autres produits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
