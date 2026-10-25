import os
from PIL import Image, ImageDraw, ImageFont

ROOT = r'd:\Trinetra ORG'

DIRS = {
    'guides': os.path.join(ROOT, 'images', 'guides'),
    'donate': os.path.join(ROOT, 'images', 'donate'),
    'stories': os.path.join(ROOT, 'images', 'stories'),
    'about': os.path.join(ROOT, 'images', 'about'),
    'reports': os.path.join(ROOT, 'images', 'reports')
}

for d in DIRS.values():
    os.makedirs(d, exist_ok=True)

def get_font(name, size, bold=False):
    font_file = name
    if bold:
        if name == 'georgia': font_file = 'georgiab.ttf'
        elif name == 'arial': font_file = 'arialbd.ttf'
        elif name == 'calibri': font_file = 'calibrib.ttf'
        elif name == 'segoeui': font_file = 'segoeuib.ttf'
    else:
        if name == 'georgia': font_file = 'georgia.ttf'
        elif name == 'arial': font_file = 'arial.ttf'
        elif name == 'calibri': font_file = 'calibri.ttf'
        elif name == 'segoeui': font_file = 'segoeui.ttf'
        elif name == 'symbol': font_file = 'seguisym.ttf'
    
    path = os.path.join(r'C:\Windows\Fonts', font_file)
    if os.path.exists(path):
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()

