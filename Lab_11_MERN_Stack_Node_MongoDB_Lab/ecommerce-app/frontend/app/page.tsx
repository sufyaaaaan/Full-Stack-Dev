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
    // Fetch from backend running on port 5000 (using 127.0.0.1 to avoid IPv6 localhost issues in Next.js SSR)
    const res = await fetch("http://127.0.0.1:5000/api/products", {
      cache: "no-store", // Ensure fresh data
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
    <div className="animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">Next-Gen</span> Tech
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Explore our premium selection of cutting-edge gadgets designed to elevate your everyday experience.
        </p>
      </div>

      {errorMsg ? (
        <div className="glass-card p-6 text-center text-red-400 border-red-500/30 rounded-xl">
          <p className="text-lg font-semibold">{errorMsg}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold truncate pr-2" title={product.title}>
                    {product.title}
                  </h2>
                  <span className="text-teal-400 font-bold whitespace-nowrap">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                  {product.description}
                </p>
                <AddToCartButton title={product.title} />
              </div>
            </div>
          ))}
          {products.length === 0 && !errorMsg && (
            <div className="col-span-full text-center text-slate-400 py-12">
              No products found. Run the seed script to populate the database.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
