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
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  const hasRibbon = content.includes('id="topTrustRibbon"') || content.includes('id="topEmergencyBar"');
  const hasHeader = content.includes('id="siteHeader"');
  const hasBottomDock = content.includes('id="mobileBottomDock"');
  const hasMain = content.includes('id="main-content"');
  
  console.log(`${filename.padEnd(25)}: ribbon=${hasRibbon}, header=${hasHeader}, bottomDock=${hasBottomDock}, main=${hasMain}`);
});
