'use client';

import { createContext, useContext, useState } from "react";

//Con esto definimos un contexto simple que contiene el estado order y la función setOrder
const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export function UseOrder() {
  return useContext(OrderContext);
};
