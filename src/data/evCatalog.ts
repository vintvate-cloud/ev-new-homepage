export type EvCategory = '2W' | '3W' | '4W';

export interface EvModelCatalogItem {
  id: string;
  category: EvCategory;
  make: string;
  model: string;
  batteryKwh?: number;
  motorKw?: number;
  ratedRangeKm?: number;
  topSpeedKmh?: number;
  chargerType?: string;
  logoUrl?: string;
  modelImageUrl?: string;
}

export const EV_BRANDS_POPULAR = [
  // ── 2-Wheelers ──────────────────────────────────────────────────────────
  { name: 'Ola Electric', displayName: 'Ola Electric', category: '2W', logoUrl: '/brands/ola.jpeg', icon: '🛵' },
  { name: 'Ather Energy', displayName: 'Ather Energy', category: '2W', logoUrl: '/brands/ather.jpeg', icon: '⚡' },
  { name: 'TVS EV', displayName: 'TVS EV', category: '2W', logoUrl: '/brands/tvs.webp', icon: '🏍️' },
  { name: 'Bajaj Chetak', displayName: 'Bajaj Chetak', category: '2W', logoUrl: '/brands/bajaj.png', icon: '🛵' },
  { name: 'Hero Electric', displayName: 'Hero Electric', category: '2W', logoUrl: '/brands/hero-electric.jpeg', icon: '🛵' },
  { name: 'Revolt Motors', displayName: 'Revolt Motors', category: '2W', logoUrl: '/brands/revolt.webp', icon: '⚡' },
  { name: 'Ampere EV', displayName: 'Ampere EV', category: '2W', logoUrl: '/brands/ampere.jpg', icon: '🛵' },
  { name: 'Simple Energy', displayName: 'Simple Energy', category: '2W', logoUrl: '/brands/simple-energy.jpg', icon: '🛵' },
  { name: 'Tork Motors', displayName: 'Tork Motors', category: '2W', logoUrl: '/brands/tork.png', icon: '⚡' },
  { name: 'Ola Electric EV', displayName: 'Ola Electric EV', category: '2W', logoUrl: '/brands/ola.jpeg', icon: '🛵' },
  { name: 'TVS Motor EV', displayName: 'TVS Motor EV', category: '2W', logoUrl: '/brands/tvs.webp', icon: '🏍️' },
  { name: 'Bajaj Auto EV', displayName: 'Bajaj Auto EV', category: '2W', logoUrl: '/brands/bajaj.png', icon: '🛵' },
  { name: 'Hero MotoCorp EV', displayName: 'Hero MotoCorp EV', category: '2W', logoUrl: '/brands/hero-electric.jpeg', icon: '🛵' },
  { name: 'Revolt Motors EV', displayName: 'Revolt Motors EV', category: '2W', logoUrl: '/brands/revolt.webp', icon: '⚡' },
  { name: 'Ampere Vehicles EV', displayName: 'Ampere Vehicles EV', category: '2W', logoUrl: '/brands/ampere.jpg', icon: '🛵' },
  { name: 'Okinawa Autotech EV', displayName: 'Okinawa Autotech EV', category: '2W', logoUrl: '/brands/okinawa-autotech.jpeg', icon: '🛵' },
  { name: 'Ather Energy EV', displayName: 'Ather Energy EV', category: '2W', logoUrl: '/brands/ather.jpeg', icon: '⚡' },

  // ── 3-Wheelers ──────────────────────────────────────────────────────────
  { name: 'Mahindra Electric', displayName: 'Mahindra Electric', category: '3W', logoUrl: '/brands/mahindra.jpeg', icon: '🛺' },
  { name: 'Piaggio Ape EV', displayName: 'Piaggio Ape EV', category: '3W', logoUrl: '/brands/piaggio.jpeg', icon: '🛺' },
  { name: 'Kinetic Green EV', displayName: 'Kinetic Green EV', category: '3W', logoUrl: '/brands/atul-auto-limited.webp', icon: '🛺' },
];

