import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/assets';
import { DataService, PhotoItem, SiteSettings } from '../services/dataService';
import { ShieldCheck, Flame, Bug, Home, Building2, CheckCircle2, ChevronRight, X } from 'lucide-react';

export interface FieldOperation {
  id: string;
  title: string;
  category: 'Thermal Fogging' | 'Structural Termite' | 'Indoor Disinfection' | 'Perimeter Barrier' | 'Precision Misting' | 'Safety Protocol';
  equipment: string;
  environment: string;
  objective: string;
  image: string;
  details: string[];
}

export const FIELD_OPERATIONS: FieldOperation[] = [
  {
    id: 'op-thermal-fogging',
    title: 'Outdoor Perimeter Thermal Fogging',
    category: 'Thermal Fogging',
    equipment: 'Industrial Pulse-Jet Thermal Fogger & Vector Formulations',
    environment: 'Residential Estates, School Campuses, Hotel Compounds, & Tree Lines',
    objective: 'Rapid knockdown and elimination of adult mosquito vectors (Malaria & Dengue vectors) and dangerous reptiles across expansive outdoor perimeters.',
    image: ASSETS.outdoorThermalFogging,
    details: [
      'Dense thermal fog penetrates shrubbery, perimeter gutters, and tree lines where mosquitoes breed',
      'Recommended for schools, event grounds, church campgrounds, and corporate estates prior to major activities',
      'Operator equipped with heat-resistant safety overalls and full-face filtration respirator'
    ]
  },
  {
    id: 'op-roof-timber',
    title: 'Structural Roof Truss & Attic Anti-Termite Treatment',
    category: 'Structural Termite',
    equipment: 'High-Pressure Knapsack Sprayer & Residual Wood Preservative Formulations',
    environment: 'Ceiling Frameworks, Attic Spaces, Timber Trusses, & Roofing Rafters',
    objective: 'Eradication of wood-boring insects, subterranean termites, and drywood termites before they compromise structural timber integrity.',
    image: ASSETS.roofTermiteTreatment,
    details: [
      'Trained technicians ascend scaffolding to treat exposed wooden beams and joints',
      'Creates long-lasting chemical preservative barrier preventing wood decay and fungal infestation',
      'Follows strict HSE occupational fall-protection and head-protection protocols'
    ]
  },
  {
    id: 'op-precision-misting',
    title: 'Precision Window Track & Air-Vent Treatment',
    category: 'Precision Misting',
    equipment: 'Electric Handheld Aerosol Blower & Crevice Micro-Injector',
    environment: 'Aluminum Window Tracks, Sliding Door Runners, & Wall Expansion Joints',
    objective: 'Flushing out hidden crawling insects, spiders, scorpions, and insect eggs from architectural crevices without staining glass or aluminum finishes.',
    image: ASSETS.windowPrecisionMisting,
    details: [
      'High-velocity directional air displacement pushes microscopic repellent mist into narrow frame cavities',
      'Zero residue formulation safe for modern indoor corporate finishes',
      'Prevents insect infiltration through exterior window gaps'
    ]
  },
  {
    id: 'op-perimeter-barrier',
    title: 'Exterior Foundation & Perimeter Drain Chemical Barrier',
    category: 'Perimeter Barrier',
    equipment: 'Agricultural Knapsack Sprayer with Fan-Jet Brass Wand',
    environment: 'External Foundation Walls, Drainage Gutters, & Soakaway Environs',
    objective: 'Establishing an unbroken chemical repellent barrier around the building perimeter to stop pests, rodents, and reptiles from approaching living spaces.',
    image: ASSETS.perimeterFoundationSpray,
    details: [
      'Spraying along the foundation base and water discharge points',
      'Repels snakes, crawling lizards, ants, and outdoor cockroaches',
      'Weather-resistant residual formulation that withstands seasonal rainfall'
    ]
  },
  {
    id: 'op-indoor-sanitization',
    title: 'Institutional Facility & Classroom Floor Sanitization',
    category: 'Indoor Disinfection',
    equipment: 'Dual-Chamber Knapsack Sprayers & Eco-Friendly Odorless Sanitizers',
    environment: 'School Classrooms, Lecture Theaters, Administrative Offices, & Corridors',
    objective: 'Eradication of bedbugs, floor fleas, ants, and microbial pathogens in high-traffic learning environments and workplaces.',
    image: ASSETS.fumigationSpecialist,
    details: [
      'Applied across baseboards, beneath desks, behind storage cabinets, and tiled surfaces',
      'Quick-drying, low-odor formulation allowing classrooms to be re-occupied promptly',
      'Reduces airborne allergens and promotes healthier breathing conditions for students and staff'
    ]
  },
  {
    id: 'op-safety-calibration',
    title: 'Pre-Deployment Safety Calibration & Dual-Technician Protocol',
    category: 'Safety Protocol',
    equipment: 'Pressure Gauges, PPE Respirators, Chemical Mixing Tanks, & PPE Goggles',
    environment: 'Client Entry Point & Pre-Treatment Inspection Staging Area',
    objective: 'Adherence to ISO 14001:2005 EMS and ISO 9001:2015 QMS standards through mandatory equipment safety checks and dual-operator verification.',
    image: ASSETS.fumigationSpecialist,
    details: [
      'Two certified technicians inspect spray lance seals, tank pressure, and dilution ratios',
      'Pre-treatment walkthrough to ensure client food items, pet areas, and sensitive electronics are secured',
      'Post-treatment certificate of fumigation issued upon successful completion'
    ]
  }
];

