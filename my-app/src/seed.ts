interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    priceOferta: number,
    mesOferta: number,
    slug: string;
    tags: string[];
    title: string;
    sizes: ValidSizes[];
    type: ValidTypes;
    gender: ValidCatergories;
};

type ValidCatergories = 'mujeres'|'hombres'|'unisex';
type ValidTypes = 'futbol'|'correr'|'casual';
type ValidSizes = '37'|'38'|'39'|'40'|'41'|'42'|'43'|'44'|'45';

interface SeedData { 
    products: SeedProduct[],
};

export const initialData: SeedData = {
    products:[]
};