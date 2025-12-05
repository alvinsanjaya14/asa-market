'use client';
import React, { useState } from 'react';
import { useCart } from '@/components/header/CartContext';
import { useRouter } from 'next/navigation'; // Untuk redirect
import { toast } from 'react-toastify';      // Untuk notifikasi

const DEFAULT_SHIPPING_COST = 50;

export default function CheckOutMain() {
    const { cartItems, clearCart } = useCart(); // Ambil clearCart
    const router = useRouter();                 // Init router
    const [isLoading, setIsLoading] = useState(false);

    // Hitung Total
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = DEFAULT_SHIPPING_COST;
    const total = subtotal + shippingCost;

    // Fungsi saat tombol Place Order ditekan
    const handlePlaceOrder = async (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            toast.error("Keranjang Anda kosong!");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Kirim data ke Database via API
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems,
                    total: total
                })
            });

            if (response.ok) {
                // 2. Tampilkan Notifikasi Sukses
                toast.success("Barang berhasil dipesan!");

                // 3. Hapus barang di keranjang
                clearCart();

                // 4. Redirect ke Halaman Utama setelah jeda singkat
                setTimeout(() => {
                    router.push('/'); 
                }, 2000);
            } else {
                toast.error("Gagal memproses pesanan.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Terjadi kesalahan sistem.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="checkout-area rts-section-gap">
            <div className="container">
                <div className="row">
                    {/* Hapus Kolom Billing Form, ganti dengan pesan sederhana atau kosongkan */}
                    <div className="col-lg-12">
                        <h3 className="title-checkout">Review Your Order</h3>
                        
                        {/* Order Summary Langsung Ditampilkan Full Width */}
                        <div className="right-card-sidebar-checkout">
                            <div className="top-wrapper">
                                <div className="product">Products</div>
                                <div className="price">Price</div>
                            </div>

                            {cartItems.length === 0 ? (
                                <p className="text-center p-4">Your cart is empty.</p>
                            ) : (
                                cartItems.map((item) => (
                                    <div className="single-shop-list" key={item.id}>
                                        <div className="left-area">
                                            <img src={item.image} alt={item.title} style={{maxWidth: '50px'}} />
                                            <span className="title">{item.title} × {item.quantity}</span>
                                        </div>
                                        <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))
                            )}

                            <div className="single-shop-list border-top mt-3 pt-3">
                                <div className="left-area"><span>Subtotal</span></div>
                                <span className="price">${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="single-shop-list">
                                <div className="left-area"><span>Shipping</span></div>
                                <span className="price">${shippingCost.toFixed(2)}</span>
                            </div>

                            <div className="single-shop-list total-price-area">
                                <div className="left-area">
                                    <span style={{ fontWeight: 700, fontSize: '18px' }}>Total Price:</span>
                                </div>
                                <span className="price" style={{ color: '#629D23', fontSize: '18px' }}>
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <div className="cottom-cart-right-area mt-4">
                                {/* Tombol Place Order */}
                                <button 
                                    onClick={handlePlaceOrder} 
                                    className="rts-btn btn-primary w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}