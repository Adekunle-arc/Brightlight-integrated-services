/**
 * Unified Firebase Firestore + Reactive Data Service for Bright Light Integrated Services
 * Persists operational photos, brand logo & CEO photo settings, customer enquiries,
 * training enrollments, equipment rental bookings, and Monday clinic consultations in Firebase Firestore.
 */

import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  Timestamp,
  Unsubscribe
} from 'firebase/firestore';
import {
  db,
  auth,
  onAuthStateChanged,
  onPasskeyChange,
  isAdminOrPasskeyAuthorized,
  OperationType,
  handleFirestoreError
} from '../firebase';
import { ASSETS } from '../data/assets';
import { COMPANY_INFO } from '../data/companyData';

export interface SiteSettings {
  id: string;
  logoImage: string; // Empty string means use default OfficialLogo vector emblem
  ceoPhoto: string;  // Defaults to ASSETS.medicalDoctors
  ceoName: string;
  ceoTitle: string;
  serviceMedicalImage: string;    // Pillar 01: Healthcare & Medical Supplies
  serviceFumigationImage: string; // Pillar 02: Fumigation & Pest Control
  serviceTrainingImage: string;   // Pillar 03: Professional Healthcare Training
  serviceRentalsImage: string;    // Pillar 04: QRFS Rentals & Merchandise
  updatedAt: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  organization?: string;
  phone: string;
  email: string;
  services: string[];
  state: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'contacted';
}

export interface TrainingRegistration {
  id: string;
  fullName: string;
  organization?: string;
  email: string;
  phone: string;
  course: string;
  trainingModel: 'individual' | 'corporate_group';
  candidateCount: number;
  location: string;
  notes?: string;
  createdAt: string;
  status: 'new' | 'confirmed';
}

export interface RentalBooking {
  id: string;
  contactName: string;
  organization?: string;
  phone: string;
  email: string;
  items: string[];
  eventStartDate: string;
  eventEndDate: string;
  venueAddress: string;
  state: string;
  requiresDriver: boolean;
  notes?: string;
  createdAt: string;
  status: 'received' | 'processed';
}

export interface CommunityHealthInquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  ageBracket?: string;
  preferredConsultationDate?: string;
  healthConcernSummary: string;
  locationState: string;
  isMondayFreeClinic: boolean;
  createdAt: string;
  status: 'scheduled' | 'pending';
}

export interface PhotoItem {
  id: string;
  title: string;
  category: 'fumigation' | 'medical' | 'training' | 'rentals' | 'corporate';
  image: string; // Base64 data URL or external URL
  description: string;
  location: string;
  dateTag: string;
  featuredOnHome?: boolean;
  isCustomUpload?: boolean;
  authorUid?: string;
  createdAt: string;
}

// Local Storage Cache Keys (for instant initial paint & offline fallback)
const QUOTES_KEY = 'brilis_quotes_collection';
const TRAINING_KEY = 'brilis_training_collection';
const RENTALS_KEY = 'brilis_rentals_collection';
const HEALTH_KEY = 'brilis_health_inquiries';
const PHOTOS_KEY = 'brilis_photos_collection_v2';
const SITE_SETTINGS_KEY = 'brilis_site_settings_v1';

export const getDefaultSiteSettings = (): SiteSettings => ({
  id: 'global',
  logoImage: '',
  ceoPhoto: ASSETS.medicalDoctors,
  ceoName: COMPANY_INFO.ceo.name,
  ceoTitle: `${COMPANY_INFO.ceo.title} (${COMPANY_INFO.ceo.qualifications})`,
  serviceMedicalImage: ASSETS.medicalDoctors,
  serviceFumigationImage: ASSETS.fumigationSpecialist,
  serviceTrainingImage: ASSETS.trainingHall,
  serviceRentalsImage: ASSETS.projectorPaRentalGear,
  updatedAt: new Date().toISOString()
});

