"use client";

import { CartItem } from "@/interfaces/product.interface";
import { Address } from "@/interfaces/product.interface";
import { createContext, ReactNode, useContext, useState, useEffect} from "react";


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
  orders: Order[];
  addOrder: (order: Order) => void;
  markOrderAsPaid: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
}


const OrderContext = createContext<OrderContextType | undefined>(undefined);


export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // Guardar orden en localstorage
  const addOrder = (newOrder: Order) => {
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Eliminar orden en localstorage
  const deleteOrder = (orderId: string) => {
  const updatedOrders = orders.filter(order => order.id !== orderId);
  setOrders(updatedOrders);
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
};


  // Marcar orden como pagada
  const markOrderAsPaid = (orderId: string) => {
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, paid: true } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Al cargar la app leer localstorage
  useEffect(() => {
    const storedOrder = localStorage.getItem("orders");
    if (storedOrder) {
      try {
        setOrders(JSON.parse(storedOrder));
      } catch (err) {
        console.error("Error al leer la orden desde localStorage:", err);
      }
    }
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder, deleteOrder, markOrderAsPaid }}>
      {children}
    </OrderContext.Provider>
  );
}


export function UseOrder(): OrderContextType {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
