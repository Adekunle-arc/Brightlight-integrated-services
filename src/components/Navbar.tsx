import React, { useState } from 'react';
import { OfficialLogo } from './OfficialLogo';
import { Phone, Menu, X, MessageSquare, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  openQuoteModal: (serviceId?: string) => void;
  openAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  openQuoteModal,
  openAdminModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'training', label: 'Training Hub' },
    { id: 'rentals', label: 'Rentals' },
    { id: 'clients', label: 'Partners' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm cursor-pointer min-w-0"
        >
          <OfficialLogo size="md" showRc={false} />
        </button>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-semibold tracking-tight transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-amber-700 border-b-2 border-amber-600'
                    : 'text-slate-600 hover:text-slate-900 border-b-2 border-transparent'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Primary Action Button: "Make Enquiry" */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => openQuoteModal()}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 transition-colors rounded-lg tracking-wide uppercase cursor-pointer shadow-xs whitespace-nowrap"
          >
            <span>Make Enquiry</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-2.5 text-base font-semibold rounded-md transition-colors ${
                  isActive
                    ? 'bg-amber-50 text-amber-800'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <a
                href={`tel:${COMPANY_INFO.phones[0]}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="font-mono">{COMPANY_INFO.phones[0]}</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Bright%20Light%20Services`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full py-3 text-center text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Make Enquiry</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
