import { COMPANY_INFO } from '../data/companyData';
import { DataService } from './dataService';

export function generateStandaloneCss(): string {
  return `/* Bright Light Integrated Services (RC: 8162390) - Standalone CSS Stylesheet */
:root {
  --bg-dark: #020617;
  --bg-slate: #0f172a;
  --bg-light: #f8fafc;
  --surface: #ffffff;
  --amber: #f59e0b;
  --amber-dark: #b45309;
  --emerald: #059669;
  --text-main: #0f172a;
  --text-muted: #475569;
  --border: #e2e8f0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  background-color: var(--bg-light);
  color: var(--text-main);
  line-height: 1.5;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header & Navigation */
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  gap: 1rem;
}

.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-main);
}

.brand-logo img, .brand-logo svg {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.brand-title {
  font-weight: 800;
  font-size: 1rem;
  line-height: 1.1;
  display: block;
}

.brand-subtitle {
  font-weight: 800;
  font-size: 0.68rem;
  color: var(--amber-dark);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: block;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  transition: color 0.15s;
}

.nav-links a:hover {
  color: var(--amber-dark);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}

.btn-amber {
  background: var(--amber);
  color: #020617;
}

.btn-amber:hover {
  background: #fbbf24;
}

.btn-dark {
  background: var(--bg-slate);
  color: #ffffff;
}

/* Compact Hero Section */
.hero {
  background: var(--bg-dark);
  color: #ffffff;
  padding: 2rem 0 2.5rem;
  border-bottom: 1px solid #1e293b;
}

.hero-kicker {
  font-family: monospace;
  font-size: 0.75rem;
  color: #fbbf24;
  margin-bottom: 0.5rem;
}

.hero h1 {
  font-size: clamp(1.85rem, 4vw, 3.25rem);
  font-weight: 800;
  line-height: 1.12;
  margin-bottom: 0.75rem;
}

.hero p {
  color: #cbd5e1;
  max-width: 640px;
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
}

/* Compact Sections */
.section {
  padding: 1.75rem 0;
}

.section-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 0.65rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}

.section-kicker {
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--amber-dark);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 800;
}

/* 4-Column Grid */
.grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card img {
  width: 100%;
  height: 185px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0.25rem 0 0.4rem;
}

.card-text {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Enquiry Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.78);
  display: none;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
}

.modal-backdrop.open {
  display: flex;
}

.modal-card {
  background: #ffffff;
  width: 100%;
  max-width: 640px;
  border-radius: 1rem;
  overflow: hidden;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  background: var(--bg-slate);
  color: #ffffff;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body {
  padding: 1.25rem;
  overflow-y: auto;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.form-control {
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 0.85rem;
}

/* Footer */
.site-footer {
  background: var(--bg-dark);
  color: #94a3b8;
  padding: 2.25rem 0 1.5rem;
  margin-top: 2rem;
  border-top: 1px solid #1e293b;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
`;
}

export function generateStandaloneJs(): string {
  return `// Bright Light Integrated Services (RC: ${COMPANY_INFO.rcNumber}) - Standalone JavaScript (app.js)
const WHATSAPP_NUMBER = "${COMPANY_INFO.whatsapp}";
const COMPANY_EMAIL = "${COMPANY_INFO.emails[0]}";
const ADMIN_PASSKEY = "Formidia1@";

function openEnquiryModal(defaultService) {
  const modal = document.getElementById("enquiryModal");
  if (!modal) return;
  modal.classList.add("open");
  if (defaultService) {
    const select = document.getElementById("enquiryService");
    if (select) select.value = defaultService;
  }
}

function closeEnquiryModal() {
  const modal = document.getElementById("enquiryModal");
  if (modal) modal.classList.remove("open");
}

function submitEnquiryForm(event) {
  event.preventDefault();
  const name = document.getElementById("clientName").value.trim();
  const org = document.getElementById("clientOrg").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const email = document.getElementById("clientEmail").value.trim();
  const service = document.getElementById("enquiryService").value;
  const state = document.getElementById("clientState").value;
  const notes = document.getElementById("clientNotes").value.trim();
  const refId = "ENQ-" + Date.now().toString().slice(-6);

  const messageLines = [
    "*NEW SERVICE & RENTAL ENQUIRY — BRIGHT LIGHT INTEGRATED SERVICES*",
    "Reference ID: *" + refId + "*",
    "Client Name: " + name,
    org ? "Organization: " + org : "",
    "Phone: " + phone,
    "Email: " + email,
    "Requested Division / Service: " + service,
    "State / Location: " + state,
    notes ? "Notes: " + notes : ""
  ].filter(Boolean).join("\\n");

  fetch("https://formsubmit.co/ajax/" + encodeURIComponent(COMPANY_EMAIL), {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      _subject: "[" + refId + "] New Enquiry from " + name,
      Reference_ID: refId,
      Client_Name: name,
      Organization: org || "N/A",
      Phone: phone,
      Email: email,
      Service: service,
      State: state,
      Notes: notes || "None"
    })
  }).catch(function () {});

  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(messageLines), "_blank");

  closeEnquiryModal();
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", submitEnquiryForm);
  }
});
`;
}

