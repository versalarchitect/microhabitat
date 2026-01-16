import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { locales, type Locale, ogLocales } from '@/lib/i18n';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatWidgetLoader } from '@/components/chat/ChatWidgetLoader';
import { OrganizationJsonLd } from '@/components/JsonLd';
import { DevDataSourceBadge } from '@/components/DevDataSourceBadge';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
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
      locale: ogLocales[locale as Locale] || 'en_CA',
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
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <OrganizationJsonLd />

      {GTM_ID && (
        <>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          {/* Google Tag Manager */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        </>
      )}

      <Navbar locale={locale as Locale} />
      <main>{children}</main>
      <Footer locale={locale as Locale} />
      <ChatWidgetLoader />
      {process.env.NODE_ENV === 'development' && <DevDataSourceBadge />}
    </div>
  );
}
