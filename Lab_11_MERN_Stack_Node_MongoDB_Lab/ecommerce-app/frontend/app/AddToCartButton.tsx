"use client";
import { useState } from "react";

export default function AddToCartButton({ title }: { title: string }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    // You could also add a toast notification here
  };

  return (
    <button 
      onClick={handleAddToCart}
      className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group ${
        isAdded 
        ? "bg-green-500 text-slate-950" 
        : "bg-white/5 text-white hover:bg-teal-500 hover:text-slate-950 border border-white/10 hover:border-teal-500 shadow-lg hover:shadow-teal-500/20"
      }`}
    >
      {isAdded ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          Added!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.56-7.43H5.12"></path></svg>
          Add to Cart
        </>
      )}
    </button>
  );
}
