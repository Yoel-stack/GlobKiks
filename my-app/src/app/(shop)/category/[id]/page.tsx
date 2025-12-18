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
      <Title
        title={`Articulos ${idS[id]}`}
        subtitle="Todos los championes"
        className=" "
      />
      <ProductGrid products={products} />
    </>
  );
};

