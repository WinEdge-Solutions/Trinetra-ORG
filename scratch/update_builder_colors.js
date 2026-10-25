const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build_and_fix_entire_site.js');
let code = fs.readFileSync(filePath, 'utf8');

// Replace old colors in build_and_fix_entire_site.js
code = code
  .replace(/#B45309/g, '#9A3412')
  .replace(/#92400E/g, '#7C2D12')
  .replace(/#111C2D/g, '#172554')
  .replace(/from-amber-900 via-stone-900 to-neutral-900/g, 'from-[#172554] via-[#1E293B] to-[#0F172A]')
  .replace(/from-\[#111C2D\]/g, 'from-[#172554]')
  .replace(/bg-red-600/g, 'bg-[#B91C1C]')
  .replace(/hover:bg-red-700/g, 'hover:bg-[#991B1B]')
  .replace(/text-red-600/g, 'text-[#B91C1C]')
  .replace(/text-red-700/g, 'text-[#B91C1C]')
  .replace(/border-red-600/g, 'border-[#B91C1C]')
  .replace(/focus:ring-red-600/g, 'focus:ring-[#B91C1C]')
  .replace(/ring-red-600/g, 'ring-[#B91C1C]');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated build_and_fix_entire_site.js colors!');
