const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'our-work.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetRegex = /<!-- 4-STAGE METHODOLOGY & LIFECYCLE FLOWCHART -->[\s\S]*?<!-- DETAILED BREAKDOWN OF THE 6 CORE PROGRAMS -->/;

const replacement = `<!-- 4-STAGE METHODOLOGY & LIFECYCLE FLOWCHART -->
<section data-aos="fade-up" class="py-16 bg-surface-container-low/50 border-b border-surface-container">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="text-center max-w-3xl mx-auto mb-12">
<span class="text-label-caps font-label-caps uppercase text-primary tracking-wider font-bold">Methodological Rigour</span>
<h2 class="text-headline-lg font-headline-lg text-[#172033] mt-1 font-serif">
            Grassroots Lifecycle: From Vulnerability to Self-Reliance
          </h2>
<p class="text-body-md font-body-md text-secondary mt-2">
            Every case is tracked with verifiable biometric-safe ID dossiers through an end-to-end 4-stage rehabilitation protocol.
          </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
<!-- Step 1: Identification & Mapping -->
<div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-amber-400/60 transition-all">
  <!-- Subtle Ambient Background Photograph Overlay Layer -->
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <img src="images/lifecycle/stage-1-identification.webp" alt="" class="w-full h-full object-cover opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-105 transition-all duration-500 filter saturate-110" loading="lazy" />
    <div class="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/95"></div>
  </div>

  <div class="relative z-10">
    <!-- Visual Image Header Banner (16:10 ratio) -->
    <div class="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 border border-slate-200/80 shadow-2xs group-hover:shadow-xs transition-shadow bg-slate-100">
      <img src="images/lifecycle/stage-1-identification.webp" alt="Stage 01: Identification &amp; Mapping" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="800" height="500" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
      <div class="absolute bottom-2.5 left-3 text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-amber-400"></span>
        <span>Stage 01 • Ground Surveillance</span>
      </div>
    </div>

    <!-- Step Icon & Label -->
    <div class="flex items-center justify-between mb-3">
      <span class="w-8 h-8 rounded-full bg-amber-50 text-[#9A3412] font-bold flex items-center justify-center text-sm border border-amber-200/80 shadow-2xs">01</span>
      <span class="material-symbols-outlined text-2xl text-slate-500" data-icon="search">search</span>
    </div>

    <h3 class="text-lg sm:text-xl font-serif font-bold text-[#172033] mb-2 group-hover:text-[#9A3412] transition-colors leading-snug">Identification &amp; Mapping</h3>
    <p class="text-sm text-[#526070] leading-relaxed">
      Surveillance across brick kilns, tea stalls, transport depots, and informal settlements. Ground mapping with local vigil committees.
    </p>
  </div>

  <div class="relative z-10 mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-slate-600 flex items-center">
    <span class="material-symbols-outlined text-base mr-1.5 text-emerald-600" data-icon="check_circle">check_circle</span>
    <span>Vulnerability Index Score</span>
  </div>
</div>

<!-- Step 2: Rescue & Legal Safe-Custody -->
<div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-red-400/60 transition-all">
  <!-- Subtle Ambient Background Photograph Overlay Layer -->
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <img src="images/lifecycle/stage-2-rescue.webp" alt="" class="w-full h-full object-cover opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-105 transition-all duration-500 filter saturate-110" loading="lazy" />
    <div class="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/95"></div>
  </div>

  <div class="relative z-10">
    <!-- Visual Image Header Banner (16:10 ratio) -->
    <div class="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 border border-slate-200/80 shadow-2xs group-hover:shadow-xs transition-shadow bg-slate-100">
      <img src="images/lifecycle/stage-2-rescue.webp" alt="Stage 02: Rescue &amp; Legal Safe-Custody" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="800" height="500" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
      <div class="absolute bottom-2.5 left-3 text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-red-400"></span>
        <span>Stage 02 • Legal Protection &amp; Raid</span>
      </div>
    </div>

    <!-- Step Icon & Label -->
    <div class="flex items-center justify-between mb-3">
      <span class="w-8 h-8 rounded-full bg-red-50 text-red-700 font-bold flex items-center justify-center text-sm border border-red-200/80 shadow-2xs">02</span>
      <span class="material-symbols-outlined text-2xl text-red-600" data-icon="shield">shield</span>
    </div>

    <h3 class="text-lg sm:text-xl font-serif font-bold text-[#172033] mb-2 group-hover:text-red-700 transition-colors leading-snug">Rescue &amp; Legal Safe-Custody</h3>
    <p class="text-sm text-[#526070] leading-relaxed">
      Joint taskforce raids with District Child Protection Units (DCPU) and Police. FIR registration, legal advocacy, and statutory CWC production.
    </p>
  </div>

  <div class="relative z-10 mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-slate-600 flex items-center">
    <span class="material-symbols-outlined text-base mr-1.5 text-emerald-600" data-icon="check_circle">check_circle</span>
    <span>Institutional Custody Order</span>
  </div>
</div>

<!-- Step 3: Bridge Rehabilitation -->
<div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-amber-400/60 transition-all">
  <!-- Subtle Ambient Background Photograph Overlay Layer -->
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <img src="images/lifecycle/stage-3-rehabilitation.webp" alt="" class="w-full h-full object-cover opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-105 transition-all duration-500 filter saturate-110" loading="lazy" />
    <div class="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/95"></div>
  </div>

  <div class="relative z-10">
    <!-- Visual Image Header Banner (16:10 ratio) -->
    <div class="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 border border-slate-200/80 shadow-2xs group-hover:shadow-xs transition-shadow bg-slate-100">
      <img src="images/lifecycle/stage-3-rehabilitation.webp" alt="Stage 03: Bridge Rehabilitation" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="800" height="500" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
      <div class="absolute bottom-2.5 left-3 text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-amber-400"></span>
        <span>Stage 03 • Accelerated Bridge Learning</span>
      </div>
    </div>

    <!-- Step Icon & Label -->
    <div class="flex items-center justify-between mb-3">
      <span class="w-8 h-8 rounded-full bg-amber-50 text-amber-800 font-bold flex items-center justify-center text-sm border border-amber-200/80 shadow-2xs">03</span>
      <span class="material-symbols-outlined text-2xl text-amber-600" data-icon="school">school</span>
    </div>

    <h3 class="text-lg sm:text-xl font-serif font-bold text-[#172033] mb-2 group-hover:text-amber-800 transition-colors leading-snug">Bridge Rehabilitation</h3>
    <p class="text-sm text-[#526070] leading-relaxed">
      Accelerated learning at Non-Formal Bridge Centres, psychological trauma counseling, nutritional stabilizing, and family relief packs.
    </p>
  </div>

  <div class="relative z-10 mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-slate-600 flex items-center">
    <span class="material-symbols-outlined text-base mr-1.5 text-emerald-600" data-icon="check_circle">check_circle</span>
    <span>Foundational Competency Pass</span>
  </div>
</div>

<!-- Step 4: Mainstream Integration -->
<div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-emerald-400/60 transition-all">
  <!-- Subtle Ambient Background Photograph Overlay Layer -->
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <img src="images/lifecycle/stage-4-integration.webp" alt="" class="w-full h-full object-cover opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-105 transition-all duration-500 filter saturate-110" loading="lazy" />
    <div class="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/95"></div>
  </div>

  <div class="relative z-10">
    <!-- Visual Image Header Banner (16:10 ratio) -->
    <div class="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 border border-slate-200/80 shadow-2xs group-hover:shadow-xs transition-shadow bg-slate-100">
      <img src="images/lifecycle/stage-4-integration.webp" alt="Stage 04: Mainstream Integration" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="800" height="500" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
      <div class="absolute bottom-2.5 left-3 text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>Stage 04 • School &amp; Trade Transition</span>
      </div>
    </div>

    <!-- Step Icon & Label -->
    <div class="flex items-center justify-between mb-3">
      <span class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center text-sm border border-emerald-200/80 shadow-2xs">04</span>
      <span class="material-symbols-outlined text-2xl text-emerald-600" data-icon="workspace_premium">workspace_premium</span>
    </div>

    <h3 class="text-lg sm:text-xl font-serif font-bold text-[#172033] mb-2 group-hover:text-emerald-800 transition-colors leading-snug">Mainstream Integration</h3>
    <p class="text-sm text-[#526070] leading-relaxed">
      Enrollment into formal CBSE/State schools or accredited vocational trades with 3-year post-rehabilitation monitoring and legal safeguards.
    </p>
  </div>

  <div class="relative z-10 mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-slate-600 flex items-center">
    <span class="material-symbols-outlined text-base mr-1.5 text-emerald-600" data-icon="check_circle">check_circle</span>
    <span>Sustained Autonomy &amp; Safety</span>
  </div>
</div>
</div>
</div>
</section>
<!-- DETAILED BREAKDOWN OF THE 6 CORE PROGRAMS -->`;

if (!targetRegex.test(content)) {
  console.error("Could not find lifecycle section in our-work.html!");
  process.exit(1);
}

content = content.replace(targetRegex, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully injected lifecycle images and ambient card backgrounds into our-work.html!");
