const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Trinetra ORG';
const STITCH_DIR = path.join(ROOT_DIR, 'stitch_ngo_foundation_website_design');

// Generate navigation bar HTML with active page indicator
function generateNavBar(activeKey) {
  const navItems = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'about', label: 'About Us', href: 'about.html' },
    { key: 'our-work', label: 'Our Work', href: 'our-work.html', hasDropdown: true },
    { key: 'schemes', label: 'Govt Schemes', href: 'government-schemes.html' },
    { key: 'stories', label: 'Stories', href: 'stories-events.html' },
    { key: 'volunteer', label: 'Volunteer', href: 'volunteer-partner.html' }
  ];

  let linksHtml = '';
  navItems.forEach(item => {
    const isActive = (item.key === activeKey);
    const activeClass = isActive 
      ? 'bg-white text-neutral-900 font-semibold shadow-xs border border-stone-200/80 active-nav-link' 
      : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60 transition-all';

    if (item.hasDropdown) {
      linksHtml += `
      <div class="relative group">
        <a href="our-work.html" class="nav-link-item flex items-center gap-1 px-3.5 py-1.5 rounded-full ${activeClass}">
          <span>Our Work</span>
          <span class="material-symbols-outlined text-[14px] text-neutral-400 group-hover:text-neutral-900 group-hover:rotate-180 transition-all duration-200">expand_more</span>
        </a>
        <div class="nav-dropdown-menu absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-2xl shadow-xl p-2 z-50">
          <div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-b border-stone-100 mb-1">
            6 Strategic Impact Pillars
          </div>
          <a class="flex items-start gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-primary hover:bg-amber-50/60 transition-colors group/item" href="our-work.html#pillar-education">
            <span class="material-symbols-outlined text-base text-amber-600 group-hover/item:scale-110 transition-transform mt-0.5">school</span>
            <div>
              <div class="text-xs font-bold leading-snug">Education &amp; Scholarships</div>
              <div class="text-[11px] text-neutral-500 font-normal">Bridge schools &amp; foundational literacy</div>
            </div>
          </a>
          <a class="flex items-start gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-primary hover:bg-amber-50/60 transition-colors group/item" href="our-work.html#pillar-protection">
            <span class="material-symbols-outlined text-base text-red-600 group-hover/item:scale-110 transition-transform mt-0.5">gavel</span>
            <div>
              <div class="text-xs font-bold leading-snug">Child Protection &amp; Anti-Labour</div>
              <div class="text-[11px] text-neutral-500 font-normal">Rescue raids, trauma care &amp; POCSO legal</div>
            </div>
          </a>
          <a class="flex items-start gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-primary hover:bg-amber-50/60 transition-colors group/item" href="our-work.html#pillar-women">
            <span class="material-symbols-outlined text-base text-emerald-600 group-hover/item:scale-110 transition-transform mt-0.5">diversity_1</span>
            <div>
              <div class="text-xs font-bold leading-snug">Women Empowerment</div>
              <div class="text-[11px] text-neutral-500 font-normal">Self-Help Groups &amp; micro-enterprises</div>
            </div>
          </a>
          <a class="flex items-start gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-primary hover:bg-amber-50/60 transition-colors group/item" href="our-work.html#pillar-family">
            <span class="material-symbols-outlined text-base text-sky-600 group-hover/item:scale-110 transition-transform mt-0.5">kitchen</span>
            <div>
              <div class="text-xs font-bold leading-snug">Family Support &amp; Rehab</div>
              <div class="text-[11px] text-neutral-500 font-normal">Emergency grain rations &amp; livelihood safety</div>
            </div>
          </a>
          <a class="flex items-start gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-primary hover:bg-amber-50/60 transition-colors group/item" href="our-work.html#pillar-skills">
            <span class="material-symbols-outlined text-base text-indigo-600 group-hover/item:scale-110 transition-transform mt-0.5">terminal</span>
            <div>
              <div class="text-xs font-bold leading-snug">Skill Development</div>
              <div class="text-[11px] text-neutral-500 font-normal">Vocational computer labs &amp; apprentice links</div>
            </div>
          </a>
          <a class="flex items-start gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-primary hover:bg-amber-50/60 transition-colors group/item" href="our-work.html#pillar-health">
            <span class="material-symbols-outlined text-base text-teal-600 group-hover/item:scale-110 transition-transform mt-0.5">medical_services</span>
            <div>
              <div class="text-xs font-bold leading-snug">Health &amp; Digital Safety</div>
              <div class="text-[11px] text-neutral-500 font-normal">Mobile clinics &amp; cyber hygiene education</div>
            </div>
          </a>
        </div>
      </div>`;
    } else {
      linksHtml += `
      <a class="nav-link-item px-3.5 py-1.5 rounded-full ${activeClass}" href="${item.href}">
        <span>${item.label}</span>
      </a>`;
    }
  });

  return linksHtml;
}

