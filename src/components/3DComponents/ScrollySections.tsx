"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollySectionsProps {
  setScrollProgress: (progress: number) => void;
}

export default function ScrollySections({
  setScrollProgress,
}: ScrollySectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Global scroll progress listener for the 3D Canvas
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self: ScrollTrigger) => {
          setScrollProgress(self.progress);
        },
      });

      // Section Content Fades
      const sections = gsap.utils.toArray<HTMLElement>(".scrolly-section");
      sections.forEach((section) => {
        const content = section.querySelector(".content-box");
        if (!content) return;

        gsap.fromTo(
          content,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "bottom 25%",
              scrub: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [setScrollProgress]);

  return (
    <div ref={containerRef} className="scrolly-container relative z-20">
      {/* SECTION 1: Hero */}
      <section className="scrolly-section h-screen flex items-center px-8 md:px-20">
        <div className="content-box max-w-lg space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
            Season Spotlight: Alphonso
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-none">
            TASTE THE <span className="text-amber-400">SUN.</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Tree-ripened organic sweetness delivered fresh. Built for true fruit
            connoisseurs who demand elite quality.
          </p>
        </div>
      </section>

      {/* SECTION 2: Purity & Grading */}
      {/* <section className="scrolly-section h-screen flex items-center justify-end px-8 md:px-20">
        <div className="content-box max-w-lg space-y-4 text-right">
          <span className="px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono">
            3D Ripeness Lab
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            PURE ORCHARD <span className="text-orange-400">SELECTION.</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Learn how to inspect stem cavities, skin pores, and natural sugar webs through our interactive 3D grading tools.
          </p>
        </div>
      </section> */}

      <section className="scrolly-section h-screen flex items-center justify-end px-8 md:px-20 max-w-7xl mx-auto">
        <div className="content-box max-w-lg space-y-4 text-right">
          <span className="px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono">
            3D Ripeness Lab
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            PURE ORCHARD <span className="text-orange-400">SELECTION.</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Learn how to inspect stem cavities, skin pores, and natural sugar
            webs through our interactive 3D grading tools.
          </p>
        </div>
      </section>

      {/* SECTION 3: Call to Action */}
      <section className="scrolly-section h-screen flex items-center px-8 md:px-20">
        <div className="content-box max-w-lg space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
            Ready to Taste?
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            GET FRESH <span className="text-amber-400">TODAY.</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Order your first harvest box or test your inspection skills in our
            gamified challenge.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/shop"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl text-sm transition-all shadow-lg shadow-amber-500/20"
            >
              Shop Catalog 🛒
            </Link>
            <Link
              href="/game"
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl border border-slate-800 text-sm transition-all"
            >
              Play Ripeness Game 🎮
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
