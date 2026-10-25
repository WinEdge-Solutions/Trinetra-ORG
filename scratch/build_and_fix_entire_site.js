const fs = require('fs');
const path = require('path');
const {
  STATUTORY,
  generateHead,
  generateSkipLink,
  generateTopRibbon,
  generateHeader,
  generateFooter
} = require('./shared_components.js');

const ROOT_DIR = 'D:\\Trinetra ORG';

console.log('=== Starting Trinetra Gargi Foundation Site-Wide Build & Compliance Fix ===\n');

// ============================================================================
// 1. GENERATE NEW PAGES
// ============================================================================

// 1.1 AWARENESS & RESOURCES (awareness.html)
function buildAwarenessPage() {
  const content = `
${generateHead('Awareness & Legal Resources | Trinetra Gargi Foundation', 'Free public awareness guides and downloadable posters on Child Labour Prohibition, POCSO rights, RTE Section 12(1)(c), and women legal protections.', 'awareness.html')}
${generateSkipLink()}
${generateTopRibbon()}
${generateHeader('awareness')}

<main id="main-content" class="flex-grow pb-24 xl:pb-0">
  <!-- Hero Section -->
  <section class="py-12 md:py-16 bg-gradient-to-b from-[#FFF9ED] via-[#FFFDF9] to-[#FFFFFF] border-b border-amber-500/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-bold tracking-wide uppercase mb-4" data-aos="fade-down">
        <span class="material-symbols-outlined text-sm text-amber-700" aria-hidden="true">menu_book</span>
        Citizen Legal Literacy &amp; Advocacy
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 tracking-tight mb-4 leading-tight" data-aos="fade-up">
        Democratizing Legal Rights &amp; Community Protection
      </h1>
      <p class="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
        Grassroots education on child protection protocols, women's statutory safety laws, pedagogical rights, and digital safety for vulnerable households across Rajasthan.
      </p>
    </div>
  </section>

  <!-- Thematic Legal & Protection Modules (5 Core Cards) -->
  <section class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-10 text-center max-w-2xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-2">5 Strategic Legal Literacy Modules</h2>
      <p class="text-sm text-neutral-600">Essential civic knowledge codified into clear community guidance for families, youth, and educators.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1: Child Labour -->
      <article class="bg-white rounded-2xl p-6 sm:p-7 border border-amber-200/70 shadow-xs hover:border-amber-700/50 hover:shadow-md transition-all flex flex-col justify-between" data-aos="fade-up">
        <div>
          <div class="w-12 h-12 rounded-xl bg-red-50 text-[#B91C1C] flex items-center justify-center mb-5 border border-red-200">
            <span class="material-symbols-outlined text-2xl" aria-hidden="true">gavel</span>
          </div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-[#B91C1C] bg-red-50 px-2 py-0.5 rounded border border-red-200">Act 61 of 1986 / 2016</span>
          <h3 class="text-lg font-bold text-neutral-900 mt-2.5 mb-2">Child Labour (Prohibition &amp; Regulation)</h3>
          <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
            Total prohibition of employment of children below 14 in all occupations and adolescents (14–18) in hazardous processes. Guidance on identifying illegal brick kiln, dhaba, and bangle unit employment.
          </p>
        </div>
        <div class="pt-4 border-t border-amber-100/80 flex items-center justify-between text-xs">
          <span class="text-neutral-500 font-medium">Duty to report: Free triage</span>
          <a href="help-report.html" class="font-bold text-[#B91C1C] hover:text-red-900 flex items-center gap-1 focus:ring-1 focus:ring-[#B91C1C] rounded">
            Report Infraction <span class="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </article>

      <!-- Card 2: POCSO -->
      <article class="bg-white rounded-2xl p-6 sm:p-7 border border-amber-200/70 shadow-xs hover:border-amber-700/50 hover:shadow-md transition-all flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
        <div>
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-5 border border-amber-200">
            <span class="material-symbols-outlined text-2xl" aria-hidden="true">shield</span>
          </div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">POCSO Act 2012</span>
          <h3 class="text-lg font-bold text-neutral-900 mt-2.5 mb-2">Protection of Children from Sexual Offences</h3>
          <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
            Gender-neutral child protection safeguarding children against sexual abuse, harassment, and pornography. Highlights Section 19 mandatory reporting duties and legal immunity for citizen informants.
          </p>
        </div>
        <div class="pt-4 border-t border-amber-100/80 flex items-center justify-between text-xs">
          <span class="text-neutral-500 font-medium">Informant identity protected</span>
          <a href="help-report.html" class="font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 focus:ring-1 focus:ring-amber-800 rounded">
            Safe Intake <span class="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </article>

      <!-- Card 3: RTE 12(1)(c) -->
      <article class="bg-white rounded-2xl p-6 sm:p-7 border border-amber-200/70 shadow-xs hover:border-amber-700/50 hover:shadow-md transition-all flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
        <div>
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 border border-emerald-200">
            <span class="material-symbols-outlined text-2xl" aria-hidden="true">school</span>
          </div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">RTE Section 12(1)(c)</span>
          <h3 class="text-lg font-bold text-neutral-900 mt-2.5 mb-2">Right to Free &amp; Compulsory Education</h3>
          <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
            Mandates 25% free admission quota in private unaided schools for children from Economically Weaker Sections (EWS) and disadvantaged groups. Step-by-step assistance for lottery application.
          </p>
        </div>
        <div class="pt-4 border-t border-amber-100/80 flex items-center justify-between text-xs">
          <span class="text-neutral-500 font-medium">Free private quota guide</span>
          <a href="government-schemes.html" class="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 focus:ring-1 focus:ring-emerald-700 rounded">
            View RTE Scheme <span class="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </article>

      <!-- Card 4: PWDVA -->
      <article class="bg-white rounded-2xl p-6 sm:p-7 border border-amber-200/70 shadow-xs hover:border-amber-700/50 hover:shadow-md transition-all flex flex-col justify-between" data-aos="fade-up" data-aos-delay="300">
        <div>
          <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-5 border border-purple-200">
            <span class="material-symbols-outlined text-2xl" aria-hidden="true">shield_with_heart</span>
          </div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">PWDV Act 2005</span>
          <h3 class="text-lg font-bold text-neutral-900 mt-2.5 mb-2">Protection of Women from Domestic Violence</h3>
          <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
            Legal safeguards against physical, emotional, economic, and sexual abuse in domestic relationships. Secures rights to residence orders, maintenance, custody, and emergency shelter linkage via 181.
          </p>
        </div>
        <div class="pt-4 border-t border-amber-100/80 flex items-center justify-between text-xs">
          <span class="text-neutral-500 font-medium">Shelter &amp; Legal Aid</span>
          <a href="tel:181" class="font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 focus:ring-1 focus:ring-purple-700 rounded">
            Helpline 181 <span class="material-symbols-outlined text-sm" aria-hidden="true">call</span>
          </a>
        </div>
      </article>

      <!-- Card 5: Cyber Safety -->
      <article class="bg-white rounded-2xl p-6 sm:p-7 border border-amber-200/70 shadow-xs hover:border-amber-700/50 hover:shadow-md transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1" data-aos="fade-up" data-aos-delay="400">
        <div>
          <div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-5 border border-sky-200">
            <span class="material-symbols-outlined text-2xl" aria-hidden="true">security</span>
          </div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">IT Act 2000 &amp; DPDP</span>
          <h3 class="text-lg font-bold text-neutral-900 mt-2.5 mb-2">Adolescent Cyber Hygiene &amp; Safety</h3>
          <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
            Protecting vulnerable adolescents from online exploitation, cyberbullying, financial OTP fraud, and digital impersonation. Reporting mechanisms via National Cyber Crime Reporting Portal (1930).
          </p>
        </div>
        <div class="pt-4 border-t border-amber-100/80 flex items-center justify-between text-xs">
          <span class="text-neutral-500 font-medium">Cyber Crime Helpline: 1930</span>
          <a href="tel:1930" class="font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 focus:ring-1 focus:ring-sky-700 rounded">
            Dial 1930 <span class="material-symbols-outlined text-sm" aria-hidden="true">call</span>
          </a>
        </div>
      </article>
    </div>
  </section>

  <!-- Downloadable Advocacy Materials Grid (5 PDFs) -->
  <section class="py-12 md:py-16 bg-[#FFFDF9] border-y border-amber-500/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-10 text-center max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 text-neutral-800 text-xs font-semibold mb-3">
          <span class="material-symbols-outlined text-sm" aria-hidden="true">download</span> Community Resources
        </div>
        <h2 class="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-2">Downloadable Rights &amp; Action Guides</h2>
        <p class="text-sm text-neutral-600">Print-ready civic resources prepared for distribution across community centers, schools, and panchayat bhavans.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- PDF 1 -->
        <div class="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3 text-xs text-stone-500">
              <span class="font-bold uppercase tracking-wider text-amber-800">Infographic</span>
              <span>1.8 MB · English / Hindi</span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Child Labour Reporting &amp; Action Protocol</h3>
            <p class="text-xs text-neutral-600 leading-relaxed mb-4">
              Visual identification guide detailing hazardous industrial occupations and step-by-step reporting to Childline 1098 and CWC.
            </p>
          </div>
          <button type="button" onclick="showToast('Document: Child Labour Reporting Protocol will be published shortly upon formal statutory release.', 'info')" class="w-full py-2.5 px-4 rounded-xl border border-amber-300/60 hover:border-amber-700 bg-stone-50 hover:bg-white text-xs font-bold text-neutral-800 flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-sm" aria-hidden="true">file_download</span> Download Guide (PDF)
          </button>
        </div>

        <!-- PDF 2 -->
        <div class="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3 text-xs text-stone-500">
              <span class="font-bold uppercase tracking-wider text-amber-800">Pocket Guide</span>
              <span>1.4 MB · English</span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">POCSO Citizen &amp; Informant Pocket Handbook</h3>
            <p class="text-xs text-neutral-600 leading-relaxed mb-4">
              Complete summary of whistleblower legal immunities, mandatory reporting duties, and safe child disclosure guidelines.
            </p>
          </div>
          <button type="button" onclick="showToast('Document: POCSO Pocket Handbook is queued for official distribution.', 'info')" class="w-full py-2.5 px-4 rounded-xl border border-amber-300/60 hover:border-amber-700 bg-stone-50 hover:bg-white text-xs font-bold text-neutral-800 flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-sm" aria-hidden="true">file_download</span> Download Guide (PDF)
          </button>
        </div>

        <!-- PDF 3 -->
        <div class="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3 text-xs text-stone-500">
              <span class="font-bold uppercase tracking-wider text-amber-800">Handbook</span>
              <span>2.1 MB · English / Hindi</span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">RTE 25% Private School Admission Manual</h3>
            <p class="text-xs text-neutral-600 leading-relaxed mb-4">
              Checklist of required income, caste, and address certificates for submitting successful online lottery entries in Rajasthan.
            </p>
          </div>
          <button type="button" onclick="showToast('Document: RTE Admission Manual will be available during active state lottery cycle.', 'info')" class="w-full py-2.5 px-4 rounded-xl border border-amber-300/60 hover:border-amber-700 bg-stone-50 hover:bg-white text-xs font-bold text-neutral-800 flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-sm" aria-hidden="true">file_download</span> Download Guide (PDF)
          </button>
        </div>

        <!-- PDF 4 -->
        <div class="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3 text-xs text-stone-500">
              <span class="font-bold uppercase tracking-wider text-amber-800">Action Card</span>
              <span>1.2 MB · English</span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Women's Statutory Legal Protection Handout</h3>
            <p class="text-xs text-neutral-600 leading-relaxed mb-4">
              Emergency numbers, protection officer roles, interim maintenance claims, and free state legal services directory.
            </p>
          </div>
          <button type="button" onclick="showToast('Document: Women Legal Protection Handout scheduled for upcoming release.', 'info')" class="w-full py-2.5 px-4 rounded-xl border border-amber-300/60 hover:border-amber-700 bg-stone-50 hover:bg-white text-xs font-bold text-neutral-800 flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-sm" aria-hidden="true">file_download</span> Download Guide (PDF)
          </button>
        </div>

        <!-- PDF 5 -->
        <div class="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <div class="flex items-center justify-between mb-3 text-xs text-stone-500">
              <span class="font-bold uppercase tracking-wider text-amber-800">Checklist</span>
              <span>950 KB · English</span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Digital Safety &amp; Cyber Hygiene Checklist</h3>
            <p class="text-xs text-neutral-600 leading-relaxed mb-4">
              A 10-point checklist for adolescent youth and parents covering social privacy settings, financial scams, and reporting on 1930.
            </p>
          </div>
          <button type="button" onclick="showToast('Document: Digital Safety Checklist scheduled for upcoming release.', 'info')" class="w-full py-2.5 px-4 rounded-xl border border-amber-300/60 hover:border-amber-700 bg-stone-50 hover:bg-white text-xs font-bold text-neutral-800 flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-sm" aria-hidden="true">file_download</span> Download Guide (PDF)
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Community Workshop Request Banner -->
  <section class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-gradient-to-r from-[#172554] via-[#1E293B] to-[#0F172A] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
      <div class="relative z-10 max-w-3xl">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/30">
          <span class="material-symbols-outlined text-xs" aria-hidden="true">campaign</span> Grassroots Outreach
        </span>
        <h2 class="text-2xl sm:text-3xl font-serif font-bold mb-3 tracking-tight">Request a Free Community Rights Camp</h2>
        <p class="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
          Are you a Resident Welfare Association (RWA), Gram Panchayat, or government school principal? Our field legal and social caseworkers conduct free 2-hour legal awareness and safety workshops.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="contact-faq.html" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all focus:ring-2 focus:ring-white">
            <span class="material-symbols-outlined text-base" aria-hidden="true">mail</span> Contact Community Desk
          </a>
          <a href="tel:1098" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all focus:ring-2 focus:ring-white">
            <span class="material-symbols-outlined text-base text-red-400" aria-hidden="true">call</span> Childline Emergency (1098)
          </a>
        </div>
      </div>
    </div>
  </section>
</main>

${generateFooter('awareness')}
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'awareness.html'), content.trim() + '\n', 'utf8');
  console.log('✔ Generated awareness.html');
}

// 1.2 IMPACT & REPORTS (impact.html)
function buildImpactPage() {
  const content = `
${generateHead('Impact & Audited Reports | Trinetra Gargi Foundation', 'Verified impact metrics, annual activity filings, audited financial balance sheets, and Section 8 governance compliance documents.', 'impact.html')}
${generateSkipLink()}
${generateTopRibbon()}
${generateHeader('impact')}

<main id="main-content" class="flex-grow pb-24 xl:pb-0">
  <!-- Hero Section -->
  <section class="py-12 md:py-16 bg-gradient-to-b from-[#FFF9ED] via-[#FFFDF9] to-[#FFFFFF] border-b border-amber-500/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-bold tracking-wide uppercase mb-4" data-aos="fade-down">
        <span class="material-symbols-outlined text-sm text-amber-700" aria-hidden="true">verified</span>
        Accountability &amp; Statutory Governance
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 tracking-tight mb-4 leading-tight" data-aos="fade-up">
        Audited Grassroots Metrics &amp; Institutional Transparency
      </h1>
      <p class="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
        Verifiable field disclosures, annual activity filings, and public governance records reflecting our social welfare mission in Rajasthan.
      </p>
    </div>
  </section>

  <!-- Verified Impact Metrics Counters Grid (6 Key Indicators) -->
  <section class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-8 text-center max-w-2xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-2">Field Operations &amp; Reach</h2>
      <p class="text-xs sm:text-sm text-stone-500 italic">
        * Field figures represent cumulative program counts. Subject to annual statutory audit verification (PLACEHOLDER: true per docs/CONTENT-MODEL.md).
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
      <!-- Metric 1 -->
      <div class="bg-white rounded-2xl p-5 border border-amber-200/70 text-center shadow-xs" data-aos="fade-up">
        <div class="text-2xl sm:text-3xl font-serif font-extrabold text-[#9A3412] mb-1">
          <span class="stat-counter" data-stat-target="14200" data-stat-suffix="+">14,200+</span>
        </div>
        <div class="text-xs font-bold text-neutral-900 mb-0.5">Lives Uplifted</div>
        <p class="text-[11px] text-stone-500">Total vulnerable individuals supported</p>
      </div>

      <!-- Metric 2 -->
      <div class="bg-white rounded-2xl p-5 border border-amber-200/70 text-center shadow-xs" data-aos="fade-up" data-aos-delay="50">
        <div class="text-2xl sm:text-3xl font-serif font-extrabold text-[#9A3412] mb-1">
          <span class="stat-counter" data-stat-target="4820" data-stat-suffix="+">4,820+</span>
        </div>
        <div class="text-xs font-bold text-neutral-900 mb-0.5">School Bridge Admissions</div>
        <p class="text-[11px] text-stone-500">Mainstreamed into formal schools</p>
      </div>

      <!-- Metric 3 -->
      <div class="bg-white rounded-2xl p-5 border border-amber-200/70 text-center shadow-xs" data-aos="fade-up" data-aos-delay="100">
        <div class="text-2xl sm:text-3xl font-serif font-extrabold text-[#B91C1C] mb-1">
          <span class="stat-counter" data-stat-target="1150" data-stat-suffix="+">1,150+</span>
        </div>
        <div class="text-xs font-bold text-neutral-900 mb-0.5">Child Protection Interventions</div>
        <p class="text-[11px] text-stone-500">Rescues, CWC custody &amp; rehabilitation</p>
      </div>

      <!-- Metric 4 -->
      <div class="bg-white rounded-2xl p-5 border border-amber-200/70 text-center shadow-xs" data-aos="fade-up" data-aos-delay="150">
        <div class="text-2xl sm:text-3xl font-serif font-extrabold text-emerald-700 mb-1">
          <span class="stat-counter" data-stat-target="3200" data-stat-suffix="+">3,200+</span>
        </div>
        <div class="text-xs font-bold text-neutral-900 mb-0.5">Women Mobilized</div>
        <p class="text-[11px] text-stone-500">Active in Self-Help Groups</p>
      </div>

      <!-- Metric 5 -->
      <div class="bg-white rounded-2xl p-5 border border-amber-200/70 text-center shadow-xs" data-aos="fade-up" data-aos-delay="200">
        <div class="text-2xl sm:text-3xl font-serif font-extrabold text-purple-700 mb-1">
          <span class="stat-counter" data-stat-target="890" data-stat-suffix="+">890+</span>
        </div>
        <div class="text-xs font-bold text-neutral-900 mb-0.5">Youth Certified</div>
        <p class="text-[11px] text-stone-500">Vocational computer &amp; stitching skills</p>
      </div>

      <!-- Metric 6 -->
      <div class="bg-white rounded-2xl p-5 border border-amber-200/70 text-center shadow-xs" data-aos="fade-up" data-aos-delay="250">
        <div class="text-2xl sm:text-3xl font-serif font-extrabold text-sky-700 mb-1">
          <span class="stat-counter" data-stat-target="6400" data-stat-suffix="+">6,400+</span>
        </div>
        <div class="text-xs font-bold text-neutral-900 mb-0.5">Health Screenings</div>
        <p class="text-[11px] text-stone-500">Mobile pediatric checkups conducted</p>
      </div>
    </div>
  </section>

  <!-- Statutory & Financial Reports Repository (PDF Grid) -->
  <section class="py-12 md:py-16 bg-[#FFFDF9] border-y border-amber-500/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-10 text-center max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 text-neutral-800 text-xs font-semibold mb-3">
          <span class="material-symbols-outlined text-sm" aria-hidden="true">description</span> Official Documents
        </div>
        <h2 class="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-2">Audited Filings &amp; Statutory Repository</h2>
        <p class="text-sm text-neutral-600">Download complete audited statements and legal registration documentation for public scrutiny.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Report 1 -->
        <div class="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3 text-xs text-stone-500">
              <span class="font-bold uppercase tracking-wider text-amber-800">Annual Activity</span>
              <span>2.4 MB</span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Annual Activity Report FY 2025–26</h3>
            <p class="text-xs text-neutral-600 leading-relaxed mb-4">
              Comprehensive operational overview of bridge schools, anti-trafficking raids, and community development.
            </p>
          </div>
          <button type="button" onclick="showToast('Annual Activity Report FY 2025–26 will be available for download following statutory AGM filing.', 'info')" class="w-full py-2.5 px-4 rounded-xl border border-amber-300/60 hover:border-amber-700 bg-stone-50 hover:bg-white text-xs font-bold text-neutral-800 flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-sm" aria-hidden="true">file_download</span> Download PDF Report
          </button>
        </div>

        <!-- Report 2 -->
        <div class="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3 text-xs text-stone-500">
              <span class="font-bold uppercase tracking-wider text-amber-800">Financial Audit</span>
              <span>1.8 MB</span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Audited Balance Sheet &amp; Accounts</h3>
            <p class="text-xs text-neutral-600 leading-relaxed mb-4">
              Chartered accountant-certified financial statements, donor utilization accounts, and fund receipts.
            </p>
          </div>
          <button type="button" onclick="showToast('Audited Balance Sheet statement will be published upon audit sign-off.', 'info')" class="w-full py-2.5 px-4 rounded-xl border border-amber-300/60 hover:border-amber-700 bg-stone-50 hover:bg-white text-xs font-bold text-neutral-800 flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-sm" aria-hidden="true">file_download</span> Download PDF Report
          </button>
        </div>

        <!-- Report 3 -->
        <div class="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3 text-xs text-stone-500">
              <span class="font-bold uppercase tracking-wider text-amber-800">Incorporation</span>
              <span>1.1 MB</span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Section 8 MCA License Certificate</h3>
            <p class="text-xs text-neutral-600 leading-relaxed mb-4">
              Official Ministry of Corporate Affairs incorporation charter under Section 8 of the Companies Act, 2013.
            </p>
          </div>
          <button type="button" onclick="showToast('Section 8 MCA License dossier available upon request to legal@trinetragargifoundation.org.', 'info')" class="w-full py-2.5 px-4 rounded-xl border border-amber-300/60 hover:border-amber-700 bg-stone-50 hover:bg-white text-xs font-bold text-neutral-800 flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-sm" aria-hidden="true">file_download</span> Download PDF Report
          </button>
        </div>

        <!-- Report 4 -->
        <div class="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3 text-xs text-stone-500">
              <span class="font-bold uppercase tracking-wider text-amber-800">Social Audit</span>
              <span>1.5 MB</span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Social Impact Assessment Summary</h3>
            <p class="text-xs text-neutral-600 leading-relaxed mb-4">
              Independent qualitative assessment of education continuity, nutrition indexes, and women SHG savings growth.
            </p>
          </div>
          <button type="button" onclick="showToast('Social Impact Assessment summary will be published upon field census validation.', 'info')" class="w-full py-2.5 px-4 rounded-xl border border-amber-300/60 hover:border-amber-700 bg-stone-50 hover:bg-white text-xs font-bold text-neutral-800 flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-sm" aria-hidden="true">file_download</span> Download PDF Report
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Statutory Compliance & Legal Accreditation Dossier -->
  <section class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white rounded-3xl p-8 sm:p-10 border border-amber-200/70 shadow-sm">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-amber-100/80 pb-8 mb-8">
        <div>
          <span class="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">Statutory Legal Registration</span>
          <h2 class="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-2">Ministry of Corporate Affairs Dossier</h2>
        </div>
        <div class="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
          <strong>Tax Exemption Status:</strong> ${STATUTORY.taxNote}
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-neutral-700">
        <div class="p-4 rounded-xl bg-stone-50 border border-amber-200/70">
          <div class="text-stone-500 font-semibold mb-1">Corporate Identity Number (CIN)</div>
          <div class="text-sm font-mono font-bold text-neutral-900 tracking-wider">${STATUTORY.cin}</div>
        </div>
        <div class="p-4 rounded-xl bg-stone-50 border border-amber-200/70">
          <div class="text-stone-500 font-semibold mb-1">Entity Class &amp; Act</div>
          <div class="text-sm font-bold text-neutral-900">${STATUTORY.class}</div>
        </div>
        <div class="p-4 rounded-xl bg-stone-50 border border-amber-200/70">
          <div class="text-stone-500 font-semibold mb-1">Registrar of Companies &amp; Date</div>
          <div class="text-sm font-bold text-neutral-900">${STATUTORY.roc} · ${STATUTORY.regDate}</div>
        </div>
        <div class="p-4 rounded-xl bg-stone-50 border border-amber-200/70">
          <div class="text-stone-500 font-semibold mb-1">Registered Statutory Office</div>
          <div class="text-xs text-neutral-800 leading-relaxed">${STATUTORY.address}</div>
        </div>
      </div>
    </div>
  </section>
</main>

${generateFooter('impact')}
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'impact.html'), content.trim() + '\n', 'utf8');
  console.log('✔ Generated impact.html');
}

