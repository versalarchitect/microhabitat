import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { OrganizationJsonLd } from '@/components/JsonLd';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com'),
  title: {
    default: 'Microhabitat | Urban Farming Network',
    template: '%s | Microhabitat',
  },
  description: "The world's largest urban farming network. Transform underutilized urban spaces into thriving urban farms.",
  keywords: ['urban farming', 'urban agriculture', 'rooftop farming', 'sustainable agriculture', 'green buildings', 'ESG', 'corporate sustainability'],
  authors: [{ name: 'Microhabitat' }],
  creator: 'Microhabitat',
  publisher: 'Microhabitat',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://www.microhabitat.com',
    siteName: 'Microhabitat',
    title: 'Microhabitat | Urban Farming Network',
    description: "The world's largest urban farming network. Transform underutilized urban spaces into thriving urban farms.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Microhabitat - Urban Farming Network',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microhabitat | Urban Farming Network',
    description: "The world's largest urban farming network.",
    site: '@microhabitat',
    creator: '@microhabitat',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#4a7c59',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://images.squarespace-cdn.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for CMS and external services */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {process.env.STRAPI_URL && (
          <link rel="dns-prefetch" href={process.env.STRAPI_URL} />
        )}
        <OrganizationJsonLd />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
