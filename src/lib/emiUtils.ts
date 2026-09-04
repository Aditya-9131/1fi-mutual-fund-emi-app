import { EmiCalculationBreakdown } from './types';

/**
 * Format currency in Indian numbering format: e.g. ₹1,27,400
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

/**
 * Format raw number with Indian commas
 */
export function formatNumberINR(amount: number): string {
  if (isNaN(amount)) return '0';
  return Math.round(amount).toLocaleString('en-IN');
}

/**
 * Calculate detailed EMI breakdown and estimated Mutual Fund returns during tenure
 *
 * How 1Fi Mutual Fund-backed EMI works:
 * 1. User pledges their existing Mutual Fund portfolio without selling/redeeming units.
 * 2. They pay a low/zero-cost monthly installment.
 * 3. Their pledged Mutual Fund portfolio continues to earn compounding market returns (~12% p.a.).
 * 4. The returns generated often exceed the total loan interest, yielding net positive savings!
 */
export function calculateEmiBreakdown(
  price: number,
  tenureMonths: number,
  interestRate: number,
  cashbackAmount: number = 0,
  expectedMfRate: number = 12.0
): EmiCalculationBreakdown {
  let monthlyAmount: number;
  let totalPayable: number;
  let totalInterest: number;

  if (interestRate === 0) {
    monthlyAmount = Math.ceil(price / tenureMonths);
    totalPayable = monthlyAmount * tenureMonths;
    totalInterest = 0;
  } else {
    const monthlyRate = interestRate / (12 * 100);
    monthlyAmount = Math.round(
      (price * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1)
    );
    totalPayable = monthlyAmount * tenureMonths;
    totalInterest = totalPayable - price;
  }

  const effectiveCost = totalPayable - cashbackAmount;

  // Assume minimum MF pledged portfolio is roughly equal to product value (or 1.2x)
  const pledgedMfAmount = Math.max(price * 1.0, 50000);
  const years = tenureMonths / 12;
  // Compound interest on pledged MF: A = P * (1 + r)^t - P
  const mutualFundGrowth = Math.round(
    pledgedMfAmount * (Math.pow(1 + expectedMfRate / 100, years) - 1)
  );

  // Net benefit: Cashback + MF Growth - Total Interest
  const netSavingsWithMutualFund = Math.round(
    cashbackAmount + mutualFundGrowth - totalInterest
  );

  return {
    monthlyAmount,
    tenureMonths,
    interestRate,
    principalAmount: price,
    totalInterest,
    totalPayable,
    cashbackAmount,
    effectiveCost,
    mutualFundGrowth,
    netSavingsWithMutualFund,
    minMutualFundRequired: pledgedMfAmount,
  };
}
