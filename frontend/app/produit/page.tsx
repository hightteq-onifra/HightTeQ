'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check, Search, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productsCatalog } from './products-catalog';

export default function ProduitPage() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof productsCatalog[0] | null>(null);
  const [addedToCartFromModal, setAddedToCartFromModal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = productsCatalog.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: typeof productsCatalog[0]) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleAddToCartFromModal = (product: typeof productsCatalog[0]) => {
    addToCart(product);
    setAddedToCartFromModal(product.id);
    setTimeout(() => setAddedToCartFromModal(null), 2000);
  };
  if (!mounted) {
    return <div className="min-h-screen bg-[#0b1c30]" />;
  }

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

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-64">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            </div>

            <Link 
              href="/dashboard"
              className="px-4 py-2 text-sm font-bold text-[#06B6D4] hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Title Section */}
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">Catalogue Complet</span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-2 mb-4">
              Tous nos Produits Informatiques
            </h1>
            <p className="text-white/60 max-w-2xl">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} disponible{filteredProducts.length !== 1 ? 's' : ''} — Workstations, laptops, smartphones, PC gaming et composants premium.
            </p>
          </div>

          {/* Search Bar Mobile */}
          <div className="mb-8 sm:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#06B6D4]/40 hover:shadow-2xl hover:shadow-[#06B6D4]/10 transition-all group flex flex-col justify-between"
                >
                  {/* Image Section */}
                  <div>
                    <div className="relative h-64 bg-black/40 p-6 flex items-center justify-center overflow-hidden">
                      <span className={`absolute top-4 left-4 z-10 ${product.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                        {product.badge}
                      </span>
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center text-white/40">
                          <p>Image à venir</p>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-3 group-hover:text-[#06B6D4] transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.specs.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-white/70"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="p-6 pt-0 flex flex-col gap-3 border-t border-white/10">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all"
                    >
                      Voir le détail
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer w-full ${
                        addedId === product.id
                          ? 'bg-cyan-500 text-[#0b1c30]'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-4 h-4" /> Ajouté !
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" /> Ajouter
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-white/60 mb-4 text-lg">Aucun produit ne correspond à votre recherche.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 bg-[#06B6D4] text-[#0b1c30] rounded-xl font-semibold hover:bg-cyan-400 transition"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal Détails Produit */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1c30] p-6 shadow-2xl sm:p-8">
            {/* Header Modal */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className={`inline-block ${selectedProduct.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3`}>
                  {selectedProduct.badge}
                </span>
                <h2 className="text-2xl font-black text-white">{selectedProduct.title}</h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-white/10 rounded-xl transition text-white/70 hover:text-white shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Image */}
              <div className="relative h-56 bg-black/40 rounded-2xl p-6 flex items-center justify-center overflow-hidden">
                {selectedProduct.image ? (
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <p className="text-center text-white/40">Image à venir</p>
                )}
              </div>

              {/* Prix */}
              <div className="rounded-2xl border border-[#06B6D4]/20 bg-[#06B6D4]/10 p-4">
                <p className="text-sm text-white/60">Prix</p>
                <p className="mt-1 text-3xl font-black text-[#06B6D4]">{selectedProduct.price}</p>
              </div>

              {/* Spécifications */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Caractéristiques</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-sm font-medium text-white/80"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Boutons Action */}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleAddToCartFromModal(selectedProduct)}
                  className={`w-full text-sm font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    addedToCartFromModal === selectedProduct.id
                      ? 'bg-cyan-500 text-[#0b1c30]'
                      : 'bg-[#06B6D4] text-[#0b1c30] hover:bg-cyan-400'
                  }`}
                >
                  {addedToCartFromModal === selectedProduct.id ? (
                    <>
                      <Check className="w-4 h-4" /> Ajouté au panier !
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" /> Ajouter au panier
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/5"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
