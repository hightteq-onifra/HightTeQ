import { Product } from '../context/CartContext';

export const productsCatalog: Product[] = [
  // Ordinateurs Portables
  {
    id: '1',
    title: 'ThinkPad X1 Carbon Gen 11',
    badge: 'WORKSTATION',
    badgeColor: 'bg-[#06B6D4]',
    specs: ['Intel i7-1365U', '32GB RAM', '1TB NVMe'],
    price: '5.850.000 Ar',
    image: '/img/ThinkPad X1 Carbon Gen 11.png',
  },
  {
    id: '2',
    title: 'Dell Latitude 7440',
    badge: 'BUSINESS',
    badgeColor: 'bg-[#004ac6]',
    specs: ['Intel i5-1345U', '16GB RAM', '512GB SSD'],
    price: '4.950.000 Ar',
    image: '/img/Dell Latitude 7440.png',
  },
  {
    id: '3',
    title: 'HP EliteBook 840 G10',
    badge: 'PREMIUM',
    badgeColor: 'bg-blue-600',
    specs: ['Intel i5-1335U', '16GB RAM', '512GB SSD'],
    price: '4.700.000 Ar',
    image: '/img/HP EliteBook 840 G10.png',
  },
  {
    id: '4',
    title: 'Lenovo Legion 7i',
    badge: 'GAMING',
    badgeColor: 'bg-red-600',
    specs: ['Intel i7-13700HX', '32GB RAM', '1TB SSD'],
    price: '7.800.000 Ar',
    image: '/img/Lenovo Legion 7i.png',
  },
  {
    id: '5',
    title: 'ASUS ROG Zephyrus G14',
    badge: 'GAMING',
    badgeColor: 'bg-red-600',
    specs: ['Ryzen 9 7940HS', '32GB RAM', '1TB SSD'],
    price: '6.900.000 Ar',
    image: '/img/ASUS ROG Zephyrus G14.png',
  },
  {
    id: '6',
    title: 'MacBook Pro 14',
    badge: 'PREMIUM',
    badgeColor: 'bg-gray-700',
    specs: ['Apple M3 Pro', '18GB RAM', '512GB SSD'],
    price: '9.400.000 Ar',
    image: '/img/MacBook Pro 14.png',
  },

  // Téléphones
  {
    id: '7',
    title: 'iPhone 15 Pro',
    badge: 'PREMIUM',
    badgeColor: 'bg-gray-700',
    specs: ['A17 Pro', '8GB RAM', '256GB'],
    price: '4.300.000 Ar',
    image: '/img/iPhone 15 Pro.png',
  },
  {
    id: '8',
    title: 'Galaxy S24 Ultra',
    badge: 'FLAGSHIP',
    badgeColor: 'bg-[#004ac6]',
    specs: ['Snapdragon 8 Gen 3', '12GB RAM', '512GB'],
    price: '4.650.000 Ar',
    image: '/img/Galaxy S24 Ultra.png',
  },
  {
    id: '9',
    title: 'Pixel 8 Pro',
    badge: 'ANDROID',
    badgeColor: 'bg-green-600',
    specs: ['Tensor G3', '12GB RAM', '256GB'],
    price: '3.900.000 Ar',
    image: '/img/Pixel 8 Pro.png',
  },

  // PC de Bureau
  {
    id: '10',
    title: 'Alienware Aurora R16',
    badge: 'GAMING DESKTOP',
    badgeColor: 'bg-red-600',
    specs: ['Intel i7-14700F', '32GB RAM', '1TB SSD'],
    price: '8.300.000 Ar',
    image: '/img/Alienware Aurora R16.png',
  },
  {
    id: '11',
    title: 'HP Omen 45L',
    badge: 'POWER DESKTOP',
    badgeColor: 'bg-purple-600',
    specs: ['Ryzen 7 7800X3D', '32GB RAM', '2TB SSD'],
    price: '9.100.000 Ar',
    image: '/img/HP Omen 45L.png',
  },

  // Station de Travail
  {
    id: '12',
    title: 'Lenovo ThinkStation P3',
    badge: 'WORKSTATION',
    badgeColor: 'bg-[#06B6D4]',
    specs: ['Intel Xeon W', '32GB RAM', '1TB SSD'],
    price: '7.200.000 Ar',
    image: '/img/Lenovo ThinkStation P3.png',
  },

  // Écrans
  {
    id: '13',
    title: 'Dell UltraSharp U4025QW',
    badge: 'ULTRA WIDE',
    badgeColor: 'bg-[#06B6D4]',
    specs: ['40 pouces', '5K', 'USB-C'],
    price: '3.450.000 Ar',
    image: '/img/Dell UltraSharp U4025QW.png',
  },
  {
    id: '14',
    title: 'LG UltraGear 27GP850',
    badge: 'GAMING MONITOR',
    badgeColor: 'bg-red-600',
    specs: ['27 pouces', 'QHD', '165Hz'],
    price: '1.650.000 Ar',
    image: '/img/LG UltraGear 27GP850.png',
  },

  // Périphériques
  {
    id: '15',
    title: 'Logitech MX Master 3S',
    badge: 'PREMIUM MOUSE',
    badgeColor: 'bg-[#06B6D4]',
    specs: ['Bluetooth', 'Ultra Silent', '6 Buttons'],
    price: '650.000 Ar',
    image: '/img/Logitech MX Master 3S.png',
  },
  {
    id: '16',
    title: 'Corsair K70 RGB Pro',
    badge: 'GAMING KEYBOARD',
    badgeColor: 'bg-red-600',
    specs: ['Mechanical', 'Cherry MX', 'RGB'],
    price: '720.000 Ar',
    image: '/img/Corsair K70 RGB Pro.png',
  },

  // Stockage Réseau
  {
    id: '17',
    title: 'Synology DS224+',
    badge: 'NAS',
    badgeColor: 'bg-[#06B6D4]',
    specs: ['2 Bays', '2GB RAM', 'DiskStation'],
    price: '2.300.000 Ar',
    image: '/img/Synology DS224+.png',
  },

  // Réseau
  {
    id: '18',
    title: 'Ubiquiti UniFi Dream Machine Pro',
    badge: 'NETWORK PRO',
    badgeColor: 'bg-orange-600',
    specs: ['Router', 'Switch', 'Security Gateway'],
    price: '3.100.000 Ar',
    image: '/img/Ubiquiti UniFi Dream Machine Pro.png',
  },

  // Stockage
  {
    id: '19',
    title: 'WD Black SN850X',
    badge: 'STORAGE',
    badgeColor: 'bg-yellow-600',
    specs: ['2TB', 'NVMe PCIe 4.0', '7000MB/s'],
    price: '480.000 Ar',
    image: '/img/WD Black SN850X.png',
  },

  // Mémoire
  {
    id: '20',
    title: 'Kingston Fury Beast DDR5',
    badge: 'MEMORY',
    badgeColor: 'bg-purple-600',
    specs: ['32GB', 'DDR5', '6000MHz'],
    price: '360.000 Ar',
    image: '/img/Kingston Fury Beast DDR5.png',
  },

  // Alimentation
  {
    id: '21',
    title: 'Corsair RM1000x',
    badge: 'POWER SUPPLY',
    badgeColor: 'bg-blue-600',
    specs: ['1000W', 'Modular', '80+ Gold'],
    price: '850.000 Ar',
    image: '/img/Corsair RM1000x.png',
  },
];
