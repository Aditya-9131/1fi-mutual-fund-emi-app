import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '1Fi - Smartphones on EMI Backed by Mutual Funds',
  description: 'Buy flagship smartphones with zero down payment on 1Fi EMI plans backed by your mutual funds. Keep your investments growing while you pay easy installments.',
  keywords: ['1Fi', 'Mutual Fund EMI', 'iPhone 17 Pro EMI', 'Samsung S24 Ultra EMI', 'Zero Cost EMI', 'Gadget Loan'],
  authors: [{ name: '1Fi Engineering Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 antialiased selection:bg-purple-200 selection:text-purple-900">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