// Generate unified header HTML with Tippy.js micro-tooltips & dynamic interactions
function generateUnifiedHeader(activeKey) {
  const isEmergencyActive = (activeKey === 'help-report');
  const emergencyClass = isEmergencyActive
    ? 'bg-red-600 text-white ring-2 ring-red-600/50'
    : 'bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200';

  return `
<!-- TOP EMERGENCY & TRUST RIBBON -->
<div id="topTrustRibbon" class="bg-neutral-900 text-neutral-300 py-1.5 px-3 sm:px-6 lg:px-8 border-b border-neutral-800 text-[10px] sm:text-[11px] font-medium tracking-wide z-50 relative">
  <div class="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
    <!-- Left: Rapid Status & Direct Helplines -->
    <div class="flex items-center gap-2 sm:gap-4 flex-wrap">
      <span class="inline-flex items-center gap-1.5 text-emerald-400 font-semibold cursor-default" data-tippy-content="Emergency field triage & compassionate social caseworkers operating 24/7 across Rajasthan and NCR">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span class="hidden sm:inline">Cherishing Every Life · 24/7 Response Active</span>
        <span class="sm:hidden">24/7 Active</span>
      </span>
      <span class="text-neutral-700 hidden sm:inline">|</span>
      <a href="tel:1098" class="inline-flex items-center gap-1 text-neutral-300 hover:text-amber-400 transition-colors" data-tippy-content="National Child Helpline (1098): Toll-free emergency response for child abuse, labour & trafficking">
        <span class="material-symbols-outlined text-[13px] text-amber-400">call</span>
        <span>Childline: <strong class="text-white font-semibold">1098</strong></span>
        <span class="text-[9px] bg-red-600/90 text-white font-bold px-1 py-0.2 rounded uppercase">Free</span>
      </a>
      <span class="text-neutral-700 hidden md:inline">|</span>
      <a href="tel:181" class="hidden md:inline-flex items-center gap-1 text-neutral-300 hover:text-amber-400 transition-colors" data-tippy-content="State Women Helpline (181): 24/7 crisis response, domestic safety & legal aid">
        <span class="material-symbols-outlined text-[13px] text-amber-400">shield_with_heart</span>
        <span>Women: <strong class="text-white font-semibold">181</strong></span>
      </a>
    </div>

    <!-- Right: Statutory Trust & Quick Utility -->
    <div class="flex items-center gap-2 sm:gap-4 ml-auto">
      <span class="hidden lg:inline-flex items-center gap-1 text-neutral-400 text-[11px] cursor-default" data-tippy-content="Section 8 Non-Profit • 50% Tax Exemption on donations under IT Act 1961">
        <span class="material-symbols-outlined text-xs text-amber-400">verified</span>
        <span>Tax exemption verification pending statutory filing. • CIN: <span class="font-mono text-neutral-200 font-semibold">U85300RJ2026NPL098757</span></span>
      </span>
      <a href="https://google.com" onclick="triggerQuickExit(event)" class="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-neutral-400 hover:text-red-400 px-2 sm:px-2.5 py-0.5 rounded border border-neutral-700 hover:border-red-500/50 transition-colors" data-tippy-content="Quick Safety Exit: Instantly close this page and redirect to Google to protect your browsing safety">
        <span class="material-symbols-outlined text-[12px]">logout</span>
        <span class="hidden sm:inline">Quick Exit</span>
        <span class="sm:hidden">Exit</span>
      </a>
    </div>
  </div>
</div>

<!-- STICKY CONTINUOUS MAIN NAVBAR -->
<header id="siteHeader" class="sticky top-0 z-50 bg-surface-ivory/85 backdrop-blur-md border-b border-stone-200/60 py-2.5 sm:py-3 px-3 sm:px-6 lg:px-8 transition-all duration-300">
  <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
    <!-- Clean Minimalist Brand Logo -->
    <a href="index.html" class="flex items-center gap-2.5 sm:gap-3 group focus:outline-none" data-tippy-content="Trinetra Gargi Foundation • Section 8 Registered Non-Profit (CIN: U85300RJ2026NPL098757)">
      <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/35 flex items-center justify-center text-primary group-hover:border-amber-500 group-hover:scale-105 transition-all shadow-xs shrink-0">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" fill="#F59E0B" fill-opacity="0.25" r="4.5"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center gap-1.5 leading-none">
          <span class="text-xs sm:text-base font-extrabold tracking-tight text-neutral-900 group-hover:text-primary transition-colors">TRINETRA GARGI</span>
          <span class="text-[9px] uppercase font-bold tracking-wider text-amber-800 bg-amber-500/15 px-1 sm:px-1.5 py-0.5 rounded border border-amber-500/25">Sec 8</span>
        </div>
        <span class="text-[9px] sm:text-[10px] text-amber-800 tracking-wide mt-0.5 sm:mt-1 font-semibold">FOUNDATION · Cherishing Every Life · Restoring Dignity</span>
      </div>
    </a>

    <!-- Minimalist Navigation Center Pill -->
    <nav class="hidden xl:flex items-center gap-1 bg-stone-100/70 p-1 rounded-full border border-stone-200/60 backdrop-blur-sm text-[13px] font-medium text-neutral-600">
      ${generateNavBar(activeKey)}
    </nav>

    <!-- Minimalist Interactive Actions -->
    <div class="flex items-center gap-2 sm:gap-3">
      <!-- Report Crisis Minimalist SOS Pill -->
      <a href="help-report.html" class="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold ${emergencyClass} transition-all duration-200 active:scale-95 shadow-xs" data-tippy-content="Submit confidential crisis, vulnerability, or distress report">
        <span class="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
        <span class="material-symbols-outlined text-sm">emergency</span>
        <span class="hidden md:inline">Report Crisis</span>
        <span class="md:hidden">SOS</span>
      </a>

      <!-- Donate Pill Button with 80G Relief -->
      <button type="button" onclick="openDonateModal()" class="hidden sm:inline-flex group items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 hover:from-amber-700 hover:to-amber-900 border border-amber-500/40 shadow-sm hover:shadow-md hover:shadow-amber-900/20 transition-all duration-200 active:scale-95 cursor-pointer" data-tippy-content="Direct community welfare contribution with automated 80G tax exemption receipt">
        <span class="material-symbols-outlined text-sm text-amber-300 group-hover:scale-110 transition-transform">volunteer_activism</span>
        <span>Donate</span>
        <span class="text-[10px] text-amber-300 font-medium pl-1 border-l border-amber-700/60">80G</span>
      </button>

      <!-- Mobile Navigation Hamburger Toggle -->
      <button type="button" onclick="toggleMobileNav()" class="xl:hidden p-2 rounded-xl bg-stone-100/80 hover:bg-stone-200 text-neutral-700 transition-colors flex items-center justify-center border border-stone-200" aria-label="Toggle Mobile Menu" data-tippy-content="Open navigation menu">
        <span class="material-symbols-outlined text-xl">menu</span>
      </button>
    </div>
  </div>

  <!-- Hairline Scroll Progress Bar -->
  <div id="scrollProgressBar"></div>
</header>
`;
}

