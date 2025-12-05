import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Navbar from '@/src/components/navbar';
import AddToCartButton from '@/src/components/AddToCartButton'; // Kita buat di bawah

const prisma = new PrismaClient();

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      
      {/* Hero Slider Section (Simplified) */}
      <div className="w-full bg-black text-white py-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 animate-fade-in">
          ASA Market
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Temukan elektronik terbaik dengan harga minimalis. 
          Kualitas maksimal, desain futuristik.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto p-6 py-12">
        <h2 className="text-2xl font-bold mb-8 border-b pb-4">Produk Terbaru</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
              <div className="relative h-48 w-full bg-gray-200">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-blue-600">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  {/* Client Component untuk interaksi */}
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}