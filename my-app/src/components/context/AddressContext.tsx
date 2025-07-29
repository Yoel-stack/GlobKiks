'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Address = {
  nombres?: string;
  apellidos?: string;
  direccion?: string;
  direccion2?: string;
  codigoPostal?: string;
  ciudad?: string;
  pais?: string;
  telefono?: string;
};

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
}

export function useAddress() {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error('useAddress debe usarse dentro de AddressProvider');
  return ctx;
}
