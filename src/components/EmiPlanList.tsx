'use client';

import React from 'react';
import { EmiPlanType, ProductVariantType } from '@/lib/types';
import { formatINR, calculateEmiBreakdown } from '@/lib/emiUtils';
import { Info, Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface EmiPlanListProps {
  productTitle: string;
  selectedVariant: ProductVariantType;
  emiPlans: EmiPlanType[];
  selectedPlan: EmiPlanType | null;
  onSelectPlan: (plan: EmiPlanType) => void;
  onOpenMfInfo: () => void;
  onProceed: () => void;
}

export default function EmiPlanList({
  productTitle,
  selectedVariant,
  emiPlans,
  selectedPlan,
  onSelectPlan,
  onOpenMfInfo,
  onProceed,
}: EmiPlanListProps) {
  const currentPrice = selectedVariant.price;
  const currentMrp = selectedVariant.mrp;
  const savings = Math.max(0, currentMrp - currentPrice);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
      {/* 1. Header with Pricing & Mutual Fund Backing Tag (Matching Reference Screenshot) */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
            {formatINR(currentPrice)}
          </span>
          {savings > 0 && (
            <span className="text-base sm:text-lg text-slate-400 line-through font-medium">
              {formatINR(currentMrp)}
            </span>
          )}
          {savings > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Save {formatINR(savings)}
            </span>
          )}
        </div>

        {/* Reference Subtitle with clickable Info trigger */}
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center gap-1.5 text-slate-700">
            <h3 className="text-sm sm:text-base font-semibold text-slate-800">
              EMI plans backed by mutual funds
            </h3>
            <button
              onClick={onOpenMfInfo}
              className="text-purple-600 hover:text-purple-800 transition-colors p-0.5 rounded-full hover:bg-purple-50"
              title="Learn how 1Fi mutual fund backed EMI works"
              aria-label="Learn how mutual fund backed EMI works"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenMfInfo}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 underline underline-offset-2 flex items-center gap-1"
          >
            <span>How it works</span>
          </button>
        </div>
      </div>

      {/* 2. List of EMI Plans (Exact match to Reference Screenshot layout) */}
      <div className="py-4 space-y-2.5">
        {emiPlans.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;
          
          // Dynamically compute monthly EMI based on the current selected variant's price
          const breakdown = calculateEmiBreakdown(
            currentPrice,
            plan.tenureMonths,
            plan.interestRate,
            plan.cashbackAmount
          );

          const monthlyFormatted = formatINR(breakdown.monthlyAmount);
          const cashbackFormatted = formatINR(plan.cashbackAmount);

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan)}
              className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                isSelected
                  ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-600/20 shadow-sm'
                  : 'border-slate-200/80 bg-white hover:border-purple-300 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                {/* Left: Monthly installment calculation e.g. "₹44,967 x 3 months" */}
                <div className="flex items-center gap-3">
                  {/* Radio button indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-600 text-white'
                        : 'border-slate-300 group-hover:border-purple-400 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base font-bold text-slate-900 font-outfit">
                      {monthlyFormatted} <span className="text-slate-600 font-medium">x {plan.tenureMonths} months</span>
                    </span>

                    {/* Cashback text in green (matching screenshot) */}
                    {plan.cashbackAmount > 0 && (
                      <span className="text-xs font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        Additional cashback of {cashbackFormatted}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Interest Rate Badge (e.g. "0% interest" or "10.5% interest") */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                      plan.interestRate === 0
                        ? 'bg-slate-100 text-slate-800 border border-slate-200 group-hover:border-purple-200'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {plan.badgeText || (plan.interestRate === 0 ? '0% interest' : `${plan.interestRate}% interest`)}
                  </span>
                </div>
              </div>

              {/* Expanded Plan Benefit preview when selected */}
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-purple-100 flex flex-wrap items-center justify-between text-xs text-purple-950 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">Total Payable:</span>
                    <span className="font-bold">{formatINR(breakdown.totalPayable)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    <span>Est. MF Growth during tenure:</span>
                    <span className="font-bold">+{formatINR(breakdown.mutualFundGrowth)}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Proceed Action Button (matching item 3 in assignment requirements) */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        {selectedPlan && (
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Selected: <strong>{selectedPlan.tenureMonths} Months Plan</strong></span>
            <span>Monthly: <strong>{formatINR(calculateEmiBreakdown(currentPrice, selectedPlan.tenureMonths, selectedPlan.interestRate).monthlyAmount)}/mo</strong></span>
          </div>
        )}

        <button
          onClick={onProceed}
          className="w-full py-4 px-6 rounded-2xl bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white font-bold text-base shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/35 transition-all flex items-center justify-center gap-3 group active:scale-[0.99]"
        >
          <span>Proceed with selected plan</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            Zero Processing Fees
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-yellow-500" />
            Instant Digital Approval
          </span>
        </div>
      </div>
    </div>
  );
}
