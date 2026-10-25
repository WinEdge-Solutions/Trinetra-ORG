const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'D:\\Trinetra ORG';

console.log('=== Applying Palette 1: Radiant Golden Hour & Deep Saffron Site-Wide ===\n');

// 1. Run master site builder to regenerate all components
console.log('Running scratch/build_and_fix_entire_site.js...');
require('./build_and_fix_entire_site.js');

// 2. Now apply Palette 1 direct replacements to all HTML files
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

console.log('\nUpgrading all 16 HTML pages with Palette 1 color harmony...');

HTML_FILES.forEach(filename => {
  const filePath = path.join(ROOT_DIR, filename);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Tailwind config colors
  content = content
    .replace(/'surface-ivory':\s*'#FAF7F2'/g, "'surface-ivory': '#FFFDF9'")
    .replace(/'surface-warm-card':\s*'#FAF5EE'/g, "'surface-warm-card': '#FFFFFF'")
    .replace(/'surface-container':\s*'#F5EFEB'/g, "'surface-container': '#FFFDF9'")
    .replace(/'surface-container-low':\s*'#FAF5EE'/g, "'surface-container-low': '#FFFFFF'")
    .replace(/'on-surface':\s*'#111C2D'/g, "'on-surface': '#0F172A'");

  // Replace asset versions
  content = content
    .replace(/styles\.css\?v=15/g, 'styles.css?v=16')
    .replace(/main\.js\?v=15/g, 'main.js?v=16');

  // Replace hardcoded muted beige/stone background and borders
  content = content
    .replace(/from-\[#FAF7F2\] via-\[#FFFDF9\] to-\[#F5EFEB\]/g, 'from-[#FFF9ED] via-[#FFFDF9] to-[#FFFFFF]')
    .replace(/from-\[#FAF5EE\] to-\[#FAF7F2\]/g, 'from-[#FFF9ED] via-[#FFFDF9] to-[#FFFFFF]')
    .replace(/from-\[#FAF5EE\] via-\[#FAF7F2\] to-\[#F5EFEB\]/g, 'from-[#FFF9ED] via-[#FFFDF9] to-[#FFFFFF]')
    .replace(/bg-\[#FAF6F0\]/g, 'bg-[#FFFDF9]')
    .replace(/bg-\[#FAF5EE\]/g, 'bg-[#FFF9ED]')
    .replace(/bg-\[#FAF7F2\]/g, 'bg-[#FFFDF9]')
    .replace(/bg-\[#F5EFEB\]\/50/g, 'bg-[#FFFDF9]')
    .replace(/border-\[#E7DFD5\]\/80/g, 'border-amber-500/20')
    .replace(/border-\[#E7DFD5\]/g, 'border-amber-500/20')
    .replace(/border-\[#EAE2D5\]/g, 'border-amber-500/20')
    .replace(/border-\[#F0EAE0\]/g, 'border-amber-500/15')
    .replace(/border-stone-200/g, 'border-amber-200/70')
    .replace(/border-stone-100/g, 'border-amber-100/80')
    .replace(/border-stone-300/g, 'border-amber-300/60')
    .replace(/text-\[#8D4B00\]/g, 'text-[#B45309]');

  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log(`  ✔ Upgraded ${filename}`);
});

console.log('\n=== All 16 HTML Interfaces Successfully Transformed to Palette 1 ===\n');
