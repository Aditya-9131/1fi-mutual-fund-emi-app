'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ProductType, ProductVariantType, EmiPlanType } from '@/lib/types';
import ProductGallery from '@/components/ProductGallery';
import VariantSelector from '@/components/VariantSelector';
import EmiPlanList from '@/components/EmiPlanList';
import EmiProceedModal from '@/components/EmiProceedModal';
import MutualFundInfoModal from '@/components/MutualFundInfoModal';
import { 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RefreshCcw, 
  Star, 
  CheckCircle,
  Cpu,
  Layers,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { formatINR } from '@/lib/emiUtils';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantType | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EmiPlanType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isMfInfoOpen, setIsMfInfoOpen] = useState(false);
  const [isProceedModalOpen, setIsProceedModalOpen] = useState(false);

  // Fetch product from API
  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          const prod: ProductType = data.data;
          setProduct(prod);
          const defaultVar =
            prod.variants.find((v) => v.isDefault) || prod.variants[0];
          setSelectedVariant(defaultVar);
          // Default select the 6m or 12m zero-percent plan or first plan
          const defaultPlan =
            prod.emiPlans.find((p) => p.isPopular) || prod.emiPlans[0];
          setSelectedPlan(defaultPlan || null);
        } else {
          setError(data.error || 'Product not found');
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('Failed to fetch product data from server.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-purple-700 animate-spin" />
        <p className="text-sm font-semibold text-slate-600">
          Loading product and Mutual Fund-backed EMI plans...
        </p>
      </div>
    );
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-outfit">Product Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">{error || "The requested product doesn't exist."}</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 text-white font-bold text-sm hover:bg-purple-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-purple-700 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/" className="hover:text-purple-700 transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-400">{product.brand}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">{product.title}</span>
      </nav>

      {/* Main Product Layout (Matching assignment reference screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
        
        {/* Left Column: Product Gallery & Variant Selector (5-6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Gallery Component with finishes selector */}
          <ProductGallery
            currentVariant={selectedVariant}
            allVariants={product.variants}
            onSelectVariant={(v) => setSelectedVariant(v)}
            badge={product.badge}
          />

          {/* Variant Selector Component */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
              Select Specification & Finish
            </h3>
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={(v) => setSelectedVariant(v)}
            />
          </div>

          {/* Trust & Delivery Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 text-center text-xs">
            <div className="flex flex-col items-center gap-1.5 p-2">
              <Truck className="w-5 h-5 text-purple-700" />
              <span className="font-bold text-slate-800">Free Express Delivery</span>
              <span className="text-[10px] text-slate-500">Ships within 24 hours</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 border-x border-slate-100">
              <ShieldCheck className="w-5 h-5 text-purple-700" />
              <span className="font-bold text-slate-800">1 Year Brand Warranty</span>
              <span className="text-[10px] text-slate-500">100% Genuine product</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2">
              <RefreshCcw className="w-5 h-5 text-purple-700" />
              <span className="font-bold text-slate-800">7 Days Replacement</span>
              <span className="text-[10px] text-slate-500">Hassle-free guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title + Exact EMI Plans Table (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Product Header Information */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                {product.brand} Flagship
              </span>

              <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Product Title & Storage Heading */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit tracking-tight">
              {product.title}
            </h1>
            <p className="text-sm font-semibold text-purple-900 mt-1">
              {selectedVariant.storage} • {selectedVariant.colorName}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* EMI Plans Table (Exact match to assignment reference screenshot!) */}
          <EmiPlanList
            productTitle={product.title}
            selectedVariant={selectedVariant}
            emiPlans={product.emiPlans}
            selectedPlan={selectedPlan}
            onSelectPlan={(plan) => setSelectedPlan(plan)}
            onOpenMfInfo={() => setIsMfInfoOpen(true)}
            onProceed={() => setIsProceedModalOpen(true)}
          />
        </div>
      </div>

      {/* Technical Specifications Section */}
      <div className="mt-12 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-outfit">Technical Specifications</h2>
            <p className="text-xs text-slate-500">Hardware & performance breakdown</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.features?.map((f, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 gap-1 sm:gap-4"
            >
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider sm:w-1/3">
                {f.title}
              </span>
              <span className="text-xs font-semibold text-slate-900 sm:w-2/3">
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <MutualFundInfoModal
        isOpen={isMfInfoOpen}
        onClose={() => setIsMfInfoOpen(false)}
        price={selectedVariant.price}
      />

      {selectedPlan && (
        <EmiProceedModal
          isOpen={isProceedModalOpen}
          onClose={() => setIsProceedModalOpen(false)}
          product={product}
          variant={selectedVariant}
          selectedPlan={selectedPlan}
        />
      )}
    </div>
  );
}
