const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'D:\\Trinetra ORG';

console.log('=== Applying Bright Flat Section Background Palette Across Entire Site ===\n');

const HTML_FILES = [
  'index.html',
  'about.html',
  'our-work.html',
  'government-schemes.html',
  'help-report.html',
  'stories-events.html',
  'volunteer-partner.html',
  'awareness.html',
  'impact.html',
  'donate.html',
  'contact-faq.html',
  'contact.html',
  'privacy.html',
  'terms.html',
  'disclaimer.html',
  '404.html'
];

HTML_FILES.forEach(filename => {
  const filePath = path.join(ROOT_DIR, filename);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update Tailwind config
  content = content
    .replace(/'warm-bg':\s*'[^']+'/g, "'warm-bg': '#FFFDF8'")
    .replace(/'surface-ivory':\s*'[^']+'/g, "'surface-ivory': '#FFFDF8'")
    .replace(/'surface-container':\s*'[^']+'/g, "'surface-container': '#FFFFFF'")
    .replace(/'surface-warm-card':\s*'[^']+'/g, "'surface-warm-card': '#FFFFFF'")
    .replace(/'surface-container-low':\s*'[^']+'/g, "'surface-container-low': '#FFFFFF'")
    .replace(/'surface-container-lowest':\s*'[^']+'/g, "'surface-container-lowest': '#FFFFFF'")
    .replace(/'card-white':\s*'[^']+'/g, "'card-white': '#FFFFFF'")
    .replace(/'on-surface':\s*'[^']+'/g, "'on-surface': '#172033'")
    .replace(/'primary':\s*'[^']+'/g, "'primary': '#9A3412'")
    .replace(/'primary-hover':\s*'[^']+'/g, "'primary-hover': '#7C2D12'")
    .replace(/'emergency-crimson':\s*'[^']+'/g, "'emergency-crimson': '#B91C1C'")
    .replace(/'emergency-red':\s*'[^']+'/g, "'emergency-red': '#B91C1C'")
    .replace(/'emergency-hover':\s*'[^']+'/g, "'emergency-hover': '#991B1B'")
    .replace(/'success-green':\s*'[^']+'/g, "'success-green': '#047857'")
    .replace(/'sage-soft':\s*'[^']+'/g, "'sage-soft': '#047857'")
    .replace(/'text-muted':\s*'[^']+'/g, "'text-muted': '#475569'")
    .replace(/'muted-text':\s*'[^']+'/g, "'muted-text': '#475569'");

  // Add new background keys to tailwind if not present
  if (!content.includes("'bg-hero'")) {
    content = content.replace(
      /'warm-bg':\s*'#FFFDF8',/g,
      `'warm-bg': '#FFFDF8',
            'bg-main': '#FFFDF8',
            'bg-hero': '#FFF4D6',
            'bg-work': '#FFFFFF',
            'bg-schemes': '#EEF3FF',
            'bg-impact': '#EEF8F6',
            'bg-stories': '#FFF0EC',
            'bg-help': '#FFF1F2',
            'secondary-text': '#475569',`
    );
  }

  // 2. Update Body Tag
  content = content.replace(
    /<body class="bg-\[#FFF9F1\]/g,
    '<body class="bg-[#FFFDF8]'
  );

  // 3. Update Header background
  content = content.replace(
    /bg-\[#FFF9F1\]\/95/g,
    'bg-[#FFFDF8]/95'
  );

  // 4. Update Cache Busting Query String
  content = content
    .replace(/styles\.css\?v=\d+/g, 'styles.css?v=18')
    .replace(/main\.js\?v=\d+/g, 'main.js?v=18');

  // 5. Replace secondary / muted text colors
  content = content
    .replace(/#526070/g, '#475569')
    .replace(/text-stone-600/g, 'text-[#475569]')
    .replace(/text-stone-500/g, 'text-[#475569]')
    .replace(/text-neutral-600/g, 'text-[#475569]');

  // 6. File-specific section transformations
  if (filename === 'index.html') {
    // Hero Section: Flat #FFF4D6
    content = content.replace(
      /<section id="hero" class="[^"]*"/,
      '<section id="hero" class="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-[#FFF4D6] border-b border-amber-200/80" data-aos="fade-up"'
    );

    // Help & Report Portal: Flat #FFF1F2
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 sm:py-16 bg-\[#[^\]]+\] border-b border-amber-500\/20" id="help-portal">/,
      '<section data-aos="fade-up" class="py-12 sm:py-16 bg-[#FFF1F2] border-b border-rose-200/80" id="help-portal">'
    );

    // Our Work: Flat #FFFFFF
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-b border-amber-500\/20" id="our-work">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFFFFF] border-b border-slate-200/80" id="our-work">'
    );

    // Government Schemes: Flat #EEF3FF
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-y border-amber-500\/20" id="government-schemes">/,
      '<section data-aos="fade-up" class="py-20 bg-[#EEF3FF] border-y border-blue-200/80" id="government-schemes">'
    );

    // Donate / Transparency: Flat #FFFDF8
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-b border-amber-500\/20" id="donate">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFFDF8] border-b border-amber-200/60" id="donate">'
    );

    // Impact Section: Flat #EEF8F6
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-b border-amber-500\/20" id="impact">/,
      '<section data-aos="fade-up" class="py-20 bg-[#EEF8F6] border-b border-teal-200/80" id="impact">'
    );

    // Stories Section: Flat #FFF0EC
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-b border-amber-500\/20" id="stories">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFF0EC] border-b border-orange-200/80" id="stories">'
    );

    // Partner Section: Flat #FFFFFF
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-b border-amber-500\/20" id="partner">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFFFFF] border-b border-slate-200/80" id="partner">'
    );

    // FAQ Section: Flat #FFFDF8
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\]">\s*<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">\s*<div class="text-center mb-12">\s*<div class="editorial-kicker mb-2">Answers &amp; Clarifications<\/div>/,
      `<section data-aos="fade-up" class="py-20 bg-[#FFFDF8] border-t border-slate-200/60">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <div class="editorial-kicker mb-2">Answers &amp; Clarifications</div>`
    );
  }

  if (filename === 'government-schemes.html') {
    // Hero: Flat #FFF4D6
    content = content.replace(
      /<section data-aos="fade-up" class="bg-gradient-to-b from-white via-surface-ivory to-surface-container-low border-b border-surface-container py-12 md:py-16">/,
      '<section data-aos="fade-up" class="bg-[#FFF4D6] border-b border-amber-200/80 py-12 md:py-16">'
    );
    // Search bar: pure white
    content = content.replace(
      /<section data-aos="fade-up" class="bg-surface-container-lowest border-b border-surface-container sticky top-20 z-40 shadow-xs">/,
      '<section data-aos="fade-up" class="bg-white border-b border-slate-200 sticky top-20 z-40 shadow-xs">'
    );
    // Schemes Matrix: Flat #EEF3FF
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="schemes-matrix">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#EEF3FF] border-b border-blue-200/80" id="schemes-matrix"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    );
    // Fix closing tag for schemes-matrix if needed
    if (content.includes('id="schemes-matrix"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">') && !content.includes('<!-- End Schemes Matrix -->')) {
      content = content.replace(
        /<\/section>\s*<!-- Document Readiness & Application Assistance Desk -->/i,
        '</div></section>\n<!-- End Schemes Matrix -->\n<!-- Document Readiness & Application Assistance Desk -->'
      );
    }
    // Readiness Desk: Flat #FFFFFF
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="readiness-desk">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#FFFFFF] border-b border-slate-200/80" id="readiness-desk"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    );
    if (content.includes('id="readiness-desk"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">') && !content.includes('<!-- End Readiness Desk -->')) {
      content = content.replace(
        /<\/section>\s*<!-- Statutory Citizen Welfare FAQ -->/i,
        '</div></section>\n<!-- End Readiness Desk -->\n<!-- Statutory Citizen Welfare FAQ -->'
      );
    }
  }

  if (filename === 'impact.html') {
    // Hero: Flat #FFF4D6
    content = content.replace(
      /<section class="py-12 md:py-16 bg-gradient-to-b from-\[#[^\]]+\] via-\[#[^\]]+\] to-\[#[^\]]+\] border-b border-amber-500\/20">/,
      '<section class="py-12 md:py-16 bg-[#FFF4D6] border-b border-amber-200/80">'
    );
    // Field metrics section: Flat #EEF8F6
    content = content.replace(
      /<section class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/,
      '<section class="py-12 md:py-16 bg-[#EEF8F6] border-b border-teal-200/80"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    );
    if (content.includes('class="py-12 md:py-16 bg-[#EEF8F6] border-b border-teal-200/80"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">') && !content.includes('<!-- End Field Metrics -->')) {
      content = content.replace(
        /<\/section>\s*<!-- Section 2: Longitudinal Casework Transformation -->/i,
        '</div></section>\n<!-- End Field Metrics -->\n<!-- Section 2: Longitudinal Casework Transformation -->'
      );
    }
  }

  if (filename === 'stories-events.html') {
    // Main header / banner: Flat #FFF4D6
    content = content.replace(
      /<div class="mb-10 text-center max-w-4xl mx-auto pt-4">/,
      '<div class="py-12 px-4 sm:px-6 lg:px-8 bg-[#FFF4D6] border-b border-orange-200/80 mb-10 text-center"><div class="max-w-4xl mx-auto">'
    );
    if (content.includes('bg-[#FFF4D6] border-b border-orange-200/80 mb-10 text-center"><div class="max-w-4xl mx-auto">') && !content.includes('<!-- End Stories Banner -->')) {
      content = content.replace(
        /<\/p>\s*<\/div>\s*<!-- SECTION 1: IN-DEPTH FEATURED CASE STUDIES -->/i,
        '</p></div></div>\n<!-- End Stories Banner -->\n<!-- SECTION 1: IN-DEPTH FEATURED CASE STUDIES -->'
      );
    }
    // Stories content: wrap or set to #FFF0EC
    content = content.replace(
      /<div class="mb-16">/,
      '<div class="mb-16 bg-[#FFF0EC] py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border border-orange-200/70">'
    );
  }

  if (filename === 'help-report.html') {
    // Hero & Hotlines: Flat #FFF1F2
    content = content.replace(
      /<section data-aos="fade-up" class="bg-surface-container-low\/60 border-b border-surface-container py-10 md:py-14" id="emergency-hotlines">/,
      '<section data-aos="fade-up" class="bg-[#FFF1F2] border-b border-rose-200/80 py-10 md:py-14" id="emergency-hotlines">'
    );
    // Intake form section: Flat #FFF1F2
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="report-intake-form">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#FFF1F2] border-b border-rose-200/80" id="report-intake-form"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    );
    if (content.includes('id="report-intake-form"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">') && !content.includes('<!-- End Intake Section -->')) {
      content = content.replace(
        /<\/section>\s*<!-- CITIZEN RIGHTS & SAFEGUARDING ASSURANCE -->/i,
        '</div></section>\n<!-- End Intake Section -->\n<!-- CITIZEN RIGHTS & SAFEGUARDING ASSURANCE -->'
      );
    }
  }

  if (filename === 'our-work.html') {
    // Hero: Flat #FFF4D6
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 bg-gradient-to-b from-white via-surface-ivory to-surface-container-low border-b border-surface-container">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#FFF4D6] border-b border-amber-200/80">'
    );
    // Pillars: Flat #FFFFFF
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="core-pillars">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#FFFFFF] border-b border-slate-200/80" id="core-pillars"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    );
    if (content.includes('id="core-pillars"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">') && !content.includes('<!-- End Core Pillars -->')) {
      content = content.replace(
        /<\/section>\s*<!-- Strategic Longitudinal Outcomes: 5-Year Impact Trajectory -->/i,
        '</div></section>\n<!-- End Core Pillars -->\n<!-- Strategic Longitudinal Outcomes: 5-Year Impact Trajectory -->'
      );
    }
  }

  if (filename === 'about.html') {
    // Hero: Flat #FFF4D6
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 bg-gradient-to-b from-white via-surface-ivory to-surface-container-low border-b border-surface-container">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#FFF4D6] border-b border-amber-200/80">'
    );
    // Philosophy / Mission: Flat #FFFFFF
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="philosophy-origins">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#FFFFFF] border-b border-slate-200/80" id="philosophy-origins"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    );
    if (content.includes('id="philosophy-origins"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">') && !content.includes('<!-- End Philosophy -->')) {
      content = content.replace(
        /<\/section>\s*<!-- Comprehensive Statutory Governance Dossier -->/i,
        '</div></section>\n<!-- End Philosophy -->\n<!-- Comprehensive Statutory Governance Dossier -->'
      );
    }
    // Statutory Dossier: Flat #EEF3FF
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 bg-surface-container-low\/60 border-y border-surface-container" id="statutory-governance">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#EEF3FF] border-y border-blue-200/80" id="statutory-governance">'
    );
  }

  if (filename === 'awareness.html') {
    // Hero: Flat #FFF4D6
    content = content.replace(
      /<section class="py-12 md:py-16 bg-gradient-to-b from-\[#[^\]]+\] via-\[#[^\]]+\] to-\[#[^\]]+\] border-b border-amber-500\/20">/,
      '<section class="py-12 md:py-16 bg-[#FFF4D6] border-b border-amber-200/80">'
    );
    // Downloadable materials: Flat #EEF3FF
    content = content.replace(
      /<section class="py-12 md:py-16 bg-\[#[^\]]+\] border-y border-amber-500\/20">/,
      '<section class="py-12 md:py-16 bg-[#EEF3FF] border-y border-blue-200/80">'
    );
  }

  if (filename === 'volunteer-partner.html') {
    // Hero: Flat #FFF4D6
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 bg-gradient-to-b from-white via-surface-ivory to-surface-container-low border-b border-surface-container">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#FFF4D6] border-b border-amber-200/80">'
    );
    // Volunteer Form section: Flat #EEF8F6
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="volunteer-fellowship">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#EEF8F6] border-b border-teal-200/80" id="volunteer-fellowship"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    );
    if (content.includes('id="volunteer-fellowship"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">') && !content.includes('<!-- End Volunteer Fellowship -->')) {
      content = content.replace(
        /<\/section>\s*<!-- Pathway 2: Corporate CSR Partnership Matrix -->/i,
        '</div></section>\n<!-- End Volunteer Fellowship -->\n<!-- Pathway 2: Corporate CSR Partnership Matrix -->'
      );
    }
    // CSR Section: Flat #EEF3FF
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 md:py-16 bg-surface-container-low\/60 border-y border-surface-container" id="corporate-csr">/,
      '<section data-aos="fade-up" class="py-12 md:py-16 bg-[#EEF3FF] border-y border-blue-200/80" id="corporate-csr">'
    );
  }

  if (filename === 'donate.html') {
    // Hero: Flat #FFF4D6
    content = content.replace(
      /<section class="py-12 md:py-16 bg-gradient-to-b from-\[#[^\]]+\] via-\[#[^\]]+\] to-\[#[^\]]+\] border-b border-amber-500\/20">/,
      '<section class="py-12 md:py-16 bg-[#FFF4D6] border-b border-amber-200/80">'
    );
  }

  if (filename === 'contact-faq.html' || filename === 'contact.html') {
    // Hero: Flat #FFF4D6
    content = content.replace(
      /<section class="py-12 md:py-16 bg-gradient-to-b from-\[#[^\]]+\] via-\[#[^\]]+\] to-\[#[^\]]+\] border-b border-amber-500\/20">/,
      '<section class="py-12 md:py-16 bg-[#FFF4D6] border-b border-amber-200/80">'
    );
  }

  if (filename === 'privacy.html' || filename === 'terms.html' || filename === 'disclaimer.html') {
    // Hero: Flat #FFF4D6
    content = content.replace(
      /<section class="py-12 md:py-16 bg-gradient-to-b from-\[#[^\]]+\] via-\[#[^\]]+\] to-\[#[^\]]+\] border-b border-amber-500\/20">/,
      '<section class="py-12 md:py-16 bg-[#FFF4D6] border-b border-amber-200/80">'
    );
  }

  // 7. Replace any remaining dull beige/gray section classes
  content = content
    .replace(/bg-\[#FFF9F1\]/g, 'bg-[#FFFDF8]')
    .replace(/bg-surface-ivory/g, 'bg-[#FFFDF8]')
    .replace(/bg-stone-50(?!\d)/g, 'bg-white')
    .replace(/bg-stone-100(?!\d)/g, 'bg-slate-50')
    .replace(/border-amber-500\/20/g, 'border-slate-200/80')
    .replace(/border-amber-200\/70/g, 'border-slate-200/80');

  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log(`  ✔ Successfully brightened ${filename}`);
});

console.log('\n=== All 16 Pages Successfully Processed with Bright Flat Backgrounds ===\n');
