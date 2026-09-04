'use client';

import React from 'react';
import { X, Sparkles, TrendingUp, CheckCircle, ShieldAlert, Zap, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/emiUtils';

interface MutualFundInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  price?: number;
}

export default function MutualFundInfoModal({
  isOpen,
  onClose,
  price = 127400,
}: MutualFundInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-300/30 text-purple-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>1Fi Intelligent Credit Architecture</span>
          </div>

          <h3 className="text-2xl font-bold font-outfit text-white">
            How EMI backed by Mutual Funds works
          </h3>
          <p className="text-purple-200 text-sm mt-1">
            Buy your dream gadgets without breaking your investments or paying high credit card interest.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm mb-2">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
                  ↑Fi
                </div>
                <span>1Fi Mutual Fund EMI</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Down Payment</strong> – Keep your liquid savings intact</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Investments Keep Compounding</strong> at ~12% p.a. while you pay installments</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Instant Digital Lien</strong> without selling units (no tax penalty)</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-sm mb-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Traditional Credit / Loan</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>14% to 24% annual interest on outstanding dues</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Heavy foreclosure charges & processing fees</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Requires redeeming mutual funds and paying capital gains tax</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step by step */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">3 Simple Steps</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center mb-2">1</span>
                  <p className="text-xs font-bold text-slate-800">Select EMI Plan</p>
                  <p className="text-[11px] text-slate-500 mt-1">Pick a 3 to 60 month tenure with up to ₹7,500 cashback.</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center mb-2">2</span>
                  <p className="text-xs font-bold text-slate-800">Pledge MF Units via OTP</p>
                  <p className="text-[11px] text-slate-500 mt-1">Secure CAMS/KFintech verification in 30 seconds.</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center mb-2">3</span>
                  <p className="text-xs font-bold text-slate-800">Instant Dispatch</p>
                  <p className="text-[11px] text-slate-500 mt-1">Gadget is shipped while your portfolio earns interest.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">SEBI Registered Intermediary Partner</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/20"
          >
            Got it, Show Plans
          </button>
        </div>
      </div>
    </div>
  );
}
