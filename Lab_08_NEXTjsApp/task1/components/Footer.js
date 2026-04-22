export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Next.js Multi-Page App. All rights reserved.</p>
        <p className="mt-2 md:mt-0 text-sm font-medium">Built with Next.js & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
