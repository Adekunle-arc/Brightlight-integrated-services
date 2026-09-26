import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ASSETS } from '../data/assets';
import { DataService, SiteSettings } from '../services/dataService';
import {
  ShieldCheck,
  Award,
  Target,
  Compass,
  CheckCircle2,
  Building2,
  Users,
  GraduationCap,
  Truck,
  FileCheck
} from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
  openQuoteModal: (serviceId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setCurrentPage,
  openQuoteModal
}) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => DataService.getSiteSettings());

  useEffect(() => {
    setSiteSettings(DataService.getSiteSettings());
    const unsub = DataService.onPhotosChange(() => {
      setSiteSettings(DataService.getSiteSettings());
    });
    return unsub;
  }, []);

  return (
    <div className="space-y-8 sm:space-y-10 py-6 sm:py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
            Corporate Profile &amp; Governance · RC: {COMPANY_INFO.rcNumber}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
            About Bright Light Integrated Services
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 max-w-3xl leading-relaxed">
            Established in 2018 in Lagos State with corporate branches extending across Ogun State (Current Headquarters), Lagos State, and Benue State, Bright Light Integrated Services is a multi-sector corporate services provider built to transform service delivery standards in Nigeria.
          </p>
        </div>
      </section>

      {/* 2. Corporate Story & Founding History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Transforming Service Delivery Across Nigeria
            </h2>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                Bright Light Integrated Services was founded in 2018 in Lagos State, Nigeria, Alagbado precisely as its founding headquarters. Driven by a top-notch standard of service delivery, the organization rapidly expanded its footprint, establishing its current corporate headquarters at <strong>64 Aseese Road, off Lagos-Ibadan Expressway, Ogun State</strong>, alongside strategic operations in Lagos State and Benue State.
              </p>
              <p>
                The sole desire of Bright Light Integrated Services is to systematically change the approach, delivery, and output in services rendered to clients. In an industry too often plagued by inconsistent execution, unskilled labor, and unsatisfactory delivery, BRILIS was established to provide a strategic, accountable alternative.
              </p>
              <p>
                Through a disciplined approach in training, innovation, corporate restructuring, and the integration of client feedback, BRILIS has established a loyal and rapidly expanding institutional client base across healthcare, education, religious organizations, and private enterprise.
              </p>
            </div>

            {/* Geographical Presence */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block mb-1">Ogun State</span>
                <span className="text-amber-800 font-semibold block">Current Headquarters</span>
                <span className="text-slate-500 text-[11px] mt-1 block">64 Aseese Road, Lagos-Ibadan Expressway</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block mb-1">Lagos State</span>
                <span className="text-slate-700 font-semibold block">Founding Headquarters</span>
                <span className="text-slate-500 text-[11px] mt-1 block">Alagbado &amp; Greater Lagos Hub</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block mb-1">Benue State</span>
                <span className="text-slate-700 font-semibold block">Regional Operations</span>
                <span className="text-slate-500 text-[11px] mt-1 block">North-Central Healthcare &amp; Training</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src={ASSETS.heroBuilding}
                alt="Bright Light Corporate Base"
                className="w-full h-52 sm:h-72 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-slate-900 text-white rounded-lg text-xs space-y-1">
              <p className="font-bold text-amber-400">Incorporation Status</p>
              <p className="text-slate-300">Registered Corporate Entity · RC: {COMPANY_INFO.rcNumber}</p>
              <p className="text-slate-400">SMEDAN Registered Enterprise · Licensed by PCAN &amp; Health Authorities</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Statements */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-xl space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Our Mission Statement
              </h3>
              <blockquote className="text-base text-slate-300 leading-relaxed italic border-l-2 border-amber-500 pl-4">
                &ldquo;{COMPANY_INFO.mission}&rdquo;
              </blockquote>
            </div>

            {/* Vision */}
            <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-xl space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Our Vision Statement
              </h3>
              <blockquote className="text-base text-slate-300 leading-relaxed italic border-l-2 border-amber-500 pl-4">
                &ldquo;{COMPANY_INFO.vision}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values: SHIP-TEQ Full Exposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
            Corporate Integrity &amp; Culture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The SHIP-TEQ Value System
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every member of our staff, from executive consultants to field technicians, operates strictly under the SHIP-TEQ institutional guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_INFO.coreValues.map((v) => (
            <div key={v.letter} className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 font-mono font-extrabold text-lg flex items-center justify-center border border-amber-300">
                  {v.letter}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {v.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Executive Leadership Profile: Dr. Okezie Eze Miracle */}
      <section className="bg-slate-50 border-y border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Visual Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="max-w-xs sm:max-w-sm mx-auto lg:max-w-none rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-slate-900">
                <img
                  src={siteSettings.ceoPhoto || ASSETS.medicalDoctors}
                  alt={siteSettings.ceoName || 'Dr. Okezie Eze Miracle (PhD, ACLS, CFA)'}
                  className="w-full h-56 sm:h-80 object-contain sm:object-cover object-top bg-slate-900"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 border-t border-slate-200 bg-white">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{siteSettings.ceoName || COMPANY_INFO.ceo.name}</h3>
                  <span className="text-xs font-mono font-bold text-amber-700">{COMPANY_INFO.ceo.qualifications}</span>
                  <p className="text-xs text-slate-500 mt-0.5">{siteSettings.ceoTitle || COMPANY_INFO.ceo.title}</p>
                </div>
              </div>

              {/* Memberships Box */}
              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-600" />
                  <span>Professional Body Memberships</span>
                </h4>
                <ul className="text-xs text-slate-700 space-y-2">
                  {COMPANY_INFO.ceo.memberships.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Profile Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Director &amp; Chief Executive Officer
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Dr. Okezie Eze Miracle (PhD, ACLS, CFA)
                </h2>
              </div>

              <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  {COMPANY_INFO.ceo.bio}
                </p>
                <p>
                  Having worked with various national and international companies as both direct staff and senior consultant, Dr. Okezie observed statistically the prevalence of substandard service delivery across the Nigerian healthcare, environmental safety, and corporate service sectors. He founded Bright Light Integrated Services to set an indisputable benchmark of quality and clinical integrity.
                </p>
                <p>
                  Under his visionary direction, the agency has directly trained over 200 individuals and organizations, organized medical outreaches across multiple Nigerian states, and established international procurement alliances with advanced medical manufacturers in Asia and Europe.
                </p>
              </div>

              {/* Verified Credentials Grid */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Key Professional Credentials &amp; Certifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {COMPANY_INFO.ceo.certifications.map((cert, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-md flex items-start gap-2">
                      <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-slate-800 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-slate-700">
                <strong className="text-amber-950 block mb-1">Community Wellness &amp; Public Health Impact:</strong>
                <span>{COMPANY_INFO.ceo.impact}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sub-Agencies Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
            Specialized Corporate Arms
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Sub-Agencies &amp; Operational Divisions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMPANY_INFO.subAgencies.map((sub, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center">
                  {idx === 0 ? <GraduationCap className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{sub.name}</h3>
                  <span className="text-xs text-amber-700 font-semibold">Division of BRILIS</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {sub.focus}
              </p>
              {sub.accreditations && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                    Accredited By:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sub.accreditations.map((acc, aIdx) => (
                      <span key={aIdx} className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 text-xs">
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Action Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Partner with a Certified Corporate Agency</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Discuss facility fumigation, organizational emergency training, or medical procurement.
            </p>
          </div>
          <button
            onClick={() => openQuoteModal()}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Make Enquiry
          </button>
        </div>
      </section>
    </div>
  );
};
