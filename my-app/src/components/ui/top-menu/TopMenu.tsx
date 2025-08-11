'use client';


import { IoCartOutline, IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { useUIStore } from "@/store";
import { useCart } from "@/components/context/CartContext";


export const TopMenu = () => {

  const abrirMenu = useUIStore( state => state.openSideMenu ); // hook, state

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  
  const categories = [
    { label: "Mujeres", href: "/category/mujeres" },
    { label: "Hombres", href: "/category/hombres" },
    { label: "Unisex",  href: "/category/unisex" },
  ];

    return (
      <nav className="navbar shadow-xl">
        <div className="container mx-auto flex items-center justify-between py-4">
          
          <Link href="/" className="text text-xl text-decoration-none">
            ShoesYm
          </Link>

          {/* Menú principal oculto solo en XS, visible en SM o mayor */}
          <div className="hidden sm:flex space-x-6 items-center">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="textslow hover p-1 text-decoration-none">
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Botón hamburguesa y carrito siempre visible */}
          <div className="flex dark:text-white items-center space-x-4">
            <Link href="/cart" className="relative">
              {totalItems > 0 && (
                <span className="absolute text-xs px-1.5 py-0.4 rounded-circle font-bold bg-primary bottom-2.5 left-3 bg-blue-500 text-white ">
                  {totalItems}
                </span>
              )}
              <IoCartOutline size={22} className="text"/>
            </Link>
            <button onClick={abrirMenu}>
              <IoMenuOutline size={35} className="hover text" />
            </button>
          </div>
        </div>
      </nav>
    ); 
};