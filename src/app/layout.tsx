import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Mobile Chat Agent - AI-Powered Phone Shopping Assistant',
  description: 'Find the perfect mobile phone with our AI-powered shopping assistant. Compare phones, get recommendations, and make informed decisions.',
  keywords: 'mobile phones, smartphone, AI assistant, phone comparison, phone recommendations, shopping assistant',
  authors: [{ name: 'Mobile Chat Agent Team' }],
  openGraph: {
    title: 'Mobile Chat Agent - AI-Powered Phone Shopping Assistant',
    description: 'Find the perfect mobile phone with our AI-powered shopping assistant.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}