export const FieldOperationsGallery: React.FC = () => {
  const [selectedOp, setSelectedOp] = useState<FieldOperation | null>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>(() => DataService.getPhotos());
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

  const getDynamicImageForOp = (op: FieldOperation): string => {
    const findPhoto = (id: string) => photos.find((p) => p.id === id)?.image;
    if (op.id === 'op-thermal-fogging') return findPhoto('gal-thermal-fogging') || op.image;
    if (op.id === 'op-roof-timber') return findPhoto('gal-roof-termite') || op.image;
    if (op.id === 'op-precision-misting') return findPhoto('gal-window-misting') || op.image;
    if (op.id === 'op-perimeter-barrier') return findPhoto('gal-foundation-spray') || op.image;
    if (op.id === 'op-indoor-sanitization' || op.id === 'op-safety-calibration') {
      return findPhoto('gal-specialist-ppe') || siteSettings.serviceFumigationImage || op.image;
    }
    return op.image;
  };

  const operationsWithEditableImages = FIELD_OPERATIONS.map((op) => ({
    ...op,
    image: getDynamicImageForOp(op)
  }));

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
          Field Operations Documentation
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          Real Operational Methodologies &amp; On-Site Deployments
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
          Photographic and operational breakdown of Bright Light Integrated Services technicians in action across residential estates, commercial warehouses, schools, and outdoor facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operationsWithEditableImages.map((op) => (
          <div
            key={op.id}
            onClick={() => setSelectedOp(op)}
            className="group p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Operation Photo */}
              <div className="aspect-16/10 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 relative">
                <img
                  src={op.image}
                  alt={op.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-white bg-slate-950/80 backdrop-blur-xs px-2 py-0.5 rounded">
                    {op.category}
                  </span>
                </div>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-amber-800 transition-colors">
                {op.title}
              </h4>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {op.objective}
              </p>

              <div className="pt-2 text-[11px] text-slate-500 space-y-1 border-t border-slate-100">
                <p className="truncate"><strong>Equipment:</strong> {op.equipment}</p>
                <p className="truncate"><strong>Environment:</strong> {op.environment}</p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold">
              <span>View On-Site Protocol</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedOp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  {selectedOp.category} · On-Site Protocol
                </span>
                <h3 className="text-lg font-bold">{selectedOp.title}</h3>
              </div>
              <button
                onClick={() => setSelectedOp(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
              {/* Full Image in Modal */}
              <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-900 border border-slate-200">
                <img
                  src={selectedOp.image}
                  alt={selectedOp.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <h5 className="font-bold text-slate-900 text-sm">Deployment Purpose &amp; Scope</h5>
                <p className="leading-relaxed">{selectedOp.objective}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <strong className="text-slate-900 block mb-1">Target Environments:</strong>
                  <span>{selectedOp.environment}</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <strong className="text-slate-900 block mb-1">Standard Equipment:</strong>
                  <span>{selectedOp.equipment}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <strong className="text-slate-900 block font-bold">Standard Operating Procedures:</strong>
                <ul className="space-y-2">
                  {selectedOp.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 bg-slate-50 rounded-md border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedOp(null)}
                className="px-5 py-2 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
