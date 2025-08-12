export interface Product {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    slug: string;
    tags: string[];
    title: string;
    sizes: ValidSizes[];
    type: ValidTypes;
    gender: ValidCatergories;
}

export type ValidCatergories = 'mujeres'|'hombres'|'unisex';
export type ValidTypes = 'futbol'|'correr'|'casual';
export type ValidSizes = '37'|'38'|'39'|'40'|'41'|'42'|'43'|'44'|'45'; 