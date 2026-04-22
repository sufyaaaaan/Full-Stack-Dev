import Link from 'next/link';
import { products } from '../data/products';

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
        >
          <div className="h-48 bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors duration-300">
            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
              {product.id === "1" ? "🎧" : product.id === "2" ? "⌨️" : "🖥️"}
            </span>
          </div>
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{product.title}</h3>
            <p className="text-slate-500 line-clamp-2 mb-6 flex-grow">{product.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-3xl font-black text-indigo-600">${product.price.toFixed(2)}</span>
              <Link 
                href={`/products/${product.id}`} 
                className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors duration-300 shadow-md hover:shadow-indigo-500/30"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
