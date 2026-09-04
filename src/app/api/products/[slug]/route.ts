import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Search by slug first, or fallback to ID
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug: slug }, { id: slug }],
      },
      include: {
        variants: {
          orderBy: { price: 'asc' },
        },
        emiPlans: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: `Product '${slug}' not found`,
        },
        { status: 404 }
      );
    }

    const formattedProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      brand: product.brand,
      category: product.category,
      description: product.description,
      badge: product.badge,
      rating: product.rating,
      reviewCount: product.reviewCount,
      features: JSON.parse(product.features || '[]'),
      variants: product.variants.map((v) => ({
        ...v,
        galleryImages: JSON.parse(v.galleryImages || '[]'),
      })),
      emiPlans: product.emiPlans,
    };

    return NextResponse.json({
      success: true,
      data: formattedProduct,
    });
  } catch (error: any) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product details',
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
