const fs = require('fs');
const path = require('path');

console.log('--- Applying Security & Safeguarding Hardening Pass ---');

// 1. HARDEN help-report.html
const helpReportPath = path.join(__dirname, '..', 'help-report.html');
let helpHtml = fs.readFileSync(helpReportPath, 'utf8');

// A. Remove unnecessary libraries from help-report.html (supply chain & privacy)
helpHtml = helpHtml.replace(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/countup\.js\/[^"]+"><\/script>\r?\n?/g, '');
helpHtml = helpHtml.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/canvas-confetti@[^"]+"><\/script>\r?\n?/g, '');

// B. Truthful, trauma-informed claims (remove false encryption / geolocation claims)
helpHtml = helpHtml.replace(
  'End-to-End Encrypted Case Intake',
  'Confidential Crisis & Distress Intake'
);
helpHtml = helpHtml.replace(
  '5. Contact Information (Optional &amp; Encrypted)',
  '5. Contact Information (Optional &amp; Confidential)'
);
helpHtml = helpHtml.replace(
  'End-to-End Encrypted Signal/WhatsApp Only',
  'Secure Messaging / WhatsApp Only'
);
helpHtml = helpHtml.replace(
  'Report Successfully Encrypted and Dispatched.',
  'Confidential Report Registered.'
);
helpHtml = helpHtml.replace(
  'Our central crisis triage verifies geolocation authenticity, assesses imminent physical peril, and logs the secure case docket.',
  'Our central crisis triage desk reviews the manual landmark details provided, assesses imminent peril, and prepares the statutory dossier.'
);
helpHtml = helpHtml.replace(
  `When the 'Anonymous Submission Mode' is toggled, our servers discard client IP addresses and user agents at the memory buffer level before saving the case record. Case reports are encrypted at rest with AES-256 and only accessed by authorized caseworkers.`,
  `When 'Anonymous Submission Mode' is selected, no personal names or contact numbers are requested or recorded. Furthermore, our server architecture implements strict privacy protections: requests are processed with zero persistent PII logging, and client IP addresses are immediately reduced to one-way privacy hashes for rate limiting and never permanently stored.`
);

// C. Fix Quick Exit card in help-report.html
const oldQuickExitCard = `<a class="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-[#172033] font-label-md text-label-md transition-colors border border-outline-variant" href="https://weather.com" target="_top">
<span>Quick Exit to Neutral Site</span>
<span class="material-symbols-outlined text-sm">open_in_new</span>
</a>`;

const newQuickExitCard = `<a class="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-label-md text-label-md transition-colors border border-red-700" href="https://www.google.com" onclick="triggerQuickExit(event)">
<span class="material-symbols-outlined text-sm" aria-hidden="true">logout</span>
<span>Quick Exit to Google</span>
</a>
<p class="text-[11px] text-text-muted mt-2 text-center italic">Quick Exit leaves this site. It cannot erase browser history.</p>`;

if (helpHtml.includes('href="https://weather.com"')) {
  helpHtml = helpHtml.replace(oldQuickExitCard, newQuickExitCard);
}

// D. Add Emergency Guidance Warning Banner prominently above #emergencyIntakeForm
const emergencyBanner = `<!-- Prominent Emergency Guidance Warning Banner per docs/SAFEGUARDING-AND-LEGAL.md -->
<div class="mb-6 p-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-950 space-y-2">
  <div class="flex items-center gap-2 font-bold text-red-800 text-sm">
    <span class="material-symbols-outlined text-red-600 text-xl" aria-hidden="true">emergency</span>
    <span>Immediate Life-Safety Emergency Guidance</span>
  </div>
  <p class="text-xs text-red-900 leading-relaxed">
    If a child, woman, or individual is in immediate physical danger, being harmed, or an illegal incident is in active progress, <strong>do not wait for an online form review</strong>. Call statutory emergency services immediately:
  </p>
  <div class="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold">
    <a href="tel:1098" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#B91C1C] text-white hover:bg-red-800 transition-colors">
      <span class="material-symbols-outlined text-sm" aria-hidden="true">call</span> Childline: 1098
    </a>
    <a href="tel:181" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#9A3412] text-white hover:bg-orange-800 transition-colors">
      <span class="material-symbols-outlined text-sm" aria-hidden="true">call</span> Women Helpline: 181
    </a>
    <a href="tel:112" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#172554] text-white hover:bg-indigo-900 transition-colors">
      <span class="material-symbols-outlined text-sm" aria-hidden="true">call</span> Police / Emergency: 112
    </a>
    <span class="inline-flex items-center text-[11px] text-red-700 italic px-1">
      (Emergency helplines: Verify before launch)
    </span>
  </div>
</div>
`;

if (!helpHtml.includes('Immediate Life-Safety Emergency Guidance')) {
  helpHtml = helpHtml.replace(
    '<form class="space-y-8" id="emergencyIntakeForm"',
    emergencyBanner + '\n<form class="space-y-8" id="emergencyIntakeForm"'
  );
}

fs.writeFileSync(helpReportPath, helpHtml, 'utf8');
console.log('✓ help-report.html hardened successfully');

// 2. HARDEN volunteer-partner.html
const volunteerPath = path.join(__dirname, '..', 'volunteer-partner.html');
let volHtml = fs.readFileSync(volunteerPath, 'utf8');

// Fix inline onclick alert on campus chapter
volHtml = volHtml.replace(
  `onclick="alert('Campus Chapter prospectus dispatched to your email.');"`,
  `onclick="showToast('Campus Chapter prospectus dispatched to your institutional coordinates.', 'success')"`
);

// Add input names in volunteer form if missing
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Full Legal Name *</label>\n<input class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Full Legal Name *</label>\n<input name="fullName" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Phone / WhatsApp Number *</label>\n<input class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Phone / WhatsApp Number *</label>\n<input name="phone" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Email Address *</label>\n<input class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Email Address *</label>\n<input name="email" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">City &amp; District *</label>\n<input class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">City &amp; District *</label>\n<input name="city" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Primary Area of Interest *</label>\n<select class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Primary Area of Interest *</label>\n<select name="preferredRole" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Weekly Availability *</label>\n<select class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Weekly Availability *</label>\n<select name="weeklyAvailabilityHours" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Academic / Professional Background *</label>\n<input class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Academic / Professional Background *</label>\n<input name="skillsAndBackground" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Motivation Statement (Briefly share why you want to serve) *</label>\n<textarea class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Motivation Statement (Briefly share why you want to serve) *</label>\n<textarea name="message" class="w-full px-4 py-2.5'
);