export const EV_CATALOG: EvModelCatalogItem[] = [
  // ── 2-Wheelers ──────────────────────────────────────────────────────────
  { id: 'ola-s1-pro', category: '2W', make: 'Ola', model: 'S1 Pro', batteryKwh: 3.97, motorKw: 8.5, ratedRangeKm: 170, topSpeedKmh: 120, logoUrl: '/brands/ola.jpeg', modelImageUrl: '/models/2W/ola/s1-pro.jpg' },
  { id: 'ola-s1-air', category: '2W', make: 'Ola', model: 'S1 Air', batteryKwh: 2.5, motorKw: 4.5, ratedRangeKm: 101, topSpeedKmh: 90, logoUrl: '/brands/ola.jpeg', modelImageUrl: '/models/2W/ola/s1-air.jpg' },
  { id: 'ola-s1-x', category: '2W', make: 'Ola', model: 'S1 X', batteryKwh: 3.0, motorKw: 6.0, ratedRangeKm: 151, topSpeedKmh: 90, logoUrl: '/brands/ola.jpeg', modelImageUrl: '/models/2W/ola/s1-x.jpg' },

  { id: 'ather-450x', category: '2W', make: 'Ather', model: '450X', batteryKwh: 3.7, motorKw: 6.4, ratedRangeKm: 146, topSpeedKmh: 90, logoUrl: '/brands/ather.jpeg', modelImageUrl: '/models/2W/ather/450x.jpg' },
  { id: 'ather-450s', category: '2W', make: 'Ather', model: '450S', batteryKwh: 2.9, motorKw: 5.4, ratedRangeKm: 115, topSpeedKmh: 90, logoUrl: '/brands/ather.jpeg', modelImageUrl: '/models/2W/ather/450s.jpg' },
  { id: 'ather-rizta', category: '2W', make: 'Ather', model: 'Rizta Z', batteryKwh: 3.7, motorKw: 4.3, ratedRangeKm: 159, topSpeedKmh: 80, logoUrl: '/brands/ather.jpeg', modelImageUrl: '/models/2W/ather/450x.jpg' },

  { id: 'tvs-iqube', category: '2W', make: 'TVS', model: 'iQube', batteryKwh: 3.4, motorKw: 4.4, ratedRangeKm: 100, topSpeedKmh: 78, logoUrl: '/brands/tvs.webp', modelImageUrl: '/models/2W/tvs/iqube.jpg' },
  { id: 'tvs-iqube-s', category: '2W', make: 'TVS', model: 'iQube S', batteryKwh: 3.4, motorKw: 4.4, ratedRangeKm: 100, topSpeedKmh: 78, logoUrl: '/brands/tvs.webp', modelImageUrl: '/models/2W/tvs/iqube.jpg' },
  { id: 'tvs-x', category: '2W', make: 'TVS', model: 'X', batteryKwh: 4.44, motorKw: 11.0, ratedRangeKm: 140, topSpeedKmh: 105, logoUrl: '/brands/tvs.webp', modelImageUrl: '/models/2W/tvs/iqube.jpg' },

  { id: 'bajaj-chetak', category: '2W', make: 'Bajaj', model: 'Chetak Premium', batteryKwh: 3.2, motorKw: 4.1, ratedRangeKm: 108, topSpeedKmh: 73, logoUrl: '/brands/bajaj.png', modelImageUrl: '/models/2W/bajaj/chetak.jpg' },
  { id: 'bajaj-chetak-2901', category: '2W', make: 'Bajaj', model: 'Chetak 2901', batteryKwh: 2.88, motorKw: 4.0, ratedRangeKm: 123, topSpeedKmh: 63, logoUrl: '/brands/bajaj.png', modelImageUrl: '/models/2W/bajaj/chetak.jpg' },

  { id: 'hero-vida-v1', category: '2W', make: 'Hero Electric', model: 'Vida V1 Pro', batteryKwh: 3.44, motorKw: 6.0, ratedRangeKm: 143, topSpeedKmh: 80, logoUrl: '/brands/hero-electric.jpeg', modelImageUrl: '/brands/hero-electric.jpeg' },
  { id: 'hero-optima', category: '2W', make: 'Hero Electric', model: 'Optima CX', batteryKwh: 3.0, motorKw: 1.2, ratedRangeKm: 140, topSpeedKmh: 55, logoUrl: '/brands/hero-electric.jpeg', modelImageUrl: '/brands/hero-electric.jpeg' },

  { id: 'ampere-primus', category: '2W', make: 'Ampere', model: 'Primus', batteryKwh: 2.3, motorKw: 3.0, ratedRangeKm: 107, topSpeedKmh: 77, logoUrl: '/brands/ampere.jpg', modelImageUrl: '/brands/ampere.jpg' },
  { id: 'ampere-nexus', category: '2W', make: 'Ampere', model: 'Nexus', batteryKwh: 3.0, motorKw: 4.0, ratedRangeKm: 136, topSpeedKmh: 93, logoUrl: '/brands/ampere.jpg', modelImageUrl: '/brands/ampere.jpg' },

  { id: 'revolt-rv400', category: '2W', make: 'Revolt', model: 'RV400', batteryKwh: 3.24, motorKw: 3.0, ratedRangeKm: 150, topSpeedKmh: 85, logoUrl: '/brands/revolt.webp', modelImageUrl: '/brands/revolt.webp' },
  { id: 'revolt-rv400-brz', category: '2W', make: 'Revolt', model: 'RV400 BRZ', batteryKwh: 3.24, motorKw: 3.0, ratedRangeKm: 150, topSpeedKmh: 85, logoUrl: '/brands/revolt.webp', modelImageUrl: '/brands/revolt.webp' },

  { id: 'simple-one', category: '2W', make: 'Simple Energy', model: 'One', batteryKwh: 5.0, motorKw: 8.5, ratedRangeKm: 212, topSpeedKmh: 105, logoUrl: '/brands/simple-energy.jpg', modelImageUrl: '/brands/simple-energy.jpg' },

  { id: 'tork-kratos-r', category: '2W', make: 'Tork', model: 'Kratos R', batteryKwh: 4.0, motorKw: 9.0, ratedRangeKm: 180, topSpeedKmh: 105, logoUrl: '/brands/tork.png', modelImageUrl: '/brands/tork.png' },

  { id: 'okinawa-praise-pro', category: '2W', make: 'Okinawa', model: 'Praise Pro', batteryKwh: 2.0, motorKw: 2.5, ratedRangeKm: 88, topSpeedKmh: 56, logoUrl: '/brands/okinawa-autotech.jpeg', modelImageUrl: '/brands/okinawa-autotech.jpeg' },

  // ── 3-Wheelers ──────────────────────────────────────────────────────────
  { id: 'mahindra-treo', category: '3W', make: 'Mahindra', model: 'Treo Auto', batteryKwh: 7.37, motorKw: 8.0, ratedRangeKm: 130, topSpeedKmh: 55, logoUrl: '/brands/mahindra.jpeg', modelImageUrl: '/models/3W/mahindra/treo.jpg' },
  { id: 'mahindra-treo-zor', category: '3W', make: 'Mahindra', model: 'Treo Zor Cargo', batteryKwh: 7.37, motorKw: 8.0, ratedRangeKm: 125, topSpeedKmh: 50, logoUrl: '/brands/mahindra.jpeg', modelImageUrl: '/models/3W/mahindra/treo-zor.jpg' },

  { id: 'piaggio-ape-e-city', category: '3W', make: 'Piaggio', model: 'Ape E-City', batteryKwh: 5.0, motorKw: 5.5, ratedRangeKm: 80, topSpeedKmh: 45, logoUrl: '/brands/piaggio.jpeg', modelImageUrl: '/models/3W/piaggio/ape-e-city.webp' },
  { id: 'piaggio-ape-e-extra', category: '3W', make: 'Piaggio', model: 'Ape E-Extra Cargo', batteryKwh: 8.0, motorKw: 9.5, ratedRangeKm: 95, topSpeedKmh: 45, logoUrl: '/brands/piaggio.jpeg', modelImageUrl: '/models/3W/piaggio/ape-e-city.webp' },

  { id: 'bajaj-re-ev', category: '3W', make: 'Bajaj', model: 'RE EV Auto', batteryKwh: 6.2, motorKw: 6.5, ratedRangeKm: 120, topSpeedKmh: 55, logoUrl: '/brands/bajaj.png', modelImageUrl: '/models/3W/bajaj/re-ev.jpg' },

  { id: 'kinetic-safar', category: '3W', make: 'Kinetic Green', model: 'Safar Smart', batteryKwh: 5.6, motorKw: 5.0, ratedRangeKm: 100, topSpeedKmh: 45, logoUrl: '/brands/atul-auto-limited.webp', modelImageUrl: '/models/3W/kinetic-green/safar.webp' },
];

