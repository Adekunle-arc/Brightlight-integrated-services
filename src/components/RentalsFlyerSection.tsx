import React, { useState, useEffect } from 'react';
import { Tv, Mic2, Users, Calendar, Phone, MapPin, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ASSETS } from '../data/assets';
import { DataService, SiteSettings } from '../services/dataService';

interface RentalsFlyerSectionProps {
  onOpenBooking: () => void;
}

export const RentalsFlyerSection: React.FC<RentalsFlyerSectionProps> = ({ onOpenBooking }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => DataService.getSiteSettings());

  useEffect(() => {
    setSiteSettings(DataService.getSiteSettings());
    const unsub = DataService.onPhotosChange(() => {
      setSiteSettings(DataService.getSiteSettings());
    });
    return unsub;
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden relative">
      <div className="relative z-10 space-y-8">
        {/* Header Lockup matching official flyer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
              <span>{COMPANY_INFO.tagline}</span>
              <span>·</span>
              <span>RC: {COMPANY_INFO.rcNumber}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Audio-Visual Equipment &amp; Training Facilitation Packages
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Bright%20Light%20Services,%20I%20want%20to%20inquire%20about%20Projector%20and%20PA%20System%20Rentals`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>

        {/* Feature Layout: Gear Image + 3 Highlight Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Real Equipment Image Matching Flyer */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-slate-900 aspect-16/10">
              <img
                src={siteSettings.serviceRentalsImage || ASSETS.projectorPaRentalGear}
                alt="Epson Projector, Large Screen, and PA System Fleet"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-xs text-amber-300 font-mono flex items-center justify-between">
                <span>Epson Optics · UHF Wireless Mics</span>
                <span className="text-[10px] bg-slate-950/80 px-2 py-0.5 rounded text-white">QRFS Logistics</span>
              </div>
            </div>
          </div>

          {/* Core Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Block 1: Projector & Screen */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center">
                <Tv className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">
                Rentals of Projector &amp; Large Screen
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Epson high-lumen digital projectors paired with portable, wide tripod screens for seminars, board meetings, and conferences.
              </p>
            </div>

            {/* Block 2: Public Address System */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-sky-400/20 text-sky-400 border border-sky-400/40 flex items-center justify-center">
                <Mic2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">
                Public Address System for Trainings
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dual wireless UHF handheld microphones, feedback-suppressed multi-channel audio mixers, and powerful portable speakers.
              </p>
            </div>

            {/* Block 3: Training Facilitation */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-400/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">
                We Also Facilitate Trainings
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fully air-conditioned corporate training halls with ergonomic chairs, uninterrupted power, and accredited UK CPD instructors.
              </p>
            </div>
          </div>
        </div>

        {/* Location & Direct Action */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-start gap-2 max-w-xl">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Logistics Depot:</strong> {COMPANY_INFO.headquarters}
            </span>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md shrink-0"
          >
            <span>Book Equipment Package</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