// Add input names in CSR form if missing
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Organization / Enterprise Name *</label>\n<input class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Organization / Enterprise Name *</label>\n<input name="companyName" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">CSR Lead / Contact Person Name *</label>\n<input class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">CSR Lead / Contact Person Name *</label>\n<input name="contactPersonName" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Official Corporate Email *</label>\n<input class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Official Corporate Email *</label>\n<input name="officialEmail" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Direct Telephone Number *</label>\n<input class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Direct Telephone Number *</label>\n<input name="phone" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Annual CSR Budget Range (INR) *</label>\n<select class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Annual CSR Budget Range (INR) *</label>\n<select name="budgetRange" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Preferred Thematic Area *</label>\n<select class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Preferred Thematic Area *</label>\n<select name="targetPillar" class="w-full px-4 py-2.5'
);
volHtml = volHtml.replace(
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Project Specifications &amp; Target Geography (Optional)</label>\n<textarea class="w-full px-4 py-2.5',
  '<label class="text-label-md font-label-md text-[#172033] font-semibold">Project Specifications &amp; Target Geography (Optional)</label>\n<textarea name="message" class="w-full px-4 py-2.5'
);

fs.writeFileSync(volunteerPath, volHtml, 'utf8');
console.log('✓ volunteer-partner.html hardened successfully');

