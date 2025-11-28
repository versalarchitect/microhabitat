import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { BookDemoModal } from "./components/BookDemoModal";

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
        <div className="max-w-6xl mx-auto">
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

// Privacy Policy Page
function PrivacyPolicy() {
  return (
    <section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <p className="label mb-6">Legal</p>
        <h1 className="heading-display mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-muted-foreground">
          <p>
            This privacy policy explains how MicroHabitat collects, uses, and
            protects your personal information when you visit our website or use
            our services.
          </p>
          <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
            Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email address,
            phone number, and company name when you fill out a contact form, sign
            up for our newsletter, or book a demo.
          </p>
          <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p>
            We use the information we collect to provide our services, communicate
            with you, improve our website, and send you marketing communications
            (with your consent).
          </p>
          <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
            Contact Us
          </h2>
          <p>
            If you have any questions about this privacy policy, please contact us
            at info@microhabitat.com.
          </p>
        </div>
      </div>
    </section>
  );
}

// Main App with Router
function AppContent() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Fetch all content from Strapi (with fallbacks)
  const {
    data: content,
    isLoading,
    error,
  } = useQuery<SiteContent>({
    queryKey: queryKeys.allContent,
    queryFn: getAllContent,
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
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">
            Unable to load content. Please refresh the page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-outline"
          >
            Refresh
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
          {/* Home */}
          <Route
            path="/"
            element={<Home content={content} onBookDemo={openDemoModal} />}
          />

          {/* Company */}
          <Route
            path="/about"
            element={<About onBookDemo={openDemoModal} />}
          />
          <Route path="/cities" element={<CitiesPage onBookDemo={openDemoModal} />} />
          <Route
            path="/cities/:citySlug"
            element={<CityDetail onBookDemo={openDemoModal} />}
          />
          <Route
            path="/careers"
            element={<Careers onBookDemo={openDemoModal} />}
          />
          <Route
            path="/partnerships"
            element={<Partnerships onBookDemo={openDemoModal} />}
          />
          <Route
            path="/community-engagement"
            element={<CommunityEngagement onBookDemo={openDemoModal} />}
          />

          {/* Services */}
          <Route
            path="/outdoor-farm"
            element={<OutdoorFarm onBookDemo={openDemoModal} />}
          />
          <Route
            path="/indoor-farm"
            element={<IndoorFarm onBookDemo={openDemoModal} />}
          />
          <Route
            path="/educational-activities"
            element={<EducationalActivities onBookDemo={openDemoModal} />}
          />

          {/* Resources */}
          <Route
            path="/contact"
            element={<Contact onBookDemo={openDemoModal} />}
          />
          <Route path="/faq" element={<FAQPage onBookDemo={openDemoModal} />} />
          <Route path="/blog" element={<Blog onBookDemo={openDemoModal} />} />

          {/* Clients */}
          <Route
            path="/commercial-real-estate"
            element={<CommercialRealEstate onBookDemo={openDemoModal} />}
          />
          <Route
            path="/corporations"
            element={<Corporations onBookDemo={openDemoModal} />}
          />
          <Route
            path="/schools"
            element={<Schools onBookDemo={openDemoModal} />}
          />

          {/* Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <section className="pt-32 pb-20">
                <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
                  <h1 className="heading-display mb-8">Page Not Found</h1>
                  <p className="text-muted-foreground mb-8">
                    Sorry, the page you're looking for doesn't exist.
                  </p>
                  <a href="/" className="btn-outline">
                    Go Home
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

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
