import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, RefreshCw, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-20">
      {/* Value props banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">100% Zero Foreclosure</h4>
                <p className="text-xs text-slate-400">No penalties for early EMI closure</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Safe Lien Marking</h4>
                <p className="text-xs text-slate-400">Pledged via CAMS & KFintech securely</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Compound Growth Continues</h4>
                <p className="text-xs text-slate-400">Earn ~12% p.a. while paying EMI</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Instant Paperless Approval</h4>
                <p className="text-xs text-slate-400">100% digital verification in 60s</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
              <span className="text-yellow-300 mr-0.5">↑</span>Fi
            </div>
            <span className="text-white font-bold text-base font-outfit">1Fi SDE1 Assignment Demo</span>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-right max-w-md">
            Dynamic Full-Stack Web Application built for 1Fi SDE-1 Assignment. Demonstrating backend API integration, dynamic variants, database schemas, and mutual fund-backed EMI intelligence.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} 1Fi Technologies Private Limited. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-slate-300">Catalog</Link>
            <Link href="/products/iphone-17-pro" className="hover:text-slate-300">iPhone 17 Pro</Link>
            <Link href="/api/products" className="hover:text-slate-300">API Endpoint</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