// Initial default operational photos
export const getDefaultPhotos = (): PhotoItem[] => [
  {
    id: 'gal-thermal-fogging',
    title: 'Outdoor Perimeter Thermal Fogging Operation',
    category: 'fumigation',
    image: ASSETS.outdoorThermalFogging,
    description: 'Industrial pulse-jet thermal fogger deployed for mosquito knockdown, dengue vector suppression, and reptile deterrence along estate boundary walls and tree canopies.',
    location: 'Estate Perimeter, Ogun & Lagos',
    dateTag: 'Vector Control',
    featuredOnHome: true,
    isCustomUpload: false,
    createdAt: '2026-09-10T10:00:00Z'
  },
  {
    id: 'gal-roof-termite',
    title: 'Roof Truss & Structural Timber Anti-Termite Treatment',
    category: 'fumigation',
    image: ASSETS.roofTermiteTreatment,
    description: 'Technician operating in attic rafters applying high-penetration anti-termite wood preservatives to prevent structural timber decay.',
    location: 'Institutional & Residential Rafters',
    dateTag: 'Timber Protection',
    featuredOnHome: true,
    isCustomUpload: false,
    createdAt: '2026-09-09T10:00:00Z'
  },
  {
    id: 'gal-foundation-spray',
    title: 'Exterior Building Foundation Barrier Spraying',
    category: 'fumigation',
    image: ASSETS.perimeterFoundationSpray,
    description: 'Knapsack barrier spray protocol sealing external masonry walls and perimeter drains against crawling pests, ants, and outdoor cockroaches.',
    location: 'Commercial Building Perimeter',
    dateTag: 'Barrier Defense',
    featuredOnHome: true,
    isCustomUpload: false,
    createdAt: '2026-09-08T10:00:00Z'
  },
  {
    id: 'gal-window-misting',
    title: 'Precision Window Track & Crevice Dusting',
    category: 'fumigation',
    image: ASSETS.windowPrecisionMisting,
    description: 'Handheld electric micro-mister flushing out aluminum sliding window runners and expansion joints with zero residue.',
    location: 'Corporate Office Premises',
    dateTag: 'Precision Misting',
    featuredOnHome: true,
    isCustomUpload: false,
    createdAt: '2026-09-07T10:00:00Z'
  },
  {
    id: 'gal-projector-rentals',
    title: 'Multimedia Projectors & Sound System Fleet',
    category: 'rentals',
    image: ASSETS.projectorPaRentalGear,
    description: 'High-lumen Epson projectors, portable wide projection screens, and UHF dual wireless microphone PA systems staged for corporate conferences.',
    location: 'QRFS Logistics Depot, Aseese HQ',
    dateTag: 'Audio-Visual Gear',
    featuredOnHome: true,
    isCustomUpload: false,
    createdAt: '2026-09-06T10:00:00Z'
  },
  {
    id: 'gal-training-hall',
    title: 'CPD Accredited First Aid & CPR Training Hall',
    category: 'training',
    image: ASSETS.trainingHall,
    description: 'Interactive resuscitation practicals and emergency life support simulations for corporate safety officers and healthcare assistants.',
    location: 'Head Office Training Hall, Ogun State',
    dateTag: 'CPD UK Accredited',
    featuredOnHome: false,
    isCustomUpload: false,
    createdAt: '2026-09-05T10:00:00Z'
  },
  {
    id: 'gal-health-screening',
    title: 'Clinical Medical Consultation & Health Outreach',
    category: 'medical',
    image: ASSETS.medicalDoctors,
    description: 'Dr. Okezie Eze Miracle and the medical department providing comprehensive vital signs assessments and preventive health talks.',
    location: 'Community Center, Ogun State',
    dateTag: 'Health Outreach',
    featuredOnHome: false,
    isCustomUpload: false,
    createdAt: '2026-09-04T10:00:00Z'
  },
  {
    id: 'gal-hall-rentals',
    title: 'Executive Air-Conditioned Seminar Venue Setup',
    category: 'rentals',
    image: ASSETS.eventRentals,
    description: 'Neat banquet and conference seating arrangement with integrated audiovisual presentation display for institutional events.',
    location: 'Corporate Event Facility',
    dateTag: 'Corporate Venue',
    featuredOnHome: false,
    isCustomUpload: false,
    createdAt: '2026-09-03T10:00:00Z'
  },
  {
    id: 'gal-specialist-ppe',
    title: 'Safety Compliant Pest Control Specialist in Full PPE',
    category: 'fumigation',
    image: ASSETS.fumigationSpecialist,
    description: 'Field operative outfitted with respirator filtration mask, chemical-resistant overalls, and professional pressure sprayer.',
    location: 'Facility Pest Eradication Site',
    dateTag: 'Certified HSE',
    featuredOnHome: false,
    isCustomUpload: false,
    createdAt: '2026-09-02T10:00:00Z'
  },
  {
    id: 'gal-headquarters',
    title: 'Bright Light Corporate Operations Headquarters',
    category: 'corporate',
    image: ASSETS.heroBuilding,
    description: 'Corporate headquarters located at 64 Aseese Road, off Lagos-Ibadan Expressway, coordinating multi-state operations.',
    location: 'Aseese, Ogun State',
    dateTag: 'Headquarters',
    featuredOnHome: false,
    isCustomUpload: false,
    createdAt: '2026-09-01T10:00:00Z'
  }
];

function parseFirestoreTimestamp(val: unknown): string {
  if (!val) return new Date().toISOString();
  if (typeof val === 'string') return val;
  if (val instanceof Timestamp) return val.toDate().toISOString();
  if (typeof val === 'object' && val !== null && 'toDate' in val && typeof (val as { toDate: () => Date }).toDate === 'function') {
    return (val as { toDate: () => Date }).toDate().toISOString();
  }
  return new Date().toISOString();
}

const initializeSeedData = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(PHOTOS_KEY)) {
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(getDefaultPhotos()));
  }
  if (!localStorage.getItem(SITE_SETTINGS_KEY)) {
    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(getDefaultSiteSettings()));
  }
};

initializeSeedData();

// Internal listeners for reactive UI updates
const photoListeners: Array<() => void> = [];
const notifyPhotoListeners = () => {
  photoListeners.forEach((fn) => {
    try {
      fn();
    } catch (e) {
      console.error(e);
    }
  });
};

// Track whether Firestore photos collection is empty so Admin can auto-seed on first sign-in
let firestorePhotosEmpty = false;
let hasAttemptedPhotoSeed = false;

