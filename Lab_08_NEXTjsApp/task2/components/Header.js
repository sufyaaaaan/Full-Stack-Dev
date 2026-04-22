import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 hover:text-indigo-600 transition-colors flex items-center gap-2">
          <span className="bg-indigo-600 text-white p-2 rounded-lg text-lg">🛍️</span>
          StoreFront
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="text-slate-600 hover:text-indigo-600 font-semibold transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-slate-600 hover:text-indigo-600 font-semibold transition-colors relative group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
