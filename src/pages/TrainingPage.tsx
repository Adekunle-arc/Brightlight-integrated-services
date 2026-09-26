import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ASSETS } from '../data/assets';
import { DataService, SiteSettings } from '../services/dataService';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Users,
  Building,
  FileCheck,
  Send,
  CheckCircle,
  Clock,
  MapPin,
  ShieldCheck
} from 'lucide-react';

interface TrainingPageProps {
  openQuoteModal: (serviceId?: string) => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ openQuoteModal }) => {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('BLS & Advanced Cardio Life Support (ACLS)');
  const [trainingModel, setTrainingModel] = useState<'individual' | 'corporate_group'>('individual');
  const [candidateCount, setCandidateCount] = useState(1);
  const [location, setLocation] = useState('Ogun State Head Office Hall');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => DataService.getSiteSettings());

  useEffect(() => {
    setSiteSettings(DataService.getSiteSettings());
    const unsub = DataService.onPhotosChange(() => {
      setSiteSettings(DataService.getSiteSettings());
    });
    return unsub;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmitting(true);
    try {
      const reg = await DataService.submitTraining({
        fullName,
        organization,
        email,
        phone,
        course,
        trainingModel,
        candidateCount,
        location,
        notes
      });
      setSubmittedId(reg.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedId(null);
    setFullName('');
    setOrganization('');
    setEmail('');
    setPhone('');
    setNotes('');
  };

  return (
    <div className="space-y-8 sm:space-y-10 py-6 sm:py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-wider mb-2">
            <span>Bright Professional Training Consult</span>
            <span>·</span>
            <span>Recognized CPD (UK) Provider</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Accredited Healthcare &amp; Emergency Training
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 max-w-3xl leading-relaxed">
            International health and emergency management training delivered through accredited curricula. We train healthcare professionals, corporate emergency response teams (ERT), industrial staff, and aspiring healthcare assistants.
          </p>
        </div>
      </section>

      {/* 2. Overview & International Accreditations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Raising World-Class Healthcare &amp; Safety Responders
            </h2>
            <div className="text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>
                As a specialized sub-agency of Bright Light Integrated Services, <strong>Bright Professional Training Consult</strong> is an internationally licensed and accredited training body offering healthcare and emergency certifications recognized across the United Kingdom, United States, and Nigeria.
              </p>
              <p>
                Our curriculum aligns with the strict standards of the <strong>Continuous Professional Development (CPD UK)</strong> framework, <strong>National Healthcare Provider Solutions (NHCPS UK)</strong>, and <strong>World Safety Organization (WSO)</strong>.
              </p>
            </div>

            {/* Accreditations Grid */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                Official Institutional Training Accreditations:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">CPD (United Kingdom)</strong>
                    <span className="text-slate-500 text-[11px]">Continuous Professional Development</span>
                  </div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">NHCPS (United Kingdom)</strong>
                    <span className="text-slate-500 text-[11px]">National Healthcare Provider Solutions</span>
                  </div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">NAOH (United States)</strong>
                    <span className="text-slate-500 text-[11px]">National Association of Healthcare</span>
                  </div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">ASHP Nigeria</strong>
                    <span className="text-slate-500 text-[11px]">African Society of Health Care Practitioners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src={siteSettings.serviceTrainingImage || ASSETS.trainingHall}
                alt="Bright Professional Training Consult Classroom"
                className="w-full h-52 sm:h-72 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-slate-900 text-white rounded-lg text-xs space-y-1">
              <p className="font-bold text-amber-400">Two Flexible Learning Formats</p>
              <p className="text-slate-300">1. Individual Private Learning: Flexible self-paced &amp; weekend cohorts.</p>
              <p className="text-slate-300">2. Corporate On-Site Group Training: Customized workplace safety drills for companies &amp; warehouses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Certification Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
            Program Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Accredited Certification Courses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                CORE LIFE SUPPORT
              </span>
              <span className="text-xs text-slate-500">CPD UK Accredited</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              BLS &amp; Advanced Cardio Life Support (ACLS)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Rigorous, standardized cardiopulmonary resuscitation (CPR), bag-valve-mask ventilations, automated external defibrillator (AED) usage, and acute cardiovascular event stabilization led by certified ACLS instructors.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Hands-on manikin simulation and feedback</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cardiac arrest rhythm identification &amp; pharmacology review</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Internationally verifiable certificate upon passing</span>
              </li>
            </ul>
          </div>

          {/* Course 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                EMERGENCY TRIAGE
              </span>
              <span className="text-xs text-slate-500">Red Cross &amp; Medic First Aid</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              First Aid &amp; Emergency Management
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Essential emergency response training designed for school teachers, factory supervisors, security teams, and general responders. Covers bleeding control, fracture splinting, burn care, and anaphylaxis response.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Rapid primary casualty assessment (DRABC protocol)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Choking management (Heimlich maneuver) for adults and infants</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Workplace first-aid box inspection and compliance</span>
              </li>
            </ul>
          </div>

          {/* Course 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
                CLINICAL PRACTICE
              </span>
              <span className="text-xs text-slate-500">Bright Institute of Healthcare</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Healthcare Assistant Levels Certifications
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Comprehensive vocational qualification providing individuals with foundational clinical skills: patient vital signs monitoring, bed-making, infection prevention, basic pharmacology assistance, and compassionate palliative care.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Clinical hygiene, aseptic techniques, and PPE discipline</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Patient record keeping and bedside observation documentation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Healthcare assistant employment readiness</span>
              </li>
            </ul>
          </div>

          {/* Course 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded">
                OCCUPATIONAL HSE
              </span>
              <span className="text-xs text-slate-500">World Safety Organisation</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Disaster Management &amp; Workplace Occupational Safety
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Designed for industrial facilities, corporate high-rises, and educational campuses. Covers fire-fighting drills, emergency evacuation planning, chemical spill mitigation, and HSE Level 1, 2 &amp; 3 compliance.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Fire suppression extinguisher handling (PASS technique)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Evacuation warden protocol and muster point coordination</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Hazard identification and risk mitigation matrix (HIRA)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Interactive Student & Corporate Registration Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest block">
              Enrollment Desk · Bright Training Consult
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              Course Registration &amp; Corporate Cohort Booking
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Submit enrollment details for upcoming certification batches or request an on-site corporate training program.
            </p>
          </div>

          {submittedId ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Training Registration Confirmed</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your training registration has been received with registration reference <span className="font-mono font-bold text-amber-800">{submittedId}</span>.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 text-left max-w-md mx-auto space-y-1">
                <p>• Course: <strong>{course}</strong></p>
                <p>• Model: <strong>{trainingModel === 'corporate_group' ? 'Corporate Group' : 'Individual Professional'}</strong></p>
                <p>• Our training registrar will contact you at <strong>{phone}</strong> to confirm your schedule and materials.</p>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Register Another Candidate
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Certification Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="BLS & Advanced Cardio Life Support (ACLS)">BLS &amp; Advanced Cardio Life Support (ACLS)</option>
                    <option value="First Aid & Emergency Management">First Aid &amp; Emergency Management</option>
                    <option value="Healthcare Assistant Levels Certifications">Healthcare Assistant Levels Certifications</option>
                    <option value="Disaster Management & Workplace HSE">Disaster Management &amp; Workplace Occupational Safety</option>
                    <option value="General Health & Wellness Workshop">General Workplace Health &amp; Wellness Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Training Structure <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={trainingModel}
                    onChange={e => setTrainingModel(e.target.value as 'individual' | 'corporate_group')}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="individual">Individual Professional Enrollment</option>
                    <option value="corporate_group">Corporate / Organization Cohort (On-site or Hall)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Number of Candidates
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={candidateCount}
                    onChange={e => setCandidateCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name of Lead Contact / Candidate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Nurse Folake Adeyemi"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organization / Institution (If applicable)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    placeholder="e.g. General Hospital, School, Logistics Co."
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 08080397177"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="trainee@organization.com"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Training Venue
                  </label>
                  <select
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Ogun State Head Office Hall">BRILIS Executive Training Hall (Aseese, Ogun State)</option>
                    <option value="Lagos State Training Facility">Lagos State Training Center</option>
                    <option value="Benue State Branch">Benue State Branch Center</option>
                    <option value="Client Organization Premises">Client Organization Site (On-site Corporate Training)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Additional Learning Objectives / Special Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Note any specific timing preference, custom modules needed, or certification requirements..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Certificate issued upon practical assessment completion
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {isSubmitting ? 'Registering...' : (
                    <>
                      <span>Submit Training Enrollment</span>
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
