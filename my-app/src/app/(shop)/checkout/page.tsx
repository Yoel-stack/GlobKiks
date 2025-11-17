"use client";

import { useAddress, QuantitySelector, Title } from "@/components";
import { UseOrder } from "@/components/orderContext/OrderContext";
import { useCart } from "@/components/context/CartContext";
import { useRouter } from "next/navigation"; //Si tu proyecto está en el directorio app, debes importar de next/navigation, no de next/router
import Link from "next/link";
import Image from "next/image";


export default function CheckoutPage() {
  
  const router = useRouter();
  const { addOrder} = UseOrder();
  const { clearCart } = useCart();
  
  const placeOrder = () => {
    const id = Math.random().toString(36).substr(2, 9);
    addOrder({ id, items: cart, address, total, subTotal, taxes, paid: false });
    clearCart();
    router.push(`/orders/${id}`);
  };      
  
  //Para la parte del carrito, remover  
  const { cart, removeFromCart, updateQuantity } = useCart();
  
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxRate = 0.05;
  const taxes = subTotal * taxRate;
  const total = subTotal + taxes;

  //Accede a los datos de address (direccion de entrega, etc)
  const { address } = useAddress();

  return (
    <div className="flex text justify-center items-start px-4 py-8">
      <div className="w-full max-w-4xl space-y-8">
        <nav className="mb-1 ">
          <Title title="Verificar Orden" />
        </nav>

        <div className="mb-8">
          <span className="text-xl">Editar elementos</span>
          <Link href="/cart" className="underline ml-2">
            Editar Carrito
          </Link>
        </div>


        {/* Sección de carrito en columna */}
        
        <div className="layerblack shadow rounded-lg p-6 space-y-6">
          <p className="text-sm my-2 textslow">Tus productos</p>

          {/* Listado de productos */}
          {cart.map((ci) => (
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

              {/* Contenido principal */}
              <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
                {/* Info del producto */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg break-words">
                    {ci.title}
                  </h3>
                  <p className="textslow">Talla: {ci.selectedSize}</p>
                </div>

                {/* Quantity, Remover, Subtotal */}
                <div className="flex flex-col items-center sm:items-end text-center sm:text-right min-w-[120px]">
                  <QuantitySelector
                    quantity={ci.quantity}
                    onChange={(q) => updateQuantity(ci.slug, q)}
                  />
                  <button
                    onClick={() => removeFromCart(ci.slug)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    Remover
                  </button>

                  <p className="mt-2 font-medium">
                    ${(ci.price * ci.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Totales */}
          <div className="pt-4 border-t border-gray-200 text-right">
            <p className="font-semibold">Total productos: {totalItems}</p>
            <p className="font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
        {/* Resumen de Orden */}
        <div className="layerblack shadow rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Dirección de entrega</h2>
          <div className="mb-4">
            <p className="text-xl">
              {address.nombres} {address.apellidos}
            </p>
            <p>
              {address.direccion}
              {address.direccion2 ? `, ${address.direccion2}` : ""}
            </p>
            <p>
              {address.ciudad}, {address.pais} - CP: {address.codigoPostal}
            </p>
            <p>Teléfono: {address.telefono}</p>
          </div>

          <div className="w-full h-px bg-gray-300"></div>
          <div className="grid grid-cols-2 gap-2">
            <span>No. Productos:</span>
            <span className="text-right">{totalItems}</span>
            <span>Subtotal:</span>
            <span className="text-right">${subTotal.toFixed(2)}</span>
            <span>Impuestos 5%:</span>
            <span className="text-right">${taxes.toFixed(2)}</span>
            <span className="mt-2 text-xl font-semibold">Total:</span>
            <span className="mt-2 text-xl text-right font-semibold">
              ${total.toFixed(2)}
            </span>
          </div>

          <p className="text-xs mt-4">
            Al hacer click en “Colocar orden”, aceptas nuestros{" "}
            <a href="/conditions/terms" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="/conditions/privacy" className="underline">
              política de privacidad
            </a>
          </p>

          <Link
            href="/"
            className="mt-2 block bg-blue-600 text-decoration-none hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded text-center"
          >    
            <button onClick={placeOrder}>Colocar orden</button>
          </Link>
        </div>
      </div>
    </div>
  );
};