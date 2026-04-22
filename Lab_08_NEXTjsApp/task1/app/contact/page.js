export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Contact Us</h1>
        <p className="text-lg text-slate-500">We'd love to hear from you. Send us a message below.</p>
      </div>
      
      <form className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 space-y-8">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
          <input 
            type="text" 
            id="name" 
            className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300" 
            placeholder="John Doe" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300" 
            placeholder="john@example.com" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Your Message</label>
          <textarea 
            id="message" 
            rows="6" 
            className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 resize-none" 
            placeholder="How can we help you today?"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="w-full py-4 bg-slate-900 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
