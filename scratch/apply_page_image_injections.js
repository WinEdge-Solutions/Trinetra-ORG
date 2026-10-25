const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'D:\\Trinetra ORG';

console.log('=== Applying All Page Image Enhancements ===\n');

// ============================================================================
// 1. AWARENESS.HTML: Add Publication Covers to the 5 Downloadable Guides
// ============================================================================
console.log('1. Updating awareness.html with 5 Guide Publication Covers...');
const awarenessPath = path.join(ROOT_DIR, 'awareness.html');
let awarenessContent = fs.readFileSync(awarenessPath, 'utf8');

// Guide 1
const guide1Old = `<h3 class="text-base font-bold text-neutral-900 mb-2">Child Labour Reporting &amp; Action Protocol</h3>`;
const guide1New = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
            <img src="images/guides/guide-child-labour.webp" alt="Child Labour Reporting &amp; Action Protocol Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="225" loading="lazy">
          </div>
          <h3 class="text-base font-bold text-neutral-900 mb-2">Child Labour Reporting &amp; Action Protocol</h3>`;

// Guide 2
const guide2Old = `<h3 class="text-base font-bold text-neutral-900 mb-2">POCSO Citizen &amp; Informant Pocket Handbook</h3>`;
const guide2New = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
            <img src="images/guides/guide-pocso.webp" alt="POCSO Citizen &amp; Informant Pocket Handbook Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="225" loading="lazy">
          </div>
          <h3 class="text-base font-bold text-neutral-900 mb-2">POCSO Citizen &amp; Informant Pocket Handbook</h3>`;

// Guide 3
const guide3Old = `<h3 class="text-base font-bold text-neutral-900 mb-2">RTE 25% Private School Admission Manual</h3>`;
const guide3New = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
            <img src="images/guides/guide-rte.webp" alt="RTE 25% Private School Admission Manual Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="225" loading="lazy">
          </div>
          <h3 class="text-base font-bold text-neutral-900 mb-2">RTE 25% Private School Admission Manual</h3>`;

// Guide 4
const guide4Old = `<h3 class="text-base font-bold text-neutral-900 mb-2">Women's Statutory Legal Protection Handout</h3>`;
const guide4New = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
            <img src="images/guides/guide-women-rights.webp" alt="Women's Statutory Legal Protection Handout Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="225" loading="lazy">
          </div>
          <h3 class="text-base font-bold text-neutral-900 mb-2">Women's Statutory Legal Protection Handout</h3>`;

