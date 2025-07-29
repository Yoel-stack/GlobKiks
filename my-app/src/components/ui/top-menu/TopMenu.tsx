'use client';

// import { titleFont } from "@/config/fonts";
import { IoCartOutline, IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { useUIStore } from "@/store";
import { useCart } from "@/components/context/CartContext";


export const TopMenu = () => {

  const abrirMenu = useUIStore( state => state.openSideMenu ); // hook, state

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

    return (
      <nav className="bg-white shadow-xl">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link href="/" className="text-xl text-black text-decoration-none">
            ShoesYm
          </Link>

          {/* Menú principal: oculto solo en XS, visible en >=SM */}
          <div className="hidden sm:flex  space-x-6 items-center">
            <Link href="/category/mujeres" className="nav-link">
              Mujeres
            </Link>
            <Link href="/category/hombres" className="nav-link">
              Hombres
            </Link>
            <Link href="/category/unisex" className="nav-link">
              Unisex
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Botón hamburguesa y carrito siempre visible */}
            <Link href="/cart" className="relative">
            {totalItems > 0 && (
              <span className="absolute text-xs px-1.5 py-0.4 rounded-circle font-bold bg-primary bottom-2.5 left-3 bg-blue-500 text-white ">
                {totalItems}
              </span>
            )}
              <IoCartOutline size={21} className="text-black"/>
            </Link>
            <button onClick={abrirMenu}>
              <IoMenuOutline size={30} />
            </button>
          </div>
        </div>
      </nav>

      // <nav className="bg-white border-b">
      //   <div className="container mx-auto flex items-center justify-between p-4">
      //     <Link href="/" className="text-xl font-bold">
      //       ShoesImport
      //     </Link>

      //     {/* En pantallas sm en adelante se muestra este bloque */}
      //     <div className="hidden sm:flex space-x-4 items-center">
      //       <Link href="/category/mujeres" className="nav-link">Mujeres</Link>
      //       <Link href="/category/hombres" className="nav-link">Hombres</Link>
      //       <Link href="/category/unisex" className="nav-link">Unisex</Link>

      //       <Link href="/cart" className="relative">
      //         <IoCartOutline size={21} />
      //       </Link>
      //     </div>

      //     {/* Botón hamburguesa: visible solo en xs (sm:hidden) */}
      //     <button onClick={abrirMenu} className="sm:hidden">
      //       <IoMenuOutline size={30} />
      //     </button>
      //   </div>
      // </nav>

      // <nav className="navbar navbar-expand p-0">
      //   <div className="container">
      //     <Link className="navbar-brand" href="/">
      //       ShoesImport
      //     </Link>
      //   </div>

      //     <div className="navbar p-2" id="navbarNavAltMarkup">
      //       <div className="navbar-nav m-2">
      //         <Link
      //           className="nav-link"
      //           aria-current="page"
      //           href="/category/mujeres"
      //         >
      //           Mujeres
      //         </Link>
      //         <Link
      //           className="nav-link"
      //           aria-current="page"
      //           href="/category/hombres"
      //         >
      //           Hombres
      //         </Link>
      //         <Link
      //           className="nav-link"
      //           aria-current="page"
      //           href="/category/unisex"
      //         >
      //           Unisex
      //         </Link>

      //         <Link href="/cart" className="flex items-center">
      //           <span className="absolute text-xs px-1 rounded-circle font-bold bg-primary top-4 right-13 bg-blue-500 text-white ">
      //             2
      //           </span>
      //           <IoCartOutline className="icono-cart" size={21} />
      //         </Link>

      //         <button className="">
      //           <IoMenuOutline
      //             className="icono-menu"
      //             onClick={abrirMenu}
      //             size={30}
      //           />
      //         </button>
      //       </div>
      //     </div>
      // </nav>
    ); 
};