import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { STORE_PRODUCTS, STORE_CATEGORIES, StoreProduct } from "../data/storeData";
import {
  ShoppingCart,
  Search,
  Package,
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowRight,
  Star,
  Eye,
  Tag,
  Flame,
  ArrowUpDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import { BookingModal } from "../components/BookingModal";

export const Route = createFileRoute("/store")({
  component: StorePage,
});

interface CartItem {
  product: StoreProduct;
  quantity: number;
}

function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "rating">("popular");

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Modals State
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Promo Code State
  const [promoInput, setPromoInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState("");

  // Checkout Form State
  const [checkoutStep, setCheckoutStep] = useState<"details" | "confirmation">("details");
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "upi",
  });

  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP ScrollTrigger Stuck Hero Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(heroTextRef.current, {
        opacity: 0,
        scale: 0.92,
        y: -40,
        ease: "power1.out",
        scrollTrigger: {
          trigger: cardsOverlayRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 0.6,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Total items in cart
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Cart Subtotal calculation
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.rawPrice * item.quantity, 0);
  }, [cartItems]);

  // Final Total calculation after discount
  const cartFinalTotal = useMemo(() => {
    const total = cartSubtotal - appliedDiscount;
    return total > 0 ? total : 0;
  }, [cartSubtotal, appliedDiscount]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = STORE_PRODUCTS.filter((prd) => {
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

    if (sortBy === "price-low") {
      list.sort((a, b) => a.rawPrice - b.rawPrice);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.rawPrice - a.rawPrice);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  // Add to Cart Handler
  const handleAddToCart = (product: StoreProduct, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    toast.success(`Added ${product.name} to cart!`, {
      description: `${product.price} • ${product.category}`,
    });
  };

  // Update Cart Item Quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item from Cart
  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    toast.info("Item removed from cart");
  };

  // Apply Promo Code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.toUpperCase().trim();
    if (code === "MYEV10") {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedDiscount(discount);
      setAppliedPromoCode("MYEV10");
      toast.success("Promo Code MYEV10 applied! 10% Discount added.");
    } else if (code === "WELCOME") {
      setAppliedDiscount(500);
      setAppliedPromoCode("WELCOME");
      toast.success("Promo Code WELCOME applied! ₹500 Discount added.");
    } else {
      toast.error("Invalid Promo Code. Try 'MYEV10' or 'WELCOME'");
    }
  };

  // Submit Order Handler
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
      toast.error("Please fill in all required delivery details.");
      return;
    }
    setCheckoutStep("confirmation");
    toast.success("Order Placed Successfully!", {
      description: `Dispatching to ${checkoutForm.city || "your location"}. Order ID: #EV-${Math.floor(100000 + Math.random() * 900000)}`,
    });
  };

  return (
    <div className="min-h-screen bg-[#020503] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Navigation Header */}
      <Nav
        onOpenBooking={() => setBookingModalOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Main Stuck Hero Container Wrapper */}
      <div className="relative min-h-screen">
        
        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0 BEHIND NAVBAR)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Hero Image */}
          <img
            src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&auto=format&fit=crop&q=85"
            alt="EV Accessories Store"
            className="w-full h-full object-cover object-center opacity-70 pointer-events-none"
          />

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-black/40 to-black/60 pointer-events-none" />

          {/* Hero Content Container */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto space-y-5 z-10 text-center pointer-events-none"
          >
            {/* Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white keep-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              Genuine <span className="text-[#00D084] keep-white">EV Accessories</span> &amp; Gear
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl font-medium text-white/95 keep-white leading-relaxed max-w-3xl drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              Upgrade your electric ride with smart helmets, portable DC fast chargers, LiFePO4 battery modules, and Bluetooth diagnostic telematics.
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY CONTAINER (SLIDES UP DIRECTLY OVER THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={cardsOverlayRef}
          className="relative z-10 bg-[#020503] text-white min-h-screen mt-[calc(100vh-80px)] rounded-t-[40px] border-t border-white/15 shadow-2xl transition-colors duration-500"
        >
          
          {/* =========================================================================
              3. STORE DIRECTORY CONTROLS (SEARCH, CATEGORY PILLS, SORTING)
             ========================================================================= */}
          <section className="pt-12 pb-6 px-6 lg:px-12 max-w-7xl mx-auto">
            
            {/* Category Pills Slider */}
            <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
              {STORE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      isActive
                        ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.35)] scale-105"
                        : "bg-[#080d0a] text-white/70 border-white/10 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Bar & Sorting Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#070c09] border border-white/10 rounded-2xl p-4 md:px-6 shadow-xl mb-8">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search helmets, chargers, specs..."
                  className="w-full bg-[#020503] border border-white/15 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00D084]"
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

              <div className="flex items-center gap-4 w-full md:w-auto justify-between">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#00D084]" />
                  <span className="font-mono">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-[#020503] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  >
                    <option value="popular">Bestsellers First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>

                <button
                  onClick={() => setCartDrawerOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] text-xs font-bold font-mono flex items-center gap-2 hover:bg-[#00D084] hover:text-black transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" /> Cart ({totalCartCount})
                </button>
              </div>
            </div>

            {/* =========================================================================
                4. PRODUCTS CATALOG GRID
               ========================================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
              {filteredProducts.map((prd) => (
                <motion.div
                  key={prd.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="bg-[#070c09] border border-white/10 hover:border-[#00D084]/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-between group relative"
                >
                  {/* Top Image Box */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={prd.image}
                      alt={prd.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070c09] via-transparent to-black/30" />

                    {/* Popular / Discount Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                      {prd.popular && (
                        <span className="bg-[#00D084] text-[#020403] text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-[0_0_10px_#00D084]">
                          BESTSELLER
                        </span>
                      )}
                      <span className="bg-black/80 text-[#00D084] border border-[#00D084]/30 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                        {prd.discount}
                      </span>
                    </div>

                    {/* Quick View Button Overlay */}
                    <button
                      onClick={() => setSelectedProduct(prd)}
                      className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/80 border border-white/20 text-white/80 hover:text-white hover:border-[#00D084] transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md cursor-pointer"
                      title="Quick View Details"
                    >
                      <Eye className="w-4 h-4 text-[#00D084]" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#00D084] mb-1">
                        <span>{prd.category}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-bold">{prd.rating}</span>
                          <span className="text-white/40 text-[10px]">({prd.reviewsCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => setSelectedProduct(prd)}
                        className="text-lg font-bold text-white group-hover:text-[#00D084] transition-colors leading-snug cursor-pointer mb-2"
                      >
                        {prd.name}
                      </h3>

                      <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2 mb-3">
                        {prd.desc}
                      </p>

                      {/* Specs snippet */}
                      <div className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-1.5">
                        {prd.specs.slice(0, 2).map((sp, idx) => (
                          <div key={idx} className="flex justify-between text-[11px] font-mono">
                            <span className="text-white/40">{sp.label}:</span>
                            <span className="text-white font-medium">{sp.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] text-white/40 font-mono block uppercase">PRICE</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-white font-mono">{prd.price}</span>
                          <span className="text-xs text-white/40 line-through font-mono">{prd.oldPrice}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(prd)}
                        className="px-5 py-2.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all shadow-[0_0_15px_rgba(0,208,132,0.3)] cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> ADD TO CART
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </section>

          {/* Footer */}
          <Footer />

        </div>
      </div>

      {/* =========================================================================
          5. SLIDE-OVER SHOPPING CART DRAWER
         ========================================================================= */}
      <AnimatePresence>
        {cartDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#070c09] border-l border-white/15 w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 relative text-white"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-[#00D084]" />
                    <h3 className="text-xl font-bold text-white">Your Shopping Cart</h3>
                    <span className="text-xs font-mono bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30 px-2.5 py-0.5 rounded-full">
                      {totalCartCount} Items
                    </span>
                  </div>
                  <button
                    onClick={() => setCartDrawerOpen(false)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free Shipping Progress Indicator */}
                <div className="py-3 px-4 my-4 rounded-xl bg-white/5 border border-white/5 text-xs text-white/80 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#00D084] shrink-0" />
                  <span>
                    {cartSubtotal >= 2000
                      ? "🎉 You unlocked Free Express Doorstep Shipping!"
                      : `Add ₹${2000 - cartSubtotal} more to get FREE Shipping!`}
                  </span>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 my-2">
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center text-white/50 space-y-3">
                    <Package className="w-12 h-12 text-[#00D084]/30 mx-auto" />
                    <p className="text-sm font-medium">Your cart is currently empty.</p>
                    <button
                      onClick={() => setCartDrawerOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-bold uppercase tracking-wider hover:bg-[#00e08f]"
                    >
                      Browse EV Gear
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 bg-white/5 border border-white/5 rounded-2xl items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-900 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] font-mono text-[#00D084] block font-bold">
                          {item.product.price}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-white/20 rounded-lg bg-black/40">
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, -1)}
                              className="px-2 py-1 text-white/70 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, 1)}
                              className="px-2 py-1 text-white/70 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {cartItems.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-4">
                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (MYEV10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#020503] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00D084] uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/10"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Summary Rows */}
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal:</span>
                      <span>₹{cartSubtotal.toLocaleString()}</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-[#00D084]">
                        <span>Discount ({appliedPromoCode}):</span>
                        <span>-₹{appliedDiscount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-white/60">
                      <span>Shipping:</span>
                      <span className="text-[#00D084] font-bold">FREE</span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                      <span>Total Amount:</span>
                      <span className="text-[#00D084]">₹{cartFinalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCartDrawerOpen(false);
                      setCheckoutModalOpen(true);
                    }}
                    className="w-full py-4 rounded-2xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_20px_rgba(0,208,132,0.4)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          6. QUICK VIEW PRODUCT DETAIL MODAL
         ========================================================================= */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#070c09] border border-white/20 rounded-[36px] max-w-2xl w-full p-6 md:p-8 relative overflow-hidden shadow-2xl text-white"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="h-64 w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10 relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#00D084] text-[#020403] text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    {selectedProduct.category}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {selectedProduct.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold">{selectedProduct.rating}</span>
                    <span className="text-white/50">({selectedProduct.reviewsCount} verified reviews)</span>
                  </div>

                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {selectedProduct.desc}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs font-mono">
                    <div className="text-white/50 text-[10px] uppercase">Vehicle Compatibility</div>
                    <div className="text-white font-medium">{selectedProduct.compatibility}</div>
                  </div>

                  <div className="flex items-baseline gap-3 pt-2">
                    <span className="text-2xl font-black text-[#00D084] font-mono">
                      {selectedProduct.price}
                    </span>
                    <span className="text-xs text-white/40 line-through font-mono">
                      {selectedProduct.oldPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> ADD TO SHOPPING CART
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          7. CHECKOUT FLOW MODAL
         ========================================================================= */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#070c09] border border-white/20 rounded-[36px] max-w-lg w-full p-6 md:p-8 relative overflow-hidden shadow-2xl text-white"
            >
              <button
                onClick={() => {
                  setCheckoutModalOpen(false);
                  setCheckoutStep("details");
                }}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {checkoutStep === "details" ? (
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] font-mono uppercase text-[#00D084] font-bold tracking-widest">
                      Step 1 of 2 • Dispatch Details
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">Complete Your Order</h3>
                    <p className="text-xs text-white/60">Total Payable: ₹{cartFinalTotal.toLocaleString()}</p>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                    <div>
                      <label className="text-[10px] font-mono text-white/50 uppercase block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                        className="w-full bg-[#020503] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-white/50 uppercase block mb-1">Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={checkoutForm.phone}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                          className="w-full bg-[#020503] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-white/50 uppercase block mb-1">City *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Pune, Delhi"
                          value={checkoutForm.city}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                          className="w-full bg-[#020503] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-white/50 uppercase block mb-1">Delivery Address *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Street, Building, Flat No..."
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                        className="w-full bg-[#020503] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00D084]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-white/50 uppercase block mb-1">Payment Method</label>
                      <select
                        value={checkoutForm.paymentMethod}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                        className="w-full bg-[#020503] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                      >
                        <option value="upi">UPI / GPay / PhonePe (Instant Discount)</option>
                        <option value="card">Credit / Debit Card</option>
                        <option value="cod">Cash on Delivery (COD)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_20px_rgba(0,208,132,0.4)] cursor-pointer mt-2"
                    >
                      CONFIRM ORDER &amp; PAY ₹{cartFinalTotal.toLocaleString()}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#00D084]/20 border border-[#00D084] text-[#00D084] flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-white">Order Confirmed!</h3>

                  <p className="text-xs text-white/70 leading-relaxed max-w-sm mx-auto">
                    Thank you, <span className="font-bold text-white">{checkoutForm.name}</span>. Your order has been dispatched from our central hub.
                  </p>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs font-mono space-y-1.5 text-left max-w-xs mx-auto">
                    <div className="flex justify-between text-white/60">
                      <span>Order ID:</span>
                      <span className="text-[#00D084]">#EV-884920</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Est. Delivery:</span>
                      <span className="text-white">2-3 Business Days</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Payment:</span>
                      <span className="text-white uppercase">{checkoutForm.paymentMethod}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      setCheckoutStep("details");
                      setCartItems([]);
                    }}
                    className="px-8 py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f]"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

    </div>
  );
}
