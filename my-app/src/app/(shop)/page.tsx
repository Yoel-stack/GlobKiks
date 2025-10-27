import { ProductGrid, Title } from "@/components";
import { prisma } from "@/lib/prisma";
import { transformRawProduct } from "@/components/helpers/transformProduct";

// Forzamos SSR, no SSG
export const revalidate = 0;

export default async function Home() {
  let products = [];

  try {
    const productsFromDb = await prisma.product.findMany();
    products = productsFromDb.map(transformRawProduct);
  } catch (error) {
    console.error("Error fetching products for Home:", error);
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los championes" className="mb-3" />
      <ProductGrid products={products} />
    </>
  );
}

