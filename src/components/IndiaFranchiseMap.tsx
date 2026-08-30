import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { CityRadarNode, CITIES_RADAR } from "../data/franchiseData";
import { Compass, CheckCircle2, ArrowRight, Sparkles, MapPin, Layers } from "lucide-react";

interface IndiaFranchiseMapProps {
  onSelectCity: (cityName: string, stateName: string) => void;
}

export function IndiaFranchiseMap({ onSelectCity }: IndiaFranchiseMapProps) {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<CityRadarNode>(CITIES_RADAR[0]);
  const [hoveredCity, setHoveredCity] = useState<CityRadarNode | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Active city displayed in side panel (hovered city takes priority)
  const displayCity = hoveredCity || selectedCity;

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full bg-[#030704] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden font-serif">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D084]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 mb-8 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#00D084]" /> Official Geographic Map of India
          </span>
          <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-white mt-1">
            Pan-India Territory Coverage
          </h3>
        </div>
      </div>

      {/* City Selector Radar Pills (Hoverable & Clickable) */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8 relative z-10">
        {CITIES_RADAR.map((city) => {
          const isSelected = displayCity.name === city.name;
          return (
            <button
              key={city.name}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
              onClick={() => {
                setSelectedCity(city);
                onSelectCity(city.name, city.state);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-serif font-bold transition-all cursor-pointer border flex items-center gap-2 ${
                isSelected
                  ? "bg-[#00D084] text-[#020403] border-[#00D084] scale-105 shadow-[0_0_15px_rgba(0,208,132,0.4)]"
                  : "bg-[#050907] text-white/70 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{city.name}</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10">{city.state}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left 7 Columns: Leaflet Interactive Map */}
        <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[500px] bg-[#020503] border border-white/15 rounded-2xl overflow-hidden group shadow-2xl">
          {isClient && (
            <ClientLeafletMap
              selectedCity={displayCity}
              onHoverCity={(city) => setHoveredCity(city)}
              onSelectCity={(city) => {
                setSelectedCity(city);
                onSelectCity(city.name, city.state);
              }}
            />
          )}

          {/* Map Overlay Badge */}
          <div className="absolute top-4 left-4 z-[400] bg-[#030704]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-[10px] font-serif text-white/70 flex items-center gap-2 pointer-events-none">
            <Layers className="w-3.5 h-3.5 text-[#00D084]" /> CartoDB Dark Matter Geographic Layer
          </div>
        </div>

        {/* Right 5 Columns: Side Panel Info Displayed on Hover/Click */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayCity.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-[#050c08] border-2 border-[#00D084]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Hover Indicator Badge */}
              <div className="flex items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] text-[10px] font-serif font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> {displayCity.tag}
                </span>
                <span className="text-[10px] font-serif font-semibold text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  {displayCity.growthRate}
                </span>
              </div>

              {/* City Title */}
              <div>
                <h4 className="text-3xl font-serif font-black text-white flex items-center gap-2">
                  {displayCity.name}
                  <span className="text-xs font-serif font-normal text-white/60 px-2.5 py-0.5 rounded-full bg-white/10">
                    {displayCity.state}
                  </span>
                </h4>
                <p className="text-xs font-serif text-[#00D084] font-bold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {displayCity.status}
                </p>
              </div>

              {/* Key City Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-serif pt-2 border-t border-white/10">
                <div className="bg-[#020503] border border-white/10 rounded-2xl p-3.5 space-y-1">
                  <span className="text-white/40 block text-[10px] uppercase font-bold tracking-wider">
                    LOCAL EV DEMAND
                  </span>
                  <span className="font-bold text-white text-xs leading-snug block">
                    {displayCity.demand}
                  </span>
                </div>
                <div className="bg-[#020503] border border-white/10 rounded-2xl p-3.5 space-y-1">
                  <span className="text-white/40 block text-[10px] uppercase font-bold tracking-wider">
                    TERRITORY SLOTS
                  </span>
                  <span className="font-bold text-[#00D084] text-xs leading-snug block">
                    {displayCity.slots}
                  </span>
                </div>
              </div>

              {/* Footprint Highlights */}
              <div className="bg-[#020503] border border-white/10 rounded-2xl p-4 space-y-2 text-xs font-serif">
                <div className="flex justify-between items-center text-white/70">
                  <span>Exclusive Territory Radius:</span>
                  <span className="font-bold text-white">5 km Guaranteed</span>
                </div>
                <div className="flex justify-between items-center text-white/70">
                  <span>Active Operating Hubs:</span>
                  <span className="font-bold text-[#00D084]">{displayCity.hubCount}</span>
                </div>
                <div className="flex justify-between items-center text-white/70">
                  <span>Coordinates:</span>
                  <span className="font-mono text-[11px] text-white/60">
                    {displayCity.lat.toFixed(2)}° N, {displayCity.lng.toFixed(2)}° E
                  </span>
                </div>
              </div>

              {/* Reserve Territory CTA */}
              <button
                onClick={() => {
                  const cityKey = displayCity.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  navigate({ to: `/franchise/pre-booking/${cityKey}` });
                }}
                className="w-full py-4 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xl"
              >
                Reserve {displayCity.name} Territory <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ClientLeafletMap({
  selectedCity,
  onHoverCity,
  onSelectCity,
}: {
  selectedCity: CityRadarNode;
  onHoverCity: (city: CityRadarNode | null) => void;
  onSelectCity: (city: CityRadarNode) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const LRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    let isMounted = true;

    // Async import leaflet & css ONLY on client browser
    Promise.all([import("leaflet"), import("leaflet/dist/leaflet.css")]).then(([leafletModule]) => {
      if (!isMounted || !containerRef.current || mapInstanceRef.current) return;

      const L = leafletModule.default || leafletModule;
      LRef.current = L;

      // Create Leaflet Map centered on India [22.5937, 78.9629]
      const map = L.map(containerRef.current, {
        center: [22.5937, 78.9629],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 18,
        subdomains: "abcd",
      }).addTo(map);

      mapInstanceRef.current = map;

      // Render Markers with mouseover / mouseout side panel updates
      CITIES_RADAR.forEach((city) => {
        const isSelected = city.name === selectedCity.name;
        const customIcon = L.divIcon({
          className: "custom-leaflet-marker",
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
              <div style="position: absolute; width: 28px; height: 28px; border-radius: 9999px; background-color: ${city.color}; opacity: 0.4; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="width: 22px; height: 22px; border-radius: 9999px; background-color: #020503; border: 2px solid ${isSelected ? "#00D084" : city.color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px ${city.color}; transition: all 0.3s;">
                <div style="width: 8px; height: 8px; border-radius: 9999px; background-color: ${isSelected ? "#00D084" : "#ffffff"};"></div>
              </div>
              <div style="position: absolute; top: 26px; white-space: nowrap; background: rgba(3, 7, 4, 0.9); border: 1px solid rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                ${city.name}
              </div>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const marker = L.marker([city.lat, city.lng], { icon: customIcon })
          .addTo(map)
          .on("mouseover", () => {
            onHoverCity(city);
          })
          .on("mouseout", () => {
            onHoverCity(null);
          })
          .on("click", () => {
            onSelectCity(city);
          });

        markersRef.current[city.name] = marker;
      });
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map position and marker icons on selection change
  useEffect(() => {
    if (mapInstanceRef.current && LRef.current && selectedCity) {
      const L = LRef.current;
      mapInstanceRef.current.flyTo([selectedCity.lat, selectedCity.lng], 6, {
        duration: 1.0,
      });

      CITIES_RADAR.forEach((city) => {
        const marker = markersRef.current[city.name];
        if (marker) {
          const isSelected = city.name === selectedCity.name;
          const updatedIcon = L.divIcon({
            className: "custom-leaflet-marker",
            html: `
              <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                <div style="position: absolute; width: 28px; height: 28px; border-radius: 9999px; background-color: ${city.color}; opacity: 0.4; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
                <div style="width: 22px; height: 22px; border-radius: 9999px; background-color: #020503; border: 2px solid ${isSelected ? "#00D084" : city.color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px ${city.color}; transition: all 0.3s;">
                  <div style="width: 8px; height: 8px; border-radius: 9999px; background-color: ${isSelected ? "#00D084" : "#ffffff"};"></div>
                </div>
                <div style="position: absolute; top: 26px; white-space: nowrap; background: rgba(3, 7, 4, 0.9); border: 1px solid rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                  ${city.name}
                </div>
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });
          marker.setIcon(updatedIcon);
        }
      });
    }
  }, [selectedCity]);

  return <div ref={containerRef} className="w-full h-full min-h-[440px] sm:min-h-[500px] z-10" />;
}
