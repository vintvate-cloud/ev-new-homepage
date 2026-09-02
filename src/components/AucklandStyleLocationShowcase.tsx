import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Share2, Plus, Minus, Navigation, MapPin } from "lucide-react";

interface HubLocation {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  area: string;
  coords: [number, number]; // [lat, lng]
}

const HUBS_DATA: HubLocation[] = [
  {
    id: "h1",
    name: "EV PRO Kharadi Master Hub",
    phone: "+91 1800 123 4567",
    email: "pune.hub@myevservice.com",
    address: "SR No. 82/1, Plot No. 5, Kharadi, Near EON IT Park Phase 1, Pune 411014, Maharashtra",
    city: "Pune",
    area: "Kharadi EON Park",
    coords: [18.5515, 73.9458],
  },
  {
    id: "h2",
    name: "EV PRO Baner High Street Hub",
    phone: "+91 1800 123 4568",
    email: "baner.hub@myevservice.com",
    address: "Plot No. 14, Main High Street Road, Opposite Synergia, Baner, Pune 411045, Maharashtra",
    city: "Pune",
    area: "Baner High Street",
    coords: [18.559, 73.7868],
  },
  {
    id: "h3",
    name: "EV PRO Hadapsar Magarpatta Hub",
    phone: "+91 1800 123 4569",
    email: "hadapsar.hub@myevservice.com",
    address: "Magarpatta City Main Gate Commercial Complex, Hadapsar, Pune 411028, Maharashtra",
    city: "Pune",
    area: "Hadapsar Magarpatta",
    coords: [18.5158, 73.9272],
  },
  {
    id: "h4",
    name: "EV PRO Wakad IT Express Hub",
    phone: "+91 1800 123 4570",
    email: "wakad.hub@myevservice.com",
    address: "Datta Mandir Road, Near Hinjewadi Flyover, Wakad, Pune 411057, Maharashtra",
    city: "Pune",
    area: "Wakad Hinjewadi",
    coords: [18.5987, 73.7634],
  },
  {
    id: "h5",
    name: "EV PRO Viman Nagar Hub",
    phone: "+91 1800 123 4571",
    email: "viman.hub@myevservice.com",
    address: "Symbiosis Road, Near Phoenix Marketcity, Viman Nagar, Pune 411014, Maharashtra",
    city: "Pune",
    area: "Viman Nagar",
    coords: [18.5679, 73.9143],
  },
  {
    id: "h6",
    name: "EV PRO Kothrud Express Hub",
    phone: "+91 1800 123 4572",
    email: "kothrud.hub@myevservice.com",
    address: "Paud Road, Near Ideal Colony Metro Station, Kothrud, Pune 411038, Maharashtra",
    city: "Pune",
    area: "Kothrud Paud Rd",
    coords: [18.5074, 73.8077],
  },
];