// Generate unified footer HTML with Back to Top button and Mobile Quick Action Dock
function generateUnifiedFooter(activeKey = '') {
  return `
<!-- FOOTER (Shared Component: Footer) -->
<footer class="bg-surface-warm-card dark:bg-inverse-surface border-t border-surface-container dark:border-outline-variant full-width" data-aos="fade-up">
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
      <!-- Brand Info -->
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-highlight-amber-soft to-marigold-bright/30 flex items-center justify-center text-primary border border-marigold-bright/40">
            <span class="material-symbols-outlined text-xl">wb_sunny</span>
          </div>
          <span class="text-headline-md font-headline-md font-bold text-on-surface dark:text-inverse-on-surface">Trinetra Gargi Foundation</span>
        </div>
        <p class="text-body-sm font-body-sm text-text-muted dark:text-secondary-fixed-dim max-w-sm">
          A licensed Section 8 non-profit entity dedicated to cherishing every human life and creating lasting positive impact across society—uplifting vulnerable families, championing women's empowerment, securing youth education and vocational livelihoods, and restoring community dignity across India.
        </p>
        <div class="text-label-md font-label-md text-text-muted space-y-1.5 bg-surface-container-lowest dark:bg-surface-variant/20 p-3.5 rounded-xl border border-surface-container">
          <div>CIN: <strong class="text-primary font-mono tracking-wider cursor-help" data-tippy-content="Corporate Identity Number registered with Ministry of Corporate Affairs (MCA)">U85300RJ2026NPL098757</strong></div>
          <div>Class: <strong>Section 8 Non-Profit (Companies Act, 2013)</strong></div>
          <div>ROC: <strong>ROC Jaipur</strong> | Reg. Date: <strong>12 January 2026</strong></div>
          <div class="pt-1.5 border-t border-surface-container text-[11px] text-text-muted leading-relaxed">
            <strong>Registered Office:</strong> Plot No 45, Shyam Vihar Colony, Near Ganesh Temple, Jagatpura, Jaipur, Rajasthan — 302017
          </div>
        </div>
      </div>
      <!-- Links Column 1: Key Focus Areas -->
      <div>
        <h4 class="text-label-lg font-label-lg font-bold text-on-surface dark:text-inverse-on-surface mb-3">Our Work</h4>
        <ul class="space-y-2 text-body-sm font-body-sm">
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="our-work.html#pillar-education">Education &amp; Scholarships</a></li>
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="our-work.html#pillar-protection">Child Protection &amp; Labour</a></li>
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="our-work.html#pillar-women">Women Empowerment</a></li>
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="our-work.html#pillar-family">Family Support &amp; Rehab</a></li>
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="our-work.html#pillar-skills">Skill Development</a></li>
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="our-work.html#pillar-health">Health &amp; Digital Safety</a></li>
        </ul>
      </div>
      <!-- Links Column 2: Government & Emergency -->
      <div>
        <h4 class="text-label-lg font-label-lg font-bold text-on-surface dark:text-inverse-on-surface mb-3">Resources &amp; Portals</h4>
        <ul class="space-y-2 text-body-sm font-body-sm">
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="government-schemes.html">Government Schemes Directory</a></li>
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="help-report.html">Help &amp; Emergency Portal</a></li>
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="about.html#operating-doctrine">Annual Impact &amp; Audits</a></li>
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="javascript:void(0)" onclick="openDonateModal()">Tax Exemption 80G</a></li>
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="volunteer-partner.html">Volunteer &amp; CSR Partners</a></li>
          <li><a class="text-text-muted dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-inverse-primary transition-colors" href="stories-events.html">Ground Stories &amp; Bulletins</a></li>
        </ul>
      </div>
      <!-- Emergency Helplines Direct Contact -->
      <div>
        <h4 class="text-label-lg font-label-lg font-bold text-on-surface dark:text-inverse-on-surface mb-3">Emergency Lines</h4>
        <div class="space-y-2.5 text-body-sm font-body-sm">
          <div>
            <div class="text-text-muted dark:text-secondary-fixed-dim">National Childline:</div>
            <a class="font-bold text-emergency-crimson hover:underline" href="tel:1098" data-tippy-content="Emergency 24/7 Child Helpline">1098 (Toll Free)</a>
          </div>
          <div>
            <div class="text-text-muted dark:text-secondary-fixed-dim">Women Helpline:</div>
            <a class="font-bold text-on-surface dark:text-inverse-on-surface hover:underline" href="tel:181" data-tippy-content="Confidential Women Helpline">181 (24/7)</a>
          </div>
          <div>
            <div class="text-text-muted dark:text-secondary-fixed-dim">Headquarters Email:</div>
            <a class="text-primary hover:underline" href="mailto:support@trinetragargifoundation.org">support@trinetragargifoundation.org</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer Bottom Strip -->
    <div class="pt-8 border-t border-surface-container dark:border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 text-body-sm font-body-sm text-text-muted dark:text-secondary-fixed-dim">
      <p>© 2026 Trinetra Gargi Foundation. All Rights Reserved. Licensed Section 8 Non-Profit Entity (CIN: U85300RJ2026NPL098757).</p>
      <div class="flex items-center space-x-6 text-label-md font-label-md">
        <a class="hover:text-primary dark:hover:text-inverse-primary transition-colors" href="javascript:void(0)" onclick="showToast('Privacy Policy: All data protected under POCSO & JJ Act 2015.')">Privacy &amp; Confidentiality</a>
        <a class="hover:text-primary dark:hover:text-inverse-primary transition-colors" href="javascript:void(0)" onclick="showToast('Statutory Charter: Fiduciary transparency standards active.')">Terms of Use</a>
        <a class="hover:text-primary dark:hover:text-inverse-primary transition-colors" href="help-report.html">Whistleblower Policy</a>
      </div>
    </div>
  </div>
</footer>

<!-- THUMB-FRIENDLY MOBILE BOTTOM QUICK-ACTION DOCK (Mobile & Tablet < 1280px) -->
<aside id="mobileBottomDock" class="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] safe-bottom" aria-label="Mobile Navigation Dock">
  <div class="grid grid-cols-5 items-center max-w-lg mx-auto py-1 px-1">
    <!-- Action 1: Call 1098 -->
    <a href="tel:1098" class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-neutral-600 hover:text-amber-700 active:bg-amber-50 transition-colors" aria-label="Call National Childline 1098">
      <span class="material-symbols-outlined text-[20px] text-amber-600">call</span>
      <span class="text-[10px] font-semibold mt-0.5 tracking-tight">1098</span>
    </a>

    <!-- Action 2: Govt Schemes -->
    <a href="government-schemes.html" class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl ${activeKey === 'schemes' ? 'text-amber-700 font-bold' : 'text-neutral-600 hover:text-neutral-950'} active:bg-stone-100 transition-colors" aria-label="Government Schemes Directory">
      <span class="material-symbols-outlined text-[20px] ${activeKey === 'schemes' ? 'text-amber-700' : 'text-neutral-500'}">account_balance</span>
      <span class="text-[10px] font-medium mt-0.5 tracking-tight">Schemes</span>
    </a>

    <!-- Action 3: SOS Report (Raised Center Primary Action) -->
    <div class="flex items-center justify-center -mt-3">
      <a href="help-report.html" class="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 active:scale-95 transition-all" aria-label="SOS Emergency Child Distress Report">
        <span class="material-symbols-outlined text-[22px] animate-pulse">emergency</span>
        <span class="text-[9px] font-extrabold tracking-wider leading-none mt-0.5">SOS</span>
      </a>
    </div>

    <!-- Action 4: Donate 80G -->
    <button type="button" onclick="openDonateModal()" class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-neutral-600 hover:text-neutral-950 active:bg-amber-50 transition-colors cursor-pointer" aria-label="Donate with 80G Tax Exemption">
      <span class="material-symbols-outlined text-[20px] text-amber-600">volunteer_activism</span>
      <span class="text-[10px] font-medium mt-0.5 tracking-tight">Donate</span>
    </button>

    <!-- Action 5: Quick Safety Exit -->
    <a href="https://google.com" onclick="triggerQuickExit(event)" class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-neutral-500 hover:text-red-600 active:bg-red-50 transition-colors" aria-label="Instant Safety Exit to Google">
      <span class="material-symbols-outlined text-[20px] text-neutral-400 hover:text-red-600">logout</span>
      <span class="text-[10px] font-medium mt-0.5 tracking-tight">Exit</span>
    </a>
  </div>
</aside>

<!-- Minimalist Floating Back to Top Button (Positioned comfortably above mobile bottom dock) -->
<button id="backToTopBtn" type="button" onclick="scrollToTop()" class="fixed bottom-20 xl:bottom-6 right-4 sm:right-6 z-40 w-11 h-11 rounded-full bg-neutral-900/85 hover:bg-neutral-900 text-amber-400 border border-stone-700/60 shadow-xl backdrop-blur-md flex items-center justify-center opacity-0 pointer-events-none translate-y-3 transition-all duration-300 group cursor-pointer" data-tippy-content="Scroll smoothly back to top" aria-label="Back to Top">
  <span class="material-symbols-outlined text-xl group-hover:-translate-y-0.5 transition-transform">keyboard_arrow_up</span>
</button>
`;
}

