import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] animate-fade-in relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-24 text-center border border-slate-800 shadow-2xl">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto animate-slide-up">
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-semibold tracking-wider mb-6 border border-indigo-500/30">
          PREMIUM TECH GEAR
        </span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-8 leading-tight">
          Elevate Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Workspace.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light max-w-2xl mx-auto">
          Discover our curated collection of premium tech accessories designed for professionals who demand the best.
        </p>
        <Link 
          href="/products" 
          className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-900 text-lg font-black rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300"
        >
          Explore Collection 
          <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  );
}
