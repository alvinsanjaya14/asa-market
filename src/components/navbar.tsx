'use client';
import Link from 'next/link';
import { useCart } from '@/src/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const { cart } = useCart();
  
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold tracking-tighter">
        ASA Market.
      </Link>
      <Link href="/cart" className="relative p-2">
        <ShoppingCart className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  );
}