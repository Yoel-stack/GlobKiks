"use client";

import { useCart, QuantitySelector, SlideShow, SizeSelect, SlideShowMobile } from "@/components";
import { titleFont } from "@/config/fonts";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Product, ValidSizes } from "@/interfaces";

interface Props {
  product: Product;
};

const isProductInOferta = (product: Product): boolean => {
  const currentMonth = new Date().getMonth() + 1;
  return (
    typeof product.priceOferta === 'number' &&
    product.priceOferta < product.price &&
    product.mesOferta === currentMonth
  );
};

export default function ProductDetails({ product }: Props) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<ValidSizes>(product.sizes[0] as ValidSizes);

  const isOferta = isProductInOferta(product);

  useEffect(() => {
    const savedSize = localStorage.getItem(`selectedSize-${product.slug}`);
    if (savedSize) {
      setSize(savedSize as ValidSizes);
    }
  }, [product.slug]);

  const handleAdd = () => {
    const finalPrice = isOferta ? product.priceOferta! : product.price;

    addToCart({
      ...product,
      price: finalPrice,
      priceOriginal: product.price,
      quantity: qty,
      selectedSize: size,
    });
    toast.success("Artículo agregado al carrito");
  };

  const handleSizeChange = (newSize: ValidSizes) => {
    setSize(newSize);
    localStorage.setItem(`selectedSize-${product.slug}`, newSize);
  };

  return (
    <div className="text mt-3 mb-20 sm:grid md:grid-cols-3 gap-3">
      <div className="col-span-1 p-2 md:col-span-2">
        <SlideShowMobile
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        <SlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      <div className="my-5 col-span-1 p-3">
        <h1 className={`${titleFont.className} font-bold text-xl`}>
          {product.title}
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

        <SizeSelect
          selectedSize={size}
          onChange={handleSizeChange}
          avaliableSize={product.sizes as ValidSizes[]}
        />

        <QuantitySelector quantity={qty} onChange={setQty} />

        <button onClick={handleAdd} className="agregarCarrito">
          Agregar al Carrito
        </button>

        <h3 className="my-2 mt-3 text-sm ">Descripción</h3>
        <p className="font-light mx-1">{product.description}</p>
      </div>
    </div>
  );
};
