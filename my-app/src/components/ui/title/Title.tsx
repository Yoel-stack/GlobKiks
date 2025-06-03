import React from 'react'

interface Props {
    title: string ;
    subtitle?: string ;
    className?: string ;
}

export const Title = ({title, subtitle, className}: Props) => {
  return (
    <div>
        <h1 className='p-1 m-0'>{ title }</h1> 
        {
            subtitle && (
                <h3 className='p-1 m-1'>
                    {subtitle}
                </h3>
            )
        }
    </div>
  )
}
