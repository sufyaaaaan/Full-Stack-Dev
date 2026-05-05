import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Premium Ecommerce Lab',
  description: 'MERN Stack Ecommerce Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-50 antialiased`}>
        <nav className="sticky top-0 z-50 glass-card px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
            <Link href="/" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/polaris/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              EcoMERN
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <Link href="/" className="hover:text-teal-400 transition-colors">Products</Link>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
