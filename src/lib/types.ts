export interface ProductFeature {
  title: string;
  value: string;
}

export interface ProductVariantType {
  id: string;
  productId: string;
  name: string;
  colorName: string;
  colorHex: string;
  storage: string;
  mrp: number;
  price: number;
  stock: number;
  imageUrl: string;
  galleryImages: string[];
  isDefault: boolean;
}

export interface EmiPlanType {
  id: string;
  productId: string;
  tenureMonths: number;
  interestRate: number;
  monthlyEmi: number;
  cashbackAmount: number;
  isZeroPercent: boolean;
  badgeText?: string | null;
  minMfHolding: number;
  expectedMfReturnsRate: number;
  isPopular: boolean;
  orderIndex: number;
}

export interface ProductType {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  badge?: string | null;
  rating: number;
  reviewCount: number;
  features: ProductFeature[];
  variants: ProductVariantType[];
  emiPlans: EmiPlanType[];
}

export interface EmiCalculationBreakdown {
  monthlyAmount: number;
  tenureMonths: number;
  interestRate: number;
  principalAmount: number;
  totalInterest: number;
  totalPayable: number;
  cashbackAmount: number;
  effectiveCost: number;
  mutualFundGrowth: number;
  netSavingsWithMutualFund: number;
  minMutualFundRequired: number;
}
