'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductType } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import MutualFundInfoModal from '@/components/MutualFundInfoModal';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  HelpCircle,
  Loader2
} from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [isMfInfoOpen, setIsMfInfoOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && data.data) {
          setProducts(data.data);
        }
      } catch (e) {
        console.error('Failed to load products:', e);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const brands = ['All', 'Apple', 'Samsung', 'Google', 'OnePlus'];

  const filteredProducts = products.filter((p) => {
    const matchesBrand = selectedBrand === 'All' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white p-8 sm:p-12 shadow-2xl border border-purple-800/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-semibold text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Introducing 1Fi Zero-Cost Mutual Fund EMI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-outfit tracking-tight leading-tight">
            Upgrade your Smartphone <br />
            <span className="bg-gradient-to-r from-purple-300 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">
              Backed by Your Mutual Funds
            </span>
          </h1>

          <p className="text-sm sm:text-base text-purple-200 max-w-2xl leading-relaxed">
            Keep your investments growing at ~12% per year while enjoying zero down-payment, 0% interest tenure options, and up to ₹7,500 instant cashback.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/products/iphone-17-pro"
              className="px-6 py-3 rounded-2xl bg-white text-purple-950 font-bold text-sm hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
            >
              <span>Explore iPhone 17 Pro Plans</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsMfInfoOpen(true)}
              className="px-5 py-3 rounded-2xl bg-purple-800/60 hover:bg-purple-800 text-white font-semibold text-sm border border-purple-600/40 transition-colors flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-purple-300" />
              <span>How 1Fi Works</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        {/* Brand Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedBrand === b
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search phones, storage..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 font-outfit">
              Featured Flagship Smartphones
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredProducts.length} devices with active Mutual Fund EMI support
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-purple-700 animate-spin" />
            <span className="text-xs font-semibold text-slate-500">Loading products from database...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-slate-600 font-semibold text-sm">No products found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedBrand('All'); }}
              className="mt-3 text-xs font-bold text-purple-700 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>

      {/* Educational Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 rounded-3xl border border-purple-100 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
            Smart Financial Architecture
          </span>
          <h3 className="text-2xl font-bold font-outfit text-slate-900">
            Why redeem your Mutual Funds when you can leverage them?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When you sell mutual funds, you pay up to 20% capital gains tax and lose future compounding. With 1Fi, your investments remain in your name, continue growing, and unlock lowest interest rates with ₹0 down payment.
          </p>
        </div>

        <button
          onClick={() => setIsMfInfoOpen(true)}
          className="shrink-0 px-6 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2"
        >
          <span>Learn How It Works</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <MutualFundInfoModal
        isOpen={isMfInfoOpen}
        onClose={() => setIsMfInfoOpen(false)}
      />
    </div>
  );
}
