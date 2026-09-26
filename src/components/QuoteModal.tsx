import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Truck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { DataService, formatServiceIdToLabel } from '../services/dataService';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialServiceId
}) => {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('Ogun State');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialServiceId ? [initialServiceId] : ['fum-pest']
  );
  const [activeSectorTab, setActiveSectorTab] = useState<'all' | 'rentals' | 'fumigation' | 'medical' | 'training'>('all');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServices([initialServiceId]);
      if (initialServiceId.startsWith('rnt-')) setActiveSectorTab('rentals');
      else if (initialServiceId.startsWith('fum-')) setActiveSectorTab('fumigation');
      else if (initialServiceId.startsWith('med-')) setActiveSectorTab('medical');
      else if (initialServiceId.startsWith('trn-')) setActiveSectorTab('training');
    }
  }, [initialServiceId, isOpen]);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const formattedServiceList = selectedServices.map(formatServiceIdToLabel).join(', ');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    setIsSubmitting(true);
    try {
      const res = await DataService.submitQuote({
        name: fullName,
        organization,
        phone,
        email,
        services: selectedServices,
        state,
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
    setFullName('');
    setOrganization('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
              Official Client Enquiry &amp; Rental Desk · RC: {COMPANY_INFO.rcNumber}
            </span>
            <h3 className="text-base sm:text-lg font-bold">Make an Enquiry / Book Equipment Rentals</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {submittedId ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Enquiry Sent Successfully</h4>
                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mt-1">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>. Your enquiry reference is <span className="font-mono font-bold text-amber-800">{submittedId}</span>. Our operations team has received your request and will contact you shortly.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-lg mx-auto text-xs text-slate-700 text-left space-y-1.5">
                <p><strong>Requested Services / Rentals:</strong> {formattedServiceList}</p>
                <p><strong>Client Contact:</strong> {phone} · {email}</p>
                <p><strong>Deployment State:</strong> {state}</p>
                {notes && <p><strong>Notes:</strong> &ldquo;{notes}&rdquo;</p>}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Sector Filter Tabs so Rentals is front and center */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                    Select Requested Services or Rentals ({selectedServices.length} selected)
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: 'all', label: 'All 4 Divisions' },
                      { id: 'rentals', label: 'Rentals & AV Gear' },
                      { id: 'fumigation', label: 'Fumigation' },
                      { id: 'medical', label: 'Healthcare' },
                      { id: 'training', label: 'Training' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveSectorTab(tab.id as typeof activeSectorTab)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                          activeSectorTab === tab.id
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 p-2.5 sm:p-3 border border-slate-200 rounded-xl bg-slate-50/70">
                  {/* RENTALS & EVENT SUPPORT (Placed prominently so users immediately see Rentals) */}
                  {(activeSectorTab === 'all' || activeSectorTab === 'rentals') && (
                    <>
                      <div className="col-span-full flex items-center gap-1.5 text-[11px] font-bold text-purple-900 bg-purple-100/80 px-2.5 py-1 rounded uppercase tracking-wider">
                        <Truck className="w-3.5 h-3.5 text-purple-700" />
                        <span>Corporate Equipment, Hall &amp; Vehicle Rentals (QRFS)</span>
                      </div>
                      {COMPANY_INFO.services.rentals.map(item => (
                        <label
                          key={item.id}
                          className={`flex items-start gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            selectedServices.includes(item.id)
                              ? 'border-amber-500 bg-amber-50 text-slate-900 font-semibold shadow-2xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(item.id)}
                            onChange={() => toggleService(item.id)}
                            className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                          />
                          <span>{item.title}</span>
                        </label>
                      ))}
                    </>
                  )}

                  {/* FUMIGATION & PEST CONTROL */}
                  {(activeSectorTab === 'all' || activeSectorTab === 'fumigation') && (
                    <>
                      <div className="col-span-full text-[11px] font-bold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded uppercase tracking-wider mt-1">
                        Fumigation &amp; Environmental Pest Control
                      </div>
                      {COMPANY_INFO.services.fumigation.map(item => (
                        <label
                          key={item.id}
                          className={`flex items-start gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            selectedServices.includes(item.id)
                              ? 'border-amber-500 bg-amber-50 text-slate-900 font-semibold shadow-2xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(item.id)}
                            onChange={() => toggleService(item.id)}
                            className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                          />
                          <span>{item.title}</span>
                        </label>
                      ))}
                    </>
                  )}

                  {/* HEALTH & MEDICAL */}
                  {(activeSectorTab === 'all' || activeSectorTab === 'medical') && (
                    <>
                      <div className="col-span-full text-[11px] font-bold text-emerald-900 bg-emerald-100/70 px-2.5 py-1 rounded uppercase tracking-wider mt-1">
                        Health, Medical Outreach &amp; Equipment Procurement
                      </div>
                      {COMPANY_INFO.services.medical.map(item => (
                        <label
                          key={item.id}
                          className={`flex items-start gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            selectedServices.includes(item.id)
                              ? 'border-amber-500 bg-amber-50 text-slate-900 font-semibold shadow-2xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(item.id)}
                            onChange={() => toggleService(item.id)}
                            className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                          />
                          <span>{item.title}</span>
                        </label>
                      ))}
                    </>
                  )}

                  {/* TRAINING */}
                  {(activeSectorTab === 'all' || activeSectorTab === 'training') && (
                    <>
                      <div className="col-span-full text-[11px] font-bold text-blue-900 bg-blue-100/70 px-2.5 py-1 rounded uppercase tracking-wider mt-1">
                        Healthcare Training (Bright Professional Training Consult)
                      </div>
                      {COMPANY_INFO.services.training.map(item => (
                        <label
                          key={item.id}
                          className={`flex items-start gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            selectedServices.includes(item.id)
                              ? 'border-amber-500 bg-amber-50 text-slate-900 font-semibold shadow-2xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(item.id)}
                            onChange={() => toggleService(item.id)}
                            className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                          />
                          <span>{item.title}</span>
                        </label>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Dr. / Mr. / Mrs. Babatunde"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    placeholder="e.g. Church, School, Hotel, Clinic"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
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
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="client@organization.com"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Deployment State / Location
                  </label>
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Ogun State">Ogun State (Headquarters Area: Aseese, Ibafo, Sagamu, Abeokuta)</option>
                    <option value="Lagos State">Lagos State (Alagbado, Ikeja, Island, Okota, Lekki, Mainland)</option>
                    <option value="Benue State">Benue State (Makurdi, Gboko, Otukpo &amp; Environs)</option>
                    <option value="Abuja FCT">Federal Capital Territory (Abuja)</option>
                    <option value="Oyo State">Oyo State (Ibadan &amp; Environs)</option>
                    <option value="Other Nigeria Location">Other Nigerian State (Nationwide Dispatch)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Project Details / Rental Dates / Facility Scope
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Describe specific requirements (e.g. Projector + PA rental for Saturday seminar, 5-bedroom fumigation, or 20 staff first-aid training)..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end border-t border-slate-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
