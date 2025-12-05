'use client';
import Navbar from '@/src/components/navbar';
import { useCart } from '@/src/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    // Simulasi proses pembayaran
    setTimeout(() => {
      clearCart();
      router.push('/success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Keranjang Anda</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">Keranjang masih kosong.</p>
            <Link href="/" className="text-blue-600 underline">Belanja sekarang</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500 text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h3 className="font-bold text-lg mb-4">Ringkasan</h3>
              <div className="flex justify-between mb-4 border-b pb-4">
                <span>Total</span>
                <span className="font-bold">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}