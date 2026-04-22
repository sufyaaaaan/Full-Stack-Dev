import ProductList from '../../components/ProductList';

export default function ProductsPage() {
  return (
    <div className="animate-slide-up max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">Our Products</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
          Browse through our selection of high-end equipment designed to enhance your workflow and elevate your everyday experience.
        </p>
      </div>
      
      <ProductList />
    </div>
  );
}
