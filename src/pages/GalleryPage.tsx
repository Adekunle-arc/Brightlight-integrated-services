import React, { useState, useEffect } from 'react';
import { DataService, PhotoItem } from '../services/dataService';
import { COMPANY_INFO } from '../data/companyData';
import { FieldOperationsGallery } from '../components/FieldOperationsGallery';
import { X, ZoomIn, MapPin, Plus, Camera, ArrowRight } from 'lucide-react';

interface GalleryPageProps {
  openQuoteModal?: (serviceId?: string) => void;
  openAdminModal?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  openQuoteModal,
  openAdminModal
}) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<PhotoItem | null>(null);

  useEffect(() => {
    setPhotos(DataService.getPhotos());
    const unsub = DataService.onPhotosChange(() => {
      setPhotos(DataService.getPhotos());
    });
    return unsub;
  }, []);

  const categories = [
    { id: 'all', label: 'All Operations' },
    { id: 'fumigation', label: 'Fumigation & Pest Control' },
    { id: 'medical', label: 'Medical & Outreaches' },
    { id: 'training', label: 'Training Seminars' },
    { id: 'rentals', label: 'Event Rentals' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? photos
    : photos.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-8 sm:space-y-10 py-6 sm:py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
              Operational Evidence &amp; Field Records · RC: {COMPANY_INFO.rcNumber}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
              Operations &amp; Outreach Activity Gallery
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-3xl leading-relaxed">
              Photographic documentation of our community health outreaches, accredited healthcare certifications, environmental fumigation operations, and corporate event infrastructure across Nigeria.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 bg-white/90 text-slate-900 rounded-full shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-mono font-bold rounded uppercase">
                    {item.dateTag}
                  </span>
                </div>
                {item.isCustomUpload && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-bold rounded uppercase">
                      New Upload
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{item.location}</span>
                  </span>
                  <span className="font-mono text-[11px] uppercase text-slate-400">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Field Operations & Technical Protocols */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FieldOperationsGallery />
      </section>

      {/* 4. Bottom Callout: Make Enquiry */}
      {openQuoteModal && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="bg-slate-900 text-white p-8 rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Need Similar Service at Your Facility?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-2">
              Our teams deploy with certified equipment, PPE compliance, and verified procedures across Ogun State, Lagos State, and nationwide.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => openQuoteModal()}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Make Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  {activeItem.dateTag} · {activeItem.location}
                </span>
                <h3 className="text-base sm:text-lg font-bold">{activeItem.title}</h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center max-h-[55vh]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-h-[55vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <h4 className="text-sm font-bold text-slate-900">Operation Narrative</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeItem.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200">
                  <span>Location: <strong>{activeItem.location}</strong></span>
                  <span>·</span>
                  <span>Operational Sector: <strong className="capitalize">{activeItem.category}</strong></span>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-500">
                Bright Light Integrated Services
              </span>
              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