function processSourceFile(srcDir, destFile, activeKey, pageTitle) {
  const srcPath = path.join(STITCH_DIR, srcDir, 'code.html');
  const destPath = path.join(ROOT_DIR, destFile);

  let html = fs.readFileSync(srcPath, 'utf8');

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`);

  // Ensure external CSS and styles.css link in head
  const headInject = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800;1,900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
  <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/animations/scale.css">
  <link rel="stylesheet" href="styles.css">
</head>`;
  
  if (html.includes('styles.css')) {
    html = html.replace(/<link rel="stylesheet" href="styles.css">[\s\S]*?<\/head>/i, headInject);
  } else {
    html = html.replace('</head>', headInject);
  }

  // Replace Header & Top Ribbon with unified header
  const bodyStartIdx = html.indexOf('<body');
  if (bodyStartIdx !== -1) {
    const afterBodyStart = html.indexOf('>', bodyStartIdx) + 1;
    let mainStartIdx = html.indexOf('<main', afterBodyStart);
    if (mainStartIdx === -1) {
      const headerEnd = html.indexOf('</header>', afterBodyStart);
      if (headerEnd !== -1) {
        mainStartIdx = headerEnd + 9;
      }
    }
    if (mainStartIdx !== -1) {
      const beforeHeader = html.substring(0, afterBodyStart);
      const afterHeader = html.substring(mainStartIdx);
      html = beforeHeader + '\n' + generateUnifiedHeader(activeKey) + '\n' + afterHeader;
    }
  }

  // Replace Footer with unified footer
  const footerStartIdx = html.indexOf('<footer');
  if (footerStartIdx !== -1) {
    const footerEndIdx = html.indexOf('</footer>', footerStartIdx) + 9;
    const beforeFooter = html.substring(0, footerStartIdx);
    const afterFooter = html.substring(footerEndIdx);
    html = beforeFooter + generateUnifiedFooter(activeKey) + afterFooter;
  }

  // Inject CDN scripts and main.js before </body>
  const bodyEndIdx = html.indexOf('</body>');
  if (bodyEndIdx !== -1) {
    const beforeBodyEnd = html.substring(0, bodyEndIdx);
    const afterBodyEnd = html.substring(bodyEndIdx);
    let cleanedBefore = beforeBodyEnd;
    if (cleanedBefore.includes('id="mobileNavDrawer"')) {
      const drawerIdx = cleanedBefore.indexOf('<!-- Mobile Navigation Drawer');
      if (drawerIdx !== -1) {
        cleanedBefore = cleanedBefore.substring(0, drawerIdx);
      }
    }
    // Remove any previously added library script blocks if present
    cleanedBefore = cleanedBefore.replace(/<!-- Google Website Translation Engine[\s\S]*?translate_a\/element\.js.*?<\/script>/gi, '');
    cleanedBefore = cleanedBefore.replace(/<div id="google_translate_element".*?<\/div>/gi, '');
    cleanedBefore = cleanedBefore.replace(/<!-- Premium UI\/UX Ecosystem Libraries -->[\s\S]*?<script src="main.js"><\/script>/gi, '');
    cleanedBefore = cleanedBefore.replace(/<script src="main.js"><\/script>/gi, '');

    const scriptBlock = `
<!-- Premium UI/UX Ecosystem Libraries -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js"></script>
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.8.0/countUp.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js"></script>
<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>
<script src="main.js"></script>
`;
    html = cleanedBefore + scriptBlock + afterBodyEnd;
  }

  // --- Page Specific Enhancements ---

  if (activeKey === 'home') {
    // Stat counters on home portal
    html = html.replace(/142,000\+/g, '<span class="stat-counter" data-stat-target="142000" data-stat-suffix="+">142,000+</span>');
    html = html.replace(/85\+/g, '<span class="stat-counter" data-stat-target="85" data-stat-suffix="+">85+</span>');
    html = html.replace(/93\.4%/g, '<span class="stat-counter" data-stat-target="93.4" data-stat-suffix="%" data-stat-decimals="1">93.4%</span>');
    html = html.replace(/4,810/g, '<span class="stat-counter" data-stat-target="4810">4,810</span>');
    html = html.replace(/₹14\.8 Cr/g, '<span class="stat-counter" data-stat-target="14.8" data-stat-prefix="₹" data-stat-suffix=" Cr" data-stat-decimals="1">₹14.8 Cr</span>');

    // Add AOS animations to sections
    html = html.replace(/<section id="help-portal"/g, '<section id="help-portal" data-aos="fade-up"');
    html = html.replace(/<section id="impact-grid"/g, '<section id="impact-grid" data-aos="fade-up"');

    // Inject Atmospheric Cherishing Hero Background Image Layer
    const heroBgHtml = `<!-- HERO SECTION -->
<section id="hero" class="relative overflow-hidden py-8 sm:py-10 md:py-12 bg-[#FAF7F2] border-b border-surface-container" data-aos="fade-up">
  <!-- Atmospheric Cherishing Hero Background Layer -->
  <div class="cherish-hero-bg-layer absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
    <picture class="w-full h-full block">
      <source srcset="hero-bg.webp" type="image/webp" />
      <img src="hero-bg.jpg" alt="Trinetra Gargi Foundation Community Grassroots Village" class="w-full h-full object-cover object-center" fetchpriority="high" decoding="async" />
    </picture>
    <div class="cherish-hero-bg-overlay absolute inset-0"></div>
  </div>
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`;

    html = html.replace(/<!-- HERO SECTION -->\s*<section class="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 bg-surface-ivory border-b border-surface-container">\s*<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/i, heroBgHtml);

    // Form submission on help portal
    html = html.replace(/<button class="bg-emergency-crimson hover:bg-red-700 text-on-primary px-6 py-2\.5 rounded-lg text-label-lg font-label-lg flex items-center gap-2 transition-all active:scale-95 duration-100">/g, 
      '<button type="button" onclick="handleCrisisReport(event)" class="bg-emergency-crimson hover:bg-red-700 text-on-primary px-6 py-2.5 rounded-lg text-label-lg font-label-lg flex items-center gap-2 transition-all active:scale-95 duration-100 shadow-md">');
    
    // Hero Wrapper with Gentle Cherishing Golden Hour Aura
    html = html.replace(/<div class="max-w-4xl mx-auto text-center">/g, '<div class="cherish-hero-aura max-w-4xl mx-auto text-center">');

    // Dynamic Hero Headline celebrating positive societal impact across vulnerabilities
    const dynamicHeroHeadline = `<h1 class="text-xl sm:text-3xl lg:text-[2.25rem] font-display font-extrabold text-neutral-900 mb-2 sm:mb-3 leading-[1.2] tracking-tight max-w-3xl mx-auto">
      <span class="block">
        Creating Positive Impact Across <span class="font-editorial-italic font-bold text-amber-800 underline decoration-amber-500/90 decoration-wavy decoration-2 underline-offset-4">Society.</span>
      </span>
      <span class="block mt-1 sm:mt-1.5 text-[#8D4B00]">
        Empowering Every Vulnerability With <span class="font-editorial-italic font-bold text-[#B45309] underline decoration-amber-500/90 decoration-wavy decoration-2 underline-offset-4">Dignity.</span>
      </span>
    </h1>`;

    html = html.replace(/<h1 class="text-display-mobile md:text-display font-display text-on-surface mb-6 leading-tight tracking-tight">[\s\S]*?<\/h1>/i, dynamicHeroHeadline);

    // Civic Trust Pill: Completely removed per user request for clean editorial elegance
    html = html.replace(/<!-- Civic Trust Pill -->[\s\S]*?<\/div>\s*<!-- Headline -->/i, '<!-- Headline -->');

    // Hero Subheading: Cherishing, Compassionate, Multi-vulnerability Mandate
    html = html.replace(/Trinetra Gargi Foundation bridges vulnerable youth from brick kilns and streets to classrooms, vocational livelihood programs, and direct government welfare schemes with complete statutory transparency\./g,
      "Trinetra Gargi Foundation cherishes and uplifts every vulnerable member of our society—nurturing distressed children into safe classrooms, empowering resilient women with livelihoods, equipping youth with digital and vocational skills, and standing beside vulnerable families with compassion and statutory transparency.");

    // Hero Dual CTAs: Cherish A Life primary button with radiant amber glow & explore schemes secondary
    const cherishDualCtas = `<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
      <a class="btn-cherish w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-label-lg font-bold shadow-md hover:shadow-xl transition-all active:scale-95 duration-150 cursor-pointer" href="javascript:void(0)" onclick="openDonateModal()">
        <span class="material-symbols-outlined text-lg text-amber-200 cherish-pulse-heart">volunteer_activism</span>
        <span class="text-white">Cherish A Life · Support Our Mission</span>
      </a>
      <a class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/95 border border-stone-300 hover:border-amber-500/60 text-stone-700 hover:text-amber-900 hover:bg-amber-50/50 px-7 py-3.5 rounded-xl text-label-lg font-bold transition-all active:scale-95 duration-150 shadow-xs" href="government-schemes.html">
        <span class="material-symbols-outlined text-lg text-amber-600">account_balance</span>
        <span>Explore Government Schemes</span>
      </a>
    </div>`;

    html = html.replace(/<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">[\s\S]*?<\/div>\s*<!-- Hero Trust Metrics Strip -->/i, cherishDualCtas + '\n<!-- Hero Trust Metrics Strip -->');

    // Upgrade Metric Cards to Cherishing tactile cards
    html = html.replace(/class="p-4 bg-surface-container-lowest rounded-xl border border-highlight-amber-soft text-left"/g,
      'class="cherish-card p-4 rounded-2xl text-left"');
    html = html.replace(/<div class="text-body-sm font-body-sm text-text-muted">Children Educated<\/div>/g,
      '<div class="text-body-sm font-body-sm text-text-muted">Vulnerable Lives Uplifted</div>');
    html = html.replace(/<div class="text-body-sm font-body-sm text-text-muted">Grassroots Centers<\/div>/g,
      '<div class="text-body-sm font-body-sm text-text-muted">Grassroots Care Centers</div>');
    html = html.replace(/<div class="text-body-sm font-body-sm text-text-muted">Overhead on Direct Aid<\/div>/g,
      '<div class="text-body-sm font-body-sm text-text-muted">Zero Leakage Fiduciary Direct Aid</div>');
    html = html.replace(/Zero Admin/g, '100% Field');

    // Help Portal Heading & Subtitle on Home: Family & community distress with cherishing touch
    html = html.replace(/Need Help or Want to Report a Child \/ Family at Risk\?/g,
      'Need Help or Want to Report an Individual or Family in Distress?');
    html = html.replace(/Reports are triaged within 45 minutes by certified social caseworkers in coordination with District Child Protection Units \(DCPU\) and Childline 1098\./g,
      'Every life is cherished. Reports are triaged rapidly by certified caseworkers in coordination with District Welfare Units, Women Helpline 181, and Childline 1098.');

    // Connect "Proceed to Donate ₹1,200" button
    html = html.replace(/<button class="w-full py-3\.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-headline-sm font-headline-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 duration-100">/g,
      '<button type="button" onclick="openDonateModal(1200)" class="btn-cherish w-full py-3.5 px-4 rounded-xl font-bold text-headline-sm font-headline-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 duration-100">');
  }

  if (activeKey === 'help-report') {
    html = html.replace(/id="grievanceForm"[^>]*>/g, 'id="grievanceForm" onsubmit="handleCrisisReport(event)">');
    html = html.replace(/<button class="text-primary text-xs font-label-md flex items-center gap-1 hover:underline" type="button">/g,
      '<button type="button" onclick="detectGPS()" class="text-primary text-xs font-label-md flex items-center gap-1 hover:underline">');
  }

  if (activeKey === 'about') {
    // Numerical counters on About
    html = html.replace(/18,400\+/g, '<span class="stat-counter" data-stat-target="18400" data-stat-suffix="+">18,400+</span>');
    html = html.replace(/42,000\+/g, '<span class="stat-counter" data-stat-target="42000" data-stat-suffix="+">42,000+</span>');
    html = html.replace(/8,200\+/g, '<span class="stat-counter" data-stat-target="8200" data-stat-suffix="+">8,200+</span>');
    html = html.replace(/98\.2%/g, '<span class="stat-counter" data-stat-target="98.2" data-stat-suffix="%" data-stat-decimals="1">98.2%</span>');
    html = html.replace(/100% Direct Field Allocation/g, '<span class="stat-counter" data-stat-target="100" data-stat-suffix="%" data-stat-decimals="0">100%</span> Direct Field Allocation');

    // Insert Official Corporate Incorporation Dossier after Hero
    const corporateDossierHtml = `
    <!-- OFFICIAL CORPORATE INCORPORATION DOSSIER -->
    <div class="bg-surface-container-lowest rounded-2xl border-2 border-primary/20 p-6 sm:p-8 shadow-sm mt-12 mb-6" data-aos="fade-up">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-container pb-4 mb-6">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-highlight-amber-soft text-primary font-bold text-xs uppercase tracking-wider mb-2">
            <span class="material-symbols-outlined text-sm">verified</span> Ministry of Corporate Affairs (MCA) Registered
          </span>
          <h3 class="text-headline-md font-bold text-on-surface">Official Statutory &amp; Corporate Identity</h3>
        </div>
        <div class="inline-flex items-center gap-2 px-3.5 py-2 bg-surface-container-low rounded-xl border border-surface-container font-mono text-xs text-primary font-bold shadow-xs cursor-help" data-tippy-content="Permanent MCA Identification Number">
          CIN: U85300RJ2026NPL098757
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <div class="p-4 rounded-xl bg-surface-container-low/60 border border-surface-container">
          <div class="text-xs text-text-muted font-medium mb-1">Company Name</div>
          <div class="font-bold text-on-surface text-base">TRINETRA GARGI FOUNDATION</div>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-low/60 border border-surface-container">
          <div class="text-xs text-text-muted font-medium mb-1">Corporate Identification Number (CIN)</div>
          <div class="font-bold text-primary font-mono text-base">U85300RJ2026NPL098757</div>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-low/60 border border-surface-container">
          <div class="text-xs text-text-muted font-medium mb-1">Class of Company</div>
          <div class="font-bold text-on-surface">Section 8 (Licensed under Section 8 of the Companies Act, 2013)</div>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-low/60 border border-surface-container">
          <div class="text-xs text-text-muted font-medium mb-1">Company Category &amp; Sub-Category</div>
          <div class="font-bold text-on-surface">Company Limited by Guarantee • Non-Government Company</div>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-low/60 border border-surface-container">
          <div class="text-xs text-text-muted font-medium mb-1">Registration Date</div>
          <div class="font-bold text-on-surface">12 January 2026</div>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-low/60 border border-surface-container">
          <div class="text-xs text-text-muted font-medium mb-1">Registrar of Companies (ROC)</div>
          <div class="font-bold text-on-surface">ROC Jaipur, Rajasthan</div>
        </div>
        <div class="md:col-span-2 lg:col-span-3 p-4 rounded-xl bg-surface-container-low/60 border border-surface-container flex items-start gap-3">
          <span class="material-symbols-outlined text-primary text-xl mt-0.5">location_on</span>
          <div>
            <div class="text-xs text-text-muted font-medium mb-0.5">Registered Office Address</div>
            <div class="font-bold text-on-surface">Plot No 45, Shyam Vihar Colony, Near Ganesh Temple, Jagatpura, Jaipur, Rajasthan — 302017</div>
          </div>
        </div>
      </div>
    </div>
    `;

    html = html.replace(/(<!-- High-Impact Live Verification Metric Cards \(Bento Cluster\) -->)/, corporateDossierHtml + '\n$1');

    // Update Founders / Signatories box
    html = html.replace(/Prof\. Gargi V\. Shastri &amp; Trinetra Sen/g, 'Gargi Yadav, Harishanker Yadav &amp; Rekha Yadav');
    html = html.replace(/Co-Founders &amp; Permanent Trustees, Trinetra Gargi Foundation/g, 'Board of Directors, Trinetra Gargi Foundation (Section 8 Company)');
    html = html.replace(/REG\. NO: DEL\/IV\/2014\/19827/g, 'CIN: U85300RJ2026NPL098757 • ROC Jaipur');

    // Update Leadership section with actual Board of Directors
    html = html.replace(/Leadership &amp; Advisory Council/g, 'Board of Directors &amp; Advisory Council');
    
    // Replace Director 1
    html = html.replace(/GS\s*<\/div>\s*<span class="[^"]*">\s*Trustee \/ Co-Founder\s*<\/span>\s*<\/div>\s*<h3 class="[^"]*">\s*Prof\. Gargi V\. Shastri\s*<\/h3>\s*<p class="[^"]*">\s*Pedagogical Frameworks &amp; Direct Operations\s*<\/p>\s*<p class="[^"]*">[^<]*<\/p>/s,
      `GY</div>
      <span class="px-2.5 py-1 rounded bg-highlight-amber-soft text-xs font-bold text-primary font-mono">
        Director &amp; Co-Founder
      </span>
      </div>
      <h3 class="text-headline-sm font-headline-sm text-on-surface mb-1">Gargi Yadav</h3>
      <p class="text-label-md font-label-md text-primary mb-3">Executive Stewardship &amp; Strategic Operations</p>
      <p class="text-body-sm font-body-sm text-secondary leading-relaxed">
        Director and founding visionary leading grassroots education pipelines, child protection enforcement, and institutional welfare governance under Section 8 of the Companies Act, 2013.
      </p>`);

    // Replace Director 2
    html = html.replace(/TS\s*<\/div>\s*<span class="[^"]*">\s*Managing Trustee\s*<\/span>\s*<\/div>\s*<h3 class="[^"]*">\s*Trinetra Sen\s*<\/h3>\s*<p class="[^"]*">\s*Field Deployment &amp; Public Transparency\s*<\/p>\s*<p class="[^"]*">[^<]*<\/p>/s,
      `HY</div>
      <span class="px-2.5 py-1 rounded bg-surface-container text-xs font-semibold text-secondary font-mono">
        Director
      </span>
      </div>
      <h3 class="text-headline-sm font-headline-sm text-on-surface mb-1">Harishanker Yadav</h3>
      <p class="text-label-md font-label-md text-tertiary mb-3">Field Logistics &amp; Community Operations</p>
      <p class="text-body-sm font-body-sm text-secondary leading-relaxed">
        Oversees community mobilization, ground center coordination, and transparent supply pipelines across Rajasthan and regional operational clusters with zero administrative leakage.
      </p>`);

    // Replace Director 3
    html = html.replace(/AR\s*<\/div>\s*<span class="[^"]*">\s*Legal Advisor\s*<\/span>\s*<\/div>\s*<h3 class="[^"]*">\s*Adv\. Aniruddha Ray\s*<\/h3>\s*<p class="[^"]*">\s*Senior Advocate, Supreme Court of India\s*<\/p>\s*<p class="[^"]*">[^<]*<\/p>/s,
      `RY</div>
      <span class="px-2.5 py-1 rounded bg-surface-container text-xs font-semibold text-secondary font-mono">
        Director
      </span>
      </div>
      <h3 class="text-headline-sm font-headline-sm text-on-surface mb-1">Rekha Yadav</h3>
      <p class="text-label-md font-label-md text-coral-warmth mb-3">Women Empowerment &amp; Social Welfare</p>
      <p class="text-body-sm font-body-sm text-secondary leading-relaxed">
        Directs maternal health guidance, Self-Help Groups (SHGs), and child rehabilitation workflows, championing economic independence for vulnerable families.
      </p>`);
  }

  if (activeKey === 'our-work') {
    html = html.replace(/32,000\+/g, '<span class="stat-counter" data-stat-target="32000" data-stat-suffix="+">32,000+</span>');
    html = html.replace(/12,800\+/g, '<span class="stat-counter" data-stat-target="12800" data-stat-suffix="+">12,800+</span>');
    html = html.replace(/8,500\+/g, '<span class="stat-counter" data-stat-target="8500" data-stat-suffix="+">8,500+</span>');
    html = html.replace(/15,400\+/g, '<span class="stat-counter" data-stat-target="15400" data-stat-suffix="+">15,400+</span>');
  }

  if (activeKey === 'volunteer') {
    html = html.replace(/4,500\+/g, '<span class="stat-counter" data-stat-target="4500" data-stat-suffix="+">4,500+</span>');
    html = html.replace(/38\+/g, '<span class="stat-counter" data-stat-target="38" data-stat-suffix="+">38+</span>');
    html = html.replace(/120\+/g, '<span class="stat-counter" data-stat-target="120" data-stat-suffix="+">120+</span>');

    // Attach form handles
    html = html.replace(/<form class="space-y-4">/g, '<form class="space-y-4" onsubmit="handleVolunteerFormSubmit(event)">');
    html = html.replace(/<form class="space-y-4 mt-6">/g, '<form class="space-y-4 mt-6" onsubmit="handleCsrFormSubmit(event)">');
  }

  // Global cross-page and interactive action link rewrites
  html = html.replace(/href="#donate"/g, 'href="javascript:void(0)" onclick="openDonateModal()"');
  html = html.replace(/href="#government-schemes"/g, 'href="government-schemes.html"');
  html = html.replace(/href="#about"/g, 'href="about.html"');
  html = html.replace(/href="#stories"/g, 'href="stories-events.html"');
  html = html.replace(/href="#partner"/g, 'href="volunteer-partner.html"');

  // Global card-level AOS micro-reveals for sections
  html = html.replace(/<section\b(?![^>]*\bdata-aos\b)/gi, '<section data-aos="fade-up"');

  fs.writeFileSync(destPath, html, 'utf8');
  console.log(`Generated: ${destFile} [${html.length} bytes]`);
}

const PAGES_CONFIG = [
  {
    srcDir: 'trinetra_gargi_foundation_home_portal',
    destFile: 'index.html',
    activeKey: 'home',
    title: 'Trinetra Gargi Foundation - Home Portal | Restoring Dignity & Childhood'
  },
  {
    srcDir: 'trinetra_gargi_foundation_about_us',
    destFile: 'about.html',
    activeKey: 'about',
    title: 'About Us | Trinetra Gargi Foundation'
  },
  {
    srcDir: 'trinetra_gargi_foundation_our_work',
    destFile: 'our-work.html',
    activeKey: 'our-work',
    title: 'Our Work | 6 Strategic Impact Pillars | Trinetra Gargi Foundation'
  },
  {
    srcDir: 'trinetra_gargi_foundation_government_schemes',
    destFile: 'government-schemes.html',
    activeKey: 'schemes',
    title: 'Government Schemes Directory | Trinetra Gargi Foundation'
  },
  {
    srcDir: 'trinetra_gargi_foundation_help_report',
    destFile: 'help-report.html',
    activeKey: 'help-report',
    title: 'Help & Report Child Abuse / Grievance | Trinetra Gargi Foundation'
  },
  {
    srcDir: 'trinetra_gargi_foundation_stories_events',
    destFile: 'stories-events.html',
    activeKey: 'stories',
    title: 'Stories, Events & Ground Voices | Trinetra Gargi Foundation'
  },
  {
    srcDir: 'trinetra_gargi_foundation_volunteer_partner',
    destFile: 'volunteer-partner.html',
    activeKey: 'volunteer',
    title: 'Volunteer & Institutional Partnerships | Trinetra Gargi Foundation'
  }
];

PAGES_CONFIG.forEach(cfg => {
  processSourceFile(cfg.srcDir, cfg.destFile, cfg.activeKey, cfg.title);
});

console.log('All 7 pages recompiled with Lenis, AOS, CountUp, Tippy.js, and Confetti integration!');
