import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { FAQS_DATA, FAQ_CATEGORIES, FAQItem } from "../data/faqsData";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  X,
} from "lucide-react";

export const Route = createFileRoute("/faqs")({
  component: FaqsPage,
});

function FaqsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All FAQs");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("FAQ-01");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchesCategory =
        selectedCategory === "All FAQs" || faq.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans">
      
      {/* Unified Landing Navbar */}
      <Nav />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#060c09] to-[#020403]">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#00D084]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D084] mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledgebase & Help Center
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Frequently Asked <span className="text-[#00D084]">Questions</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Find answers to common queries regarding doorstep service, battery warranty, payments, and franchise partnerships.
          </p>
        </div>
      </section>

      {/* FAQ Directory */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {FAQ_CATEGORIES.map((cat) => {
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
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full bg-[#050907] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00D084]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-2xl p-6 transition-all cursor-pointer"
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#00D084] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40 shrink-0" />
                  )}
                </div>

                {isOpen && (
                  <p className="mt-4 pt-4 border-t border-white/10 text-xs md:text-sm text-white/70 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Unified Landing Footer */}
      <Footer />

    </div>
  );
}
