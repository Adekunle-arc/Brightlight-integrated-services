import React, { useState, useEffect } from 'react';
import { Bug, ShieldCheck, Home, Building2, Clock, CheckCircle2, Phone, AlertTriangle, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ASSETS } from '../data/assets';
import { DataService } from '../services/dataService';

interface PestControlCampaignProps {
  onScheduleFumigation: () => void;
}

export const PestControlCampaign: React.FC<PestControlCampaignProps> = ({ onScheduleFumigation }) => {
  const [campaignImage, setCampaignImage] = useState<string>(() => {
    const found = DataService.getPhotos().find((p) => p.id === 'gal-thermal-fogging');
    return found?.image || DataService.getSiteSettings().serviceFumigationImage || ASSETS.outdoorThermalFogging;
  });

  useEffect(() => {
    const sync = () => {
      const found = DataService.getPhotos().find((p) => p.id === 'gal-thermal-fogging');
      setCampaignImage(found?.image || DataService.getSiteSettings().serviceFumigationImage || ASSETS.outdoorThermalFogging);
    };
    sync();
    const unsub = DataService.onPhotosChange(sync);
    return unsub;
  }, []);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 overflow-hidden relative">
      {/* Top Banner Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded uppercase tracking-wider inline-block mb-2">
            Seasonal Vector Notice · Environmental Hygiene
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
            Never Allow Pest Take Over Your Homes Today!
          </h3>
          <p className="text-sm font-semibold text-amber-800 mt-1">
            &ldquo;{COMPANY_INFO.slogan}&rdquo;
          </p>
        </div>

        <button
          onClick={onScheduleFumigation}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <span>Schedule Pest Inspection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Target Pests Spectrum (Replicating photo_2026-09-24_21-53-00.jpg) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span>Target Pests, Rodents &amp; Dangerous Reptiles Eradicated</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono">Periodic Barrier Defense</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {COMPANY_INFO.targetPests.map((pest, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1 hover:border-red-400 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
                <Bug className="w-3.5 h-3.5" />
              </div>
              <h5 className="text-xs font-bold text-slate-900 leading-tight">
                {pest.name}
              </h5>
              <p className="text-[10px] text-slate-500 line-clamp-2">
                {pest.risk}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Real Field Fogging Photo + 4 Pillars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
        {/* Real Field Photo */}
        <div className="lg:col-span-5">
          <div className="relative rounded-xl overflow-hidden aspect-16/10 bg-slate-900 border border-slate-200 shadow-md">
            <img
              src={campaignImage}
              alt="Outdoor Thermal Fogging along Compound Fence"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-xs text-amber-300 font-mono flex items-center justify-between">
              <span>Industrial Pulse-Jet Fogger</span>
              <span className="text-[10px] bg-slate-950/80 px-2 py-0.5 rounded text-white">Compound Protection</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Professionalism from Official Flyer */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <strong className="text-xs font-bold">Safe &amp; Effective Treatment</strong>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tested low-toxicity formulations that eradicate pests while safeguarding people, children, and pets.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-slate-900">
              <Home className="w-4 h-4 text-emerald-600 shrink-0" />
              <strong className="text-xs font-bold">Residential &amp; Commercial</strong>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tailored protocols for residential estates, educational institutions, hotels, and industrial storage.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <strong className="text-xs font-bold">Experienced &amp; Trained Experts</strong>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Licensed operators under the Pest Control Association of Nigeria. Adhering to strict HSE protocols.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-slate-900">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <strong className="text-xs font-bold">Periodic Lasting Services</strong>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scheduled preventative maintenance keeping pests, termites, and dangerous reptiles far from your premises.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Hotlines Strip matching flyer */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-900">Hotlines:</span>
          {COMPANY_INFO.phones.map((phone, i) => (
            <a
              key={i}
              href={`tel:${phone}`}
              className="font-mono font-semibold text-slate-800 hover:text-amber-700 transition-colors bg-slate-100 px-2 py-0.5 rounded"
            >
              {phone}
            </a>
          ))}
        </div>

        <span className="text-slate-500 font-mono text-[11px]">
          Head Office: {COMPANY_INFO.headquarters}
        </span>
      </div>
    </div>
  );
};

