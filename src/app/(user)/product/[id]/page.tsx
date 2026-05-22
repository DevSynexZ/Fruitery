"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ShoppingBag, MessageCircle, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

// Reusing same mock data representation for the demo layer
const MOCK_CATALOG: Record<string, any> = {
  '1': { name: 'Ruby Crimson Strawberries', category: 'Fruits', price: 850, unit: 'kg', rating: 4.9, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80', description: 'Grown on boutique hillside dynamic fields, these strawberries boast unmatched succulence and sharp profiles perfect for fine tables.' },
  '2': { name: 'Emerald Crisp Broccoli Chunks', category: 'Vegetables', price: 320, unit: 'kg', rating: 4.8, image: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?auto=format&fit=crop&w=600&q=80', description: 'Crisp hand-cut organic crowns packed with deep iron profiles. Harvested at first light and cooled instantly to preserve freshness.' },
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  
  const product = MOCK_CATALOG[id as string] || MOCK_CATALOG['1'];

  const totalPrice = product.price * quantity;

  // Automated Whatsapp Checkout Integration Payload Trigger
  const triggerWhatsAppOrder = () => {
    const phoneNumber = "8801XXXXXXXXX"; // Replace with your client's active company business line
    const textMessage = `Hello VerveGrocer! I would like to place an order:\n\n` +
                        `• *Product:* ${product.name}\n` +
                        `• *Quantity:* ${quantity} ${product.unit}\n` +
                        `• *Total Price:* ৳${totalPrice}\n\n` +
                        `Please process my checkout request and confirm delivery options!`;
    
    const targetUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;
    window.open(targetUrl, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
      {/* Product Image Window */}
      <div className="lg:col-span-6 space-y-4">
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0f1519] border border-slate-800/80 shadow-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Meta Specifications Control Interface */}
      <div className="lg:col-span-6 flex flex-col justify-between py-2 space-y-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">{product.category}</p>
            <h1 className="text-3xl font-black text-white tracking-tight">{product.name}</h1>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star size={14} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
            <span>•</span>
            <span className="text-emerald-500 font-medium">In Stock</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">{product.description}</p>

          <div className="py-4 border-y border-slate-900/80 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Price per {product.unit}</span>
              <span className="text-2xl font-black text-white">৳{product.price}</span>
            </div>
            
            {/* Weight / Quantity Control Switcher */}
            <div className="bg-[#12191d] border border-slate-800 p-1.5 rounded-xl flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 bg-[#0b0f12] text-slate-300 hover:text-white rounded-lg flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-slate-100 text-sm">{quantity} {product.unit}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 bg-[#0b0f12] text-slate-300 hover:text-white rounded-lg flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Action Trigger Blocks */}
        <div className="space-y-4">
          <div className="bg-[#12191d] border border-slate-900 p-4 rounded-xl flex justify-between items-center">
            <span className="text-sm text-slate-400 font-medium">Estimated Order Total:</span>
            <span className="text-xl font-black text-emerald-400">৳{totalPrice}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="w-full flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 bg-[#12191d] text-slate-200 font-semibold py-3.5 rounded-xl transition-all">
              <ShoppingBag size={18} />
              <span>Add to Basket</span>
            </button>
            
            {/* Active Whatsapp Order Prompt */}
            <button 
              onClick={triggerWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-950/20 group"
            >
              <MessageCircle size={18} className="fill-slate-950" />
              <span>Order via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Premium Trust Parameters */}
        <div className="grid grid-cols-3 gap-2 pt-4 text-[11px] text-slate-400">
          <div className="flex flex-col items-center gap-1.5 p-3 bg-[#0e1418] rounded-xl border border-slate-900/60 text-center">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>100% Organic certified</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-3 bg-[#0e1418] rounded-xl border border-slate-900/60 text-center">
            <Truck size={16} className="text-emerald-500" />
            <span>Same-day cold shipping</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-3 bg-[#0e1418] rounded-xl border border-slate-900/60 text-center">
            <RefreshCw size={16} className="text-emerald-500" />
            <span>Instant fresh replacements</span>
          </div>
        </div>
      </div>
    </div>
  );
}