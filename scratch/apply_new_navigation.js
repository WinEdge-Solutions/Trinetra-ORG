const fs = require('fs');
const path = require('path');
const shared = require('./shared_components.js');

const ROOT_DIR = 'D:\\Trinetra ORG';

const PAGE_MAP = {
  'index.html': 'home',
  'about.html': 'about',
  'our-work.html': 'our-work',
  'government-schemes.html': 'schemes',
  'stories-events.html': 'stories',
  'volunteer-partner.html': 'volunteer',
  'help-report.html': 'help-report',
  'donate.html': 'donate',
  'awareness.html': 'awareness',
  'impact.html': 'impact',
  'contact-faq.html': 'contact',
  'contact.html': 'contact',
  'privacy.html': 'privacy',
  'terms.html': 'terms',
  'disclaimer.html': 'disclaimer',
  '404.html': '404'
};

console.log('=== Applying Redesigned Navigation Across All 16 Pages ===\n');

Object.entries(PAGE_MAP).forEach(([filename, activeKey]) => {
  const filePath = path.join(ROOT_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filename}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Generate new top ribbon + main header + mobile drawer
  const newHeaderBlock = shared.generateTopRibbon() + '\n\n' + shared.generateHeader(activeKey);

  // 2. Identify start of top ribbon
  let ribbonStart = content.indexOf('<!-- SLIM EMERGENCY');
  if (ribbonStart === -1) ribbonStart = content.indexOf('<!-- TOP EMERGENCY');
  if (ribbonStart === -1) ribbonStart = content.indexOf('<div id="topTrustRibbon"');
  if (ribbonStart === -1) ribbonStart = content.indexOf('<div id="topEmergencyBar"');

  // Identify end of header block (including any mobileNavDrawer immediately following)
  let headerEnd = content.indexOf('</header>');
  if (headerEnd === -1) {
    console.error(`Could not find </header> in ${filename}`);
    return;
  }
  headerEnd += '</header>'.length;

  // If there's an existing mobileNavDrawer/Backdrop right after header before <main, include it in replacement
  const mainStart = content.indexOf('<main id="main-content"');
  if (mainStart > headerEnd) {
    headerEnd = mainStart;
  }

  // Replace header portion
  content = content.slice(0, ribbonStart) + newHeaderBlock + '\n\n' + content.slice(headerEnd);

  // 3. Remove mobileBottomDock
  let dockCommentStart = content.indexOf('<!-- THUMB-FRIENDLY MOBILE BOTTOM QUICK-ACTION DOCK');
  let dockStart = content.indexOf('<aside id="mobileBottomDock"');
  if (dockCommentStart !== -1 && dockCommentStart < dockStart) {
    dockStart = dockCommentStart;
  }

  if (dockStart !== -1) {
    const dockEnd = content.indexOf('</aside>', dockStart);
    if (dockEnd !== -1) {
      content = content.slice(0, dockStart) + content.slice(dockEnd + '</aside>'.length);
    }
  }

  // 4. Update main content bottom padding (no need for pb-24 dock space anymore)
  content = content.replace(/pb-24\s+xl:pb-0/g, 'pb-12 xl:pb-16');
  content = content.replace(/pb-24\s+lg:pb-0/g, 'pb-12 lg:pb-16');

  // 5. Update back to top button bottom position
  content = content.replace(/bottom-20\s+xl:bottom-6/g, 'bottom-6');

  // 6. Update cache busting queries
  content = content.replace(/styles\.css\?v=\d+/g, 'styles.css?v=23');
  content = content.replace(/main\.js\?v=\d+/g, 'main.js?v=23');

  // 7. Page-specific additions (our-work.html pillar IDs)
  if (filename === 'our-work.html') {
    content = content
      .replace(
        /<!-- Pillar 1: Education & Scholarships -->\s*<article class="pillar-card/g,
        '<!-- Pillar 1: Education & Scholarships -->\n<article id="pillar-education" class="pillar-card'
      )
      .replace(
        /<!-- Pillar 2: Child Protection & Labour Prevention -->\s*<article class="pillar-card/g,
        '<!-- Pillar 2: Child Protection & Labour Prevention -->\n<article id="pillar-protection" class="pillar-card'
      )
      .replace(
        /<!-- Pillar 3: Women & Community Empowerment -->\s*<article class="pillar-card/g,
        '<!-- Pillar 3: Women & Community Empowerment -->\n<article id="pillar-women" class="pillar-card'
      )
      .replace(
        /<!-- Pillar 4: Family Support & Rehabilitation -->\s*<article class="pillar-card/g,
        '<!-- Pillar 4: Family Support & Rehabilitation -->\n<article id="pillar-family" class="pillar-card'
      )
      .replace(
        /<!-- Pillar 5: Skill Development -->\s*<article class="pillar-card/g,
        '<!-- Pillar 5: Skill Development -->\n<article id="pillar-skills" class="pillar-card'
      )
      .replace(
        /<!-- Pillar 6: Health & Digital Literacy -->\s*<article class="pillar-card/g,
        '<!-- Pillar 6: Health & Digital Literacy -->\n<article id="pillar-health" class="pillar-card'
      );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✔ Successfully updated navigation in ${filename}`);
});

console.log('\nAll 16 HTML pages successfully updated!');
