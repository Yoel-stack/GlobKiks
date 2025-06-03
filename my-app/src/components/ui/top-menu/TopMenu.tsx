'use client';


import { titleFont } from "@/config/fonts";
import { IoAccessibility, IoAperture, IoCartOutline, IoMenu, IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { useUIStore } from "@/store";


export const TopMenu = () => {

  const abrirMenu = useUIStore( state => state.openSideMenu ); // hook, state

    return (
      <nav className="navbar navbar-expand p-0">
        <div className="container-xxl">
          <Link className="navbar-brand" href="/">
            ShoesImport
          </Link>

          <div className="navbar p-2" id="navbarNavAltMarkup">
            <div className="navbar-nav m-2">
              <Link
                className="nav-link"
                aria-current="page"
                href="/category/mujeres"
              >
                Mujeres
              </Link>
              <Link
                className="nav-link"
                aria-current="page"
                href="/category/hombres"
              >
                Hombres
              </Link>
              <Link
                className="nav-link"
                aria-current="page"
                href="/category/unisex"
              >
                Unisex
              </Link>

              <Link href="/cart" className="flex items-center">
                <span className="absolute text-xs px-1 rounded-circle font-bold bg-primary top-4 right-13 bg-blue-500 text-white ">
                  2
                </span>
                <IoCartOutline className="icono-cart" size={21} />
              </Link>

              <button className="">
                <IoMenuOutline
                  className="icono-menu"
                  onClick={abrirMenu}
                  size={30}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
    ); 
};