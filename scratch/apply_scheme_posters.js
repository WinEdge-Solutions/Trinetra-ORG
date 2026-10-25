const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'D:\\Trinetra ORG';

console.log('=== Adding Government Scheme Posters to government-schemes.html & index.html ===\n');

// 1. Update government-schemes.html
const gsPath = path.join(ROOT_DIR, 'government-schemes.html');
if (fs.existsSync(gsPath)) {
  let content = fs.readFileSync(gsPath, 'utf8');

  // Scheme 1: Beti Bachao Beti Padhao
  const poster1 = `<!-- Scheme Poster Visual Banner -->
<div class="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/80 shadow-xs group">
  <img src="images/schemes/poster-bbbp.webp" 
       alt="Beti Bachao Beti Padhao Official Government Welfare Scheme Awareness Poster" 
       class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
       width="1280" height="720" loading="lazy">
  <div class="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent flex items-end justify-between p-3 pointer-events-none">
    <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#172554]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
      <span class="material-symbols-outlined text-[14px] text-amber-400">verified</span>
      <span>Official Scheme Poster</span>
    </span>
    <span class="text-[10px] font-mono font-semibold text-slate-100 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
      MoWCD Flagship
    </span>
  </div>
</div>`;

  // Scheme 2: Sukanya Samriddhi Yojana
  const poster2 = `<!-- Scheme Poster Visual Banner -->
<div class="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/80 shadow-xs group">
  <img src="images/schemes/poster-ssy.webp" 
       alt="Sukanya Samriddhi Yojana Official Government Savings Scheme Awareness Poster" 
       class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
       width="1280" height="720" loading="lazy">
  <div class="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent flex items-end justify-between p-3 pointer-events-none">
    <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#172554]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
      <span class="material-symbols-outlined text-[14px] text-amber-400">verified</span>
      <span>Official Scheme Poster</span>
    </span>
    <span class="text-[10px] font-mono font-semibold text-slate-100 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
      Ministry of Finance
    </span>
  </div>
</div>`;

  // Scheme 3: RTE Section 12(1)(c)
  const poster3 = `<!-- Scheme Poster Visual Banner -->
<div class="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/80 shadow-xs group">
  <img src="images/schemes/poster-rte.webp" 
       alt="Right to Education Act Section 12(1)(c) Free School Admission Awareness Poster" 
       class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
       width="1280" height="720" loading="lazy">
  <div class="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent flex items-end justify-between p-3 pointer-events-none">
    <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#172554]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
      <span class="material-symbols-outlined text-[14px] text-amber-400">verified</span>
      <span>Official Scheme Poster</span>
    </span>
    <span class="text-[10px] font-mono font-semibold text-slate-100 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
      Ministry of Education
    </span>
  </div>
</div>`;

  // Scheme 4: PMKVY 4.0
  const poster4 = `<!-- Scheme Poster Visual Banner -->
<div class="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/80 shadow-xs group">
  <img src="images/schemes/poster-pmkvy.webp" 
       alt="PM Kaushal Vikas Yojana PMKVY 4.0 Skill India Mission Awareness Poster" 
       class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
       width="1280" height="720" loading="lazy">
  <div class="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent flex items-end justify-between p-3 pointer-events-none">
    <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#172554]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
      <span class="material-symbols-outlined text-[14px] text-amber-400">verified</span>
      <span>Official Scheme Poster</span>
    </span>
    <span class="text-[10px] font-mono font-semibold text-slate-100 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
      MSDE / NSDC
    </span>
  </div>
</div>`;

  // Scheme 5: Poshan Abhiyaan
  const poster5 = `<!-- Scheme Poster Visual Banner -->
<div class="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/80 shadow-xs group">
  <img src="images/schemes/poster-poshan.webp" 
       alt="Poshan Abhiyaan National Nutrition Mission Awareness Poster" 
       class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
       width="1280" height="720" loading="lazy">
  <div class="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent flex items-end justify-between p-3 pointer-events-none">
    <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#172554]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
      <span class="material-symbols-outlined text-[14px] text-amber-400">verified</span>
      <span>Official Scheme Poster</span>
    </span>
    <span class="text-[10px] font-mono font-semibold text-slate-100 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
      MoWCD National Mission
    </span>
  </div>
</div>`;

  // Scheme 6: PMMVY
  const poster6 = `<!-- Scheme Poster Visual Banner -->
<div class="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/80 shadow-xs group">
  <img src="images/schemes/poster-pmmvy.webp" 
       alt="PM Matru Vandana Yojana PMMVY Direct Maternity Benefit Scheme Awareness Poster" 
       class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
       width="1280" height="720" loading="lazy">
  <div class="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent flex items-end justify-between p-3 pointer-events-none">
    <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#172554]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
      <span class="material-symbols-outlined text-[14px] text-amber-400">verified</span>
      <span>Official Scheme Poster</span>
    </span>
    <span class="text-[10px] font-mono font-semibold text-slate-100 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
      MoWCD Direct DBT
    </span>
  </div>
</div>`;

  // Scheme 7: Ayushman Bharat
  const poster7 = `<!-- Scheme Poster Visual Banner -->
<div class="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/80 shadow-xs group">
  <img src="images/schemes/poster-ayushman.webp" 
       alt="Ayushman Bharat PM-JAY Cashless Hospitalization Scheme Awareness Poster" 
       class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
       width="1280" height="720" loading="lazy">
  <div class="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent flex items-end justify-between p-3 pointer-events-none">
    <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#172554]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
      <span class="material-symbols-outlined text-[14px] text-amber-400">verified</span>
      <span>Official Scheme Poster</span>
    </span>
    <span class="text-[10px] font-mono font-semibold text-slate-100 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
      National Health Authority
    </span>
  </div>
</div>`;

  // Scheme 8: PM SVANidhi
  const poster8 = `<!-- Scheme Poster Visual Banner -->
<div class="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/80 shadow-xs group">
  <img src="images/schemes/poster-svanidhi.webp" 
       alt="PM SVANidhi Working Capital Loan Scheme for Street Vendors Awareness Poster" 
       class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
       width="1280" height="720" loading="lazy">
  <div class="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent flex items-end justify-between p-3 pointer-events-none">
    <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#172554]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
      <span class="material-symbols-outlined text-[14px] text-amber-400">verified</span>
      <span>Official Scheme Poster</span>
    </span>
    <span class="text-[10px] font-mono font-semibold text-slate-100 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
      MoHUA Micro-Credit
    </span>
  </div>
</div>`;

  // Inject into Scheme 1
  if (!content.includes('poster-bbbp.webp')) {
    content = content.replace(
      /(<!-- Scheme 1: Beti Bachao Beti Padhao -->\s*<article[^>]*>\s*<div>)/,
      `$1\n${poster1}`
    );
  }

  // Inject into Scheme 2
  if (!content.includes('poster-ssy.webp')) {
    content = content.replace(
      /(<!-- Scheme 2: Sukanya Samriddhi Yojana -->\s*<article[^>]*>\s*<div>)/,
      `$1\n${poster2}`
    );
  }

  // Inject into Scheme 3
  if (!content.includes('poster-rte.webp')) {
    content = content.replace(
      /(<!-- Scheme 3: RTE Section 12\(1\)\(c\) -->\s*<article[^>]*>\s*<div>)/,
      `$1\n${poster3}`
    );
  }

  // Inject into Scheme 4
  if (!content.includes('poster-pmkvy.webp')) {
    content = content.replace(
      /(<!-- Scheme 4: PM Kaushal Vikas Yojana \(PMKVY 4\.0\) -->\s*<article[^>]*>\s*<div>)/,
      `$1\n${poster4}`
    );
  }

  // Inject into Scheme 5
  if (!content.includes('poster-poshan.webp')) {
    content = content.replace(
      /(<!-- Scheme 5: Poshan Abhiyaan -->\s*<article[^>]*>\s*<div>)/,
      `$1\n${poster5}`
    );
  }

  // Inject into Scheme 6
  if (!content.includes('poster-pmmvy.webp')) {
    content = content.replace(
      /(<!-- Scheme 6: PM Matru Vandana Yojana \(PMMVY\) -->\s*<article[^>]*>\s*<div>)/,
      `$1\n${poster6}`
    );
  }

  // Inject into Scheme 7
  if (!content.includes('poster-ayushman.webp')) {
    content = content.replace(
      /(<!-- Scheme 7: Ayushman Bharat PM-JAY -->\s*<article[^>]*>\s*<div>)/,
      `$1\n${poster7}`
    );
  }

  // Inject into Scheme 8
  if (!content.includes('poster-svanidhi.webp')) {
    content = content.replace(
      /(<!-- Scheme 8: PM SVANidhi -->\s*<article[^>]*>\s*<div>)/,
      `$1\n${poster8}`
    );
  }

  fs.writeFileSync(gsPath, content, 'utf8');
  console.log('✔ Successfully injected all 8 posters into government-schemes.html');
}

