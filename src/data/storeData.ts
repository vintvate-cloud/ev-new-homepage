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

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "PRD-7220",
    name: "72V 30Ah NMC Lithium Battery Pack",
    category: "Lithium Batteries",
    price: "₹24,999",
    oldPrice: "₹29,999",
    discount: "16% OFF",
    compatibility: "Ola S1, Ather 450X, TVS iQube (Custom Fit)",
    warranty: "3 Years Replacement Warranty",
    desc: "High density energy pack with built-in thermal management and battery monitoring system (BMS).",
    specs: [
      { label: "Voltage Class", value: "72V Nominal" },
      { label: "Energy Density", value: "240 Wh/kg" },
      { label: "BMS Configuration", value: "20S8P NMC Cells" },
      { label: "Thermal Limit", value: "Max 65°C Limit" },
    ],
    inStock: true,
    popular: true,
  },
  {
    id: "PRD-6015",
    name: "60V 15A Smart Fast Charger Block",
    category: "Smart Chargers",
    price: "₹3,499",
    oldPrice: "₹4,999",
    discount: "30% OFF",
    compatibility: "Universal 60V Electric Scooters & Bikes",
    warranty: "18 Months Warranty",
    desc: "Fast charging power adapter block with auto-cutoff and temperature sensors.",
    specs: [
      { label: "Efficiency", value: "96.8% Peak" },
      { label: "Cooling", value: "Active Fan Cooled" },
      { label: "Protocol", value: "CAN-Bus v2.1" },
      { label: "Output Voltage", value: "71.4V Max Out" },
    ],
    inStock: true,
    popular: true,
  },
  {
    id: "PRD-CTR-72",
    name: "72V 350A Sine-Wave Motor Controller Unit",
    category: "Motor Controllers",
    price: "₹7,999",
    oldPrice: "₹9,999",
    discount: "20% OFF",
    compatibility: "Revolt RV400, Tork Kratos, Custom 3W Autos",
    warranty: "2 Years OEM Warranty",
    desc: "Advanced digital motor controller unit for smooth power delivery and regenerative braking.",
    specs: [
      { label: "Control Type", value: "Field-Oriented Control (FOC)" },
      { label: "Processor", value: "ARM Cortex-M4 MCU" },
      { label: "Peak Current", value: "Phase Peak 350A" },
      { label: "Regen Module", value: "Multi-Level Variable Regen" },
    ],
    inStock: true,
    popular: true,
  },
  {
    id: "PRD-MOT-3000",
    name: "3kW High-Torque BLDC Hub Motor",
    category: "BLDC Motors",
    price: "₹12,499",
    oldPrice: "₹15,000",
    discount: "17% OFF",
    compatibility: "High-Speed Electric Scooters & Cargo 3W",
    warranty: "2 Years OEM Warranty",
    desc: "IP67 waterproof brushless DC hub motor with high torque output for gradient climbing.",
    specs: [
      { label: "Power Output", value: "3000W Continuous / 4500W Peak" },
      { label: "Ingress Rating", value: "IP67 Submersible Waterproof" },
      { label: "Max Torque", value: "140 Nm Peak Torque" },
      { label: "Efficiency", value: "92% Energy Recovery" },
    ],
    inStock: true,
  },
  {
    id: "PRD-TYR-90",
    name: "Low Rolling Resistance EV Tubeless Tyre (90/90-12)",
    category: "EV Tyres & Wheels",
    price: "₹1,899",
    oldPrice: "₹2,499",
    discount: "24% OFF",
    compatibility: "Ather, Ola, TVS, Hero Electric Scooters",
    warranty: "1 Year Unconditional Warranty",
    desc: "Specialized low rolling resistance rubber compound engineered for maximum electric range and wet grip.",
    specs: [
      { label: "Compound", value: "Low Roll Silica Compound" },
      { label: "Load Index", value: "Load Index 92 (630kg)" },
      { label: "Speed Rating", value: "Rating P (150 km/h)" },
      { label: "Construction", value: "Tubeless Steel Radial" },
    ],
    inStock: true,
  },
  {
    id: "PRD-BRK-DISC",
    name: "Ceramic Quiet-Brake Pads & Floating Disc Rotor Kit",
    category: "Suspension & Brakes",
    price: "₹1,299",
    oldPrice: "₹1,899",
    discount: "31% OFF",
    compatibility: "All Front & Rear Disc Brake EV 2-Wheelers",
    warranty: "6 Months Warranty",
    desc: "High friction heat-resistant ceramic brake pads paired with precision drilled floating rotor.",
    specs: [
      { label: "Material", value: "High-Temp Ceramic Friction" },
      { label: "Disc Size", value: "220mm Stainless Steel Rotor" },
      { label: "Noise Rating", value: "Zero-Squeal Quiet Damping" },
    ],
    inStock: true,
  },
  {
    id: "PRD-DIAG-OBD",
    name: "Autobot OS Pro Bluetooth OBD-II Scanner Tool",
    category: "Diagnostic Scanners",
    price: "₹4,999",
    oldPrice: "₹6,999",
    discount: "28% OFF",
    compatibility: "Universal EV Telematics & CAN-Bus Port",
    warranty: "2 Years Tech Support Warranty",
    desc: "Professional handheld bluetooth OBD scanner connecting directly to Autobot OS for live telemetry.",
    specs: [
      { label: "Connectivity", value: "Bluetooth 5.2 / USB-C" },
      { label: "Protocols", value: "CAN 2.0A/B, J1939, K-Line" },
      { label: "App Integration", value: "Autobot OS Mobile & Desktop" },
    ],
    inStock: true,
    popular: true,
  },
];
