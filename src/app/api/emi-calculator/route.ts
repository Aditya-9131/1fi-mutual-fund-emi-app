import { NextRequest, NextResponse } from 'next/server';
import { calculateEmiBreakdown } from '@/lib/emiUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const price = Number(searchParams.get('price')) || 127400;
    const tenureMonths = Number(searchParams.get('tenure')) || 12;
    const interestRate = Number(searchParams.get('interest')) || 0;
    const cashbackAmount = Number(searchParams.get('cashback')) || 7500;
    const expectedMfRate = Number(searchParams.get('mfRate')) || 12.0;

    const breakdown = calculateEmiBreakdown(
      price,
      tenureMonths,
      interestRate,
      cashbackAmount,
      expectedMfRate
    );

    return NextResponse.json({
      success: true,
      data: breakdown,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Calculation error', details: error?.message },
      { status: 500 }
    );
  }
}
