import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/">
            <div className="text-3xl font-serif text-primary">
              Rustik <span className="text-gray-800">Plank</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="hidden md:flex space-x-4">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            </div>
            <div className="flex space-x-4 items-center border-l pl-4">
              <Link href="/login" className="flex items-center hover:text-primary transition-colors">
                <User size={16} className="mr-1" /> My Account (Login/Register)
              </Link>
              <Link href="/cart" className="flex items-center hover:text-primary transition-colors">
                <ShoppingCart size={16} className="mr-1" /> 0 Items
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation / Categories */}
        <div className="flex justify-between items-center border-t pt-4">
          <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-wider text-gray-700">
            <Link href="/category/beds" className="hover:text-primary transition-colors">BEDS</Link>
            <Link href="/category/cabinets" className="hover:text-primary transition-colors">CABINETS</Link>
            <Link href="/category/bookcases" className="hover:text-primary transition-colors">BOOKCASES</Link>
            <Link href="/category/boxes" className="hover:text-primary transition-colors">BOXES</Link>
            <Link href="/category/chairs" className="hover:text-primary transition-colors">CHAIRS</Link>
            <Link href="/category/tables" className="hover:text-primary transition-colors">TABLES</Link>
          </nav>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="border border-gray-300 rounded-full py-1 px-4 text-sm focus:outline-none focus:border-primary w-48 transition-all"
            />
            <Search size={16} className="absolute right-3 top-1.5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
