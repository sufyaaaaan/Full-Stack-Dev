'use client';

import Link from 'next/link';

export default function Login() {
  return (
    <div className="container-custom py-16 flex justify-center">
      <div className="w-full max-w-md bg-white p-8 border border-gray-100 shadow-sm rounded-lg">
        <h2 className="text-3xl font-serif text-center mb-6">Sign In</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email Address</label>
            <input type="email" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input type="password" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
          </div>
          <button className="btn-primary w-full mt-4">Login</button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          New Customer? <Link href="/register" className="text-primary hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
}
