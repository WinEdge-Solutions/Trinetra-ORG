const fs = require('fs');
const path = require('path');
const base = 'd:/Trinetra ORG/stitch_ngo_foundation_website_design';
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory() && d.startsWith('trinetra_'));

const results = {};

dirs.forEach(d => {
  const code = fs.readFileSync(path.join(base, d, 'code.html'), 'utf8');
  
  // Extract all section comments or tags
  const sectionComments = [...code.matchAll(/<!--\s*([^-]+?)\s*-->/g)].map(m => m[1].trim()).filter(c => c.toLowerCase().includes('section') || c.toLowerCase().includes('hero') || c.toLowerCase().includes('nav') || c.toLowerCase().includes('footer') || c.toLowerCase().includes('modal') || c.toLowerCase().includes('drawer') || c.toLowerCase().includes('form'));
  
  // Extract h1, h2, h3
  const headings = [...code.matchAll(/<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/gi)].map(m => ({
    tag: m[1].toLowerCase(),
    text: m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  })).filter(h => h.text.length > 0 && h.text.length < 150);

  // Forms and interactive buttons
  const forms = [...code.matchAll(/<form[^>]*>([\s\S]*?)<\/form>/gi)].length;
  const buttons = [...code.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter(b => b.length > 0 && b.length < 50);

  results[d] = {
    sectionComments,
    headings,
    formCount: forms,
    buttonSamples: buttons.slice(0, 10)
  };
});

fs.writeFileSync('d:/Trinetra ORG/scratch_inspect.json', JSON.stringify(results, null, 2));
console.log('Inspection complete. Screen keys:', Object.keys(results));
