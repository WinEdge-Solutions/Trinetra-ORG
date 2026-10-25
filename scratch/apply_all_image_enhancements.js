const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'D:\\Trinetra ORG';

console.log('=== Step 1: Upgrading shared_components.js with 6 Pillar Micro-Thumbnails ===');

const sharedPath = path.join(ROOT_DIR, 'scratch', 'shared_components.js');
let sharedCode = fs.readFileSync(sharedPath, 'utf8');

// Replacement for the 6 pillars in the mega-menu
const oldPillarsBlock = `            <!-- 2-Column Grid -->
            <div class="grid grid-cols-2 gap-2 pt-3">
              <!-- Pillar 1 -->
              <a href="our-work.html#pillar-education" role="menuitem" class="dropdown-item-card group p-2.5 rounded-xl transition-all flex items-start gap-3">
                <span class="w-9 h-9 rounded-xl bg-amber-50 text-[#9A3412] border border-amber-200/80 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                  <span class="material-symbols-outlined text-[20px]" aria-hidden="true">school</span>
                </span>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Education Aid</span>
                    <span class="text-[9px] uppercase font-bold tracking-wider text-amber-800 bg-amber-100/80 px-1 py-0.2 rounded border border-amber-300/50 shrink-0">Scholarships</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug line-clamp-1 mt-0.5">School fees &amp; remedial books</p>
                </div>
              </a>

              <!-- Pillar 2 -->
              <a href="our-work.html#pillar-protection" role="menuitem" class="dropdown-item-card group p-2.5 rounded-xl transition-all flex items-start gap-3">
                <span class="w-9 h-9 rounded-xl bg-red-50 text-[#B91C1C] border border-red-200/80 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                  <span class="material-symbols-outlined text-[20px]" aria-hidden="true">shield</span>
                </span>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Child Protection</span>
                    <span class="text-[9px] uppercase font-bold tracking-wider text-red-800 bg-red-100/80 px-1 py-0.2 rounded border border-red-300/50 shrink-0">Rescue</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug line-clamp-1 mt-0.5">Anti-labour &amp; police liaison</p>
                </div>
              </a>

              <!-- Pillar 3 -->
              <a href="our-work.html#pillar-women" role="menuitem" class="dropdown-item-card group p-2.5 rounded-xl transition-all flex items-start gap-3">
                <span class="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F766E] border border-emerald-200/80 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                  <span class="material-symbols-outlined text-[20px]" aria-hidden="true">groups</span>
                </span>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Women &amp; Community</span>
                    <span class="text-[9px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100/80 px-1 py-0.2 rounded border border-emerald-300/50 shrink-0">SHG Aid</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug line-clamp-1 mt-0.5">Self-help groups &amp; legal rights</p>
                </div>
              </a>

              <!-- Pillar 4 -->
              <a href="our-work.html#pillar-family" role="menuitem" class="dropdown-item-card group p-2.5 rounded-xl transition-all flex items-start gap-3">
                <span class="w-9 h-9 rounded-xl bg-indigo-50 text-[#172554] border border-indigo-200/80 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <span class="material-symbols-outlined text-[20px]" aria-hidden="true">diversity_1</span>
                </span>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Family Support</span>
                    <span class="text-[9px] uppercase font-bold tracking-wider text-indigo-800 bg-indigo-100/80 px-1 py-0.2 rounded border border-indigo-300/50 shrink-0">Relief</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug line-clamp-1 mt-0.5">Emergency rations &amp; stability</p>
                </div>
              </a>

              <!-- Pillar 5 -->
              <a href="our-work.html#pillar-skills" role="menuitem" class="dropdown-item-card group p-2.5 rounded-xl transition-all flex items-start gap-3">
                <span class="w-9 h-9 rounded-xl bg-orange-50 text-[#9A3412] border border-orange-200/80 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                  <span class="material-symbols-outlined text-[20px]" aria-hidden="true">build</span>
                </span>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Skill Development</span>
                    <span class="text-[9px] uppercase font-bold tracking-wider text-orange-800 bg-orange-100/80 px-1 py-0.2 rounded border border-orange-300/50 shrink-0">Vocational</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug line-clamp-1 mt-0.5">Livelihoods &amp; tailoring crafts</p>
                </div>
              </a>

              <!-- Pillar 6 -->
              <a href="our-work.html#pillar-health" role="menuitem" class="dropdown-item-card group p-2.5 rounded-xl transition-all flex items-start gap-3">
                <span class="w-9 h-9 rounded-xl bg-teal-50 text-[#0F766E] border border-teal-200/80 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                  <span class="material-symbols-outlined text-[20px]" aria-hidden="true">health_and_safety</span>
                </span>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Health &amp; Digital</span>
                    <span class="text-[9px] uppercase font-bold tracking-wider text-teal-800 bg-teal-100/80 px-1 py-0.2 rounded border border-teal-300/50 shrink-0">Hygiene</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug line-clamp-1 mt-0.5">Sanitary awareness &amp; e-literacy</p>
                </div>
              </a>
            </div>`;

