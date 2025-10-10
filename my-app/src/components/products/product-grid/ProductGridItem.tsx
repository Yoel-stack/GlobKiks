/* Cuando usamos un hook, una herramienta debemos usar un 'use client' */

'use client';


import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces";
import { useState } from "react";


interface Props {
    product: Product;
} 


export const ProductGridItem = ({ product }:Props ) => {

    const [displayImage, setDisplayImage] = useState (product.images[0]);  

      const currentMonth = new Date().getMonth() + 1;

  const isOferta =
    typeof product.priceOferta === 'number' &&
    product.priceOferta < product.price &&
    product.mesOferta === currentMonth;

    return (
      <div className="place-items-center ml-3 p-2 rounded-md">
        <Link className="flex" href={`/product/${product.slug}`}>
          <Image
            src={`/products/${displayImage}`}
            alt={product.title}
            className="rounded"
            width={300}
            height={300}
            onMouseEnter={() => setDisplayImage(product.images[1])}
            onMouseLeave={() => setDisplayImage(product.images[0])}
          />
        </Link>
        <div className="mt-2 flex">
          <Link
            className="text hover p-1 text-decoration-none text-black"
            href={`/product/${product.slug}`}
          >
            {product.title}
          </Link>
        </div>
        <div>
          <p className="text">
            {isOferta ? (
              <>
                <span className="line-through text-gray-400 mr-1">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-red-600">
                  ${product.priceOferta.toFixed(2)}
                </span>
              </>
            ) : (
              <span>${product.price.toFixed(2)}</span>
            )}
          </p>
        </div>
      </div>
    );
};
