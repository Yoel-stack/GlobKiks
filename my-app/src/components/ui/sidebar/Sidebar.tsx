'use client'; 

import React from 'react'
import { IoAdd, IoCloseOutline, IoLogInOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';
import Link from 'next/link';
import clsx from 'clsx'; 
import { useUIStore } from '@/store';
import { ClerkProvider } from '@clerk/nextjs';
import {  SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';


export const Sidebar = () => {
    
    const isSideMenuOpen = useUIStore ( state => state.isSideMenuOpen);
    const closeMenu = useUIStore ( state => state.closeSideMenu);
    return (
        <ClerkProvider>

        <div>

            {/* Background black */}
            {
                isSideMenuOpen && (                    
                    <div 
                    className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'/>
                    
                )
            }
            {/* Blur */}
            {
                isSideMenuOpen && (                    
                    <div 
                    onClick={()=> closeMenu ( )}
                    className='fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'/>
                    
                )
            }

            {/* Sidemenu */}
            <nav 
            className={
                clsx('fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-10 shadow-2xl transform transition-all duration-300',
                    {
                        "translate": !isSideMenuOpen // translate es una clase personalizada de CSS
                    }
                ) 
            }>
                
                <div className='icono-close'>
                    <IoCloseOutline
                        size={ 30 }
                        className='absolute top-5 right-6 cursor-pointer'
                        onClick={()=> closeMenu ( )}
                        />  
                </div>

            {/* Input */}
            <div className='icono-search'>
                <IoSearchOutline size={20} className='absolute top-13 left-4'/>
                    <input
                        type='text'
                        placeholder='Buscar'
                        className="w-full bg-gray-50 rounded pl-3 border-b-2 text-xl border-gray-500 focus:outline-none focus:border-blue-500"
                        />
            </div>

            {/* Menu */}

            <nav className="flex p-1 items-center mt-10 p-0 
            hover:bg-gray-200 text-black text-decoration-none 
            rounded transition-all" >
                <SignedOut>
                <IoLogInOutline size={ 20 } />
                <span className='ml-3 text-xl'>
                <SignUpButton>
                </SignUpButton>
                </span>
                </SignedOut>
                <SignedIn>
                <IoPersonOutline size={ 20 } />
                <span className='mx-2.5 cursor-pointer ml-3 text-xl'>
                    Perfil
                </span>
                <UserButton />
                </SignedIn>
            </nav>

            <Link
            href="/orders"
            className="flex items-center p-1 mt-4 p-0 hover:bg-gray-200 text-black text-decoration-none rounded transition-all"
            >
                <IoTicketOutline size={ 20 } />
                <span className='ml-3 text-xl'>Ordenes</span>
            </Link>

             {/* Menu */}
            <div className='w-full mt-4 h-px bg-gray-500'></div> {/* REVISAR PARA QUE FUNCIONA */}

            <Link
            href="/"
            className="flex items-center mt-4 p-1 hover:bg-gray-200 text-black text-decoration-none rounded transition-all"
            >
                <IoShirtOutline size={ 20 } />
                <span className='ml-3 text-xl'>Productos</span>
            </Link>      

            <Link
            href="/"
            className="flex items-center mt-4 p-1 hover:bg-gray-200 text-black text-decoration-none rounded transition-all"
            >
                <IoTicketOutline size={ 20 } />
                <span className='ml-3 text-xl'>Descuentos</span>
            </Link>      

            <Link
            href="/"
            className="flex items-center mt-4 p-1 hover:bg-gray-200 text-black text-decoration-none rounded transition-all"
            >
                <IoAdd size={ 20 } />
                <span className='ml-3 text-xl'>Personalizar</span>
            </Link>

            </nav>

        </div>
    </ClerkProvider>
    )
}