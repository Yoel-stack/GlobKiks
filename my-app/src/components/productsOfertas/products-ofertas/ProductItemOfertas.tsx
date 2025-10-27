// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Product } from "@/interfaces";
// import { useState } from "react";


// interface Props {
//     product: Product;
// } 

// export const ProductItemOfertas = ({ product }:Props ) => {

//     const [displayImage, setDisplayImage] = useState (product.images[0]);  

//     return (
//       <div className="place-items-center ml-3 p-2 rounded-md">
//         <Link className="flex" href={`/product/${product.slug}`}>
//           <Image
//             src={`/products/${displayImage}`}
//             alt={product.title}
//             className="rounded"
//             width={300}
//             height={300}
//             onMouseEnter={() => setDisplayImage(product.images[1])}
//             onMouseLeave={() => setDisplayImage(product.images[0])}
//           />
//         </Link>
//         <div className="mt-2 flex">
//           <Link
//             className="text hover p-1 text-decoration-none text-black"
//             href={`/product/${product.slug}`}
//           >
//             {product.title}
//           </Link>
//         </div>
//         <div>
//           {product.price ? (
//             <>
//               <span className="line-through text-gray-500 mr-2">
//                 ${product.priceOriginal}
//               </span>
//               <span className="text-red-600">
//                 ${product.priceOferta}
//               </span>
//             </>
//           ) : (
//             <span>${product.priceOferta}</span>
//           )}
//         </div>
//       </div>
//     );
// };
"use client"; // necesario para usar useState

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/interfaces";

interface Props {
  product: Product;
}

export const ProductItemOfertas = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

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
        {product.price ? (
          <>
            <span className="line-through text-gray-500 mr-2">
              ${product.priceOriginal}
            </span>
            <span className="text-red-600">${product.priceOferta}</span>
          </>
        ) : (
          <span>${product.priceOferta}</span>
        )}
      </div>
    </div>
  );
};