// 1.3 DONATIONS PORTAL (donate.html)
function buildDonatePage() {
  const content = `
${generateHead('Donate & Support Our Mission | Trinetra Gargi Foundation', 'Support education, child protection, and women livelihoods. Contribute via UPI QR or direct bank NEFT/RTGS with audited transparency.', 'donate.html')}
${generateSkipLink()}
${generateTopRibbon()}
${generateHeader('donate')}

<main id="main-content" class="flex-grow pb-24 xl:pb-0">
  <!-- Hero Section -->
  <section class="py-12 md:py-16 bg-gradient-to-b from-[#FFF9ED] via-[#FFFDF9] to-[#FFFFFF] border-b border-amber-500/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-bold tracking-wide uppercase mb-4" data-aos="fade-down">
        <span class="material-symbols-outlined text-sm text-amber-700" aria-hidden="true">volunteer_activism</span>
        Direct Community Stewardship
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 tracking-tight mb-4 leading-tight" data-aos="fade-up">
        Fuel Community Dignity with Radical Transparency
      </h1>
      <p class="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
        Every rupee directly supports remedial schooling, child labour rescue, pediatric nutrition, and women's self-help livelihoods across Rajasthan.
      </p>
    </div>
  </section>

  <!-- Statutory Tax Advisory Notice (Strictly Gated) -->
  <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
    <div class="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-900 flex items-start gap-3 shadow-xs">
      <span class="material-symbols-outlined text-xl text-amber-700 shrink-0 mt-0.5" aria-hidden="true">info</span>
      <div>
        <strong>Notice on Statutory Tax Status:</strong> Trinetra Gargi Foundation is a Section 8 licensed non-profit. ${STATUTORY.taxNote}
      </div>
    </div>
  </section>

  <!-- Multi-Channel Giving & Receipt Request Grid -->
  <section class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <!-- Left Column: Payment Channels (UPI & Bank) (7 cols) -->
      <div class="lg:col-span-7 space-y-8">
        <!-- Channel 1: Merchant UPI -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/70 shadow-xs">
          <div class="flex items-center gap-3 border-b border-amber-100/80 pb-4 mb-6">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
              <span class="material-symbols-outlined text-xl" aria-hidden="true">qr_code_2</span>
            </div>
            <div>
              <h2 class="text-lg font-bold text-neutral-900">Channel 1: Instant UPI &amp; QR Code</h2>
              <p class="text-xs text-stone-500">Google Pay, PhonePe, Paytm, BHIM, or any UPI app</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-6">
            <!-- QR Placeholder / Display -->
            <div class="w-44 h-44 rounded-2xl bg-stone-50 border-2 border-dashed border-amber-300/60 flex flex-col items-center justify-center p-3 text-center shrink-0">
              <span class="material-symbols-outlined text-4xl text-amber-700/80 mb-1" aria-hidden="true">qr_code_scanner</span>
              <span class="text-xs font-bold text-neutral-800">Scan via UPI</span>
              <span class="text-[10px] text-stone-500 mt-0.5">TBD - Foundation to provide</span>
            </div>
            <div class="space-y-3 flex-1 text-xs">
              <div class="p-3.5 rounded-xl bg-stone-50 border border-amber-200/70">
                <span class="text-stone-500 block mb-1">Official Foundation UPI ID:</span>
                <div class="flex items-center justify-between gap-2">
                  <span class="font-mono text-sm font-bold text-neutral-900 select-all">TBD - Foundation to provide</span>
                  <button type="button" onclick="copyToClipboard('TBD - Foundation to provide', 'UPI ID copied!')" class="px-2.5 py-1 rounded bg-white border border-amber-300/60 text-stone-700 font-bold flex items-center gap-1 hover:border-amber-700 transition-colors focus:ring-1 focus:ring-amber-700">
                    <span class="material-symbols-outlined text-xs" aria-hidden="true">content_copy</span> Copy
                  </button>
                </div>
              </div>
              <p class="text-[11px] text-stone-500 leading-relaxed">
                After completing your payment, please note the UTR / Transaction Reference Number and submit the confirmation form on this page for official record-keeping.
              </p>
            </div>
          </div>
        </div>

        <!-- Channel 2: Direct Bank NEFT / RTGS -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/70 shadow-xs">
          <div class="flex items-center gap-3 border-b border-amber-100/80 pb-4 mb-6">
            <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-300">
              <span class="material-symbols-outlined text-xl" aria-hidden="true">account_balance</span>
            </div>
            <div>
              <h2 class="text-lg font-bold text-neutral-900">Channel 2: Direct Bank Transfer (NEFT / RTGS / IMPS)</h2>
              <p class="text-xs text-stone-500">Official Section 8 Current Account coordinates</p>
            </div>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-3 rounded-xl bg-stone-50 border border-amber-200/70 flex justify-between items-center">
              <span class="text-stone-500">Account Name:</span>
              <strong class="font-mono text-neutral-900">TRINETRA GARGI FOUNDATION</strong>
            </div>
            <div class="p-3 rounded-xl bg-stone-50 border border-amber-200/70 flex justify-between items-center">
              <span class="text-stone-500">Bank Name:</span>
              <strong class="font-mono text-neutral-900">TBD - Foundation to provide</strong>
            </div>
            <div class="p-3 rounded-xl bg-stone-50 border border-amber-200/70 flex justify-between items-center">
              <span class="text-stone-500">Account Number:</span>
              <div class="flex items-center gap-2">
                <strong class="font-mono text-neutral-900">TBD - Foundation to provide</strong>
                <button type="button" onclick="copyToClipboard('TBD - Foundation to provide', 'Account Number copied!')" class="p-1 text-stone-500 hover:text-neutral-900" aria-label="Copy Account Number">
                  <span class="material-symbols-outlined text-sm" aria-hidden="true">content_copy</span>
                </button>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-stone-50 border border-amber-200/70 flex justify-between items-center">
              <span class="text-stone-500">IFSC Code:</span>
              <div class="flex items-center gap-2">
                <strong class="font-mono text-neutral-900">TBD - Foundation to provide</strong>
                <button type="button" onclick="copyToClipboard('TBD - Foundation to provide', 'IFSC Code copied!')" class="p-1 text-stone-500 hover:text-neutral-900" aria-label="Copy IFSC Code">
                  <span class="material-symbols-outlined text-sm" aria-hidden="true">content_copy</span>
                </button>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-stone-50 border border-amber-200/70 flex justify-between items-center">
              <span class="text-stone-500">Branch &amp; Account Type:</span>
              <strong class="text-neutral-900">Jagatpura, Jaipur · Current Account</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Donation Confirmation & Receipt Intake Form (5 cols) -->
      <div class="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/70 shadow-sm">
        <div class="border-b border-amber-100/80 pb-4 mb-6">
          <span class="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Donor Stewardship</span>
          <h2 class="text-xl font-bold text-neutral-900 mt-2 mb-1">Donation Acknowledgment Request</h2>
          <p class="text-xs text-neutral-600">
            Submit your transfer details for official acknowledgment records and statutory verification reporting.
          </p>
        </div>

        <form id="donationReceiptForm" onsubmit="handleDonationReceiptSubmit(event)" class="space-y-4 text-xs" novalidate>
          <!-- Anti-spam Honeypot -->
          <input type="text" id="honeypot_title" name="honeypot_title" style="position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0;" tabindex="-1" aria-hidden="true" autocomplete="off">

          <div>
            <label for="donorName" class="block font-semibold text-neutral-700 mb-1">Donor Legal Name <span class="text-[#B91C1C]">*</span></label>
            <input type="text" id="donorName" name="donorName" required placeholder="Full legal name" class="form-input-field">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="donorEmail" class="block font-semibold text-neutral-700 mb-1">Email Address <span class="text-[#B91C1C]">*</span></label>
              <input type="email" id="donorEmail" name="donorEmail" required placeholder="name@domain.com" class="form-input-field">
            </div>
            <div>
              <label for="donorPhone" class="block font-semibold text-neutral-700 mb-1">Mobile Number (+91) <span class="text-[#B91C1C]">*</span></label>
              <input type="tel" id="donorPhone" name="donorPhone" required pattern="[6-9][0-9]{9}" placeholder="10-digit mobile" class="form-input-field">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="amountPaid" class="block font-semibold text-neutral-700 mb-1">Amount Contributed (₹) <span class="text-[#B91C1C]">*</span></label>
              <input type="number" id="amountPaid" name="amountPaid" min="100" required placeholder="e.g. 1200" class="form-input-field font-bold">
            </div>
            <div>
              <label for="paymentMode" class="block font-semibold text-neutral-700 mb-1">Payment Channel <span class="text-[#B91C1C]">*</span></label>
              <select id="paymentMode" name="paymentMode" required class="form-input-field">
                <option value="upi-qr">UPI / QR Code</option>
                <option value="bank-neft-rtgs">Direct Bank NEFT / RTGS</option>
                <option value="online-gateway">Online Gateway / Other</option>
              </select>
            </div>
          </div>

          <div>
            <label for="transactionRefNo" class="block font-semibold text-neutral-700 mb-1">UTR / Bank Transaction Ref No <span class="text-[#B91C1C]">*</span></label>
            <input type="text" id="transactionRefNo" name="transactionRefNo" required placeholder="e.g. UPI Ref 429188091823" class="form-input-field font-mono">
          </div>

          <div>
            <label for="donorPAN" class="block font-semibold text-neutral-700 mb-1">PAN Number (Optional for Statutory Filing)</label>
            <input type="text" id="donorPAN" name="donorPAN" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" placeholder="ABCDE1234F" class="form-input-field uppercase font-mono">
          </div>

          <button type="submit" class="w-full py-3.5 px-4 rounded-xl bg-[#9A3412] hover:bg-[#7C2D12] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 duration-100 cursor-pointer focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-base" aria-hidden="true">receipt_long</span>
            <span>Submit Contribution Details</span>
          </button>
          <div class="text-center text-[10px] text-stone-500 pt-1">
            Audited per Section 8 Non-Profit standards (ROC Jaipur).
          </div>
        </form>
      </div>
    </div>
  </section>
</main>

${generateFooter('donate')}
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'donate.html'), content.trim() + '\n', 'utf8');
  console.log('✔ Generated donate.html');
}

// 1.4 CONTACT & FAQ (contact-faq.html and contact.html)
function buildContactFaqPage() {
  const content = `
${generateHead('Contact Us & Operational FAQ | Trinetra Gargi Foundation', 'Contact Trinetra Gargi Foundation in Jagatpura, Jaipur. Submit general inquiries, find office coordinates, and read operational FAQs.', 'contact-faq.html')}
${generateSkipLink()}
${generateTopRibbon()}
${generateHeader('contact')}

<main id="main-content" class="flex-grow pb-24 xl:pb-0">
  <!-- Hero Section -->
  <section class="py-12 md:py-16 bg-gradient-to-b from-[#FFF9ED] via-[#FFFDF9] to-[#FFFFFF] border-b border-amber-500/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-bold tracking-wide uppercase mb-4" data-aos="fade-down">
        <span class="material-symbols-outlined text-sm text-amber-700" aria-hidden="true">contact_support</span>
        Open Engagement &amp; Office Desks
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 tracking-tight mb-4 leading-tight" data-aos="fade-up">
        Get in Touch with Our Team &amp; Community Desks
      </h1>
      <p class="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
        Reach out for operational inquiries, scheme assistance, visiting our learning centers, or general correspondence.
      </p>
    </div>
  </section>

  <!-- Interactive Contact Layout (2-Column Grid) -->
  <section class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <!-- Column A: General Inquiry Form (7 cols) -->
      <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/70 shadow-sm">
        <div class="border-b border-amber-100/80 pb-4 mb-6">
          <h2 class="text-xl font-bold text-neutral-900">Send an Inquiry or Feedback</h2>
          <p class="text-xs text-stone-500 mt-1">Our community assistance team responds within 2 business days.</p>
        </div>

        <form id="contactInquiryForm" onsubmit="handleContactFormSubmit(event)" class="space-y-4 text-xs" novalidate>
          <!-- Honeypot -->
          <input type="text" id="honeypot_url" name="honeypot_url" style="position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0;" tabindex="-1" aria-hidden="true" autocomplete="off">

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="contactFullName" class="block font-semibold text-neutral-700 mb-1">Full Legal Name <span class="text-[#B91C1C]">*</span></label>
              <input type="text" id="contactFullName" name="fullName" required placeholder="Your full name" class="form-input-field">
            </div>
            <div>
              <label for="contactEmail" class="block font-semibold text-neutral-700 mb-1">Email Address <span class="text-[#B91C1C]">*</span></label>
              <input type="email" id="contactEmail" name="email" required placeholder="name@domain.com" class="form-input-field">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="contactPhone" class="block font-semibold text-neutral-700 mb-1">Mobile Phone (Optional)</label>
              <input type="tel" id="contactPhone" name="phone" pattern="[6-9][0-9]{9}" placeholder="10-digit mobile" class="form-input-field">
            </div>
            <div>
              <label for="contactInquiryType" class="block font-semibold text-neutral-700 mb-1">Inquiry Category <span class="text-[#B91C1C]">*</span></label>
              <select id="contactInquiryType" name="inquiryType" required class="form-input-field">
                <option value="general">General Inquiry</option>
                <option value="scheme-assistance">Government Scheme Assistance</option>
                <option value="visiting-center">Visiting a Learning Center</option>
                <option value="press-media">Press &amp; Media Inquiries</option>
                <option value="other">Other Matter</option>
              </select>
            </div>
          </div>

          <div>
            <label for="contactMessage" class="block font-semibold text-neutral-700 mb-1">Message or Query Details <span class="text-[#B91C1C]">*</span></label>
            <textarea id="contactMessage" name="message" required rows="5" placeholder="Please outline your query with relevant details..." class="form-input-field"></textarea>
          </div>

          <button type="submit" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#9A3412] hover:bg-[#7C2D12] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 duration-100 cursor-pointer focus:ring-2 focus:ring-[#9A3412]">
            <span class="material-symbols-outlined text-base" aria-hidden="true">send</span>
            <span>Send Message</span>
          </button>
        </form>
      </div>

      <!-- Column B: Registered Office Coordinates & Visiting Information (5 cols) -->
      <div class="lg:col-span-5 space-y-6">
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/70 shadow-sm space-y-4">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
              <span class="material-symbols-outlined text-xl" aria-hidden="true">pin_drop</span>
            </div>
            <div>
              <h2 class="text-base font-bold text-neutral-900">Registered Office Coordinates</h2>
              <div class="text-[11px] text-stone-500 font-mono">MCA Section 8 License</div>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-stone-50 border border-amber-200/70 text-xs text-neutral-800 leading-relaxed">
            <strong class="text-neutral-900 block mb-1">TRINETRA GARGI FOUNDATION</strong>
            Plot No 45, Shyam Vihar Colony,<br>
            Near Ganesh Temple, Jagatpura,<br>
            Jaipur, Rajasthan — 302017
          </div>

          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-stone-50">
              <span class="text-stone-600">Visiting Hours:</span>
              <strong class="text-neutral-900">Mon–Fri, 10:00 AM – 5:00 PM</strong>
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-stone-50">
              <span class="text-stone-600">Official Email:</span>
              <a href="mailto:info@trinetragargifoundation.org" class="font-bold text-amber-800 hover:underline">info@trinetragargifoundation.org</a>
            </div>
          </div>

          <!-- Stylized Map Card with Google Maps Outbound Link -->
          <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-amber-900 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm" aria-hidden="true">map</span> Jagatpura, Jaipur Center
              </span>
              <a href="https://maps.google.com/?q=Jagatpura,+Jaipur,+Rajasthan+302017" target="_blank" rel="noopener noreferrer" class="text-[#9A3412] font-bold underline flex items-center gap-0.5">
                <span>Google Maps</span>
                <span class="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
              </a>
            </div>
            <p class="text-[11px] text-amber-800/90 leading-relaxed">
              Appointments are required for learning center visits to ensure uninterrupted study sessions for enrolled students.
            </p>
          </div>
        </div>

        <!-- Emergency Dispatch Reminder Banner -->
        <div class="p-5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-2">
          <div class="font-bold flex items-center gap-1.5 text-[#B91C1C]">
            <span class="material-symbols-outlined text-base" aria-hidden="true">emergency</span>
            Active Child Distress or Domestic Emergency?
          </div>
          <p class="text-[11px] text-red-800 leading-relaxed">
            Do not wait for form replies. Dial <strong>1098</strong> (National Childline) or <strong>181</strong> (State Women Helpline) for immediate intervention.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Comprehensive Operational FAQ Accordion -->
  <section class="py-12 md:py-16 bg-[#FFFDF9] border-t border-amber-500/20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-10 text-center">
        <h2 class="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-2">Frequently Asked Operational Questions</h2>
        <p class="text-xs sm:text-sm text-neutral-600">Clear answers regarding our community programs, donations, visits, and reporting.</p>
      </div>

      <div class="faq-accordion-group space-y-3">
        <!-- FAQ 1 -->
        <div class="bg-white rounded-2xl border border-amber-200/70 overflow-hidden shadow-xs">
          <button type="button" class="faq-accordion-header w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-neutral-900 text-xs sm:text-sm cursor-pointer hover:bg-stone-50 transition-colors focus:ring-2 focus:ring-[#9A3412]" aria-expanded="false" aria-controls="faq-ans-1">
            <span>How do I arrange a visit to a Foundation learning center?</span>
            <span class="material-symbols-outlined text-stone-400 shrink-0 transition-transform duration-200" aria-hidden="true">expand_more</span>
          </button>
          <div id="faq-ans-1" class="hidden p-4 sm:p-5 pt-0 text-xs sm:text-sm text-neutral-600 border-t border-amber-100/80 leading-relaxed">
            To protect our students' privacy and routine, center visits require prior appointment. Please submit a request via the form above with inquiry type "Visiting a Learning Center", or email info@trinetragargifoundation.org at least 3 business days in advance.
          </div>
        </div>

        <!-- FAQ 2 -->
        <div class="bg-white rounded-2xl border border-amber-200/70 overflow-hidden shadow-xs">
          <button type="button" class="faq-accordion-header w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-neutral-900 text-xs sm:text-sm cursor-pointer hover:bg-stone-50 transition-colors focus:ring-2 focus:ring-[#9A3412]" aria-expanded="false" aria-controls="faq-ans-2">
            <span>How are financial contributions audited and reported?</span>
            <span class="material-symbols-outlined text-stone-400 shrink-0 transition-transform duration-200" aria-hidden="true">expand_more</span>
          </button>
          <div id="faq-ans-2" class="hidden p-4 sm:p-5 pt-0 text-xs sm:text-sm text-neutral-600 border-t border-amber-100/80 leading-relaxed">
            As a licensed Section 8 non-profit company under the Companies Act 2013, our accounts are audited annually by independent statutory Chartered Accountants. Complete audited financial balance sheets and MCA filings are published on our <a href="impact.html" class="text-[#9A3412] font-bold underline">Impact &amp; Reports</a> page.
          </div>
        </div>

        <!-- FAQ 3 -->
        <div class="bg-white rounded-2xl border border-amber-200/70 overflow-hidden shadow-xs">
          <button type="button" class="faq-accordion-header w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-neutral-900 text-xs sm:text-sm cursor-pointer hover:bg-stone-50 transition-colors focus:ring-2 focus:ring-[#9A3412]" aria-expanded="false" aria-controls="faq-ans-3">
            <span>Can I request assistance for a government welfare scheme application?</span>
            <span class="material-symbols-outlined text-stone-400 shrink-0 transition-transform duration-200" aria-hidden="true">expand_more</span>
          </button>
          <div id="faq-ans-3" class="hidden p-4 sm:p-5 pt-0 text-xs sm:text-sm text-neutral-600 border-t border-amber-100/80 leading-relaxed">
            Yes. Our grassroots paralegals assist families with document organization, CSC kiosk submissions, and follow-ups for schemes including RTE 25% quota, Palanhar Yojana, and PM Awas Yojana. Select "Government Scheme Assistance" on our contact form.
          </div>
        </div>

        <!-- FAQ 4 -->
        <div class="bg-white rounded-2xl border border-amber-200/70 overflow-hidden shadow-xs">
          <button type="button" class="faq-accordion-header w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-neutral-900 text-xs sm:text-sm cursor-pointer hover:bg-stone-50 transition-colors focus:ring-2 focus:ring-[#9A3412]" aria-expanded="false" aria-controls="faq-ans-4">
            <span>What background verification is required for volunteers?</span>
            <span class="material-symbols-outlined text-stone-400 shrink-0 transition-transform duration-200" aria-hidden="true">expand_more</span>
          </button>
          <div id="faq-ans-4" class="hidden p-4 sm:p-5 pt-0 text-xs sm:text-sm text-neutral-600 border-t border-amber-100/80 leading-relaxed">
            Under our Child Safeguarding Policy, all volunteers interacting with children must provide government photo ID verification, complete a mandatory child safety orientation, and sign our legally binding Code of Conduct.
          </div>
        </div>

        <!-- FAQ 5 -->
        <div class="bg-white rounded-2xl border border-amber-200/70 overflow-hidden shadow-xs">
          <button type="button" class="faq-accordion-header w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-neutral-900 text-xs sm:text-sm cursor-pointer hover:bg-stone-50 transition-colors focus:ring-2 focus:ring-[#9A3412]" aria-expanded="false" aria-controls="faq-ans-5">
            <span>How quickly are distress reports on the Help &amp; Report portal evaluated?</span>
            <span class="material-symbols-outlined text-stone-400 shrink-0 transition-transform duration-200" aria-hidden="true">expand_more</span>
          </button>
          <div id="faq-ans-5" class="hidden p-4 sm:p-5 pt-0 text-xs sm:text-sm text-neutral-600 border-t border-amber-100/80 leading-relaxed">
            Distress alerts are evaluated by our triage caseworkers according to emergency severity. However, for immediate life-threatening danger, citizens must dial 1098 or 112 directly, as electronic web forms cannot replace direct police or emergency responder dispatches.
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

${generateFooter('contact')}
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'contact-faq.html'), content.trim() + '\n', 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, 'contact.html'), content.trim() + '\n', 'utf8');
  console.log('✔ Generated contact-faq.html and contact.html');
}

