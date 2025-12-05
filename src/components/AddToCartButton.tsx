// src/components/AddToCartButton.tsx
'use client';
import { useCart } from '@/src/context/CartContext';
import { Plus } from 'lucide-react';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  return (
    <button 
      onClick={() => addToCart(product)}
      className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
    >
      <Plus size={18} />
    </button>
  );
}