const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'our-work.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetRegex = /<!-- CALL TO ACTION BANNER: CSR PARTNERSHIPS & SPONSORSHIP -->[\s\S]*?<\/section>/;

const replacement = `<!-- CALL TO ACTION BANNER: CSR PARTNERSHIPS & SPONSORSHIP -->
<section data-aos="fade-up" class="py-16 bg-[#FFF9F1]" id="donate">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="bg-[#172554] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-indigo-950">
<!-- Subtle ambient glow background decoration -->
<div class="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
<div class="absolute -left-20 -top-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

<div class="relative z-10 max-w-3xl space-y-6">
<div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
<span class="material-symbols-outlined text-sm" data-icon="handshake">handshake</span>
<span class="text-xs font-bold uppercase tracking-wider">CSR Schedule VII &amp; Individual Giving</span>
</div>
<h2 class="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-white leading-tight">
              Sponsor a Grassroots Pillar or Deploy CSR Capital with Absolute Transparency
            </h2>
<p class="text-base sm:text-lg text-slate-200 leading-relaxed">
              Every rupee donated is tied directly to a documented child case-file or vocational batch. Tax exemption verification pending statutory filing.
            </p>
<div class="pt-2 flex flex-wrap gap-4 items-center">
<a class="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#9A3412] hover:bg-[#7C2D12] text-white font-bold text-sm transition-transform active:scale-95 shadow-md focus:ring-2 focus:ring-amber-400" href="donate.html">
                <span>Sponsor a Child's Education (₹1,500/mo)</span>
                <span class="material-symbols-outlined text-base ml-2" aria-hidden="true">arrow_forward</span>
              </a>
<a class="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border-2 border-white/30 hover:border-white text-white hover:bg-white/10 font-bold text-sm transition-all focus:ring-2 focus:ring-white" href="volunteer-partner.html#track-institutional">
                <span>Corporate CSR Collaboration Inquiries</span>
              </a>
</div>
<div class="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
<span class="inline-flex items-center gap-1.5">
<span class="material-symbols-outlined text-sm text-amber-400" data-icon="lock">lock</span>
                <span>256-Bit SSL Encrypted</span>
              </span>
<span class="inline-flex items-center gap-1.5">
<span class="material-symbols-outlined text-sm text-emerald-400" data-icon="verified" aria-hidden="true">verified</span>
                <span>Statutory Donation Receipt</span>
              </span>
<span class="inline-flex items-center gap-1.5">
<span class="material-symbols-outlined text-sm text-amber-400" data-icon="shield" aria-hidden="true">shield</span>
                <span>No Administrative Leakage</span>
              </span>
</div>
</div>
<!-- Abstract Warm Civic Vector Geometry in background (No Stock Photos) -->
<div class="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:flex items-center justify-center">
<span class="material-symbols-outlined text-[320px] text-white/10" data-icon="shield" aria-hidden="true">shield</span>
</div>
</div>
</div>
</section>`;

if (!targetRegex.test(content)) {
  console.error('Target section regex not matched in our-work.html!');
  process.exit(1);
}

content = content.replace(targetRegex, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated our-work.html CTA section!');
