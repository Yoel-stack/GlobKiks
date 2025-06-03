import type { ValidSizes } from "@/interfaces";
import clsx from 'clsx';

interface Props {
    selectedSize: ValidSizes;
    avaliableSize: ValidSizes[];
}

export const SizeSelect = ({ selectedSize, avaliableSize}: Props) => {
    return(
        <div className='my-4'>
            <h3 className='font-bold mb-2'>Talles disponibles</h3>
            <div className='flex'>
                {
                    avaliableSize.map( sizes => (
                        <button 
                        key={sizes}
                        className={
                            clsx(
                                'mx-2 hover:underline text-lg',
                                {
                                    'underline': sizes === selectedSize
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