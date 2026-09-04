'use client';

import React, { useState } from 'react';
import { ProductType, ProductVariantType, EmiPlanType } from '@/lib/types';
import { formatINR, calculateEmiBreakdown } from '@/lib/emiUtils';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Loader2,
  Building2,
  Smartphone,
  Calendar,
  CreditCard,
  Check
} from 'lucide-react';

interface EmiProceedModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductType;
  variant: ProductVariantType;
  selectedPlan: EmiPlanType;
}

export default function EmiProceedModal({
  isOpen,
  onClose,
  product,
  variant,
  selectedPlan,
}: EmiProceedModalProps) {
  const [step, setStep] = useState<'form' | 'pledge' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul.sharma@example.com',
    pan: 'ABCDE1234F',
  });
  const [applicationResult, setApplicationResult] = useState<any>(null);

  if (!isOpen) return null;

  const breakdown = calculateEmiBreakdown(
    variant.price,
    selectedPlan.tenureMonths,
    selectedPlan.interestRate,
    selectedPlan.cashbackAmount
  );

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName: formData.name,
          applicantPhone: formData.phone,
          applicantEmail: formData.email,
          panNumber: formData.pan,
          productId: product.id,
          variantId: variant.id,
          emiPlanId: selectedPlan.id,
          monthlyAmount: breakdown.monthlyAmount,
          tenureMonths: selectedPlan.tenureMonths,
          cashbackEarned: selectedPlan.cashbackAmount,
          mfPledgedUnits: 150.0,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setApplicationResult(data.data);
        setStep('success');
      } else {
        alert(data.error || 'Failed to process application');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while processing application');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white p-6 relative">
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-lg bg-yellow-400 text-purple-950 font-black text-xs flex items-center justify-center">
              ↑Fi
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
              Mutual Fund Backed EMI Application
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white">
            {step === 'success' ? 'Application Approved! 🎉' : 'Proceed with Selected Plan'}
          </h3>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {step === 'form' && (
            <>
              {/* Selected Plan Summary Card */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={variant.imageUrl}
                      alt={variant.name}
                      className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-purple-100 shadow-sm"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-outfit leading-tight">
                        {product.title}
                      </h4>
                      <p className="text-xs text-slate-500">{variant.name}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    {formatINR(variant.price)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-purple-100/80 text-center">
                  <div className="bg-white/80 p-2 rounded-xl border border-purple-100/50">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Monthly EMI</span>
                    <span className="text-xs sm:text-sm font-extrabold text-purple-900">
                      {formatINR(breakdown.monthlyAmount)}
                    </span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-xl border border-purple-100/50">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Tenure</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                      {selectedPlan.tenureMonths} Months
                    </span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-xl border border-purple-100/50">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Interest</span>
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-700">
                      {selectedPlan.interestRate === 0 ? '0% Zero Cost' : `${selectedPlan.interestRate}%`}
                    </span>
                  </div>
                </div>

                {selectedPlan.cashbackAmount > 0 && (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200/60 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Guaranteed Cashback on 1st EMI:
                    </span>
                    <span className="font-bold">{formatINR(selectedPlan.cashbackAmount)}</span>
                  </div>
                )}
              </div>

              {/* Applicant Details Form */}
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Applicant & KYC Verification
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name (As per PAN)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/50"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (Linked to Aadhaar/MF)
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/50"
                      placeholder="e.g. 9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/50"
                      placeholder="e.g. rahul@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PAN Card Number
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/50"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                </div>

                {/* Mutual Fund Security Notice */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                  <Lock className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>
                    Your mutual fund units remain invested under your name and continue earning returns. No sale or redemption occurs.
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white font-bold text-sm shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying MF Portfolio with CAMS/KFintech...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Pledge Mutual Funds</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900 font-outfit">
                  Mutual Fund Loan Disbursed!
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Your application for {product.title} ({variant.name}) has been approved instantly with 0% down-payment.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Application ID:</span>
                  <span className="font-mono font-bold text-slate-800">{applicationResult?.id || '1FI-APP-8942'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-semibold text-slate-800">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly EMI:</span>
                  <span className="font-bold text-purple-700">{formatINR(breakdown.monthlyAmount)} / month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tenure:</span>
                  <span className="font-semibold text-slate-800">{selectedPlan.tenureMonths} Months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cashback Credited:</span>
                  <span className="font-bold text-emerald-600">{formatINR(selectedPlan.cashbackAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    INSTANTLY APPROVED
                  </span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
              >
                Back to Product Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
