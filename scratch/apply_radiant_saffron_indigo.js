const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'D:\\Trinetra ORG';

console.log('=== Applying Radiant Saffron + Indigo Color System Across All 16 Pages ===\n');

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

  // Replace Tailwind palette definitions
  content = content
    .replace(/'surface-ivory':\s*'[^']+'/g, "'surface-ivory': '#FFF9F1'")
    .replace(/'surface-container':\s*'[^']+'/g, "'surface-container': '#FFF9F1'")
    .replace(/'surface-warm-card':\s*'[^']+'/g, "'surface-warm-card': '#FFFFFF'")
    .replace(/'surface-container-low':\s*'[^']+'/g, "'surface-container-low': '#FFFFFF'")
    .replace(/'surface-container-lowest':\s*'[^']+'/g, "'surface-container-lowest': '#FFFFFF'")
    .replace(/'on-surface':\s*'[^']+'/g, "'on-surface': '#172033'")
    .replace(/'primary':\s*'[^']+'/g, "'primary': '#9A3412'")
    .replace(/'primary-hover':\s*'[^']+'/g, "'primary-hover': '#7C2D12'")
    .replace(/'emergency-crimson':\s*'[^']+'/g, "'emergency-crimson': '#B91C1C'")
    .replace(/'emergency-hover':\s*'[^']+'/g, "'emergency-hover': '#991B1B'")
    .replace(/'sage-soft':\s*'[^']+'/g, "'sage-soft': '#047857'")
    .replace(/'text-muted':\s*'[^']+'/g, "'text-muted': '#526070'");

  // Replace asset query versions for cache busting
  content = content
    .replace(/styles\.css\?v=\d+/g, 'styles.css?v=17')
    .replace(/main\.js\?v=\d+/g, 'main.js?v=17');

  // Replace old colors in inline classes and styles
  content = content
    // Deep Orange Primary CTA (#9A3412) & Hover (#7C2D12)
    .replace(/#B45309/g, '#9A3412')
    .replace(/#92400E/g, '#7C2D12')
    .replace(/#8D4B00/g, '#9A3412')
    
    // Trust Indigo (#172554)
    .replace(/#111C2D/g, '#172554')
    
    // Emergency Red (#B91C1C) & Hover (#991B1B)
    .replace(/#DC2626/g, '#B91C1C')
    .replace(/bg-red-600(?!\d)/g, 'bg-[#B91C1C]')
    .replace(/hover:bg-red-700/g, 'hover:bg-[#991B1B]')
    .replace(/text-red-600(?!\d)/g, 'text-[#B91C1C]')
    .replace(/focus:ring-red-600/g, 'focus:ring-[#B91C1C]')
    
    // Backgrounds & Surfaces
    .replace(/bg-\[#FAF7F2\]/g, 'bg-[#FFF9F1]')
    .replace(/bg-\[#FAF5EE\]/g, 'bg-[#FFF9F1]')
    .replace(/bg-\[#FAF6F0\]/g, 'bg-[#FFF9F1]')
    .replace(/bg-\[#FFFDF9\]/g, 'bg-[#FFF9F1]')
    .replace(/bg-\[#FFF9ED\]/g, 'bg-[#FFF9F1]')
    .replace(/from-\[#FFF9ED\] via-\[#FFFDF9\] to-\[#FFFFFF\]/g, 'from-[#FFF9F1] via-[#FFFFFF] to-[#FFF9F1]')
    .replace(/from-\[#FAF7F2\] via-\[#FFFDF9\] to-\[#F5EFEB\]/g, 'from-[#FFF9F1] via-[#FFFFFF] to-[#FFF9F1]')
    
    // Clean Card Borders
    .replace(/border-stone-200/g, 'border-slate-200')
    .replace(/border-stone-100/g, 'border-slate-100')
    .replace(/border-stone-300/g, 'border-slate-300')
    
    // Body tag ensure text color is primary text
    .replace(/text-on-surface/g, 'text-[#172033]')
    .replace(/bg-surface-ivory/g, 'bg-[#FFF9F1]');

  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log(`  ✔ Transformed ${filename} to Radiant Saffron + Indigo`);
});

console.log('\n=== All 16 HTML Interfaces Successfully Re-Styled ===\n');
