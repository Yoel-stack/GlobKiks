"use client";

import React, { useState } from "react";
import {IoCloseOutline, IoFootstepsOutline, IoLogInOutline, IoPersonOutline, IoPricetagOutline, IoShirtOutline, IoTicketOutline} from "react-icons/io5";
import Link from "next/link";
import clsx from "clsx";
import { useUIStore } from "@/store";
import { SignUpButton, ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SearchSideBar from "@/components/searchsidebar/SearchSideBar";
import ThemeToggle from "@/components/theme/ThemeToggler";



export const Sidebar = () =>  {

  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);  //Menu lateral
  const [openCategories, setOpenCategories] = useState(false);  //Menu de categorias

  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const categories = [
    { label: "Mujeres", href: "/category/mujeres" },
    { label: "Hombres", href: "/category/hombres" },
    { label: "Unisex", href: "/category/unisex" },
  ];


  return (
    <ClerkProvider>
      <div>
        {/* Background black */}
        {isSideMenuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
        )}
        {/* Blur */}
        {isSideMenuOpen && (
          <div
            onClick={() => closeMenu()}
            className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        )}

        {/* Sidemenu */}
        <nav
          className={clsx(
            "fixed p-5 rounded-sm right-0 top-0 w-[250px] sm:w-[300px] h-screen layerblack z-10 shadow-2xl transform transition-all duration-300",
            {
              translate: !isSideMenuOpen, // Translate es una clase personalizada de CSS
            }
          )}
        >
          <div className="icono-close">
            <IoCloseOutline
              size={25}
              className="text absolute top-6 right-6 cursor-pointer"
              onClick={() => closeMenu()}
            />
          </div>
          {/* Input */}
          <div>
            <SearchSideBar onCloseMenu={closeMenu} />
          </div>
          {/* Menu */}
          <nav
            className="flex text p-1 items-center mt-10 p-0 
            hover text-black text-decoration-none 
            rounded transition-all"
          >
            <SignedOut>
              <IoLogInOutline size={20} />
              <span className="text ml-3 text-xl">
                <SignUpButton mode="modal">Ingresar</SignUpButton>
              </span>
            </SignedOut>
            <SignedIn>
              <IoPersonOutline size={20} className="text" />
              <span className=" text mx-2.5 cursor-pointer ml-3 text-xl">
                Perfil
              </span>
              <UserButton />
            </SignedIn>
          </nav>
          <Link
            href="/orders"
            className="flex text items-center p-1 mt-4 hover text-black text-decoration-none rounded transition-all"
          >
            <IoTicketOutline size={20} />
            <span className="ml-3 text-xl">Ordenes</span>
          </Link>
          {/* Menu */}
          <div className="w-full mt-4 h-px bg-gray-500"></div>

          <Link
            href="/"
            className="flex items-center mt-4 p-1 hover text text-decoration-none rounded transition-all"
          >
            <IoShirtOutline size={20} />
            <span className="ml-3 text-xl">Productos</span>
          </Link>
          <div className="sm:hidden space-x-6 items-center mt-4">
            <nav
              onClick={() => setOpenCategories((prev) => !prev)}
              className="flex w-full items-center mt-4 p-1 hover text text-decoration-none rounded transition-all"
            >
              <IoFootstepsOutline size={20} />
              <span className="w-7 h-7 cursor-pointer ml-3 text-xl">
                Categorias
              </span>
            </nav>
            <nav className="">
              {openCategories && (
                <div className="pl-6 mt-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="flex items-center p-1 text-decoration-none hover rounded transition-all"
                      onClick={closeMenu}
                    >
                      <span className="ml-3 text-sm textslow">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </div>
          <Link
            href="/"
            className="flex items-center mt-4 p-1 text hover text-decoration-none rounded transition-all"
          >
            <IoPricetagOutline size={20} />
            <span className="w-7 h-7 ml-3 text-xl">Ofertas</span>
          </Link>
          <div className="flex textslow justify-center items-center py-5 dark:shadow-gray-800">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </ClerkProvider>
  );
};
