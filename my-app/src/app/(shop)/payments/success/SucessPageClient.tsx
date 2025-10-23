"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { UseOrder } from "@/components/orderContext/OrderContext";


export default function SuccessPage() {

  const { orders, markOrderAsPaid } = UseOrder();
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");
  const order = orders.find((o) => o.id === orderId);

  
  useEffect(() => {
    if (!order || !orderId) return;
    if (order.paid) return;

    markOrderAsPaid(orderId);
  }, [order, orderId, markOrderAsPaid]);

  if (!orderId) {
    return <p>Falta el ID de la orden</p>;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-2xl font-bold text mb-4">
        Pago realizado con éxito!
      </h1>
      <p className="text-lg textslow text-center mb-6">
        Tu orden <strong>#{orderId}</strong> ha sido confirmada y marcada como
        pagada.
      </p>
      <button
        onClick={() => router.push(`/orders/${orderId}`)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold"
      >
        Ver orden
      </button>
    </div>
  );
};