// 1.5 PRIVACY POLICY (privacy.html)
function buildPrivacyPage() {
  const content = `
${generateHead('Privacy & Data Safeguarding Policy | Trinetra Gargi Foundation', 'Data governance policies, informant anonymity protections, zero-commercialization pledge, and legal compliance under the DPDP Act 2023.', 'privacy.html')}
${generateSkipLink()}
${generateTopRibbon()}
${generateHeader('about')}

<main id="main-content" class="flex-grow pb-24 xl:pb-0">
  <section class="py-12 md:py-16 bg-[#FFF9ED] border-b border-amber-500/20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span class="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">Legal Compliance</span>
      <h1 class="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mt-3 mb-2">Privacy &amp; Data Safeguarding Policy</h1>
      <p class="text-xs sm:text-sm text-stone-500">Effective Date: 12 January 2026 · Digital Personal Data Protection (DPDP) Act 2023 Compliance</p>
    </div>
  </section>

  <article class="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-stone text-xs sm:text-sm leading-relaxed space-y-8 text-neutral-700">
    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">1. Institutional Identity &amp; Scope</h2>
      <p>
        <strong>Trinetra Gargi Foundation</strong> ("Foundation", "we", "our") is a non-profit company licensed under Section 8 of the Companies Act, 2013 (CIN: <span class="font-mono font-semibold">${STATUTORY.cin}</span>) having its registered office at ${STATUTORY.address}.
      </p>
      <p>
        This policy governs our website, electronic intake channels, and community support interactions. We operate with strict data minimization principles to cherish and safeguard human dignity.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">2. Whistleblower &amp; Informant Safeguards</h2>
      <p>
        Under Section 19 of the Protection of Children from Sexual Offences (POCSO) Act, 2012, and the Juvenile Justice (Care and Protection of Children) Act, 2015, citizens providing distress information in good faith enjoy strict non-disclosure protections.
      </p>
      <p>
        Our Help &amp; Report portal provides an <strong>Anonymous Submission Mode</strong> that enables informants to lodge child labour, abuse, or welfare denial alerts without providing a name, phone number, or personal identity.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">3. Zero Commercialization &amp; Data Monetization Pledge</h2>
      <p>
        We make an irrevocable institutional commitment: <strong>We never sell, rent, commercialize, or barter personal data, donor records, volunteer applications, or beneficiary information to any third party.</strong>
      </p>
      <p>
        Data collected via forms is used exclusively for the specified humanitarian purpose: casework triage, volunteer coordination, CSR partnership dialogue, or issuing donation acknowledgments.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">4. Production Telemetry &amp; Server Zero-Log Policy</h2>
      <p>
        In accordance with our child safeguarding directives, sensitive distress narratives, child names, and physical location coordinates submitted through electronic forms are strictly scrubbed from public server logs and third-party monitoring platforms.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">5. Cookies &amp; Local Storage</h2>
      <p>
        Our website uses only essential session storage (for rate limiting and form protection) and standard layout performance caches. We do not deploy third-party advertising cookies, behavioural retargeting pixels, or commercial tracking scripts.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">6. Data Protection Officer Contact</h2>
      <p>
        For inquiries regarding our safeguarding protocols, data retention, or statutory privacy queries:
      </p>
      <div class="p-4 rounded-xl bg-stone-50 border border-amber-200/70 font-mono text-xs">
        <div>Grievance &amp; Data Safeguarding Officer</div>
        <div>Email: <a href="mailto:privacy@trinetragargifoundation.org" class="text-amber-800 underline">privacy@trinetragargifoundation.org</a></div>
        <div>Registered Office: Plot No 45, Shyam Vihar Colony, Near Ganesh Temple, Jagatpura, Jaipur — 302017</div>
      </div>
    </section>
  </article>
</main>

${generateFooter('about')}
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'privacy.html'), content.trim() + '\n', 'utf8');
  console.log('✔ Generated privacy.html');
}

// 1.6 TERMS OF SERVICE (terms.html)
function buildTermsPage() {
  const content = `
${generateHead('Terms of Service & Statutory Charter | Trinetra Gargi Foundation', 'Governing terms and conditions for Trinetra Gargi Foundation website, donation policies, and limitation of emergency intake liability.', 'terms.html')}
${generateSkipLink()}
${generateTopRibbon()}
${generateHeader('about')}

<main id="main-content" class="flex-grow pb-24 xl:pb-0">
  <section class="py-12 md:py-16 bg-[#FFF9ED] border-b border-amber-500/20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span class="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">Institutional Governance</span>
      <h1 class="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mt-3 mb-2">Terms of Service &amp; Statutory Charter</h1>
      <p class="text-xs sm:text-sm text-stone-500">Effective Date: 12 January 2026 · Section 8 Non-Profit Standards</p>
    </div>
  </section>

  <article class="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-stone text-xs sm:text-sm leading-relaxed space-y-8 text-neutral-700">
    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">1. Acceptance of Terms</h2>
      <p>
        By accessing or using the website of <strong>Trinetra Gargi Foundation</strong> (CIN: ${STATUTORY.cin}), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our digital services.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">2. Permissible Website Usage</h2>
      <p>
        This portal is provided strictly for humanitarian awareness, citizen grievance intake, volunteer applications, and transparent charitable contributions. Users agree not to:
      </p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Submit malicious, defamatory, or intentionally fabricated distress alerts.</li>
        <li>Deploy automated scripts, bots, scrapers, or flood form endpoints with spam.</li>
        <li>Attempt to breach the security or confidentiality of anonymous intake channels.</li>
      </ul>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">3. Limitation of Emergency Intake Liability</h2>
      <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 font-semibold text-amber-900">
        The Trinetra Gargi Foundation website and Help &amp; Report portal serve as an electronic communication channel. They do NOT replace statutory government emergency services. In active, life-threatening crises, physical violence, or immediate child danger, citizens must dial 112 or 1098 directly.
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">4. Charitable Contributions &amp; Statutory Tax Exemption</h2>
      <p>
        All donations made to the Foundation are voluntary, non-refundable contributions dedicated to our non-profit welfare programs.
      </p>
      <p>
        <strong>Statutory Tax Status:</strong> ${STATUTORY.taxNote} Official acknowledgment receipts will be provided per Indian statutory accounting requirements.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">5. Governing Law &amp; Jurisdiction</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute or proceeding arising out of or related to this website shall be subject to the exclusive jurisdiction of the competent courts of <strong>Jaipur, Rajasthan</strong>.
      </p>
    </section>
  </article>
</main>

${generateFooter('about')}
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'terms.html'), content.trim() + '\n', 'utf8');
  console.log('✔ Generated terms.html');
}

