# Security Specification (`security_spec.md`)

## 1. Data Invariants & Relationship Mapping
- **Master Admin Authority**: Only the verified administrator (`brightlightintservices@gmail.com` with `email_verified == true` or a UID present in `/admins/{uid}`) may create, update, or delete `/photos/{photoId}`, or read, list, update, or delete customer PII collections (`/quotes`, `/trainings`, `/rentals`, `/healthInquiries`).
- **Public Read-Only Media (`/photos/{photoId}`)**: Website visitors (unauthenticated or authenticated) may read (`get`, `list`) operational photos so the public Gallery and Home Page render across all devices. All writes (`create`, `update`, `delete`) require `isAdmin()`, strict schema validation `isValidPhotoItem()`, `authorUid == request.auth.uid`, and server timestamps (`request.time`).
- **PII Isolation on Customer Submissions (`/quotes`, `/trainings`, `/rentals`, `/healthInquiries`)**:
  - Public customers can submit (`create`) new enquiries/registrations with strict initial state (`status == 'pending'`, `'new'`, `'received'`, or `'scheduled'`), strict key allowlists (`hasAll` + `hasOnly`), bounded string/list lengths, and `createdAt == request.time`.
  - Public and non-admin users are strictly forbidden from reading (`get`, `list`), updating, or deleting any customer submission to prevent PII leaks.
  - Only `isAdmin()` can read (`get`, `list`), update status (`affectedKeys().hasOnly(['status', 'updatedAt'])`), or delete records.

## 2. The "Dirty Dozen" Payloads

1. **Unverified Admin Email Spoof (Identity Spoofing)**:
   - Target: `POST /photos/pic-1` with `auth: { uid: 'attacker', token: { email: 'brightlightintservices@gmail.com', email_verified: false } }`
   - Expected: `PERMISSION_DENIED`

2. **Unauthorized Photo Creation by Non-Admin**:
   - Target: `POST /photos/pic-2` with `auth: { uid: 'user1', token: { email: 'visitor@gmail.com', email_verified: true } }`
   - Expected: `PERMISSION_DENIED`

3. **Shadow Field Injection on Photo Update (Shadow Update)**:
   - Target: `PATCH /photos/pic-1` with `isAdmin()` adding `{ isSuperFeatured: true }`
   - Expected: `PERMISSION_DENIED`

4. **Immortal Field Tampering on Photo Update (`createdAt` / `authorUid` mutation)**:
   - Target: `PATCH /photos/pic-1` with `isAdmin()` modifying `createdAt` or `authorUid`
   - Expected: `PERMISSION_DENIED`

5. **PII Leak via Unauthenticated / Non-Admin Read on `/quotes/{quoteId}`**:
   - Target: `GET /quotes/ENQ-1` with `auth: { uid: 'user1', token: { email: 'other@gmail.com', email_verified: true } }`
   - Expected: `PERMISSION_DENIED`

6. **PII Leak via List Query on `/trainings`**:
   - Target: `LIST /trainings` with `auth: null`
   - Expected: `PERMISSION_DENIED`

7. **State Shortcutting on Quote Creation (`status: 'contacted'` on create)**:
   - Target: `POST /quotes/ENQ-2` with `{ status: 'contacted', ... }`
   - Expected: `PERMISSION_DENIED`

8. **Path ID Poisoning (`>128` chars or invalid regex characters)**:
   - Target: `POST /quotes/invalid$id!with*special`
   - Expected: `PERMISSION_DENIED`

9. **Denial of Wallet / Oversized String Payload (`notes > 2000` chars)**:
   - Target: `POST /quotes/ENQ-3` with `notes` of 5,000 characters
   - Expected: `PERMISSION_DENIED`

10. **Unbounded Array Attack on `services` (`services.size() > 20`)**:
    - Target: `POST /quotes/ENQ-4` with 25 elements in `services`
    - Expected: `PERMISSION_DENIED`

11. **Forged Client Timestamp on Creation (`createdAt != request.time`)**:
    - Target: `POST /rentals/RNT-1` with past timestamp
    - Expected: `PERMISSION_DENIED`

12. **Self-Assigned Admin Privilege Escalation (`POST /admins/attacker`)**:
    - Target: `POST /admins/attacker` by non-admin user
    - Expected: `PERMISSION_DENIED`

## 3. Conflict & Red Team Audit Report
- **Identity Spoofing**: Blocked via `request.auth.token.email_verified == true && request.auth.token.email == 'brightlightintservices@gmail.com'` and `authorUid == request.auth.uid`.
- **State Shortcutting**: Initial states (`pending`, `new`, `received`, `scheduled`) enforced on `create`; updates restricted to `isAdmin()`.
- **Resource Poisoning**: Every path variable checked with `isValidId()`, every string checked with `.size() <= MAX`, and every array checked with `.size() <= 20`.
- **Value Poisoning**: Every `allow update` begins with `isValid[Entity](incoming())` and restricts `affectedKeys().hasOnly(...)`.
