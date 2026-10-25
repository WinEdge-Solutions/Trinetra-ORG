const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'D:\\Trinetra ORG';

console.log('=== Step 3: Applying Remaining Image Injections (CRLF-Safe) ===\n');

// ============================================================================
// 1. STORIES-EVENTS.HTML
// ============================================================================
console.log('1. Processing stories-events.html...');
const storiesPath = path.join(ROOT_DIR, 'stories-events.html');
let stories = fs.readFileSync(storiesPath, 'utf8');
const hadCRLFStories = stories.includes('\r\n');
stories = stories.replace(/\r\n/g, '\n');

// 1. Sunita
const sunitaBanner = `              <div class="w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-6 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
                <img src="images/stories/story-sunita.webp" alt="Sunita's Journey: From Yamuna Khadar Brick Kiln to State Board Topper" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" width="1200" height="675" loading="lazy">
                <div class="absolute bottom-3 left-3 bg-neutral-900/85 text-white text-xs px-3 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-amber-400">verified</span>
                  <span>Field Casework Documentation · Alwar Node</span>
                </div>
              </div>\n`;

const sunitaTarget = `<h3 class="text-headline-lg font-headline-lg text-[#172033] tracking-tight mb-4">
                From Yamuna Khadar Brick Kiln to State Board Topper: Sunita's 5-Year Journey
              </h3>`;

if (stories.includes(sunitaTarget) && !stories.includes('images/stories/story-sunita.webp')) {
  stories = stories.replace(sunitaTarget, sunitaBanner + sunitaTarget);
  console.log('  ✔ Injected Sunita case study banner.');
} else {
  console.log('  ℹ Sunita check:', stories.includes(sunitaTarget), stories.includes('images/stories/story-sunita.webp'));
}

// 2. Bhopal SHG
const shgBanner = `            <div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
              <img src="images/stories/story-shg.webp" alt="Bhopal Women's Tailoring Cooperative &amp; Self-Help Group" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="600" height="340" loading="lazy">
            </div>\n`;

const shgTarget = `<h3 class="text-headline-md font-headline-md text-[#172033] tracking-tight mb-3">
              Breaking Generational Poverty: 24 Mothers Establish Self-Sustaining Tailoring Cooperative
            </h3>`;

if (stories.includes(shgTarget) && !stories.includes('images/stories/story-shg.webp')) {
  stories = stories.replace(shgTarget, shgBanner + shgTarget);
  console.log('  ✔ Injected Bhopal SHG banner.');
}

// 3. Mohan IT
const mohanBanner = `            <div class="w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
              <img src="images/stories/story-mohan.webp" alt="Mohan at the Digital Literacy &amp; IT Lab" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="600" height="340" loading="lazy">
            </div>\n`;

const mohanTarget = `<h3 class="text-headline-md font-headline-md text-[#172033] tracking-tight mb-3">
              Mohan's First Code: How a Ragpicker's Son Landed an IT Apprenticeship
            </h3>`;

if (stories.includes(mohanTarget) && !stories.includes('images/stories/story-mohan.webp')) {
  stories = stories.replace(mohanTarget, mohanBanner + mohanTarget);
  console.log('  ✔ Injected Mohan IT lab banner.');
}

// 4. Conclave Event
const conclaveBanner = `            <div class="w-full h-40 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
              <img src="images/stories/event-conclave.webp" alt="National Girl Child Day Community Conclave Banner" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="480" height="270" loading="lazy">
            </div>\n`;

const conclaveTarget = `<h3 class="text-headline-sm font-headline-sm text-[#172033] tracking-tight mb-2">
              National Girl Child Day Community Conclave
            </h3>`;

if (stories.includes(conclaveTarget) && !stories.includes('images/stories/event-conclave.webp')) {
  stories = stories.replace(conclaveTarget, conclaveBanner + conclaveTarget);
  console.log('  ✔ Injected National Girl Child Day Conclave banner.');
}

// 5. Paralegal Camp Event
const paralegalBanner = `            <div class="w-full h-40 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
              <img src="images/stories/event-paralegal.webp" alt="Grassroots Paralegal &amp; Document Verification Camp Banner" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="480" height="270" loading="lazy">
            </div>\n`;

const paralegalTarget = `<h3 class="text-headline-sm font-headline-sm text-[#172033] tracking-tight mb-2">
              Grassroots Paralegal &amp; Document Verification Camp
            </h3>`;

