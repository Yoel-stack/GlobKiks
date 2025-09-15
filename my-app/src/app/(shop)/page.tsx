import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed";


const products = initialData.products;


export default function Home() {
  return (
    <>
      <Title title="Tienda" subtitle="Todos los championes" className="mb-3" />
      <ProductGrid products={products} />
    </>
  );
}
