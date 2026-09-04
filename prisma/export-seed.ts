import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function exportSeed() {
  const products = await prisma.product.findMany({
    include: {
      variants: true,
      emiPlans: true,
    },
  });

  const outputPath = path.join(process.cwd(), 'prisma', 'seed-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`Exported ${products.length} products to ${outputPath}`);
}

exportSeed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
