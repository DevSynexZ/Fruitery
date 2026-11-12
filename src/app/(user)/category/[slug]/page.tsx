import React from 'react';
import Link from 'next/link';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  await connectDB();

  // Case-insensitive regex match so slug 'vegetables' matches DB 'Vegetables'
  const products = await Product.find({
    category: { $regex: new RegExp(`^${slug}$`, 'i') },
  }).lean();

  const categoryTitle = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black text-white capitalize">
            {categoryTitle} Collection
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Showing handpicked items filtered by {slug}
          </p>
        </div>
        <Link
          href="/shop"
          className="text-xs font-semibold text-emerald-400 hover:underline"
        >
          View All Products →
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center  py-20 bg-[#12191d] rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">
            No products found in this category.
          </p>
          <Link
            href="/shop"
            className="mt-12 inline-block px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs"
          >
            Return to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div
              key={product._id.toString()}
              className="bg-[#12191d] border border-slate-800/80 rounded-2xl overflow-hidden group hover:border-emerald-500/40 transition-all"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white">{product.name}</h3>
                  <span className="text-emerald-400 font-mono text-xs">
                    ${product.price} / {product.unit}
                  </span>
                </div>
                <Link
                  href={`/product/${product._id.toString()}`}
                  className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 rounded-xl text-xs font-bold transition-all"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}