export function generateStandaloneHtml(): string {
  const settings = DataService.getSiteSettings();
  const photos = DataService.getPhotos().slice(0, 8);

  const logoMarkup = settings.logoImage
    ? `<img src="${settings.logoImage}" alt="Bright Light Logo" />`
    : `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" stroke="#D4AF37" stroke-width="8"/><rect x="36" y="42" width="5" height="30" fill="#D4AF37"/><rect x="46" y="30" width="6" height="42" fill="#F5D061"/><rect x="57" y="38" width="5" height="34" fill="#D4AF37"/></svg>`;

  const photosHtml = photos
    .map(
      (p) => `
        <article class="card">
          <img src="${p.image}" alt="${p.title.replace(/"/g, '&quot;')}" />
          <div class="card-body">
            <div>
              <span class="section-kicker">${p.category.toUpperCase()} · ${p.dateTag}</span>
              <h3 class="card-title">${p.title}</h3>
              <p class="card-text">${p.description}</p>
            </div>
            <p style="font-size:0.75rem;color:#64748b;margin-top:0.5rem;">${p.location}</p>
          </div>
        </article>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${COMPANY_INFO.name} | RC: ${COMPANY_INFO.rcNumber}</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <!-- Sticky Top Navigation -->
  <header class="site-header">
    <div class="container nav-bar">
      <a href="#" class="brand-logo">
        ${logoMarkup}
        <div>
          <span class="brand-title">BRIGHT LIGHT</span>
          <span class="brand-subtitle">INTEGRATED SERVICES</span>
        </div>
      </a>
      <ul class="nav-links">
        <li><a href="#divisions">Core Divisions</a></li>
        <li><a href="#rentals">Rentals (QRFS)</a></li>
        <li><a href="#gallery">Field Gallery</a></li>
        <li><a href="#leadership">Leadership</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button class="btn btn-amber" onclick="openEnquiryModal()">Make Enquiry</button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-kicker">● RC: ${COMPANY_INFO.rcNumber} · Founded ${COMPANY_INFO.yearEstablished} · Ogun State HQ</div>
      <h1>Excellence Across <span style="color:#fbbf24;">Four Integrated Sectors.</span></h1>
      <p>Nigeria's trusted corporate provider delivering unified solutions in Healthcare &amp; Diagnostics, Certified Fumigation, Accredited Life Support Training, and Corporate Equipment Rentals.</p>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
        <button class="btn btn-amber" onclick="openEnquiryModal()">Make Enquiry / Book Rentals</button>
        <a href="https://wa.me/${COMPANY_INFO.whatsapp}" target="_blank" rel="noopener" class="btn btn-dark">WhatsApp: ${COMPANY_INFO.phones[1]}</a>
      </div>
    </div>
  </section>

  <!-- 4 Core Divisions -->
  <section id="divisions" class="section">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="section-kicker">Core Capabilities</span>
          <h2 class="section-title">Four Specialized Divisions. One Accountable Partner.</h2>
        </div>
      </div>
      <div class="grid-4">
        <div class="card">
          <img src="${settings.serviceMedicalImage}" alt="Healthcare &amp; Medical Supplies" />
          <div class="card-body">
            <div>
              <span class="section-kicker">01 · Clinical &amp; Medical</span>
              <h3 class="card-title">Healthcare &amp; Medical Supplies</h3>
              <p class="card-text">Medical outreach management, Quantum body analysis, Free Monday Clinic consultations, and hospital equipment procurement.</p>
            </div>
            <button class="btn btn-amber" style="margin-top:0.75rem;" onclick="openEnquiryModal('Healthcare & Medical')">Enquire</button>
          </div>
        </div>
        <div class="card">
          <img src="${settings.serviceFumigationImage}" alt="Fumigation &amp; Pest Control" />
          <div class="card-body">
            <div>
              <span class="section-kicker">02 · Environmental Safety</span>
              <h3 class="card-title">Fumigation &amp; Pest Control</h3>
              <p class="card-text">Thermal fogging, anti-termite roof truss treatment, perimeter barrier spraying, and rodent/reptile eradication.</p>
            </div>
            <button class="btn btn-amber" style="margin-top:0.75rem;" onclick="openEnquiryModal('Fumigation & Pest Control')">Enquire</button>
          </div>
        </div>
        <div class="card">
          <img src="${settings.serviceTrainingImage}" alt="Professional Healthcare Training" />
          <div class="card-body">
            <div>
              <span class="section-kicker">03 · CPD (UK) Accredited</span>
              <h3 class="card-title">Professional Healthcare Training</h3>
              <p class="card-text">BLS, ACLS, First Aid, Emergency Management, and Healthcare Assistant certifications by Bright Professional Training Consult.</p>
            </div>
            <button class="btn btn-amber" style="margin-top:0.75rem;" onclick="openEnquiryModal('Healthcare Training')">Enquire</button>
          </div>
        </div>
        <div id="rentals" class="card">
          <img src="${settings.serviceRentalsImage}" alt="Equipment, Hall &amp; Vehicle Rentals" />
          <div class="card-body">
            <div>
              <span class="section-kicker">04 · QRFS Global Resources</span>
              <h3 class="card-title">Equipment, Hall &amp; Vehicle Rentals</h3>
              <p class="card-text">High-lumen projectors &amp; screens, PA sound systems, neat chairs &amp; tables, air-conditioned seminar halls, and corporate buses.</p>
            </div>
            <button class="btn btn-amber" style="margin-top:0.75rem;" onclick="openEnquiryModal('Corporate Equipment & Hall Rentals')">Book Rentals</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Field Operations Gallery -->
  <section id="gallery" class="section">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="section-kicker">Operational Evidence</span>
          <h2 class="section-title">Field Operations in Action</h2>
        </div>
      </div>
      <div class="grid-4">
        ${photosHtml}
      </div>
    </div>
  </section>

  <!-- Executive Leadership (CEO) -->
  <section id="leadership" class="section">
    <div class="container">
      <div class="card" style="flex-direction:row;flex-wrap:wrap;align-items:center;padding:1.25rem;gap:1.5rem;">
        <img src="${settings.ceoPhoto}" alt="${settings.ceoName}" style="width:240px;height:260px;object-fit:cover;border-radius:0.75rem;" />
        <div style="flex:1;min-width:260px;">
          <span class="section-kicker">Executive Leadership &amp; Governance</span>
          <h2 class="section-title" style="margin:0.25rem 0;">${settings.ceoName}</h2>
          <p style="color:#b45309;font-weight:700;font-size:0.85rem;margin-bottom:0.75rem;">${settings.ceoTitle}</p>
          <p class="card-text">${COMPANY_INFO.ceo.bio}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer id="contact" class="site-footer">
    <div class="container">
      <p style="color:#ffffff;font-weight:700;">${COMPANY_INFO.name} (RC: ${COMPANY_INFO.rcNumber})</p>
      <p style="font-size:0.82rem;margin-top:0.25rem;">Headquarters: ${COMPANY_INFO.headquarters}</p>
      <p style="font-size:0.82rem;margin-top:0.25rem;">Phones: ${COMPANY_INFO.phones.join(' / ')} · Email: ${COMPANY_INFO.emails[0]}</p>
    </div>
  </footer>

  <!-- Enquiry & Rentals Modal -->
  <div id="enquiryModal" class="modal-backdrop">
    <div class="modal-card">
      <div class="modal-header">
        <strong>Make an Enquiry / Book Equipment Rentals</strong>
        <button onclick="closeEnquiryModal()" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1.1rem;">✕</button>
      </div>
      <div class="modal-body">
        <form id="enquiryForm">
          <div class="form-grid">
            <div>
              <label style="font-size:0.75rem;font-weight:700;">Full Name *</label>
              <input id="clientName" class="form-control" required placeholder="Your Full Name" />
            </div>
            <div>
              <label style="font-size:0.75rem;font-weight:700;">Organization</label>
              <input id="clientOrg" class="form-control" placeholder="Company / School / Church" />
            </div>
            <div>
              <label style="font-size:0.75rem;font-weight:700;">Phone Number *</label>
              <input id="clientPhone" class="form-control" required placeholder="08080397177" />
            </div>
            <div>
              <label style="font-size:0.75rem;font-weight:700;">Email Address *</label>
              <input id="clientEmail" type="email" class="form-control" required placeholder="you@domain.com" />
            </div>
            <div>
              <label style="font-size:0.75rem;font-weight:700;">Requested Service or Rental *</label>
              <select id="enquiryService" class="form-control">
                <option value="Corporate Equipment & Hall Rentals">Corporate Equipment, Projector, PA &amp; Hall Rentals</option>
                <option value="Corporate Cars & Bus Fleet Rentals">Corporate Cars &amp; Bus Fleet Rentals</option>
                <option value="Fumigation & Pest Control">Fumigation &amp; Pest Control</option>
                <option value="Healthcare & Medical Outreach">Healthcare &amp; Medical Outreach / Procurement</option>
                <option value="Healthcare Training (BLS/ACLS/First Aid)">Healthcare Training (BLS / ACLS / First Aid)</option>
              </select>
            </div>
            <div>
              <label style="font-size:0.75rem;font-weight:700;">State / Location</label>
              <select id="clientState" class="form-control">
                <option value="Ogun State">Ogun State</option>
                <option value="Lagos State">Lagos State</option>
                <option value="Benue State">Benue State</option>
                <option value="Other State">Other Nigerian State</option>
              </select>
            </div>
          </div>
          <div style="margin-bottom:1rem;">
            <label style="font-size:0.75rem;font-weight:700;">Project / Rental Details</label>
            <textarea id="clientNotes" rows="2" class="form-control" placeholder="Specify rental items, dates, or service scope..."></textarea>
          </div>
          <button type="submit" class="btn btn-amber" style="width:100%;">Submit Enquiry</button>
        </form>
      </div>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>`;
}

export function downloadTextFile(filename: string, content: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
