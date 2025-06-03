'use client'

import { count, countReset } from "console";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
}


export const QuantitySelector = ({ quantity }: Props) => {

    const [ count, setCount ] = useState( quantity) ;
    const onQuantityCount = ( value: number) => {
        if (count + value < 1) return;

        setCount ( count + value );
    }
    
return (
    <div className="flex pb-4">
        <button className="mx-1" onClick={ () => onQuantityCount( -1 )}>
            <IoRemoveCircleOutline size={ 25 } />

        </button>
        <span className="mx-2 px-4 bg-gray-200 text-center rounded">
            { count }
        </span>
        <button className="mx-1" onClick={ () => onQuantityCount( 1 )}>
            <IoAddCircleOutline size={ 25 } />
        </button>
    </div>
)
}