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

console.log('=== Running Comprehensive Verification Test Suite ===\n');

let totalChecks = 0;
let passedChecks = 0;
let errors = [];

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✔ PASS: ${message}`);
  } else {
    errors.push(message);
    console.error(`  ❌ FAIL: ${message}`);
  }
}

// 1. Verify existence of all 16 files
console.log('1. Checking File Existence...');
HTML_FILES.forEach(filename => {
  const filePath = path.join(ROOT_DIR, filename);
  assert(fs.existsSync(filePath), `File exists: ${filename}`);
});

// 2. Checking HTML content requirements per file
console.log('\n2. Verifying Single H1, Skip Links, and Absence of Prohibited Strings...');
HTML_FILES.forEach(filename => {
  const filePath = path.join(ROOT_DIR, filename);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');

  // Check exactly one <h1>
  const h1Matches = content.match(/<h1[\s>]/gi) || [];
  assert(h1Matches.length === 1, `${filename} has exactly 1 <h1> (Found: ${h1Matches.length})`);

  // Check skip link
  const hasSkipLink = content.includes('href="#main-content"') && content.includes('skip-link');
  assert(hasSkipLink, `${filename} contains accessible "Skip to main content" link`);

  // Check main content ID
  const hasMain = content.includes('id="main-content"');
  assert(hasMain, `${filename} contains <main id="main-content">`);

  // Prohibited strings
  assert(!content.includes('80G Certified'), `${filename} does not contain "80G Certified"`);
  assert(!content.includes('50% Tax'), `${filename} does not contain "50% Tax"`);
  assert(!content.includes('FCRA Certified'), `${filename} does not contain "FCRA Certified"`);
  assert(!content.includes('12A Certified'), `${filename} does not contain "12A Certified"`);
  assert(!content.includes('detectGPS'), `${filename} does not contain "detectGPS"`);
  assert(!content.includes('type="file"'), `${filename} does not contain "type=\\"file\\""`);
  assert(!content.includes('javascript:void(0)'), `${filename} does not contain "javascript:void(0)"`);

  // Verify Corrupted characters
  assert(!content.includes('Â') && !content.includes('â‚¹') && !content.includes('â€”'), `${filename} has clean UTF-8 encoding (no corrupted chars)`);
});

// 3. Verifying Form Honeypots and IDs in key interactive pages
console.log('\n3. Verifying Form Honeypots and Field IDs...');
const helpReportContent = fs.readFileSync(path.join(ROOT_DIR, 'help-report.html'), 'utf8');
assert(helpReportContent.includes('id="emergencyIntakeForm"'), 'help-report.html has id="emergencyIntakeForm"');
assert(helpReportContent.includes('id="honeypot_website"'), 'help-report.html has anti-spam honeypot "honeypot_website"');
assert(helpReportContent.includes('id="fullName"'), 'help-report.html has id="fullName"');
assert(helpReportContent.includes('id="phone"'), 'help-report.html has id="phone"');
assert(helpReportContent.includes('id="district"'), 'help-report.html has id="district"');
assert(helpReportContent.includes('id="landmarkLocation"'), 'help-report.html has id="landmarkLocation"');
assert(helpReportContent.includes('id="description"'), 'help-report.html has id="description"');

const volunteerContent = fs.readFileSync(path.join(ROOT_DIR, 'volunteer-partner.html'), 'utf8');
assert(volunteerContent.includes('id="volunteerIntakeForm"'), 'volunteer-partner.html has id="volunteerIntakeForm"');
assert(volunteerContent.includes('id="honeypot_company"'), 'volunteer-partner.html has honeypot "honeypot_company"');
assert(volunteerContent.includes('id="csrIntakeForm"'), 'volunteer-partner.html has id="csrIntakeForm"');
assert(volunteerContent.includes('id="honeypot_fax"'), 'volunteer-partner.html has honeypot "honeypot_fax"');

const donateContent = fs.readFileSync(path.join(ROOT_DIR, 'donate.html'), 'utf8');
assert(donateContent.includes('id="donationReceiptForm"'), 'donate.html has id="donationReceiptForm"');
assert(donateContent.includes('id="honeypot_title"'), 'donate.html has honeypot "honeypot_title"');

const contactContent = fs.readFileSync(path.join(ROOT_DIR, 'contact-faq.html'), 'utf8');
assert(contactContent.includes('id="contactInquiryForm"'), 'contact-faq.html has id="contactInquiryForm"');
assert(contactContent.includes('id="honeypot_url"'), 'contact-faq.html has honeypot "honeypot_url"');

// 4. Verifying main.js & styles.css
console.log('\n4. Verifying main.js & styles.css Core Guards...');
const mainJs = fs.readFileSync(path.join(ROOT_DIR, 'main.js'), 'utf8');
assert(mainJs.includes('verified: false'), 'main.js enforces siteConfig.taxInfo.verified === false');
assert(mainJs.includes('Tax exemption verification pending statutory filing.'), 'main.js defines exact statutory note');
assert(mainJs.includes('checkRateLimit'), 'main.js implements edge rate limiting');
assert(mainJs.includes('handleFocusTrap'), 'main.js implements accessible focus trapping');
assert(mainJs.includes('prefersReducedMotion'), 'main.js implements prefers-reduced-motion checks');
assert(!mainJs.includes('detectGPS'), 'main.js does not contain detectGPS()');

const stylesCss = fs.readFileSync(path.join(ROOT_DIR, 'styles.css'), 'utf8');
assert(stylesCss.includes('.skip-link'), 'styles.css styles .skip-link');
assert(stylesCss.includes('@media (prefers-reduced-motion: reduce)'), 'styles.css implements prefers-reduced-motion query');
assert(stylesCss.includes('outline: 2px solid #9A3412') || stylesCss.includes('outline: 2px solid #B45309'), 'styles.css defines WCAG compliant focus ring');
assert(stylesCss.includes('outline: 2px solid #B91C1C') || stylesCss.includes('outline: 2px solid #DC2626'), 'styles.css defines distinct emergency focus ring');

console.log(`\n=== Verification Results: ${passedChecks}/${totalChecks} Checks Passed ===`);
if (errors.length > 0) {
  console.error(`Errors found (${errors.length}):`);
  errors.forEach(err => console.error(` - ${err}`));
  process.exit(1);
} else {
  console.log('ALL VERIFICATION CHECKS PASSED PERFECTLY!\n');
}
