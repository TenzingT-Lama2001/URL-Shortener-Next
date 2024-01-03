'use client';

import { Poppins } from 'next/font/google';


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function ShortCodeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.className} flex flex-col min-h-screen `}>
      {children}
    </div>
  );
}
