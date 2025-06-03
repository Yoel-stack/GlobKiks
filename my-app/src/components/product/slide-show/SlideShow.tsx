'use client'

import { Swiper, SwiperSlide } from "swiper/react"; //componente Swiper de React
import { Swiper as SwiperObjet } from "swiper"; //SwiperObjet 'sustituye' a Swiper, componente de react, SwiperObjet va a tener toda la funcionalidad del objeto Swiper
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules"; //importamos los 'modules' ya vienen personalizados con su funcion determiniada
import { useState } from "react";
import React from 'react'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import Image from "next/image";

interface Props {
    images: string[];
    title: string[];
    className?: string; // ? Esto significa que la propiedad puede tener el tipo especificado o puede estar ausente (es decir, undefined)
}

export const SlideShow = ({ images, title, className}: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState <SwiperObjet>();

    return (
        <div className= { className }>
        <Swiper
        style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
        } as React.CSSProperties //No es estrictamente obligatorio usar as React.CSSProperties, pero es una buena práctica, especialmente cuando se trabaja en proyectos grandes o en equipo. Ayuda a mantener el código más seguro y fácil de mantener.
    }
        spaceBetween={10}
        navigation={true}
        autoplay={{delay: 2500}} //pasa la imagen automaticamente dps de los 2,5 segundos
        thumbs={{swiper: thumbsSwiper}}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]} // se importan los modulos personalizados de Swiper
        className="mySwiper2"
        >
            {
                images.map ( images => (
                    <SwiperSlide key={ images }>
                        <Image
                        width={ 1000 }
                        height={ 800 }
                        src={`/products/${ images }`}
                        alt={ title } //!!
                        className="rounded-lg objet-fill"
                        />
                    </SwiperSlide>
                    
                ))
            }
        </Swiper>
        <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        >
        {
                images.map ( images => (
                    <SwiperSlide key={ images }>
                        <Image
                        width={ 300 }
                        height={ 300 }
                        src={`/products/${ images }`}
                        alt={ title } //!!
                        className="rounded-lg objet-fill"
                        />
                    </SwiperSlide>
                    
                ))
            }
        </Swiper>
        </div>
    )
}

