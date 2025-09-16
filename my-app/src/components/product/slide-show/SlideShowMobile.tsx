'use client'

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react"; //componente Swiper de React
import { Autoplay, FreeMode, Pagination } from "swiper/modules"; //importamos los 'modules' ya vienen personalizados con su funcion determiniada
import React from 'react'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';

interface Props {
    images: string[];
    title: string;
    className?: string; // ? Esto significa que la propiedad puede tener el tipo especificado o puede estar ausente (es decir, undefined)
}

export const SlideShowMobile = ({ images, title, className}: Props) => {

    return (
      <div className={className}>
        <Swiper
          style={{
            width: "85vw",
            height: "350px",
          }}
          pagination
          autoplay={{ delay: 2500 }} //pasa la imagen automaticamente dps de los 2,5 segundos
          modules={[FreeMode, Autoplay, Pagination]} // se importan los modulos personalizados de Swiper
          className="mySwiper2"
        >
          {images.map((images) => (
            <SwiperSlide key={images}>
              <Image
                width={200}
                height={300}
                src={`/products/${images}`}
                alt={title} //!!
                className="rounded-lg objet-fill"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
};

