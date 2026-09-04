'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProductVariantType } from '@/lib/types';
import { ShieldCheck, Sparkles, ZoomIn, Check } from 'lucide-react';

interface ProductGalleryProps {
  currentVariant: ProductVariantType;
  allVariants: ProductVariantType[];
  onSelectVariant: (variant: ProductVariantType) => void;
  badge?: string | null;
}

export default function ProductGallery({
  currentVariant,
  allVariants,
  onSelectVariant,
  badge = 'NEW',
}: ProductGalleryProps) {
  const galleryImages = currentVariant.galleryImages && currentVariant.galleryImages.length > 0
    ? currentVariant.galleryImages
    : [currentVariant.imageUrl];

  const [activeImage, setActiveImage] = useState(galleryImages[0] || currentVariant.imageUrl);

  // Sync active image when variant changes
  useEffect(() => {
    if (currentVariant.galleryImages && currentVariant.galleryImages.length > 0) {
      setActiveImage(currentVariant.galleryImages[0]);
    } else {
      setActiveImage(currentVariant.imageUrl);
    }
  }, [currentVariant]);

  // Unique colors available
  const uniqueColors = Array.from(
    new Set(allVariants.map((v) => v.colorName))
  ).map((colorName) => allVariants.find((v) => v.colorName === colorName)!);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Main Image Stage */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square max-h-[540px] rounded-3xl bg-gradient-to-b from-slate-100/90 via-slate-50 to-white border border-slate-200/90 flex items-center justify-center p-8 overflow-hidden shadow-sm group">
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
          {badge && (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-700 text-white shadow-md shadow-purple-600/30">
              {badge}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-200/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            In Stock ({currentVariant.stock} units)
          </span>
        </div>

        {/* 1Fi MF Trust Watermark badge */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          <span>1Fi 0% Collateral Pledge</span>
        </div>

        {/* Dynamic Product Image */}
        <div className="relative w-full h-full max-w-[340px] max-h-[460px] transition-transform duration-500 ease-out group-hover:scale-105">
          <img
            src={activeImage}
            alt={currentVariant.name}
            className="w-full h-full object-contain filter drop-shadow-2xl"
          />
        </div>

        {/* Bottom Finishes Indicator (matching reference image) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 shadow-md flex flex-col items-center gap-1.5">
          <span className="text-[11px] font-medium text-slate-600">
            Available in {uniqueColors.length} finishes
          </span>
          <div className="flex items-center gap-2">
            {uniqueColors.map((colorVariant) => {
              const isSelected = colorVariant.colorName === currentVariant.colorName;
              return (
                <button
                  key={colorVariant.id}
                  onClick={() => onSelectVariant(colorVariant)}
                  className={`w-4 h-4 rounded-full transition-all relative ${
                    isSelected ? 'ring-2 ring-purple-600 ring-offset-2 scale-110' : 'hover:scale-110 opacity-80'
                  }`}
                  style={{ backgroundColor: colorVariant.colorHex }}
                  title={colorVariant.colorName}
                  aria-label={`Select ${colorVariant.colorName}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Thumbnails (if multiple gallery images exist) */}
      {galleryImages.length > 1 && (
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`w-16 h-16 rounded-xl border p-1 bg-white transition-all overflow-hidden flex items-center justify-center ${
                activeImage === img
                  ? 'border-purple-600 ring-2 ring-purple-100 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
