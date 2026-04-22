import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Dynamic Routing Store",
  description: "A showcase of dynamic components and routing in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${outfit.className} antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white`}
      >
        <Header />
        <main className="flex-grow container mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
