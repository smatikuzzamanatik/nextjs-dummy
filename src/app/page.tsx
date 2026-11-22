export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex flex-col justify-between p-8 sm:p-16 font-sans">
      <header className="flex justify-between items-center max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-lg tracking-tight">Next.js Demo App</span>
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
          Ready for Deployment
        </div>
      </header>

      <main className="max-w-4xl mx-auto my-auto text-center flex flex-col items-center gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          <span>🚀</span>
          <span>Next.js ডামি প্রজেক্ট সফলভাবে প্রস্তুত</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Welcome to Your Next.js Dummy App
        </h1>

        <p className="max-w-xl text-slate-400 text-base sm:text-lg leading-relaxed">
          এই প্রজেক্টটি ডিপ্লয়মেন্টের জন্য সম্পূর্ণ প্রস্তুত। এটি Next.js (App Router), Tailwind CSS এবং TypeScript দিয়ে তৈরি করা হয়েছে।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6 text-left">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <h3 className="font-semibold text-white mb-2">⚡ Ultra Fast</h3>
            <p className="text-slate-400 text-sm">Next.js App Router এবং Turbopack অপ্টিমাইজেশন।</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <h3 className="font-semibold text-white mb-2">🎨 Tailwind CSS</h3>
            <p className="text-slate-400 text-sm">সহজ ও সুন্দর আধুনিক ইউআই স্টাইলিং।</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <h3 className="font-semibold text-white mb-2">☁️ Easy Deploy</h3>
            <p className="text-slate-400 text-sm">Vercel, Netlify বা GitHub-এ ডিপ্লয় করার জন্য প্রস্তুত।</p>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-500 max-w-5xl w-full mx-auto pt-8 border-t border-slate-800/60">
        Created by Antigravity • Next.js + React + Tailwind CSS
      </footer>
    </div>
  );
}