// 3. AUDIT ALL HTML FILES FOR CDN PINNING, CROSSORIGIN, AND CONSISTENT QUICK EXIT
const htmlFiles = [
  'index.html',
  'about.html',
  'our-work.html',
  'government-schemes.html',
  'impact.html',
  'stories-events.html',
  'volunteer-partner.html',
  'help-report.html',
  'donate.html',
  'contact.html',
  'contact-faq.html',
  'awareness.html',
  'privacy.html',
  'terms.html',
  'disclaimer.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Pin exact CDN versions and ensure crossorigin="anonymous"
  content = content.replace(
    'https://unpkg.com/@popperjs/core@2',
    'https://unpkg.com/@popperjs/core@2.11.8/dist/umd/popper.min.js'
  );
  content = content.replace(
    'https://unpkg.com/tippy.js@6',
    'https://unpkg.com/tippy.js@6.3.7/dist/tippy-bundle.umd.min.js'
  );

  // Ensure crossorigin="anonymous" on CDN scripts
  content = content.replace(
    /<script src="(https:\/\/(?:cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com)[^"]+)"(?!.*crossorigin)/g,
    '<script src="$1" crossorigin="anonymous"'
  );

  // Ensure crossorigin="anonymous" on CDN stylesheets
  content = content.replace(
    /<link rel="stylesheet" href="(https:\/\/(?:cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com)[^"]+)"(?!.*crossorigin)/g,
    '<link rel="stylesheet" href="$1" crossorigin="anonymous"'
  );

  // Consistent Quick Exit tooltip / aria label
  content = content.replace(
    'title="Quick Emergency Exit"',
    'title="Quick Exit: Leaves this site immediately. It cannot erase browser history." aria-label="Quick Exit: Leaves this site immediately. It cannot erase browser history."'
  );
  content = content.replace(
    'data-tippy-content="Quick Safety Exit: Instantly close this page and redirect to Google to protect your browsing safety"',
    'data-tippy-content="Quick Exit leaves this site immediately. It cannot erase browser history."'
  );

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('✓ All 15 HTML files audited for supply chain, CDN pinning, and Quick Exit consistency');

// 4. SANITIZE STITCH DESIGN EXPORT FILES
const stitchDir = path.join(__dirname, '..', 'stitch_ngo_foundation_website_design');
if (fs.existsSync(stitchDir)) {
  function walkDir(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(item => {
      const full = path.join(dir, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walkDir(full);
      } else if (item.endsWith('.html') || item.endsWith('.md')) {
        let sc = fs.readFileSync(full, 'utf8');
        let modified = false;

        // Replace unverified claims in stitch design exports
        if (sc.includes('80G') || sc.includes('12A') || sc.includes('FCRA')) {
          sc = sc
            .replace(/Sec 80G 50% Tax Relief &amp; FCRA Certified/g, 'Section 8 Licensed Non-Profit Entity')
            .replace(/80G &amp; 12A Certified/g, 'Section 8 Licensed Non-Profit')
            .replace(/80G &amp; 12A Compliant/g, 'Section 8 Compliant')
            .replace(/80G, 12A Certified &amp; FCRA Compliant/g, 'Section 8 Non-Profit Compliant')
            .replace(/80G Tax Exemption Certified/g, 'Section 8 Registered Non-Profit')
            .replace(/80G Tax Exemption/g, 'Statutory Donation Accounting')
            .replace(/80G Tax Relief/g, 'Section 8 Support')
            .replace(/80G CERTIFIED/g, 'SECTION 8 LICENSED')
            .replace(/Section 80G Certified/g, 'Section 8 Licensed Entity')
            .replace(/Instant 80G Digital Tax Receipt/g, 'Official Contribution Receipt')
            .replace(/Instant 80G Certificate/g, 'Official Contribution Receipt')
            .replace(/100% Tax Exempt \(80G\)/g, 'Section 8 Charitable Support')
            .replace(/Tax Deductible \(80G\)/g, 'Section 8 Support')
            .replace(/Tax Exemption Guaranteed \(50% Deduction under Sec 80G\)/g, 'Tax exemption verification pending statutory filing.')
            .replace(/Unique 80G No: AAATT1029NF20214/g, 'Corporate CIN: U85300RJ2026NPL098757')
            .replace(/80G \/ 12A URN: <strong>AAATA8921PF20214<\/strong>/g, 'Corporate CIN: <strong>U85300RJ2026NPL098757</strong>')
            .replace(/\(FCRA, 80G &amp; 12A Certified\)/g, '(Section 8 Licensed Non-Profit)')
            .replace(/\(FCRA &amp; 80G Certified\)/g, '(Section 8 Licensed Non-Profit)');
          fs.writeFileSync(full, sc, 'utf8');
          modified = true;
        }
      }
    });
  }
  walkDir(stitchDir);
  console.log('✓ Stitch design exports sanitized of unverified tax claims');
}

console.log('--- Pass Complete ---');
