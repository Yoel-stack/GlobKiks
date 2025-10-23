"use client";

import { Title } from "@/components";
import { UseOrder } from "@/components/orderContext/OrderContext";
import { usePathname } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { SignInButton, useUser } from "@clerk/nextjs";


import Image from "next/image";


export default function WatchOrder() {
  const { orders } = UseOrder(); 
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  const { isSignedIn } = useUser();


  const order = orders.find(o => o.id === id); 

  if (!order) {
    return <p className="text-center py-10">Orden no encontrada</p>;
  }

  // Calculos corregidos y tipados correctamente
  const totalItems = order.items.reduce((acc: number, item) => acc + item.quantity, 0);
  const subTotal = order.items.reduce((acc: number, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.05;
  const taxes = subTotal * taxRate;
  const total = subTotal + taxes;


  const handlePay = async () => {
    
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: order.items,
          orderId: order.id,
        }),
      });


      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error al obtener URL de Stripe');
      }
    } catch (err) {
      console.error(err);
      alert('Error procesando el pago');
    }
  };

  return (
    <div className="flex justify-center items-start px-4 py-8 mb-20">
      <div className="w-full max-w-4xl space-y-8 layerblack shadow-md rounded-md p-6">
        <Title title={`Orden #${id}`} />

        {/* Datos del cliente */}
        <div className="textslow mb-6">
          <p className="text-lg font-semibold">Cliente:</p>
          <p>
            {order.address.nombres} {order.address.apellidos}
          </p>
          <p>
            {order.address.direccion}
            {order.address.direccion2 ? `, ${order.address.direccion2}` : ""}
          </p>
          <p>
            {order.address.ciudad}, {order.address.pais} - CP:{" "}
            {order.address.codigoPostal}
          </p>
          <p>Teléfono: {order.address.telefono}</p>
        </div>

        {/* Estado del pago */}
        <div className="mb-6 flex items-center space-x-2">
          <IoCardOutline
            className={order.paid ? "text-green-600" : "text-red-600"}
            size={24}
          />
          <p
            className={`mt-3 font-semibold ${
              order.paid ? "text-green-600" : "text-red-600"
            }`}
          >
            {order.paid ? "Pagada" : "No pagada"}
          </p>
        </div>

        {!order.paid &&
          (isSignedIn ? (
            <button
              onClick={handlePay}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
            >
              Pagar
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded">
                Iniciar sesión para pagar
              </button>
            </SignInButton>
          ))}

        {/* Productos */}
        <div className="text layerblack rounded-lg p-6 space-y-6">
          <p className="text-sm textslow">Productos en la orden</p>

          {order.items.map((item) => (
            <div
              key={item.slug}
              className="flex flex-col sm:flex-row cardcolor shadow rounded-lg p-4 gap-4"
            >
              {item.images?.[0] && (
                <Image
                  src={`/products/${item.images[0]}`}
                  width={100}
                  height={100}
                  alt={item.title}
                  className="rounded flex-shrink-0"
                />
              )}
              <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg break-words">
                    {item.title}
                  </h3>
                  {item.selectedSize && (
                    <p className="textslow">Talla: {item.selectedSize}</p>
                  )}
                </div>
                <div className="text-center sm:text-right min-w-[100px]">
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Totales */}
          <div className="pt-4 border-t border-gray-200 text-right">
            <p className="font-semibold">Total productos: {totalItems}</p>
            <p className="font-semibold">Subtotal: ${subTotal.toFixed(2)}</p>
            <p className="font-semibold">Impuestos 5%: ${taxes.toFixed(2)}</p>
            <p className="mt-2 text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