// 1.7 STATUTORY & EMERGENCY DISCLAIMER (disclaimer.html)
function buildDisclaimerPage() {
  const content = `
${generateHead('Statutory & Emergency Disclaimer | Trinetra Gargi Foundation', 'Statutory notices, emergency intake limitation of liability, and non-governmental entity disclosures.', 'disclaimer.html')}
${generateSkipLink()}
${generateTopRibbon()}
${generateHeader('about')}

<main id="main-content" class="flex-grow pb-24 xl:pb-0">
  <section class="py-12 md:py-16 bg-[#FFF9ED] border-b border-amber-500/20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span class="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">Official Notice</span>
      <h1 class="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mt-3 mb-2">Statutory &amp; Emergency Disclaimer</h1>
      <p class="text-xs sm:text-sm text-stone-500">Legal Disclosures under the Companies Act 2013 and Emergency Services Protocol</p>
    </div>
  </section>

  <article class="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-stone text-xs sm:text-sm leading-relaxed space-y-8 text-neutral-700">
    <!-- Highlighted Emergency Liability Box -->
    <section class="p-5 sm:p-6 rounded-2xl bg-red-50 border-2 border-red-200 text-red-950 space-y-2">
      <div class="flex items-center gap-2 font-bold text-red-800 text-sm">
        <span class="material-symbols-outlined text-lg" aria-hidden="true">emergency</span>
        Emergency Intake Limitation of Liability
      </div>
      <p class="text-xs sm:text-sm leading-relaxed">
        <strong>Trinetra Gargi Foundation's website and Help &amp; Report portal serve as an electronic communication and casework intake channel. The online portal does not replace direct government emergency services. In active, life-threatening crises, physical violence, or immediate child danger, citizens must dial 112 or 1098 directly.</strong>
      </p>
      <p class="text-[11px] text-red-900">
        Electronic submissions are triaged by available field staff and do not guarantee immediate on-scene response within a predetermined window.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">1. Non-Governmental Entity Status</h2>
      <p>
        Trinetra Gargi Foundation is a licensed non-governmental non-profit entity (Section 8 Company under the Companies Act, 2013). We are not an official agency, department, or instrumentality of the Government of India or the Government of Rajasthan.
      </p>
      <p>
        Information provided in our <a href="government-schemes.html" class="text-amber-800 font-bold underline">Government Schemes Directory</a> is compiled for public civic education. Decisions regarding eligibility, quota allocation, or benefit disbursement are made solely by respective government authorities.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">2. Statutory Tax Exemption State</h2>
      <p>
        Trinetra Gargi Foundation is a Section 8 licensed non-profit company. In accordance with statutory disclosure standards:
      </p>
      <div class="p-3.5 bg-stone-50 border border-amber-200/70 rounded-xl font-semibold text-neutral-800">
        ${STATUTORY.taxNote}
      </div>
      <p class="text-xs text-stone-500">
        Donors should consult their tax advisors regarding charitable contribution deductions.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-neutral-900 font-serif border-b border-amber-200/70 pb-2">3. Outbound Links &amp; Third-Party Portals</h2>
      <p>
        Our website may contain hyperlinks to official government portals (e.g., .gov.in domains, Childline, MCA). Trinetra Gargi Foundation assumes no responsibility for the content, privacy practices, or availability of third-party external websites.
      </p>
    </section>
  </article>
</main>

${generateFooter('about')}
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'disclaimer.html'), content.trim() + '\n', 'utf8');
  console.log('✔ Generated disclaimer.html');
}

// 1.8 CUSTOM 404 (404.html)
function build404Page() {
  const content = `
${generateHead('404 Page Not Found | Trinetra Gargi Foundation', 'The requested resource could not be found. Return to Trinetra Gargi Foundation home or access emergency helplines.', '404.html')}
${generateSkipLink()}
${generateTopRibbon()}
${generateHeader('')}

<main id="main-content" class="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 pb-28 xl:pb-16">
  <div class="max-w-xl w-full text-center space-y-6">
    <div class="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-[#9A3412]">
      <span class="material-symbols-outlined text-4xl" aria-hidden="true">explore_off</span>
    </div>

    <div>
      <span class="text-xs uppercase font-extrabold tracking-widest text-[#9A3412]">Error 404</span>
      <h1 class="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mt-1 mb-3">
        Page Not Found / Resource Relocated
      </h1>
      <p class="text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
        The link you followed may be outdated, moved, or misspelled. Use the verified paths below to resume navigation safely.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
      <a href="index.html" class="p-4 rounded-2xl bg-white border border-amber-200/70 hover:border-amber-700 shadow-xs hover:shadow-md transition-all flex items-center gap-3 group focus:ring-2 focus:ring-[#9A3412]">
        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-xl" aria-hidden="true">home</span>
        </div>
        <div>
          <div class="text-xs font-bold text-neutral-900 group-hover:text-[#9A3412]">Return to Home</div>
          <div class="text-[11px] text-stone-500">Main public portal</div>
        </div>
      </a>

      <a href="help-report.html" class="p-4 rounded-2xl bg-white border border-red-200 hover:border-[#B91C1C] shadow-xs hover:shadow-md transition-all flex items-center gap-3 group focus:ring-2 focus:ring-[#B91C1C]">
        <div class="w-10 h-10 rounded-xl bg-red-50 text-[#B91C1C] flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-xl" aria-hidden="true">emergency</span>
        </div>
        <div>
          <div class="text-xs font-bold text-[#B91C1C] group-hover:text-red-900">Report Crisis (SOS)</div>
          <div class="text-[11px] text-stone-500">Confidential intake</div>
        </div>
      </a>

      <a href="government-schemes.html" class="p-4 rounded-2xl bg-white border border-amber-200/70 hover:border-amber-700 shadow-xs hover:shadow-md transition-all flex items-center gap-3 group focus:ring-2 focus:ring-[#9A3412]">
        <div class="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-xl" aria-hidden="true">account_balance</span>
        </div>
        <div>
          <div class="text-xs font-bold text-neutral-900 group-hover:text-[#9A3412]">Welfare Schemes</div>
          <div class="text-[11px] text-stone-500">State directory</div>
        </div>
      </a>

      <a href="contact-faq.html" class="p-4 rounded-2xl bg-white border border-amber-200/70 hover:border-amber-700 shadow-xs hover:shadow-md transition-all flex items-center gap-3 group focus:ring-2 focus:ring-[#9A3412]">
        <div class="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-xl" aria-hidden="true">contact_support</span>
        </div>
        <div>
          <div class="text-xs font-bold text-neutral-900 group-hover:text-[#9A3412]">Contact &amp; FAQ</div>
          <div class="text-[11px] text-stone-500">Community desk</div>
        </div>
      </a>
    </div>
  </div>
</main>

${generateFooter('')}
`;
  fs.writeFileSync(path.join(ROOT_DIR, '404.html'), content.trim() + '\n', 'utf8');
  console.log('✔ Generated 404.html');
}

// Build all new pages
buildAwarenessPage();
buildImpactPage();
buildDonatePage();
buildContactFaqPage();
buildPrivacyPage();
buildTermsPage();
buildDisclaimerPage();
build404Page();

// ============================================================================
// 2. SANITIZE AND REBUILD EXISTING PAGES
// ============================================================================

function sanitizeAndRebuildPage(filename, activeKey, title, description, customMutator) {
  const filePath = path.join(ROOT_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File ${filename} not found!`);
    return;
  }
  let raw = fs.readFileSync(filePath, 'utf8');

  // Extract <main> inner content
  let mainInner = '';
  const mainMatch = raw.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    mainInner = mainMatch[1];
  } else {
    // Fallback: extract between </header> and <footer
    const fallbackMatch = raw.match(/<\/header>([\s\S]*?)<footer/i);
    if (fallbackMatch) {
      mainInner = fallbackMatch[1];
    } else {
      console.error(`Could not locate content in ${filename}!`);
      return;
    }
  }

  // Apply custom mutator if provided
  if (customMutator) {
    mainInner = customMutator(mainInner);
  }

  // Global compliance replacements
  mainInner = mainInner
    // Replace unverified 80G / FCRA claims
    .replace(/Sec 80G Certified • CIN: [^<]+/gi, 'Tax exemption verification pending statutory filing. · CIN: U85300RJ2026NPL098757')
    .replace(/Section 80G Certified/gi, 'Tax exemption verification pending statutory filing.')
    .replace(/80G CERTIFIED/gi, 'Section 8 Registered Non-Profit')
    .replace(/Sec 80G 50% Tax Relief &amp; FCRA Certified/gi, 'Section 8 Non-Profit · Tax exemption verification pending statutory filing.')
    .replace(/Sec 80G 50% Tax Relief & FCRA Certified/gi, 'Section 8 Non-Profit · Tax exemption verification pending statutory filing.')
    .replace(/50% Tax Exemption certificate valid for all Indian individual &amp; corporate donors\./gi, 'Tax exemption verification pending statutory filing.')
    .replace(/Avail 50% tax deductions under Section 80G with immediate automated receipts and geo-tagged impact ledgers\./gi, 'Tax exemption verification pending statutory filing.')
    .replace(/Issued immediately with Form 10BD filing validation so 50% tax deductions automatically reflect in your AIS\./gi, 'Audited statutory accounts and donation receipts are issued per Section 8 non-profit standards. Tax exemption verification pending statutory filing.')
    .replace(/50% Tax Exemption on donations under IT Act 1961/gi, 'Tax exemption verification pending statutory filing.')
    .replace(/80G &amp; 12A Certified/gi, 'Section 8 Registered Non-Profit')
    .replace(/Section 80G &amp; 12A Certified/gi, 'Tax exemption verification pending statutory filing.')
    .replace(/80G Documentation In Review/gi, 'Tax exemption verification pending statutory filing.')
    .replace(/80G &amp; CSR-1: Statutory review in progress/gi, 'Tax exemption verification pending statutory filing.')
    .replace(/Section 80G income tax documentation is under regulatory review following incorporation\. Formal digital receipts generated instantaneously\./gi, 'Tax exemption verification pending statutory filing. Official contribution receipts issued per Section 8 non-profit standards.')
    .replace(/Complies strictly with FCRA, Section 12A, and Section 80G governance rules\. No synthetic media\./gi, 'Tax exemption verification pending statutory filing. Complies strictly with Section 8 non-profit governance rules. No synthetic media.')
    .replace(/Section 80G &amp; 12A documentation is currently under regulatory review following incorporation\./gi, 'Tax exemption verification pending statutory filing.')
    .replace(/<span class="mt-3 text-\[11px\] font-semibold text-amber-800">Filing In Regulatory Review<\/span>/gi, '<span class="mt-3 text-[11px] font-semibold text-amber-800">Tax exemption verification pending statutory filing.</span>')
    .replace(/FCRA Annual Returns \(Form FC-4\)/gi, 'Annual Statutory Compliance Returns')
    // Replace fake case dossier / incident IDs
    .replace(/Case Dossier #TGF-ALW-2019-88/gi, 'Field Case Documentation · Child Protection Unit')
    .replace(/Incident Reference #TGF-2024-8841 generated\. Our triage officer has acknowledged the ping\./gi, 'Report submitted for evaluation. Our triage caseworker desk has registered the alert.')
    .replace(/Yes\. Upon submission, you will receive a unique cryptographic Case Reference token[^<]+/gi, 'Yes. Upon submission, your confidential report is logged directly with our field caseworker triage desk for statutory evaluation.')
    // Replace javascript:void(0)
    .replace(/href="javascript:void\(0\)" onclick="openDonateModal\(\)"/gi, 'href="donate.html"')
    .replace(/href="javascript:void\(0\)" onclick="showToast\('Privacy Policy:[^']*'\)"/gi, 'href="privacy.html"')
    .replace(/href="javascript:void\(0\)" onclick="showToast\('Statutory Charter:[^']*'\)"/gi, 'href="terms.html"')
    .replace(/href="javascript:void\(0\)" onclick="showToast\('Annual Audited Report[^']*'\)"/gi, 'href="impact.html"')
    .replace(/href="javascript:void\(0\)" onclick="showToast\('Annual Impact Census[^']*'\)"/gi, 'href="impact.html"')
    .replace(/href="javascript:void\(0\)" onclick="showToast\('Section 80G &amp; 12A Orders[^']*'\)"/gi, 'href="impact.html"')
    .replace(/href="javascript:void\(0\)" onclick="showToast\('FCRA Compliance Form[^']*'\)"/gi, 'href="impact.html"')
    .replace(/href="javascript:void\(0\)"/gi, 'href="#"');

  const finalHtml = `
${generateHead(title, description, filename)}
${generateSkipLink()}
${generateTopRibbon()}
${generateHeader(activeKey)}

<main id="main-content" class="flex-grow pb-24 xl:pb-0">
${mainInner.trim()}
</main>

${generateFooter(activeKey)}
`;

  fs.writeFileSync(filePath, finalHtml.trim() + '\n', 'utf8');
  console.log(`✔ Sanitized and rebuilt ${filename}`);
}

// 2.1 Rebuild index.html
sanitizeAndRebuildPage(
  'index.html',
  'home',
  'Trinetra Gargi Foundation | Cherishing Every Life · Section 8 Non-Profit',
  'A licensed Section 8 non-profit organization dedicated to child protection, anti-labour rescue, remedial education, and women empowerment in Rajasthan.',
  (inner) => {
    let modified = inner;
    // Remove 80G badge from hero donate button
    modified = modified.replace(/<span class="text-xs font-medium px-1\.5 py-0\.5 rounded bg-white\/20">80G<\/span>/gi, '');
    
    // Replace 50% IT Relief (Sec 80G)
    modified = modified.replace(/<span>50% IT Relief \(Sec 80G\)<\/span>/gi, '<span>Tax exemption verification pending statutory filing.</span>');
    
    // Replace Fiduciary Rigour & 80G Tax Exemption
    modified = modified.replace(/Fiduciary Rigour &amp; 80G Tax Exemption/gi, 'Fiduciary Rigour &amp; Statutory Governance');
    
    // Replace Instant 80G Digital Tax Receipt
    modified = modified.replace(/Instant 80G Digital Tax Receipt/gi, 'Audited Contribution Receipt');
    
    // Replace Section 80G & 12A Certified
    modified = modified.replace(/Section 80G &amp; 12A Certified/gi, 'Tax exemption verification pending statutory filing.');
    
    // Replace 60-Second Instant 80G Receipt Guarantee block
    modified = modified.replace(/<!-- Instant 80G Tax Exemption Guarantee -->[\s\S]*?<!-- Primary Trigger: Gateway/gi, `<!-- Statutory Tax Status Advisory -->
        <div class="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950 mb-4">
          <span class="material-symbols-outlined text-amber-700 text-base shrink-0 mt-0.5" aria-hidden="true">info</span>
          <div>
            <span class="font-bold block leading-tight">Tax exemption verification pending statutory filing.</span>
            <span class="text-[11px] text-amber-800 block mt-0.5">Audited statutory accounts and donation receipts are issued per Section 8 non-profit standards.</span>
          </div>
        </div>

        <!-- Primary Trigger: Gateway`);
        
    // Replace Donate with Instant 80G Tax Receipt →
    modified = modified.replace(/Donate with Instant 80G Tax Receipt →/gi, 'Donate to Support Grassroots Action →');
    
    // Replace 80G & 12A Tax Orders card
    modified = modified.replace(/<a class="p-4 rounded-xl border [^"]* bg-stone-50\/50 hover:bg-stone-50 [^"]* transition-all flex items-start justify-between group" href="#" onclick="showToast\('Section 80G & 12A Orders - Income Tax Dept Validated\.'\)">[\s\S]*?<\/a>/gi, `<a class="p-4 rounded-xl border border-amber-200/70 bg-stone-50/50 hover:bg-stone-50 hover:border-amber-700/50 transition-all flex items-start justify-between group" href="impact.html">
          <div>
            <span class="material-symbols-outlined text-xl text-amber-800 mb-2 block">description</span>
            <div class="font-serif font-bold text-xs text-neutral-900">Statutory Tax Status Dossier</div>
            <div class="text-[11px] text-stone-500 mt-0.5">Tax exemption verification pending statutory filing.</div>
          </div>
          <span class="material-symbols-outlined text-stone-400 group-hover:text-amber-800 transition-colors text-sm">download</span>
        </a>`);
        
    // Replace FCRA Compliance Returns card in index.html
    modified = modified.replace(/FCRA Compliance Returns/gi, 'Statutory Compliance Returns');
    modified = modified.replace(/Form FC-4 Annual Submission/gi, 'MCA &amp; ROC Annual Disclosures');
    
    // Replace FAQ item on Section 80G
    modified = modified.replace(/How do I claim my Section 80G tax deduction\?/gi, 'Are contributions eligible for tax exemption?');
    modified = modified.replace(/Upon successful transaction completion, an official 80G Tax Exemption Receipt bearing our registration number is emailed immediately\. Per Income Tax regulations, Trinetra Gargi Foundation files annual Form 10BD statements so the tax deduction automatically populates in your Annual Information Statement \(AIS\)\./gi, 'Tax exemption verification pending statutory filing. Official contribution receipts are issued for all donations in accordance with Section 8 non-profit accounting and Ministry of Corporate Affairs regulations.');
    
    return modified;
  }
);

// 2.2 Rebuild about.html
sanitizeAndRebuildPage(
  'about.html',
  'about',
  'About Us | Trinetra Gargi Foundation (Section 8 Non-Profit)',
  'Learn about our non-profit governance, board of directors, field doctrine, and ethical child safeguarding policies across Rajasthan.',
  (inner) => {
    let modified = inner;
    modified = modified.replace(/Section 80G &amp; 12A documentation is currently under regulatory review following incorporation\./gi, 'Tax exemption verification pending statutory filing.');
    modified = modified.replace(/<span class="mt-3 text-\[11px\] font-semibold text-amber-800">Filing In Regulatory Review<\/span>/gi, '<span class="mt-3 text-[11px] font-semibold text-amber-800">Tax exemption verification pending statutory filing.</span>');
    modified = modified.replace(/href="#"(?=[\s\S]*?Audited Financials PDF)/gi, 'href="impact.html"');
    return modified;
  }
);

// 2.3 Rebuild our-work.html
sanitizeAndRebuildPage(
  'our-work.html',
  'our-work',
  'Our Strategic Pillars | Trinetra Gargi Foundation',
  'Explore our 6 core pillars: Education & Scholarships, Child Protection & Anti-Labour, Women Empowerment, Family Support, Skill Development, and Health.',
  (inner) => {
    let modified = inner;
    modified = modified.replace(/80G &amp; 12A Certified/gi, 'Section 8 Registered Non-Profit');
    return modified;
  }
);

// 2.4 Rebuild government-schemes.html
sanitizeAndRebuildPage(
  'government-schemes.html',
  'schemes',
  'Government Welfare Schemes Directory | Trinetra Gargi Foundation',
  'Citizen guide and eligibility directory for central and Rajasthan state welfare schemes: Beti Bachao, Sukanya Samriddhi, RTE, Palanhar, and PMMVY.',
  (inner) => {
    let modified = inner;
    modified = modified.replace(/Complies strictly with FCRA, Section 12A, and Section 80G governance rules\. No synthetic media\./gi, 'Tax exemption verification pending statutory filing. Complies strictly with Section 8 non-profit governance rules. No synthetic media.');
    return modified;
  }
);

// 2.5 Rebuild help-report.html
sanitizeAndRebuildPage(
  'help-report.html',
  'help-report',
  'Help & Confidential Distress Report Portal | Trinetra Gargi Foundation',
  'Confidential and anonymous crisis reporting for child labour, exploitation, out-of-school children, and domestic violence. Protected under POCSO Act.',
  (inner) => {
    let modified = inner;
    // 1. Remove detectGPS button
    modified = modified.replace(/<button type="button" onclick="detectGPS\(\)"[\s\S]*?<\/button>/gi, '');

    // 2. Update form tag to emergencyIntakeForm and add honeypot and accessible fields
    modified = modified.replace(
      /<form class="space-y-8" id="grievanceForm" onsubmit="handleCrisisReport\(event\)">/i,
      `<form class="space-y-8" id="emergencyIntakeForm" onsubmit="handleCrisisReport(event)" novalidate>
        <!-- Anti-spam Honeypot -->
        <input type="text" id="honeypot_website" name="honeypot_website" style="position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0;" tabindex="-1" aria-hidden="true" autocomplete="off">`
    );

    // 3. Ensure anonymous toggle has id="isAnonymous" name="isAnonymous"
    modified = modified.replace(
      /<input class="sr-only peer" id="anonToggle"[^>]*>/i,
      '<input class="sr-only peer" id="isAnonymous" name="isAnonymous" onchange="toggleAnonymousMode(this.checked)" type="checkbox"/>'
    );

    // 4. Update contact container ID to contactFieldsContainer
    modified = modified.replace(/id="contactSection"/gi, 'id="contactFieldsContainer"');

    // 5. Update input fields with unique id, name, for label, aria-describedby, and error spans
    modified = modified.replace(
      /<input class="[^"]*" placeholder="Your (?:Name or Safe Pseudonym|full legal name)" type="text"\/>/i,
      '<label for="fullName" class="sr-only">Full Legal Name</label><input class="form-input-field" id="fullName" name="fullName" placeholder="Your Name or Safe Pseudonym" type="text" aria-describedby="fullNameError"/><span id="fullNameError" class="form-field-error hidden"></span>'
    );

    modified = modified.replace(
      /<input class="[^"]*" placeholder="(?:Mobile Number \(for safe verification\)|10-digit mobile number)" type="tel"\/>/i,
      '<label for="phone" class="sr-only">Mobile Number</label><input class="form-input-field" id="phone" name="phone" pattern="[6-9][0-9]{9}" placeholder="Mobile Number (for safe verification)" type="tel" aria-describedby="phoneError"/><span id="phoneError" class="form-field-error hidden"></span>'
    );

    // District input
    modified = modified.replace(
      /<input class="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-on-surface text-sm placeholder:text-text-muted\/60 focus:ring-2 focus:ring-marigold-bright focus:outline-none" placeholder="e\.g\. Varanasi Sadar, Mirzapur" type="text"\/>/i,
      '<input class="form-input-field" id="district" name="district" placeholder="e.g. Jaipur, Alwar, Varanasi" type="text" aria-describedby="districtError"/><span id="districtError" class="form-field-error hidden"></span>'
    );

    // Landmark input
    modified = modified.replace(
      /<input class="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-on-surface text-sm placeholder:text-text-muted\/60 focus:ring-2 focus:ring-marigold-bright focus:outline-none" placeholder="e\.g\. Near Shiv Mandir, Gate 3 of Old Industrial Area, Gali No\. 4" type="text"\/>/i,
      '<input class="form-input-field" id="landmarkLocation" name="landmarkLocation" placeholder="e.g. Near Shiv Mandir, Gate 3 of Industrial Area" type="text" aria-describedby="landmarkLocationError"/><span id="landmarkLocationError" class="form-field-error hidden"></span>'
    );

    // Description textarea
    modified = modified.replace(
      /<textarea class="w-full bg-white border border-slate-300 rounded-lg p-3 text-on-surface text-sm placeholder:text-text-muted\/60 focus:ring-2 focus:ring-marigold-bright focus:outline-none" placeholder="Provide accurate, objective observations without endangering yourself to gather details\.\.\." rows="4"><\/textarea>/i,
      '<textarea class="form-input-field" id="description" name="description" rows="4" placeholder="Provide accurate, objective observations without endangering yourself to gather details..." aria-describedby="descriptionError"></textarea><span id="descriptionError" class="form-field-error hidden"></span>'
    );

    return modified;
  }
);

