# -*- coding: utf-8 -*-
"""
Script to safely enhance form workability, validation, and accessibility across Trinetra ORG
"""
import re

def update_volunteer_partner():
    with open('volunteer-partner.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update volunteer form fields
    # Look for volunteerIntakeForm
    old_vol_pattern = r'(<form id="volunteerIntakeForm"[^>]*>[\s\S]*?)(<button class="inline-flex[^>]*type="submit">)'
    m = re.search(old_vol_pattern, content)
    if not m:
        print("volunteerIntakeForm not found!")
        return

    vol_section = m.group(1)

    # Replace volunteer inputs with explicit IDs and names
    vol_section_updated = vol_section
    vol_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Full Legal Name \*</label>\s*<input name="fullName"[^>]*/>',
        '<label for="volunteerFullName" class="text-label-md font-label-md text-[#172033] font-semibold">Full Legal Name *</label>\n<input id="volunteerFullName" name="fullName" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="e.g. Priyanshu Sharma" required="" type="text"/>',
        vol_section_updated
    )
    vol_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Phone / WhatsApp Number \*</label>\s*<input[^>]*placeholder="\+91 98765 43210"[^>]*/>',
        '<label for="volunteerPhone" class="text-label-md font-label-md text-[#172033] font-semibold">Phone / WhatsApp Number *</label>\n<input id="volunteerPhone" name="phone" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="+91 98765 43210" required="" type="tel"/>',
        vol_section_updated
    )
    vol_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Email Address \*</label>\s*<input[^>]*placeholder="priyanshu@example\.com"[^>]*/>',
        '<label for="volunteerEmail" class="text-label-md font-label-md text-[#172033] font-semibold">Email Address *</label>\n<input id="volunteerEmail" name="email" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="priyanshu@example.com" required="" type="email"/>',
        vol_section_updated
    )
    vol_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">City &amp; District \*</label>\s*<input[^>]*placeholder="e\.g\. South West Delhi / Varanasi"[^>]*/>',
        '<label for="volunteerCity" class="text-label-md font-label-md text-[#172033] font-semibold">City &amp; District *</label>\n<input id="volunteerCity" name="city" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="e.g. South West Delhi / Varanasi" required="" type="text"/>',
        vol_section_updated
    )
    vol_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Primary Area of Interest \*</label>\s*<select[^>]*>',
        '<label for="volunteerRole" class="text-label-md font-label-md text-[#172033] font-semibold">Primary Area of Interest *</label>\n<select id="volunteerRole" name="preferredRole" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md bg-white" required="">',
        vol_section_updated
    )
    vol_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Weekly Availability \*</label>\s*<select[^>]*>',
        '<label for="volunteerAvailability" class="text-label-md font-label-md text-[#172033] font-semibold">Weekly Availability *</label>\n<select id="volunteerAvailability" name="weeklyAvailabilityHours" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md bg-white" required="">',
        vol_section_updated
    )
    vol_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Academic / Professional Background \*</label>\s*<input[^>]*placeholder="e\.g\. 4th year[^"]*"[^>]*/>',
        '<label for="volunteerSkills" class="text-label-md font-label-md text-[#172033] font-semibold">Academic / Professional Background *</label>\n<input id="volunteerSkills" name="skillsAndBackground" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="e.g. 4th year B.A. LL.B student at NLU Delhi, or Senior Software Developer at Infosys" required="" type="text"/>',
        vol_section_updated
    )
    vol_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Motivation Statement[^<]*\*</label>\s*<textarea[^>]*>',
        '<label for="volunteerMessage" class="text-label-md font-label-md text-[#172033] font-semibold">Motivation Statement (Briefly share why you want to serve) *</label>\n<textarea id="volunteerMessage" name="message" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="Describe past civic exposure or personal conviction..." required="" rows="3">',
        vol_section_updated
    )

    content = content.replace(vol_section, vol_section_updated)

    # 2. Update CSR form fields
    old_csr_pattern = r'(<form id="csrIntakeForm"[^>]*>[\s\S]*?)(<button class="inline-flex[^>]*type="submit">)'
    m2 = re.search(old_csr_pattern, content)
    if not m2:
        print("csrIntakeForm not found!")
        return

    csr_section = m2.group(1)
    csr_section_updated = csr_section
    csr_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Organization / Enterprise Name \*</label>\s*<input[^>]*placeholder="e\.g\. Tata Steel[^"]*"[^>]*/>',
        '<label for="csrCompanyName" class="text-label-md font-label-md text-[#172033] font-semibold">Organization / Enterprise Name *</label>\n<input id="csrCompanyName" name="companyName" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="e.g. Tata Steel / Mahindra Foundation" required="" type="text"/>',
        csr_section_updated
    )
    csr_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">CSR Lead / Contact Person Name \*</label>\s*<input[^>]*placeholder="e\.g\. Ananya Sen[^"]*"[^>]*/>',
        '<label for="csrContactPerson" class="text-label-md font-label-md text-[#172033] font-semibold">CSR Lead / Contact Person Name *</label>\n<input id="csrContactPerson" name="contactPersonName" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="e.g. Ananya Sen, Head of CSR" required="" type="text"/>',
        csr_section_updated
    )
    csr_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Official Corporate Email \*</label>\s*<input[^>]*placeholder="ananya\.sen@company\.com"[^>]*/>',
        '<label for="csrEmail" class="text-label-md font-label-md text-[#172033] font-semibold">Official Corporate Email *</label>\n<input id="csrEmail" name="officialEmail" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="ananya.sen@company.com" required="" type="email"/>',
        csr_section_updated
    )
    csr_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Direct Telephone Number \*</label>\s*<input[^>]*placeholder="\+91 22 6123 4567"[^>]*/>',
        '<label for="csrPhone" class="text-label-md font-label-md text-[#172033] font-semibold">Direct Telephone Number *</label>\n<input id="csrPhone" name="phone" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="+91 22 6123 4567" required="" type="tel"/>',
        csr_section_updated
    )
    csr_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Annual CSR Budget Range \(INR\) \*</label>\s*<select[^>]*>',
        '<label for="csrBudgetRange" class="text-label-md font-label-md text-[#172033] font-semibold">Annual CSR Budget Range (INR) *</label>\n<select id="csrBudgetRange" name="budgetRange" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md bg-white" required="">',
        csr_section_updated
    )
    csr_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Preferred Thematic Area \*</label>\s*<select[^>]*>',
        '<label for="csrTargetPillar" class="text-label-md font-label-md text-[#172033] font-semibold">Preferred Thematic Area *</label>\n<select id="csrTargetPillar" name="targetPillar" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md bg-white" required="">',
        csr_section_updated
    )
    csr_section_updated = re.sub(
        r'<label class="text-label-md font-label-md text-\[#172033\] font-semibold">Project Specifications &amp; Target Geography \(Optional\)</label>\s*<textarea[^>]*>',
        '<label for="csrMessage" class="text-label-md font-label-md text-[#172033] font-semibold">Project Specifications &amp; Target Geography (Optional)</label>\n<textarea id="csrMessage" name="message" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-marigold-bright focus:border-marigold-bright text-body-md font-body-md" placeholder="Provide geographical focus (state/district) or special board mandates..." rows="3">',
        csr_section_updated
    )

    content = content.replace(csr_section, csr_section_updated)

    with open('volunteer-partner.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("volunteer-partner.html successfully updated!")

def update_index_bank_info():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace hardcoded bank account and ifsc with TBD - Foundation to provide
    content = content.replace('42890100098757', 'TBD - Foundation to provide')
    content = content.replace('SBIN0031852', 'TBD - Foundation to provide')
    content = content.replace('SBI Specialized Institutional Branch, Jaipur', 'TBD - Foundation to provide')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("index.html bank wire info updated to TBD per AGENTS.md rule 4!")

if __name__ == '__main__':
    update_volunteer_partner()
    update_index_bank_info()
