import { Productofertas, Title, transformRawProduct } from "@/components";
import { prisma } from "@/lib/prisma";

// Forzamos SSR, no SSG
export const revalidate = 0;

export default async function Ofertas() {
  let products: ReturnType<typeof transformRawProduct>[] = [];

  try {
    const currentMonth = new Date().getMonth() + 1;

    const productsFromDb = await prisma.product.findMany({
      where: {
        priceOferta: { gt: 0 }, // solo productos en oferta
        mesOferta: currentMonth,
      },
      orderBy: { createdAt: "desc" },
    });

    // Filtrar productos cuyo precio en oferta sea menor que el precio normal
    const filteredProducts = productsFromDb.filter(
      (p) => p.priceOferta! < p.price
    );

    products = filteredProducts.map(transformRawProduct);
  } catch (error) {
    console.error("Error fetching offers:", error);
    // products queda vacío si falla la DB
  }

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
}