const newPillarsBlock = `            <!-- 2-Column Grid with Authentic Micro-Thumbnails -->
            <div class="grid grid-cols-2 gap-2 pt-3">
              <!-- Pillar 1 -->
              <a href="our-work.html#pillar-education" role="menuitem" class="dropdown-item-card group p-2 rounded-xl transition-all flex items-center gap-3 hover:bg-amber-50/60">
                <div class="w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200/90 relative bg-slate-100 shadow-2xs">
                  <img src="images/pillars/pillar-education.webp" alt="Education Aid &amp; Scholarships" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300" width="48" height="40" loading="lazy">
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-1">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Education Aid</span>
                    <span class="text-[8.5px] uppercase font-bold tracking-wider text-amber-800 bg-amber-100/80 px-1 py-0.2 rounded border border-amber-300/50 shrink-0">Scholarships</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug truncate mt-0.5">School fees &amp; remedial books</p>
                </div>
              </a>

              <!-- Pillar 2 -->
              <a href="our-work.html#pillar-protection" role="menuitem" class="dropdown-item-card group p-2 rounded-xl transition-all flex items-center gap-3 hover:bg-red-50/60">
                <div class="w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200/90 relative bg-slate-100 shadow-2xs">
                  <img src="images/pillars/pillar-protection.webp" alt="Child Protection &amp; Anti-Labour" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300" width="48" height="40" loading="lazy">
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-1">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Child Protection</span>
                    <span class="text-[8.5px] uppercase font-bold tracking-wider text-red-800 bg-red-100/80 px-1 py-0.2 rounded border border-red-300/50 shrink-0">Rescue</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug truncate mt-0.5">Anti-labour &amp; police liaison</p>
                </div>
              </a>

              <!-- Pillar 3 -->
              <a href="our-work.html#pillar-women" role="menuitem" class="dropdown-item-card group p-2 rounded-xl transition-all flex items-center gap-3 hover:bg-emerald-50/60">
                <div class="w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200/90 relative bg-slate-100 shadow-2xs">
                  <img src="images/pillars/pillar-women.webp" alt="Women &amp; Community SHGs" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300" width="48" height="40" loading="lazy">
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-1">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Women &amp; Community</span>
                    <span class="text-[8.5px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100/80 px-1 py-0.2 rounded border border-emerald-300/50 shrink-0">SHG Aid</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug truncate mt-0.5">Self-help groups &amp; legal rights</p>
                </div>
              </a>

              <!-- Pillar 4 -->
              <a href="our-work.html#pillar-family" role="menuitem" class="dropdown-item-card group p-2 rounded-xl transition-all flex items-center gap-3 hover:bg-indigo-50/60">
                <div class="w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200/90 relative bg-slate-100 shadow-2xs">
                  <img src="images/pillars/pillar-family.webp" alt="Family Support &amp; Rations" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300" width="48" height="40" loading="lazy">
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-1">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Family Support</span>
                    <span class="text-[8.5px] uppercase font-bold tracking-wider text-indigo-800 bg-indigo-100/80 px-1 py-0.2 rounded border border-indigo-300/50 shrink-0">Relief</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug truncate mt-0.5">Emergency rations &amp; stability</p>
                </div>
              </a>

              <!-- Pillar 5 -->
              <a href="our-work.html#pillar-skills" role="menuitem" class="dropdown-item-card group p-2 rounded-xl transition-all flex items-center gap-3 hover:bg-orange-50/60">
                <div class="w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200/90 relative bg-slate-100 shadow-2xs">
                  <img src="images/pillars/pillar-skills.webp" alt="Skill Development &amp; Crafts" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300" width="48" height="40" loading="lazy">
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-1">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Skill Development</span>
                    <span class="text-[8.5px] uppercase font-bold tracking-wider text-orange-800 bg-orange-100/80 px-1 py-0.2 rounded border border-orange-300/50 shrink-0">Vocational</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug truncate mt-0.5">Livelihoods &amp; tailoring crafts</p>
                </div>
              </a>

              <!-- Pillar 6 -->
              <a href="our-work.html#pillar-health" role="menuitem" class="dropdown-item-card group p-2 rounded-xl transition-all flex items-center gap-3 hover:bg-teal-50/60">
                <div class="w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200/90 relative bg-slate-100 shadow-2xs">
                  <img src="images/pillars/pillar-health.webp" alt="Health &amp; Digital Hygiene" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300" width="48" height="40" loading="lazy">
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-1">
                    <span class="text-[13px] font-bold text-[#172033] group-hover:text-[#9A3412] leading-tight truncate">Health &amp; Digital</span>
                    <span class="text-[8.5px] uppercase font-bold tracking-wider text-teal-800 bg-teal-100/80 px-1 py-0.2 rounded border border-teal-300/50 shrink-0">Hygiene</span>
                  </div>
                  <p class="text-[11px] text-[#526070] leading-snug truncate mt-0.5">Sanitary awareness &amp; e-literacy</p>
                </div>
              </a>
            </div>`;

if (sharedCode.includes(oldPillarsBlock)) {
  sharedCode = sharedCode.replace(oldPillarsBlock, newPillarsBlock);
  fs.writeFileSync(sharedPath, sharedCode, 'utf8');
  console.log('✔ shared_components.js successfully updated with micro-thumbnails.');
} else {
  console.error('❌ Could not locate oldPillarsBlock in shared_components.js');
}

console.log('\n=== Step 2: Propagating Upgraded Navigation Across All 16 Pages ===');
require('./apply_new_navigation.js');

console.log('\n=== All steps in shared_components complete ===');
