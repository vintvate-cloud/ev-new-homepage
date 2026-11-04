import React from "react";
import { motion } from "framer-motion";
import { Truck, Bike, Car, ShieldCheck } from "lucide-react";

interface FleetVehicle {
  name: string;
  category: "2W Delivery" | "3W Cargo" | "Passenger Shuttle";
  image: string;
  specs: string;
  badge: string;
}

const FLEET_VEHICLES: FleetVehicle[] = [
  {
    name: "Mahindra Treo Zor",
    category: "3W Cargo",
    image: "/models/3W/mahindra/treo-zor.jpg",
    specs: "550 kg Payload • 125 km Range",
    badge: "L5 Cargo Standard",
  },
  {
    name: "Ather 450X Commercial",
    category: "2W Delivery",
    image: "/models/2W/ather/450x.jpg",
    specs: "3.7 kWh Battery • Fast Charge Ready",
    badge: "Quick-Commerce Spec",
  },
  {
    name: "Piaggio Ape E-City",
    category: "Passenger Shuttle",
    image: "/models/3W/piaggio/ape-e-city.webp",
    specs: "Swappable / Fixed Pack • High Torque",
    badge: "Urban Passenger",
  },
  {
    name: "Ola S1 Pro Fleet",
    category: "2W Delivery",
    image: "/models/2W/ola/s1-pro.jpg",
    specs: "4.0 kWh Pack • 180 km IDC Range",
    badge: "Hyper-Delivery",
  },
  {
    name: "TVS iQube Commercial",
    category: "2W Delivery",
    image: "/models/2W/tvs/iqube.jpg",
    specs: "3.4 kWh Pack • IP67 Sealed",
    badge: "Last-Mile Courier",
  },
  {
    name: "Bajaj Chetak Fleet",
    category: "2W Delivery",
    image: "/models/2W/bajaj/chetak.jpg",
    specs: "All-Metal Body • Robust Suspension",
    badge: "Shift Endurance",
  },
  {
    name: "Kinetic Green Safar",
    category: "3W Cargo",
    image: "/models/3W/kinetic-green/safar.webp",
    specs: "High Ground Clearance • Heavy Duty",
    badge: "Intra-City Logistics",
  },
];

export function FleetVehicleMarquee() {
  return (
    <div className="w-full py-8 bg-[#040805] border-y border-white/10 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-6 mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono text-[#00D084] uppercase tracking-widest font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
          Multi-Brand Commercial EV Compatibility Matrix
        </span>
        <span className="text-[10px] font-mono text-white/40 uppercase">
          Unified Diagnostics across Electric 2W, 3W &amp; L5 Cargo
        </span>
      </div>

      {/* Infinite Scrolling Vehicle Cards */}
      <div className="flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          className="flex items-center gap-6 shrink-0 py-2"
        >
          {[...FLEET_VEHICLES, ...FLEET_VEHICLES].map((v, i) => (
            <div
              key={`${v.name}-${i}`}
              className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00D084]/40 transition-all shrink-0 w-[290px] group shadow-lg"
            >
              <div className="w-16 h-14 rounded-xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center p-1 shrink-0">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-all duration-300"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-[#00D084]/15 text-[#00D084] text-[9px] font-mono font-bold uppercase truncate">
                    {v.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#00D084] transition-colors truncate">
                  {v.name}
                </h4>
                <p className="text-[10px] text-white/50 font-mono truncate mt-0.5">
                  {v.specs}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

