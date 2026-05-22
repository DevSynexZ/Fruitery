"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';

// Mock high-end harvest items
const DUMMY_PRODUCTS = [
  {
    id: '1',
    name: 'Ruby Crimson Strawberries',
    category: 'Fruits',
    price: 850,
    unit: 'kg',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    tag: 'Organic'
  },
  {
    id: '2',
    name: 'Emerald Crisp Broccoli Chunks',
    category: 'Vegetables',
    price: 320,
    unit: 'kg',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?auto=format&fit=crop&w=600&q=80',
    tag: 'Farm Fresh'
  },
  {
    id: '3',
    name: 'Sun-Ripened Golden Mangoes',
    category: 'Fruits',
    price: 450,
    unit: 'kg',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    tag: 'Premium'
  },
  {
    id: '4',
    name: 'Vibrant Hass Avocados',
    category: 'Fruits',
    price: 1200,
    unit: 'kg',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    tag: 'Imported'
  }
];

export default function HomePage() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      {/* Glamorous Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#121c1a] to-[#0d1317] border border-emerald-950/40 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-black/40">
        <div className="space-y-6 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% Handpicked Luxury Produce
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white">
            Sustainably Grown, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Impeccably Delivered
            </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Experience agriculture refined. Elevate your culinary journey with pristine, crisp vegetables and lush organic fruits sourced directly from selective boutique farms.
          </p>
          <div className="pt-2">
            <button className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/10 transition-all duration-300">
              <span>Explore Boutique Harvest</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Hero Decorative Side Card */}
        <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-800/60 hidden md:block">
          <Image 
            src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80"
            alt="Premium Groceries Banner"
            fill
            className="object-cover brightness-90 hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/5 border border-white/10 p-3.5 rounded-xl">
            <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Deal of the Day</p>
            <p className="text-sm font-semibold text-white">Up to 20% off Fresh Artisan Greens</p>
          </div>
        </div>
      </section>

      {/* Curated Grid Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">The Daily Seasonal Showcase</h2>
            <p className="text-sm text-slate-500">Grown naturally, selected intentionally, packaged beautifully.</p>
          </div>
        </div>

        {/* Product Showcase Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DUMMY_PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              className="relative rounded-2xl bg-[#0f1519] border border-slate-800/80 hover:border-emerald-500/30 overflow-hidden flex flex-col group transition-all duration-300 shadow-lg hover:shadow-emerald-950/10"
              onMouseEnter={() => setHoveredIndex(product.id)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -5 }}
            >
              {/* Product Thumbnail Image */}
              <Link href={`/product/${product.id}`} className="relative aspect-square w-full bg-slate-900 overflow-hidden block">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                
                {/* Micro Metadata Badge */}
                <span className="absolute top-3 left-3 bg-[#0b0f12]/80 backdrop-blur-md border border-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-md tracking-wider uppercase">
                  {product.tag}
                </span>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] text-amber-400 font-medium">
                  <Star size={11} fill="currentColor" />
                  {product.rating}
                </div>
              </Link>

              {/* Product Specifications Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs font-semibold text-emerald-500/80 uppercase tracking-wider mb-1">{product.category}</p>
                  <Link href={`/product/${product.id}`} className="font-semibold text-slate-100 hover:text-emerald-400 text-sm md:text-base tracking-tight line-clamp-1 transition-colors">
                    {product.name}
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                  <div>
                    <span className="text-xs text-slate-500 block">Price / {product.unit}</span>
                    <span className="text-lg font-black text-white">৳{product.price}</span>
                  </div>

                  <button className="bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 hover:border-transparent text-emerald-400 hover:text-slate-950 p-2.5 rounded-xl transition-all duration-300 group/btn">
                    <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}