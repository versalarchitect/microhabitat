import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { BookDemoModal } from "./components/BookDemoModal";
import { LocaleProvider, useLocale, getLocalizedSlug } from "./lib/locale-context";
import { slugs } from "./lib/translations/index";

// Pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { OutdoorFarm } from "./pages/OutdoorFarm";
import { IndoorFarm } from "./pages/IndoorFarm";
import { EducationalActivities } from "./pages/EducationalActivities";
import { CommercialRealEstate } from "./pages/CommercialRealEstate";
import { Corporations } from "./pages/Corporations";
import { Schools } from "./pages/Schools";
import { Careers } from "./pages/Careers";
import { Partnerships } from "./pages/Partnerships";
import { CommunityEngagement } from "./pages/CommunityEngagement";
import { Contact } from "./pages/Contact";
import { FAQPage } from "./pages/FAQPage";
import { Blog } from "./pages/Blog";
import { CitiesPage } from "./pages/CitiesPage";
import { CityDetail } from "./pages/CityDetail";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { CookiePolicy } from "./pages/CookiePolicy";

import { getAllContent, queryKeys, type SiteContent } from "./lib/strapi";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 w-full h-20 bg-background border-b border-border animate-pulse" />

      {/* Hero skeleton */}
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-4 w-32 bg-muted rounded mb-6" />
          <div className="h-16 w-3/4 bg-muted rounded mb-4" />
          <div className="h-16 w-1/2 bg-muted rounded mb-8" />
          <div className="h-6 w-2/3 bg-muted rounded mb-10" />
          <div className="flex gap-4">
            <div className="h-12 w-32 bg-muted rounded" />
            <div className="h-12 w-24 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App with Router - uses locale from context
