import { prisma } from "@/lib/prisma";
import ProductDetails from "@/components/product/products-details/ProductsDetails";
import { transformRawProduct } from "@/components/helpers/transformProduct";
import type { Product } from "@/interfaces";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: PageProps) {

  const { slug } = await params;

  
  const rawProduct = await prisma.product.findUnique({
    where: { slug },
  });

  if (!rawProduct) {
    return <div className="text-center text py-10"> Producto no encontrado </div>;
  }

  let product: Product;
  try {
    product = transformRawProduct(rawProduct);
  } catch {
    return <div className="text-center text-red-600 py-10"> Error al cargar el producto </div>;
  }

  return <ProductDetails product={product} />;
}; 