export const BRAND_LOGO_MAP: Record<string, string> = {
  tata: '/brands/tata.webp',
  ola: '/brands/ola.jpeg',
  ather: '/brands/ather.jpeg',
  tvs: '/brands/tvs.webp',
  bajaj: '/brands/bajaj.png',
  mahindra: '/brands/mahindra.jpeg',
  mg: '/brands/mg.webp',
  'hero electric': '/brands/hero-electric.jpeg',
  revolt: '/brands/revolt.webp',
  ampere: '/brands/ampere.jpg',
  piaggio: '/brands/piaggio.jpeg',
  hyundai: '/brands/hyundai.webp',
  'simple energy': '/brands/simple-energy.jpg',
  tork: '/brands/tork.png',
  okinawa: '/brands/okinawa-autotech.jpeg',
  volvo: '/brands/Volvo.webp',
};

export const getBrandLogoUrl = (brandName: string): string | undefined => {
  if (!brandName) return undefined;
  const key = brandName.trim().toLowerCase();
  if (BRAND_LOGO_MAP[key]) return BRAND_LOGO_MAP[key];
  for (const [k, v] of Object.entries(BRAND_LOGO_MAP)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return undefined;
};

export const DIRECT_FRANCHISE_SERVICE = {
  id: 'direct-franchise-visit',
  title: 'Direct Franchise Visit / General Inspection',
  price: '₹199',
  basePrice: 199,
  duration: '30 mins',
  description: "Don't know what's wrong? Our expert technicians will diagnose your EV at the franchise center.",
};

export const BOOKING_SERVICES_LIST = [
  DIRECT_FRANCHISE_SERVICE,
  { id: 'battery-check', title: 'Battery & BMS Health Check', price: '₹499', basePrice: 499, duration: '45 mins', description: 'Comprehensive diagnostic scan of battery health, SOC, SOH & cell balancing.' },
  { id: 'periodic-maint', title: 'Periodic Maintenance Service', price: '₹799', basePrice: 799, duration: '60 mins', description: 'Complete 30-point checkup, lubrication, brake tuning & software check.' },
  { id: 'motor-controller', title: 'Motor & Controller Diagnostic', price: '₹599', basePrice: 599, duration: '45 mins', description: 'Diagnostic test for electric motor responsiveness, hall sensors & controller unit.' },
  { id: 'ac-thermal', title: 'AC & Thermal Management', price: '₹899', basePrice: 899, duration: '60 mins', description: 'Thermal cooling system checkup, radiator inspection and coolant top-up.' },
  { id: 'brake-suspension', title: 'Brake & Suspension Overhaul', price: '₹699', basePrice: 699, duration: '50 mins', description: 'Brake pad replacement, disc inspection, hydraulic fluid flush & suspension tuning.' },
  { id: 'wire-harness', title: 'Wire-Harness & Connector Audit', price: '₹549', basePrice: 549, duration: '40 mins', description: 'High-voltage cable inspection, terminal crimping & isolation testing.' },
  { id: 'full-diagnostics', title: 'Full EV Diagnostics Scan', price: '₹999', basePrice: 999, duration: '60 mins', description: 'Full OBD-II ECU error log extraction, sensor calibration & firmware audit.' },
];
