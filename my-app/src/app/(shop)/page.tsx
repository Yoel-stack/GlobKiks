import { ProductGrid, Title } from "@/components";
import { prisma } from "@/lib/prisma";
import { transformRawProduct } from "@/components/helpers/transformProduct"; // Creamos un helper para que me quede mas ordenado el productGrid


export default async function Home() {
  
  const productsFromDb = await prisma.product.findMany();

  const products = productsFromDb.map(transformRawProduct);

  return (
    <>
      <nav className="p-2 mb-4 flex justify-center text-center">
        <Title title="" subtitle="Todos los championes" />
      </nav>
      <ProductGrid products={products} />
    </>
  )
};



