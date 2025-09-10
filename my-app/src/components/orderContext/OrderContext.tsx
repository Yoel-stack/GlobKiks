'use client';

import { CartItem } from "@/interfaces/product.interface";
import { Address } from "@/interfaces/product.interface";
import { createContext, ReactNode, useContext, useState } from "react";

// 🟢 1. Define la interfaz del contexto
interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  total: number;
  subTotal: number;
  taxes: number;
  paid: boolean;
}

interface OrderContextType {
  order: Order | null;
  setOrder: (order: Order) => void;
}

// 🟢 2. Crea el contexto con tipo explícito
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// 🟢 3. Define el proveedor
export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<Order | null>(null);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

// 🟢 4. Hook personalizado con verificación
export function UseOrder(): OrderContextType {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}


// 'use client';

// import { createContext, ReactNode, useContext, useState } from "react";


// //Con esto definimos un contexto simple que contiene el estado order y la función setOrder
// const OrderContext = createContext();

// export function OrderProvider({ children }: { children: ReactNode }) {
//   const [order, setOrder] = useState(null);
//   return (
//     <OrderContext.Provider value={{ order, setOrder }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };

// export function useOrder() {
//   return useContext(OrderContext);
// };
