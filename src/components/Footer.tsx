import React from 'react';
import { OfficialLogo } from './OfficialLogo';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, MapPin, ShieldCheck, Lock } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  openQuoteModal: (serviceId?: string) => void;
  openAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
  openQuoteModal,
  openAdminModal
}) => {
  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Upper Corporate Banner */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Community Health Initiative
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Free Monday Health Consultations with Healthy Attitude Club
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              We provide free medical checkups, vital assessments, and preventive consultations every Monday at our community centers.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('contact')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Book Monday Consultation
            </button>
            <button
              onClick={() => openQuoteModal()}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Make Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Identity & Legal */}
          <div className="lg:col-span-2 space-y-4">
            <OfficialLogo variant="dark" size="md" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-3">
              Bright Light Integrated Services is one of Nigeria&apos;s foremost multi-sector service delivery agencies. Established in 2018 with registered corporate entities and international health accreditations.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs text-amber-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Incorporated RC: {COMPANY_INFO.rcNumber}</span>
              </div>
            </div>
          </div>

          {/* Column 2: 4 Core Sectors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Core Departments
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Health & Medical Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Fumigation & Pest Control
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('training')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Professional Healthcare Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('rentals')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Corporate Equipment Rentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Medical Equipment Procurement
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Sub-Agencies & Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Sub-Agencies & Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-300 font-medium">
                Bright Professional Training Consult
                <span className="block text-xs text-slate-500 font-normal">CPD UK Accredited</span>
              </li>
              <li className="text-slate-300 font-medium">
                QRFS Global Resources
                <span className="block text-xs text-slate-500 font-normal">Corporate Rentals & Logistics</span>
              </li>
              <li className="pt-2">
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  About Dr. Okezie Eze Miracle (CEO)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('clients')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Clients & Accreditations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Activity Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Corporate Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.headquarters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px]">
                  <a href={`tel:${COMPANY_INFO.phones[0]}`} className="hover:text-white transition-colors">
                    {COMPANY_INFO.phones[0]}
                  </a>
                  <span>/</span>
                  <a href={`tel:${COMPANY_INFO.phones[1]}`} className="hover:text-white transition-colors">
                    {COMPANY_INFO.phones[1]}
                  </a>
                  <span>/</span>
                  <a href={`tel:${COMPANY_INFO.phones[2]}`} className="hover:text-white transition-colors">
                    {COMPANY_INFO.phones[2]}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.emails[0]}`} className="hover:text-white transition-colors truncate">
                  {COMPANY_INFO.emails[0]}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                <p>Regional Branches: Lagos State &amp; Benue State</p>
                <p>Instagram: @{COMPANY_INFO.socials.instagram} · Facebook: {COMPANY_INFO.socials.facebook}</p>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Bright%20Light%20Services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  WhatsApp: +{COMPANY_INFO.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Corporate Bottom Line - clicking © 2026 Bright Light Integrated Services opens the Admin Portal */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            <button
              type="button"
              onClick={openAdminModal}
              className="hover:text-slate-300 transition-colors cursor-pointer text-left focus:outline-hidden"
              title="Corporate Administration"
            >
              © {new Date().getFullYear()} Bright Light Integrated Services.
            </button>{' '}
            All rights reserved. RC: {COMPANY_INFO.rcNumber}.
          </p>
          <p className="text-slate-600">
            Ogun · Lagos · Benue · Nationwide Operations
          </p>
        </div>
      </div>
    </footer>
  );
};
