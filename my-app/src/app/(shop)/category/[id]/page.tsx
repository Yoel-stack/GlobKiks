import { ProductGrid, Title, transformRawProduct } from "@/components";  
import { ValidCatergories } from "@/interfaces";
import { prisma } from "@/lib/prisma";

  
type PageProps = {
  params: Promise<{
    id: ValidCatergories; // ID porque le pasa la id del producto -> ValidCategories
  }>;
};

export default async function CategoryPage({ params }: PageProps) {
  
  const { id } = await params;  

  const productsFromDb = await prisma.product.findMany({
    where: {
      gender: id, // Consultamos a nuestra base de datos 

    },
  });

  const products = productsFromDb.map(transformRawProduct); 

  const idS = {
    mujeres: "para mujeres", 
    hombres: "para hombres",
    unisex: "unisex",
  };

  return (
    <>
      <nav className="p-2 mb-4 flex justify-center text-center">
        <Title title="" subtitle={`Articulos ${idS[id]}`} />
      </nav>
      <ProductGrid products={products} />
    </>
  );
};

