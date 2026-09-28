import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PrizePool from './components/PrizePool';
import RulesSection from './components/RulesSection';
import GallerySection from './components/GallerySection';
import RegistrationSection from './components/RegistrationSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const checkIsAdmin = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/admin' || path === '/admin/' || hash === '#admin';
  };

  const [isAdminView, setIsAdminView] = useState(checkIsAdmin);

  useEffect(() => {
    const handleUrlChange = () => {
      const isNowAdmin = checkIsAdmin();
      setIsAdminView(isNowAdmin);
      if (!isNowAdmin && !window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const handleBackToHome = () => {
    if (window.location.pathname.toLowerCase().startsWith('/admin')) {
      window.history.pushState({}, '', '/');
    }
    window.location.hash = '';
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isAdminView) {
    return <AdminDashboard onBackToHome={handleBackToHome} />;
  }

  return (
    <>
      {/* HEADER & TOPBAR */}
      <Header />

      <main>
        {/* HERO SECTION WITH EMBEDDED REGISTRATION */}
        <Hero />

        {/* PRIZES & TOURNAMENT MASTER SECTION */}
        <PrizePool />

        {/* RULES */}
        <RulesSection />

        {/* GALLERY */}
        <GallerySection />

        {/* REGISTRATION CTA BANNER */}
        <RegistrationSection />

        {/* FOOTER */}
        <Footer />
      </main>
    </>
  );
}

