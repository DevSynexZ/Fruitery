"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Leaf,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Gamepad2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MangoCanvas from "@/components/3DComponents/MangoCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeLandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[300vh] w-full relative flex flex-col justify-between items-center px-6 py-8 bg-slate-950 text-white selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden"
    >
      {/* Fixed 3D Mango Canvas Background replacing the static image */}
      <MangoCanvas scrollProgress={scrollProgress} />

      {/* Background Ambience Glowing Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
      </div>

      {/* Top Header Layout Navbar */}
      {/* <header className="w-full max-w-7xl flex justify-between items-center py-4 border-b border-slate-900/60 relative z-20">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Leaf size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
            Fruitery
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/game"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 px-4 py-2 rounded-xl shadow-lg transition-all"
          >
            <Gamepad2 size={14} /> 3D Ripeness Game
          </Link>
          <span className="text-xs font-semibold text-slate-500 bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800">
            Auth Layer (Coming Soon)
          </span>
        </div>
      </header> */}

      {/* Top Header Layout Navbar */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 py-4 px-6 rounded-2xl border-emerald-500/30 shadow-2xl relative z-30 my-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="bg-emerald-400 p-2 rounded-xl text-slate-950 font-bold">
            <Leaf size={20} />
          </div>
          <span className="text-xl font-black text-amber-300 tracking-tight">
            Fruitery
          </span>
        </Link>

        {/* Action Buttons with explicit inline styles to guarantee visibility */}
        <div className="flex items-center gap-3">
          <Link
            href="/game"
            style={{ backgroundColor: "#fbbf24", color: "#020617" }}
            className="inline-flex items-center gap-2 text-xs font-black px-4 py-2.5 rounded-xl shadow-lg transition-all hover:opacity-90"
          >
            <Gamepad2 size={15} />
            <span>3D Ripeness Game</span>
          </Link>

          {/* <span className="text-xs font-semibold text-slate-300 bg-slate-950 px-3 py-2 rounded-xl border border-slate-700">
            Auth Soon
          </span> */}
        </div>
      </header>

      {/* Central Interactive Presentation Asset Hub (Hero & Scrolly Sections) */}
      <main className="w-full max-w-4xl text-center my-auto space-y-32 relative py-12 z-20 pointer-events-auto">
        {/* SECTION 1: Welcome & Hero */}
        <section className="min-h-screen flex flex-col justify-center items-center space-y-8">
          <div className="space-y-4">
            {/* <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-400 tracking-wide">
              <Sparkles size={12} className="text-emerald-400" />
              Bespoke Agricultural Marketplace
            </div> */}

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Sustainably Cultivated, <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                Impeccably Sourced
              </span>
            </h1>

            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Step into a digital orchard curated for elite culinary palettes.
              Crisp organic greens, handpicked heritage fruits, and premium
              garden treasures delivered fresh hourly.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black px-8 py-4 rounded-2xl text-base shadow-xl shadow-emerald-950/60 transition-all duration-300 active:scale-95"
            >
              <span>Start Premium Shopping</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </section>

        {/* SECTION 2: 3D Inspection Lab (Moved near footer) */}
        <section className="min-h-screen flex flex-col justify-center items-center space-y-6">
          <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-800 max-w-xl shadow-2xl shadow-emerald-950/30">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Interactive 3D Feature
            </span>
            <h2 className="text-3xl font-black text-white mt-2 mb-3">
              Master the Art of Fruit Selection
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Scroll through our 3D interactive view to inspect natural skin
              textures, sugar spots, and stem freshness before buying.
            </p>
            <Link
              href="/game"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg"
            >
              Play Inspection Sandbox
            </Link>
          </div>
        </section>
      </main>

      {/* Footer System Meta Data Tags */}
      <footer className="w-full max-w-7xl border-t border-slate-900/60 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left text-xs text-slate-500 relative z-20">
        <p className="flex items-center justify-center sm:justify-start gap-2">
          <ShieldCheck size={14} className="text-emerald-500" /> 100%
          Organically Certified Farms
        </p>
        <p className="flex items-center justify-center gap-2">
          <Truck size={14} className="text-emerald-500" /> Cold-Chain Express
          Shipping
        </p>
        <p className="text-center sm:text-right">
          © 2026 Frutery Premium Ecosystem
        </p>
      </footer>
    </div>
  );
}
