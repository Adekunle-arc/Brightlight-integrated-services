import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Authorized Admin emails (Official Bright Light account + runtime user email)
export const ADMIN_EMAIL = 'brightlightintservices@gmail.com';
export const ALLOWED_ADMIN_EMAILS = [
  'brightlightintservices@gmail.com',
  'samadeniran15@gmail.com'
];

// Official Admin Passkey requested by user
export const ADMIN_PASSKEY = 'Formidia1@';
const PASSKEY_STORAGE_KEY = 'brilis_admin_passkey_session_v1';

const passkeyListeners: Array<(unlocked: boolean) => void> = [];

export function isPasskeyUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(PASSKEY_STORAGE_KEY) === 'unlocked';
}

export function unlockWithPasskey(inputKey: string): boolean {
  if (inputKey.trim() === ADMIN_PASSKEY) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(PASSKEY_STORAGE_KEY, 'unlocked');
    }
    passkeyListeners.forEach((fn) => fn(true));
    return true;
  }
  return false;
}

export function lockPasskeySession(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(PASSKEY_STORAGE_KEY);
  }
  passkeyListeners.forEach((fn) => fn(false));
}

export function onPasskeyChange(cb: (unlocked: boolean) => void): () => void {
  passkeyListeners.push(cb);
  return () => {
    const idx = passkeyListeners.indexOf(cb);
    if (idx !== -1) passkeyListeners.splice(idx, 1);
  };
}

export function isAuthorizedAdmin(user: User | null): boolean {
  if (!user || !user.email || !user.emailVerified) return false;
  return ALLOWED_ADMIN_EMAILS.includes(user.email.toLowerCase());
}

export function isAdminOrPasskeyAuthorized(user: User | null): boolean {
  return isAuthorizedAdmin(user) || isPasskeyUnlocked();
}

export async function signInAsAdmin(): Promise<User> {
  googleProvider.setCustomParameters({
    prompt: 'select_account',
    login_hint: ADMIN_EMAIL
  });
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutAdmin(): Promise<void> {
  lockPasskeySession();
  await signOut(auth);
}

export { onAuthStateChanged };
export type { User };

// Validate connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
