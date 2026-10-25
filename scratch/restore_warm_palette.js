const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'D:\\Trinetra ORG';

console.log('=== Restoring Previous Warm Luminous Background Palette (#FFF9F1 / #FFFFFF) Across All Files ===\n');

// 1. Update styles.css
const cssPath = path.join(ROOT_DIR, 'styles.css');
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');

  // Update root variables
  css = css
    .replace(/--bg-main:\s*#[a-fA-F0-9]+;/g, '--bg-main: #FFF9F1;')
    .replace(/--bg-hero:\s*#[a-fA-F0-9]+;/g, '--bg-hero: #FFF9F1;')
    .replace(/--bg-work:\s*#[a-fA-F0-9]+;/g, '--bg-work: #FFFFFF;')
    .replace(/--bg-schemes:\s*#[a-fA-F0-9]+;/g, '--bg-schemes: #FFF9F1;')
    .replace(/--bg-impact:\s*#[a-fA-F0-9]+;/g, '--bg-impact: #FFFFFF;')
    .replace(/--bg-stories:\s*#[a-fA-F0-9]+;/g, '--bg-stories: #FFF9F1;')
    .replace(/--bg-help:\s*#[a-fA-F0-9]+;/g, '--bg-help: #FFF9F1;')
    .replace(/--card-white:\s*#[a-fA-F0-9]+;/g, '--card-white: #FFFFFF;')
    .replace(/--text-secondary:\s*#[a-fA-F0-9]+;/g, '--text-secondary: #526070;')
    .replace(/--text-muted:\s*#[a-fA-F0-9]+;/g, '--text-muted: #526070;');

  // Update section classes
  css = css
    .replace(/\.bg-section-main\s*\{\s*background-color:\s*#[a-fA-F0-9]+\s*!important;\s*\}/g, '.bg-section-main { background-color: #FFF9F1 !important; }')
    .replace(/\.bg-section-hero\s*\{\s*background-color:\s*#[a-fA-F0-9]+\s*!important;\s*\}/g, '.bg-section-hero { background-color: #FFF9F1 !important; }')
    .replace(/\.bg-section-work\s*\{\s*background-color:\s*#[a-fA-F0-9]+\s*!important;\s*\}/g, '.bg-section-work { background-color: #FFFFFF !important; }')
    .replace(/\.bg-section-schemes\s*\{\s*background-color:\s*#[a-fA-F0-9]+\s*!important;\s*\}/g, '.bg-section-schemes { background-color: #FFF9F1 !important; }')
    .replace(/\.bg-section-impact\s*\{\s*background-color:\s*#[a-fA-F0-9]+\s*!important;\s*\}/g, '.bg-section-impact { background-color: #FFFFFF !important; }')
    .replace(/\.bg-section-stories\s*\{\s*background-color:\s*#[a-fA-F0-9]+\s*!important;\s*\}/g, '.bg-section-stories { background-color: #FFF9F1 !important; }')
    .replace(/\.bg-section-help\s*\{\s*background-color:\s*#[a-fA-F0-9]+\s*!important;\s*\}/g, '.bg-section-help { background-color: #FFF9F1 !important; }');

  // Update text classes in css
  css = css.replace(/\.text-secondary,\s*\.text-muted,\s*\.text-stone-500,\s*\.text-stone-600\s*\{\s*color:\s*#475569\s*!important;\s*\}/g,
    '.text-secondary, .text-muted, .text-stone-500, .text-stone-600 { color: #526070 !important; }');

  // Surface bright and surface
  css = css.replace(/\.bg-surface,\s*\.bg-surface-bright\s*\{\s*background-color:\s*#FFFDF8\s*!important;\s*\}/g,
    '.bg-surface, .bg-surface-bright {\n  background-color: #FFF9F1 !important;\n}');

  // Hero overlay gradient
  css = css.replace(
    /background:\s*linear-gradient\(\s*180deg,\s*rgba\(255,\s*244,\s*214,\s*0\.45\)\s*0%,\s*rgba\(255,\s*244,\s*214,\s*0\.15\)\s*25%,\s*rgba\(255,\s*244,\s*214,\s*0\.4\)\s*60%,\s*#FFF4D6\s*100%\s*\);/g,
    `background: linear-gradient(
    180deg,
    rgba(255, 249, 241, 0.45) 0%,
    rgba(255, 249, 241, 0.15) 25%,
    rgba(255, 249, 241, 0.4) 60%,
    #FFF9F1 100%
  );`
  );

  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('✔ Updated styles.css with cohesive warm palette (#FFF9F1 / #FFFFFF)');
}

// 2. Update all HTML files
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

  // Replace Tailwind config background tokens
  content = content
    .replace(/'warm-bg':\s*'[^']+'/g, "'warm-bg': '#FFF9F1'")
    .replace(/'bg-main':\s*'[^']+'/g, "'bg-main': '#FFF9F1'")
    .replace(/'bg-hero':\s*'[^']+'/g, "'bg-hero': '#FFF9F1'")
    .replace(/'bg-work':\s*'[^']+'/g, "'bg-work': '#FFFFFF'")
    .replace(/'bg-schemes':\s*'[^']+'/g, "'bg-schemes': '#FFF9F1'")
    .replace(/'bg-impact':\s*'[^']+'/g, "'bg-impact': '#FFFFFF'")
    .replace(/'bg-stories':\s*'[^']+'/g, "'bg-stories': '#FFF9F1'")
    .replace(/'bg-help':\s*'[^']+'/g, "'bg-help': '#FFF9F1'")
    .replace(/'surface-ivory':\s*'[^']+'/g, "'surface-ivory': '#FFF9F1'")
    .replace(/'surface-container':\s*'[^']+'/g, "'surface-container': '#FFF9F1'")
    .replace(/'surface-warm-card':\s*'[^']+'/g, "'surface-warm-card': '#FFFFFF'")
    .replace(/'surface-container-low':\s*'[^']+'/g, "'surface-container-low': '#FFFFFF'")
    .replace(/'surface-container-lowest':\s*'[^']+'/g, "'surface-container-lowest': '#FFFFFF'")
    .replace(/'card-white':\s*'[^']+'/g, "'card-white': '#FFFFFF'")
    .replace(/'text-muted':\s*'[^']+'/g, "'text-muted': '#526070'")
    .replace(/'muted-text':\s*'[^']+'/g, "'muted-text': '#526070'")
    .replace(/'secondary-text':\s*'[^']+'/g, "'secondary-text': '#526070'");

  // Update Cache Busting Query String
  content = content
    .replace(/styles\.css\?v=\d+/g, 'styles.css?v=20')
    .replace(/main\.js\?v=\d+/g, 'main.js?v=20');

  // Replace body and header tags
  content = content
    .replace(/<body class="bg-\[#FFFDF8\]/g, '<body class="bg-[#FFF9F1]')
    .replace(/bg-\[#FFFDF8\]\/95/g, 'bg-[#FFF9F1]/95')
    .replace(/bg-\[#FFFDF8\]/g, 'bg-[#FFF9F1]');

  // Replace text-color #475569 with previous #526070
  content = content.replace(/#475569/g, '#526070');

  // In index.html specific sections
  if (filename === 'index.html') {
    // Hero: Warm #FFF9F1
    content = content.replace(
      /<section id="hero" class="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-\[#[^\]]+\] border-b border-amber-200\/80" data-aos="fade-up"/,
      '<section id="hero" class="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-[#FFF9F1] border-b border-amber-200/60" data-aos="fade-up"'
    );

    // Help & Report Portal: Warm #FFF9F1
    content = content.replace(
      /<section data-aos="fade-up" class="py-12 sm:py-16 bg-\[#[^\]]+\] border-b border-rose-200\/80" id="help-portal">/,
      '<section data-aos="fade-up" class="py-12 sm:py-16 bg-[#FFF9F1] border-b border-amber-200/60" id="help-portal">'
    );

    // Our Work: Clean Pure #FFFFFF
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-b border-slate-200\/80" id="our-work">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFFFFF] border-b border-slate-200/80" id="our-work">'
    );

    // Government Schemes: Warm #FFF9F1
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-y border-blue-200\/80" id="government-schemes">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFF9F1] border-y border-amber-200/60" id="government-schemes">'
    );

    // Donate / Transparency: Clean #FFFFFF
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-b border-amber-200\/60" id="donate">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFFFFF] border-b border-slate-200/80" id="donate">'
    );

    // Impact Section: Warm #FFF9F1
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-b border-teal-200\/80" id="impact">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFF9F1] border-b border-amber-200/60" id="impact">'
    );

    // Stories Section: Clean #FFFFFF
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-b border-orange-200\/80" id="stories">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFFFFF] border-b border-slate-200/80" id="stories">'
    );

    // Partner Section: Warm #FFF9F1
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-b border-slate-200\/80" id="partner">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFF9F1] border-b border-amber-200/60" id="partner">'
    );

    // FAQ Section: Clean #FFFFFF
    content = content.replace(
      /<section data-aos="fade-up" class="py-20 bg-\[#[^\]]+\] border-t border-slate-200\/60">/,
      '<section data-aos="fade-up" class="py-20 bg-[#FFFFFF] border-t border-slate-200/60">'
    );
  }

  // General replacements for flat section background tints in other pages
  content = content
    .replace(/bg-\[#FFF4D6\]/g, 'bg-[#FFF9F1]')
    .replace(/bg-\[#FFF1F2\]/g, 'bg-[#FFF9F1]')
    .replace(/bg-\[#EEF3FF\]/g, 'bg-[#FFF9F1]')
    .replace(/bg-\[#EEF8F6\]/g, 'bg-[#FFF9F1]')
    .replace(/bg-\[#FFF0EC\]/g, 'bg-[#FFF9F1]')
    .replace(/border-rose-200\/80/g, 'border-amber-200/60')
    .replace(/border-blue-200/g, 'border-amber-200')
    .replace(/border-teal-200/g, 'border-amber-200')
    .replace(/border-orange-200/g, 'border-amber-200');

  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log(`  ✔ Restored warm palette in ${filename}`);
});

// 3. Update scratch/shared_components.js
const sharedPath = path.join(ROOT_DIR, 'scratch', 'shared_components.js');
if (fs.existsSync(sharedPath)) {
  let shared = fs.readFileSync(sharedPath, 'utf8');
  shared = shared
    .replace(/'warm-bg':\s*'[^']+'/g, "'warm-bg': '#FFF9F1'")
    .replace(/'bg-main':\s*'[^']+'/g, "'bg-main': '#FFF9F1'")
    .replace(/'bg-hero':\s*'[^']+'/g, "'bg-hero': '#FFF9F1'")
    .replace(/'bg-work':\s*'[^']+'/g, "'bg-work': '#FFFFFF'")
    .replace(/'bg-schemes':\s*'[^']+'/g, "'bg-schemes': '#FFF9F1'")
    .replace(/'bg-impact':\s*'[^']+'/g, "'bg-impact': '#FFFFFF'")
    .replace(/'bg-stories':\s*'[^']+'/g, "'bg-stories': '#FFF9F1'")
    .replace(/'bg-help':\s*'[^']+'/g, "'bg-help': '#FFF9F1'")
    .replace(/'surface-ivory':\s*'[^']+'/g, "'surface-ivory': '#FFF9F1'")
    .replace(/'surface-container':\s*'[^']+'/g, "'surface-container': '#FFF9F1'")
    .replace(/'muted-text':\s*'[^']+'/g, "'muted-text': '#526070'")
    .replace(/'text-muted':\s*'[^']+'/g, "'text-muted': '#526070'")
    .replace(/'secondary-text':\s*'[^']+'/g, "'secondary-text': '#526070'")
    .replace(/<body class="bg-\[#FFFDF8\]/g, '<body class="bg-[#FFF9F1]')
    .replace(/styles\.css\?v=\d+/g, 'styles.css?v=20');

  fs.writeFileSync(sharedPath, shared, 'utf8');
  console.log('✔ Updated scratch/shared_components.js');
}

console.log('\n=== Previous Warm Background Palette Successfully Restored Site-Wide ===\n');
