import React, { useState } from 'react';
import { COMPANY_INFO, ClientPartner, Accreditation } from '../data/companyData';
import {
  Building2,
  GraduationCap,
  Hotel,
  Trophy,
  Globe2,
  ShieldCheck,
  CheckCircle2,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ClientsPageProps {
  openQuoteModal: (serviceId?: string) => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ openQuoteModal }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    'all',
    'Education',
    'Corporate & Environment',
    'Hospitality & Venue',
    'Sports',
    'International Manufacturing'
  ];

  const filteredClients = filterCategory === 'all'
    ? COMPANY_INFO.clients
    : COMPANY_INFO.clients.filter(c => c.category === filterCategory);

  return (
    <div className="space-y-8 sm:space-y-10 py-6 sm:py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
            Institutional Track Record · RC: {COMPANY_INFO.rcNumber}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
            Clients, Strategic Partners &amp; Accreditations
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-3xl leading-relaxed">
            Our multi-sector reach encompasses leading universities, private and public educational institutions, hospitality centers, environmental enterprises, and world-class international healthcare manufacturers.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Clients & Partners' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Clients Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-amber-500 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {client.category}
                  </span>
                  <span className="text-xs text-slate-400">Verified Client</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {client.name}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>{client.location}</span>
                </p>

                {client.description && (
                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {client.description}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[11px] text-slate-400 font-mono">BRILIS Partner</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Global Manufacturing Alliances (China & Turkey) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              International Healthcare Supply Chain
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Direct Global Procurement Strategic Alliances
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bright Light Integrated Services imports and distributes high-grade hospital facilities, laboratory analyzers, and surgical equipment directly from certified international manufacturing hubs in China and Turkey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold block">CHINA ALLIANCE</span>
              <h4 className="text-base font-bold text-white">Sugama Super Union Group</h4>
              <p className="text-xs text-slate-300">
                Yangzhou City, Jiangsu Province, China. Primary manufacturing supplier for clinical disposables and hospital examination infrastructure.
              </p>
            </div>

            <div className="p-5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold block">CHINA ALLIANCE</span>
              <h4 className="text-base font-bold text-white">Jiangsu Medlead Technology</h4>
              <p className="text-xs text-slate-300">
                Wujin District, Changzhou, Jiangsu, China. Medical electronic instrumentation and diagnostic analyzer technologies.
              </p>
            </div>

            <div className="p-5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold block">TURKEY ALLIANCE</span>
              <h4 className="text-base font-bold text-white">Mespa Global</h4>
              <p className="text-xs text-slate-300">
                Sariyer, Istanbul, Turkey. World-class hospital furniture, ICU beds, stretchers, and clinical pediatric ward equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Accreditations, Affiliations & Memberships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
            Official Regulatory Compliance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Accreditations, Affiliations &amp; Professional Memberships
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Verified institutional registrations and memberships across national and global bodies (Pages 11-12 of Corporate Profile).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPANY_INFO.accreditations.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {item.abbr || 'AFFILIATE'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.region}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.name}
                </h4>
              </div>

              <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-slate-100 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Are You an Institution Seeking Verified Services?</h3>
            <p className="text-xs text-slate-600 mt-1">
              Join universities, private academies, and corporate enterprises who rely on BRILIS for facility safety and training.
            </p>
          </div>
          <button
            onClick={() => openQuoteModal()}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Make Institutional Enquiry
          </button>
        </div>
      </section>
    </div>
  );
};
