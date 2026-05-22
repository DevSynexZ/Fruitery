"use client"
import React from 'react';
import Link from 'next/link';
import { Leaf, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function WelcomeLandingPage() {
  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center px-6 py-8">
      
      {/* Background Ambience & Unsplash Visual Sample Layer */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[120px]" />
        <img 
          src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1920&q=80" 
          alt="Premium Harvest" 
          className="w-full h-full object-cover opacity-[0.08] scale-105"
        />
      </div>

      {/* Top Header Layout Navbar */}
      <header className="w-full max-w-7xl flex justify-between items-center py-4 border-b border-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Leaf size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
            Frutery
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-500 bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800">
            Auth Layer (Coming Soon)
          </span>
        </div>
      </header>

      {/* Central Interactive Presentation Asset Hub */}
      <main className="w-full max-w-4xl text-center my-auto space-y-8 relative py-12">
        
        {/* Transparent Placeholder Frame - Drop your file into /public/hero-transparent.png */}
        <div className="mx-auto w-72 h-72 md:w-80 md:h-80 relative flex items-center justify-center bg-gradient-to-b from-emerald-500/5 to-transparent rounded-full border border-emerald-500/10 p-4 group">
          <div className="absolute inset-0 bg-emerald-400/5 rounded-full animate-pulse blur-md" />
          
          <img 
            src="/hero-transparent.png" 
            onError={(e) => {
              // Graceful fallback to Unsplash sample if your public PNG asset isn't dropped in yet
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
              (e.target as HTMLImageElement).style.opacity = "0.3";
            }}
            alt="Frutery Harvest Presentation" 
            className="w-[85%] h-[85%] object-contain transition-all duration-700 group-hover:scale-105 mix-blend-lighten"
          />
          
          <div className="absolute bottom-2 bg-slate-950/90 border border-slate-800 text-[10px] text-emerald-400 font-mono px-3 py-1 rounded-md shadow-md">
            /public/hero-transparent.png
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-400 tracking-wide">
            <Sparkles size={12} className="text-emerald-400" />
            Bespoke Agricultural Marketplace
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Sustainably Cultivated, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
              Impeccably Sourced
            </span>
          </h1>
          
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Step into a digital orchard curated for elite culinary palettes. Crisp organic greens, handpicked heritage fruits, and premium garden treasures delivered fresh hourly.
          </p>
        </div>

        {/* Portal Entry Trigger Point */}
        <div className="pt-4">
          <Link 
            href="/shop" 
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black px-8 py-4 rounded-2xl text-base shadow-xl shadow-emerald-950/60 transition-all duration-300 active:scale-95"
          >
            <span>Start Premium Shopping</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>

      {/* Footer System Meta Data Tags */}
      <footer className="w-full max-w-7xl border-t border-slate-900/60 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left text-xs text-slate-500">
        <p className="flex items-center justify-center sm:justify-start gap-2"><ShieldCheck size={14} className="text-emerald-500" /> 100% Organically Certified Farms</p>
        <p className="flex items-center justify-center gap-2"><Truck size={14} className="text-emerald-500" /> Cold-Chain Express Shipping</p>
        <p className="text-center sm:text-right">© 2026 Frutery Premium Ecosystem</p>
      </footer>
    </div>
  );
}