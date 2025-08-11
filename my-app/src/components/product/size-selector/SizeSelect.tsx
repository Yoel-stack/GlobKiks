'use client'

import type { ValidSizes } from "@/interfaces";
import clsx from 'clsx';
import { useEffect, useState } from "react";

interface SizeProps {
    selectedSize: ValidSizes;
    avaliableSize: ValidSizes[];
    onChange: (sizes: ValidSizes) => void;

}

export const SizeSelect = ({ selectedSize, avaliableSize, onChange }: SizeProps) => {
    const [currentSize, setCurrentSize] = useState<ValidSizes>(selectedSize);
    
    useEffect(() => {
        setCurrentSize(selectedSize);
    }, [selectedSize]);

    const handleSiseChange = (sizes: ValidSizes) => {
        setCurrentSize(sizes);
        onChange(sizes);
    }

    return(
        <div className='my-4'>
            <h3 className='font-bold mb-2'>Talles disponibles</h3>
            <div className='flex'>
                {
                    avaliableSize.map( sizes => (
                        <button 
                        key={sizes}
                        onClick={() => handleSiseChange(sizes)}
                        className={
                            clsx(
                                'mx-2 textslow hover:underline text-lg',
                                {
                                    'underline': sizes === currentSize,
                                }
                            )
                        }                   
                        >
                            {sizes}
                        </button>
                    ))  
                }
            </div>
        </div>
    )
}