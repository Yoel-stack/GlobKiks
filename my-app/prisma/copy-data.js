const { PrismaClient } = require('@prisma/client')
const pkg = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const { Client } = pkg

const prisma = new PrismaClient()
const oldDbClient = new Client({
  connectionString: process.env.DATABASE_URL_OLD
})

async function copyProducts() {
  try {
    await oldDbClient.connect()

    const res = await oldDbClient.query('SELECT * FROM "Product"')
    const products = res.rows

    console.log(`Encontrados ${products.length} productos en base antigua.`)

    for (const product of products) {
      await prisma.product.create({
        data: {
          id: product.id,
          title: product.title,
          slug: product.slug,
          description: product.description,
          price: product.price,
          priceOferta: product.priceoferta,
          mesOferta: product.mesoferta,
          inStock: product.instock,
          gender: product.gender,
          type: product.type,
          sizes: product.sizes,
          tags: product.tags,
          images: product.images,
          createdAt: product.createdat
        }
      })
    }

    console.log('Copia completada con éxito!')
  } catch (error) {
    console.error('Error copiando datos:', error)
  } finally {
    await oldDbClient.end()
    await prisma.$disconnect()
  }
}

copyProducts()
