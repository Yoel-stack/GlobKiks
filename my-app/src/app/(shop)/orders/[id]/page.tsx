'use client';

import { Title } from "@/components";
import { UseOrder } from "@/components/orderContext/OrderContext";
import { usePathname } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";

export default function WatchOrder() {
  const { order } = UseOrder();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [loading, setLoading] = useState(false);

  if (!order || order.id !== id) {
    return <p className="text-center text py-10">Orden no encontrada</p>;
  } 

  const totalItems = order.items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const subTotal = order.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) ?? 0;
  const taxRate = 0.05;
  const taxes = subTotal * taxRate;
  const total = subTotal + taxes;


  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mercadopago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order), // Enviamos toda la orden
      });

      const data = await res.json();

      if (data.preferenceId) {
        // Redirige al checkout de Mercado Pago
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.preferenceId}`;
      } else {
        alert("Error creando la preferencia de pago");
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert("Ocurrió un error al iniciar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start px-4 py-8 mb-20">
      <div className="w-full max-w-4xl space-y-8 layerblack shadow-md rounded-md p-6">
        <Title title={`Orden #${id}`} />

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

        <div className="mb-6 flex items-center space-x-2">
          <IoCardOutline
            className={order.paid ? "text-green-600" : "text-red-600"}
            size={24}
          />
          <p
            className={
              order.paid
                ? "mt-3 text-green-600 font-semibold"
                : "mt-3 text-red-600 font-semibold"
            }
          >
            {order.paid ? "Pagada" : "No pagada"}
          </p>
        </div>

        {!order.paid && (
          <button
            onClick={handlePay}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
          >
            {loading
              ? "Redirigiendo a Mercado Pago..."
              : "Pagar con Mercado Pago"}
          </button>
        )}



        <div className="text layerblack rounded-lg p-6 space-y-6">
          <p className="text-sm textslow">Productos en la orden</p>

          {order.items &&
            order.items.map((ci) => (
              <div
                key={ci.slug}
                className="flex flex-col sm:flex-row cardcolor shadow rounded-lg p-4 gap-4"
              >
                {/* Imagen */}
                {ci.images?.[0] && (
                  <Image
                    src={`/products/${ci.images[0]}`}
                    width={100}
                    height={100}
                    alt={ci.title}
                    className="rounded flex-shrink-0"
                  />
                )}

                {/* Contenido principal */}
                <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
                  {/* Info del producto */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg break-words">
                      {ci.title}
                    </h3>
                    {ci.selectedSize && (
                      <p className="textslow">Talla: {ci.selectedSize}</p>
                    )}
                  </div>

                  {/* Subtotal individual */}
                  <div className="text-center sm:text-right min-w-[100px]">
                    <p className="font-medium">
                      ${(ci.price * ci.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {/* Totales */}
          <div className="pt-4 border-t border-gray-200 text-right">
            <p className="font-semibold">Total productos: {totalItems}</p>
            <p className="font-semibold">
              Subtotal: ${order.subTotal.toFixed(2)}
            </p>
            <p className="font-semibold">
              Impuestos 5%: ${order.taxes.toFixed(2)}
            </p>
            <p className="mt-2 text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
