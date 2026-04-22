export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <p className="text-slate-500 font-medium text-lg">
          &copy; {new Date().getFullYear()} StoreFront Inc. All rights reserved.
        </p>
        <p className="mt-3 text-sm text-slate-400">
          Built with Next.js, Dynamic Routing, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
