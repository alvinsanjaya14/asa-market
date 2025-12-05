// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      name: 'iPhone 15 Pro',
      description: 'Smartphone canggih dengan chip A17 Pro.',
      price: 18000000,
      image: 'https://placehold.co/600x400/1a1a1a/white?text=iPhone+15',
      category: 'HP'
    },
    {
      name: 'MacBook Air M2',
      description: 'Laptop tipis dan sangat cepat untuk kerja.',
      price: 16500000,
      image: 'https://placehold.co/600x400/2b2b2b/white?text=MacBook+Air',
      category: 'Laptop'
    },
    {
      name: 'Sony WH-1000XM5',
      description: 'Headphone noise cancelling terbaik.',
      price: 4500000,
      image: 'https://placehold.co/600x400/3c3c3c/white?text=Sony+Headphone',
      category: 'Elektronik'
    },
    {
      name: 'Samsung S24 Ultra',
      description: 'HP Android dengan kamera zoom epik.',
      price: 19000000,
      image: 'https://placehold.co/600x400/1a1a1a/white?text=Samsung+S24',
      category: 'HP'
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })