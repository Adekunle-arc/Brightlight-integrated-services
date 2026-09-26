import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ASSETS } from '../data/assets';
import { DataService, PhotoItem, SiteSettings } from '../services/dataService';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  openQuoteModal: (serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  openQuoteModal
}) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => DataService.getSiteSettings());

  useEffect(() => {
    setPhotos(DataService.getPhotos());
    setSiteSettings(DataService.getSiteSettings());
    const unsub = DataService.onPhotosChange(() => {
      setPhotos(DataService.getPhotos());
      setSiteSettings(DataService.getSiteSettings());
    });
    return unsub;
  }, []);

  // 4 Core Pillars with editable service photography from Admin Dashboard
  const servicePillars = [
    {
      id: 'medical',
      page: 'services',
      number: '01',
      title: 'Healthcare & Medical Supplies',
      category: 'Clinical Care & Diagnostics',
      desc: 'Doctor-led medical outreach, clinical health consultations, Quantum body analysis, and procurement of genuine hospital equipment from verified global manufacturers.',
      image: siteSettings.serviceMedicalImage || ASSETS.medicalDoctors,
      alt: 'Bright Light medical team conducting patient screening',
      tag: 'Clinical Team',
      serviceId: 'med-consult'
    },
    {
      id: 'fumigation',
      page: 'services',
      number: '02',
      title: 'Fumigation & Pest Control',
      category: 'Environmental Safety',
      desc: 'Certified pest eradication and vector control for corporate facilities, estates, and schools. Targeted treatments for mosquitoes, termites, rodents, and dangerous reptiles.',
      image: siteSettings.serviceFumigationImage || ASSETS.fumigationSpecialist,
      alt: 'Certified pest control specialist in protective gear',
      tag: 'Certified HSE',
      serviceId: 'fum-pest'
    },
    {
      id: 'training',
      page: 'training',
      number: '03',
      title: 'Professional Healthcare Training',
      category: 'CPD (UK) Accredited',
      desc: 'Internationally accredited training in First Aid, CPR, Basic Life Support (BLS), and Healthcare Assistant qualifications for schools, corporations, and individuals.',
      image: siteSettings.serviceTrainingImage || ASSETS.trainingHall,
      alt: 'Healthcare training seminar in session',
      tag: 'CPD UK Approved',
      serviceId: 'trn-firstaid'
    },
    {
      id: 'rentals',
      page: 'rentals',
      number: '04',
      title: 'QRFS Rentals & Merchandise',
      category: 'Corporate Logistics',
      desc: 'Full-service audiovisual event support: high-lumen projectors, dual wireless microphone sound systems, air-conditioned executive halls, and conference logistics.',
      image: siteSettings.serviceRentalsImage || ASSETS.projectorPaRentalGear,
      alt: 'Corporate multimedia projectors and sound equipment',
      tag: 'Audio-Visual Fleet',
      serviceId: 'rnt-projectors'
    }
  ];

  // Dynamic photos for Homepage: prefer featured photos (up to 4), falling back to recent photos
  const featuredList = photos.filter((p) => p.featuredOnHome);
  const sourcePhotos = featuredList.length > 0 ? featuredList : photos;
  const homeDisplayPhotos = sourcePhotos.length > 0
    ? sourcePhotos.slice(0, 4)
    : [
        {
          id: 'def-1',
          title: 'Outdoor Perimeter Thermal Fogging',
          category: 'fumigation' as const,
          image: ASSETS.outdoorThermalFogging,
          description: 'Mosquito & Vector Knockdown',
          location: 'Ogun & Lagos',
          dateTag: 'Vector Control',
          createdAt: ''
        },
        {
          id: 'def-2',
          title: 'Attic & Roof Timber Termite Treatment',
          category: 'fumigation' as const,
          image: ASSETS.roofTermiteTreatment,
          description: 'Structural Preservation',
          location: 'Estate Premises',
          dateTag: 'Timber Care',
          createdAt: ''
        },
        {
          id: 'def-3',
          title: 'Building Foundation Barrier Spray',
          category: 'fumigation' as const,
          image: ASSETS.perimeterFoundationSpray,
          description: 'Subterranean Perimeter Defense',
          location: 'Commercial Building',
          dateTag: 'Barrier Shield',
          createdAt: ''
        },
        {
          id: 'def-4',
          title: 'Precision Window & Runner Misting',
          category: 'fumigation' as const,
          image: ASSETS.windowPrecisionMisting,
          description: 'Zero-Residue Crevice Treatment',
          location: 'Office Complex',
          dateTag: 'Precision Misting',
          createdAt: ''
        }
      ];

  return (
    <div className="bg-slate-50 text-slate-900 space-y-8 md:space-y-10 pb-10">
      {/* 1. Hero Section: Clean, Authoritative, Premium */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Ambient Headquarters Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.heroBuilding}
            alt="Bright Light Integrated Services Corporate Headquarters"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-10 w-full">
          <div className="max-w-3xl space-y-3.5">
            {/* Corporate Registration & Trust Line */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 font-semibold text-amber-400 tracking-wide font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                RC: {COMPANY_INFO.rcNumber}
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>Founded 2018</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>Ogun State HQ</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Excellence Across <br className="hidden sm:block" />
              <span className="text-amber-400">Four Integrated Sectors.</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Nigeria’s trusted corporate provider delivering unified solutions in <strong>Healthcare &amp; Diagnostics</strong>, <strong>Certified Fumigation</strong>, <strong>Accredited Life Support Training</strong>, and <strong>Corporate Equipment Rentals</strong>.
            </p>

            {/* Actions: Clean 2-button hierarchy */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openQuoteModal()}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Make Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('services')}
                className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-white font-medium text-sm rounded-lg border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 4 Pillars Grid (Clean, Card Layout With Authentic Pictures) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-700">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Four Specialized Divisions. One Accountable Partner.
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('services')}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Full Service Matrix</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards with Authentic Operational Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicePillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Pillar Real Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-100">
                <img
                  src={pillar.image}
                  alt={pillar.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-amber-400 font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded">
                  Pillar {pillar.number}
                </div>
                <div className="absolute top-2.5 right-2.5 bg-white/90 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                  {pillar.tag}
                </div>
              </div>

              {/* Pillar Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {pillar.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setCurrentPage(pillar.page)}
                    className="font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openQuoteModal(pillar.serviceId)}
                    className="font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Real Field Operations Showcase (Dynamic photos with instant upload integration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-7 shadow-lg space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
                Operational Evidence
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Field Operations in Action
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Real photos from our ongoing fumigation treatments, pest eradication campaigns, healthcare outreaches, and structural preservation contracts.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('gallery')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View Full Photo Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {homeDisplayPhotos.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700/80 group hover:border-amber-400/50 transition-colors flex flex-col"
              >
                <div className="relative h-36 sm:h-44 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-950/80 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded">
                    {item.dateTag}
                  </div>
                  {item.isCustomUpload && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      New
                    </div>
                  )}
                </div>
                <div className="p-3.5 space-y-1 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership & Governance: Clean Editorial Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-7 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            {/* Leadership Image */}
            <div className="lg:col-span-4 max-w-xs sm:max-w-sm mx-auto lg:max-w-none w-full">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
                <img
                  src={siteSettings.ceoPhoto || ASSETS.medicalDoctors}
                  alt={`${siteSettings.ceoName || COMPANY_INFO.ceo.name} - CEO`}
                  className="w-full h-52 sm:h-68 object-contain sm:object-cover object-top bg-slate-900"
                />
                <div className="p-3 bg-slate-900 text-white border-t border-slate-800">
                  <h4 className="text-xs sm:text-sm font-bold">{siteSettings.ceoName || 'Dr. Okezie Eze Miracle (PhD, ACLS, CFA)'}</h4>
                  <p className="text-[11px] sm:text-xs text-amber-400 mt-0.5">{siteSettings.ceoTitle || 'Director / CEO · Bright Light Integrated Services'}</p>
                </div>
              </div>
            </div>

            {/* Leadership Text */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase text-amber-700 block">
                Executive Leadership &amp; Governance
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Accountability, Certified Staff, and Zero Quackery.
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Founded by <strong>Dr. Okezie Eze Miracle</strong>, an accredited healthcare management doctor and certified Advanced Cardiac Life Support provider (Postgraduate Institute of Medicine &amp; AMCB UK), BRILIS was established to provide reliable, professional, and certified corporate execution across Nigeria.
              </p>

              <blockquote className="border-l-3 border-amber-500 pl-4 py-1 italic text-xs sm:text-sm text-slate-700 bg-amber-50/60 rounded-r">
                &ldquo;Whether it is environmental pest control, emergency first-aid training, or medical equipment supply, we operate on a single principle: certified personnel, genuine products, and verified standards.&rdquo;
              </blockquote>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-600 font-medium">
                <span className="px-2.5 py-1 bg-slate-100 rounded border border-slate-200">ISO 9001:2015 QMS Compliant</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded border border-slate-200">ISO 14001:2005 EMS Standards</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded border border-slate-200">WSO HSE Certified</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Corporate Profile &amp; Governance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Free Monday Health Consultations: Calm Community Outreach Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-800 text-emerald-200 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5 text-emerald-300" />
              <span>Every Monday · Free Community Service</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Free Monday Health Consultations
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              In partnership with the <strong>Healthy Attitude Club</strong>, our medical team conducts free health screenings, blood pressure checks, and preventive wellness consultations every Monday.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
            >
              Book Monday Consultation
            </button>
            <a
              href={`tel:${COMPANY_INFO.phones[0]}`}
              className="px-5 py-2.5 bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg border border-emerald-700 transition-colors text-center"
            >
              Call: {COMPANY_INFO.phones[0]}
            </a>
          </div>
        </div>
      </section>

      {/* 6. Institutional Clients Strip: Minimal & Prestigious */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-500">
            Verified Client Engagements
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
            Trusted by Educational, Religious &amp; Corporate Institutions
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: "Tai Solarin Univ. of Education", role: "TASUED Campus" },
            { name: "Christ Embassy National Camp", role: "Facility Pest Management" },
            { name: "Golden Star Hotel, Ibafo", role: "Hospitality Sanitization" },
            { name: "Bennissant Private School", role: "Campus First Aid" },
            { name: "Sugama Super Union Group", role: "China Supply Partner" },
            { name: "World Health Organization", role: "Guidelines Alignment" }
          ].map((c, i) => (
            <div
              key={i}
              className="p-3 bg-white border border-slate-200 rounded-lg text-center flex flex-col justify-center min-h-[70px]"
            >
              <p className="text-xs font-bold text-slate-800 line-clamp-1">{c.name}</p>
              <span className="text-[10px] text-slate-500 mt-0.5">{c.role}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentPage('clients')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            View all 15 institutional partners &amp; accreditations →
          </button>
        </div>
      </section>

      {/* 7. Bottom Contact Prompt: Clean & Direct */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3 pt-2">
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Ready to Coordinate Your Next Service?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Contact our operations team at our Ogun State headquarters or submit an enquiry online.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => openQuoteModal()}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Make Enquiry
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs uppercase tracking-wider rounded-lg border border-slate-300 transition-colors cursor-pointer"
          >
            Contact Operations
          </button>
        </div>
      </section>
    </div>
  );
};
