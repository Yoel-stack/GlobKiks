"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Address } from '@/interfaces/product.interface';


type AddressContextProps = {
  address: Address;
  setAddress: (data: Address) => void;
};

const AddressContext = createContext<AddressContextProps | undefined>(undefined);

export function AddressProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<Address>({});
  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export function useAddress() {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error('useAddress debe usarse dentro de AddressProvider');
  return ctx;
};
