interface SeedProduct {
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

type ValidCatergories = 'mujeres'|'hombres'|'unisex';
type ValidTypes = 'futbol'|'correr'|'casual';
type ValidSizes = '41'|'42'|'43'|'44';

interface SeedData { 
    products: SeedProduct[],
}

export const initialData: SeedData = {
    products: [
        {
            description: "Tenis para uso casual, combina con todo",
            images: [
                'modelo1.webp',
                'modelo11.webp',
            ],
            inStock: 7,
            price: 5500,
            slug: "champion_casual1_caballero",
            sizes: ['41','42','43','44'],
            type: 'casual',
            tags: ['menshoes'],
            title: "New Balen",
            gender: "hombres"
        },
        {
            description: "Tenis para uso casual, doble cordon luce fenomenal",
            images: [
                'modelo2.webp',
                'modelo22.webp',
            ],
            inStock: 4,
            price: 5000,
            slug: "championes_casual2_dama",
            sizes: ['41','42','43','44'],
            type: 'casual',
            tags: ['womenshoes'],
            title: "Jack New",
            gender: "mujeres"
        },
        {
            description: "Tenis ideales para usar todos los dias ",
            images: [
                'modelo3.webp',
                'modelo33.webp',
            ],
            inStock: 8,
            price: 6800,
            slug: "championes_casual3_unisex",
            sizes: ['41','42','43','44'],
            type: 'casual',
            tags: ['unisexshoes'],
            title: "RABBIT School",
            gender: "unisex"
        },
        {
            description: "Tenis para entrenar, livianos y ligeros",
            images: [
                'modelo4.webp',
                'modelo44.webp',
            ],
            inStock: 8,
            price: 6500,
            slug: "championes_correr4_caballero",
            sizes: ['41','42','43','44'],
            type: 'correr',
            tags: ['menshoes'],
            title: "Fast PRO",
            gender: "hombres"
        },
        {
            description: "Tenis para jugar futbol-11 Alta gama",
            images: [
                'modelo5.webp',
                'modelo55.webp',
            ],
            inStock: 8,
            price: 4000,
            slug: "championes_correr5_caballero",
            sizes: ['41','42','43','44'],
            type: 'correr',
            tags: ['menshoes'],
            title: "Naike Mercuri",
            gender: "hombres"
        },
        {
            description: "Tenis para entrenar suela HightPerformance",
            images: [
                'modelo7.webp',
                'modelo77.webp',
            ],
            inStock: 8,
            price: 6800,
            slug: "championes_correr7_caballero",
            sizes: ['41','42','43','44'],
            type: 'futbol',
            tags: ['menshoes'],
            title: "Runner 7PRO",
            gender: "hombres"
        },
        {
            description: "Tenis de futbol CR7, botitas",
            images: [
                'modelo8.webp',
                'modelo88.webp',
            ],
            inStock: 8,
            price: 6000,
            slug: "championes_futbol8_caballero",
            sizes: ['41','42','43','44'],
            type: 'futbol',
            tags: ['menshoes'],
            title: "Naike Hipervenom",
            gender: "hombres"
        },
        {
            description: "Tenis muy comodos, si buscas durabilidad este es tu modelo ideal",
            images: [
                'modelo9.webp',
                'modelo99.webp',
            ],
            inStock: 4,
            price: 6200,
            slug: "championes_de_mujer9",
            sizes: ['41','42','43','44'],
            type: 'casual',
            tags: ['womenshoes'],
            title: "FashionSix",
            gender: "mujeres"
        },
        {
            description: "Tenis Chunta SV muy ligeros, ganaras en todo te lo aseguro",
            images: [
                'modelo10.webp',
                'modelo100.webp',
            ],
            inStock: 4,
            price: 6200,
            slug: "championes_unisex10",
            sizes: ['41','42','43','44'],
            type: 'correr',
            tags: ['unisexshoes'],
            title: "Chunta SV",
            gender: "unisex"
        }
    ]
};