// 2. Update index.html schemes section
const indexPath = path.join(ROOT_DIR, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');

  // Scheme 1: BBBP
  if (!content.includes('poster-bbbp.webp')) {
    content = content.replace(
      /(<!-- Scheme 1: Beti Bachao Beti Padhao -->\s*<div class="home-scheme-card[^>]*>\s*<div>)/,
      `$1
        <div class="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-slate-100 border border-slate-200/80 shadow-xs group">
          <img src="images/schemes/poster-bbbp.webp" alt="Beti Bachao Beti Padhao Official Scheme Poster" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy">
        </div>`
    );
  }

  // Scheme 2: PMKVY
  if (!content.includes('poster-pmkvy.webp')) {
    content = content.replace(
      /(<!-- Scheme 2: PM Kaushal Vikas Yojana -->\s*<div class="home-scheme-card[^>]*>\s*<div>)/,
      `$1
        <div class="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-slate-100 border border-slate-200/80 shadow-xs group">
          <img src="images/schemes/poster-pmkvy.webp" alt="PM Kaushal Vikas Yojana PMKVY 4.0 Skill India Mission Poster" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy">
        </div>`
    );
  }

  // Scheme 3: SSY
  if (!content.includes('poster-ssy.webp')) {
    content = content.replace(
      /(<!-- Scheme 3: Sukanya Samriddhi Yojana -->\s*<div class="home-scheme-card[^>]*>\s*<div>)/,
      `$1
        <div class="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-slate-100 border border-slate-200/80 shadow-xs group">
          <img src="images/schemes/poster-ssy.webp" alt="Sukanya Samriddhi Yojana Sovereign Girl Child Savings Poster" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy">
        </div>`
    );
  }

  // Scheme 4: RTE
  if (!content.includes('poster-rte.webp')) {
    content = content.replace(
      /(<!-- Scheme 4: RTE Section 12\(1\)\(c\) -->\s*<div class="home-scheme-card[^>]*>\s*<div>)/,
      `$1
        <div class="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-slate-100 border border-slate-200/80 shadow-xs group">
          <img src="images/schemes/poster-rte.webp" alt="Right to Education Act Free Schooling Scheme Poster" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy">
        </div>`
    );
  }

  // Scheme 5: Poshan
  if (!content.includes('poster-poshan.webp')) {
    content = content.replace(
      /(<!-- Scheme 5: Poshan Abhiyaan -->\s*<div class="home-scheme-card[^>]*>\s*<div>)/,
      `$1
        <div class="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-slate-100 border border-slate-200/80 shadow-xs group">
          <img src="images/schemes/poster-poshan.webp" alt="Poshan Abhiyaan National Nutrition Mission Poster" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy">
        </div>`
    );
  }

  // Scheme 6: PMMVY
  if (!content.includes('poster-pmmvy.webp')) {
    content = content.replace(
      /(<!-- Scheme 6: PM Matru Vandana Yojana -->\s*<div class="home-scheme-card[^>]*>\s*<div>)/,
      `$1
        <div class="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3.5 bg-slate-100 border border-slate-200/80 shadow-xs group">
          <img src="images/schemes/poster-pmmvy.webp" alt="PM Matru Vandana Yojana Direct Maternity Cash Benefit Poster" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" width="1280" height="720" loading="lazy">
        </div>`
    );
  }

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('✔ Successfully injected posters into index.html schemes cards');
}

console.log('\n=== Scheme Posters Injection Complete ===\n');
