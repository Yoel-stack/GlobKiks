// import React from "react";
// import { Product } from "@/interfaces";
// import { ProductItemOfertas } from "./ProductItemOfertas";

// interface Props {
//   products: Product[];
// }

// export const Productofertas = ({ products }: Props) => {
//   const currentMonth = new Date().getMonth() + 1;

//   // Filtrar productos con oferta válida este mes
//   const productosEnOferta = products
//     .filter(
//       (product) => product.mesOferta === currentMonth && product.priceOferta
//     )
//     .map((product) => ({
//       ...product,
//       priceOriginal: product.price, // Guardamos el precio original
//       price: product.priceOferta ?? product.price, // Sobrescribimos price con el de oferta
//     }));

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
//       {productosEnOferta.map((product) => (
//         <ProductItemOfertas key={product.slug} product={product} />
//       ))}
//     </div>
//   );
// };
"use client"; // necesario para usar useState

import { ProductItemOfertas } from "./ProductItemOfertas";
import { Product } from "@/interfaces";

interface Props {
  products: Product[];
}

export const Productofertas = ({ products }: Props) => {
  const currentMonth = new Date().getMonth() + 1;

  // Filtrar productos con oferta válida este mes
  const productosEnOferta = products
    .filter(
      (product) => product.mesOferta === currentMonth && product.priceOferta
    )
    .map((product) => ({
      ...product,
      priceOriginal: product.price, // Guardamos el precio original
      price: product.priceOferta ?? product.price, // Sobrescribimos price con el de oferta
    }));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
      {productosEnOferta.map((product) => (
        <ProductItemOfertas key={product.slug} product={product} />
      ))}
    </div>
  );
};
