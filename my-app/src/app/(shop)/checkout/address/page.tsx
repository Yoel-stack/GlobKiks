'use client';

import { Title, useAddress } from '@/components';
import { useRouter } from 'next/navigation';

export default function AddressPage() {

  const { setAddress } = useAddress();
  const router = useRouter();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget));
    setAddress(form);
    router.push('/checkout');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6 space-y-6">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { name: "nombres", label: "Nombres", type: "text" },
            { name: "apellidos", label: "Apellidos", type: "text" },
            { name: "direccion", label: "Dirección", type: "text" },
            {
              name: "direccion2",
              label: "Dirección 2 (opcional)",
              type: "text",
            },
            { name: "codigoPostal", label: "Código postal", type: "text" },
            { name: "ciudad", label: "Ciudad", type: "text" },
          ].map(({ name, label, type }) => (
            <div key={name} className="flex flex-col">
              <span className="font-medium">{label}</span>
              <input
                name={name}
                type={type}
                className="mt-1 p-2 border rounded-md bg-gray-100 focus:ring focus:ring-blue-200"
              />
            </div>
          ))}

          <div className="flex flex-col">
            <span className="font-medium">País</span>
            <select
              name="pais"
              className="mt-1 p-2 border rounded-md bg-gray-100 focus:ring focus:ring-blue-200"
            >
              <option value="">[ Seleccione ]</option>
              <option value="UY">Uruguay</option>
              <option value="AR">Argentina</option>
              <option value="ESP">España</option>
              <option value="COL">Colombia</option>
            </select>
          </div>

          <div className="flex flex-col">
            <span className="font-medium">Teléfono</span>
            <input
              name="telefono"
              type="tel"
              className="mt-1 p-2 border rounded-md bg-gray-100 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex items-end sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded text-center"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
