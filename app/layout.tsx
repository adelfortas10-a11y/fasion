import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import GlowCursor from '@/components/GlowCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NOVA — Future Wear',
  description:
    'Cinematic scroll-driven experience for NOVA, a futuristic fashion brand. Explore the 360° product, craftsmanship, and lookbook.',
  openGraph: {
    title: 'NOVA — Future Wear',
    description: 'Where technology meets thread.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans bg-void-500 text-foreground antialiased">
        <SmoothScroll />
        <GlowCursor />
        {children}
      </body>
    </html>
  );
}
