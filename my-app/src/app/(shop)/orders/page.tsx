"use client";

import { Title, UseOrder } from "@/components";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

export default function MyOrders() {
  const { orders, deleteOrder } = UseOrder();

  if (!orders || orders.length === 0) {
    return (
      <p className="text-center text py-10">No hay órdenes registradas.</p>
    );
  }

  return (
    <>
      <Title title="Mis ordenes" />
      <div className="rounded-sm mb-10 overflow-x-auto">
        <table className="min-w-full">
          <thead className="layerblack border-b">
            <tr>
              {["#ID", "Nombre completo", "Estado", "Opciones"].map((label) => (
                <th
                  key={label}
                  scope="col"
                  className="text-sm font-medium cardcolor textslow px-6 py-4 text-left"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((orders) => (
              <tr
                key={orders.id}
                className="layerblack border-b transition duration-300 ease-in-out hover"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium textslow">
                  {orders.id}
                </td>
                <td className="text-sm textslow font-light px-6 py-4 whitespace-nowrap">
                  {orders.address.nombres} {orders.address.apellidos}
                </td>
                <td className="flex items-center text-sm textslow font-light px-6 py-4 whitespace-nowrap">
                  <IoCardOutline
                    className={orders.paid ? "text-green-800" : "text-red-800"}
                  />
                  <span
                    className={`mx-2 ${
                      orders.paid ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {orders.paid ? "Pagada" : "No pagada"}
                  </span>
                  <p className="mt-3">| Total: ${orders.total.toFixed(2)}</p>
                </td>
                <td className="text-sm textslow font-light px-6 py-4">
                  <Link
                    href={`/orders/${orders.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("¿Estás seguro de eliminar esta orden?")) {
                        deleteOrder(orders.id);
                      }
                    }}
                    className="text-red-600 hover:underline px-3"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
