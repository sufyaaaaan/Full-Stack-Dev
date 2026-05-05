"use client";

export default function AddToCartButton({ title }: { title: string }) {
  const handleAddToCart = () => {
    alert(`${title} has been added to your cart!`);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full py-2 px-4 rounded-lg bg-teal-500/10 text-teal-400 font-medium border border-teal-500/20 hover:bg-teal-500 hover:text-white transition-colors duration-300"
    >
      Add to Cart
    </button>
  );
}