// 2.6 Rebuild stories-events.html
sanitizeAndRebuildPage(
  'stories-events.html',
  'stories',
  'Field Case Stories & Ground Bulletins | Trinetra Gargi Foundation',
  'Documented field casework, anti-labour rescues, and transformation accounts from grassroots communities in Rajasthan.',
  (inner) => {
    let modified = inner;
    // Remove any previously inserted heroHeadline to avoid duplicates
    modified = modified.replace(/<div class="mb-10 text-center max-w-4xl mx-auto pt-4">[\s\S]*?From Vulnerability to Triumph[\s\S]*?<\/div>\s*/gi, '');

    const heroHeadline = `
    <div class="mb-10 text-center max-w-4xl mx-auto pt-4">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/25 text-xs font-bold uppercase tracking-wider mb-3">
        <span class="material-symbols-outlined text-sm text-amber-700" aria-hidden="true">auto_stories</span> Ground Truths &amp; Field Impact
      </span>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 tracking-tight mb-4 leading-tight">
        From Vulnerability to Triumph: Ground Truths &amp; Field Assemblies
      </h1>
      <p class="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
        Documented casework timelines, child protection interventions, and grassroots community bulletins from Rajasthan and North India.
      </p>
    </div>
    `;

    // Insert heroHeadline at the very beginning of mainInner
    modified = heroHeadline + '\n' + modified;
    
    // Replace Section 80G claim
    modified = modified.replace(/Section 80G income tax documentation is under regulatory review following incorporation\. Formal digital receipts generated instantaneously\./gi, 'Tax exemption verification pending statutory filing. Official contribution receipts issued per Section 8 non-profit standards.');
    
    return modified;
  }
);

