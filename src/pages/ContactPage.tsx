import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { DataService } from '../services/dataService';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  Calendar,
  Building,
  Clock,
  Instagram,
  Facebook,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

interface ContactPageProps {
  openQuoteModal: (serviceId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ openQuoteModal }) => {
  // General Inquiry form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Corporate Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Free Monday Health Clinic booking state
  const [clinicName, setClinicName] = useState('');
  const [clinicPhone, setClinicPhone] = useState('');
  const [clinicAge, setClinicAge] = useState('Adult (18-50)');
  const [clinicDate, setClinicDate] = useState('');
  const [clinicConcern, setClinicConcern] = useState('');
  const [clinicSubmitted, setClinicSubmitted] = useState<string | null>(null);
  const [isClinicSubmitting, setIsClinicSubmitting] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !message) return;

    setIsSubmitting(true);
    try {
      const res = await DataService.submitQuote({
        name: fullName,
        organization: subject,
        phone,
        email: email || 'inquiry@brightlight.com.ng',
        services: ['General Inquiry'],
        state: 'Contact Form',
        notes: message
      });
      setSubmittedId(res.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClinicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinicName || !clinicPhone) return;

    setIsClinicSubmitting(true);
    try {
      const res = await DataService.submitHealthInquiry({
        fullName: clinicName,
        phone: clinicPhone,
        ageBracket: clinicAge,
        preferredConsultationDate: clinicDate,
        healthConcernSummary: clinicConcern || 'Routine checkup and blood pressure check',
        locationState: 'Ogun State / Lagos Clinic Hub',
        isMondayFreeClinic: true
      });
      setClinicSubmitted(res.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsClinicSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 py-6 sm:py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
            Official Communications Directory · RC: {COMPANY_INFO.rcNumber}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
            Contact &amp; Corporate Headquarters
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 max-w-3xl leading-relaxed">
            Reach out to our executive leadership, operations dispatch desk, or community health initiative. We maintain active operational hubs across Ogun, Lagos, and Benue States.
          </p>
        </div>
      </section>

      {/* 2. Direct Contact Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Head Office Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Head Office (Ogun State)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {COMPANY_INFO.headquarters}
            </p>
            <span className="inline-block text-[11px] font-mono text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded">
              Current Headquarters
            </span>
          </div>

          {/* Direct Telephone Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Telephone Lines
            </h3>
            <div className="space-y-1 text-xs font-mono">
              <a
                href={`tel:${COMPANY_INFO.phones[0]}`}
                className="block text-slate-800 hover:text-amber-700 font-semibold"
              >
                {COMPANY_INFO.phones[0]}
              </a>
              <a
                href={`tel:${COMPANY_INFO.phones[1]}`}
                className="block text-slate-800 hover:text-amber-700 font-semibold"
              >
                {COMPANY_INFO.phones[1]}
              </a>
            </div>
            <span className="inline-block text-[11px] text-slate-400">
              Operational 24/7 for Emergency Outreaches
            </span>
          </div>

          {/* Official Email Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center border border-blue-200">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Corporate Emails
            </h3>
            <div className="space-y-1 text-xs">
              <a
                href={`mailto:${COMPANY_INFO.emails[0]}`}
                className="block text-slate-800 hover:text-blue-700 truncate"
              >
                {COMPANY_INFO.emails[0]}
              </a>
              <a
                href={`mailto:${COMPANY_INFO.emails[1]}`}
                className="block text-slate-800 hover:text-blue-700 truncate font-semibold text-amber-800"
              >
                {COMPANY_INFO.emails[1]}
              </a>
            </div>
            <span className="inline-block text-[11px] text-slate-400">
              Response guaranteed within 2 hours
            </span>
          </div>

          {/* Social & Corporate Channels */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center border border-purple-200">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Social &amp; Regional Hubs
            </h3>
            <div className="space-y-1.5 text-xs text-slate-700">
              <p>Facebook: <strong>{COMPANY_INFO.socials.facebook}</strong></p>
              <p>Instagram: <strong>@{COMPANY_INFO.socials.instagram}</strong></p>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                Branches: Lagos State &amp; Benue State
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dual Forms Section: Free Monday Health Clinic & General Corporate Inquiry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form A: Free Monday Health Consultations (In partnership with Healthy Attitude Club) */}
          <div className="lg:col-span-6 bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-emerald-800/80 pb-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded text-emerald-300 text-xs font-mono mb-2">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Community Wellness Initiative</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Free Monday Health Consultation
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1 leading-relaxed">
                In partnership with the <strong>Healthy Attitude Club</strong>, BRILIS offers free medical evaluations, blood pressure measurements, and wellness counseling every Monday.
              </p>
            </div>

            {clinicSubmitted ? (
              <div className="p-6 bg-emerald-900/60 rounded-xl border border-emerald-700 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Monday Appointment Scheduled</h4>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  Thank you, <strong>{clinicName}</strong>. Your consultation registration has been logged (ID: <span className="font-mono font-bold text-amber-300">{clinicSubmitted}</span>). Please arrive at our Aseese Ogun State clinic center or our Lagos outreach hub on the scheduled Monday.
                </p>
                <button
                  onClick={() => setClinicSubmitted(null)}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold uppercase rounded-lg hover:bg-emerald-400 transition-colors"
                >
                  Book Another Patient
                </button>
              </div>
            ) : (
              <form onSubmit={handleClinicSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-emerald-200 font-bold mb-1">
                    Patient Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={clinicName}
                    onChange={e => setClinicName(e.target.value)}
                    placeholder="Full name of patient"
                    className="w-full px-3 py-2 bg-emerald-900/40 border border-emerald-700 rounded-lg text-white placeholder-emerald-400/60 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-emerald-200 font-bold mb-1">
                      Phone Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={clinicPhone}
                      onChange={e => setClinicPhone(e.target.value)}
                      placeholder="e.g. 08080397177"
                      className="w-full px-3 py-2 bg-emerald-900/40 border border-emerald-700 rounded-lg text-white placeholder-emerald-400/60 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-200 font-bold mb-1">
                      Age Bracket
                    </label>
                    <select
                      value={clinicAge}
                      onChange={e => setClinicAge(e.target.value)}
                      className="w-full px-3 py-2 bg-emerald-900/40 border border-emerald-700 rounded-lg text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                    >
                      <option value="Child / Adolescent (0-17)">Child / Adolescent (0-17)</option>
                      <option value="Adult (18-50)">Adult (18-50)</option>
                      <option value="Senior (50+)">Senior (50+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-200 font-bold mb-1">
                    Preferred Monday Date
                  </label>
                  <input
                    type="date"
                    value={clinicDate}
                    onChange={e => setClinicDate(e.target.value)}
                    className="w-full px-3 py-2 bg-emerald-900/40 border border-emerald-700 rounded-lg text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-emerald-200 font-bold mb-1">
                    Primary Health Concern / Routine Check
                  </label>
                  <textarea
                    rows={2}
                    value={clinicConcern}
                    onChange={e => setClinicConcern(e.target.value)}
                    placeholder="e.g. Blood pressure monitoring, general weakness, nutrition advice, Quantum analyzer scan..."
                    className="w-full px-3 py-2 bg-emerald-900/40 border border-emerald-700 rounded-lg text-white placeholder-emerald-400/60 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isClinicSubmitting}
                    className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    {isClinicSubmitting ? 'Reserving...' : 'Confirm Free Monday Consultation'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Form B: Corporate Communications & General Dispatch */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
                Official Corporate Enquiry Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Corporate Dispatch &amp; General Enquiries
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Send a message directly to our executive directorate for partnerships, procurement, or administrative matters.
              </p>
            </div>

            {submittedId ? (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Message Sent Successfully</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your correspondence reference is <span className="font-mono font-bold text-amber-800">{submittedId}</span>. Our desk has received your message and will contact you via {phone}.
                </p>
                <button
                  onClick={() => setSubmittedId(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-bold uppercase rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Engr. / Dr. / Mrs. Adeleke"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. 08080397177"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Subject / Division of Interest
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                    <option value="Fumigation & Pest Control Contract">Fumigation &amp; Pest Control Contract</option>
                    <option value="Healthcare Equipment Procurement">Healthcare Equipment Procurement</option>
                    <option value="Bright Professional Training Consult">Bright Professional Training Consult</option>
                    <option value="QRFS Global Rentals & Logistics">QRFS Global Rentals &amp; Logistics</option>
                    <option value="Executive Directorate Office">Executive Directorate Office (Dr. Okezie)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Your Message / Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Provide details regarding your requirement, venue, or proposed collaboration..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    {isSubmitting ? 'Transmitting...' : (
                      <>
                        <span>Submit Corporate Inquiry</span>
                        <Send className="w-3.5 h-3.5 text-amber-400" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. Strategic Location Notes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Operating Hours &amp; Emergency Field Dispatch:</span>
          </div>
          <p>
            • Corporate Office: Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 4:00 PM
          </p>
          <p>
            • Pest control fumigation and emergency medical outreaches are scheduled 24/7 across weekends and off-peak hours to avoid interrupting client commercial activities.
          </p>
        </div>
      </section>
    </div>
  );
};
