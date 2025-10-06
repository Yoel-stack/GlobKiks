'use client'

import { useCart, QuantitySelector, SlideShow, SizeSelect, SlideShowMobile} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed";
import { toast } from 'react-toastify';

//importar hook
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product, ValidSizes } from "@/interfaces";


const isProductInOferta = (product: Product): boolean => {
  const currentMonth = new Date().getMonth() + 1;

  return (
    typeof product.priceOferta === 'number' &&
    product.priceOferta < product.price &&
    product.mesOferta === currentMonth
  );
};

export default function SlugPage (){
    const { slug } = useParams<{ slug: string }>();

    const { addToCart } = useCart();
    
    const product = initialData.products.find( p => p.slug === slug)!; //find devuelve el primer elemento del array proporcionado que cumple con la función de prueba!
    
    
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState(product.sizes[0]);

    const isOferta = isProductInOferta(product);

    useEffect(() => {

    const savedSize = localStorage.getItem(`selectedSize-${slug}`);
    if (savedSize) {
        setSize(savedSize as ValidSizes);
    }
    }, [slug]);

    const hendleAdd = () => {
      const finalPrice = isOferta ? product.priceOferta : product.price;



      addToCart({
        ...product,
        price: finalPrice,
        priceOferta: product.priceOferta,
        priceOriginal: product.price,
        quantity: qty,
        selectedSize: size,
      });
      toast.success("Artículo agregado al carrito");
    };

    const handleSizeChange = (newSize: ValidSizes) => {
      setSize(newSize);
      localStorage.setItem(`selectedSize-${slug}`, newSize);
    };
    
    
    return (
      <div className="text mt-3 mb-20 sm:grid md:grid-cols-3 gap-3">
        {/* PRODUCT IMG Mobile */}
        <div className="col-span-1 p-2 md:col-span-2">
          <SlideShowMobile
            title={product.title}
            images={product.images}
            className="block md:hidden"
          />

          {/* PRODUCT IMG  */}
          <SlideShow
            title={product.title}
            images={product.images}
            className="hidden md:block"
          />
        </div>

        {/* PRODUCT DETALLES */}
        <div className="my-5 col-span-1 p-3">
          <h1 className={`${titleFont.className} font-bold text-xl`}>
            {product?.title}
          </h1>
          <p className="text-xl">
            {isOferta ? (
              <>
                <span className="line-through text-gray-400 mr-2">
                  ${product.price}
                </span>
                <span className="text-red-600 ">
                  ${product.priceOferta}
                </span>
              </>
            ) : (
              <span className="text">${product.price}</span>
            )}
          </p>

          {/* Selector de Tallas */}
          <SizeSelect
            selectedSize={size}
            onChange={handleSizeChange}
            avaliableSize={product.sizes}
          />

          {/* Selector de Cantidad */}
          <QuantitySelector quantity={qty} onChange={setQty} />

          {/* Button */}
          <button onClick={hendleAdd} className="agregarCarrito">
            Agregar al Carrito
          </button>

          {/* Descripcion */}
          <h3 className="my-2 mt-3 text-sm ">Descripcion</h3>
          <p className="font-lihgt mx-1">{product?.description}</p>
        </div>
      </div>
    );
};