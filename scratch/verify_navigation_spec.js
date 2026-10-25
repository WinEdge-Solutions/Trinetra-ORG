const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'D:\\Trinetra ORG';
const PAGES = [
  'index.html', 'about.html', 'our-work.html', 'government-schemes.html',
  'stories-events.html', 'volunteer-partner.html', 'help-report.html', 'donate.html',
  'awareness.html', 'impact.html', 'contact-faq.html', 'contact.html',
  'privacy.html', 'terms.html', 'disclaimer.html', '404.html'
];

let errors = [];
let passed = 0;

function assert(condition, message) {
  if (!condition) {
    errors.push(`FAIL: ${message}`);
  } else {
    passed++;
  }
}

console.log('=== Verifying Navigation Redesign Across All 16 Pages ===\n');

PAGES.forEach(page => {
  const filePath = path.join(ROOT_DIR, page);
  const content = fs.readFileSync(filePath, 'utf8');

  // Level 1: Utility bar
  assert(content.includes('id="topEmergencyBar"'), `${page}: Level 1 slim emergency utility bar exists`);
  assert(content.includes('1098'), `${page}: Childline 1098 present in emergency bar`);
  assert(content.includes('181'), `${page}: Women Helpline 181 present in emergency bar`);
  assert(content.includes('112'), `${page}: Police 112 present in emergency bar`);
  assert(content.includes('Quick Exit'), `${page}: Quick Exit present in emergency bar`);

  // Level 2: Main header
  assert(content.includes('id="siteHeader"'), `${page}: Level 2 siteHeader exists`);
  assert(content.includes('logo-symbol.webp'), `${page}: Logo present in header`);
  assert(content.includes('TRINETRA GARGI'), `${page}: Foundation name present in header`);
  assert(content.includes('nav-link-editorial'), `${page}: Editorial nav links present`);

  // Center links
  assert(content.includes('href="about.html"'), `${page}: About link present`);
  assert(content.includes('id="ourWorkMenuBtn"'), `${page}: Our Work button present`);
  assert(content.includes('id="ourWorkDropdownMenu"'), `${page}: Our Work dropdown menu present`);
  assert(content.includes('href="government-schemes.html"'), `${page}: Government Schemes link present`);
  assert(content.includes('href="stories-events.html"'), `${page}: Stories link present`);
  assert(content.includes('href="volunteer-partner.html"'), `${page}: Volunteer link present`);

  // Right actions
  assert(content.includes('Report Crisis'), `${page}: Report Crisis action present`);
  assert(content.includes('btn-emergency'), `${page}: Emergency button styled`);
  assert(content.includes('btn-donate'), `${page}: Donate button styled`);

  // 6 pillars in dropdown
  assert(content.includes('pillar-education'), `${page}: Education pillar in dropdown`);
  assert(content.includes('pillar-protection'), `${page}: Child protection pillar in dropdown`);
  assert(content.includes('pillar-women'), `${page}: Women pillar in dropdown`);
  assert(content.includes('pillar-family'), `${page}: Family support pillar in dropdown`);
  assert(content.includes('pillar-skills'), `${page}: Skill development pillar in dropdown`);
  assert(content.includes('pillar-health'), `${page}: Health pillar in dropdown`);

  // Mobile drawer
  assert(content.includes('id="mobileNavDrawer"'), `${page}: Mobile navigation drawer exists`);
  assert(content.includes('id="mobileNavBackdrop"'), `${page}: Mobile drawer backdrop exists`);
  assert(content.includes('id="mobileMenuToggleBtn"'), `${page}: Mobile menu hamburger button exists`);
  assert(content.includes('id="closeMobileNavBtn"'), `${page}: Mobile close button exists`);
  assert(content.includes('role="dialog"'), `${page}: Drawer has role="dialog"`);
  assert(content.includes('aria-modal="true"'), `${page}: Drawer has aria-modal="true"`);

  // Dock removal check
  assert(!content.includes('id="mobileBottomDock"'), `${page}: mobileBottomDock completely removed`);

  // Prohibited tax claims check
  assert(!content.includes('80G Certified'), `${page}: No 80G Certified`);
  assert(!content.includes('50% Tax Exemption'), `${page}: No 50% Tax Exemption`);
  assert(!content.includes('12A Certified'), `${page}: No 12A Certified`);
  assert(!content.includes('FCRA Certified'), `${page}: No FCRA Certified`);
});

// Check styles.css
const css = fs.readFileSync(path.join(ROOT_DIR, 'styles.css'), 'utf8');
assert(css.includes('.nav-link-editorial'), 'styles.css defines .nav-link-editorial');
assert(css.includes('.btn-emergency'), 'styles.css defines .btn-emergency');
assert(css.includes('.btn-donate'), 'styles.css defines .btn-donate');
assert(css.includes('#siteHeader.is-scrolled'), 'styles.css defines #siteHeader.is-scrolled');
assert(css.includes('drawer-open'), 'styles.css defines drawer-open');
assert(css.includes('#mobileNavDrawer'), 'styles.css defines #mobileNavDrawer transitions');

// Check main.js
const js = fs.readFileSync(path.join(ROOT_DIR, 'main.js'), 'utf8');
assert(js.includes('function initOurWorkDropdown'), 'main.js defines initOurWorkDropdown');
assert(js.includes('function toggleMobileNav'), 'main.js defines toggleMobileNav');
assert(js.includes('function closeMobileNav'), 'main.js defines closeMobileNav');
assert(js.includes('function toggleMobileOurWorkSubmenu'), 'main.js defines toggleMobileOurWorkSubmenu');
assert(js.includes('function handleFocusTrap'), 'main.js defines handleFocusTrap');
assert(js.includes('function handleScrollUpdates'), 'main.js defines handleScrollUpdates');

console.log(`Passed checks: ${passed}`);
if (errors.length > 0) {
  console.error(`Errors encountered (${errors.length}):`);
  errors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log('ALL NAVIGATION REQUIREMENTS VERIFIED SUCCESSFULLY!');
}
