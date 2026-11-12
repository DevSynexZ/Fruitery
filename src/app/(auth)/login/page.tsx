import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
        <h1 className="text-2xl font-black text-center text-amber-300">Login</h1>
        <p className="text-sm text-slate-400 text-center">Authentication coming soon.</p>
        <div className="text-center pt-4">
          <Link href="/" className="text-xs font-semibold text-emerald-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}