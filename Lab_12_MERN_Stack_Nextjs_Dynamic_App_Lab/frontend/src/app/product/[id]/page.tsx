'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Star } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-h-[500px] object-contain drop-shadow-xl" />
        </div>
        <div className="md:w-1/2 p-12">
          <div className="text-sm text-primary font-bold uppercase tracking-widest mb-2">{product.category}</div>
          <h1 className="text-4xl font-serif text-gray-800 mb-4">{product.name}</h1>
          <div className="flex items-center space-x-1 text-yellow-400 mb-6">
            <Star fill="currentColor" size={18} />
            <Star fill="currentColor" size={18} />
            <Star fill="currentColor" size={18} />
            <Star fill="currentColor" size={18} />
            <Star size={18} />
            <span className="text-gray-400 text-sm ml-2">(12 Reviews)</span>
          </div>
          
          <div className="text-3xl font-serif text-primary mb-6">£{product.price.toFixed(2)}</div>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>
          
          <div className="mb-8">
            <span className="font-semibold text-gray-700">Availability:</span> 
            <span className={`ml-2 ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <button 
            disabled={product.countInStock === 0}
            className="btn-primary w-full md:w-auto flex items-center justify-center space-x-2 py-3 px-8 text-lg"
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