# -------------------------------------------------------------
# 1. REFINED CITIZEN RIGHTS GUIDE COVERS (600x850)
# -------------------------------------------------------------
def make_guide_cover(filename, theme_color, bg_color2, tag_text, title_main, subtitle, act_text, seal_text, bullet_points):
    w, h = 600, 850
    im = Image.new('RGB', (w, h), bg_color2)
    draw = ImageDraw.Draw(im)

    # Gradient background
    for y in range(h):
        factor = y / h
        r = int(theme_color[0] + (bg_color2[0] - theme_color[0]) * factor)
        g = int(theme_color[1] + (bg_color2[1] - theme_color[1]) * factor)
        b = int(theme_color[2] + (bg_color2[2] - theme_color[2]) * factor)
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    # Outer decorative gold border
    draw.rectangle([18, 18, w - 18, h - 18], outline=(245, 158, 11), width=2)
    draw.rectangle([24, 24, w - 24, h - 24], outline=(255, 255, 255, 70), width=1)
    
    for cx, cy in [(24, 24), (w-24, 24), (24, h-24), (w-24, h-24)]:
        draw.rectangle([cx-6, cy-6, cx+6, cy+6], fill=(245, 158, 11))

    # Top Tag
    draw.rounded_rectangle([45, 45, w - 45, 80], radius=6, fill=(0, 0, 0, 110), outline=(245, 158, 11), width=1)
    draw.text((w // 2, 62), tag_text, font=get_font('segoeui', 12, bold=True), fill=(253, 230, 138), anchor='mm')

    # Header
    draw.text((w // 2, 110), "TRINETRA GARGI FOUNDATION", font=get_font('georgia', 18, bold=True), fill=(255, 255, 255), anchor='mm')
    draw.text((w // 2, 132), "SECTION 8 PUBLIC ADVOCACY & CITIZEN LITIGATION DOSSIER", font=get_font('calibri', 11, bold=True), fill=(203, 213, 225), anchor='mm')
    draw.line([(60, 155), (w - 60, 155)], fill=(245, 158, 11), width=2)

    # Main Titles
    draw.text((w // 2, 215), title_main, font=get_font('georgia', 32, bold=True), fill=(255, 255, 255), anchor='mm')
    draw.text((w // 2, 265), subtitle, font=get_font('georgia', 20, bold=True), fill=(253, 230, 138), anchor='mm')

    # Act Box
    draw.rounded_rectangle([50, 310, w - 50, 375], radius=10, fill=(0, 0, 0, 100), outline=(255, 255, 255, 70), width=1)
    draw.text((w // 2, 332), "STATUTORY LEGAL AUTHORITY", font=get_font('calibri', 11, bold=True), fill=(251, 191, 36), anchor='mm')
    draw.text((w // 2, 355), act_text, font=get_font('segoeui', 13, bold=False), fill=(241, 245, 249), anchor='mm')

    # Central Embellished Seal (Geometric vector drawing)
    cy_mid = 480
    draw.ellipse([w//2 - 65, cy_mid - 65, w//2 + 65, cy_mid + 65], fill=(0, 0, 0, 90), outline=(245, 158, 11), width=3)
    draw.ellipse([w//2 - 56, cy_mid - 56, w//2 + 56, cy_mid + 56], outline=(255, 255, 255, 100), width=1)
    
    # Draw star or scales motif
    draw.text((w // 2, cy_mid - 8), seal_text, font=get_font('georgia', 22, bold=True), fill=(254, 240, 138), anchor='mm')
    draw.text((w // 2, cy_mid + 20), "OFFICIAL GUIDE", font=get_font('calibri', 10, bold=True), fill=(226, 232, 240), anchor='mm')

    # Bullet points with vector checkmark icons
    y_bullet = 585
    for bp in bullet_points:
        # Draw check circle
        draw.ellipse([65, y_bullet - 10, 85, y_bullet + 10], fill=(245, 158, 11))
        draw.line([(70, y_bullet), (74, y_bullet + 4), (80, y_bullet - 4)], fill=(15, 23, 42), width=2)
        draw.text((100, y_bullet), bp, font=get_font('segoeui', 13, bold=True), fill=(255, 255, 255), anchor='lm')
        y_bullet += 35

    # Bottom Footer Strip
    draw.line([(45, 765), (w - 45, 765)], fill=(245, 158, 11), width=1)
    draw.text((60, 795), "PUBLIC DOMAIN • NON-COMMERCIAL ADVOCACY", font=get_font('calibri', 11, bold=True), fill=(203, 213, 225), anchor='lm')
    draw.text((60, 815), "Rajasthan Grassroots Legal Aid · DCPU & CWC Aligned", font=get_font('calibri', 11, bold=False), fill=(148, 163, 184), anchor='lm')
    
    # Barcode
    bx = w - 170
    draw.rectangle([bx, 780, bx + 120, 825], fill=(255, 255, 255))
    for b_line in range(bx + 8, bx + 112, 4):
        draw.line([(b_line, 785), (b_line, 815)], fill=(0, 0, 0), width=2 if (b_line % 3 == 0) else 1)

    out_path = os.path.join(DIRS['guides'], filename)
    im.save(out_path, 'WEBP', quality=88)
    print(f"Generated Guide: {filename} ({os.path.getsize(out_path)//1024} KB)")

make_guide_cover(
    'guide-child-labour.webp',
    (127, 29, 29), (50, 8, 8),
    "STATUTORY SAFEGUARDING PROTOCOL • ACT 61 OF 1986",
    "CHILD LABOUR",
    "Reporting & Enforcement Manual",
    "Child & Adolescent Labour (Prohibition & Regulation) Act",
    "LEGAL AID",
    [
        "Hazardous Occupation Schedule & Factory Checks",
        "Mandatory 24/7 Childline 1098 & Police 112 Protocol",
        "Step-by-Step CWC Physical Safe-Custody Orders",
        "Zero File Storage Whistleblower Identity Shield"
    ]
)

make_guide_cover(
    'guide-pocso.webp',
    (15, 23, 42), (2, 6, 23),
    "LEGAL IMMUNITY & CITIZEN REPORTING • ACT 32 OF 2012",
    "POCSO ACT 2012",
    "Citizen & Informant Pocket Handbook",
    "Protection of Children from Sexual Offences Act, 2012",
    "POCSO 2012",
    [
        "Section 19: Mandatory Reporting Duties for Citizens",
        "Complete Legal Immunity for Good-Faith Informants",
        "Trauma-Informed Child Disclosure Guidelines",
        "Special Court Timelines & Compensation Framework"
    ]
)

make_guide_cover(
    'guide-rte.webp',
    (6, 78, 59), (2, 44, 34),
    "RIGHT TO EDUCATION • 25% PRIVATE SCHOOL QUOTA",
    "RTE SECTION 12(1)(c)",
    "Free Admission & Lottery Manual",
    "The Right of Children to Free and Compulsory Education Act",
    "RTE 25%",
    [
        "Eligibility Criteria: EWS & Disadvantaged Groups",
        "Rajasthan State Online Lottery Application Steps",
        "Mandatory Income, Caste & Residence Certificates",
        "Zero-Fee Protection from Nursery to Grade 8"
    ]
)

make_guide_cover(
    'guide-women-rights.webp',
    (88, 28, 135), (45, 6, 80),
    "STATUTORY GENDER PROTECTION • ACT 43 OF 2005",
    "WOMEN'S LEGAL RIGHTS",
    "Domestic Violence & Entitlement Handbook",
    "Protection of Women from Domestic Violence Act (PWDVA)",
    "WOMEN 181",
    [
        "Right to Shared Household & Residence Orders",
        "Emergency Maintenance & Child Custody Relief",
        "24/7 Women Helpline (181) Linkage Protocol",
        "Free State Legal Services Authority (DLSA) Access"
    ]
)

make_guide_cover(
    'guide-cyber-safety.webp',
    (30, 41, 59), (15, 23, 42),
    "DIGITAL DEFENSE & PRIVACY • IT ACT 2000 & DPDP",
    "CYBER HYGIENE",
    "Adolescent Safety & Fraud Defense",
    "Information Technology Act & National Cyber Crime (1930)",
    "CYBER 1930",
    [
        "Preventing Online Impersonation & Cyberbullying",
        "Financial OTP Fraud & Phishing Defense Rules",
        "Reporting to National Cyber Crime Portal (1930)",
        "Social Media Privacy Lockdown for Students"
    ]
)

# -------------------------------------------------------------
# 2. REFINED DONATION TIER VISUALS (800x520)
# -------------------------------------------------------------
def make_donation_tier(filename, amount_str, title_str, subtitle_str, items_list, base_src_img):
    w, h = 800, 520
    base = Image.open(base_src_img).resize((w, h), Image.Resampling.LANCZOS)
    
    # Scrim overlay for 100% legibility top and bottom
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)
    
    # Top scrim
    for y in range(180):
        alpha = int(210 * (1.0 - (y / 180)))
        draw_ov.line([(0, y), (w, y)], fill=(15, 23, 42, alpha))
        
    # Bottom card scrim
    for y in range(160, h):
        alpha = int(235 * ((y - 160) / (h - 160)))
        draw_ov.line([(0, y), (w, y)], fill=(15, 23, 42, alpha))

    im = Image.alpha_composite(base.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(im)

    # Top Pill Badge
    draw.rounded_rectangle([40, 25, 250, 60], radius=8, fill=(154, 52, 18), outline=(245, 158, 11), width=1)
    draw.text((145, 42), "TANGIBLE IMPACT TIER", font=get_font('calibri', 12, bold=True), fill=(255, 255, 255), anchor='mm')

    # Amount & Title
    draw.text((40, 95), amount_str, font=get_font('georgia', 36, bold=True), fill=(245, 158, 11), anchor='lm')
    draw.text((40, 138), title_str, font=get_font('georgia', 22, bold=True), fill=(255, 255, 255), anchor='lm')
    draw.text((40, 170), subtitle_str, font=get_font('segoeui', 13, bold=False), fill=(226, 232, 240), anchor='lm')

    # Checklist Container
    y_box = 210
    draw.rounded_rectangle([40, y_box, w - 40, h - 35], radius=12, fill=(0, 0, 0, 190), outline=(245, 158, 11), width=1)
    
    draw.text((60, y_box + 26), "DIRECT FIELD PROCUREMENT CHECKLIST:", font=get_font('calibri', 11, bold=True), fill=(251, 191, 36), anchor='lm')
    
    y_item = y_box + 62
    for item in items_list:
        # Vector green checkmark badge
        draw.ellipse([60, y_item - 9, 78, y_item + 9], fill=(16, 185, 129))
        draw.line([(64, y_item), (68, y_item + 4), (74, y_item - 3)], fill=(255, 255, 255), width=2)
        
        draw.text((90, y_item), item, font=get_font('segoeui', 13, bold=True), fill=(255, 255, 255), anchor='lm')
        y_item += 32

    # Verification Seal
    draw.text((w - 55, h - 50), "Section 8 Audited Fiduciary Trail • 100% Direct Field Deployment", font=get_font('calibri', 10, bold=True), fill=(203, 213, 225), anchor='rm')

    out_path = os.path.join(DIRS['donate'], filename)
    im.save(out_path, 'WEBP', quality=88)
    print(f"Generated Donation Tier: {filename} ({os.path.getsize(out_path)//1024} KB)")

make_donation_tier(
    'tier-600.webp',
    '₹600',
    'Back-to-School Learning Kit',
    'Equips one rescued child with everything needed for their first formal school term.',
    [
        'Durable water-resistant school backpack + 6 subject-ruled notebooks',
        'Mathematical geometry box, blue/black ballpoint pens & eraser set',
        'Primary school uniform fabric tailored to government school standards',
        'Foundational Hindi alphabet & arithmetic home study flashcards'
    ],
    os.path.join(ROOT, 'images', 'pillars', 'pillar-education.webp')
)

make_donation_tier(
    'tier-1200.webp',
    '₹1,200',
    'Remedial Bridge Education & Daily Nutrition',
    'Funds 1 month of accelerated remedial schooling to bridge dropout academic gaps.',
    [
        '30 Days of evening remedial tutoring with certified community mentors',
        'Daily wholesome nutritious midday snack (chana, jaggery, fortified milk)',
        'Quarterly pediatric growth, vision & hemoglobin screening',
        'RTE Section 12(1)(c) private school lottery admission documentation'
    ],
    os.path.join(ROOT, 'images', 'pillars', 'pillar-education.webp')
)

make_donation_tier(
    'tier-3600.webp',
    '₹3,600',
    '3-Month Family Emergency Food Security',
    'Eliminates the acute hunger shock that forces impoverished parents to send children to work.',
    [
        '60 kg Whole wheat flour (Chakki Atta) + 30 kg Basmati rice',
        '15 kg Nutritious pulses (Arhar, Chana & Masoor dal)',
        '6 Litres Pure pressed mustard cooking oil + iodized salt + pure jaggery',
        'Emergency family medical consultation & primary health van linkage'
    ],
    os.path.join(ROOT, 'images', 'pillars', 'pillar-family.webp')
)

make_donation_tier(
    'tier-12000.webp',
    '₹12,000',
    '1-Year Certified Youth Vocational Apprenticeship',
    'Sponsors a youth (ages 16–21) through certified NSDC technical training with job placement.',
    [
        'Accredited IT hardware maintenance, mobile repair & electronics curriculum',
        'Complete personal technician toolkit (digital multimeter, soldering kit, testers)',
        'NASSCOM / State Skill Mission examination registration fees sponsored',
        'Dedicated corporate placement mentorship with 87% formal job success rate'
    ],
    os.path.join(ROOT, 'images', 'pillars', 'pillar-skills.webp')
)

print("\n=== REFINED ASSETS RE-GENERATED SUCCESSFULLY ===")
