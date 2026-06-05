import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-16 pt-12 border-t border-gray-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          <div>
            <h4 className="font-serif font-bold mb-4 text-primary uppercase">Informations</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms and conditions</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About us</Link></li>
              <li><Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/return" className="hover:text-primary transition-colors">Return policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-4 text-primary uppercase">My Account</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/account" className="hover:text-primary transition-colors">Your Account</Link></li>
              <li><Link href="/information" className="hover:text-primary transition-colors">Information</Link></li>
              <li><Link href="/addresses" className="hover:text-primary transition-colors">Addresses</Link></li>
              <li><Link href="/orders" className="hover:text-primary transition-colors">Orders History</Link></li>
              <li><Link href="/search" className="hover:text-primary transition-colors">Search Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-4 text-primary uppercase">Help and More</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/products" className="hover:text-primary transition-colors">New products</Link></li>
              <li><Link href="/top-sellers" className="hover:text-primary transition-colors">Top sellers</Link></li>
              <li><Link href="/manufacturers" className="hover:text-primary transition-colors">Manufacturers</Link></li>
              <li><Link href="/suppliers" className="hover:text-primary transition-colors">Suppliers</Link></li>
              <li><Link href="/specials" className="hover:text-primary transition-colors">Specials</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-4 text-primary uppercase">Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/delivery" className="hover:text-primary transition-colors">Delivery</Link></li>
              <li><Link href="/service" className="hover:text-primary transition-colors">Service</Link></li>
              <li><Link href="/gift-cards" className="hover:text-primary transition-colors">Gift Cards</Link></li>
              <li><Link href="/mobile" className="hover:text-primary transition-colors">Mobile</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-primary text-white py-4 text-center text-sm">
        <p>&copy; 2026 Rustik Plank Furniture. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