if (stories.includes(paralegalTarget) && !stories.includes('images/stories/event-paralegal.webp')) {
  stories = stories.replace(paralegalTarget, paralegalBanner + paralegalTarget);
  console.log('  ✔ Injected Paralegal Camp banner.');
}

// 6. Annual Public Audit Event
const auditBanner = `            <div class="w-full h-40 rounded-xl overflow-hidden mb-4 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
              <img src="images/stories/event-poshan.webp" alt="Annual Public Audit &amp; Field Assembly Banner" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="480" height="270" loading="lazy">
            </div>\n`;

const auditTarget = `<h3 class="text-headline-sm font-headline-sm text-[#172033] tracking-tight mb-2">
              Annual Public Audit &amp; Social Accountability Assembly
            </h3>`;

if (stories.includes(auditTarget) && !stories.includes('images/stories/event-poshan.webp')) {
  stories = stories.replace(auditTarget, auditBanner + auditTarget);
  console.log('  ✔ Injected Annual Public Audit banner.');
}

if (hadCRLFStories) stories = stories.replace(/\n/g, '\r\n');
fs.writeFileSync(storiesPath, stories, 'utf8');


// ============================================================================
// 2. ABOUT.HTML: Heritage Bridge Classroom Visual
// ============================================================================
console.log('\n2. Processing about.html heritage banner...');
const aboutPath = path.join(ROOT_DIR, 'about.html');
let about = fs.readFileSync(aboutPath, 'utf8');
const hadCRLFAbout = about.includes('\r\n');
about = about.replace(/\r\n/g, '\n');

const heritageBanner = `        <!-- Heritage Bridge Classroom Visual -->
        <div class="w-full h-52 sm:h-64 rounded-xl overflow-hidden mb-8 border border-slate-200/90 relative bg-slate-100 shadow-2xs group">
          <img src="images/about/about-heritage-chalkboard.webp" alt="Founding Open-Air Bridge Classroom &amp; Educational Heritage" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" width="1200" height="675" loading="lazy">
          <div class="absolute bottom-3 left-3 bg-neutral-900/85 text-white text-xs px-3 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm text-amber-400">history_edu</span>
            <span>Founding Heritage · Grassroots Accelerated Bridge Classrooms</span>
          </div>
        </div>\n\n`;

const timelineContainerMarker = `<!-- Timeline Container -->`;
if (about.includes(timelineContainerMarker) && !about.includes('images/about/about-heritage-chalkboard.webp')) {
  about = about.replace(timelineContainerMarker, heritageBanner + timelineContainerMarker);
  console.log('  ✔ Injected Founding Heritage visual into about.html.');
} else {
  console.log('  ℹ About heritage status:', about.includes(timelineContainerMarker), about.includes('images/about/about-heritage-chalkboard.webp'));
}

if (hadCRLFAbout) about = about.replace(/\n/g, '\r\n');
fs.writeFileSync(aboutPath, about, 'utf8');


// ============================================================================
// 3. CONTACT.HTML & CONTACT-FAQ.HTML: Stylized Location Map Visual Card
// ============================================================================
console.log('\n3. Processing contact.html and contact-faq.html location map cards...');
const mapCardRegex = /<!-- Stylized Map Card with Google Maps Outbound Link -->\s*<div class="p-4 rounded-xl bg-amber-50\/60 border border-amber-200 text-xs">[\s\S]*?<\/div>\s*<\/div>/;

const newMapCard = `<!-- Stylized Map Card with Visual Map & Google Maps Outbound Link -->
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
  const hadCRLF = content.includes('\r\n');
  content = content.replace(/\r\n/g, '\n');

  if (content.includes('<!-- Stylized Map Card with Google Maps Outbound Link -->')) {
    // Find exact block boundaries
    const startIdx = content.indexOf('<!-- Stylized Map Card with Google Maps Outbound Link -->');
    const endSnippet = '</p>\n          </div>';
    const endIdx = content.indexOf(endSnippet, startIdx);
    if (endIdx !== -1) {
      content = content.slice(0, startIdx) + newMapCard + content.slice(endIdx + endSnippet.length);
      console.log(`  ✔ Injected location map visual into ${fname}.`);
    } else {
      console.log(`  ⚠ Could not find endSnippet in ${fname}`);
    }
  } else {
    console.log(`  ℹ Location map marker not found or already replaced in ${fname}.`);
  }

  if (hadCRLF) content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(fpath, content, 'utf8');
});

console.log('\n=== Step 3 Completed! ===');