function AppContent() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { locale, t } = useLocale();

  // Fetch all content from Strapi (with fallbacks) - include locale in query key
  const {
    data: content,
    isLoading,
    error,
  } = useQuery<SiteContent>({
    queryKey: queryKeys.allContent(locale),
    queryFn: () => getAllContent(locale),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  const openDemoModal = () => setShowDemoModal(true);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-foreground mb-4">
            {t('error.title')}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t('error.description')}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-outline"
          >
            {t('error.refresh')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />

      {/* Navigation */}
      <Navbar onBookDemo={openDemoModal} />

      {/* Main content */}
      <main>
        <Routes>
          {/* Home - use index for root */}
          <Route
            index
            element={<Home content={content} onBookDemo={openDemoModal} />}
          />

          {/* Company - with localized slug aliases */}
          <Route path={getLocalizedSlug('about', locale)} element={<About onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="about" element={<Navigate to={`/${locale}/${getLocalizedSlug('about', locale)}`} replace />} />}

          <Route path={getLocalizedSlug('cities', locale)} element={<CitiesPage onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="cities" element={<Navigate to={`/${locale}/${getLocalizedSlug('cities', locale)}`} replace />} />}

          <Route path={`${getLocalizedSlug('cities', locale)}/:citySlug`} element={<CityDetail onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="cities/:citySlug" element={<CityDetail onBookDemo={openDemoModal} />} />}

          <Route path={getLocalizedSlug('careers', locale)} element={<Careers onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="careers" element={<Navigate to={`/${locale}/${getLocalizedSlug('careers', locale)}`} replace />} />}

          <Route path={getLocalizedSlug('partnerships', locale)} element={<Partnerships onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="partnerships" element={<Navigate to={`/${locale}/${getLocalizedSlug('partnerships', locale)}`} replace />} />}

          <Route path={getLocalizedSlug('community-engagement', locale)} element={<CommunityEngagement onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="community-engagement" element={<Navigate to={`/${locale}/${getLocalizedSlug('community-engagement', locale)}`} replace />} />}

          {/* Services - with localized slug aliases */}
          <Route path={getLocalizedSlug('outdoor-farm', locale)} element={<OutdoorFarm onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="outdoor-farm" element={<Navigate to={`/${locale}/${getLocalizedSlug('outdoor-farm', locale)}`} replace />} />}

          <Route path={getLocalizedSlug('indoor-farm', locale)} element={<IndoorFarm onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="indoor-farm" element={<Navigate to={`/${locale}/${getLocalizedSlug('indoor-farm', locale)}`} replace />} />}

          <Route path={getLocalizedSlug('educational-activities', locale)} element={<EducationalActivities onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="educational-activities" element={<Navigate to={`/${locale}/${getLocalizedSlug('educational-activities', locale)}`} replace />} />}

          {/* Resources - with localized slug aliases */}
          <Route path={getLocalizedSlug('contact', locale)} element={<Contact onBookDemo={openDemoModal} />} />
          {locale !== 'en' && slugs[locale]['contact'] !== 'contact' && <Route path="contact" element={<Navigate to={`/${locale}/${getLocalizedSlug('contact', locale)}`} replace />} />}

          <Route path={getLocalizedSlug('faq', locale)} element={<FAQPage onBookDemo={openDemoModal} />} />

          <Route path={getLocalizedSlug('blog', locale)} element={<Blog onBookDemo={openDemoModal} />} />
          {locale !== 'en' && slugs[locale]['blog'] !== 'blog' && <Route path="blog" element={<Navigate to={`/${locale}/${getLocalizedSlug('blog', locale)}`} replace />} />}

          {/* Clients - with localized slug aliases */}
          <Route path={getLocalizedSlug('commercial-real-estate', locale)} element={<CommercialRealEstate onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="commercial-real-estate" element={<Navigate to={`/${locale}/${getLocalizedSlug('commercial-real-estate', locale)}`} replace />} />}

          <Route path={getLocalizedSlug('corporations', locale)} element={<Corporations onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="corporations" element={<Navigate to={`/${locale}/${getLocalizedSlug('corporations', locale)}`} replace />} />}

          <Route path={getLocalizedSlug('schools', locale)} element={<Schools onBookDemo={openDemoModal} />} />
          {locale !== 'en' && <Route path="schools" element={<Navigate to={`/${locale}/${getLocalizedSlug('schools', locale)}`} replace />} />}

          {/* Legal - with localized slug aliases */}
          <Route path={getLocalizedSlug('privacy-policy', locale)} element={<PrivacyPolicy />} />
          {locale !== 'en' && <Route path="privacy-policy" element={<Navigate to={`/${locale}/${getLocalizedSlug('privacy-policy', locale)}`} replace />} />}

          <Route path={getLocalizedSlug('terms-of-service', locale)} element={<TermsOfService />} />
          {locale !== 'en' && <Route path="terms-of-service" element={<Navigate to={`/${locale}/${getLocalizedSlug('terms-of-service', locale)}`} replace />} />}

          <Route path={getLocalizedSlug('cookie-policy', locale)} element={<CookiePolicy />} />
          {locale !== 'en' && <Route path="cookie-policy" element={<Navigate to={`/${locale}/${getLocalizedSlug('cookie-policy', locale)}`} replace />} />}

          {/* 404 */}
          <Route
            path="*"
            element={
              <section className="pt-32 pb-20">
                <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
                  <h1 className="heading-display mb-8">{t('404.title')}</h1>
                  <p className="text-muted-foreground mb-8">
                    {t('404.description')}
                  </p>
                  <a href={locale === 'en' ? '/' : `/${locale}`} className="btn-outline">
                    {t('404.goHome')}
                  </a>
                </div>
              </section>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Book Demo Modal */}
      <BookDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
}

// Wrapper component that provides LocaleProvider
function LocalizedApp() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}

// Routes for all supported locales
function AppRoutes() {
  return (
    <Routes>
      {/* English routes (default) */}
      <Route path="/*" element={<LocalizedApp />} />
      {/* French routes */}
      <Route path="/fr/*" element={<LocalizedApp />} />
      {/* German routes */}
      <Route path="/de/*" element={<LocalizedApp />} />
      {/* Dutch routes */}
      <Route path="/nl/*" element={<LocalizedApp />} />
      {/* Italian routes */}
      <Route path="/it/*" element={<LocalizedApp />} />
      {/* Spanish routes */}
      <Route path="/es/*" element={<LocalizedApp />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
