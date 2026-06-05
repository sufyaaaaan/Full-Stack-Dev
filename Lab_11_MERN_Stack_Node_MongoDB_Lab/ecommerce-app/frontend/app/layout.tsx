import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'EcoMERN | Next-Gen Ecommerce',
  description: 'Premium MERN Stack Ecommerce Experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans text-slate-50 antialiased selection:bg-teal-500/30">
        <header className="sticky top-0 z-50">
          <nav className="glass-card mx-auto max-w-7xl mt-4 px-6 py-4 flex items-center justify-between rounded-2xl mx-4 lg:mx-auto border-white/5">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="p-2 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </div>
                <span className="text-2xl font-black tracking-tight font-outfit text-gradient">
                  EcoMERN
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex gap-8 items-center">
              <Link href="/" className="text-sm font-medium hover:text-teal-400 transition-colors">Products</Link>
              <Link href="/" className="text-sm font-medium hover:text-teal-400 transition-colors">Categories</Link>
              <Link href="/" className="text-sm font-medium hover:text-teal-400 transition-colors">Deals</Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full border-2 border-slate-950"></span>
              </button>
              <button className="hidden sm:block px-5 py-2.5 rounded-xl bg-white text-slate-950 text-sm font-bold hover:bg-teal-400 hover:text-white transition-all duration-300">
                Connect Wallet
              </button>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="mt-20 border-t border-white/5 bg-slate-950/50 backdrop-blur-md py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-1.5 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </div>
                <span className="text-xl font-bold font-outfit text-gradient">EcoMERN</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                The world's most advanced ecommerce platform for next-generation technology and digital assets.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-500/20 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-500/20 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Shop</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link href="/" className="hover:text-teal-400 transition-colors">All Products</Link></li>
                <li><Link href="/" className="hover:text-teal-400 transition-colors">Featured</Link></li>
                <li><Link href="/" className="hover:text-teal-400 transition-colors">New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link href="/" className="hover:text-teal-400 transition-colors">About Us</Link></li>
                <li><Link href="/" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-slate-500 text-xs">
            © 2026 EcoMERN. Designed for the Future.
          </div>
        </footer>
      </body>
    </html>
  );
}
