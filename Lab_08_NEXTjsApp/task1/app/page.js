import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-20 animate-fade-in">
      <div className="bg-white/50 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white max-w-4xl w-full text-center">
        <h1 className="text-6xl font-extrabold tracking-tight mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500">
            Welcome to Our Multi-Page App
          </span>
        </h1>
        <p className="text-2xl text-slate-600 mb-10 font-light leading-relaxed">
          Experience seamless navigation, modern design, and robust architecture powered by Next.js and Tailwind CSS.
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="/about" className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            Learn More
          </Link>
          <Link href="/contact" className="px-10 py-4 bg-white text-indigo-600 text-lg font-bold rounded-xl shadow-md border border-slate-200 hover:bg-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
