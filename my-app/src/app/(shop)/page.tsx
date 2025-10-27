import { ProductGrid, Title } from "@/components";
import { prisma } from "@/lib/prisma";
import { transformRawProduct } from "@/components/helpers/transformProduct"; // Creamos un helper para que me quede mas ordenado el productGrid


export default async function Home() {
  
  const productsFromDb = await prisma.product.findMany();

  const products = productsFromDb.map(transformRawProduct);

  return (
    <>
      <Title title="Tienda" subtitle="Todos los championes" className="mb-3" />
      <ProductGrid products={products} />
    </> 
  );
};



