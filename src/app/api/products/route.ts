import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          orderBy: { price: 'asc' },
        },
        emiPlans: {
          orderBy: { orderIndex: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    const parsedProducts = products.map((p) => {
      const defaultVariant = p.variants.find((v) => v.isDefault) || p.variants[0];
      const lowestEmi = p.emiPlans.length > 0
        ? Math.min(...p.emiPlans.map((plan) => plan.monthlyEmi))
        : null;

      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        brand: p.brand,
        category: p.category,
        description: p.description,
        badge: p.badge,
        rating: p.rating,
        reviewCount: p.reviewCount,
        features: JSON.parse(p.features || '[]'),
        variantsCount: p.variants.length,
        defaultVariant: defaultVariant
          ? {
              ...defaultVariant,
              galleryImages: JSON.parse(defaultVariant.galleryImages || '[]'),
            }
          : null,
        lowestEmi,
        variants: p.variants.map((v) => ({
          ...v,
          galleryImages: JSON.parse(v.galleryImages || '[]'),
        })),
        emiPlans: p.emiPlans,
      };
    });

    return NextResponse.json({
      success: true,
      count: parsedProducts.length,
      data: parsedProducts,
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products from database',
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
