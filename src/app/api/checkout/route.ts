import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // <--- PERUBAHAN DI SINI: Import dari lib

// HAPUS BARIS INI: const prisma = new PrismaClient(); 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, total } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Simpan ke Database menggunakan instance 'prisma' yang diimport
    const newOrder = await prisma.order.create({
      data: {
        total: total,
        items: {
          create: items.map((item: any) => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, orderId: newOrder.id });
  } catch (error) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}