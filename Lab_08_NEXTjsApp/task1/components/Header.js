import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-blue-400 hover:text-blue-300 transition-colors">
          Next.js Multi-Page App
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li><Link href="/" className="hover:text-blue-400 transition-colors font-medium">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-400 transition-colors font-medium">About</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition-colors font-medium">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
