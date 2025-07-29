import { ProductGrid, Title } from "@/components";
import { ValidCatergories } from "@/interfaces";
import { initialData } from "@/seed";

const categoryProducts = initialData.products;

interface Props {
  params: {
    id: ValidCatergories; //id porque le pasa la id del producto... validCategories
  }  
}

export default function categoryPage({ params }: Props) {
  const { id } = params;
  const products = categoryProducts.filter((product) => product.gender === id);

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
}

