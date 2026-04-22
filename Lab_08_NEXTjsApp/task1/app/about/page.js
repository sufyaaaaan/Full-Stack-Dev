export default function About() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">About Us</h1>
        <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
      </div>
      
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow duration-500">
        <h2 className="text-3xl font-bold mb-6 text-slate-800 flex items-center">
          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-4">🚀</span> 
          Our Mission
        </h2>
        <p className="text-slate-600 leading-relaxed mb-10 text-xl font-light">
          We strive to build beautiful, fast, and dynamic web applications. Our use of modern technologies like Next.js and Tailwind CSS enables us to deliver top-tier user experiences that leave a lasting impression.
        </p>
        
        <h2 className="text-3xl font-bold mb-6 text-slate-800 flex items-center">
          <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-4">💻</span> 
          Our Technology Stack
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-600 text-lg">
          <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
            <span className="text-4xl mb-3">⚛️</span>
            <strong className="text-slate-800 mb-2">React</strong>
            <span className="text-sm">For robust and interactive UI components</span>
          </li>
          <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
            <span className="text-4xl mb-3">▲</span>
            <strong className="text-slate-800 mb-2">Next.js</strong>
            <span className="text-sm">For optimized routing and server-side rendering</span>
          </li>
          <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
            <span className="text-4xl mb-3">🌊</span>
            <strong className="text-slate-800 mb-2">Tailwind CSS</strong>
            <span className="text-sm">For rapid, utility-first, and beautiful styling</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