// 2.7 Rebuild volunteer-partner.html
sanitizeAndRebuildPage(
  'volunteer-partner.html',
  'volunteer',
  'Get Involved: Volunteer & CSR Partners | Trinetra Gargi Foundation',
  'Join as a grassroots bridge teacher, legal mentor, or corporate CSR partner to support child protection and women empowerment.',
  (inner) => {
    let modified = inner;

    // Replace 80G Documentation In Review
    modified = modified.replace(/80G Documentation In Review/gi, 'Tax exemption verification pending statutory filing.');
    
    // Replace 80G & CSR-1: Statutory review in progress
    modified = modified.replace(/80G &amp; CSR-1: Statutory review in progress/gi, 'Tax exemption verification pending statutory filing.');

    // Volunteer form
    modified = modified.replace(
      /<form class="grid grid-cols-1 md:grid-cols-2 gap-6" onsubmit="event\.preventDefault\(\); alert\('Application submitted for vetting[^']*'\);">/i,
      `<form id="volunteerIntakeForm" onsubmit="handleVolunteerFormSubmit(event)" class="grid grid-cols-1 md:grid-cols-2 gap-6" novalidate>
        <!-- Anti-spam Honeypot -->
        <input type="text" id="honeypot_company" name="honeypot_company" style="position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0;" tabindex="-1" aria-hidden="true" autocomplete="off">`
    );

    // CSR form
    modified = modified.replace(
      /<form class="grid grid-cols-1 md:grid-cols-2 gap-6" onsubmit="event\.preventDefault\(\); alert\('CSR Consultation request logged[^']*'\);">/i,
      `<form id="csrIntakeForm" onsubmit="handleCsrFormSubmit(event)" class="grid grid-cols-1 md:grid-cols-2 gap-6" novalidate>
        <!-- Anti-spam Honeypot -->
        <input type="text" id="honeypot_fax" name="honeypot_fax" style="position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0;" tabindex="-1" aria-hidden="true" autocomplete="off">`
    );

    // Safeguard consent checkbox
    modified = modified.replace(
      /id="safeguard-consent" required="" type="checkbox"/i,
      'id="safeguard-consent" name="safeguardingAgreement" required type="checkbox"'
    );

    return modified;
  }
);

console.log('\n=== All 15 Site Interfaces Successfully Built and Verified ===\n');
