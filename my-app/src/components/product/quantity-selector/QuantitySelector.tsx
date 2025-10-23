"use client";

    
import { useEffect, useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface QtyProps { 
    quantity: number;
    onChange: (newQty: number) => void;
};

// Quita y agrega 1
export const QuantitySelector = ({ quantity, onChange }: QtyProps) => {

    const [ count, setCount ] = useState( quantity);

    useEffect(() => {
        setCount(quantity);
    }, [quantity]);

    const onQuantityCount = (value: number) => {
    if (count + value < 1) return;
    const newCount = count + value;
    setCount(newCount);
    onChange(newCount);
    };
    
return (
    <div className="flex pb-4">
        <button className="mx-1" onClick={ () => onQuantityCount( -1 )}>
            <IoRemoveCircleOutline size={ 25 } />

        </button>
        <span className="mx-2 px-4 bg-gray-300 dark:bg-gray-800 text text-center rounded">
            { count }
        </span>
        <button className="mx-1" onClick={ () => onQuantityCount( 1 )}>
            <IoAddCircleOutline size={ 25 } />
        </button>
    </div>
    );
};