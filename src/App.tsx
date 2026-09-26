/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AdminPortalModal } from './components/AdminPortalModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { TrainingPage } from './pages/TrainingPage';
import { RentalsPage } from './pages/RentalsPage';
import { ClientsPage } from './pages/ClientsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

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
      case 'admin':
        return (
          <AdminPage
            setCurrentPage={setCurrentPage}
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
