import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Frutery - Premium Fresh Harvest',
  description: 'Glamorous fruit and vegetable shopping experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0b0f12] text-slate-100 min-h-screen selection:bg-emerald-500/30">
        {children}
      </body>
    </html>
  );
}