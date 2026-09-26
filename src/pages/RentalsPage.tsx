import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ASSETS } from '../data/assets';
import { DataService, SiteSettings } from '../services/dataService';
import { RentalsFlyerSection } from '../components/RentalsFlyerSection';
import {
  Tv,
  Mic2,
  Armchair,
  Building,
  Bus,
  CheckCircle2,
  Calendar,
  Send,
  CheckCircle,
  Truck,
  Sparkles
} from 'lucide-react';

interface RentalsPageProps {
  openQuoteModal: (serviceId?: string) => void;
}

export const RentalsPage: React.FC<RentalsPageProps> = ({ openQuoteModal }) => {
  const [contactName, setContactName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'Projectors / Large Screens',
    'Public Address Sound Systems'
  ]);
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [state, setState] = useState('Ogun State');
  const [requiresDriver, setRequiresDriver] = useState(false);
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

  const rentalCatalog = [
    {
      id: 'r-projectors',
      title: 'Projectors & Large Projector Screen Rentals',
      category: 'Audio-Visual',
      icon: Tv,
      desc: 'For clear and impactful presentations. Ideal for seminars, trainings, church programs, and business meetings. High-lumen projectors paired with large portable projection screens for crisp visual clarity.',
      features: ['High ANSI lumen output for bright ambient rooms', 'HDMI & wireless casting compatibility', 'Tripod and motorized fast-fold screen options', 'On-site technical setup available']
    },
    {
      id: 'r-pa',
      title: 'Public Address Systems & Sound Engineering',
      category: 'Audio',
      icon: Mic2,
      desc: 'Complete sound systems with clarity microphones, powerful speakers, and matched amplifiers to ensure your audience hears you loud and clear. Perfect for conferences, outreach programs, corporate parties, and outdoor events.',
      features: ['Dual wireless handheld & lapel microphones', 'Feedback-suppressed audio mixers', 'Battery backup option for power interruptions', 'Acoustic balance for indoor & outdoor venues']
    },
    {
      id: 'r-furniture',
      title: 'Neat & Durable Chairs & Tables',
      category: 'Event Furniture',
      icon: Armchair,
      desc: 'Neat, modern, and sturdy chairs and tables for all occasions — including seminars, weddings, birthdays, board meetings, and corporate banquets. Available in flexible bulk quantities.',
      features: ['Pristine, sanitized event chairs with optional covers', 'Sturdy rectangular banquet & seminar tables', 'Flexible volume from 50 to 1,000+ guests', 'Punctual truck delivery and retrieval']
    },
    {
      id: 'r-hall',
      title: 'Training & Seminar Hall Facilitation',
      category: 'Venue & Facilities',
      icon: Building,
      desc: 'Conducive, well-arranged, and fully equipped training halls for your seminars, workshops, and corporate meetings. Comfortable ergonomic seating, good lighting, climate control, and a professional environment guaranteed.',
      features: ['Fully air-conditioned executive auditorium', 'Pre-configured audio-visual projection & whiteboard', 'Uninterrupted power generator backup', 'Restroom amenities and catering space']
    },
    {
      id: 'r-buses',
      title: 'Corporate Cars & Bus Fleet Rentals',
      category: 'Mobility & Logistics',
      icon: Bus,
      desc: 'Reliable corporate cars and buses for staff transportation, school excursions, corporate retreats, group movements, and event logistics. Well-maintained, comfortable, and driven by professional, vetted drivers.',
      features: ['Executive sedans, SUVs, and high-capacity buses', 'Clean air-conditioned interiors with luggage racks', 'Licensed, experienced corporate chauffeurs', 'Interstate travel dispatch (Lagos, Ogun, Benue, etc.)']
    }
  ];

  const toggleItem = (name: string) => {
    if (selectedItems.includes(name)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter(i => i !== name));
      }
    } else {
      setSelectedItems([...selectedItems, name]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !phone || !email || !eventStartDate) return;

    setIsSubmitting(true);
    try {
      const res = await DataService.submitRental({
        contactName,
        organization,
        phone,
        email,
        items: selectedItems,
        eventStartDate,
        eventEndDate: eventEndDate || eventStartDate,
        venueAddress: venueAddress || 'Address on confirmation',
        state,
        requiresDriver,
        notes
      });
      setSubmittedId(res.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedId(null);
    setContactName('');
    setOrganization('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  return (
    <div className="space-y-8 sm:space-y-10 py-6 sm:py-8">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-wider mb-2">
            <span>QRFS Global Resources</span>
            <span>·</span>
            <span>Corporate Equipment &amp; Facility Division</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Corporate Equipment &amp; Facility Rentals
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 max-w-3xl leading-relaxed">
            Neat, functional, and affordable rental solutions for conferences, church programs, corporate seminars, school excursions, and large-scale public events.
          </p>
        </div>
      </section>

      {/* 2. Audio-Visual & Training Rentals Flyer Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RentalsFlyerSection
          onOpenBooking={() => {
            const el = document.getElementById('booking-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </section>

      {/* 3. Visual Showcase & Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 text-white rounded-2xl p-6 sm:p-10">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
              Reliable Corporate Logistics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pristine Equipment, Punctual Delivery, Zero Downtime
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              At Bright Light Integrated Services, we understand that faulty microphones, dim projectors, or delayed transport can compromise months of corporate event planning. Our rental assets are rigorously tested, neatly maintained, and delivered with professional operators when required.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <strong className="text-amber-400 block mb-0.5">Tested Audio-Visuals</strong>
                <span className="text-slate-400">High-gain optics &amp; crisp sound</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <strong className="text-amber-400 block mb-0.5">Chauffeured Fleet</strong>
                <span className="text-slate-400">Licensed professional drivers</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <strong className="text-amber-400 block mb-0.5">On-Time Guarantee</strong>
                <span className="text-slate-400">Early venue dispatch</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-700 shadow-xl">
              <img
                src={siteSettings.serviceRentalsImage || ASSETS.eventRentals}
                alt="Corporate Seminar Setup"
                className="w-full h-48 sm:h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Catalog of Rental Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
            Available Inventory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            5 Core Rental Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalCatalog.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-amber-500 transition-colors"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => {
                      if (!selectedItems.includes(item.title)) {
                        setSelectedItems([...selectedItems, item.title]);
                      }
                      const bookingForm = document.getElementById('booking-section');
                      bookingForm?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Select for Reservation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Interactive Booking Requisition Form */}
      <section id="booking-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest block">
              Reservation Requisition · QRFS Global Resources
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              Book Rental Equipment &amp; Transportation Fleet
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select your required equipment, specify your event dates and location, and our logistics officer will contact you with availability and delivery scheduling.
            </p>
          </div>

          {submittedId ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Rental Requisition Received</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{contactName}</strong>. Your rental request has been received with reference <span className="font-mono font-bold text-amber-800">{submittedId}</span>.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 text-left max-w-md mx-auto space-y-1">
                <p>• Items: <strong>{selectedItems.join(', ')}</strong></p>
                <p>• Event Date: <strong>{eventStartDate}</strong></p>
                <p>• Logistics hotline: <strong>{COMPANY_INFO.phones[0]}</strong></p>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Create Another Booking
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Equipment Multi-Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Required Equipment &amp; Facilities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Projectors / Large Screens',
                    'Public Address Sound Systems',
                    'Neat Chairs & Tables (Bulk)',
                    'Air-Conditioned Training Hall',
                    'Corporate Buses / Excursion Fleet',
                    'Corporate Sedans & Chauffeur'
                  ].map((item) => (
                    <label
                      key={item}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        selectedItems.includes(item)
                          ? 'border-purple-600 bg-purple-50 text-purple-950 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item)}
                        onChange={() => toggleItem(item)}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Person Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="e.g. Deacon / Engr. Chinedu"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organization / Ministry / Event
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    placeholder="e.g. Church Youth Outreach, Company Retreat"
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
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Event Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={eventStartDate}
                    onChange={e => setEventStartDate(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Event End / Return Date
                  </label>
                  <input
                    type="date"
                    value={eventEndDate}
                    onChange={e => setEventEndDate(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State / Region
                  </label>
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Ogun State">Ogun State (Aseese, Ibafo, Mowe, Sagamu, Abeokuta)</option>
                    <option value="Lagos State">Lagos State (Ikeja, Alagbado, Lekki, Victoria Island, Mainland)</option>
                    <option value="Benue State">Benue State (Makurdi, Gboko, Otukpo)</option>
                    <option value="Other States">Interstate Dispatch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Technical Support / Driver Needed
                  </label>
                  <label className="flex items-center gap-2 p-2.5 border border-slate-300 rounded-lg text-xs cursor-pointer bg-slate-50">
                    <input
                      type="checkbox"
                      checked={requiresDriver}
                      onChange={e => setRequiresDriver(e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span>Include Sound Technician / Professional Driver</span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Venue Address &amp; Delivery Logistics
                  </label>
                  <input
                    type="text"
                    value={venueAddress}
                    onChange={e => setVenueAddress(e.target.value)}
                    placeholder="e.g. 12 Church Road, off Lagos-Ibadan Expressway..."
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Quantity or Setup Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Specify chair count, microphone preferences, or bus pickup timing..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Clean equipment dispatched directly from our logistics warehouse
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {isSubmitting ? 'Sending Request...' : (
                    <>
                      <span>Submit Rental Booking</span>
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
