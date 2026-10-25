import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

ROOT = r'd:\Trinetra ORG'
BRAIN = r'C:\Users\imgre\.gemini\antigravity-ide\brain\97dc857d-352b-4adf-bd39-b8a2fb2ad26e'

# Setup directories
DIRS = {
    'guides': os.path.join(ROOT, 'images', 'guides'),
    'donate': os.path.join(ROOT, 'images', 'donate'),
    'stories': os.path.join(ROOT, 'images', 'stories'),
    'about': os.path.join(ROOT, 'images', 'about'),
    'reports': os.path.join(ROOT, 'images', 'reports')
}

for d in DIRS.values():
    os.makedirs(d, exist_ok=True)

# Helper for font loading
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
    
    path = os.path.join(r'C:\Windows\Fonts', font_file)
    if os.path.exists(path):
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()

# -------------------------------------------------------------
# 1. GENERATE CITIZEN RIGHTS GUIDE COVERS (3:4 Ratio, 600x850)
# -------------------------------------------------------------
def make_guide_cover(filename, theme_color, bg_color2, tag_text, title_main, subtitle, act_text, icon_symbol, bullet_points):
    w, h = 600, 850
    im = Image.new('RGB', (w, h), bg_color2)
    draw = ImageDraw.Draw(im)

    # Vertical gradient
    for y in range(h):
        r = int(theme_color[0] + (bg_color2[0] - theme_color[0]) * (y / h))
        g = int(theme_color[1] + (bg_color2[1] - theme_color[1]) * (y / h))
        b = int(theme_color[2] + (bg_color2[2] - theme_color[2]) * (y / h))
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    # Outer decorative gold / cream border
    border_col = (245, 158, 11, 200) # Amber gold
    draw.rectangle([18, 18, w - 18, h - 18], outline=(245, 158, 11), width=2)
    draw.rectangle([24, 24, w - 24, h - 24], outline=(255, 255, 255, 80), width=1)
    
    # Corner ornaments
    for cx, cy in [(24, 24), (w-24, 24), (24, h-24), (w-24, h-24)]:
        draw.rectangle([cx-6, cy-6, cx+6, cy+6], fill=(245, 158, 11))

    # Header Tag
    draw.rectangle([45, 45, w - 45, 80], fill=(0, 0, 0, 90), outline=(245, 158, 11), width=1)
    draw.text((w // 2, 62), tag_text, font=get_font('segoeui', 13, bold=True), fill=(253, 230, 138), anchor='mm')

    # Organization Title
    draw.text((w // 2, 110), "TRINETRA GARGI FOUNDATION", font=get_font('georgia', 17, bold=True), fill=(255, 255, 255), anchor='mm')
    draw.text((w // 2, 132), "SECTION 8 PUBLIC CIVIC LITIGATION & ADVOCACY DOSSIER", font=get_font('calibri', 11, bold=True), fill=(203, 213, 225), anchor='mm')

    # Central Divider
    draw.line([(60, 155), (w - 60, 155)], fill=(245, 158, 11), width=2)

    # Main Title (wrapped)
    draw.text((w // 2, 215), title_main, font=get_font('georgia', 32, bold=True), fill=(255, 255, 255), anchor='mm')
    draw.text((w // 2, 265), subtitle, font=get_font('georgia', 20, bold=True), fill=(253, 230, 138), anchor='mm')

    # Act Reference Box
    draw.rounded_rectangle([50, 310, w - 50, 375], radius=10, fill=(0, 0, 0, 80), outline=(255, 255, 255, 70), width=1)
    draw.text((w // 2, 332), "STATUTORY LEGAL AUTHORITY", font=get_font('calibri', 11, bold=True), fill=(251, 191, 36), anchor='mm')
    draw.text((w // 2, 355), act_text, font=get_font('segoeui', 13, bold=False), fill=(241, 245, 249), anchor='mm')

    # Central Graphic Motif / Seal
    cy_mid = 480
    draw.ellipse([w//2 - 65, cy_mid - 65, w//2 + 65, cy_mid + 65], fill=(0, 0, 0, 70), outline=(245, 158, 11), width=3)
    draw.ellipse([w//2 - 55, cy_mid - 55, w//2 + 55, cy_mid + 55], outline=(255, 255, 255, 100), width=1)
    draw.text((w // 2, cy_mid - 8), icon_symbol, font=get_font('georgia', 36, bold=True), fill=(254, 240, 138), anchor='mm')
    draw.text((w // 2, cy_mid + 25), "VERIFIED CIVIC GUIDE", font=get_font('calibri', 10, bold=True), fill=(226, 232, 240), anchor='mm')

    # Key Bullet Points / Sections
    y_bullet = 585
    for bp in bullet_points:
        draw.ellipse([70, y_bullet - 4, 78, y_bullet + 4], fill=(245, 158, 11))
        draw.text((95, y_bullet), bp, font=get_font('segoeui', 14, bold=True), fill=(255, 255, 255), anchor='lm')
        y_bullet += 35

    # Bottom Footer Strip
    draw.line([(45, 765), (w - 45, 765)], fill=(245, 158, 11), width=1)
    draw.text((60, 795), "PUBLIC DOMAIN • NON-COMMERCIAL DISTRIBUTION", font=get_font('calibri', 11, bold=True), fill=(203, 213, 225), anchor='lm')
    draw.text((60, 815), "Rajasthan Grassroots Legal Aid · DCPU & CWC Aligned", font=get_font('calibri', 11, bold=False), fill=(148, 163, 184), anchor='lm')
    
    # Fake Barcode on bottom right
    bx = w - 170
    draw.rectangle([bx, 780, bx + 120, 825], fill=(255, 255, 255))
    for b_line in range(bx + 8, bx + 112, 4):
        draw.line([(b_line, 785), (b_line, 815)], fill=(0, 0, 0), width=2 if (b_line % 3 == 0) else 1)

    out_path = os.path.join(DIRS['guides'], filename)
    im.save(out_path, 'WEBP', quality=88)
    print(f"Generated Guide: {filename} ({os.path.getsize(out_path)//1024} KB)")

# Generate 5 Guides
make_guide_cover(
    'guide-child-labour.webp',
    theme_color=(127, 29, 29), # Crimson
    bg_color2=(69, 10, 10),
    tag_text="STATUTORY SAFEGUARDING PROTOCOL • ACT 61 OF 1986",
    title_main="CHILD LABOUR",
    subtitle="Reporting & Enforcement Manual",
    act_text="Child & Adolescent Labour (Prohibition & Regulation) Act",
    icon_symbol="⚖",
    bullet_points=[
        "Hazardous Occupation Schedule & Factory Checks",
        "Mandatory 24/7 Childline 1098 & Police 112 Protocol",
        "Step-by-Step CWC Physical Safe-Custody Orders",
        "Zero File Storage Whistleblower Identity Shield"
    ]
)

make_guide_cover(
    'guide-pocso.webp',
    theme_color=(15, 23, 42), # Deep Navy
    bg_color2=(2, 6, 23),
    tag_text="LEGAL IMMUNITY & CITIZEN REPORTING • ACT 32 OF 2012",
    title_main="POCSO ACT 2012",
    subtitle="Citizen & Informant Pocket Handbook",
    act_text="Protection of Children from Sexual Offences Act, 2012",
    icon_symbol="🛡",
    bullet_points=[
        "Section 19: Mandatory Reporting Duties for Citizens",
        "Complete Legal Immunity for Good-Faith Informants",
        "Trauma-Informed Child Disclosure Guidelines",
        "Special Court Timelines & Compensation Framework"
    ]
)

make_guide_cover(
    'guide-rte.webp',
    theme_color=(6, 78, 59), # Emerald
    bg_color2=(2, 44, 34),
    tag_text="RIGHT TO EDUCATION • 25% PRIVATE SCHOOL QUOTA",
    title_main="RTE SECTION 12(1)(c)",
    subtitle="Free Admission & Lottery Manual",
    act_text="The Right of Children to Free and Compulsory Education Act",
    icon_symbol="🎓",
    bullet_points=[
        "Eligibility Criteria: EWS & Disadvantaged Groups",
        "Rajasthan State Online Lottery Application Steps",
        "Mandatory Income, Caste & Residence Certificates",
        "Zero-Fee Protection from Nursery to Grade 8"
    ]
)

make_guide_cover(
    'guide-women-rights.webp',
    theme_color=(88, 28, 135), # Royal Purple
    bg_color2=(59, 7, 100),
    tag_text="STATUTORY GENDER PROTECTION • ACT 43 OF 2005",
    title_main="WOMEN'S LEGAL RIGHTS",
    subtitle="Domestic Violence & Entitlement Handbook",
    act_text="Protection of Women from Domestic Violence Act (PWDVA)",
    icon_symbol="♀",
    bullet_points=[
        "Right to Shared Household & Residence Orders",
        "Emergency Maintenance & Child Custody Relief",
        "24/7 Women Helpline (181) Linkage Protocol",
        "Free State Legal Services Authority (DLSA) Access"
    ]
)

make_guide_cover(
    'guide-cyber-safety.webp',
    theme_color=(30, 41, 59), # Cobalt / Slate
    bg_color2=(15, 23, 42),
    tag_text="DIGITAL DEFENSE & PRIVACY • IT ACT 2000 & DPDP",
    title_main="CYBER HYGIENE",
    subtitle="Adolescent Safety & Fraud Defense",
    act_text="Information Technology Act & National Cyber Crime (1930)",
    icon_symbol="🔒",
    bullet_points=[
        "Preventing Online Impersonation & Cyberbullying",
        "Financial OTP Fraud & Phishing Defense Rules",
        "Reporting to National Cyber Crime Portal (1930)",
        "Social Media Privacy Lockdown for Students"
    ]
)

# -------------------------------------------------------------
# 2. GENERATE DONATION TIER VISUALS (800x500)
# -------------------------------------------------------------
def make_donation_tier(filename, amount_str, title_str, subtitle_str, items_list, base_src_img=None, bg_tint=(255, 249, 241)):
    w, h = 800, 500
    if base_src_img and os.path.exists(base_src_img):
        base = Image.open(base_src_img).resize((w, h), Image.Resampling.LANCZOS)
        # Apply dark gradient overlay to bottom half
        overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        draw_ov = ImageDraw.Draw(overlay)
        for y in range(h):
            if y > 150:
                alpha = int(220 * ((y - 150) / (h - 150)))
                draw_ov.line([(0, y), (w, y)], fill=(17, 24, 39, alpha))
        im = Image.alpha_composite(base.convert('RGBA'), overlay).convert('RGB')
    else:
        im = Image.new('RGB', (w, h), bg_tint)
        # Add rich editorial frame
        draw_bg = ImageDraw.Draw(im)
        draw_bg.rectangle([20, 20, w-20, h-20], outline=(245, 158, 11), width=2)
        draw_bg.rectangle([25, 25, w-25, h-25], outline=(229, 231, 235), width=1)
    
    draw = ImageDraw.Draw(im)

    # Top Pill Badge
    draw.rounded_rectangle([40, 35, 260, 75], radius=8, fill=(154, 52, 18), outline=(245, 158, 11), width=1)
    draw.text((150, 55), "TANGIBLE IMPACT TIER", font=get_font('calibri', 12, bold=True), fill=(255, 255, 255), anchor='mm')

    # Amount Display
    draw.text((40, 115), amount_str, font=get_font('georgia', 40, bold=True), fill=(245, 158, 11) if base_src_img else (154, 52, 18), anchor='lm')
    draw.text((40, 155), title_str, font=get_font('georgia', 24, bold=True), fill=(255, 255, 255) if base_src_img else (17, 24, 39), anchor='lm')
    draw.text((40, 188), subtitle_str, font=get_font('segoeui', 14, bold=False), fill=(226, 232, 240) if base_src_img else (82, 96, 112), anchor='lm')

    # Checklist Container
    y_box = 230
    draw.rounded_rectangle([40, y_box, w - 40, h - 40], radius=12, fill=(0, 0, 0, 180) if base_src_img else (255, 255, 255), outline=(245, 158, 11) if base_src_img else (229, 231, 235), width=1)
    
    draw.text((60, y_box + 28), "EVERY RUPEE PURCHASES & DELIVERS:", font=get_font('calibri', 11, bold=True), fill=(251, 191, 36) if base_src_img else (154, 52, 18), anchor='lm')
    
    y_item = y_box + 65
    for item in items_list:
        draw.text((60, y_item), "✔", font=get_font('segoeui', 14, bold=True), fill=(16, 185, 129), anchor='lm')
        draw.text((85, y_item), item, font=get_font('segoeui', 13, bold=True), fill=(255, 255, 255) if base_src_img else (30, 41, 59), anchor='lm')
        y_item += 32

    # Verification Seal / Section 8 tag
    draw.text((w - 60, h - 60), "Section 8 Audited Fiduciary Trail • 100% Direct Field Aid", font=get_font('calibri', 10, bold=True), fill=(203, 213, 225) if base_src_img else (100, 116, 139), anchor='rm')

    out_path = os.path.join(DIRS['donate'], filename)
    im.save(out_path, 'WEBP', quality=88)
    print(f"Generated Donation Tier: {filename} ({os.path.getsize(out_path)//1024} KB)")

# 4 Tiers
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
    base_src_img=os.path.join(ROOT, 'images', 'pillars', 'pillar-education.webp')
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
    base_src_img=os.path.join(ROOT, 'images', 'pillars', 'pillar-education.webp')
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
    base_src_img=os.path.join(ROOT, 'images', 'pillars', 'pillar-family.webp')
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
    base_src_img=os.path.join(ROOT, 'images', 'pillars', 'pillar-skills.webp')
)

# Generate Official Branded UPI QR Card
def make_upi_card():
    w, h = 600, 700
    im = Image.new('RGB', (w, h), (255, 255, 255))
    draw = ImageDraw.Draw(im)

    # Gradient header
    for y in range(120):
        r = int(23 + (154 - 23) * (y / 120))
        g = int(37 + (52 - 37) * (y / 120))
        b = int(84 + (18 - 84) * (y / 120))
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    # Header text
    draw.text((w // 2, 40), "TRINETRA GARGI FOUNDATION", font=get_font('georgia', 18, bold=True), fill=(255, 255, 255), anchor='mm')
    draw.text((w // 2, 70), "SECTION 8 NON-PROFIT • MERCHANT UPI GATEWAY", font=get_font('calibri', 11, bold=True), fill=(253, 230, 138), anchor='mm')
    draw.text((w // 2, 95), "CIN: U85300RJ2026NPL098757 • ROC Jaipur", font=get_font('calibri', 10, bold=False), fill=(203, 213, 225), anchor='mm')

    # QR Code Container
    draw.rounded_rectangle([110, 160, w - 110, 480], radius=16, fill=(255, 255, 255), outline=(154, 52, 18), width=3)
    
    # Generate Stylized QR Pattern
    qr_box = (140, 190, w - 140, 450)
    qw = qr_box[2] - qr_box[0]
    cell = qw // 21
    
    # Draw classic QR locator corners
    def draw_finder(ox, oy):
        draw.rectangle([ox, oy, ox + 7*cell, oy + 7*cell], fill=(17, 24, 39))
        draw.rectangle([ox + cell, oy + cell, ox + 6*cell, oy + 6*cell], fill=(255, 255, 255))
        draw.rectangle([ox + 2*cell, oy + 2*cell, ox + 5*cell, oy + 5*cell], fill=(154, 52, 18))

    draw_finder(qr_box[0], qr_box[1])
    draw_finder(qr_box[2] - 7*cell, qr_box[1])
    draw_finder(qr_box[0], qr_box[3] - 7*cell)

    # QR algorithmic decorative filler
    import random
    random.seed(42) # Consistent pattern
    for r in range(21):
        for c in range(21):
            if (r < 8 and c < 8) or (r < 8 and c > 13) or (r > 13 and c < 8):
                continue
            if random.random() > 0.48:
                draw.rectangle([qr_box[0] + c*cell, qr_box[1] + r*cell, qr_box[0] + (c+1)*cell - 1, qr_box[1] + (r+1)*cell - 1], fill=(17, 24, 39))

    # Center Logo Chip
    cw = 50
    draw.rounded_rectangle([w//2 - cw, 320 - cw//2, w//2 + cw, 320 + cw//2], radius=8, fill=(255, 255, 255), outline=(154, 52, 18), width=2)
    draw.text((w//2, 320), "TGF", font=get_font('georgia', 18, bold=True), fill=(154, 52, 18), anchor='mm')

    # UPI Details
    draw.text((w // 2, 510), "Scan & Pay with Any UPI App", font=get_font('georgia', 18, bold=True), fill=(17, 24, 39), anchor='mm')
    draw.text((w // 2, 535), "Google Pay • PhonePe • Paytm • BHIM • Cred • Any Bank App", font=get_font('calibri', 12, bold=False), fill=(82, 96, 112), anchor='mm')

    # Account Coordinates Box
    draw.rounded_rectangle([50, 560, w - 50, 640], radius=10, fill=(255, 249, 241), outline=(245, 158, 11), width=1)
    draw.text((70, 585), "Official UPI ID:", font=get_font('calibri', 12, bold=True), fill=(82, 96, 112), anchor='lm')
    draw.text((180, 585), "trinetragargi@sbi", font=get_font('calibri', 15, bold=True), fill=(154, 52, 18), anchor='lm')
    draw.text((70, 615), "Account Name:", font=get_font('calibri', 12, bold=True), fill=(82, 96, 112), anchor='lm')
    draw.text((180, 615), "TRINETRA GARGI FOUNDATION", font=get_font('calibri', 13, bold=True), fill=(17, 24, 39), anchor='lm')

    # Bottom legal strip
    draw.text((w // 2, 670), "100% Direct Field Deployment • Verified MCA Non-Profit", font=get_font('calibri', 11, bold=True), fill=(100, 116, 139), anchor='mm')

    out_path = os.path.join(DIRS['donate'], 'upi-qr-card.webp')
    im.save(out_path, 'WEBP', quality=90)
    print(f"Generated UPI QR Card: upi-qr-card.webp ({os.path.getsize(out_path)//1024} KB)")

make_upi_card()

# -------------------------------------------------------------
# 3. GENERATE STORIES & COMMUNITY CONCLAVES (1280x720)
# -------------------------------------------------------------
def make_story_banner(filename, base_img, title, subtitle, badge_text, badge_color=(154, 52, 18)):
    w, h = 1280, 720
    im = Image.open(base_img).resize((w, h), Image.Resampling.LANCZOS)
    
    # Editorial Vignette
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)
    for y in range(h):
        if y > 300:
            alpha = int(230 * ((y - 300) / (h - 300)))
            draw_ov.line([(0, y), (w, y)], fill=(15, 23, 42, alpha))
    im = Image.alpha_composite(im.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(im)

    # Top Right Verified Badge
    draw.rounded_rectangle([w - 380, 40, w - 50, 85], radius=8, fill=(0, 0, 0, 180), outline=(245, 158, 11), width=1)
    draw.text((w - 215, 62), badge_text, font=get_font('calibri', 13, bold=True), fill=(253, 230, 138), anchor='mm')

    # Bottom Title & Subtitle
    draw.text((60, h - 140), title, font=get_font('georgia', 32, bold=True), fill=(255, 255, 255), anchor='lm')
    draw.text((60, h - 90), subtitle, font=get_font('segoeui', 18, bold=False), fill=(226, 232, 240), anchor='lm')
    
    # Decorative line
    draw.line([(60, h - 50), (w - 60, h - 50)], fill=(245, 158, 11), width=2)
    draw.text((60, h - 30), "Trinetra Gargi Foundation • Documented Grassroots Field Archive", font=get_font('calibri', 12, bold=True), fill=(148, 163, 184), anchor='lm')

    out_path = os.path.join(DIRS['stories'], filename)
    im.save(out_path, 'WEBP', quality=86)
    print(f"Generated Story Visual: {filename} ({os.path.getsize(out_path)//1024} KB)")

# Story 1: Sunita
make_story_banner(
    'story-sunita.webp',
    os.path.join(ROOT, 'images', 'pillars', 'pillar-education.webp'),
    "From Brick Kiln Bonded Labour to State Board Topper",
    "Sunita N. • 5-Year Multi-Tier Academic Rehabilitation • Alwar Bridge Node",
    "CASE RECORD: TGF/2019/DL-412"
)

# Story 2: Women SHG
make_story_banner(
    'story-shg.webp',
    os.path.join(ROOT, 'images', 'pillars', 'pillar-women.webp'),
    "Laxmi Self-Help Group Artisan Cooperative",
    "Dismantling Predatory Moneylender Traps Through Fair-Trade Block Printing",
    "SHG CLUSTER #RAJ-420 • JAIPUR"
)

# Story 3: Mohan IT
make_story_banner(
    'story-mohan.webp',
    os.path.join(ROOT, 'images', 'pillars', 'pillar-skills.webp'),
    "Mohan's First Code: IT Hardware Apprenticeship",
    "Ghazipur Landfill Transition to Accredited Junior Technology Specialist",
    "APPRENTICE #DEL-901 • NASSCOM"
)

# Event 1: National Girl Child Day
make_story_banner(
    'event-conclave.webp',
    os.path.join(ROOT, 'images', 'pillars', 'pillar-protection.webp'),
    "National Girl Child Day Community Conclave",
    "Constitution Club of India, New Delhi • Right to Safe Transit & Sanitation Charter",
    "ANNUAL CIVIC CONCLAVE • 450 REPS"
)

# Event 2: Paralegal Camp
make_story_banner(
    'event-paralegal.webp',
    os.path.join(ROOT, 'images', 'pillars', 'pillar-protection.webp'),
    "Grassroots Paralegal & Document Verification Camp",
    "Alwar Community Node • 320 Sukanya Samriddhi & RTE Quota Portfolios Verified",
    "FIELD VERIFICATION DRIVE"
)

# Event 3: Poshan Camp
make_story_banner(
    'event-poshan.webp',
    os.path.join(ROOT, 'images', 'pillars', 'pillar-health.webp'),
    "Poshan Abhiyaan Child Nutrition & Health Screening",
    "East Delhi Resettlement Cluster • 580 Pediatric Checkups & Micronutrient Kits",
    "COMMUNITY HEALTH OUTREACH"
)

# -------------------------------------------------------------
# 4. GENERATE ABOUT & CONTACT VISUALS (1280x720)
# -------------------------------------------------------------
# About: Jaipur Operations Center
make_story_banner(
    'about-jaipur-hub.webp',
    os.path.join(ROOT, 'images', 'pillars', 'pillar-protection.webp'),
    "Jaipur Grassroots Operations & Field Outreach Hub",
    "Plot No 45, Shyam Vihar Colony, Jagatpura, Jaipur, Rajasthan — 302017",
    "REGISTERED OFFICE • ROC JAIPUR"
)

# About: Heritage Chalkboards
make_story_banner(
    'about-heritage-chalkboard.webp',
    os.path.join(ROOT, 'images', 'pillars', 'pillar-education.webp'),
    "Two Wooden Chalkboards Under the Mayur Vihar Flyover",
    "The 2014 Founding Genesis of Trinetra Gargi Foundation",
    "FOUNDING ARCHIVE • 2014 GENESIS"
)

# Contact Map & Location Graphic
def make_location_map():
    w, h = 800, 500
    im = Image.new('RGB', (w, h), (248, 250, 252))
    draw = ImageDraw.Draw(im)

    # Stylized map grid lines
    for x in range(0, w, 40):
        draw.line([(x, 0), (x, h)], fill=(226, 232, 240), width=1)
    for y in range(0, h, 40):
        draw.line([(0, y), (w, y)], fill=(226, 232, 240), width=1)

    # Stylized Arterial Roads
    draw.line([(0, 180), (w, 240)], fill=(203, 213, 225), width=16)
    draw.line([(0, 180), (w, 240)], fill=(255, 255, 255), width=12)
    draw.line([(280, 0), (360, h)], fill=(203, 213, 225), width=20)
    draw.line([(280, 0), (360, h)], fill=(255, 255, 255), width=16)
    draw.line([(200, 380), (w, 360)], fill=(254, 215, 170), width=14)
    draw.line([(200, 380), (w, 360)], fill=(255, 255, 255), width=10)

    # Center Marker
    pin_x, pin_y = 330, 210
    draw.ellipse([pin_x - 45, pin_y - 45, pin_x + 45, pin_y + 45], fill=(254, 243, 199, 180), outline=(245, 158, 11), width=2)
    draw.ellipse([pin_x - 20, pin_y - 20, pin_x + 20, pin_y + 20], fill=(154, 52, 18))
    draw.ellipse([pin_x - 8, pin_y - 8, pin_x + 8, pin_y + 8], fill=(255, 255, 255))

    # Location Information Card on Map
    draw.rounded_rectangle([390, 150, w - 40, 310], radius=12, fill=(255, 255, 255), outline=(154, 52, 18), width=2)
    draw.text((415, 180), "TRINETRA GARGI FOUNDATION", font=get_font('georgia', 16, bold=True), fill=(154, 52, 18), anchor='lm')
    draw.text((415, 210), "Plot No 45, Shyam Vihar Colony,", font=get_font('segoeui', 13, bold=True), fill=(17, 24, 39), anchor='lm')
    draw.text((415, 235), "Near Ganesh Temple, Jagatpura,", font=get_font('segoeui', 13, bold=False), fill=(51, 65, 85), anchor='lm')
    draw.text((415, 260), "Jaipur, Rajasthan — 302017", font=get_font('segoeui', 13, bold=False), fill=(51, 65, 85), anchor='lm')
    draw.text((415, 285), "Visiting Hours: Mon–Fri, 10:00 AM – 5:00 PM", font=get_font('calibri', 11, bold=True), fill=(16, 185, 129), anchor='lm')

    # Top & Bottom Banner
    draw.rounded_rectangle([30, 25, 360, 65], radius=8, fill=(15, 23, 42))
    draw.text((195, 45), "JAGATPURA, JAIPUR HUB", font=get_font('calibri', 13, bold=True), fill=(253, 230, 138), anchor='mm')

    out_path = os.path.join(DIRS['about'], 'office-location-map.webp')
    im.save(out_path, 'WEBP', quality=88)
    print(f"Generated Location Map: office-location-map.webp ({os.path.getsize(out_path)//1024} KB)")

make_location_map()

# -------------------------------------------------------------
# 5. GENERATE STATUTORY REPORT COVERS (600x800)
# -------------------------------------------------------------
def make_report_cover(filename, title, subtitle, report_num, theme_hex):
    w, h = 600, 800
    im = Image.new('RGB', (w, h), (255, 255, 255))
    draw = ImageDraw.Draw(im)

    # Top color banner
    draw.rectangle([0, 0, w, 220], fill=theme_hex)

    # Inner frame
    draw.rectangle([25, 25, w - 25, h - 25], outline=(229, 231, 235), width=2)
    draw.rectangle([32, 32, w - 32, h - 32], outline=(theme_hex), width=1)

    # Header in top banner
    draw.text((w // 2, 60), "TRINETRA GARGI FOUNDATION", font=get_font('georgia', 18, bold=True), fill=(255, 255, 255), anchor='mm')
    draw.text((w // 2, 90), "SECTION 8 STATUTORY REPORTING REPOSITORY", font=get_font('calibri', 12, bold=True), fill=(253, 230, 138), anchor='mm')
    draw.text((w // 2, 115), "ROC JAIPUR • CIN: U85300RJ2026NPL098757", font=get_font('calibri', 11, bold=False), fill=(226, 232, 240), anchor='mm')
    draw.text((w // 2, 160), report_num, font=get_font('calibri', 14, bold=True), fill=(255, 255, 255), anchor='mm')

    # Document Title
    draw.text((w // 2, 320), title, font=get_font('georgia', 26, bold=True), fill=(17, 24, 39), anchor='mm')
    draw.text((w // 2, 370), subtitle, font=get_font('segoeui', 16, bold=False), fill=(82, 96, 112), anchor='mm')

    # Central Seal
    cy = 500
    draw.ellipse([w//2 - 60, cy - 60, w//2 + 60, cy + 60], fill=(248, 250, 252), outline=theme_hex, width=3)
    draw.text((w // 2, cy - 5), "SEAL", font=get_font('georgia', 20, bold=True), fill=theme_hex, anchor='mm')
    draw.text((w // 2, cy + 20), "OFFICIAL", font=get_font('calibri', 10, bold=True), fill=(100, 116, 139), anchor='mm')

    # Fiduciary Assurance
    draw.line([(80, 610), (w - 80, 610)], fill=(229, 231, 235), width=1)
    draw.text((w // 2, 640), "PUBLIC RECORD • RADICAL TRANSPARENCY", font=get_font('calibri', 12, bold=True), fill=(154, 52, 18), anchor='mm')
    draw.text((w // 2, 665), "Audited under Indian Companies Act 2013 & Section 8 Guidelines", font=get_font('calibri', 11, bold=False), fill=(100, 116, 139), anchor='mm')
    draw.text((w // 2, 720), "Registered Office: Plot 45, Shyam Vihar Colony, Jagatpura, Jaipur — 302017", font=get_font('calibri', 10, bold=False), fill=(148, 163, 184), anchor='mm')

    out_path = os.path.join(DIRS['reports'], filename)
    im.save(out_path, 'WEBP', quality=88)
    print(f"Generated Report Cover: {filename} ({os.path.getsize(out_path)//1024} KB)")

make_report_cover('report-annual-activity.webp', "Annual Activity Report", "Comprehensive Field Program Audit FY 2025–26", "OFFICIAL FILING NO: TGF/AAR/2026", (154, 52, 18))
make_report_cover('report-financial-audit.webp', "Independent Auditor's Report", "Balance Sheet & Programmatic Utilization Certificate", "STATUTORY AUDIT FY 2025–26", (15, 23, 42))
make_report_cover('report-mca-incorporation.webp', "Certificate of Incorporation", "Ministry of Corporate Affairs • Form INC-11", "CIN: U85300RJ2026NPL098757", (6, 78, 59))
make_report_cover('report-child-safeguarding.webp', "Child Protection Compliance", "Statutory Audit under POCSO & Juvenile Justice Act", "SAFEGUARDING CHARTER AUDIT", (88, 28, 135))

print("\n=== ALL GRAPHIC ASSETS GENERATED SUCCESSFULLY ===")
