'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Smartphone, 
  Sparkles,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all shadow-sm">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
        <span>1Fi Smart EMI: Pay zero extra interest by backing your smartphone with active Mutual Funds!</span>
        <span className="hidden md:inline-block bg-purple-700/60 px-2 py-0.5 rounded text-[11px] text-purple-200 ml-1">SEBI Registered</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo matching 1Fi style */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-800 flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-extrabold text-lg flex items-center font-sans tracking-tighter">
                  <span className="text-yellow-300 font-black mr-0.5 text-base">↑</span>Fi
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-outfit leading-none flex items-center gap-1.5">
                  1Fi <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold uppercase tracking-wider">Store</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">Mutual Fund-Backed EMIs</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link 
                href="/" 
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === '/' ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                All Products
              </Link>
              <Link 
                href="/products/iphone-17-pro" 
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === '/products/iphone-17-pro' ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                iPhone 17 Pro
              </Link>
              <Link 
                href="/products/samsung-s24-ultra" 
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === '/products/samsung-s24-ultra' ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Galaxy S24 Ultra
              </Link>
              <Link 
                href="/products/google-pixel-9-pro" 
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === '/products/google-pixel-9-pro' ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Pixel 9 Pro
              </Link>
              <Link 
                href="/products/oneplus-12" 
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === '/products/oneplus-12' ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                OnePlus 12
              </Link>
            </nav>
          </div>

          {/* Right Action / MF Status widget */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-xs text-slate-700">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-semibold text-slate-800">MF Credit Line:</span>
              <span className="text-emerald-700 font-bold">₹2,50,000 pre-approved</span>
            </div>

            <Link
              href="/products/iphone-17-pro"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all hover:shadow-lg active:scale-95"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Explore Plans</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-purple-50 hover:text-purple-700"
          >
            All Products
          </Link>
          <Link
            href="/products/iphone-17-pro"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-purple-50 hover:text-purple-700"
          >
            iPhone 17 Pro
          </Link>
          <Link
            href="/products/samsung-s24-ultra"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-purple-50 hover:text-purple-700"
          >
            Samsung Galaxy S24 Ultra
          </Link>
          <Link
            href="/products/google-pixel-9-pro"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-purple-50 hover:text-purple-700"
          >
            Google Pixel 9 Pro
          </Link>
          <Link
            href="/products/oneplus-12"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-purple-50 hover:text-purple-700"
          >
            OnePlus 12
          </Link>
        </div>
      )}
    </header>
  );
}
