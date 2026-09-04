'use client';

import React from 'react';
import Link from 'next/link';
import { ProductType } from '@/lib/types';
import { formatINR } from '@/lib/emiUtils';
import { Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const defaultVariant = product.variants?.find((v) => v.isDefault) || product.variants?.[0];
  const lowestEmi = product.emiPlans?.length > 0
    ? Math.min(...product.emiPlans.map((p) => p.monthlyEmi))
    : null;

  const price = defaultVariant?.price || 127400;
  const mrp = defaultVariant?.mrp || 134900;
  const savings = Math.max(0, mrp - price);
  const discountPercent = Math.round((savings / mrp) * 100);

  // Unique colors
  const uniqueColors = Array.from(
    new Set(product.variants?.map((v) => v.colorName) || [])
  ).map((name) => product.variants.find((v) => v.colorName === name)!);

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/90 hover:border-purple-300 p-5 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {product.badge ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-700 text-white shadow-sm">
              {product.badge}
            </span>
          ) : <span />}

          <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full text-[11px] font-bold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Image Stage */}
        <Link 
          href={`/products/${product.slug}`}
          className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6 mb-4 overflow-hidden group-hover:bg-purple-50/20 transition-colors"
        >
          <img
            src={defaultVariant?.imageUrl}
            alt={product.title}
            className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          />

          {/* Color Finish dots preview */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-200/60 shadow-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {uniqueColors.slice(0, 4).map((c) => (
              <span
                key={c.id}
                className="w-2.5 h-2.5 rounded-full border border-black/10"
                style={{ backgroundColor: c.colorHex }}
                title={c.colorName}
              />
            ))}
          </div>
        </Link>

        {/* Brand & Title */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
            {product.brand}
          </span>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-bold text-slate-900 font-outfit hover:text-purple-700 transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 font-outfit">
              {formatINR(price)}
            </span>
            {savings > 0 && (
              <span className="text-xs text-slate-400 line-through">
                {formatINR(mrp)}
              </span>
            )}
          </div>
          {savings > 0 && (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Save {formatINR(savings)}
            </span>
          )}
        </div>

        {/* Mutual Fund EMI Banner */}
        {lowestEmi && (
          <div className="mt-3 p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">MF Backed EMI from:</span>
            <span className="font-extrabold text-purple-900 font-outfit">
              {formatINR(lowestEmi)}/mo
            </span>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <Link
        href={`/products/${product.slug}`}
        className="mt-4 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm group-hover:shadow-md"
      >
        <span>View EMI Plans & Variants</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
