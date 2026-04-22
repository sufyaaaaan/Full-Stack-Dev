import { notFound } from 'next/navigation';
import { products } from '../../../data/products';
import Link from 'next/link';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetail({ params }) {
  // In Next.js 15, params is a promise
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto animate-slide-up">
      <div className="mb-8">
        <Link href="/products" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2 w-max transition-colors">
          <span>←</span> Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        {/* Product Image Placeholder */}
        <div className="md:w-1/2 bg-slate-100 flex items-center justify-center p-20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="text-9xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 drop-shadow-2xl">
            {product.id === "1" ? "🎧" : product.id === "2" ? "⌨️" : "🖥️"}
          </span>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-12 lg:p-16 flex flex-col">
          <div className="mb-4 flex items-center gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">In Stock</span>
            <span className="text-slate-400 text-sm font-medium">{product.color}</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            {product.title}
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed mb-8 font-light">
            {product.description}
          </p>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-5xl font-black text-slate-900">
              ${product.price.toFixed(2)}
            </div>
            <button className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black rounded-2xl shadow-xl shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
