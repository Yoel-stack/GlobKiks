import { prisma } from '../src/lib/prisma';
import { initialData } from '../src/seed'; 

async function main() {
  await prisma.product.deleteMany();

  await Promise.all(
    initialData.products.map(product =>
      prisma.product.create({
        data: {
          ...product,
        },
      })
    )
  );
}; 

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
