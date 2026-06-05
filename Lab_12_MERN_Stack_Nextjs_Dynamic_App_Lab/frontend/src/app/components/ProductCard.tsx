import Link from 'next/link';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col items-center p-4 border border-gray-100 hover:shadow-md transition-shadow bg-white text-center">
      <div className="h-48 flex items-center justify-center mb-4 overflow-hidden">
        {/* We use standard img to easily handle mock images right now */}
        <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} className="max-h-full object-contain" />
      </div>
      <p className="text-xs text-gray-500 mb-2 h-12 overflow-hidden">{product.description}</p>
      <div className="text-xl font-serif text-primary mb-3">£{product.price.toFixed(2)}</div>
      <Link href={`/product/${product._id}`}>
        <button className="border border-gray-300 text-gray-700 py-1 px-6 rounded-full text-sm hover:bg-gray-50 transition-colors">
          Detail
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
