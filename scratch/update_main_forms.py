# -*- coding: utf-8 -*-
"""
Script to safely enhance main.js form handling, validation, and acknowledgment modals
"""
import re

with open('main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add showFormAcknowledgmentModal right after showCrisisConfirmationModal
ack_modal_func = '''
// --- Universal Submission Acknowledgment Modal (Volunteer, CSR, Contact) ---
function showFormAcknowledgmentModal(config) {
  const safeName = escapeHTML(config.name || 'Valued Partner');
  const safeTrackingId = config.trackingId ? escapeHTML(config.trackingId) : '';
  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  let iconName = 'check_circle';
  let iconColor = 'text-emerald-700 bg-emerald-100';
  let title = 'Application Registered';
  let subtitle = 'Your intake has been securely registered in the Foundation registry.';
  let typeLabel = 'Statutory Docket';

  if (config.type === 'volunteer') {
    title = 'Volunteer Enrolment Received';
    subtitle = `Thank you, <strong>${safeName}</strong>, for stepping forward in solidarity with children and families in Rajasthan.`;
    iconName = 'volunteer_activism';
    iconColor = 'text-emerald-700 bg-emerald-100';
    typeLabel = 'Volunteer Dossier Docket';
  } else if (config.type === 'csr') {
    title = 'Corporate Partnership Request Logged';
    subtitle = `Thank you, <strong>${safeName}</strong> (${escapeHTML(config.company || 'Enterprise')}). Our institutional relations director has received your consultation request.`;
    iconName = 'handshake';
    iconColor = 'text-indigo-800 bg-indigo-100';
    typeLabel = 'CSR Partnership Docket';
  } else if (config.type === 'contact') {
    title = 'Inquiry Successfully Logged';
    subtitle = `Thank you, <strong>${safeName}</strong>. Your query has been assigned to our community assistance desk.`;
    iconName = 'mark_email_read';
    iconColor = 'text-amber-800 bg-amber-100';
    typeLabel = 'Citizen Inquiry Docket';
  }

  const modalHtml = `
  <div id="formAckModal" role="dialog" aria-modal="true" aria-labelledby="formAckTitle" class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
    <div class="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xl text-center space-y-4">
      <div class="w-16 h-16 ${iconColor} rounded-full flex items-center justify-center mx-auto shadow-xs">
        <span class="material-symbols-outlined text-3xl" aria-hidden="true">${iconName}</span>
      </div>
      <h3 id="formAckTitle" class="text-2xl font-bold text-neutral-900">${title}</h3>
      <p class="text-sm text-neutral-600 leading-relaxed">
        ${subtitle}
      </p>

      ${safeTrackingId ? `
      <div class="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs flex items-center justify-between gap-2 shadow-2xs">
        <div class="text-left min-w-0">
          <div class="text-[10px] uppercase font-bold text-amber-900 tracking-wider">${typeLabel}:</div>
          <div class="font-mono font-extrabold text-amber-950 text-sm truncate">${safeTrackingId}</div>
        </div>
        <button type="button" onclick="copyToClipboard('${safeTrackingId}', 'Tracking Reference copied!')" class="px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 hover:border-amber-700 text-[#9A3412] font-bold text-xs flex items-center gap-1 shrink-0 transition-colors cursor-pointer shadow-2xs">
          <span class="material-symbols-outlined text-xs" aria-hidden="true">content_copy</span>
          <span>Copy</span>
        </button>
      </div>
      ` : ''}

      <div class="bg-stone-50 p-4 rounded-xl text-left text-xs space-y-2 border border-stone-200 font-mono">
        <div class="flex justify-between"><span class="text-stone-500">Institution:</span><span class="font-bold text-neutral-900">TRINETRA GARGI FOUNDATION</span></div>
        <div class="flex justify-between"><span class="text-stone-500">Corporate Status:</span><span class="font-bold text-neutral-900">Section 8 (CIN: U85300RJ2026NPL098757)</span></div>
        <div class="flex justify-between"><span class="text-stone-500">Date Logged:</span><span class="font-bold text-neutral-900">${dateStr}</span></div>
        <div class="flex justify-between"><span class="text-stone-500">Response SLA:</span><span class="font-bold text-emerald-800">24 – 48 Business Hours</span></div>
        <div class="flex justify-between"><span class="text-stone-500">Statutory Tax Status:</span><span class="font-bold text-[#9A3412]">${siteConfig.taxInfo.verificationStatusNote}</span></div>
      </div>

      <p class="text-xs text-stone-500 italic">
        A formal confirmation has been recorded in the foundation's official queue. Please reference your docket ID for any inquiries.
      </p>

      <div class="pt-2">
        <button type="button" onclick="document.getElementById('formAckModal').remove()" class="w-full py-3 rounded-xl bg-[#172554] text-white font-bold text-xs hover:bg-[#1E293B] transition-colors focus:ring-2 focus:ring-[#9A3412] cursor-pointer">
          Close Acknowledgement
        </button>
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('formAckModal');
  modal.addEventListener('keydown', (e) => handleFocusTrap(modal, e));
  const closeBtn = modal.querySelector('button');
  if (closeBtn) closeBtn.focus();

  if (!prefersReducedMotion()) {
    triggerCelebrationConfetti();
  }
}
'''

# Check if showFormAcknowledgmentModal already exists
if 'showFormAcknowledgmentModal' not in content:
    # Insert right before toggleAnonymousMode
    content = content.replace('// Anonymous Toggle Handler for Help & Report', ack_modal_func + '\n// Anonymous Toggle Handler for Help & Report')

# 2. Update handleModalDonationSubmit with client-side validation
modal_submit_old = re.search(r'async function handleModalDonationSubmit\(event\) \{[\s\S]*?\n\}', content)
if modal_submit_old:
    modal_submit_new = '''async function handleModalDonationSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById('modalDonateSubmitBtn') || form.querySelector('button[type="submit"]');
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

  const honeypot = form.querySelector('input[name="honeypot_title"]')?.value || '';
  const donorName = form.querySelector('input[name="donorName"]')?.value?.trim() || '';
  const donorEmail = form.querySelector('input[name="donorEmail"]')?.value?.trim() || '';
  const donorPhone = form.querySelector('input[name="donorPhone"]')?.value?.trim() || '';
  const donorPAN = form.querySelector('input[name="donorPAN"]')?.value?.trim().toUpperCase() || '';
  const amountPaid = Number(TGFState.selectedDonationAmount) || 1200;

  // Client-side Validation
  if (!donorName || donorName.length < 2) {
    showToast('Please enter your full legal name (minimum 2 characters).', 'warning');
    form.querySelector('input[name="donorName"]')?.focus();
    return;
  }
  if (!donorEmail || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(donorEmail)) {
    showToast('Please enter a valid email address for receipt acknowledgment.', 'warning');
    form.querySelector('input[name="donorEmail"]')?.focus();
    return;
  }
  const cleanPhone = donorPhone ? donorPhone.replace(/\\D/g, '').slice(-10) : '';
  if (!cleanPhone || !/^[6-9]\\d{9}$/.test(cleanPhone)) {
    showToast('Please enter a valid 10-digit Indian mobile number.', 'warning');
    form.querySelector('input[name="donorPhone"]')?.focus();
    return;
  }
  if (donorPAN && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(donorPAN)) {
    showToast('Invalid PAN format (expected e.g. ABCDE1234F).', 'warning');
    form.querySelector('input[name="donorPAN"]')?.focus();
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.innerHTML = `
      <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></span>
      <span>Processing Support Intent...</span>
    `;
  }

  try {
    const payload = {
      donorName,
      donorEmail,
      donorPhone: cleanPhone,
      amountPaid,
      paymentMode: 'online-gateway',
      transactionRefNo: 'INTENT-' + Date.now(),
      honeypot_title: honeypot
    };
    if (donorPAN) payload.donorPAN = donorPAN;

    const res = await fetch('/api/donation-receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      closeDonateModal();
      form.reset();
      showDonationAcknowledgmentModal({
        name: donorName || 'Valued Supporter',
        amount: amountPaid,
        trackingId: data.trackingId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    } else if (res.status === 429) {
      showToast('Submission limit reached. Please try again in an hour.', 'danger', 6000);
    } else if (res.status === 503 || data.code === 'SERVICE_UNAVAILABLE') {
      showToast('Direct accounts desk is temporarily offline. Please reach accounts@trinetragargifoundation.org.', 'danger', 7000);
    } else if (res.status === 400) {
      showToast(data.error || 'Please check your inputs and try again.', 'warning');
    } else {
      showToast(data.error || 'Unable to register support intent. Please try again.', 'danger');
    }
  } catch (err) {
    showToast('Network error: Unable to contact server. Please verify your connection.', 'danger');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = originalBtnHTML;
    }
  }
}'''
    content = content.replace(modal_submit_old.group(0), modal_submit_new)

# 3. Update handleVolunteerFormSubmit with validation & modal
vol_submit_old = re.search(r'async function handleVolunteerFormSubmit\(event\) \{[\s\S]*?\n\}', content)
if vol_submit_old:
    vol_submit_new = '''async function handleVolunteerFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

  const honeypot = form.querySelector('input[name="honeypot_company"]')?.value || '';
  const fullName = form.querySelector('input[name="fullName"], #volunteerFullName')?.value?.trim() || '';
  const phone = form.querySelector('input[name="phone"], #volunteerPhone')?.value?.trim() || '';
  const email = form.querySelector('input[name="email"], #volunteerEmail')?.value?.trim() || '';
  const city = form.querySelector('input[name="city"], #volunteerCity')?.value?.trim() || '';
  const preferredRole = form.querySelector('select[name="preferredRole"], #volunteerRole')?.value || '';
  const weeklyAvailabilityHours = form.querySelector('select[name="weeklyAvailabilityHours"], #volunteerAvailability')?.value || 'weekends';
  const skillsAndBackground = form.querySelector('input[name="skillsAndBackground"], #volunteerSkills')?.value?.trim() || 'Volunteer Background';
  const message = form.querySelector('textarea[name="message"], #volunteerMessage')?.value?.trim() || '';
  const safeguardingAgreed = form.querySelector('input[name="safeguardingAgreement"]')?.checked;

  if (!fullName || fullName.length < 2) {
    showToast('Please enter your full legal name (minimum 2 characters).', 'warning');
    form.querySelector('input[name="fullName"], #volunteerFullName')?.focus();
    return;
  }
  const cleanPhone = phone ? phone.replace(/\\D/g, '').slice(-10) : '';
  if (!cleanPhone || !/^[6-9]\\d{9}$/.test(cleanPhone)) {
    showToast('Please provide a valid 10-digit Indian mobile number.', 'warning');
    form.querySelector('input[name="phone"], #volunteerPhone')?.focus();
    return;
  }
  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.', 'warning');
    form.querySelector('input[name="email"], #volunteerEmail')?.focus();
    return;
  }
  if (!city || city.length < 2) {
    showToast('Please specify your current city / district.', 'warning');
    form.querySelector('input[name="city"], #volunteerCity')?.focus();
    return;
  }
  if (!preferredRole) {
    showToast('Please select your preferred engagement track.', 'warning');
    form.querySelector('select[name="preferredRole"], #volunteerRole')?.focus();
    return;
  }
  if (!safeguardingAgreed) {
    showToast('You must accept the Child Safeguarding Code of Ethics to apply.', 'warning');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.innerHTML = `
      <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></span>
      <span>Submitting Application...</span>
    `;
  }

  try {
    const payload = {
      fullName,
      email,
      phone: cleanPhone,
      city: city || 'Rajasthan',
      preferredRole: preferredRole || 'bridge-school',
      weeklyAvailabilityHours,
      skillsAndBackground: skillsAndBackground.length >= 5 ? skillsAndBackground : 'Community engagement and education support',
      safeguardingAgreement: true,
      message,
      honeypot_company: honeypot
    };

    const res = await fetch('/api/volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      form.reset();
      showFormAcknowledgmentModal({
        type: 'volunteer',
        name: fullName,
        trackingId: data.trackingId,
        role: preferredRole,
        city: city
      });
    } else if (res.status === 429) {
      showToast('Application submission limit reached. Please try again later.', 'danger', 6000);
    } else if (res.status === 503 || data.code === 'SERVICE_UNAVAILABLE') {
      showToast('Submission unavailable: Volunteer desk processing is offline. Please email volunteer@trinetragargifoundation.org directly.', 'danger', 7000);
    } else if (res.status === 400) {
      showToast(data.error || 'Please correct the highlighted fields and retry.', 'warning');
    } else {
      showToast(data.error || 'Unable to register volunteer application.', 'danger');
    }
  } catch (err) {
    showToast('Network error: Could not reach application gateway. Please check your connection.', 'danger');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = originalBtnHTML;
    }
  }
}'''
    content = content.replace(vol_submit_old.group(0), vol_submit_new)

# 4. Update handleCsrFormSubmit with validation & modal
csr_submit_old = re.search(r'async function handleCsrFormSubmit\(event\) \{[\s\S]*?\n\}', content)
if csr_submit_old:
    csr_submit_new = '''async function handleCsrFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

  const honeypot = form.querySelector('input[name="honeypot_fax"]')?.value || '';
  const companyName = form.querySelector('input[name="companyName"], #csrCompanyName')?.value?.trim() || '';
  const contactPersonName = form.querySelector('input[name="contactPersonName"], #csrContactPerson')?.value?.trim() || '';
  const officialEmail = form.querySelector('input[name="officialEmail"], #csrEmail')?.value?.trim() || '';
  const phone = form.querySelector('input[name="phone"], #csrPhone')?.value?.trim() || '';
  const budgetRange = form.querySelector('select[name="budgetRange"], #csrBudgetRange')?.value || 'under-5-lakhs';
  const targetPillar = form.querySelector('select[name="targetPillar"], #csrTargetPillar')?.value || 'education';
  const message = form.querySelector('textarea[name="message"], #csrMessage')?.value?.trim() || 'Corporate CSR Partnership Consultation Request';

  if (!companyName || companyName.length < 2) {
    showToast('Please enter your organization / enterprise name.', 'warning');
    form.querySelector('input[name="companyName"], #csrCompanyName')?.focus();
    return;
  }
  if (!contactPersonName || contactPersonName.length < 2) {
    showToast('Please enter the contact person / CSR lead name.', 'warning');
    form.querySelector('input[name="contactPersonName"], #csrContactPerson')?.focus();
    return;
  }
  if (!officialEmail || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(officialEmail)) {
    showToast('Please enter a valid official corporate email.', 'warning');
    form.querySelector('input[name="officialEmail"], #csrEmail')?.focus();
    return;
  }
  const cleanPhone = phone ? phone.replace(/\\D/g, '').slice(-10) : '';
  if (!cleanPhone || cleanPhone.length < 10) {
    showToast('Please provide a valid contact telephone number.', 'warning');
    form.querySelector('input[name="phone"], #csrPhone')?.focus();
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.innerHTML = `
      <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></span>
      <span>Scheduling Consultation...</span>
    `;
  }

  try {
    const payload = {
      companyName,
      contactPersonName,
      officialEmail,
      phone: cleanPhone,
      partnershipType: 'csr-grant',
      targetPillar,
      budgetRange,
      message,
      honeypot_fax: honeypot
    };

    const res = await fetch('/api/partnership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      form.reset();
      showFormAcknowledgmentModal({
        type: 'csr',
        name: contactPersonName,
        company: companyName,
        trackingId: data.trackingId,
        budget: budgetRange,
        pillar: targetPillar
      });
    } else if (res.status === 429) {
      showToast('Enquiry submission limit reached. Please try again later.', 'danger', 6000);
    } else if (res.status === 503 || data.code === 'SERVICE_UNAVAILABLE') {
      showToast('Submission unavailable: Partnership desk is offline. Please email partnerships@trinetragargifoundation.org directly.', 'danger', 7000);
    } else if (res.status === 400) {
      showToast(data.error || 'Please correct your details and try again.', 'warning');
    } else {
      showToast(data.error || 'Unable to register corporate inquiry.', 'danger');
    }
  } catch (err) {
    showToast('Network error: Unable to connect to partnership desk. Please try again.', 'danger');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = originalBtnHTML;
    }
  }
}'''
    content = content.replace(csr_submit_old.group(0), csr_submit_new)

# 5. Update handleContactFormSubmit with validation & modal
contact_submit_old = re.search(r'async function handleContactFormSubmit\(event\) \{[\s\S]*?\n\}', content)
if contact_submit_old:
    contact_submit_new = '''async function handleContactFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

  const honeypot = form.querySelector('input[name="honeypot_url"]')?.value || '';
  const fullName = form.querySelector('input[name="fullName"], #contactFullName')?.value?.trim() || '';
  const email = form.querySelector('input[name="email"], #contactEmail')?.value?.trim() || '';
  const phone = form.querySelector('input[name="phone"], #contactPhone')?.value?.trim() || '';
  const inquiryType = form.querySelector('select[name="inquiryType"], #contactInquiryType')?.value || 'general';
  const message = form.querySelector('textarea[name="message"], #contactMessage')?.value?.trim() || '';

  if (!fullName || fullName.length < 2) {
    showToast('Please enter your full legal name (minimum 2 characters).', 'warning');
    form.querySelector('input[name="fullName"], #contactFullName')?.focus();
    return;
  }
  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.', 'warning');
    form.querySelector('input[name="email"], #contactEmail')?.focus();
    return;
  }
  if (!message || message.length < 10) {
    showToast('Please provide your query message (minimum 10 characters).', 'warning');
    form.querySelector('textarea[name="message"], #contactMessage')?.focus();
    return;
  }

  const cleanPhone = phone ? phone.replace(/\\D/g, '').slice(-10) : '';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.innerHTML = `
      <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></span>
      <span>Sending Message...</span>
    `;
  }

  try {
    const payload = {
      fullName,
      email,
      inquiryType,
      message,
      honeypot_url: honeypot
    };
    if (cleanPhone) payload.phone = cleanPhone;

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      form.reset();
      showFormAcknowledgmentModal({
        type: 'contact',
        name: fullName,
        trackingId: data.trackingId,
        inquiryType: inquiryType
      });
    } else if (res.status === 429) {
      showToast('Contact limit reached. For immediate emergencies, please call 1098 or 112 directly.', 'danger', 6000);
    } else if (res.status === 503 || data.code === 'SERVICE_UNAVAILABLE') {
      showToast('Submission unavailable: Contact desk is offline. Please email info@trinetragargifoundation.org directly.', 'danger', 7000);
    } else if (res.status === 400) {
      showToast(data.error || 'Please correct your details and try again.', 'warning');
    } else {
      showToast(data.error || 'Unable to submit contact message. Please try again.', 'danger');
    }
  } catch (err) {
    showToast('Network error: Unable to contact assistance desk. Please verify your connection.', 'danger');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = originalBtnHTML;
    }
  }
}'''
    content = content.replace(contact_submit_old.group(0), contact_submit_new)

# 6. Update handleDonationReceiptSubmit with strict client validation
donation_submit_old = re.search(r'async function handleDonationReceiptSubmit\(event\) \{[\s\S]*?\n\}', content)
if donation_submit_old:
    donation_submit_new = '''async function handleDonationReceiptSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

  const honeypot = form.querySelector('input[name="honeypot_title"]')?.value || '';
  const donorName = form.querySelector('input[name="donorName"]')?.value?.trim() || '';
  const donorEmail = form.querySelector('input[name="donorEmail"]')?.value?.trim() || '';
  const donorPhone = form.querySelector('input[name="donorPhone"]')?.value?.trim() || '';
  const amountPaid = Number(form.querySelector('input[name="amountPaid"]')?.value) || 0;
  const paymentMode = form.querySelector('select[name="paymentMode"]')?.value || 'upi-qr';
  const transactionRefNo = form.querySelector('input[name="transactionRefNo"]')?.value?.trim() || '';
  const donorPAN = form.querySelector('input[name="donorPAN"]')?.value?.trim().toUpperCase() || '';
  const postalAddress = form.querySelector('textarea[name="postalAddress"], input[name="postalAddress"]')?.value?.trim() || '';

  // Client-side Validation
  if (!donorName || donorName.length < 2) {
    showToast('Please enter your full legal name (minimum 2 characters).', 'warning');
    form.querySelector('input[name="donorName"]')?.focus();
    return;
  }
  if (!donorEmail || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(donorEmail)) {
    showToast('Please enter a valid email address for receipt transmission.', 'warning');
    form.querySelector('input[name="donorEmail"]')?.focus();
    return;
  }
  const cleanPhone = donorPhone ? donorPhone.replace(/\\D/g, '').slice(-10) : '';
  if (!cleanPhone || !/^[6-9]\\d{9}$/.test(cleanPhone)) {
    showToast('Please enter a valid 10-digit Indian mobile number.', 'warning');
    form.querySelector('input[name="donorPhone"]')?.focus();
    return;
  }
  if (!amountPaid || amountPaid < 100) {
    showToast('Minimum contribution amount is ₹100.', 'warning');
    form.querySelector('input[name="amountPaid"]')?.focus();
    return;
  }
  if (!transactionRefNo || transactionRefNo.length < 6) {
    showToast('Please enter the 12-digit UPI reference (UTR) or bank transaction ID.', 'warning');
    form.querySelector('input[name="transactionRefNo"]')?.focus();
    return;
  }
  if (donorPAN && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(donorPAN)) {
    showToast('Invalid PAN format (e.g. ABCDE1234F).', 'warning');
    form.querySelector('input[name="donorPAN"]')?.focus();
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.innerHTML = `
      <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></span>
      <span>Submitting Details...</span>
    `;
  }

  try {
    const payload = {
      donorName,
      donorEmail,
      donorPhone: cleanPhone,
      amountPaid,
      paymentMode,
      transactionRefNo,
      honeypot_title: honeypot
    };
    if (donorPAN) payload.donorPAN = donorPAN;
    if (postalAddress) payload.postalAddress = postalAddress;

    const res = await fetch('/api/donation-receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      form.reset();
      showDonationAcknowledgmentModal({
        name: donorName,
        amount: amountPaid,
        trackingId: data.trackingId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    } else if (res.status === 429) {
      showToast('Receipt request limit reached. Please try again in an hour.', 'danger', 6000);
    } else if (res.status === 503 || data.code === 'SERVICE_UNAVAILABLE') {
      showToast('Accounts desk is offline. Please email accounts@trinetragargifoundation.org directly with your transaction UTR.', 'danger', 7000);
    } else if (res.status === 400) {
      showToast(data.error || 'Please correct your details and try again.', 'warning');
    } else {
      showToast(data.error || 'Unable to register donation receipt request.', 'danger');
    }
  } catch (err) {
    showToast('Network error: Unable to contact receipt desk. Please verify your connection.', 'danger');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = originalBtnHTML;
    }
  }
}'''
    content = content.replace(donation_submit_old.group(0), donation_submit_new)

# 7. Add showFormAcknowledgmentModal to window globals
if 'window.showFormAcknowledgmentModal = showFormAcknowledgmentModal;' not in content:
    content = content.replace('window.copyToClipboard = copyToClipboard;', 'window.copyToClipboard = copyToClipboard;\nwindow.showFormAcknowledgmentModal = showFormAcknowledgmentModal;')

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("main.js successfully upgraded with enhanced validation, modals, and dockets!")
