'use client'

import { useCart, QuantitySelector, SlideShow, SizeSelect, SlideShowMobile} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed";

//importar hook
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ValidSizes } from "@/interfaces";


interface Props {
    params: {
        slug: string; //slug porque le pasa el slug del producto
    }   
}

export default function slugPage ({ params }: Props){
    const { slug } = useParams<{ slug: string }>();

    const { addToCart } = useCart();

    const product = initialData.products.find( p => p.slug === params.slug)!; //find devuelve el primer elemento del array proporcionado que cumple con la función de prueba!
    //if
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState(product.sizes[0]);

    useEffect(() => {
    const savedSize = localStorage.getItem(`selectedSize-${slug}`);
    if (savedSize) {
        setSize(savedSize as ValidSizes);
    }
    }, [slug]);

    const hendleAdd = () => {
        addToCart({ ...product, quantity: qty, selectedSize: size});
        alert('Articulo agregado');
    };

    const handleSizeChange = (newSize: ValidSizes) => {
    setSize(newSize);
    localStorage.setItem(`selectedSize-${slug}`, newSize);
    };

    return (
        <div className="mt-3 mb-20 sm:grid md:grid-cols-3 gap-3">
            {/* Slug: {slug}; */}

            {/* PRODUCT IMG Mobile */}
            <div className="col-span-1 p-2 md:col-span-2">
                <SlideShowMobile
                title={product?.title}
                images={product?.images}
                className="block md:hidden"/>            

            {/* PRODUCT IMG  */}
                <SlideShow 
                title={product?.title}
                images={product?.images}
                className="hidden md:block"/>
            </div>

            {/* PRODUCT DETALLES */}
            <div className="my-5 col-span-1 p-3">
                <h1 className={ `${titleFont.className} font-bold text-xl` }>
                    {product?.title}
                </h1>
                <p className="text-xl">{ `$ ` + product?.price }</p>

                {/* Selector de Tallas */}
                <SizeSelect 
                selectedSize={size}
                onChange={handleSizeChange}
                avaliableSize={product.sizes}
                />

                {/* Selector de Cantidad */}
                <QuantitySelector 
                quantity={ qty }
                onChange={setQty}
                />

                {/* Button */}
                <button onClick={hendleAdd} className="agregarCarrito" >
                    Agregar al Carrito
                </button>

                {/* Descripcion */}
                <h3 className="my-2 mt-3 text-sm ">
                    Descripcion
                </h3>
                <p className="font-lihgt">{ product?.description }</p>

            </div>
            
        </div>
    );
};