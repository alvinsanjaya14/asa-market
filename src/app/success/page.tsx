import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full animate-bounce-in">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Berhasil!</h1>
        <p className="text-gray-600 mb-8">
          Terima kasih telah berbelanja di ASA Market. <br/>
          Mohon menunggu, barang sedang kami proses dan akan segera sampai di tempat Anda.
        </p>
        <Link 
          href="/" 
          className="block w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Kembali ke Home
        </Link>
      </div>
    </div>
  );
}