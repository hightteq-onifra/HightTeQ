'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalArticles } = useCart();

  const formatPrice = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' Ar';
  };

  return (
    <div className="bg-[#0b1c30] min-h-screen text-white font-sans p-6 sm:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-[#06B6D4]" />
            <h1 className="text-2xl font-bold">Panier</h1>
          </div>
          <Link href="/dashboard" className="text-sm text-white/70 hover:text-[#06B6D4] flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Continuer mes achats
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 bg-black/40 rounded-xl p-2 shrink-0 border border-white/10 flex items-center justify-center">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-white">{item.title}</h3>
                      <p className="text-xs text-white/50 mb-1">
                        {Array.isArray(item.specs) ? item.specs.join(' • ') : item.specs}
                      </p>
                      <p className="text-xs text-[#06B6D4] font-semibold">
                        Prix unitaire : {formatPrice(item.priceNumeric)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
                    <div className="flex items-center bg-black/40 border border-white/15 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white"
                        title="Réduire"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-10 text-center font-bold text-sm text-[#06B6D4]">{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white"
                        title="Augmenter"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-27.5">
                      <span className="text-[10px] text-white/40 block uppercase">Sous-total</span>
                      <span className="font-extrabold text-white text-base">
                        {formatPrice(item.priceNumeric * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit space-y-4 sticky top-6">
              <h2 className="text-lg font-bold border-b border-white/10 pb-3">Résumé</h2>

              <div className="flex justify-between text-sm text-white/70">
                <span>Nombre total d’articles</span>
                <span className="font-bold text-white">{totalArticles}</span>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="font-bold text-base">Total à payer</span>
                <span className="text-2xl font-black text-[#06B6D4]">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-white/60 mb-4">Votre panier est actuellement vide.</p>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-[#06B6D4] text-[#0b1c30] rounded-xl font-bold text-sm hover:bg-cyan-400 transition-all inline-block"
            >
              Retourner aux produits
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}