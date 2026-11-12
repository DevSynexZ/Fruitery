"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FruitBasketGame from "@/components/3DComponents/FruitBasketGame";

export default function GamePage() {
  return (
    <div className="min-h-screen w-full bg-[#F9F8F6] text-zinc-900 px-6 py-10 font-sans">
      <div className="max-w-5xl mx-auto mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
      <FruitBasketGame />
    </div>
  );
}