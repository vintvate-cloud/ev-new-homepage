import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { STORE_PRODUCTS, STORE_CATEGORIES, StoreProduct } from "../data/storeData";
import {
  ShoppingCart,
  Search,
  Package,
  X,
  Send,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/store")({
  component: StorePage,
});

function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((prd) => {
      const matchesCategory =
        selectedCategory === "All Products" || prd.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        prd.name.toLowerCase().includes(query) ||
        prd.desc.toLowerCase().includes(query) ||
        prd.compatibility.toLowerCase().includes(query) ||
        prd.specs.some((s) => s.value.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone) {
      toast.error("Please enter your Name and Mobile Number.");
      return;
    }
    toast.success(
      `Order Inquiry Placed! Our logistics hub will contact you to confirm component dispatch for ${
        selectedProduct ? selectedProduct.name : "Parts"
      }.`
    );
    setOrderModalOpen(false);
    setOrderForm({ name: "", phone: "", address: "", quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans">
      
      {/* Unified Landing Navbar */}
      <Nav />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#060c09] to-[#020403]">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00D084]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D084] mb-6">
            <Package className="w-3.5 h-3.5" />
            100% Certified OEM Standard Components
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Genuine <span className="text-[#00D084]">EV Spare Parts</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed">
            Order certified high-voltage lithium battery packs, chargers, motor controllers, and tyres directly from our central distribution hubs.
          </p>
        </div>
      </section>

      {/* Products Directory */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        
        {/* Category Pills Slider */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none no-scrollbar">
          {STORE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00D084] text-[#020403] font-bold shadow-[0_0_15px_rgba(0,208,132,0.3)]"
                    : "bg-[#050907] border border-white/10 text-white/70 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-[#060c09] border border-white/10 rounded-2xl p-4 md:px-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parts by name, model, or specs..."
              className="w-full bg-[#020403] border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00D084]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs font-mono font-semibold text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 rounded-lg px-3.5 py-2">
            {filteredProducts.length} OEM Components Listed
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prd) => (
            <div
              key={prd.id}
              className="bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,208,132,0.15)] group relative"
            >
              {prd.popular && (
                <div className="absolute top-4 right-4 bg-[#00D084]/20 border border-[#00D084]/40 text-[#00D084] text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md">
                  OEM BESTSELLER
                </div>
              )}

              <div>
                <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#00D084] mb-2">
                  {prd.category}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00D084] transition-colors mb-2">
                  {prd.name}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light mb-4">
                  {prd.desc}
                </p>

                {/* Compatibility Badge */}
                <div className="mb-4 bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-white/70">
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                    Compatible Models
                  </span>
                  <span className="font-medium text-white/90">{prd.compatibility}</span>
                </div>

                {/* Specs list */}
                <div className="space-y-2 mb-6 pt-3 border-t border-white/5">
                  {prd.specs.map((sp, i) => (
                    <div key={i} className="flex justify-between text-[11px]">
                      <span className="text-white/40 font-mono">{sp.label}</span>
                      <span className="text-white font-mono font-semibold">{sp.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-white/40 font-mono block">OEM PRICE</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white font-mono">{prd.price}</span>
                    <span className="text-xs text-white/40 line-through font-mono">{prd.oldPrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedProduct(prd);
                    setOrderModalOpen(true);
                  }}
                  className="px-5 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-bold transition-all hover:bg-[#00e08f] hover:shadow-[0_0_15px_rgba(0,208,132,0.4)] cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-4 h-4" /> Order Part
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order Inquiry Modal */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#060c09] border border-white/10 rounded-3xl max-w-lg w-full p-6 md:p-8 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <button
              onClick={() => setOrderModalOpen(false)}
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-white/5 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084]">
                Direct OEM Component Order
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {selectedProduct ? selectedProduct.name : "Order Component"}
              </h3>
              <p className="text-xs text-white/60 mt-1">
                {selectedProduct ? `${selectedProduct.price} • ${selectedProduct.warranty}` : "OEM Guarantee"}
              </p>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  className="w-full bg-[#020403] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    className="w-full bg-[#020403] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={orderForm.quantity}
                    onChange={(e) => setOrderForm({ ...orderForm, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-full bg-[#020403] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">
                  Dispatch Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter full delivery address..."
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  className="w-full bg-[#020403] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_20px_rgba(0,208,132,0.3)] cursor-pointer mt-2 flex items-center justify-center gap-2"
              >
                Confirm Component Order <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Unified Landing Footer */}
      <Footer />

    </div>
  );
}
