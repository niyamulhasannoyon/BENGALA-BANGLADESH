import type { Metadata, Viewport } from 'next';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/ToastProvider';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BENGALA • Ultra-Luxury Bangladesh Expeditions',
  description:
    'Experience the untouched wilderness of Bangladesh in cinematic luxury. Private river yachts through the Sundarbans, sky villas above Sajek clouds, and pristine coral atolls.',
  keywords: [
    'Bangladesh luxury travel',
    'Sundarbans private yacht',
    'Sajek Valley luxury retreat',
    'Saint Martin coral island',
    'Sreemangal tea estate',
    'Bespoke travel Bangladesh',
  ],
  authors: [{ name: 'Bengala Expeditions' }],
  openGraph: {
    title: 'BENGALA • BANGLADESH Luxury Showcase',
    description: 'Cinematic, ultra-luxury journeys through the ancient deltas, cloud valleys, and marine shores of Bengal.',
    siteName: 'BENGALA',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#050A07',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${syne.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-bengal-950 text-neutral-100 min-h-screen selection:bg-emerald-500/30 selection:text-white antialiased overflow-x-hidden">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
