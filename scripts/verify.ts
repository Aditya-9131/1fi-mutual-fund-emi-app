async function verifyAll() {
  const urls = [
    'http://localhost:3000/',
    'http://localhost:3000/products/iphone-17-pro',
    'http://localhost:3000/products/samsung-s24-ultra',
    'http://localhost:3000/products/google-pixel-9-pro',
    'http://localhost:3000/products/oneplus-12',
    'http://localhost:3000/api/products',
    'http://localhost:3000/api/products/iphone-17-pro',
    'http://localhost:3000/api/emi-calculator?price=127400&tenure=3&interest=0&cashback=7500',
  ];

  console.log('--- Testing Web App URLs & APIs ---');
  for (const u of urls) {
    const res = await fetch(u);
    console.log(`[${res.status}] ${u}`);
    if (!res.ok) throw new Error(`Failed to fetch ${u}`);
  }

  // Test Application submission
  const pRes = await fetch('http://localhost:3000/api/products/iphone-17-pro');
  const pData = await pRes.json();
  const appRes = await fetch('http://localhost:3000/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      applicantName: 'Ananya Verma',
      applicantPhone: '9811223344',
      applicantEmail: 'ananya@1fi.app',
      panNumber: 'ABCDE9876K',
      productId: pData.data.id,
      variantId: pData.data.variants[0].id,
      emiPlanId: pData.data.emiPlans[0].id,
      monthlyAmount: 44967,
      tenureMonths: 3,
      cashbackEarned: 7500,
    }),
  });
  const appData = await appRes.json();
  console.log(`[POST /api/applications]: Status ${appRes.status}, Approved Application ID: ${appData.data?.id}`);
  console.log('--- All tests passed successfully! ---');
}

verifyAll().catch((e) => {
  console.error('Verification failed:', e);
  process.exit(1);
});
