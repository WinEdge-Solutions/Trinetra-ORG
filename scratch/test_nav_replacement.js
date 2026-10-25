const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'D:\\Trinetra ORG';
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
  const content = fs.readFileSync(filePath, 'utf8');

  // Find start of ribbon
  let ribbonStart = content.indexOf('<!-- TOP EMERGENCY');
  if (ribbonStart === -1) ribbonStart = content.indexOf('<div id="topTrustRibbon"');
  if (ribbonStart === -1) ribbonStart = content.indexOf('<div id="topEmergencyBar"');

  // Find end of header
  const headerEnd = content.indexOf('</header>');
  const mainStart = content.indexOf('<main id="main-content"');

  // Find bottom dock
  const dockStart = content.indexOf('<aside id="mobileBottomDock"');
  let dockEnd = -1;
  if (dockStart !== -1) {
    dockEnd = content.indexOf('</aside>', dockStart);
  }

  console.log(`${filename.padEnd(25)}: ribbonStart=${ribbonStart}, headerEnd=${headerEnd}, mainStart=${mainStart}, dockStart=${dockStart}, dockEnd=${dockEnd}`);
});
