/* Cuando usamos un hook, una herramienta debemos usar un 'use client' */

'use client';


import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces";
import { useState } from "react";
// import { useFormState } from "react-dom";

interface Props {
    product: Product;
}


export const ProductGridItem = ({ product }:Props ) => {

    const [displayImage, setDisplayImage] = useState (product.images[0]);  

    return (

        /* Propiedad de bootstrap, padding de 4 a todos los lados y bordes redondeados a las imagenes */

        <div className="place-items-center ml-3 p-2 rounded-md">
            <Link className="flex" href={`/product/${ product.slug }`}>
            <Image
            src={`/products/${ displayImage }`}
            alt={ product.title }
            className="rounded"
            width={300}
            height={300} 
            onMouseEnter={ () => setDisplayImage(product.images[1])}
            onMouseLeave={ () => setDisplayImage(product.images[0])}
            />
            </Link>
            <div className="mt-2 flex">
                <Link className="text hover p-1 text-decoration-none text-black"
                href={`/product/${ product.slug }`}>
                { product.title }
                </Link>
            </div>
            <div>
            <span className="textslow"> ${product.price}</span>
            </div>
        </div>
    )
}