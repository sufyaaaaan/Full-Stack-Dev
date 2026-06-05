'use client';

import Link from 'next/link';

export default function Cart() {
  return (
    <div className="container-custom py-16 text-center">
      <h1 className="text-4xl font-serif text-gray-800 mb-6">Shopping Cart</h1>
      <div className="bg-white p-12 shadow-sm border border-gray-100 rounded-lg inline-block">
        <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
        <Link href="/">
          <button className="btn-primary">Return to Shop</button>
        </Link>
      </div>
    </div>
  );
}
