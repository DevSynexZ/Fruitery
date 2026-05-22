"useinit"
import React from 'react';
import Link from 'next/link';
import { Leaf, Apple, Carrot, Citrus, Cherry, ShoppingBag, Search, User } from 'lucide-react';

const categories = [
  { name: 'All Products', icon: Leaf, href: '/' },
  { name: 'Fresh Fruits', icon: Apple, href: '/category/fruits' },
  { name: 'Organic Veggies', icon: Carrot, href: '/category/vegetables' },
  { name: 'Citrus & Berries', icon: Citrus, href: '/category/citrus' },
  { name: 'Exotics', icon: Cherry, href: '/category/exotics' },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0b0f12] text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Fixed Left Sidebar Nav */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-[#0e1418] border-r border-emerald-950/40 hidden md:flex flex-col justify-between p-6 z-30">
        <div className="space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 px-2">
            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 text-emerald-400">
              <Leaf size={22} />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              Fruitery
            </span>
          </Link>

          {/* Categories */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-emerald-500/60 uppercase tracking-widest px-2 mb-3">
              Categories
            </p>
            <nav className="space-y-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/20 transition-all duration-200 group"
                  >
                    <Icon size={18} className="group-hover:scale-110 transition-transform duration-200 text-slate-500 group-hover:text-emerald-400" />
                    {cat.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer Info */}
        <div className="border-t border-slate-800/60 pt-4 px-2 text-xs text-slate-500">
          <p>© 2026 VerveGrocer Premium</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="md:pl-64 flex-1 flex flex-col min-h-screen">
        {/* Top Sticky Header */}
        <header className="sticky top-0 bg-[#0b0f12]/80 backdrop-blur-md border-b border-slate-900/80 z-20 px-6 h-20 flex items-center justify-between">
          {/* Quick Search */}
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search premium harvest... (e.g., Crimson Apple)"
              className="w-full bg-[#12191d] border border-slate-800 rounded-full pl-11 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2.5 bg-[#12191d] border border-slate-800 rounded-xl text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 transition-all relative">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium text-sm px-4 py-2 rounded-xl shadow-lg shadow-emerald-950/40 hover:opacity-95 transition-opacity">
              <User size={16} />
              <span>Account</span>
            </button>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}