export default function AucklandStyleLocationShowcase() {
  const [selectedHub, setSelectedHub] = useState<HubLocation>(HUBS_DATA[0]);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize Leaflet Map on Client Side (Scroll Wheel Zoom & Drag Traps Disabled)
  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;

    let map: any = null;

    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const container = document.getElementById("auckland-reference-map-dark");
      if (!container) return;

      map = L.map("auckland-reference-map-dark", {
        center: selectedHub.coords,
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: false, // DISABLES MOUSE WHEEL SCROLL TRAP
        dragging: false,         // DISABLES DRAG SCROLL TRAP
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: false,
      });

      // CartoDB Dark Matter Tile Layer (Clean dark monochrome map tiles)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(map);

      // Custom Red Teardrop Pin Marker SVG
      const createTeardropPin = (isActive: boolean) => {
        const pinBg = isActive ? "#FF3B30" : "#B31B1B"; // Vibrant Red for active, Dark Crimson for inactive
        const centerFill = "#FFFFFF";
        const strokeColor = isActive ? "#FFFFFF" : "#FF6B6B";

        const svgString = `
          <svg width="36" height="48" viewBox="0 0 34 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 0C7.61116 0 0 7.61116 0 17C0 29.75 17 46 17 46C17 46 34 29.75 34 17C34 7.61116 26.3888 0 17 0Z" fill="${pinBg}" stroke="${strokeColor}" stroke-width="1.8"/>
            <path d="M17 11C13.6863 11 11 13.6863 11 17C11 20.3137 13.6863 23 17 23C20.3137 23 23 20.3137 23 17C23 13.6863 20.3137 11 17 11Z" fill="${centerFill}"/>
            <path d="M14.5 14.5H19.5V19.5H14.5V14.5Z" fill="${pinBg}"/>
          </svg>
        `;

        return L.divIcon({
          className: "custom-teardrop-marker-dark",
          html: svgString,
          iconSize: [36, 48],
          iconAnchor: [18, 48],
          popupAnchor: [0, -42],
        });
      };

      HUBS_DATA.forEach((hub) => {
        const marker = L.marker(hub.coords, {
          icon: createTeardropPin(hub.id === selectedHub.id),
        }).addTo(map);

        marker.on("click", () => {
          setSelectedHub(hub);
          map.flyTo(hub.coords, 13, { duration: 1.2 });
        });
      });

      setMapInstance(map);
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [isClient]);

  const handleSelectHub = (hub: HubLocation) => {
    setSelectedHub(hub);
    if (mapInstance) {
      mapInstance.flyTo(hub.coords, 13, { duration: 1.2 });
    }
  };

  const handleZoomIn = () => {
    if (mapInstance) mapInstance.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstance) mapInstance.zoomOut();
  };

  const handleShare = (hub: HubLocation) => {
    navigator.clipboard.writeText(`${hub.name}: ${hub.address}`);
    toast.success(`Share details copied for ${hub.name}!`);
  };

  return (
    <section id="centre-location-map" className="w-full bg-[#050505] text-white font-sans overflow-hidden border-t border-white/10">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] sm:min-h-[640px] w-full">
        {/* ---------- LEFT COLUMN: NON-TRAPPING DARK MAP AREA (7 COLS) ---------- */}
        <div className="lg:col-span-7 relative w-full h-[360px] lg:h-full bg-[#0A0A0A] pointer-events-auto">
          {/* Leaflet Map with Scroll Traps Completely Disabled */}
          <div id="auckland-reference-map-dark" className="w-full h-full inset-0 absolute z-0" />

          {/* Floating Zoom Controls */}
          <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 rounded-full bg-black/90 text-white hover:bg-white hover:text-black flex items-center justify-center shadow-xl transition-all border border-white/20 cursor-pointer active:scale-95"
              aria-label="Zoom in"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 rounded-full bg-black/90 text-white hover:bg-white hover:text-black flex items-center justify-center shadow-xl transition-all border border-white/20 cursor-pointer active:scale-95"
              aria-label="Zoom out"
            >
              <Minus className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ---------- RIGHT COLUMN: CLEAN NON-TRAPPING HUB PANEL (5 COLS) ---------- */}
        <div className="lg:col-span-5 bg-[#080808] p-6 sm:p-10 flex flex-col justify-between border-l border-white/10 text-left space-y-6">
          {/* Header Block */}
          <div className="space-y-4 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-medium tracking-wide text-white/70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white" /> Centre location
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl font-sans font-normal text-white tracking-tight leading-none">
              Pune
            </h2>
          </div>

          {/* Horizontal Hub Pill Selector (Zero Scroll Trap) */}
          <div className="space-y-3">
            <span className="text-[10px] font-sans font-semibold text-white/50 uppercase tracking-widest block">
              Select Service Hub
            </span>
            <div className="flex flex-wrap gap-2">
              {HUBS_DATA.map((hub) => {
                const isSelected = hub.id === selectedHub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => handleSelectHub(hub)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-white text-black font-semibold shadow-md scale-105"
                        : "bg-white/[0.05] hover:bg-white/[0.12] text-white/80 border border-white/10"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-black" : "bg-white/40"
                      }`}
                    />
                    {hub.area}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Hub Detail Card (Fits Naturally in Flow) */}
          <div className="rounded-2xl p-6 bg-white/[0.05] border border-white/20 shadow-xl space-y-5 transition-all">
            {/* Card Header Row */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF3B30]" />
                  <span className="text-[10px] font-mono text-[#FF3B30] font-bold uppercase tracking-wider">
                    FLAGSHIP HUB
                  </span>
                </div>
                <h3 className="text-lg font-sans font-semibold text-white tracking-tight">
                  {selectedHub.name}
                </h3>
              </div>

              <button
                onClick={() => handleShare(selectedHub)}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-colors shrink-0 cursor-pointer"
                title="Share Hub Details"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Card Details List (P, E, A) */}
            <div className="space-y-3.5 text-xs font-sans pt-1">
              {/* P - Phone */}
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border border-white/30 text-white text-[10px] font-sans font-medium flex items-center justify-center shrink-0">
                  P
                </div>
                <a
                  href={`tel:${selectedHub.phone}`}
                  className="text-white/90 hover:text-white underline underline-offset-4 font-normal"
                >
                  {selectedHub.phone}
                </a>
              </div>

              {/* E - Email */}
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border border-white/30 text-white text-[10px] font-sans font-medium flex items-center justify-center shrink-0">
                  E
                </div>
                <a
                  href={`mailto:${selectedHub.email}`}
                  className="text-white/90 hover:text-white underline underline-offset-4 font-normal truncate"
                >
                  {selectedHub.email}
                </a>
              </div>

              {/* A - Address */}
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full border border-white/30 text-white text-[10px] font-sans font-medium flex items-center justify-center shrink-0 mt-0.5">
                  A
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedHub.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/90 hover:text-white underline underline-offset-4 font-normal leading-relaxed"
                >
                  {selectedHub.address}
                </a>
              </div>
            </div>

            {/* Direct Google Maps Action Button */}
            <div className="pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedHub.address)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-white hover:bg-white/90 text-black text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                Get Directions <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
