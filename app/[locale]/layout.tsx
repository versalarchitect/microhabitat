import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, type Locale, ogLocales } from '@/lib/i18n';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatWidgetLoader } from '@/components/chat/ChatWidgetLoader';

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
    openGraph: {
      locale: ogLocales[locale as Locale] || 'en_CA',
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
      <Navbar locale={locale as Locale} />
      <main>{children}</main>
      <Footer locale={locale as Locale} />
      <ChatWidgetLoader />
    </div>
  );
}