async function seedDefaultPhotosToFirestoreIfAdmin() {
  const user = auth.currentUser;
  if (!isAdminOrPasskeyAuthorized(user) || !firestorePhotosEmpty || hasAttemptedPhotoSeed) {
    return;
  }
  hasAttemptedPhotoSeed = true;
  const localPhotos = DataService.getPhotos();
  const photosToSeed = localPhotos.length > 0 ? localPhotos : getDefaultPhotos();
  const authorUid = user?.uid || 'admin-passkey';

  for (const item of photosToSeed) {
    const safeId = item.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
    try {
      await setDoc(doc(db, 'photos', safeId), {
        id: safeId,
        title: (item.title || 'Bright Light Field Operation').slice(0, 200),
        category: item.category || 'fumigation',
        image: (item.image || ASSETS.outdoorThermalFogging).slice(0, 950000),
        description: (item.description || 'Field operation by Bright Light Integrated Services.').slice(0, 2000),
        location: (item.location || 'Nigeria').slice(0, 200),
        dateTag: (item.dateTag || 'Field Operations').slice(0, 100),
        featuredOnHome: Boolean(item.featuredOnHome),
        isCustomUpload: Boolean(item.isCustomUpload),
        authorUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Failed to seed photo to Firestore:', error);
    }
  }
}

// 1. Public real-time listeners for `/photos` and `/siteSettings/global`
if (typeof window !== 'undefined') {
  const photosQuery = query(
    collection(db, 'photos'),
    where('category', 'in', ['fumigation', 'medical', 'training', 'rentals', 'corporate'])
  );

  onSnapshot(
    photosQuery,
    (snapshot) => {
      if (snapshot.empty) {
        firestorePhotosEmpty = true;
        seedDefaultPhotosToFirestoreIfAdmin();
        return;
      }
      firestorePhotosEmpty = false;
      const loadedPhotos: PhotoItem[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: String(d.id || docSnap.id),
          title: String(d.title || ''),
          category: (d.category as PhotoItem['category']) || 'fumigation',
          image: String(d.image || ''),
          description: String(d.description || ''),
          location: String(d.location || ''),
          dateTag: String(d.dateTag || ''),
          featuredOnHome: Boolean(d.featuredOnHome),
          isCustomUpload: Boolean(d.isCustomUpload),
          authorUid: d.authorUid ? String(d.authorUid) : undefined,
          createdAt: parseFirestoreTimestamp(d.createdAt)
        };
      });
      loadedPhotos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      localStorage.setItem(PHOTOS_KEY, JSON.stringify(loadedPhotos));
      notifyPhotoListeners();
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'photos');
      } catch {
        // Handled
      }
    }
  );

  // Real-time listener for `/siteSettings/global` (Company Logo & CEO Profile)
  onSnapshot(
    doc(db, 'siteSettings', 'global'),
    (docSnap) => {
      if (!docSnap.exists()) return;
      const d = docSnap.data();
      const defaults = getDefaultSiteSettings();
      const loadedSettings: SiteSettings = {
        id: 'global',
        logoImage: typeof d.logoImage === 'string' ? d.logoImage : defaults.logoImage,
        ceoPhoto: typeof d.ceoPhoto === 'string' && d.ceoPhoto ? d.ceoPhoto : defaults.ceoPhoto,
        ceoName: typeof d.ceoName === 'string' && d.ceoName ? d.ceoName : defaults.ceoName,
        ceoTitle: typeof d.ceoTitle === 'string' && d.ceoTitle ? d.ceoTitle : defaults.ceoTitle,
        serviceMedicalImage: typeof d.serviceMedicalImage === 'string' && d.serviceMedicalImage ? d.serviceMedicalImage : defaults.serviceMedicalImage,
        serviceFumigationImage: typeof d.serviceFumigationImage === 'string' && d.serviceFumigationImage ? d.serviceFumigationImage : defaults.serviceFumigationImage,
        serviceTrainingImage: typeof d.serviceTrainingImage === 'string' && d.serviceTrainingImage ? d.serviceTrainingImage : defaults.serviceTrainingImage,
        serviceRentalsImage: typeof d.serviceRentalsImage === 'string' && d.serviceRentalsImage ? d.serviceRentalsImage : defaults.serviceRentalsImage,
        updatedAt: parseFirestoreTimestamp(d.updatedAt)
      };
      localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(loadedSettings));
      notifyPhotoListeners();
    },
    () => {
      // Ignore if not created yet
    }
  );

  // 2. Admin-only real-time listeners for customer submissions (works with Google Auth OR Passkey Formidia1@)
  let adminUnsubs: Unsubscribe[] = [];

  const syncAdminListeners = () => {
    adminUnsubs.forEach((u) => u());
    adminUnsubs = [];

    if (isAdminOrPasskeyAuthorized(auth.currentUser)) {
      if (firestorePhotosEmpty) {
        seedDefaultPhotosToFirestoreIfAdmin();
      }

      const quotesUnsub = onSnapshot(
        query(collection(db, 'quotes'), where('status', 'in', ['pending', 'reviewed', 'contacted'])),
        (snap) => {
          const items: QuoteRequest[] = snap.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              id: String(d.id || docSnap.id),
              name: String(d.name || ''),
              organization: String(d.organization || ''),
              phone: String(d.phone || ''),
              email: String(d.email || ''),
              services: Array.isArray(d.services) ? d.services.map(String) : ['fum-pest'],
              state: String(d.state || ''),
              notes: String(d.notes || ''),
              status: (d.status as QuoteRequest['status']) || 'pending',
              createdAt: parseFirestoreTimestamp(d.createdAt)
            };
          });
          items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          localStorage.setItem(QUOTES_KEY, JSON.stringify(items));
          notifyPhotoListeners();
        },
        (err) => {
          try {
            handleFirestoreError(err, OperationType.LIST, 'quotes');
          } catch {
            // Handled
          }
        }
      );

      const trainingsUnsub = onSnapshot(
        query(collection(db, 'trainings'), where('status', 'in', ['new', 'confirmed'])),
        (snap) => {
          const items: TrainingRegistration[] = snap.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              id: String(d.id || docSnap.id),
              fullName: String(d.fullName || ''),
              organization: String(d.organization || ''),
              email: String(d.email || ''),
              phone: String(d.phone || ''),
              course: String(d.course || ''),
              trainingModel: (d.trainingModel as TrainingRegistration['trainingModel']) || 'individual',
              candidateCount: Number(d.candidateCount || 1),
              location: String(d.location || ''),
              notes: String(d.notes || ''),
              status: (d.status as TrainingRegistration['status']) || 'new',
              createdAt: parseFirestoreTimestamp(d.createdAt)
            };
          });
          items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          localStorage.setItem(TRAINING_KEY, JSON.stringify(items));
          notifyPhotoListeners();
        },
        (err) => {
          try {
            handleFirestoreError(err, OperationType.LIST, 'trainings');
          } catch {
            // Handled
          }
        }
      );

      const rentalsUnsub = onSnapshot(
        query(collection(db, 'rentals'), where('status', 'in', ['received', 'processed'])),
        (snap) => {
          const items: RentalBooking[] = snap.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              id: String(d.id || docSnap.id),
              contactName: String(d.contactName || ''),
              organization: String(d.organization || ''),
              phone: String(d.phone || ''),
              email: String(d.email || ''),
              items: Array.isArray(d.items) ? d.items.map(String) : ['Rental Item'],
              eventStartDate: String(d.eventStartDate || ''),
              eventEndDate: String(d.eventEndDate || ''),
              venueAddress: String(d.venueAddress || ''),
              state: String(d.state || ''),
              requiresDriver: Boolean(d.requiresDriver),
              notes: String(d.notes || ''),
              status: (d.status as RentalBooking['status']) || 'received',
              createdAt: parseFirestoreTimestamp(d.createdAt)
            };
          });
          items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          localStorage.setItem(RENTALS_KEY, JSON.stringify(items));
          notifyPhotoListeners();
        },
        (err) => {
          try {
            handleFirestoreError(err, OperationType.LIST, 'rentals');
          } catch {
            // Handled
          }
        }
      );

      const healthUnsub = onSnapshot(
        query(collection(db, 'healthInquiries'), where('status', 'in', ['scheduled', 'pending'])),
        (snap) => {
          const items: CommunityHealthInquiry[] = snap.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              id: String(d.id || docSnap.id),
              fullName: String(d.fullName || ''),
              phone: String(d.phone || ''),
              email: String(d.email || ''),
              ageBracket: String(d.ageBracket || ''),
              preferredConsultationDate: String(d.preferredConsultationDate || ''),
              healthConcernSummary: String(d.healthConcernSummary || ''),
              locationState: String(d.locationState || ''),
              isMondayFreeClinic: Boolean(d.isMondayFreeClinic),
              status: (d.status as CommunityHealthInquiry['status']) || 'scheduled',
              createdAt: parseFirestoreTimestamp(d.createdAt)
            };
          });
          items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          localStorage.setItem(HEALTH_KEY, JSON.stringify(items));
          notifyPhotoListeners();
        },
        (err) => {
          try {
            handleFirestoreError(err, OperationType.LIST, 'healthInquiries');
          } catch {
            // Handled
          }
        }
      );

      adminUnsubs.push(quotesUnsub, trainingsUnsub, rentalsUnsub, healthUnsub);
    }
  };

  onAuthStateChanged(auth, () => {
    syncAdminListeners();
  });

  onPasskeyChange(() => {
    syncAdminListeners();
  });
}

