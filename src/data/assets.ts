import heroBuilding from '@/src/assets/images/hero_corporate_building_1790283052433.jpg';
import medicalDoctors from '@/src/assets/images/medical_outreach_doctors_1790283064387.jpg';
import trainingHall from '@/src/assets/images/professional_training_hall_1790283075606.jpg';
import fumigationSpecialist from '@/src/assets/images/fumigation_safety_specialist_1790283085695.jpg';
import eventRentals from '@/src/assets/images/corporate_event_rentals_1790283096416.jpg';

// Operational Real Work Photos
import outdoorThermalFogging from '@/src/assets/images/outdoor_thermal_fogging_1790284491683.jpg';
import roofTermiteTreatment from '@/src/assets/images/roof_termite_treatment_1790284502269.jpg';
import perimeterFoundationSpray from '@/src/assets/images/perimeter_foundation_spray_1790284513173.jpg';
import windowPrecisionMisting from '@/src/assets/images/window_precision_misting_1790284524070.jpg';
import projectorPaRentalGear from '@/src/assets/images/projector_pa_rental_gear_1790284534108.jpg';

export const ASSETS = {
  heroBuilding,
  medicalDoctors,
  trainingHall,
  fumigationSpecialist,
  eventRentals,
  outdoorThermalFogging,
  roofTermiteTreatment,
  perimeterFoundationSpray,
  windowPrecisionMisting,
  projectorPaRentalGear
};

export interface GalleryItem {
  id: string;
  title: string;
  category: 'medical' | 'training' | 'fumigation' | 'rentals';
  image: string;
  description: string;
  location: string;
  dateTag: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-thermal-fogging',
    title: 'Outdoor Perimeter Thermal Fogging Operation',
    category: 'fumigation',
    image: outdoorThermalFogging,
    description: 'Industrial pulse-jet thermal fogger deployed for mosquito knockdown, dengue vector suppression, and reptile deterrence along estate boundary walls and tree canopies.',
    location: 'Estate Perimeter, Ogun & Lagos',
    dateTag: 'Vector Control'
  },
  {
    id: 'gal-roof-termite',
    title: 'Roof Truss & Structural Timber Anti-Termite Treatment',
    category: 'fumigation',
    image: roofTermiteTreatment,
    description: 'Technician operating in attic rafters applying high-penetration anti-termite wood preservatives to prevent structural timber decay.',
    location: 'Institutional & Residential Rafters',
    dateTag: 'Timber Protection'
  },
  {
    id: 'gal-foundation-spray',
    title: 'Exterior Building Foundation Barrier Spraying',
    category: 'fumigation',
    image: perimeterFoundationSpray,
    description: 'Knapsack barrier spray protocol sealing external masonry walls and perimeter drains against crawling pests, ants, and outdoor cockroaches.',
    location: 'Commercial Building Perimeter',
    dateTag: 'Barrier Defense'
  },
  {
    id: 'gal-window-misting',
    title: 'Precision Window Track & Crevice Dusting',
    category: 'fumigation',
    image: windowPrecisionMisting,
    description: 'Handheld electric micro-mister flushing out aluminum sliding window runners and expansion joints with zero residue.',
    location: 'Corporate Office Premises',
    dateTag: 'Precision Misting'
  },
  {
    id: 'gal-projector-rentals',
    title: 'Multimedia Projectors & Sound System Fleet',
    category: 'rentals',
    image: projectorPaRentalGear,
    description: 'High-lumen Epson projectors, portable wide projection screens, and UHF dual wireless microphone PA systems staged for corporate conferences.',
    location: 'QRFS Logistics Depot, Aseese HQ',
    dateTag: 'Audio-Visual Gear'
  },
  {
    id: 'gal-training-hall',
    title: 'CPD Accredited First Aid & CPR Training Hall',
    category: 'training',
    image: trainingHall,
    description: 'Interactive resuscitation practicals and emergency life support simulations for corporate safety officers and healthcare assistants.',
    location: 'Head Office Training Hall, Ogun State',
    dateTag: 'CPD UK Accredited'
  },
  {
    id: 'gal-health-screening',
    title: 'Clinical Medical Consultation & Health Outreach',
    category: 'medical',
    image: medicalDoctors,
    description: 'Dr. Okezie Eze Miracle and the medical department providing comprehensive vital signs assessments and preventive health talks.',
    location: 'Community Center, Ogun State',
    dateTag: 'Health Outreach'
  },
  {
    id: 'gal-hall-rentals',
    title: 'Executive Air-Conditioned Seminar Venue Setup',
    category: 'rentals',
    image: eventRentals,
    description: 'Neat banquet and conference seating arrangement with integrated audiovisual presentation display for institutional events.',
    location: 'Corporate Event Facility',
    dateTag: 'Corporate Venue'
  }
];
