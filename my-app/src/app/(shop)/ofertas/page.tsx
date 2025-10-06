import { Productofertas, Title } from "@/components";
import { initialData } from "@/seed";


const products = initialData.products;


export default function Ofertas() {
  return (
    <>
      <Title title="Ofertas del mes" subtitle="Todos los championes en oferta!" className="mb-3" />
      <Productofertas products={products} />
    </>
  );
};
