'use client';

import React from 'react';
import { ProductVariantType } from '@/lib/types';
import { formatINR } from '@/lib/emiUtils';
import { Check, Sparkles } from 'lucide-react';

interface VariantSelectorProps {
  variants: ProductVariantType[];
  selectedVariant: ProductVariantType;
  onSelectVariant: (variant: ProductVariantType) => void;
}

export default function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) {
  // Extract unique storage capacities
  const availableStorages = Array.from(new Set(variants.map((v) => v.storage)));

  // Extract unique colors
  const availableColors = Array.from(
    new Set(variants.map((v) => v.colorName))
  ).map((colorName) => variants.find((v) => v.colorName === colorName)!);

  const handleColorChange = (colorName: string) => {
    // Find matching variant with same storage if possible, else first matching color
    const match =
      variants.find(
        (v) => v.colorName === colorName && v.storage === selectedVariant.storage
      ) || variants.find((v) => v.colorName === colorName);

    if (match) onSelectVariant(match);
  };

  const handleStorageChange = (storage: string) => {
    // Find matching variant with same color if possible, else first matching storage
    const match =
      variants.find(
        (v) => v.storage === storage && v.colorName === selectedVariant.colorName
      ) || variants.find((v) => v.storage === storage);

    if (match) onSelectVariant(match);
  };

  const savings = Math.max(0, selectedVariant.mrp - selectedVariant.price);
  const discountPercent = Math.round((savings / selectedVariant.mrp) * 100);

  return (
    <div className="space-y-6 pt-2">
      {/* 1. Color / Finish Selection */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Finish & Color:
          </label>
          <span className="text-xs font-bold text-purple-900 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
            {selectedVariant.colorName}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {availableColors.map((color) => {
            const isSelected = color.colorName === selectedVariant.colorName;
            return (
              <button
                key={color.id}
                onClick={() => handleColorChange(color.colorName)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50/50 shadow-sm ring-2 ring-purple-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-black/10 shadow-inner flex items-center justify-center shrink-0"
                  style={{ backgroundColor: color.colorHex }}
                >
                  {isSelected && <Check className="w-3 h-3 text-white drop-shadow-md" />}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-purple-950 font-bold' : 'text-slate-700'
                  }`}
                >
                  {color.colorName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Storage Selection */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Storage Capacity:
          </label>
          <span className="text-xs text-slate-500">Fast NVMe flash storage</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {availableStorages.map((storage) => {
            const isSelected = storage === selectedVariant.storage;
            // Find corresponding variant to display price
            const variantForStorage = variants.find(
              (v) => v.storage === storage && v.colorName === selectedVariant.colorName
            ) || variants.find((v) => v.storage === storage);

            return (
              <button
                key={storage}
                onClick={() => handleStorageChange(storage)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'border-purple-600 bg-gradient-to-b from-purple-50/80 to-purple-100/30 ring-2 ring-purple-500/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`text-sm font-bold ${
                    isSelected ? 'text-purple-900' : 'text-slate-800'
                  }`}
                >
                  {storage}
                </span>
                {variantForStorage && (
                  <span
                    className={`text-[11px] mt-0.5 ${
                      isSelected ? 'text-purple-700 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {formatINR(variantForStorage.price)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
