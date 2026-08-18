export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  oldPrice: string;
  discount: string;
  compatibility: string;
  warranty: string;
  desc: string;
  specs: { label: string; value: string }[];
  inStock: boolean;
  popular?: boolean;
}

export const STORE_CATEGORIES = [
  "All Products",
  "Lithium Batteries",
  "Smart Chargers",
  "Motor Controllers",
  "BLDC Motors",
  "EV Tyres & Wheels",
  "Suspension & Brakes",
  "Diagnostic Scanners",
];

export const STORE_PRODUCTS: StoreProduct[] = [];
