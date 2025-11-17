import { Productofertas, Title, transformRawProduct } from "@/components";  
import { prisma } from "@/lib/prisma";


export default async function Ofertas() {

    const currentMonth = new Date().getMonth() + 1;

    const productsFromDb = await prisma.product.findMany({
      where: {
        priceOferta: {
          gt: 0, // Para que no traiga productos sin oferta o con precio 0
        },
        mesOferta: currentMonth,
      }, 
      orderBy: {
        createdAt: "desc", 
      },
    });

    // Filtrar en memoria aquellos cuyo priceOferta sea menor que price
    const filteredProducts = productsFromDb.filter(
      (p) => p.priceOferta! < p.price
    );

    const products = filteredProducts.map(transformRawProduct);

    return (
      <>
        <Title
          title="Ofertas del mes"
          subtitle="Todos los championes en oferta!"
          className="mb-3"
        />
        <Productofertas products={products} />
      </>
    );
};
  