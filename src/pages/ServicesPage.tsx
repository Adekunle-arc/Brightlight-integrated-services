import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ASSETS } from '../data/assets';
import { DataService, SiteSettings } from '../services/dataService';
import { OfficialServiceBadges } from '../components/OfficialServiceBadges';
import { FieldOperationsGallery } from '../components/FieldOperationsGallery';
import { PestControlCampaign } from '../components/PestControlCampaign';
import {
  Stethoscope,
  Bug,
  GraduationCap,
  Tv,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface ServicesPageProps {
  openQuoteModal: (serviceId?: string) => void;
  setCurrentPage: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  openQuoteModal,
  setCurrentPage
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'medical' | 'fumigation' | 'training' | 'rentals'>('all');
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
            Certified Multi-Sector Service Matrix · RC: {COMPANY_INFO.rcNumber}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
            Corporate Service Offerings
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 max-w-3xl leading-relaxed">
            Bright Light Integrated Services offers a comprehensive 4-in-1 operational structure. All services are executed by certified practitioners adhering strictly to international safety, health, and quality standards.
          </p>

          {/* Official Division Circular Badges */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <OfficialServiceBadges
              activeCategory={activeTab === 'all' ? undefined : activeTab}
              onSelectCategory={(cat) => setActiveTab(cat)}
            />
          </div>

          {/* Department Filter Tabs (Functional filter controls per Constitution) */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Departments
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'medical'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Health &amp; Medical
            </button>
            <button
              onClick={() => setActiveTab('fumigation')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'fumigation'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Fumigation &amp; Pest Control
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'training'
                  ? 'bg-blue-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Professional Healthcare Training
            </button>
            <button
              onClick={() => setActiveTab('rentals')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'rentals'
                  ? 'bg-purple-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Equipment &amp; Facilities Rentals
            </button>
          </div>
        </div>
      </section>

      {/* 2. Department 1: Health & Medical Services */}
      {(activeTab === 'all' || activeTab === 'medical') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-100 pb-8">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs font-bold">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Division 01 · Clinical &amp; Preventative Healthcare</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Health &amp; Medical Department
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  Dedicated to promoting holistic health and wellness through accessible, professional, and preventive healthcare services. We are committed to helping individuals, schools, and corporate workforces achieve optimal wellness through early detection and clinical care.
                </p>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <img
                    src={siteSettings.serviceMedicalImage || ASSETS.medicalDoctors}
                    alt="Medical Consultation and Outreach"
                    className="w-full h-48 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Core Medical Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPANY_INFO.services.medical.map((med) => (
                <div
                  key={med.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-500 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {med.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {med.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                      Certified Healthcare
                    </span>
                    <button
                      onClick={() => openQuoteModal(med.id)}
                      className="text-xs font-bold text-slate-900 hover:text-emerald-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Make Enquiry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Callouts: Medical Procurement & Quantum Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-emerald-950 text-white rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase">
                  <Globe2 className="w-4 h-4" />
                  <span>Direct International Medical Procurement</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  State-of-the-Art Hospital &amp; Lab Equipment Supply
                </h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  We supply sophisticated clinical diagnostic devices and state-of-the-art facilities for hospitals, healthcare agencies, and laboratories. Sourced directly from our vetted international partners: <strong>Sugama Super Union Group (Yangzhou, China)</strong>, <strong>Jiangsu Medlead Technology (Changzhou, China)</strong>, and <strong>Mespa Global (Istanbul, Turkey)</strong>.
                </p>
              </div>

              <div className="p-6 bg-slate-900 text-white rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
                  <Activity className="w-4 h-4" />
                  <span>Advanced Quantum Body Analysis</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  Comprehensive Cellular &amp; Organ Vitality Screening
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our Quantum Resonance Body Analyzers conduct non-invasive general check-ups with detailed reporting on every bodily system — assisting individuals and corporate teams in identifying early health indicators and pursuing preventive treatments.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Department 2: Fumigation & Cleaning Services */}
      {(activeTab === 'all' || activeTab === 'fumigation') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-100 pb-8">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-xs font-bold">
                  <Bug className="w-3.5 h-3.5" />
                  <span>Division 02 · Environmental Safety &amp; Vector Control</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Fumigation &amp; Pest Control Services
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  Bright Light Integrated Services offers certified fumigation and general pest management tailored for residential properties, commercial offices, industrial warehouses, schools, and hospitality venues.
                </p>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <img
                    src={siteSettings.serviceFumigationImage || ASSETS.fumigationSpecialist}
                    alt="Professional Pest Control Operation"
                    className="w-full h-48 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Service Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COMPANY_INFO.services.fumigation.map((fum) => (
                <div
                  key={fum.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-500 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {fum.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {fum.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/80">
                    <button
                      onClick={() => openQuoteModal(fum.id)}
                      className="text-xs font-bold text-slate-900 hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Schedule Inspection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Specific Advantages from Page 8 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Key Advantages of BRILIS Fumigation Services
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <strong className="text-slate-900 block mb-0.5">Eradication of Common Pests</strong>
                  <span>Targeted elimination of mosquitoes, termites, rodents, cockroaches, and bedbugs.</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <strong className="text-slate-900 block mb-0.5">Allergen &amp; Pathogen Reduction</strong>
                  <span>Improves indoor air quality by sanitizing viral and fungal deposits.</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <strong className="text-slate-900 block mb-0.5">Prevention of Endemic Diseases</strong>
                  <span>Minimizes transmission of malaria, dengue fever, and rodent-borne leptospirosis.</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <strong className="text-slate-900 block mb-0.5">Trained &amp; Certified Staff</strong>
                  <span>Employs knowledgeable pest technicians adhering to HSE guidelines.</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <strong className="text-slate-900 block mb-0.5">Guaranteed Residual Results</strong>
                  <span>Provides follow-up inspection and long-term chemical barrier protection.</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <strong className="text-slate-900 block mb-0.5">Punctual &amp; Prompt Dispatch</strong>
                  <span>Known for reliability, attention to safety detail, and responsive customer care.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Campaign Block */}
          <PestControlCampaign onScheduleFumigation={() => openQuoteModal('fum-pest')} />

          {/* Real Field Operational Protocols */}
          <FieldOperationsGallery />
        </section>
      )}

      {/* 4. Department 3: Professional Healthcare Training Services */}
      {(activeTab === 'all' || activeTab === 'training') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-100 pb-8">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-xs font-bold">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Division 03 · Sub-Agency: Bright Professional Training Consult</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Professional Healthcare &amp; Emergency Training
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  An internationally licensed and accredited training consult offering hands-on first aid, life support, disaster mitigation, and healthcare assistant credentials with global recognition (CPD United Kingdom).
                </p>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <img
                    src={siteSettings.serviceTrainingImage || ASSETS.trainingHall}
                    alt="Professional Training Seminar"
                    className="w-full h-48 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COMPANY_INFO.services.training.map((trn) => (
                <div
                  key={trn.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-500 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {trn.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {trn.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/80">
                    <button
                      onClick={() => setCurrentPage('training')}
                      className="text-xs font-bold text-slate-900 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Enroll / Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* International Accreditations */}
            <div className="p-6 bg-blue-950 text-white rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                  International Recognition
                </span>
                <h4 className="text-lg font-bold">Recognized CPD Provider (United Kingdom)</h4>
                <p className="text-xs text-blue-200 max-w-xl">
                  Accredited by Continuous Professional Development (CPD UK), National Healthcare Provider Solutions (NHCPS UK), and National Association of Healthcare Trainers (NAOH US).
                </p>
              </div>

              <button
                onClick={() => setCurrentPage('training')}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Go to Training Hub
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 5. Department 4: Rental Services & General Merchandise */}
      {(activeTab === 'all' || activeTab === 'rentals') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-100 pb-8">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-md text-purple-800 text-xs font-bold">
                  <Tv className="w-3.5 h-3.5" />
                  <span>Division 04 · Sub-Agency: QRFS Global Resources</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Rental Services &amp; General Merchandise
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  Neat, functional, and affordable corporate equipment, event furniture, air-conditioned seminar halls, and executive transportation logistics.
                </p>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <img
                    src={siteSettings.serviceRentalsImage || ASSETS.eventRentals}
                    alt="Corporate Event Rentals Setup"
                    className="w-full h-48 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Rental Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPANY_INFO.services.rentals.map((rnt) => (
                <div
                  key={rnt.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-purple-500 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {rnt.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rnt.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/80">
                    <button
                      onClick={() => setCurrentPage('rentals')}
                      className="text-xs font-bold text-slate-900 hover:text-purple-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Reserve Equipment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Quick Requisition CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold">Have Multiple Requirements Across Sectors?</h3>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Combine fumigation, audio-visual equipment rental, and workplace emergency drills in a single consolidated service contract.
            </p>
          </div>
          <button
            onClick={() => openQuoteModal()}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0 shadow-md"
          >
            Make Multi-Service Enquiry
          </button>
        </div>
      </section>
    </div>
  );
};
