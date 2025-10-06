'use client';

import { useCart, QuantitySelector, Title } from "@/components";
import Link from "next/link";
import Image from "next/image";
// // import { redirect } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  console.log('Contenido del carrito:', cart);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxRate = 0.05;
  const taxes = subTotal * taxRate;
  const total = subTotal + taxes;

  if ( totalItems === 0){
    return (
      <p className="text-center text py-10">No hay productos en el carrito</p>
    )
  }
  
  // redirect('/empty'); //te lleva denuevo al carrito de compras vacio, redirecciona 
  
  return (
  <div className="flex text justify-center items-start px-4 py-8">
    <div className="w-full max-w-4xl">
      <Title title="Carrito" />

      {/* Enlace para volver al catálogo */}
      <div className="mb-8">
        <span className="text-xl">Ir al catálogo</span>
        <Link href="/" className="underline ml-2">Continúa comprando!</Link>
      </div>

      {/* Listado de productos */}
      <div className="space-y-7">
        {cart.map(ci => (
          <div
            key={ci.slug}
            className="flex flex-col sm:flex-row cardcolor shadow rounded-lg p-4 gap-4"
          >
            {/* Imagen */}
            <Image
              src={`/products/${ci.images[0]}`}
              width={100}
              height={100}
              alt={ci.title}
              className="rounded flex-shrink-0"
            />

            {/* Contenido (Info + Acciones) */}
            <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
              
              {/* Información del producto */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg break-words">{ci.title}</h3>
                <p className="text-slow text-gray-500">Talla: {ci.selectedSize}</p>
              </div>

              {/* Acciones: cantidad, remover, subtotal */}
             <div className="flex flex-col items-center sm:items-end text-center sm:text-right min-w-[120px]">
  <QuantitySelector
    quantity={ci.quantity}
    onChange={q => updateQuantity(ci.slug, q)}
  />

  <button
    onClick={() => removeFromCart(ci.slug)}
    className="mt-2 text-red-600 hover:text-red-800"
  >
    Remover
  </button>

  <div className="mt-2 text-sm">
  <p className="font-medium">
    Precio unitario: { ci.priceOferta && ci.price === ci.priceOferta ? (
      <>
        <span className="line-through text-gray-400 mr-1">${ci.priceOriginal?.toFixed(2)}</span>
        <span className="text-red-600 font-semibold">${ci.price.toFixed(2)}</span>
      </>
    ) : (
      <span>${ci.price.toFixed(2)}</span>
    )}
  </p>

  <p className="font-medium">
    Subtotal: ${(ci.price * ci.quantity).toFixed(2)}
  </p>
</div>

</div>


            </div>
          </div>
        ))}
      </div>

        {/* Total general */}
        <div className="mt-8 text layerblack shadow rounded-lg p-6">
          <div className="grid grid-cols-2 gap-y-2">
            <span>No. Productos:</span>
            <span className="text-right">{totalItems}</span>
            <span>Subtotal:</span>
            <span className="text-right">${subTotal.toFixed(2)}</span>
            <span>Impuestos (5%):</span>
            <span className="text-right">${taxes.toFixed(2)}</span>
            <span className="mt-4 text-xl font-semibold">Total:</span>
            <span className="mt-4 text-right text-xl font-semibold">
              ${total.toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout/address"
            className="mt-6 block bg-blue-600 text-decoration-none hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded text-center"
          >
            Verificar
          </Link>
        </div>  
      </div>
    </div>
  );
};