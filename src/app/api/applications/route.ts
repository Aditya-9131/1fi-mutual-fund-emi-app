import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      applicantName,
      applicantPhone,
      applicantEmail,
      panNumber,
      productId,
      variantId,
      emiPlanId,
      monthlyAmount,
      tenureMonths,
      cashbackEarned,
      mfPledgedUnits,
    } = body;

    // Validation
    if (!applicantName || !applicantPhone || !panNumber || !productId || !variantId || !emiPlanId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required application fields (name, phone, PAN, product, variant, emiPlan)',
        },
        { status: 400 }
      );
    }

    const newApplication = await prisma.application.create({
      data: {
        applicantName,
        applicantPhone,
        applicantEmail: applicantEmail || `${applicantPhone}@example.com`,
        panNumber: panNumber.toUpperCase(),
        productId,
        variantId,
        emiPlanId,
        monthlyAmount: Number(monthlyAmount),
        tenureMonths: Number(tenureMonths),
        cashbackEarned: Number(cashbackEarned || 0),
        status: 'APPROVED',
        mfPledgedUnits: Number(mfPledgedUnits || 100),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Mutual Fund backed EMI Application approved instantly!',
      data: newApplication,
    });
  } catch (error: any) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process application',
        details: error?.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
