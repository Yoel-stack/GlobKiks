import type { Product, ValidSizes, ValidTypes, ValidCatergories } from '@/interfaces';

// Validadores para los tipos específicos
function isValidSizes(value: unknown): value is ValidSizes[] {
  return (
    Array.isArray(value) &&
    value.every(v => typeof v === 'string' && ['37','38','39','40','41','42','43','44','45'].includes(v))
  );
};

function isValidTypes(value: unknown): value is ValidTypes {
  return typeof value === 'string' && ['futbol', 'correr', 'casual'].includes(value);
};

function isValidCategories(value: unknown): value is ValidCatergories {
  return typeof value === 'string' && ['mujeres', 'hombres', 'unisex'].includes(value);
};

export function transformRawProduct(raw: unknown): Product {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('Invalid product data');
  }
  const obj = raw as Record<string, unknown>;

  return {
    title: String(obj.title),
    slug: String(obj.slug),
    description: String(obj.description),
    price: Number(obj.price),
    priceOferta: Number(obj.priceOferta),
    mesOferta: Number(obj.mesOferta),  
    inStock: Number(obj.inStock),
    gender: isValidCategories(obj.gender) ? obj.gender : 'unisex',
    type: isValidTypes(obj.type) ? obj.type : 'casual',
    sizes: isValidSizes(obj.sizes) ? obj.sizes : [],
    tags: Array.isArray(obj.tags) ? obj.tags.map(String) : [],
    images: Array.isArray(obj.images) ? obj.images.map(String) : [],
  };
};

