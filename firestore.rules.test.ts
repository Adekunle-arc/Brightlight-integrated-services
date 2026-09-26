/**
 * Firestore Security Rules Test Suite (Dirty Dozen Verification)
 * Verifies all 12 adversarial payloads in security_spec.md return PERMISSION_DENIED.
 */

export interface SecurityTestCase {
  id: number;
  name: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  path: string;
  auth: { uid: string; email?: string; email_verified?: boolean } | null;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED' | 'ALLOWED';
}

export const DIRTY_DOZEN_TESTS: SecurityTestCase[] = [
  {
    id: 1,
    name: 'Unverified Admin Email Spoof on Photo Create',
    operation: 'create',
    path: '/photos/pic-1',
    auth: { uid: 'attacker', email: 'brightlightintservices@gmail.com', email_verified: false },
    payload: { id: 'pic-1', title: 'Spoofed' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 2,
    name: 'Unauthorized Photo Creation by Non-Admin',
    operation: 'create',
    path: '/photos/pic-2',
    auth: { uid: 'user1', email: 'visitor@gmail.com', email_verified: true },
    payload: { id: 'pic-2', title: 'Unauthorized' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 3,
    name: 'Shadow Field Injection on Photo Update',
    operation: 'update',
    path: '/photos/pic-1',
    auth: { uid: 'admin1', email: 'brightlightintservices@gmail.com', email_verified: true },
    payload: { id: 'pic-1', isGhostField: true },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 4,
    name: 'Immortal Field Tampering on Photo Update',
    operation: 'update',
    path: '/photos/pic-1',
    auth: { uid: 'admin1', email: 'brightlightintservices@gmail.com', email_verified: true },
    payload: { id: 'pic-1', authorUid: 'different-uid' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 5,
    name: 'PII Leak via Non-Admin Read on Quotes',
    operation: 'get',
    path: '/quotes/ENQ-1',
    auth: { uid: 'user1', email: 'visitor@gmail.com', email_verified: true },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 6,
    name: 'PII Leak via Unauthenticated List on Trainings',
    operation: 'list',
    path: '/trainings',
    auth: null,
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 7,
    name: 'State Shortcutting on Quote Creation',
    operation: 'create',
    path: '/quotes/ENQ-2',
    auth: null,
    payload: { id: 'ENQ-2', status: 'contacted' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 8,
    name: 'Path ID Poisoning with Special Characters',
    operation: 'create',
    path: '/quotes/invalid$id!',
    auth: null,
    payload: { id: 'invalid$id!' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 9,
    name: 'Oversized String Payload on Quote Notes',
    operation: 'create',
    path: '/quotes/ENQ-3',
    auth: null,
    payload: { id: 'ENQ-3', notes: 'x'.repeat(5000) },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 10,
    name: 'Unbounded Array Attack on Services List',
    operation: 'create',
    path: '/quotes/ENQ-4',
    auth: null,
    payload: { id: 'ENQ-4', services: new Array(25).fill('fum-pest') },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 11,
    name: 'Forged Client Timestamp on Rental Creation',
    operation: 'create',
    path: '/rentals/RNT-1',
    auth: null,
    payload: { id: 'RNT-1', createdAt: '2020-01-01T00:00:00Z' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 12,
    name: 'Self-Assigned Admin Privilege Escalation',
    operation: 'create',
    path: '/admins/attacker',
    auth: { uid: 'attacker', email: 'attacker@gmail.com', email_verified: true },
    payload: { uid: 'attacker', email: 'attacker@gmail.com' },
    expectedResult: 'PERMISSION_DENIED'
  }
];
