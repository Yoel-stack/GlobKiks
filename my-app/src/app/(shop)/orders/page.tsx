'use client'
// https://tailwindcomponents.com/component/hoverable-table

import { Title, UseOrder } from '@/components';
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

export default function MyOrders() {

  const { order } = UseOrder();

  if (!order) return <p className='text text-center py-10'>No hay órdenes recientes</p>;

  //Convierte a array 
  const orders = [order];

  return (
    <>
      <Title title="Mis ordenes" />
      <div className="rounded-sm mb-10 overflow-x-auto">
        <table className="min-w-full">
          <thead className="layerblack border-b">
            <tr>
              {['#ID', 'Nombre completo', 'Estado', 'Opciones'].map((label) => (
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
            {orders.map((ord) => (
              <tr
                key={ord.id}
                className="layerblack border-b transition duration-300 ease-in-out hover"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium textslow">
                  {ord.id}
                </td>
                <td className="text-sm textslow font-light px-6 py-4 whitespace-nowrap">
                  {ord.address.nombres} {ord.address.apellidos}
                </td>
                <td className="flex items-center text-sm textslow font-light px-6 py-4 whitespace-nowrap">
                  <IoCardOutline
                    className={ord.paid ? 'text-green-800' : 'text-red-800'}
                  />
                  <span className={`mx-2 ${ord.paid ? 'text-green-800' : 'text-red-800'}`}>
                    {ord.paid ? 'Pagada' : 'No pagada'}
                  </span>
                  <p className='mt-3'>| Total: ${ord.total.toFixed(2)}</p>
                </td>
                <td className="text-sm textslow font-light px-6 py-4">
                  <Link href={`/orders/${ord.id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}