// Guide 5
const guide5Old = `<h3 class="text-base font-bold text-neutral-900 mb-2">Digital Safety &amp; Cyber Hygiene Checklist</h3>`;
const guide5New = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
            <img src="images/guides/guide-cyber-safety.webp" alt="Digital Safety &amp; Cyber Hygiene Checklist Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="225" loading="lazy">
          </div>
          <h3 class="text-base font-bold text-neutral-900 mb-2">Digital Safety &amp; Cyber Hygiene Checklist</h3>`;

if (awarenessContent.includes(guide1Old) && !awarenessContent.includes('images/guides/guide-child-labour.webp')) {
  awarenessContent = awarenessContent.replace(guide1Old, guide1New);
  awarenessContent = awarenessContent.replace(guide2Old, guide2New);
  awarenessContent = awarenessContent.replace(guide3Old, guide3New);
  awarenessContent = awarenessContent.replace(guide4Old, guide4New);
  awarenessContent = awarenessContent.replace(guide5Old, guide5New);
  fs.writeFileSync(awarenessPath, awarenessContent, 'utf8');
  console.log('  ✔ awareness.html: 5 guide covers injected successfully.');
} else {
  console.log('  ℹ awareness.html: Guide covers already injected or pattern missing.');
}


// ============================================================================
// 2. DONATE.HTML: Add UPI QR card and 4 Tangible Impact Tier Cards
// ============================================================================
console.log('\n2. Updating donate.html with Official UPI QR & 4 Impact Tiers...');
const donatePath = path.join(ROOT_DIR, 'donate.html');
let donateContent = fs.readFileSync(donatePath, 'utf8');

// Replace dashed QR placeholder
const oldQRPlaceholder = `<div class="w-44 h-44 rounded-2xl bg-white border-2 border-dashed border-amber-300/60 flex flex-col items-center justify-center p-3 text-center shrink-0">
              <span class="material-symbols-outlined text-4xl text-amber-700/80 mb-1" aria-hidden="true">qr_code_scanner</span>
              <span class="text-xs font-bold text-neutral-800">Scan via UPI</span>
              <span class="text-[10px] text-[#526070] mt-0.5">TBD - Foundation to provide</span>
            </div>`;

const newQRCard = `<div class="w-48 h-56 rounded-2xl overflow-hidden border border-amber-300/80 shadow-xs flex flex-col items-center justify-center bg-white shrink-0 group">
              <img src="images/donate/upi-qr-card.webp" alt="Trinetra Gargi Foundation Section 8 Official UPI QR" class="w-full h-full object-contain" width="192" height="224" loading="lazy">
            </div>`;

if (donateContent.includes(oldQRPlaceholder)) {
  donateContent = donateContent.replace(oldQRPlaceholder, newQRCard);
  console.log('  ✔ donate.html: Replaced dashed QR placeholder with official UPI QR card.');
}

// Add Tangible Contribution Tiers Section above Multi-Channel Giving Grid
const tiersSection = `  <!-- Tangible Contribution Tiers Section -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
        Empowerment Tiers
      </span>
      <h2 class="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-2 mb-2">
        Tangible Field Impact per Contribution
      </h2>
      <p class="text-xs sm:text-sm text-[#526070]">
        Select a concrete monthly or annual intervention to direct your support.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Tier 1: ₹600 -->
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col justify-between hover:border-amber-500/50 hover:shadow-md transition-all group">
        <div>
          <div class="h-40 w-full overflow-hidden bg-slate-100 relative">
            <img src="images/donate/tier-600.webp" alt="₹600 Remedial School Kit &amp; Books" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="240" loading="lazy">
            <div class="absolute top-2.5 right-2.5 bg-amber-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
              ₹600 / Mo
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-base font-bold text-neutral-900 mb-1">Remedial School Kit</h3>
            <p class="text-xs text-[#526070] leading-relaxed mb-3">
              Funds notebooks, textbooks, stationery kits, and 1 month of community bridge tutoring for an out-of-school child.
            </p>
          </div>
        </div>
        <div class="p-5 pt-0">
          <button type="button" onclick="selectDonationTier(600)" class="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#9A3412] font-bold text-xs border border-amber-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus:ring-2 focus:ring-[#9A3412]">
            <span>Contribute ₹600</span>
            <span class="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Tier 2: ₹1,200 -->
      <div class="bg-white rounded-2xl border-2 border-[#9A3412]/40 overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#9A3412] hover:shadow-md transition-all group relative">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 bg-[#9A3412] text-white text-[9.5px] uppercase font-bold tracking-widest px-3 py-0.5 rounded-b-md z-10">
          Most Critical
        </div>
        <div>
          <div class="h-40 w-full overflow-hidden bg-slate-100 relative">
            <img src="images/donate/tier-1200.webp" alt="₹1,200 Pediatric Nutrition &amp; Health" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="240" loading="lazy">
            <div class="absolute top-2.5 right-2.5 bg-[#9A3412]/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
              ₹1,200 / Mo
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-base font-bold text-neutral-900 mb-1">Pediatric Nutrition &amp; Health</h3>
            <p class="text-xs text-[#526070] leading-relaxed mb-3">
              Supplies monthly protein micro-supplements, clean drinking filtration, and preventive medical health triage for 2 children.
            </p>
          </div>
        </div>
        <div class="p-5 pt-0">
          <button type="button" onclick="selectDonationTier(1200)" class="w-full py-2.5 px-3 rounded-xl bg-[#9A3412] hover:bg-[#7C2D12] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus:ring-2 focus:ring-[#9A3412]">
            <span>Contribute ₹1,200</span>
            <span class="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Tier 3: ₹3,600 -->
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col justify-between hover:border-amber-500/50 hover:shadow-md transition-all group">
        <div>
          <div class="h-40 w-full overflow-hidden bg-slate-100 relative">
            <img src="images/donate/tier-3600.webp" alt="₹3,600 Women Artisan Toolkit" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="240" loading="lazy">
            <div class="absolute top-2.5 right-2.5 bg-emerald-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
              ₹3,600 / Qtr
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-base font-bold text-neutral-900 mb-1">Women Artisan Toolkit</h3>
            <p class="text-xs text-[#526070] leading-relaxed mb-3">
              Equips a mother in a Self-Help Group (SHG) with an electric tailoring unit, raw textile fabrics, and vocational certification.
            </p>
          </div>
        </div>
        <div class="p-5 pt-0">
          <button type="button" onclick="selectDonationTier(3600)" class="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0F766E] font-bold text-xs border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus:ring-2 focus:ring-[#0F766E]">
            <span>Contribute ₹3,600</span>
            <span class="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Tier 4: ₹12,000 -->
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col justify-between hover:border-amber-500/50 hover:shadow-md transition-all group">
        <div>
          <div class="h-40 w-full overflow-hidden bg-slate-100 relative">
            <img src="images/donate/tier-12000.webp" alt="₹12,000 Full Annual Sponsorship" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="240" loading="lazy">
            <div class="absolute top-2.5 right-2.5 bg-indigo-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
              ₹12,000 / Yr
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-base font-bold text-neutral-900 mb-1">Annual Education Sponsorship</h3>
            <p class="text-xs text-[#526070] leading-relaxed mb-3">
              Sponsors 1 full academic year of private/model school tuition, uniforms, books, and daily nutrition for a rescued child.
            </p>
          </div>
        </div>
        <div class="p-5 pt-0">
          <button type="button" onclick="selectDonationTier(12000)" class="w-full py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#172554] font-bold text-xs border border-indigo-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus:ring-2 focus:ring-[#172554]">
            <span>Contribute ₹12,000</span>
            <span class="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  </section>\n\n`;

const targetBeforeMultiChannel = `  <!-- Multi-Channel Giving & Receipt Request Grid -->`;
if (donateContent.includes(targetBeforeMultiChannel) && !donateContent.includes('images/donate/tier-600.webp')) {
  donateContent = donateContent.replace(targetBeforeMultiChannel, tiersSection + targetBeforeMultiChannel);
  console.log('  ✔ donate.html: Injected 4 Tangible Contribution Tiers cards.');
}
fs.writeFileSync(donatePath, donateContent, 'utf8');

// Ensure selectDonationTier is added to main.js
const mainJsPath = path.join(ROOT_DIR, 'main.js');
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
if (!mainJsContent.includes('function selectDonationTier')) {
  const donationHelper = `\n// Quick select donation tier
function selectDonationTier(amount) {
  var amountInput = document.getElementById('amountPaid');
  if (amountInput) {
    amountInput.value = amount;
    var form = document.getElementById('donationReceiptForm');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      amountInput.focus();
    }
    if (typeof showToast === 'function') {
      showToast('Selected Tier: ₹' + Number(amount).toLocaleString('en-IN') + '. Enter your transaction details below.', 'info');
    }
  }
}
window.selectDonationTier = selectDonationTier;\n`;
  mainJsContent += donationHelper;
  fs.writeFileSync(mainJsPath, mainJsContent, 'utf8');
  console.log('  ✔ main.js: Appended window.selectDonationTier() helper.');
}


// ============================================================================
// 3. STORIES-EVENTS.HTML: Add Editorial Documentary Banners to Case Studies & Events
// ============================================================================
console.log('\n3. Updating stories-events.html with Case Study & Event Banners...');
const storiesPath = path.join(ROOT_DIR, 'stories-events.html');
let storiesContent = fs.readFileSync(storiesPath, 'utf8');

// Sunita banner: place directly above "From Yamuna Khadar Brick Kiln"
const sunitaOld = `<h3 class="text-headline-lg font-headline-lg text-[#172033] tracking-tight mb-4">
                From Yamuna Khadar Brick Kiln to State Board Topper: Sunita's 5-Year Journey
              </h3>`;
const sunitaNew = `<div class="w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-6 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
                <img src="images/stories/story-sunita.webp" alt="Sunita's Journey: From Yamuna Khadar Brick Kiln to State Board Topper" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" width="1200" height="675" loading="lazy">
                <div class="absolute bottom-3 left-3 bg-neutral-900/85 text-white text-xs px-3 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-amber-400">verified</span>
                  <span>Field Casework Documentation · Alwar Node</span>
                </div>
              </div>
              <h3 class="text-headline-lg font-headline-lg text-[#172033] tracking-tight mb-4">
                From Yamuna Khadar Brick Kiln to State Board Topper: Sunita's 5-Year Journey
              </h3>`;

// Bhopal SHG banner
const shgOld = `<h3 class="text-headline-md font-headline-md text-[#172033] tracking-tight mb-3">
              Breaking Generational Poverty: 24 Mothers Establish Self-Sustaining Tailoring Cooperative
            </h3>`;
const shgNew = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
              <img src="images/stories/story-shg.webp" alt="Bhopal Women's Tailoring Cooperative &amp; Self-Help Group" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="600" height="340" loading="lazy">
            </div>
            <h3 class="text-headline-md font-headline-md text-[#172033] tracking-tight mb-3">
              Breaking Generational Poverty: 24 Mothers Establish Self-Sustaining Tailoring Cooperative
            </h3>`;

// Mohan IT banner
const mohanOld = `<h3 class="text-headline-md font-headline-md text-[#172033] tracking-tight mb-3">
              Mohan's First Code: How a Ragpicker's Son Landed an IT Apprenticeship
            </h3>`;
const mohanNew = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
              <img src="images/stories/story-mohan.webp" alt="Mohan at the Digital Literacy &amp; IT Lab" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="600" height="340" loading="lazy">
            </div>
            <h3 class="text-headline-md font-headline-md text-[#172033] tracking-tight mb-3">
              Mohan's First Code: How a Ragpicker's Son Landed an IT Apprenticeship
            </h3>`;

// Event 1 (Conclave)
const event1Old = `<h3 class="text-headline-sm font-headline-sm text-[#172033] tracking-tight mb-2">
              National Girl Child Day Community Conclave
            </h3>`;
const event1New = `<div class="w-full h-40 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
              <img src="images/stories/event-conclave.webp" alt="National Girl Child Day Community Conclave Banner" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="480" height="270" loading="lazy">
            </div>
            <h3 class="text-headline-sm font-headline-sm text-[#172033] tracking-tight mb-2">
              National Girl Child Day Community Conclave
            </h3>`;

// Event 2 (Paralegal)
const event2Old = `<h3 class="text-headline-sm font-headline-sm text-[#172033] tracking-tight mb-2">
              Grassroots Paralegal &amp; Document Verification Camp
            </h3>`;
const event2New = `<div class="w-full h-40 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
              <img src="images/stories/event-paralegal.webp" alt="Grassroots Paralegal &amp; Document Verification Camp Banner" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="480" height="270" loading="lazy">
            </div>
            <h3 class="text-headline-sm font-headline-sm text-[#172033] tracking-tight mb-2">
              Grassroots Paralegal &amp; Document Verification Camp
            </h3>`;

// Event 3 (Social Audit / Assembly)
const event3Old = `<h3 class="text-headline-sm font-headline-sm text-[#172033] tracking-tight mb-2">
              Annual Public Audit &amp; Social Accountability Assembly
            </h3>`;
const event3New = `<div class="w-full h-40 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
              <img src="images/stories/event-poshan.webp" alt="Annual Public Audit &amp; Field Assembly Banner" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="480" height="270" loading="lazy">
            </div>
            <h3 class="text-headline-sm font-headline-sm text-[#172033] tracking-tight mb-2">
              Annual Public Audit &amp; Social Accountability Assembly
            </h3>`;

if (storiesContent.includes(sunitaOld) && !storiesContent.includes('images/stories/story-sunita.webp')) {
  storiesContent = storiesContent.replace(sunitaOld, sunitaNew);
  storiesContent = storiesContent.replace(shgOld, shgNew);
  storiesContent = storiesContent.replace(mohanOld, mohanNew);
  storiesContent = storiesContent.replace(event1Old, event1New);
  storiesContent = storiesContent.replace(event2Old, event2New);
  storiesContent = storiesContent.replace(event3Old, event3New);
  fs.writeFileSync(storiesPath, storiesContent, 'utf8');
  console.log('  ✔ stories-events.html: Case studies & events banners injected successfully.');
} else {
  console.log('  ℹ stories-events.html: Banners already injected or pattern missing.');
}


// ============================================================================
// 4. ABOUT.HTML: Add Registered Office Hub & Founding Heritage Visuals
// ============================================================================
console.log('\n4. Updating about.html with Jaipur Hub & Founding Heritage Visuals...');
const aboutPath = path.join(ROOT_DIR, 'about.html');
let aboutContent = fs.readFileSync(aboutPath, 'utf8');

// Inside Incorporation Dossier: place Jaipur Hub visual above grid
const dossierOld = `      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">`;
const dossierNew = `      <!-- Visual Card: Registered Field Operations Center -->
      <div class="w-full h-52 sm:h-64 rounded-xl overflow-hidden mb-6 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
        <img src="images/about/about-jaipur-hub.webp" alt="Trinetra Gargi Foundation Jaipur Registered Headquarters &amp; Operations Center" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" width="1200" height="675" loading="lazy">
        <div class="absolute bottom-3 left-3 bg-neutral-900/85 text-white text-xs px-3 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm text-amber-400">location_on</span>
          <span>Registered Office &amp; Program Coordination Center · Jagatpura, Jaipur</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">`;

if (aboutContent.includes(dossierOld) && !aboutContent.includes('images/about/about-jaipur-hub.webp')) {
  aboutContent = aboutContent.replace(dossierOld, dossierNew);
  console.log('  ✔ about.html: Injected Jaipur Hub visual in corporate dossier.');
}

// Inside Founding Genesis / History: place Founding Heritage Visual above timeline milestones
const timelineOld = `<!-- Timeline Container -->
<div class="relative border-l-2 border-surface-container ml-4 md:ml-6 space-y-12">`;
const timelineNew = `<!-- Heritage Bridge Classroom Visual -->
        <div class="w-full h-52 sm:h-64 rounded-xl overflow-hidden mb-8 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
          <img src="images/about/about-heritage-chalkboard.webp" alt="Founding Open-Air Bridge Classroom &amp; Educational Heritage" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" width="1200" height="675" loading="lazy">
          <div class="absolute bottom-3 left-3 bg-neutral-900/85 text-white text-xs px-3 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm text-amber-400">history_edu</span>
            <span>Founding Heritage · Grassroots Accelerated Bridge Classrooms</span>
          </div>
        </div>

<!-- Timeline Container -->
<div class="relative border-l-2 border-surface-container ml-4 md:ml-6 space-y-12">`;

if (aboutContent.includes(timelineOld) && !aboutContent.includes('images/about/about-heritage-chalkboard.webp')) {
  aboutContent = aboutContent.replace(timelineOld, timelineNew);
  console.log('  ✔ about.html: Injected Founding Heritage Classroom visual in history timeline.');
}
fs.writeFileSync(aboutPath, aboutContent, 'utf8');


// ============================================================================
// 5. CONTACT.HTML & CONTACT-FAQ.HTML: Add Stylized Location Map Visual Card
// ============================================================================
console.log('\n5. Updating contact.html and contact-faq.html with Location Map Visual...');
const mapOld = `          <!-- Stylized Map Card with Google Maps Outbound Link -->
          <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-amber-900 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm" aria-hidden="true">map</span> Jagatpura, Jaipur Center
              </span>
              <a href="https://maps.google.com/?q=Jagatpura,+Jaipur,+Rajasthan+302017" target="_blank" rel="noopener noreferrer" class="text-[#9A3412] font-bold underline flex items-center gap-0.5">
                <span>Google Maps</span>
                <span class="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
              </a>
            </div>
            <p class="text-[11px] text-[#526070] leading-relaxed">
              Located near Ganesh Temple in Jagatpura. Public transport access via Jagatpura Railway Station and Jaipur City Bus Route 9.
            </p>
          </div>`;

const mapNew = `          <!-- Stylized Map Card with Visual Map & Google Maps Outbound Link -->
          <div class="rounded-xl overflow-hidden border border-amber-200 bg-amber-50/60 text-xs shadow-2xs">
            <div class="h-36 w-full relative overflow-hidden bg-slate-100 border-b border-amber-200">
              <img src="images/about/office-location-map.webp" alt="Trinetra Gargi Foundation Registered Office Location Map - Jagatpura, Jaipur" class="w-full h-full object-cover" width="600" height="300" loading="lazy">
              <div class="absolute top-2.5 right-2.5">
                <span class="px-2 py-0.5 rounded-md bg-neutral-900/80 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1">
                  <span class="material-symbols-outlined text-[12px] text-amber-400">pin_drop</span> Jaipur, RJ
                </span>
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-amber-900 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm" aria-hidden="true">map</span> Jagatpura, Jaipur Center
                </span>
                <a href="https://maps.google.com/?q=Jagatpura,+Jaipur,+Rajasthan+302017" target="_blank" rel="noopener noreferrer" class="text-[#9A3412] font-bold underline flex items-center gap-0.5 hover:text-[#7C2D12]">
                  <span>Open in Google Maps</span>
                  <span class="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
                </a>
              </div>
              <p class="text-[11px] text-[#526070] leading-relaxed">
                Located near Ganesh Temple in Jagatpura. Public transport access via Jagatpura Railway Station and Jaipur City Bus Route 9.
              </p>
            </div>
          </div>`;

['contact.html', 'contact-faq.html'].forEach(fname => {
  const fpath = path.join(ROOT_DIR, fname);
  let content = fs.readFileSync(fpath, 'utf8');
  if (content.includes(mapOld)) {
    content = content.replace(mapOld, mapNew);
    fs.writeFileSync(fpath, content, 'utf8');
    console.log(`  ✔ ${fname}: Injected location map visual card.`);
  } else {
    console.log(`  ℹ ${fname}: Map visual card already injected or pattern missing.`);
  }
});


// ============================================================================
// 6. IMPACT.HTML: Add Official Document Cover Visuals for 4 Statutory Filings
// ============================================================================
console.log('\n6. Updating impact.html with 4 Statutory Filings Document Covers...');
const impactPath = path.join(ROOT_DIR, 'impact.html');
let impactContent = fs.readFileSync(impactPath, 'utf8');

// Report 1
const rep1Old = `<h3 class="text-base font-bold text-neutral-900 mb-2">Annual Activity Report FY 2025–26</h3>`;
const rep1New = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
            <img src="images/reports/report-annual-activity.webp" alt="Annual Activity Report FY 2025-26 Document Dossier Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="225" loading="lazy">
          </div>
          <h3 class="text-base font-bold text-neutral-900 mb-2">Annual Activity Report FY 2025–26</h3>`;

// Report 2
const rep2Old = `<h3 class="text-base font-bold text-neutral-900 mb-2">Audited Balance Sheet &amp; Accounts</h3>`;
const rep2New = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
            <img src="images/reports/report-financial-audit.webp" alt="Audited Balance Sheet &amp; Accounts Dossier Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="225" loading="lazy">
          </div>
          <h3 class="text-base font-bold text-neutral-900 mb-2">Audited Balance Sheet &amp; Accounts</h3>`;

// Report 3
const rep3Old = `<h3 class="text-base font-bold text-neutral-900 mb-2">Section 8 MCA License Certificate</h3>`;
const rep3New = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
            <img src="images/reports/report-mca-incorporation.webp" alt="Section 8 MCA License Incorporation Certificate Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="225" loading="lazy">
          </div>
          <h3 class="text-base font-bold text-neutral-900 mb-2">Section 8 MCA License Certificate</h3>`;

// Report 4
const rep4Old = `<h3 class="text-base font-bold text-neutral-900 mb-2">Social Impact Assessment Summary</h3>`;
const rep4New = `<div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
            <img src="images/reports/report-child-safeguarding.webp" alt="Social Impact Assessment Summary Dossier Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="225" loading="lazy">
          </div>
          <h3 class="text-base font-bold text-neutral-900 mb-2">Social Impact Assessment Summary</h3>`;

if (impactContent.includes(rep1Old) && !impactContent.includes('images/reports/report-annual-activity.webp')) {
  impactContent = impactContent.replace(rep1Old, rep1New);
  impactContent = impactContent.replace(rep2Old, rep2New);
  impactContent = impactContent.replace(rep3Old, rep3New);
  impactContent = impactContent.replace(rep4Old, rep4New);
  fs.writeFileSync(impactPath, impactContent, 'utf8');
  console.log('  ✔ impact.html: 4 statutory filing document covers injected successfully.');
} else {
  console.log('  ℹ impact.html: Document covers already injected or pattern missing.');
}

console.log('\n=== All Page Image Enhancements Applied! ===');