// Lookup service title from ID or return raw string
export function formatServiceIdToLabel(serviceId: string): string {
  const allServices = [
    ...COMPANY_INFO.services.fumigation,
    ...COMPANY_INFO.services.medical,
    ...COMPANY_INFO.services.training,
    ...COMPANY_INFO.services.rentals
  ];
  const found = allServices.find((s) => s.id === serviceId);
  return found ? found.title : serviceId;
}

export const DataService = {
  // Brand Logo & CEO Photo Site Settings
  getSiteSettings(): SiteSettings {
    try {
      const data = localStorage.getItem(SITE_SETTINGS_KEY);
      if (data) {
        return { ...getDefaultSiteSettings(), ...JSON.parse(data) };
      }
    } catch (e) {
      console.error(e);
    }
    return getDefaultSiteSettings();
  },

  async updateSiteSettings(updates: Partial<Omit<SiteSettings, 'id' | 'updatedAt'>>): Promise<SiteSettings> {
    const current = DataService.getSiteSettings();
    const defaults = getDefaultSiteSettings();
    const updated: SiteSettings = {
      id: 'global',
      logoImage: (updates.logoImage !== undefined ? updates.logoImage : current.logoImage).slice(0, 950000),
      ceoPhoto: (updates.ceoPhoto !== undefined && updates.ceoPhoto ? updates.ceoPhoto : current.ceoPhoto || defaults.ceoPhoto).slice(0, 950000),
      ceoName: (updates.ceoName !== undefined && updates.ceoName.trim() ? updates.ceoName.trim() : current.ceoName || defaults.ceoName).slice(0, 200),
      ceoTitle: (updates.ceoTitle !== undefined && updates.ceoTitle.trim() ? updates.ceoTitle.trim() : current.ceoTitle || defaults.ceoTitle).slice(0, 200),
      serviceMedicalImage: (updates.serviceMedicalImage !== undefined && updates.serviceMedicalImage ? updates.serviceMedicalImage : current.serviceMedicalImage || defaults.serviceMedicalImage).slice(0, 950000),
      serviceFumigationImage: (updates.serviceFumigationImage !== undefined && updates.serviceFumigationImage ? updates.serviceFumigationImage : current.serviceFumigationImage || defaults.serviceFumigationImage).slice(0, 950000),
      serviceTrainingImage: (updates.serviceTrainingImage !== undefined && updates.serviceTrainingImage ? updates.serviceTrainingImage : current.serviceTrainingImage || defaults.serviceTrainingImage).slice(0, 950000),
      serviceRentalsImage: (updates.serviceRentalsImage !== undefined && updates.serviceRentalsImage ? updates.serviceRentalsImage : current.serviceRentalsImage || defaults.serviceRentalsImage).slice(0, 950000),
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(updated));
    notifyPhotoListeners();

    if (isAdminOrPasskeyAuthorized(auth.currentUser)) {
      try {
        await setDoc(doc(db, 'siteSettings', 'global'), {
          id: 'global',
          logoImage: updated.logoImage,
          ceoPhoto: updated.ceoPhoto,
          ceoName: updated.ceoName,
          ceoTitle: updated.ceoTitle,
          serviceMedicalImage: updated.serviceMedicalImage,
          serviceFumigationImage: updated.serviceFumigationImage,
          serviceTrainingImage: updated.serviceTrainingImage,
          serviceRentalsImage: updated.serviceRentalsImage,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'siteSettings/global');
      }
    }

    return updated;
  },

  async resetSiteSettings(): Promise<SiteSettings> {
    const defaults = getDefaultSiteSettings();
    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(defaults));
    notifyPhotoListeners();

    if (isAdminOrPasskeyAuthorized(auth.currentUser)) {
      try {
        await setDoc(doc(db, 'siteSettings', 'global'), {
          id: 'global',
          logoImage: defaults.logoImage,
          ceoPhoto: defaults.ceoPhoto,
          ceoName: defaults.ceoName,
          ceoTitle: defaults.ceoTitle,
          serviceMedicalImage: defaults.serviceMedicalImage,
          serviceFumigationImage: defaults.serviceFumigationImage,
          serviceTrainingImage: defaults.serviceTrainingImage,
          serviceRentalsImage: defaults.serviceRentalsImage,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'siteSettings/global');
      }
    }
    return defaults;
  },

  // Automatic Background Email & WhatsApp Dispatch for Customer Submissions
  autoDispatchCompanyNotification(params: {
    type: string;
    refId: string;
    name: string;
    organization?: string;
    phone: string;
    email?: string;
    details: string;
    location: string;
    notes?: string;
  }) {
    if (typeof window === 'undefined') return;

    const subject = `[${params.refId}] New ${params.type} from ${params.name}${params.organization ? ` (${params.organization})` : ''}`;
    const whatsappUrl = DataService.buildWhatsAppDispatchUrl(params);

    // 1. Automatic background email dispatch to Bright Light official email
    const emailPayload = {
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      Reference_ID: params.refId,
      Submission_Type: params.type,
      Client_Name: params.name,
      Organization: params.organization || 'N/A',
      Phone_Number: params.phone,
      Client_Email: params.email || 'N/A',
      Location_State: params.location,
      Requested_Details: params.details,
      Additional_Notes: params.notes || 'None',
      Direct_WhatsApp_Link: whatsappUrl,
      Submitted_At: new Date().toLocaleString()
    };

    COMPANY_INFO.emails.forEach((companyEmail) => {
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(companyEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(emailPayload)
      }).catch(() => {
        // Silent background fallback if offline
      });
    });

    // 2. Automatic WhatsApp notification dispatch
    try {
      const a = document.createElement('a');
      a.href = whatsappUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      // Ignore if blocked by browser context
    }
  },

  // Direct WhatsApp & Email Dispatch Builders for Customer Enquiries
  buildWhatsAppDispatchUrl(params: {
    type: string;
    refId: string;
    name: string;
    organization?: string;
    phone: string;
    email?: string;
    details: string;
    location: string;
    notes?: string;
  }): string {
    const lines = [
      `*NEW ${params.type.toUpperCase()} — BRIGHT LIGHT INTEGRATED SERVICES*`,
      `Reference ID: *${params.refId}*`,
      `--------------------------------`,
      `*Client Name:* ${params.name}`,
      params.organization ? `*Organization:* ${params.organization}` : '',
      `*Phone:* ${params.phone}`,
      params.email ? `*Email:* ${params.email}` : '',
      `*Location / State:* ${params.location}`,
      `*Requested Services / Details:* ${params.details}`,
      params.notes ? `*Additional Notes:* ${params.notes}` : '',
      `--------------------------------`,
      `Sent via Bright Light Official Website (RC: ${COMPANY_INFO.rcNumber})`
    ].filter(Boolean).join('\n');

    return `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(lines)}`;
  },

  buildEmailDispatchUrl(params: {
    type: string;
    refId: string;
    name: string;
    organization?: string;
    phone: string;
    email?: string;
    details: string;
    location: string;
    notes?: string;
  }): string {
    const subject = `[${params.refId}] New ${params.type} from ${params.name}${params.organization ? ` (${params.organization})` : ''}`;
    const body = [
      `BRIGHT LIGHT INTEGRATED SERVICES (RC: ${COMPANY_INFO.rcNumber})`,
      `New ${params.type} Notification`,
      `Reference ID: ${params.refId}`,
      ``,
      `Client Name: ${params.name}`,
      params.organization ? `Organization: ${params.organization}` : '',
      `Phone Number: ${params.phone}`,
      params.email ? `Email Address: ${params.email}` : '',
      `Location / State: ${params.location}`,
      `Requested Services / Details: ${params.details}`,
      params.notes ? `Additional Notes: ${params.notes}` : '',
      ``,
      `Submitted on: ${new Date().toLocaleString()}`
    ].filter((l) => l !== undefined).join('\n');

    return `mailto:${COMPANY_INFO.emails[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  },

  // Enquiries / Quotes
  async submitQuote(quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): Promise<QuoteRequest> {
    const id = `ENQ-${Date.now().toString().slice(-6)}`;
    const newQuote: QuoteRequest = {
      id,
      name: quote.name.trim().slice(0, 200),
      organization: (quote.organization || '').trim().slice(0, 200),
      phone: quote.phone.trim().slice(0, 50),
      email: quote.email.trim().slice(0, 200),
      services: (quote.services.length > 0 ? quote.services : ['fum-pest']).slice(0, 20).map((s) => s.slice(0, 100)),
      state: (quote.state || 'Ogun State').trim().slice(0, 100),
      notes: (quote.notes || '').trim().slice(0, 2000),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    const list = DataService.getQuotes();
    list.unshift(newQuote);
    localStorage.setItem(QUOTES_KEY, JSON.stringify(list));
    notifyPhotoListeners();

    DataService.autoDispatchCompanyNotification({
      type: 'Service & Rental Enquiry',
      refId: newQuote.id,
      name: newQuote.name,
      organization: newQuote.organization,
      phone: newQuote.phone,
      email: newQuote.email,
      details: newQuote.services.map(formatServiceIdToLabel).join(', '),
      location: newQuote.state,
      notes: newQuote.notes
    });

    try {
      await setDoc(doc(db, 'quotes', id), {
        id: newQuote.id,
        name: newQuote.name,
        organization: newQuote.organization || '',
        phone: newQuote.phone,
        email: newQuote.email,
        services: newQuote.services,
        state: newQuote.state,
        notes: newQuote.notes || '',
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `quotes/${id}`);
    }

    return newQuote;
  },

  getQuotes(): QuoteRequest[] {
    try {
      const data = localStorage.getItem(QUOTES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async updateQuoteStatus(id: string, status: QuoteRequest['status']) {
    const list = DataService.getQuotes();
    const item = list.find((q) => q.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(QUOTES_KEY, JSON.stringify(list));
      notifyPhotoListeners();
    }
    if (isAdminOrPasskeyAuthorized(auth.currentUser)) {
      try {
        await updateDoc(doc(db, 'quotes', id), {
          status,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `quotes/${id}`);
      }
    }
  },

  async deleteQuote(id: string) {
    const list = DataService.getQuotes().filter((q) => q.id !== id);
    localStorage.setItem(QUOTES_KEY, JSON.stringify(list));
    notifyPhotoListeners();
    if (isAdminOrPasskeyAuthorized(auth.currentUser)) {
      try {
        await deleteDoc(doc(db, 'quotes', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `quotes/${id}`);
      }
    }
  },

  // Training
  async submitTraining(training: Omit<TrainingRegistration, 'id' | 'createdAt' | 'status'>): Promise<TrainingRegistration> {
    const id = `TRN-${Date.now().toString().slice(-6)}`;
    const newReg: TrainingRegistration = {
      id,
      fullName: training.fullName.trim().slice(0, 200),
      organization: (training.organization || '').trim().slice(0, 200),
      email: training.email.trim().slice(0, 200),
      phone: training.phone.trim().slice(0, 50),
      course: training.course.trim().slice(0, 250),
      trainingModel: training.trainingModel === 'corporate_group' ? 'corporate_group' : 'individual',
      candidateCount: Math.max(1, Math.min(10000, Math.floor(Number(training.candidateCount) || 1))),
      location: (training.location || 'Ogun State Head Office').trim().slice(0, 200),
      notes: (training.notes || '').trim().slice(0, 2000),
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    const list = DataService.getTrainings();
    list.unshift(newReg);
    localStorage.setItem(TRAINING_KEY, JSON.stringify(list));
    notifyPhotoListeners();

    DataService.autoDispatchCompanyNotification({
      type: 'Healthcare Training Registration',
      refId: newReg.id,
      name: newReg.fullName,
      organization: newReg.organization,
      phone: newReg.phone,
      email: newReg.email,
      details: `${newReg.course} (${newReg.trainingModel === 'corporate_group' ? 'Corporate Group' : 'Individual'} - ${newReg.candidateCount} candidate(s))`,
      location: newReg.location,
      notes: newReg.notes
    });

    try {
      await setDoc(doc(db, 'trainings', id), {
        id: newReg.id,
        fullName: newReg.fullName,
        organization: newReg.organization || '',
        email: newReg.email,
        phone: newReg.phone,
        course: newReg.course,
        trainingModel: newReg.trainingModel,
        candidateCount: newReg.candidateCount,
        location: newReg.location,
        notes: newReg.notes || '',
        status: 'new',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `trainings/${id}`);
    }

    return newReg;
  },

  getTrainings(): TrainingRegistration[] {
    try {
      const data = localStorage.getItem(TRAINING_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async updateTrainingStatus(id: string, status: TrainingRegistration['status']) {
    const list = DataService.getTrainings();
    const item = list.find((t) => t.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(TRAINING_KEY, JSON.stringify(list));
      notifyPhotoListeners();
    }
    if (isAdminOrPasskeyAuthorized(auth.currentUser)) {
      try {
        await updateDoc(doc(db, 'trainings', id), {
          status,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `trainings/${id}`);
      }
    }
  },

  // Rentals
  async submitRental(rental: Omit<RentalBooking, 'id' | 'createdAt' | 'status'>): Promise<RentalBooking> {
    const id = `RNT-${Date.now().toString().slice(-6)}`;
    const newRental: RentalBooking = {
      id,
      contactName: rental.contactName.trim().slice(0, 200),
      organization: (rental.organization || '').trim().slice(0, 200),
      phone: rental.phone.trim().slice(0, 50),
      email: rental.email.trim().slice(0, 200),
      items: (rental.items.length > 0 ? rental.items : ['Equipment Rental']).slice(0, 20).map((i) => i.slice(0, 200)),
      eventStartDate: (rental.eventStartDate || 'TBD').trim().slice(0, 64),
      eventEndDate: (rental.eventEndDate || 'TBD').trim().slice(0, 64),
      venueAddress: (rental.venueAddress || 'Client Venue').trim().slice(0, 500),
      state: (rental.state || 'Ogun State').trim().slice(0, 100),
      requiresDriver: Boolean(rental.requiresDriver),
      notes: (rental.notes || '').trim().slice(0, 2000),
      createdAt: new Date().toISOString(),
      status: 'received'
    };

    const list = DataService.getRentals();
    list.unshift(newRental);
    localStorage.setItem(RENTALS_KEY, JSON.stringify(list));
    notifyPhotoListeners();

    DataService.autoDispatchCompanyNotification({
      type: 'Equipment Rental Booking',
      refId: newRental.id,
      name: newRental.contactName,
      organization: newRental.organization,
      phone: newRental.phone,
      email: newRental.email,
      details: `${newRental.items.join(', ')} (${newRental.eventStartDate} to ${newRental.eventEndDate})`,
      location: `${newRental.venueAddress}, ${newRental.state}`,
      notes: newRental.notes
    });

    try {
      await setDoc(doc(db, 'rentals', id), {
        id: newRental.id,
        contactName: newRental.contactName,
        organization: newRental.organization || '',
        phone: newRental.phone,
        email: newRental.email,
        items: newRental.items,
        eventStartDate: newRental.eventStartDate,
        eventEndDate: newRental.eventEndDate,
        venueAddress: newRental.venueAddress,
        state: newRental.state,
        requiresDriver: newRental.requiresDriver,
        notes: newRental.notes || '',
        status: 'received',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `rentals/${id}`);
    }

    return newRental;
  },

  getRentals(): RentalBooking[] {
    try {
      const data = localStorage.getItem(RENTALS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async updateRentalStatus(id: string, status: RentalBooking['status']) {
    const list = DataService.getRentals();
    const item = list.find((r) => r.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(RENTALS_KEY, JSON.stringify(list));
      notifyPhotoListeners();
    }
    if (isAdminOrPasskeyAuthorized(auth.currentUser)) {
      try {
        await updateDoc(doc(db, 'rentals', id), {
          status,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `rentals/${id}`);
      }
    }
  },

  // Health / Free Monday Consultation
  async submitHealthInquiry(inquiry: Omit<CommunityHealthInquiry, 'id' | 'createdAt' | 'status'>): Promise<CommunityHealthInquiry> {
    const id = `HLT-${Date.now().toString().slice(-6)}`;
    const newInquiry: CommunityHealthInquiry = {
      id,
      fullName: inquiry.fullName.trim().slice(0, 200),
      phone: inquiry.phone.trim().slice(0, 50),
      email: (inquiry.email || '').trim().slice(0, 200),
      ageBracket: (inquiry.ageBracket || '').trim().slice(0, 64),
      preferredConsultationDate: (inquiry.preferredConsultationDate || '').trim().slice(0, 64),
      healthConcernSummary: (inquiry.healthConcernSummary || 'General Consultation').trim().slice(0, 2000),
      locationState: (inquiry.locationState || 'Ogun State').trim().slice(0, 100),
      isMondayFreeClinic: Boolean(inquiry.isMondayFreeClinic),
      createdAt: new Date().toISOString(),
      status: 'scheduled'
    };

    const list = DataService.getHealthInquiries();
    list.unshift(newInquiry);
    localStorage.setItem(HEALTH_KEY, JSON.stringify(list));
    notifyPhotoListeners();

    DataService.autoDispatchCompanyNotification({
      type: 'Monday Free Health Clinic Consultation',
      refId: newInquiry.id,
      name: newInquiry.fullName,
      phone: newInquiry.phone,
      email: newInquiry.email,
      details: `${newInquiry.healthConcernSummary} (${newInquiry.ageBracket || 'Adult'})`,
      location: newInquiry.locationState,
      notes: newInquiry.preferredConsultationDate ? `Preferred Date: ${newInquiry.preferredConsultationDate}` : undefined
    });

    try {
      await setDoc(doc(db, 'healthInquiries', id), {
        id: newInquiry.id,
        fullName: newInquiry.fullName,
        phone: newInquiry.phone,
        email: newInquiry.email || '',
        ageBracket: newInquiry.ageBracket || '',
        preferredConsultationDate: newInquiry.preferredConsultationDate || '',
        healthConcernSummary: newInquiry.healthConcernSummary,
        locationState: newInquiry.locationState,
        isMondayFreeClinic: newInquiry.isMondayFreeClinic,
        status: 'scheduled',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `healthInquiries/${id}`);
    }

    return newInquiry;
  },

  getHealthInquiries(): CommunityHealthInquiry[] {
    try {
      const data = localStorage.getItem(HEALTH_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async updateHealthStatus(id: string, status: CommunityHealthInquiry['status']) {
    const list = DataService.getHealthInquiries();
    const item = list.find((h) => h.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(HEALTH_KEY, JSON.stringify(list));
      notifyPhotoListeners();
    }
    if (isAdminOrPasskeyAuthorized(auth.currentUser)) {
      try {
        await updateDoc(doc(db, 'healthInquiries', id), {
          status,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `healthInquiries/${id}`);
      }
    }
  },

  // Photos & Media Management (Synced with Firebase Firestore)
  getPhotos(): PhotoItem[] {
    try {
      const data = localStorage.getItem(PHOTOS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error(e);
    }
    return getDefaultPhotos();
  },

  async addPhoto(photo: Omit<PhotoItem, 'id' | 'createdAt' | 'isCustomUpload'>): Promise<PhotoItem> {
    const id = `pic-${Date.now()}`;
    const user = auth.currentUser;
    const authorUid = user?.uid || 'admin-passkey';
    const newPhoto: PhotoItem = {
      id,
      title: photo.title.trim().slice(0, 200),
      category: photo.category,
      image: photo.image.slice(0, 950000),
      description: (photo.description || 'Field operations and verified service execution by Bright Light Integrated Services.').trim().slice(0, 2000),
      location: (photo.location || 'Nigeria').trim().slice(0, 200),
      dateTag: (photo.dateTag || 'Field Operations').trim().slice(0, 100),
      featuredOnHome: Boolean(photo.featuredOnHome),
      isCustomUpload: true,
      authorUid,
      createdAt: new Date().toISOString()
    };

    const current = DataService.getPhotos();
    current.unshift(newPhoto);
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(current));
    notifyPhotoListeners();

    if (isAdminOrPasskeyAuthorized(user)) {
      try {
        await setDoc(doc(db, 'photos', id), {
          id: newPhoto.id,
          title: newPhoto.title,
          category: newPhoto.category,
          image: newPhoto.image,
          description: newPhoto.description,
          location: newPhoto.location,
          dateTag: newPhoto.dateTag,
          featuredOnHome: Boolean(newPhoto.featuredOnHome),
          isCustomUpload: true,
          authorUid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, `photos/${id}`);
      }
    }

    return newPhoto;
  },

  async updatePhoto(id: string, updates: Partial<Omit<PhotoItem, 'id' | 'createdAt'>>): Promise<PhotoItem | null> {
    const current = DataService.getPhotos();
    const index = current.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const user = auth.currentUser;
    const authorUid = user?.uid || 'admin-passkey';
    const existingPhoto = current[index];
    const updated: PhotoItem = {
      ...existingPhoto,
      ...updates,
      title: (updates.title ?? existingPhoto.title).trim().slice(0, 200),
      description: (updates.description ?? existingPhoto.description).trim().slice(0, 2000),
      location: (updates.location ?? existingPhoto.location).trim().slice(0, 200),
      dateTag: (updates.dateTag ?? existingPhoto.dateTag).trim().slice(0, 100),
      image: (updates.image ?? existingPhoto.image).slice(0, 950000),
      featuredOnHome: updates.featuredOnHome !== undefined ? Boolean(updates.featuredOnHome) : Boolean(existingPhoto.featuredOnHome),
      authorUid
    };

    current[index] = updated;
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(current));
    notifyPhotoListeners();

    if (isAdminOrPasskeyAuthorized(user)) {
      const safeId = id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
      try {
        await updateDoc(doc(db, 'photos', safeId), {
          title: updated.title,
          category: updated.category,
          image: updated.image,
          description: updated.description,
          location: updated.location,
          dateTag: updated.dateTag,
          featuredOnHome: Boolean(updated.featuredOnHome),
          isCustomUpload: Boolean(updated.isCustomUpload),
          authorUid,
          updatedAt: serverTimestamp()
        });
      } catch {
        // If the photo didn't exist in Firestore yet (e.g., default local photo), create it
        try {
          await setDoc(doc(db, 'photos', safeId), {
            id: safeId,
            title: updated.title,
            category: updated.category,
            image: updated.image,
            description: updated.description,
            location: updated.location,
            dateTag: updated.dateTag,
            featuredOnHome: Boolean(updated.featuredOnHome),
            isCustomUpload: Boolean(updated.isCustomUpload),
            authorUid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `photos/${safeId}`);
        }
      }
    }

    return updated;
  },

  async deletePhoto(id: string) {
    const current = DataService.getPhotos().filter((p) => p.id !== id);
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(current));
    notifyPhotoListeners();

    const user = auth.currentUser;
    if (isAdminOrPasskeyAuthorized(user)) {
      const safeId = id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
      try {
        await deleteDoc(doc(db, 'photos', safeId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `photos/${safeId}`);
      }
    }
  },

  async resetPhotos() {
    const defaults = getDefaultPhotos();
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(defaults));
    notifyPhotoListeners();

    const user = auth.currentUser;
    const authorUid = user?.uid || 'admin-passkey';
    if (isAdminOrPasskeyAuthorized(user)) {
      for (const item of defaults) {
        const safeId = item.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
        try {
          await setDoc(doc(db, 'photos', safeId), {
            id: safeId,
            title: item.title.slice(0, 200),
            category: item.category,
            image: item.image.slice(0, 950000),
            description: item.description.slice(0, 2000),
            location: item.location.slice(0, 200),
            dateTag: item.dateTag.slice(0, 100),
            featuredOnHome: Boolean(item.featuredOnHome),
            isCustomUpload: false,
            authorUid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `photos/${safeId}`);
        }
      }
    }
  },

  onPhotosChange(callback: () => void) {
    photoListeners.push(callback);
    return () => {
      const idx = photoListeners.indexOf(callback);
      if (idx !== -1) photoListeners.splice(idx, 1);
    };
  }
};
