/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { COMPANY_INFO } from './data/companyData';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { TrainingPage } from './pages/TrainingPage';
import { RentalsPage } from './pages/RentalsPage';
import { ClientsPage } from './pages/ClientsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteInitialServiceId, setQuoteInitialServiceId] = useState<string | undefined>(undefined);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleOpenQuoteModal = (serviceId?: string) => {
    setQuoteInitialServiceId(serviceId);
    setIsQuoteModalOpen(true);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            openQuoteModal={handleOpenQuoteModal}
          />
        );
      case 'about':
        return (
          <AboutPage
            setCurrentPage={setCurrentPage}
            openQuoteModal={handleOpenQuoteModal}
          />
        );
      case 'services':
        return (
          <ServicesPage
            openQuoteModal={handleOpenQuoteModal}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'training':
        return (
          <TrainingPage
            openQuoteModal={handleOpenQuoteModal}
          />
        );
      case 'rentals':
        return (
          <RentalsPage
            openQuoteModal={handleOpenQuoteModal}
          />
        );
      case 'clients':
        return (
          <ClientsPage
            openQuoteModal={handleOpenQuoteModal}
          />
        );
      case 'gallery':
        return (
          <GalleryPage
            openQuoteModal={handleOpenQuoteModal}
            openAdminModal={() => setIsAdminModalOpen(true)}
          />
        );
      case 'contact':
        return (
          <ContactPage
            openQuoteModal={handleOpenQuoteModal}
          />
        );
      default:
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            openQuoteModal={handleOpenQuoteModal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openQuoteModal={handleOpenQuoteModal}
        openAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        openQuoteModal={handleOpenQuoteModal}
        openAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Floating WhatsApp Quick-Chat Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hello Bright Light Integrated Services, I would like to make an enquiry.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-3.5 py-3 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all group border border-emerald-400/30"
      >
        <MessageCircle className="w-5 h-5 sm:w-5 sm:h-5 fill-white/15 shrink-0" />
        <span className="text-xs font-bold tracking-wide pr-0.5">
          Chat on WhatsApp
        </span>
      </a>

      {/* Service Enquiry / Requisition Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialServiceId={quoteInitialServiceId}
      />

      {/* Admin Dashboard / Photo & Enquiry Manager Modal */}
      <AdminPortalModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}
