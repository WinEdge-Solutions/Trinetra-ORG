const fs = require('fs');
const path = require('path');

const ROOT = 'd:\\Trinetra ORG';

function injectIntoOurWork() {
  const filePath = path.join(ROOT, 'our-work.html');
  let content = fs.readFileSync(filePath, 'utf8');

  const pillars = [
    {
      id: 'pillar-education',
      img: 'images/pillars/pillar-education.webp',
      alt: 'Education & Scholarships Bridge Classroom',
      label: 'Bridge Classroom Learning',
      beacon: 'bg-emerald-400'
    },
    {
      id: 'pillar-protection',
      img: 'images/pillars/pillar-protection.webp',
      alt: 'Child Protection & Anti-Labour Legal Defense',
      label: 'Child Rights Legal Defense',
      beacon: 'bg-red-400'
    },
    {
      id: 'pillar-women',
      img: 'images/pillars/pillar-women.webp',
      alt: 'Women Empowerment Artisan Collective',
      label: 'Mother-Led Artisan SHG Collective',
      beacon: 'bg-emerald-400'
    },
    {
      id: 'pillar-family',
      img: 'images/pillars/pillar-family.webp',
      alt: 'Family Support & Emergency Food Security',
      label: 'Emergency Ration & Food Security',
      beacon: 'bg-amber-400'
    },
    {
      id: 'pillar-skills',
      img: 'images/pillars/pillar-skills.webp',
      alt: 'Youth Vocational Skill Development Lab',
      label: 'Youth IT & Hardware Training Lab',
      beacon: 'bg-indigo-400'
    },
    {
      id: 'pillar-health',
      img: 'images/pillars/pillar-health.webp',
      alt: 'Health & Digital Awareness Outreach Clinic',
      label: 'Community Healthcare & Mobile Clinic',
      beacon: 'bg-teal-400'
    }
  ];

  for (const p of pillars) {
    // Look for `<article id="${p.id}" class="pillar-card[^>]*>\s*<div>`
    const regex = new RegExp(`(<article id="${p.id}"[^>]*>[\\s\\S]*?<div>)([\\s\\S]*?<div class="flex items-center justify-between mb-6">)`);
    if (!content.match(regex)) {
      console.error(`Could not match article #${p.id} in our-work.html`);
      continue;
    }

    const visualHtml = `
  <!-- 16:9 Documentary Field Visual -->
  <div class="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 border border-slate-200/80 bg-stone-100 shadow-xs">
    <img src="${p.img}" alt="${p.alt}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy" />
    <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent"></div>
    <div class="absolute bottom-2.5 left-3 text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full ${p.beacon}"></span>
      <span>${p.label}</span>
    </div>
  </div>
`;

    // Only inject if not already present
    if (!content.includes(p.img)) {
      content = content.replace(regex, `$1${visualHtml}$2`);
      console.log(`Injected ${p.img} into our-work.html #${p.id}`);
    } else {
      console.log(`Already has ${p.img} in our-work.html #${p.id}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

function injectIntoIndex() {
  const filePath = path.join(ROOT, 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Anchor 1: pillar-education
  if (!content.includes('images/pillars/pillar-education.webp')) {
    const regexEdu = /(<div class="editorial-card[^"]*" id="pillar-education">[\s\S]*?<div>)/;
    const visualEdu = `
        <!-- 16:9 Documentary Field Visual -->
        <div class="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-slate-200/80 bg-stone-100 shadow-xs">
          <img src="images/pillars/pillar-education.webp" alt="Education & Bridge School Scholarships" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-2.5 left-3 text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Bridge Classroom Learning</span>
          </div>
        </div>
`;
    content = content.replace(regexEdu, `$1${visualEdu}`);
    console.log('Injected pillar-education into index.html');
  }

  // 2. Anchor 2: pillar-protection
  if (!content.includes('images/pillars/pillar-protection.webp')) {
    const regexProt = /(<div class="editorial-card[^"]*" id="pillar-protection">[\s\S]*?<div>)/;
    const visualProt = `
        <!-- 16:9 Documentary Field Visual -->
        <div class="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-slate-200/80 bg-stone-100 shadow-xs">
          <img src="images/pillars/pillar-protection.webp" alt="Child Protection & Anti-Labour Rescue" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-2.5 left-3 text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            <span>Child Rights Legal Defense</span>
          </div>
        </div>
`;
    content = content.replace(regexProt, `$1${visualProt}`);
    console.log('Injected pillar-protection into index.html');
  }

  // 3. Pillar 3: pillar-women
  if (!content.includes('images/pillars/pillar-women.webp')) {
    const regexWomen = /(<div class="editorial-card[^"]*" id="pillar-women">[\s\S]*?<div>)/;
    const visualWomen = `
        <!-- 16:9 Documentary Field Visual -->
        <div class="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-3 border border-slate-200/80 bg-stone-100 shadow-xs">
          <img src="images/pillars/pillar-women.webp" alt="Women Empowerment Self-Help Groups" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent"></div>
          <div class="absolute bottom-2 left-2 text-[10px] font-bold text-white tracking-wide flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>SHG Micro-Enterprises</span>
          </div>
        </div>
`;
    content = content.replace(regexWomen, `$1${visualWomen}`);
    console.log('Injected pillar-women into index.html');
  }

  // 4. Pillar 4: pillar-family
  if (!content.includes('images/pillars/pillar-family.webp')) {
    const regexFam = /(<div class="editorial-card[^"]*" id="pillar-family">[\s\S]*?<div>)/;
    const visualFam = `
        <!-- 16:9 Documentary Field Visual -->
        <div class="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-3 border border-slate-200/80 bg-stone-100 shadow-xs">
          <img src="images/pillars/pillar-family.webp" alt="Family Support & Emergency Rations" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent"></div>
          <div class="absolute bottom-2 left-2 text-[10px] font-bold text-white tracking-wide flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Emergency Food Security</span>
          </div>
        </div>
`;
    content = content.replace(regexFam, `$1${visualFam}`);
    console.log('Injected pillar-family into index.html');
  }

  // 5. Pillar 5: pillar-skills
  if (!content.includes('images/pillars/pillar-skills.webp')) {
    const regexSkills = /(<div class="editorial-card[^"]*" id="pillar-skills">[\s\S]*?<div>)/;
    const visualSkills = `
        <!-- 16:9 Documentary Field Visual -->
        <div class="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-3 border border-slate-200/80 bg-stone-100 shadow-xs">
          <img src="images/pillars/pillar-skills.webp" alt="Skill Development Vocational Labs" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent"></div>
          <div class="absolute bottom-2 left-2 text-[10px] font-bold text-white tracking-wide flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span>Hardware &amp; IT Labs</span>
          </div>
        </div>
`;
    content = content.replace(regexSkills, `$1${visualSkills}`);
    console.log('Injected pillar-skills into index.html');
  }

  // 6. Pillar 6: pillar-health
  if (!content.includes('images/pillars/pillar-health.webp')) {
    const regexHealth = /(<div class="editorial-card[^"]*" id="pillar-health">[\s\S]*?<div>)/;
    const visualHealth = `
        <!-- 16:9 Documentary Field Visual -->
        <div class="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-3 border border-slate-200/80 bg-stone-100 shadow-xs">
          <img src="images/pillars/pillar-health.webp" alt="Health & Digital Awareness Outreach" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent"></div>
          <div class="absolute bottom-2 left-2 text-[10px] font-bold text-white tracking-wide flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            <span>Mobile Health Outreach</span>
          </div>
        </div>
`;
    content = content.replace(regexHealth, `$1${visualHealth}`);
    console.log('Injected pillar-health into index.html');
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

injectIntoOurWork();
injectIntoIndex();
console.log('Injection complete.');
