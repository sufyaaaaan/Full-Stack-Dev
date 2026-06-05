import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

// Defined the Product type
type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default async function Home() {
  let products: Product[] = [];
  let errorMsg = null;

  try {
    // Fetch from backend running on port 5000
    const res = await fetch("http://127.0.0.1:5000/api/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    products = await res.json();
  } catch (err: any) {
    errorMsg = "Unable to connect to the backend server. Please ensure the Express server is running on port 5000.";
    console.error(err);
  }

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden mb-20 rounded-b-[3rem]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Season 2026 Collection
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-outfit mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Next-Gen <br />
            <span className="text-gradient">Technology</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Experience the future of innovation with our curated collection of bleeding-edge gadgets and digital masterpieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <button className="px-8 py-4 bg-teal-500 text-slate-950 font-bold rounded-2xl hover:bg-teal-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/20">
              Shop Collection
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
              View Showcase
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold font-outfit mb-2">Featured Products</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"></div>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:text-teal-400 transition-colors">Latest</button>
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:text-teal-400 transition-colors">Popular</button>
          </div>
        </div>

        {errorMsg ? (
          <div className="glass-card p-12 text-center rounded-3xl border-red-500/20">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            </div>
            <p className="text-xl font-bold text-red-400 mb-2">Connection Error</p>
            <p className="text-slate-400 max-w-md mx-auto">{errorMsg}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} className="glass-card rounded-[2rem] overflow-hidden group hover:-translate-y-4 transition-all duration-500 border-white/5 hover:border-teal-500/30">
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-teal-400 border border-white/10">
                    Premium
                  </div>
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="absolute bottom-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-teal-500 text-slate-950 p-3 rounded-xl shadow-xl shadow-teal-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold truncate pr-2 group-hover:text-teal-400 transition-colors" title={product.title}>
                      {product.title}
                    </h3>
                    <div className="text-xl font-black font-outfit text-white">
                      ${product.price.toFixed(0)}<span className="text-xs text-slate-500">.00</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-8 leading-relaxed">
                    {product.description}
                  </p>
                  <AddToCartButton title={product.title} />
                </div>
              </div>
            ))}
            
            {products.length === 0 && !errorMsg && (
              <div className="col-span-full py-24 text-center glass-card rounded-[3rem] border-dashed border-2 border-white/5">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M7 6v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="m10 11 4 4"/><path d="m14 11-4 4"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">No Products Available</h3>
                <p className="text-slate-400">Run the seed script to populate your futuristic inventory.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
