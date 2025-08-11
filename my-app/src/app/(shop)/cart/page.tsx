'use client';

import { useCart, QuantitySelector, Title } from "@/components";
import Link from "next/link";
import Image from "next/image";
// // import { redirect } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxRate = 0.05;
  const taxes = subTotal * taxRate;
  const total = subTotal + taxes;
  
  // redirect('/empty'); //te lleva denuevo al carrito de compras vacio, redirecciona 
  
  return (
    <div className="flex text justify-center items-start px-4 py-8">
      <div className="w-full max-w-4xl">
      <Title title="Carrito" />

        <div className="mb-8">
          <span className="text-xl">Ir al catálogo</span>
          <Link href="/" className="underline ml-2">Continúa comprando!</Link>
        </div>

        {/* Listado de productos */}
        <div className="space-y-6">
          {cart.map(ci => (
            <div
            key={ci.slug}
              className="flex cardcolor items-center shadow rounded-lg p-4"
            >
              {/* Imagen */}
              <Image
                src={`/products/${ci.images[0]}`}
                width={100}
                height={100}
                alt={ci.title}
                className="rounded mr-4 flex-shrink-0"
              />

              {/* Detalles */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{ci.title}</h3>
                <p className="textslow text-gray-500">Talla: {ci.selectedSize}</p>
              </div>

              {/* Selector de cantidad + botón eliminar */}
              <div className="flex flex-col items-center mr-4">
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
              </div>

              {/* Subtotal individual */}
              <div className="text-right">
                <p className="font-medium">
                  ${(ci.price * ci.quantity).toFixed(2)}
                </p>
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
}

