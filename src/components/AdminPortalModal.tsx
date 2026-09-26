import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle,
  Plus,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  AlertCircle,
  Check,
  ShieldCheck,
  LayoutDashboard,
  Pencil,
  LogIn,
  LogOut,
  Cloud,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  Award,
  UserCheck,
  ArrowLeft,
  Code2,
  Download
} from 'lucide-react';
import {
  generateStandaloneHtml,
  generateStandaloneCss,
  generateStandaloneJs,
  downloadTextFile
} from '../services/htmlExporter';
import {
  DataService,
  PhotoItem,
  SiteSettings,
  QuoteRequest,
  TrainingRegistration,
  RentalBooking,
  CommunityHealthInquiry,
  formatServiceIdToLabel
} from '../services/dataService';
import {
  auth,
  onAuthStateChanged,
  onPasskeyChange,
  signInAsAdmin,
  signOutAdmin,
  isAuthorizedAdmin,
  isPasskeyUnlocked,
  unlockWithPasskey,
  ADMIN_EMAIL,
  User
} from '../firebase';
import { COMPANY_INFO } from '../data/companyData';
import { ASSETS } from '../data/assets';
import { OfficialLogo } from './OfficialLogo';

interface AdminDashboardProps {
  isOpen?: boolean;
  onClose?: () => void;
  isFullPage?: boolean;
  onBackToSite?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen = true,
  onClose,
  isFullPage = false,
  onBackToSite
}) => {
  const [activeTab, setActiveTab] = useState<'branding' | 'photos' | 'enquiries' | 'trainings' | 'rentals' | 'health' | 'code'>('photos');

  // Auth & Passkey State
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [passkeyUnlocked, setPasskeyUnlocked] = useState<boolean>(() => isPasskeyUnlocked());
  const [passkeyInput, setPasskeyInput] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Site Branding (Logo, CEO Photo & 4 Service Division Pictures) State
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => DataService.getSiteSettings());
  const [logoPreview, setLogoPreview] = useState<string>(() => DataService.getSiteSettings().logoImage);
  const [ceoPhotoPreview, setCeoPhotoPreview] = useState<string>(() => DataService.getSiteSettings().ceoPhoto);
  const [ceoNameInput, setCeoNameInput] = useState<string>(() => DataService.getSiteSettings().ceoName);
  const [ceoTitleInput, setCeoTitleInput] = useState<string>(() => DataService.getSiteSettings().ceoTitle);
  const [serviceMedicalPreview, setServiceMedicalPreview] = useState<string>(() => DataService.getSiteSettings().serviceMedicalImage);
  const [serviceFumigationPreview, setServiceFumigationPreview] = useState<string>(() => DataService.getSiteSettings().serviceFumigationImage);
  const [serviceTrainingPreview, setServiceTrainingPreview] = useState<string>(() => DataService.getSiteSettings().serviceTrainingImage);
  const [serviceRentalsPreview, setServiceRentalsPreview] = useState<string>(() => DataService.getSiteSettings().serviceRentalsImage);
  const [isSavingBranding, setIsSavingBranding] = useState(false);
  const [brandingMessage, setBrandingMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const ceoPhotoInputRef = useRef<HTMLInputElement>(null);
  const serviceMedicalInputRef = useRef<HTMLInputElement>(null);
  const serviceFumigationInputRef = useRef<HTMLInputElement>(null);
  const serviceTrainingInputRef = useRef<HTMLInputElement>(null);
  const serviceRentalsInputRef = useRef<HTMLInputElement>(null);

  // Photo Upload & Edit State
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCategory, setPhotoCategory] = useState<PhotoItem['category']>('fumigation');
  const [photoLocation, setPhotoLocation] = useState('Aseese HQ, Ogun State');
  const [photoTag, setPhotoTag] = useState('Vector Control');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoImageSrc, setPhotoImageSrc] = useState<string>('');
  const [isFeatureOnHome, setIsFeatureOnHome] = useState(true);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formTopRef = useRef<HTMLDivElement>(null);

  // Submissions State
  const [enquiries, setEnquiries] = useState<QuoteRequest[]>([]);
  const [trainings, setTrainings] = useState<TrainingRegistration[]>([]);
  const [rentals, setRentals] = useState<RentalBooking[]>([]);
  const [healthInquiries, setHealthInquiries] = useState<CommunityHealthInquiry[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = () => {
    setPhotos(DataService.getPhotos());
    const currentBrand = DataService.getSiteSettings();
    setSiteSettings(currentBrand);
    setLogoPreview(currentBrand.logoImage);
    setCeoPhotoPreview(currentBrand.ceoPhoto);
    setCeoNameInput(currentBrand.ceoName);
    setCeoTitleInput(currentBrand.ceoTitle);
    setServiceMedicalPreview(currentBrand.serviceMedicalImage);
    setServiceFumigationPreview(currentBrand.serviceFumigationImage);
    setServiceTrainingPreview(currentBrand.serviceTrainingImage);
    setServiceRentalsPreview(currentBrand.serviceRentalsImage);
    setEnquiries(DataService.getQuotes());
    setTrainings(DataService.getTrainings());
    setRentals(DataService.getRentals());
    setHealthInquiries(DataService.getHealthInquiries());
  };

  useEffect(() => {
    loadData();
    const unsubData = DataService.onPhotosChange(() => {
      loadData();
    });
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthError(null);
    });
    const unsubPasskey = onPasskeyChange((unlocked) => {
      setPasskeyUnlocked(unlocked);
      setAuthError(null);
    });
    return () => {
      unsubData();
      unsubAuth();
      unsubPasskey();
    };
  }, []);

  const isAdminAuthenticated = isAuthorizedAdmin(currentUser) || passkeyUnlocked;

  const handlePasskeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!passkeyInput.trim()) {
      setAuthError('Please enter the Admin Passkey.');
      return;
    }
    const ok = unlockWithPasskey(passkeyInput);
    if (ok) {
      setPasskeyInput('');
      setAuthError(null);
      loadData();
    } else {
      setAuthError('Invalid Admin Passkey. Please check the passkey and try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const user = await signInAsAdmin();
      if (!isAuthorizedAdmin(user)) {
        setAuthError(
          `Signed in as ${user.email || 'unknown'}. Google access is restricted to ${ADMIN_EMAIL} (or use your Admin Passkey above).`
        );
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Google Sign-In was canceled or failed. You can sign in using the Admin Passkey above.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOutAdmin();
    setPasskeyUnlocked(false);
    setAuthError(null);
  };

  const handleExitPortal = () => {
    if (onClose) onClose();
    if (onBackToSite) onBackToSite();
  };

  // Generic image compressor helper (keeps base64 well under Firestore 1MB limit)
  const compressImageFile = (
    file: File,
    maxDim: number,
    outputFormat: 'image/jpeg' | 'image/png',
    onDone: (dataUrl: string, width: number, height: number) => void,
    onError: (msg: string) => void
  ) => {
    if (!file.type.startsWith('image/')) {
      onError('Please select a valid image file (JPG, PNG, WEBP, SVG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL(outputFormat, outputFormat === 'image/jpeg' ? 0.84 : undefined);
          onDone(dataUrl, width, height);
        } else {
          onDone(event.target?.result as string, width, height);
        }
      };
      img.onerror = () => onError('Failed to decode image file.');
      img.src = event.target?.result as string;
    };
    reader.onerror = () => onError('Failed to read image file.');
    reader.readAsDataURL(file);
  };

  // Logo Upload Handler
  const handleLogoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBrandingMessage(null);
    // Preserve transparency for PNG/SVG logos
    const format = file.type === 'image/png' || file.type === 'image/svg+xml' || file.type === 'image/webp'
      ? 'image/png'
      : 'image/jpeg';
    compressImageFile(
      file,
      500,
      format,
      (dataUrl) => {
        setLogoPreview(dataUrl);
        setBrandingMessage({
          type: 'success',
          text: 'Logo image ready! Click "Save Brand & CEO Settings" below to update the website logo.'
        });
      },
      (msg) => setBrandingMessage({ type: 'error', text: msg })
    );
  };

  // CEO Photo Upload Handler
  const handleCeoPhotoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBrandingMessage(null);
    compressImageFile(
      file,
      750,
      'image/jpeg',
      (dataUrl) => {
        setCeoPhotoPreview(dataUrl);
        setBrandingMessage({
          type: 'success',
          text: 'CEO portrait photo ready! Click "Save Service Pictures, Logo & CEO" below to publish.'
        });
      },
      (msg) => setBrandingMessage({ type: 'error', text: msg })
    );
  };

  // Service Division Picture Upload Handler
  const handleServiceImageFileSelect = (
    division: 'medical' | 'fumigation' | 'training' | 'rentals',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBrandingMessage(null);
    compressImageFile(
      file,
      750,
      'image/jpeg',
      (dataUrl) => {
        if (division === 'medical') setServiceMedicalPreview(dataUrl);
        if (division === 'fumigation') setServiceFumigationPreview(dataUrl);
        if (division === 'training') setServiceTrainingPreview(dataUrl);
        if (division === 'rentals') setServiceRentalsPreview(dataUrl);
        setBrandingMessage({
          type: 'success',
          text: 'Service division picture ready! Click "Save Service Pictures, Logo & CEO" below to publish across Home & Services pages.'
        });
      },
      (msg) => setBrandingMessage({ type: 'error', text: msg })
    );
  };

  const handleSaveBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBranding(true);
    setBrandingMessage(null);
    try {
      await DataService.updateSiteSettings({
        logoImage: logoPreview,
        ceoPhoto: ceoPhotoPreview,
        ceoName: ceoNameInput.trim() || COMPANY_INFO.ceo.name,
        ceoTitle: ceoTitleInput.trim() || `${COMPANY_INFO.ceo.title} (${COMPANY_INFO.ceo.qualifications})`,
        serviceMedicalImage: serviceMedicalPreview || ASSETS.medicalDoctors,
        serviceFumigationImage: serviceFumigationPreview || ASSETS.fumigationSpecialist,
        serviceTrainingImage: serviceTrainingPreview || ASSETS.trainingHall,
        serviceRentalsImage: serviceRentalsPreview || ASSETS.projectorPaRentalGear
      });
      setBrandingMessage({
        type: 'success',
        text: 'Service Division Pictures, Company Logo & CEO Profile saved to Firebase Cloud and updated live across the website!'
      });
    } catch (err) {
      console.error(err);
      setBrandingMessage({
        type: 'error',
        text: 'Failed to save settings to cloud.'
      });
    } finally {
      setIsSavingBranding(false);
    }
  };

  const handleRestoreDefaultBranding = async () => {
    setIsSavingBranding(true);
    try {
      const defaults = await DataService.resetSiteSettings();
      setLogoPreview(defaults.logoImage);
      setCeoPhotoPreview(defaults.ceoPhoto);
      setCeoNameInput(defaults.ceoName);
      setCeoTitleInput(defaults.ceoTitle);
      setServiceMedicalPreview(defaults.serviceMedicalImage);
      setServiceFumigationPreview(defaults.serviceFumigationImage);
      setServiceTrainingPreview(defaults.serviceTrainingImage);
      setServiceRentalsPreview(defaults.serviceRentalsImage);
      setBrandingMessage({
        type: 'success',
        text: 'Default Service Division Pictures, Official Emblem Logo, and CEO profile restored.'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingBranding(false);
    }
  };

  // Operational Gallery Photo File Reader
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingImage(true);
    setUploadMessage(null);

    compressImageFile(
      file,
      1100,
      'image/jpeg',
      (compressedDataUrl, width, height) => {
        setPhotoImageSrc(compressedDataUrl);
        setIsProcessingImage(false);
        setUploadMessage({
          type: 'success',
          text: `Image optimized (${width}x${height}px) for fast loading & Firebase storage. Click "${editingPhotoId ? 'Save Changes to Picture' : 'Publish Picture to Website'}".`
        });
      },
      (msg) => {
        setIsProcessingImage(false);
        setUploadMessage({ type: 'error', text: msg });
      }
    );
  };

  const handleStartEditPhoto = (photo: PhotoItem) => {
    setEditingPhotoId(photo.id);
    setPhotoTitle(photo.title);
    setPhotoCategory(photo.category);
    setPhotoLocation(photo.location);
    setPhotoTag(photo.dateTag);
    setPhotoDescription(photo.description);
    setPhotoImageSrc(photo.image);
    setIsFeatureOnHome(Boolean(photo.featuredOnHome));
    setUploadMessage({
      type: 'success',
      text: `Editing "${photo.title}". Modify any details or replace the picture below, then click "Save Changes to Picture".`
    });
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancelEdit = () => {
    setEditingPhotoId(null);
    setPhotoTitle('');
    setPhotoCategory('fumigation');
    setPhotoLocation('Aseese HQ, Ogun State');
    setPhotoTag('Vector Control');
    setPhotoDescription('');
    setPhotoImageSrc('');
    setIsFeatureOnHome(true);
    setUploadMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoImageSrc) {
      setUploadMessage({ type: 'error', text: 'Please select or upload a photo first.' });
      return;
    }
    if (!photoTitle.trim()) {
      setUploadMessage({ type: 'error', text: 'Please enter a title for this picture.' });
      return;
    }

    setIsSavingPhoto(true);
    try {
      if (editingPhotoId) {
        await DataService.updatePhoto(editingPhotoId, {
          title: photoTitle.trim(),
          category: photoCategory,
          image: photoImageSrc,
          description: photoDescription.trim() || `Field operations and verified service execution by Bright Light Integrated Services.`,
          location: photoLocation.trim() || 'Nigeria',
          dateTag: photoTag.trim() || 'Field Operations',
          featuredOnHome: isFeatureOnHome
        });

        setUploadMessage({
          type: 'success',
          text: 'Photo changes saved to Firebase Firestore and updated across the website!'
        });
        setEditingPhotoId(null);
      } else {
        await DataService.addPhoto({
          title: photoTitle.trim(),
          category: photoCategory,
          image: photoImageSrc,
          description: photoDescription.trim() || `Field operations and verified service execution by Bright Light Integrated Services.`,
          location: photoLocation.trim() || 'Nigeria',
          dateTag: photoTag.trim() || 'Field Operations',
          featuredOnHome: isFeatureOnHome
        });

        setUploadMessage({
          type: 'success',
          text: 'Photo published to Firebase Firestore! It is now live across all devices.'
        });
      }

      setPhotoTitle('');
      setPhotoDescription('');
      setPhotoImageSrc('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error(err);
      setUploadMessage({
        type: 'error',
        text: 'Could not save photo to Firebase. Please verify your connection and try again.'
      });
    } finally {
      setIsSavingPhoto(false);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    try {
      await DataService.deletePhoto(id);
      setConfirmDeleteId(null);
      if (editingPhotoId === id) {
        handleCancelEdit();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetPhotos = async () => {
    try {
      await DataService.resetPhotos();
      setConfirmReset(false);
      setUploadMessage({
        type: 'success',
        text: 'Default operational photos restored.'
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPhotos = selectedCategoryFilter === 'all'
    ? photos
    : photos.filter(p => p.category === selectedCategoryFilter);

  if (!isOpen && !isFullPage) return null;

  // ============================================================================
  // GATE 1: FULL-SCREEN ADMIN SIGN-IN FIRST (BEFORE ANYTHING SHOWS UP)
  // ============================================================================
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 w-screen h-screen bg-slate-950 text-white overflow-y-auto flex flex-col justify-between p-4 sm:p-8">
        {/* Top Bar */}
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between border-b border-slate-800/80 pb-4">
          <OfficialLogo variant="dark" size="sm" />
          <button
            type="button"
            onClick={handleExitPortal}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to Website</span>
          </button>
        </div>

        {/* Center Security Gate Card */}
        <div className="my-auto py-8 flex items-center justify-center">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400 block">
                Restricted Executive Access · RC: {COMPANY_INFO.rcNumber}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Admin Portal Sign-In
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sign in with your official Admin Passkey or authorized Google account to manage website photos, company logo, CEO portrait, and customer enquiries.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {/* Option 1: Instant Passkey Form */}
            <form onSubmit={handlePasskeySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Enter Admin Portal Passkey
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPasskey ? 'text' : 'password'}
                    required
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="Enter passkey..."
                    autoFocus
                    className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasskey(!showPasskey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                    title={showPasskey ? 'Hide passkey' : 'Show passkey'}
                  >
                    {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock Admin Dashboard</span>
              </button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="grow border-t border-slate-800"></div>
              <span className="shrink mx-3 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                Or Official Google Account
              </span>
              <div className="grow border-t border-slate-800"></div>
            </div>

            {/* Option 2: Google Account Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={authLoading}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>{authLoading ? 'Connecting to Google...' : `Sign in with ${ADMIN_EMAIL}`}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-6xl w-full mx-auto text-center border-t border-slate-900 pt-4 text-xs text-slate-500">
          Bright Light Integrated Services · Protected Operations Portal
        </div>
      </div>
    );
  }

  // ============================================================================
  // GATE 2: FULL-SCREEN ADMIN DASHBOARD (ONCE AUTHENTICATED)
  // ============================================================================
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-slate-100 flex flex-col overflow-hidden">
      {/* Full-Screen Top Header */}
      <div className="px-3 sm:px-8 py-3 bg-slate-950 text-white flex items-center justify-between gap-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold tracking-tight text-white truncate">
                Bright Light Admin Portal
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Cloud Sync Active
              </span>
            </div>
            <p className="hidden sm:block text-xs text-slate-400 truncate">
              Manage Service Pictures, Logo, CEO Portrait, Gallery Photos, and Customer Enquiries.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={loadData}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-red-900/80 text-slate-200 hover:text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
            title="Lock Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Lock</span>
          </button>

          <button
            type="button"
            onClick={handleExitPortal}
            className="px-2.5 sm:px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Mobile-Friendly Tab Navigation Bar (No Horizontal Scrollbar) */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap border-b border-slate-200 bg-white p-2 sm:px-8 sm:py-2 gap-1.5 sm:gap-2 text-xs font-semibold shrink-0 shadow-2xs">
        <button
          onClick={() => setActiveTab('photos')}
          className={`py-2 px-2.5 sm:px-3.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 ${
            activeTab === 'photos'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Gallery Photos ({photos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('branding')}
          className={`py-2 px-2.5 sm:px-3.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 ${
            activeTab === 'branding'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Service Pics, Logo &amp; CEO</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`py-2 px-2.5 sm:px-3.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 ${
            activeTab === 'enquiries'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span className="truncate">Enquiries ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rentals')}
          className={`py-2 px-2.5 sm:px-3.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 ${
            activeTab === 'rentals'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span className="truncate">Rentals ({rentals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('trainings')}
          className={`py-2 px-2.5 sm:px-3.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 ${
            activeTab === 'trainings'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span className="truncate">Training ({trainings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('health')}
          className={`py-2 px-2.5 sm:px-3.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 ${
            activeTab === 'health'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span className="truncate">Monday Clinic ({healthInquiries.length})</span>
        </button>
      </div>

      {/* Scrollable Main Content Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

          {/* TAB: SERVICE PICTURES, COMPANY LOGO & CEO PHOTO EDITOR */}
          {activeTab === 'branding' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  4 Service Division Pictures, Company Logo &amp; CEO Portrait Manager
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Replace any of the 4 core service division pictures (Medical, Fumigation, Training, Rentals), upload a custom company logo, or update Dr. Okezie Eze Miracle&apos;s portrait.
                </p>
              </div>

              {brandingMessage && (
                <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                  brandingMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-red-50 text-red-900 border border-red-200'
                }`}>
                  {brandingMessage.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{brandingMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSaveBranding} className="space-y-8">
                {/* SECTION A: EDITABLE 4 CORE SERVICE DIVISION PICTURES */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 block">
                        1. Core Capabilities &amp; Services Page Division Cards
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        Editable Pictures for All 4 Service Divisions
                      </h4>
                    </div>
                    <button
                      type="submit"
                      disabled={isSavingBranding}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isSavingBranding ? 'Saving...' : 'Save All Changes'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Service 01: Healthcare & Medical */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Pillar 01 · Medical
                          </span>
                          <button
                            type="button"
                            onClick={() => setServiceMedicalPreview(ASSETS.medicalDoctors)}
                            className="text-[11px] text-slate-500 hover:text-red-600 font-semibold cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900">
                          Healthcare &amp; Medical Supplies
                        </h5>
                        <div className="h-36 rounded-lg overflow-hidden bg-slate-200 border border-slate-300">
                          <img
                            src={serviceMedicalPreview || ASSETS.medicalDoctors}
                            alt="Medical Service Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <input
                          ref={serviceMedicalInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleServiceImageFileSelect('medical', e)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => serviceMedicalInputRef.current?.click()}
                          className="w-full py-2 px-3 border border-dashed border-amber-500 bg-amber-50/60 hover:bg-amber-100/70 text-slate-900 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-amber-700" />
                          <span>Change Medical Picture</span>
                        </button>
                        <input
                          type="url"
                          placeholder="Or paste image URL..."
                          value={serviceMedicalPreview.startsWith('http') ? serviceMedicalPreview : ''}
                          onChange={(e) => setServiceMedicalPreview(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* Service 02: Fumigation & Pest Control */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            Pillar 02 · Fumigation
                          </span>
                          <button
                            type="button"
                            onClick={() => setServiceFumigationPreview(ASSETS.fumigationSpecialist)}
                            className="text-[11px] text-slate-500 hover:text-red-600 font-semibold cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900">
                          Fumigation &amp; Pest Control
                        </h5>
                        <div className="h-36 rounded-lg overflow-hidden bg-slate-200 border border-slate-300">
                          <img
                            src={serviceFumigationPreview || ASSETS.fumigationSpecialist}
                            alt="Fumigation Service Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <input
                          ref={serviceFumigationInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleServiceImageFileSelect('fumigation', e)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => serviceFumigationInputRef.current?.click()}
                          className="w-full py-2 px-3 border border-dashed border-amber-500 bg-amber-50/60 hover:bg-amber-100/70 text-slate-900 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-amber-700" />
                          <span>Change Fumigation Picture</span>
                        </button>
                        <input
                          type="url"
                          placeholder="Or paste image URL..."
                          value={serviceFumigationPreview.startsWith('http') ? serviceFumigationPreview : ''}
                          onChange={(e) => setServiceFumigationPreview(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* Service 03: Professional Healthcare Training */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            Pillar 03 · Training
                          </span>
                          <button
                            type="button"
                            onClick={() => setServiceTrainingPreview(ASSETS.trainingHall)}
                            className="text-[11px] text-slate-500 hover:text-red-600 font-semibold cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900">
                          Professional Healthcare Training
                        </h5>
                        <div className="h-36 rounded-lg overflow-hidden bg-slate-200 border border-slate-300">
                          <img
                            src={serviceTrainingPreview || ASSETS.trainingHall}
                            alt="Training Service Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <input
                          ref={serviceTrainingInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleServiceImageFileSelect('training', e)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => serviceTrainingInputRef.current?.click()}
                          className="w-full py-2 px-3 border border-dashed border-amber-500 bg-amber-50/60 hover:bg-amber-100/70 text-slate-900 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-amber-700" />
                          <span>Change Training Picture</span>
                        </button>
                        <input
                          type="url"
                          placeholder="Or paste image URL..."
                          value={serviceTrainingPreview.startsWith('http') ? serviceTrainingPreview : ''}
                          onChange={(e) => setServiceTrainingPreview(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* Service 04: QRFS Rentals & Merchandise */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                            Pillar 04 · Rentals
                          </span>
                          <button
                            type="button"
                            onClick={() => setServiceRentalsPreview(ASSETS.projectorPaRentalGear)}
                            className="text-[11px] text-slate-500 hover:text-red-600 font-semibold cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900">
                          QRFS Rentals &amp; Merchandise
                        </h5>
                        <div className="h-36 rounded-lg overflow-hidden bg-slate-200 border border-slate-300">
                          <img
                            src={serviceRentalsPreview || ASSETS.projectorPaRentalGear}
                            alt="Rentals Service Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <input
                          ref={serviceRentalsInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleServiceImageFileSelect('rentals', e)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => serviceRentalsInputRef.current?.click()}
                          className="w-full py-2 px-3 border border-dashed border-amber-500 bg-amber-50/60 hover:bg-amber-100/70 text-slate-900 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-amber-700" />
                          <span>Change Rentals Picture</span>
                        </button>
                        <input
                          type="url"
                          placeholder="Or paste image URL..."
                          value={serviceRentalsPreview.startsWith('http') ? serviceRentalsPreview : ''}
                          onChange={(e) => setServiceRentalsPreview(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION B: COMPANY LOGO & CEO PORTRAIT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-slate-200">
                  {/* Left Card: Company Logo Editor */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 block">
                          1. Website Header &amp; Footer Emblem
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          Editable Company Logo
                        </h4>
                      </div>
                      {logoPreview && (
                        <button
                          type="button"
                          onClick={() => setLogoPreview('')}
                          className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
                        >
                          Use Default Gold Emblem
                        </button>
                      )}
                    </div>

                    {/* Live Logo Preview on Light & Dark */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-white border border-slate-200 rounded-lg">
                        <span className="text-[10px] text-slate-400 block mb-1.5">Navbar Preview (Light):</span>
                        <div className="flex items-center gap-2.5">
                          {logoPreview ? (
                            <img src={logoPreview} alt="Custom Logo" className="w-10 h-10 object-contain rounded" />
                          ) : (
                            <OfficialLogo size="sm" showRc={false} />
                          )}
                          {logoPreview && (
                            <div className="flex flex-col">
                              <span className="text-xs font-extrabold text-slate-900 leading-none">BRIGHT LIGHT</span>
                              <span className="text-[9px] font-bold text-amber-700 tracking-wider uppercase mt-0.5">INTEGRATED SERVICES</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                        <span className="text-[10px] text-slate-400 block mb-1.5">Footer Preview (Dark):</span>
                        <div className="flex items-center gap-2.5">
                          {logoPreview ? (
                            <img src={logoPreview} alt="Custom Logo" className="w-10 h-10 object-contain rounded" />
                          ) : (
                            <OfficialLogo variant="dark" size="sm" showRc={false} />
                          )}
                          {logoPreview && (
                            <div className="flex flex-col">
                              <span className="text-xs font-extrabold text-white leading-none">BRIGHT LIGHT</span>
                              <span className="text-[9px] font-bold text-amber-400 tracking-wider uppercase mt-0.5">INTEGRATED SERVICES</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="w-full py-3 px-4 border-2 border-dashed border-amber-400 bg-amber-50/40 hover:bg-amber-50 text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4 text-amber-600" />
                        <span>Upload New Logo Image from Phone / Computer</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Or Paste Direct Logo Image URL:
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/logo.png"
                        value={logoPreview.startsWith('http') ? logoPreview : ''}
                        onChange={(e) => setLogoPreview(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Right Card: CEO Portrait & Profile Editor */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 block">
                        2. Executive Leadership Portrait (Home &amp; About Pages)
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        Editable CEO Photo &amp; Title
                      </h4>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="w-28 h-32 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img
                          src={ceoPhotoPreview || siteSettings.ceoPhoto}
                          alt="CEO Preview"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            CEO Full Name &amp; Credentials
                          </label>
                          <input
                            type="text"
                            value={ceoNameInput}
                            onChange={(e) => setCeoNameInput(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            CEO Role / Designation
                          </label>
                          <input
                            type="text"
                            value={ceoTitleInput}
                            onChange={(e) => setCeoTitleInput(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <input
                        ref={ceoPhotoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCeoPhotoFileSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => ceoPhotoInputRef.current?.click()}
                        className="w-full py-3 px-4 border-2 border-dashed border-amber-400 bg-amber-50/40 hover:bg-amber-50 text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4 text-amber-600" />
                        <span>Upload New CEO Photo from Phone / Computer</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Or Paste Direct CEO Image URL:
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/ceo-photo.jpg"
                        value={ceoPhotoPreview.startsWith('http') ? ceoPhotoPreview : ''}
                        onChange={(e) => setCeoPhotoPreview(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSavingBranding}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isSavingBranding ? 'Saving to Cloud...' : 'Save Service Pictures, Logo & CEO Settings'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 1: PHOTO & MEDIA MANAGER */}
          {activeTab === 'photos' && (
            <div className="space-y-8">
              {/* Quick Banner to Jump to 4 Core Service Division Pictures */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 shadow-xs">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                    4 Core Service Division Cards + Logo &amp; CEO
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Want to change the 4 Service Division Pictures (Medical, Fumigation, Training, Rentals), Company Logo, or CEO Photo?
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('branding')}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit 4 Service Pictures, Logo &amp; CEO</span>
                </button>
              </div>
              {/* Add or Edit Picture Section */}
              <div ref={formTopRef} className={`border rounded-2xl p-5 sm:p-6 shadow-xs transition-colors ${editingPhotoId ? 'bg-amber-50/40 border-amber-400' : 'bg-white border-slate-200'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                      {editingPhotoId ? (
                        <>
                          <Pencil className="w-4 h-4 text-amber-600" />
                          <span>Edit Uploaded / Website Picture</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-amber-600" />
                          <span>Add New Picture to Website</span>
                        </>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {editingPhotoId
                        ? 'Update the title, department, location, description, or replace the photo file below.'
                        : 'Upload photos directly from your phone or computer. They will be added instantly to the Gallery and website.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    {editingPhotoId && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </div>

                {uploadMessage && (
                  <div className={`p-3 rounded-lg text-xs mb-4 flex items-center gap-2 ${
                    uploadMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {uploadMessage.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>{uploadMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleAddPhoto} className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Upload Dropzone & Preview */}
                    <div className="lg:col-span-5 space-y-3">
                      <label className="block text-xs font-bold text-slate-700">
                        1. Select Picture File
                      </label>

                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[190px] ${
                          photoImageSrc
                            ? 'border-amber-400 bg-amber-50/20'
                            : 'border-slate-300 hover:border-amber-500 bg-slate-50 hover:bg-slate-100/70'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />

                        {photoImageSrc ? (
                          <div className="w-full space-y-2">
                            <div className="relative h-40 w-full rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                              <img
                                src={photoImageSrc}
                                alt="Upload Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-[11px] text-amber-700 font-semibold">
                              Click to change picture
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                              <Upload className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">
                                Click to upload photo from your device
                              </p>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                Supports JPG, PNG, WEBP from phone or PC
                              </p>
                            </div>
                          </div>
                        )}

                        {isProcessingImage && (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <span className="text-xs text-slate-700 font-medium">Processing picture...</span>
                          </div>
                        )}
                      </div>

                      {/* Or direct URL input option */}
                      <div className="text-[11px] text-slate-500">
                        <span>Or paste web image link:</span>
                        <input
                          type="url"
                          placeholder="https://example.com/photo.jpg"
                          value={photoImageSrc.startsWith('http') ? photoImageSrc : ''}
                          onChange={(e) => setPhotoImageSrc(e.target.value)}
                          className="w-full mt-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:outline-hidden bg-white"
                        />
                      </div>
                    </div>

                    {/* Right: Picture Information */}
                    <div className="lg:col-span-7 space-y-3.5">
                      <label className="block text-xs font-bold text-slate-700">
                        2. Picture Details
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Photo Title / Job Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Termite Treatment at Gateway School"
                            value={photoTitle}
                            onChange={(e) => setPhotoTitle(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Department / Sector *
                          </label>
                          <select
                            value={photoCategory}
                            onChange={(e) => {
                              const cat = e.target.value as PhotoItem['category'];
                              setPhotoCategory(cat);
                              if (cat === 'fumigation') setPhotoTag('Vector Control');
                              else if (cat === 'medical') setPhotoTag('Clinical Care');
                              else if (cat === 'training') setPhotoTag('CPD UK Training');
                              else if (cat === 'rentals') setPhotoTag('Audio-Visual');
                              else setPhotoTag('Headquarters');
                            }}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                          >
                            <option value="fumigation">Fumigation &amp; Pest Control</option>
                            <option value="medical">Healthcare &amp; Clinical Care</option>
                            <option value="training">Professional Healthcare Training</option>
                            <option value="rentals">QRFS Rentals &amp; AV Equipment</option>
                            <option value="corporate">Corporate Operations / HQ</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Category Tag / Badge
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Thermal Fogging, First Aid"
                            value={photoTag}
                            onChange={(e) => setPhotoTag(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Operational Location
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Aseese, Ogun State / Ikeja, Lagos"
                            value={photoLocation}
                            onChange={(e) => setPhotoLocation(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Description / Service Notes
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Describe what was done in this operational session..."
                            value={photoDescription}
                            onChange={(e) => setPhotoDescription(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden resize-none bg-white"
                          />
                        </div>

                        <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="featureHome"
                            checked={isFeatureOnHome}
                            onChange={(e) => setIsFeatureOnHome(e.target.checked)}
                            className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                          />
                          <label htmlFor="featureHome" className="text-xs text-slate-700 cursor-pointer">
                            Feature this picture on the <strong>Home Page &quot;Field Operations in Action&quot;</strong> showcase
                          </label>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          type="submit"
                          disabled={!photoImageSrc || isProcessingImage || isSavingPhoto}
                          className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          {editingPhotoId ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>{isSavingPhoto ? 'Saving Changes...' : 'Save Changes to Picture'}</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              <span>{isSavingPhoto ? 'Publishing...' : 'Publish Picture to Website'}</span>
                            </>
                          )}
                        </button>
                        {editingPhotoId && (
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="w-full sm:w-auto px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Current Photos Gallery in System */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      All Active Website Photos ({photos.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Click &quot;Edit&quot; on any picture below to replace the image or update its title and department.
                    </p>
                  </div>

                  {/* Filter by Category */}
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'fumigation', label: 'Fumigation' },
                      { id: 'medical', label: 'Medical' },
                      { id: 'training', label: 'Training' },
                      { id: 'rentals', label: 'Rentals' },
                      { id: 'corporate', label: 'Corporate / HQ' }
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedCategoryFilter(f.id)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                          selectedCategoryFilter === f.id
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredPhotos.length === 0 ? (
                  <div className="p-8 text-center border border-dashed rounded-xl text-slate-500 text-xs">
                    No pictures found in this category. Use the form above to add one.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredPhotos.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-sm transition-all flex flex-col group"
                      >
                        <div className="relative h-44 bg-slate-100 overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 bg-slate-900/80 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                            {p.dateTag}
                          </div>
                          {p.isCustomUpload && (
                            <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                              Custom Upload
                            </div>
                          )}
                        </div>

                        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                              {p.category}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                              {p.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                              {p.description}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-[10px] text-slate-400 truncate max-w-[110px]">
                              {p.location}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleStartEditPhoto(p)}
                                className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-900 px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer text-[11px] font-semibold"
                                title="Edit this picture"
                              >
                                <Pencil className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              {confirmDeleteId === p.id ? (
                                <button
                                  type="button"
                                  onClick={() => handleDeletePhoto(p.id)}
                                  className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold cursor-pointer"
                                  title="Confirm delete"
                                >
                                  Confirm
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(p.id)}
                                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Delete photo"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOMER ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Customer Enquiries ({enquiries.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct service &amp; rental enquiries submitted via the website.
                  </p>
                </div>
              </div>

              {enquiries.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 border border-dashed rounded-lg">
                  No enquiries logged yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {enquiries.map((q) => (
                    <div
                      key={q.id}
                      className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors bg-slate-50/60 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {q.id}
                          </span>
                          <span className="text-sm font-bold text-slate-900">{q.name}</span>
                          {q.organization && (
                            <span className="text-xs text-slate-600">({q.organization})</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400 font-mono text-[11px]">
                            {new Date(q.createdAt).toLocaleDateString()}
                          </span>
                          <select
                            value={q.status}
                            onChange={(e) => {
                              DataService.updateQuoteStatus(q.id, e.target.value as QuoteRequest['status']);
                              setEnquiries(DataService.getQuotes());
                            }}
                            className="text-xs font-bold px-2 py-1 rounded border border-slate-300 bg-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                          </select>
                          <button
                            onClick={() => {
                              DataService.deleteQuote(q.id);
                              setEnquiries(DataService.getQuotes());
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          <a href={`tel:${q.phone}`} className="font-mono font-bold hover:underline">
                            {q.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-amber-600" />
                          <a href={`mailto:${q.email}`} className="truncate hover:underline">
                            {q.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>{q.state}</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-slate-700">Services / Rentals Requested:</span>
                          {q.services.map(s => (
                            <span key={s} className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded text-amber-900 font-semibold text-[11px]">
                              {formatServiceIdToLabel(s)}
                            </span>
                          ))}
                        </div>
                        {q.notes && (
                          <p className="text-slate-600 italic">
                            &quot;{q.notes}&quot;
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                        <a
                          href={`https://wa.me/234${q.phone.replace(/^0/, '')}?text=Hello%20${encodeURIComponent(q.name)},%20this%20is%20Bright%20Light%20Integrated%20Services%20regarding%20your%20enquiry%20(${q.id}).`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-semibold inline-flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Reply Client on WhatsApp</span>
                        </a>
                        <a
                          href={`mailto:${q.email}?subject=${encodeURIComponent(`Re: Your Bright Light Enquiry [${q.id}]`)}`}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-md font-bold inline-flex items-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email Client</span>
                        </a>
                        <a
                          href={`tel:${q.phone}`}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-semibold inline-flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Client</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TRAINING REGISTRATIONS */}
          {activeTab === 'trainings' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-slate-900">
                Healthcare Training Enrollments ({trainings.length})
              </h3>
              {trainings.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 border border-dashed rounded-lg">
                  No training enrollments registered yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {trainings.map((t) => (
                    <div key={t.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/60 text-xs space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {t.id}
                          </span>
                          <span className="ml-2 font-bold text-slate-900">{t.fullName}</span>
                          {t.organization && <span className="text-slate-500 ml-1">({t.organization})</span>}
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800">
                          {t.status}
                        </span>
                      </div>
                      <div className="text-slate-700 space-y-1">
                        <p><strong>Course:</strong> {t.course}</p>
                        <p><strong>Format:</strong> {t.trainingModel === 'corporate_group' ? 'Corporate Cohort' : 'Individual'} ({t.candidateCount} candidate{t.candidateCount > 1 ? 's' : ''})</p>
                        <p><strong>Phone:</strong> {t.phone} · <strong>Email:</strong> {t.email}</p>
                        {t.notes && <p className="italic text-slate-600">&quot;{t.notes}&quot;</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RENTALS */}
          {activeTab === 'rentals' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-slate-900">
                Equipment &amp; Hall Rental Bookings ({rentals.length})
              </h3>
              {rentals.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 border border-dashed rounded-lg">
                  No rental bookings registered yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {rentals.map((r) => (
                    <div key={r.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/60 text-xs space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {r.id}
                          </span>
                          <span className="ml-2 font-bold text-slate-900">{r.contactName}</span>
                          {r.organization && <span className="text-slate-500 ml-1">({r.organization})</span>}
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-100 text-amber-800">
                          {r.status}
                        </span>
                      </div>
                      <div className="text-slate-700 space-y-1">
                        <p><strong>Equipment:</strong> {r.items.join(', ')}</p>
                        <p><strong>Dates:</strong> {r.eventStartDate} to {r.eventEndDate}</p>
                        <p><strong>Venue:</strong> {r.venueAddress}, {r.state}</p>
                        <p><strong>Phone:</strong> {r.phone} · <strong>Email:</strong> {r.email}</p>
                        <p><strong>Operator:</strong> {r.requiresDriver ? 'Yes (Technician/Driver Requested)' : 'Self-handled'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: FREE MONDAY CLINIC */}
          {activeTab === 'health' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-slate-900">
                Free Monday Health Consultations ({healthInquiries.length})
              </h3>
              {healthInquiries.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 border border-dashed rounded-lg">
                  No Monday clinic registrations yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {healthInquiries.map((h) => (
                    <div key={h.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/60 text-xs space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {h.id}
                          </span>
                          <span className="ml-2 font-bold text-slate-900">{h.fullName}</span>
                          {h.ageBracket && <span className="text-slate-500 ml-1">({h.ageBracket})</span>}
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800">
                          {h.status}
                        </span>
                      </div>
                      <div className="text-slate-700 space-y-1">
                        <p><strong>Phone:</strong> {h.phone} {h.email ? `· ${h.email}` : ''}</p>
                        <p><strong>Preferred Monday:</strong> {h.preferredConsultationDate || 'Next Upcoming Monday'}</p>
                        <p><strong>Location:</strong> {h.locationState}</p>
                        <p className="italic text-slate-600">&quot;{h.healthConcernSummary}&quot;</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* END OF ADMIN TABS */}

        </div>
      </div>
    </div>
  );
};

// Aliases for compatibility
export const AdminPortalModal = AdminDashboard;
