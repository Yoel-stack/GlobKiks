import { QuantitySelector, SlideShow, SizeSelect, SlideShowMobile} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed";

interface Props {
    params: {
        slug: string; //slug porque le pasa el slug del producto
    }   
}


export default function({ params }: Props){
    const { slug } = params;
    const products = initialData.products.find( product => product.slug === slug); //find devuelve el primer elemento del array proporcionado que cumple con la función de prueba

    return (
        <div className="mt-3 mb-20 sm:grid md:grid-cols-3 gap-3">

            {/* PRODUCT IMG Mobile */}
            <div className="col-span-1 p-2 md:col-span-2">
                <SlideShowMobile
                title={products?.title}
                images={products?.images}
                className="block md:hidden"/>            

            {/* PRODUCT IMG  */}
                <SlideShow 
                title={products?.title}
                images={products?.images}
                className="hidden md:block"/>
            </div>

            {/* PRODUCT DETALLES */}
            <div className="my-5 col-span-1 p-3">
                <h1 className={ `${titleFont.className} font-bold text-xl` }>
                    {products?.title}
                </h1>
                <p className="text-xl">{ `$ ` + products?.price }</p>

                {/* Selector de Tallas */}
                <SizeSelect 
                selectedSize={products?.sizes[1]}
                avaliableSize={products?.sizes}
                />

                {/* Selector de Cantidad */}
                <QuantitySelector 
                quantity={ 4 }
                />

                {/* Button */}
                <button type= "button" className="agregarCarrito">
                    Agregar al Carrito
                </button>

                {/* Descripcion */}
                <h3 className="my-2 mt-3 text-sm ">
                    Descripcion
                </h3>
                <p className="font-lihgt">{ products?.description }</p>

            </div>
            
        </div>
    );
};