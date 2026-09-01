import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { CityRadarNode, CITIES_RADAR } from "../data/franchiseData";
import { ArrowRight, MapPin, Layers, CheckCircle2, ShieldCheck } from "lucide-react";

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
    <div className="w-full bg-[#020403] border border-white/10 rounded-[36px] p-6 sm:p-10 relative overflow-hidden font-serif">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D084]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 mb-8 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 block mb-2">
            National Infrastructure
          </span>
          <h3 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            Pan-India Territory Coverage
          </h3>
        </div>
        <p className="text-xs font-serif font-light text-white/60 max-w-sm">
          Select any city to inspect real-time territory slots, local EV demand density, and active master hubs.
        </p>
      </div>

      {/* City Selector Radar Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 relative z-10">
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
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer border flex items-center gap-2 ${
                isSelected
                  ? "bg-white text-black font-semibold border-white shadow-lg scale-[1.03]"
                  : "bg-[#06080A] text-white/70 border-white/10 hover:border-white/25 hover:text-white"
              }`}
            >
              <MapPin className={`w-3 h-3 ${isSelected ? "text-black" : "text-[#00D084]"}`} />
              <span>{city.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? "bg-black/10 text-black/80" : "bg-white/5 text-white/40"}`}>
                {city.state}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left 7 Columns: Leaflet Interactive Map Container */}
        <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[520px] bg-[#050705] border border-white/10 rounded-[28px] overflow-hidden group shadow-2xl">
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
          <div className="absolute top-4 left-4 z-[400] bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-[10px] font-mono text-white/70 flex items-center gap-2 pointer-events-none">
            <Layers className="w-3.5 h-3.5 text-[#00D084]" /> Live Geographic Radar • Esri Canvas
          </div>
        </div>

        {/* Right 5 Columns: Side Panel Info Displayed on Hover/Click */}
        <div className="lg:col-span-5 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayCity.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="bg-[#050806] border border-white/10 rounded-[28px] p-6 sm:p-8 space-y-6 shadow-2xl flex-1 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Header Tag & Growth */}
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <span className="px-3 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/30 text-[#00D084] text-[10px] font-mono font-semibold uppercase tracking-wider">
                    {displayCity.tag}
                  </span>
                  <span className="text-[10px] font-mono text-white/50">
                    {displayCity.growthRate}
                  </span>
                </div>

                {/* City Title */}
                <div>
                  <h4 className="text-3xl font-serif font-medium text-white flex items-center gap-3">
                    {displayCity.name}
                    <span className="text-xs font-mono text-white/40 font-normal px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5">
                      {displayCity.state}
                    </span>
                  </h4>
                  <p className="text-xs font-mono text-[#00D084] mt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {displayCity.status}
                  </p>
                </div>

                {/* Key City Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs font-serif pt-1">
                  <div className="bg-[#020503] border border-white/10 rounded-2xl p-4 space-y-1">
                    <span className="text-white/40 block text-[10px] font-mono uppercase tracking-wider">
                      LOCAL DEMAND
                    </span>
                    <span className="font-serif font-medium text-white text-xs leading-snug block">
                      {displayCity.demand}
                    </span>
                  </div>
                  <div className="bg-[#020503] border border-white/10 rounded-2xl p-4 space-y-1">
                    <span className="text-white/40 block text-[10px] font-mono uppercase tracking-wider">
                      AVAILABLE SLOTS
                    </span>
                    <span className="font-mono font-semibold text-[#00D084] text-xs leading-snug block">
                      {displayCity.slots}
                    </span>
                  </div>
                </div>

                {/* Footprint Highlights */}
                <div className="bg-[#020503] border border-white/10 rounded-2xl p-4 space-y-2 text-xs font-serif">
                  <div className="flex justify-between items-center text-white/70">
                    <span className="font-light">Exclusive Territory Radius:</span>
                    <span className="font-mono text-white">5 km Guaranteed</span>
                  </div>
                  <div className="flex justify-between items-center text-white/70">
                    <span className="font-light">Active Operating Hubs:</span>
                    <span className="font-mono text-[#00D084] font-semibold">{displayCity.hubCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/70">
                    <span className="font-light">Coordinates:</span>
                    <span className="font-mono text-[11px] text-white/40">
                      {displayCity.lat.toFixed(2)}° N, {displayCity.lng.toFixed(2)}° E
                    </span>
                  </div>
                </div>
              </div>

              {/* Reserve Territory CTA */}
              <button
                type="button"
                onClick={() => {
                  const cityKey = displayCity.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  navigate({ to: `/franchise/pre-booking/${cityKey}` });
                }}
                className="w-full py-4 rounded-full bg-white text-black font-sans font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl mt-4"
              >
                <span>Reserve {displayCity.name} Territory</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      // Esri World Dark Gray Canvas - Fast, Reliable, 100% Free Public Tiles (No API key required)
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 16,
        minZoom: 4,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Render Markers with mouseover / mouseout side panel updates
      CITIES_RADAR.forEach((city) => {
        const isSelected = city.name === selectedCity.name;
        const customIcon = L.divIcon({
          className: "custom-leaflet-marker",
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
              <div style="position: absolute; width: 26px; height: 26px; border-radius: 9999px; background-color: #00D084; opacity: 0.3; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="width: 20px; height: 20px; border-radius: 9999px; background-color: #020503; border: 2px solid ${isSelected ? "#FFFFFF" : "#00D084"}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 16px rgba(0,208,132,0.5); transition: all 0.3s;">
                <div style="width: 7px; height: 7px; border-radius: 9999px; background-color: ${isSelected ? "#00D084" : "#FFFFFF"};"></div>
              </div>
              <div style="position: absolute; top: 24px; white-space: nowrap; background: rgba(5, 8, 6, 0.95); border: 1px solid rgba(255,255,255,0.15); padding: 3px 8px; border-radius: 9999px; font-size: 10px; font-family: monospace; font-weight: 600; color: #FFFFFF; box-shadow: 0 4px 14px rgba(0,0,0,0.8);">
                ${city.name}
              </div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
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
                <div style="position: absolute; width: 26px; height: 26px; border-radius: 9999px; background-color: #00D084; opacity: 0.3; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
                <div style="width: 20px; height: 20px; border-radius: 9999px; background-color: #020503; border: 2px solid ${isSelected ? "#FFFFFF" : "#00D084"}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 16px rgba(0,208,132,0.5); transition: all 0.3s;">
                  <div style="width: 7px; height: 7px; border-radius: 9999px; background-color: ${isSelected ? "#00D084" : "#FFFFFF"};"></div>
                </div>
                <div style="position: absolute; top: 24px; white-space: nowrap; background: rgba(5, 8, 6, 0.95); border: 1px solid rgba(255,255,255,0.15); padding: 3px 8px; border-radius: 9999px; font-size: 10px; font-family: monospace; font-weight: 600; color: #FFFFFF; box-shadow: 0 4px 14px rgba(0,0,0,0.8);">
                  ${city.name}
                </div>
              </div>
            `,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          });
          marker.setIcon(updatedIcon);
        }
      });
    }
  }, [selectedCity]);

  return <div ref={containerRef} className="w-full h-full min-h-[440px] sm:min-h-[520px] z-10" />;
}
