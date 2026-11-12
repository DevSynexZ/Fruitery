import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto space-y-6">
      <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 text-emerald-400 shadow-xl">
        <ShoppingBag size={32} />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-amber-400 text-xs font-mono">
          <Sparkles size={12} /> Feature in Development
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Checkout Layer Coming Soon
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          We are currently polishing our secure cold-chain checkout and payment gateway integrations. Check back shortly!
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20"
        >
          <ArrowLeft size={16} /> Return to Shop Catalog
        </Link>
      </div>
    </div>
  );
}