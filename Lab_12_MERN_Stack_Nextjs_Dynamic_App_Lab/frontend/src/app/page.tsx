'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('FEATURED');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const heroProduct = products.find(p => p.tags.includes('Hero'));
  
  const displayedProducts = products.filter(p => {
    if (activeTab === 'FEATURED') return p.tags.includes('Featured');
    if (activeTab === 'SPECIAL') return p.tags.includes('Special');
    if (activeTab === 'POPULAR') return p.tags.includes('Popular');
    return false;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 relative overflow-hidden">
        <div className="container-custom flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10 relative">
            <img 
              src={heroProduct?.image || '/images/hero-chair.png'} 
              alt="Hero Chair" 
              className="max-w-full h-auto object-contain drop-shadow-2xl"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0 text-center md:text-left z-10">
            <p className="text-gray-500 mb-6 italic leading-relaxed text-sm md:pr-12">
              {heroProduct?.description || 'This is a Photoshop version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.'}
            </p>
            <div className="flex items-end justify-center md:justify-start mb-6">
              <span className="text-5xl font-serif text-primary">£{heroProduct?.price || '129.99'}</span>
              <span className="text-gray-400 text-sm ml-2 line-through">OUR PRICE</span>
            </div>
            <button className="btn-primary flex items-center space-x-2 mx-auto md:mx-0 shadow-lg">
              <span>ADD TO</span>
              <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center">🛒</span>
            </button>
          </div>
        </div>
        {/* Background decorative shapes can go here */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-50 rounded-l-[100px] -mr-16"></div>
      </section>

      {/* Collections Banner */}
      <section className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-50 p-6 flex flex-col items-center border border-gray-100">
            <h3 className="font-serif text-xl mb-2">CHAIRS <br/><span className="text-primary font-sans text-sm tracking-widest uppercase">Collection</span></h3>
            <img src="/images/chair1.png" alt="Chairs" className="h-32 object-contain mt-4" />
          </div>
          <div className="bg-gray-50 p-6 flex flex-col items-center border border-gray-100">
            <h3 className="font-serif text-xl mb-2">BEDS <br/><span className="text-primary font-sans text-sm tracking-widest uppercase">Collection</span></h3>
            <img src="/images/bed1.png" alt="Beds" className="h-32 object-contain mt-4" />
          </div>
          <div className="bg-gray-50 p-6 flex flex-col items-center border border-gray-100">
            <h3 className="font-serif text-xl mb-2">TABLES <br/><span className="text-primary font-sans text-sm tracking-widest uppercase">Collection</span></h3>
            <img src="/images/table1.png" alt="Tables" className="h-32 object-contain mt-4" />
          </div>
        </div>
      </section>

      {/* Main Products Area */}
      <section className="container-custom py-8">
        <div className="flex justify-center space-x-12 mb-8 border-b pb-4">
          <button 
            className={`font-serif tracking-widest ${activeTab === 'FEATURED' ? 'text-gray-800 border-b-2 border-primary pb-1' : 'text-gray-400'}`}
            onClick={() => setActiveTab('FEATURED')}
          >
            FEATURED
          </button>
          <button 
            className={`font-serif tracking-widest ${activeTab === 'SPECIAL' ? 'text-gray-800 border-b-2 border-primary pb-1' : 'text-gray-400'}`}
            onClick={() => setActiveTab('SPECIAL')}
          >
            SPECIAL
          </button>
          <button 
            className={`font-serif tracking-widest ${activeTab === 'POPULAR' ? 'text-gray-800 border-b-2 border-primary pb-1' : 'text-gray-400'}`}
            onClick={() => setActiveTab('POPULAR')}
          >
            POPULAR
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            
            <div className="bg-gray-100 mt-12 py-4 flex justify-around text-xs tracking-widest uppercase text-gray-500 rounded-lg">
              <button className="hover:text-primary">See All Feature</button>
              <button className="hover:text-primary">See All Special</button>
              <button className="hover:text-primary">See All Popular</button>
            </div>
          </>
        )}
      </section>

      {/* Hot Deal */}
      <section className="container-custom py-12 text-center">
        <h2 className="font-serif text-2xl mb-8">Hot Deal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 relative p-8 text-left h-64 overflow-hidden flex items-center">
            <div className="z-10 bg-white/80 p-4 absolute top-4 left-4">
              <h3 className="font-serif text-xl">Elite Collection</h3>
              <p className="text-primary text-sm">Design Furniture</p>
            </div>
            <img src="/images/cabinet1.png" className="absolute right-0 bottom-0 h-48 object-cover" alt="Elite" />
            <div className="absolute bottom-4 right-4 bg-primary text-white w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold">
              <span className="text-xl leading-none">35%</span>
              <span className="text-xs">Sale OFF</span>
            </div>
          </div>
          
          <div className="bg-gray-800 text-white relative p-8 text-left h-64 overflow-hidden flex items-center">
            <div className="z-10">
              <h3 className="font-serif text-2xl border-b border-gray-600 pb-2 mb-2 inline-block">Reclaimed and hand crafted</h3>
              <div className="text-primary mt-4 font-bold text-xl">Sale OFF</div>
              <div className="text-6xl font-serif">50%</div>
            </div>
            <img src="/images/cabinet2.png" className="absolute right-8 bottom-0 h-48 object-contain" alt="Reclaimed" />
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="container-custom py-8">
        <div className="bg-yellow-50 flex flex-col md:flex-row items-center justify-center p-8 border border-yellow-100 space-y-4 md:space-y-0 md:space-x-8">
          <div className="text-primary font-bold text-2xl text-center md:text-left">
            BUY ONLINE <br/>
            <span className="text-green-500 font-sans text-xl">PICK UP IN STORE</span>
          </div>
          <div className="text-sm">
            <span className="font-bold">NOW AVAILABLE IN OUR STORE SYSTEM</span> <br/>
            AVAILABLE ON SELECT PRODUCTS. <span className="text-primary underline cursor-pointer">LEARN MORE!</span>
          </div>
        </div>
      </section>
    </div>
  );
}
