const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(filePath, 'utf8');

console.log('--- Testing index.html Mobile Elements ---');
console.log('Has mobileMenuToggleBtn:', html.includes('id="mobileMenuToggleBtn"'));
console.log('Has mobileNavDrawer:', html.includes('id="mobileNavDrawer"'));
console.log('Has mobileNavBackdrop:', html.includes('id="mobileNavBackdrop"'));
console.log('Has toggleMobileNav:', html.includes('toggleMobileNav()'));

const mainJsPath = path.join(__dirname, '..', 'main.js');
const mainJs = fs.readFileSync(mainJsPath, 'utf8');
const toggleMatches = (mainJs.match(/function toggleMobileNav/g) || []).length;
console.log('toggleMobileNav definitions in main.js:', toggleMatches);

const closeMatches = (mainJs.match(/function closeMobileNav/g) || []).length;
console.log('closeMobileNav definitions in main.js:', closeMatches);
