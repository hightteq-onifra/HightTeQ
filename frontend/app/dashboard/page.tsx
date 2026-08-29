'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  ArrowRight, 
  MessageCircle, 
  Wrench, 
  Network, 
  Cpu, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  User,
  LogOut,
  Check
} from 'lucide-react';
import { useCart, Product } from '../context/CartContext';

export default function UserDashboard() {
  const router = useRouter();
  const { addToCart, totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    setIsProfileOpen(false);
    router.push('/login');
  };

  // Sécurité SSR / Hydratation pour Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  const products: Product[] = [
    {
      id: '1',
      title: 'ThinkPad X1 Carbon Gen 11',
      badge: 'WORKSTATION',
      badgeColor: 'bg-[#06B6D4]',
      specs: ['Intel i7-13th', '32GB LPDDR5', '1TB NVMe'],
      price: '5.850.000 Ar',
      image: '/img/ThinkPad X1 Carbon Gen 11.png',
    },
    {
      id: '2',
      title: 'Galaxy S23 Ultra 5G',
      badge: 'PREMIUM',
      badgeColor: 'bg-[#004ac6]',
      specs: ['Snapdragon 8 Gen 2', '12GB RAM', '512GB Storage'],
      price: '4.350.000 Ar',
      image: '/img/Galaxy S23 Ultra 5G.png',
    },
    {
      id: '3',
      title: 'HighTeQ Pro Build v3',
      badge: 'POWER DESKTOP',
      badgeColor: 'bg-purple-600',
      specs: ['Ryzen 9 7900X', '64GB DDR5', '2TB Gen4 SSD'],
      price: '8.900.000 Ar',
      image: '/img/HighTeQ Pro Build v3.png',
    }
  ];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Empêche le déséquilibre HTML entre serveur et client
  if (!mounted) {
    return <div className="min-h-screen bg-[#0b1c30]" />;
  }

  return (
    <div className="bg-[#0b1c30] min-h-screen text-white font-sans w-full">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0b1c30]/90 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          <div className="flex items-center gap-10">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#004ac6] to-[#06B6D4] flex items-center justify-center text-white font-black text-base shadow-lg group-hover:scale-105 transition-transform">
                HT
              </div>
              <span className="font-extrabold text-2xl tracking-wide">
                HighTeQ <span className="text-[#06B6D4]">Madagascar</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-white/90">
              <Link href="/produit" className="hover:text-[#06B6D4] transition-colors py-2">
                Tous les Produits
              </Link>
              <Link href="/produit?cat=ordinateurs" className="hover:text-[#06B6D4] transition-colors py-2">
                Ordinateurs
              </Link>
              <Link href="/produit?cat=telephonie" className="hover:text-[#06B6D4] transition-colors py-2">
                Téléphonie
              </Link>
              <Link href="/services" className="hover:text-[#06B6D4] transition-colors py-2">
                Services IT
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative hidden md:block w-72">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            </div>

            <Link href="/panier" className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
              <ShoppingCart className="w-5 h-5 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#06B6D4] text-[#0b1c30] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0b1c30]">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="relative pl-3 border-l border-white/15">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 p-[2px] shadow-md">
                  <div className="w-full h-full bg-[#0b1c30] rounded-full flex items-center justify-center font-extrabold text-sm text-[#06B6D4]">
                    U
                  </div>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#071324] border border-white/15 rounded-2xl shadow-2xl py-2.5 z-50">
                  <div className="px-5 py-3 border-b border-white/10">
                    <p className="text-sm font-bold text-white">Utilisateur HighTeQ</p>
                    <p className="text-xs text-white/50 truncate">user@highteq.mg</p>
                  </div>
                  <Link 
                    href="/profil" 
                    className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4 text-[#06B6D4]" />
                    Mon Profil
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full">

        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-5rem)] py-20 flex items-center border-b border-white/10">
          <div className="absolute inset-0 z-0">
            <Image
              src="/img/fond.jpg"
              alt="Fond Réseau HighTeQ"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-left">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
              L'Excellence <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-blue-400 to-cyan-200">
                Technologique
              </span> <br />
              à votre portée.
            </h1>

            <p className="text-base sm:text-lg text-white max-w-xl font-medium leading-relaxed mb-8 drop-shadow-md">
              Accédez à nos équipements informatiques certifiés et bénéficiez de nos services d'assistance et de maintenance d'experts à Madagascar.
            </p>

            <div className="flex flex-wrap items-center justify-start gap-4">
              <Link
                href="/produit"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#004ac6] to-[#06B6D4] hover:from-[#003bb0] hover:to-[#059abb] text-white font-bold text-sm shadow-lg shadow-[#004ac6]/30 hover:shadow-[#06B6D4]/40 hover:-translate-y-0.5 transition-all flex items-center gap-3 group"
              >
                DÉCOUVRIR LES PRODUITS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="px-8 py-4 rounded-xl bg-black/40 hover:bg-black/60 border border-white/30 text-white font-bold text-sm backdrop-blur-md transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                NOS SERVICES TECH
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="py-12 bg-black/20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link 
              href="/produit"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 hover:border-[#06B6D4]/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-8 text-[#06B6D4]/20 group-hover:text-[#06B6D4]/40 transition-colors">
                <Cpu className="w-24 h-24" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">Catalogue Matériel</span>
              <h3 className="text-2xl font-bold mt-2 mb-3 group-hover:text-[#06B6D4] transition-colors">Explorer la Boutique Tech</h3>
              <p className="text-white/60 text-sm max-w-sm mb-6">
                Workstations, Laptops professionnels, smartphones et composants sur-mesure sous garantie.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#06B6D4]">
                Voir les produits <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link 
              href="/services"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 hover:border-[#004ac6]/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-8 text-[#004ac6]/20 group-hover:text-[#004ac6]/40 transition-colors">
                <Wrench className="w-24 h-24" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#004ac6]">Solutions & Expertise</span>
              <h3 className="text-2xl font-bold mt-2 mb-3 group-hover:text-blue-400 transition-colors">Nos Services Informatiques</h3>
              <p className="text-white/60 text-sm max-w-sm mb-6">
                Maintenance préventive, déploiement d'architectures réseau et réparations matérielles express.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#004ac6] group-hover:text-blue-400">
                Découvrir nos services <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">Sélection Spéciale</span>
                <h2 className="text-3xl font-extrabold tracking-tight mt-1">Produits Vedettes</h2>
              </div>
              <Link 
                href="/produit" 
                className="text-sm font-bold text-[#06B6D4] hover:underline flex items-center gap-1 group"
              >
                Tout le catalogue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#06B6D4]/40 hover:shadow-2xl hover:shadow-[#06B6D4]/10 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 bg-black/40 p-6 flex items-center justify-center overflow-hidden">
                      <span className={`absolute top-4 left-4 z-10 ${item.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                        {item.badge}
                      </span>
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-3 group-hover:text-[#06B6D4] transition-colors">{item.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.specs.map((spec, i) => (
                          <span key={i} className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-white/70">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-white/10 mt-auto">
                    <div>
                      <span className="text-xs text-white/40 block">Prix</span>
                      <span className="text-xl font-extrabold text-[#06B6D4]">{item.price}</span>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className={`text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all active:scale-95 cursor-pointer ${
                        addedId === item.id 
                          ? 'bg-cyan-500 text-[#0b1c30]' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                      }`}
                    >
                      {addedId === item.id ? (
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
          </div>
        </section>

        {/* Services Highlight */}
        <section className="py-20 bg-black/30 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">Accompagnement Pro</span>
              <h2 className="text-3xl font-extrabold mt-1 mb-4">Nos Services d'Experts</h2>
              <p className="text-white/60 text-sm">
                Des solutions techniques adaptées aux besoins des particuliers et des entreprises à Madagascar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#06B6D4]/50 transition-colors text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Wrench className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Maintenance & Optimisation</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Nettoyage complet, dépannage, mise à niveau matérielle et logiciels pour garantir des performances optimales.
                </p>
                <Link href="/services" className="text-xs font-bold text-[#06B6D4] hover:underline inline-flex items-center gap-1">
                  En savoir plus <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#06B6D4]/50 transition-colors text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Network className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Installation Réseau</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Conception et mise en place d'infrastructures réseau haut débit et sécurisées pour votre entreprise.
                </p>
                <Link href="/services" className="text-xs font-bold text-[#06B6D4] hover:underline inline-flex items-center gap-1">
                  En savoir plus <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#06B6D4]/50 transition-colors text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Réparation Express</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Diagnostic gratuit et réparation rapide de laptops, pc de bureau et smartphones par nos techniciens certifiés.
                </p>
                <Link href="/services" className="text-xs font-bold text-[#06B6D4] hover:underline inline-flex items-center gap-1">
                  En savoir plus <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Section */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-950/60 via-emerald-900/40 to-slate-900/80 border border-emerald-500/30 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                <MessageCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Besoin d'un conseil en direct ?</h3>
                <p className="text-white/70 text-sm">Discutez immédiatement avec nos experts HighTeQ sur WhatsApp.</p>
              </div>
            </div>
            <a 
              href="https://wa.me/261340110298" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 shrink-0"
            >
              <MessageCircle className="w-5 h-5" /> CONTACTER SUR WHATSAPP
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#071324] border-t border-white/10 pt-16 pb-8 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#004ac6] flex items-center justify-center font-bold text-white text-sm">
                HT
              </div>
              <span className="font-bold text-xl tracking-wide">HighTeQ</span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed max-w-sm">
              Votre destination technologique de confiance à Madagascar. Vente de matériel informatique haut de gamme et services informatiques sur-mesure.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-[#06B6D4] mb-4 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><Link href="/produit" className="hover:text-white transition-colors">Catalogue Général</Link></li>
              <li><Link href="/produit?cat=ordinateurs" className="hover:text-white transition-colors">Ordinateurs Portables & Fixes</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services & Maintenance</Link></li>
              <li><Link href="/panier" className="hover:text-white transition-colors">Mon Panier</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-[#06B6D4] mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#06B6D4]" />
                Antananarivo 101, Madagascar
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#06B6D4]" />
                +261 34 01 102 98
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#06B6D4]" />
                contact@highteq.mg
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/5 text-center text-xs text-white/40">
          © {new Date().getFullYear()} HighTeQ Madagascar. Tous droits réservés.
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/261340110298" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center shadow-emerald-500/30"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}