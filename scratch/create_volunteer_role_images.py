import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

ROOT = r'd:\Trinetra ORG'
OUT_DIR = os.path.join(ROOT, 'images', 'volunteer')
os.makedirs(OUT_DIR, exist_ok=True)

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

def process_volunteer_card(base_image_path, out_filename, role_code, role_title, subtitle, accent_color, badge_text):
    w, h = 800, 450 # 16:9 cinematic ratio
    
    # 1. Load and crop base image
    if os.path.exists(base_image_path):
        base = Image.open(base_image_path).convert('RGB')
        # Smart crop to w:h ratio (800:450)
        target_ratio = w / h
        base_ratio = base.width / base.height
        if base_ratio > target_ratio:
            new_w = int(base.height * target_ratio)
            left = (base.width - new_w) // 2
            base = base.crop((left, 0, left + new_w, base.height))
        else:
            new_h = int(base.width / target_ratio)
            top = (base.height - new_h) // 2
            base = base.crop((0, top, base.width, top + new_h))
        base = base.resize((w, h), Image.Resampling.LANCZOS)
    else:
        # Fallback rich gradient canvas
        base = Image.new('RGB', (w, h), (23, 37, 84))
        draw_b = ImageDraw.Draw(base)
        for y in range(h):
            r = int(23 + (154 - 23) * (y / h))
            g = int(37 + (52 - 37) * (y / h))
            b = int(84 + (18 - 84) * (y / h))
            draw_b.line([(0, y), (w, y)], fill=(r, g, b))

    # Enhance color warmth and contrast for non-profit documentary aesthetic
    enhancer = ImageEnhance.Color(base)
    base = enhancer.enhance(1.12)
    contrast = ImageEnhance.Contrast(base)
    base = contrast.enhance(1.06)

    # 2. Add cinematic documentary gradient vignette
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d_over = ImageDraw.Draw(overlay)
    
    # Top subtle vignette
    for y in range(70):
        alpha = int(85 * (1 - y / 70))
        d_over.line([(0, y), (w, y)], fill=(15, 23, 42, alpha))
        
    # Bottom solid dark gradient for crisp typography
    gradient_h = 170
    for y in range(h - gradient_h, h):
        ratio = (y - (h - gradient_h)) / gradient_h
        alpha = int(225 * (ratio ** 1.35))
        d_over.line([(0, y), (w, y)], fill=(11, 19, 41, alpha))

    base = Image.alpha_composite(base.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(base)

    # 3. Top-left Pill Badge (Role Code & Category)
    pill_w, pill_h = 164, 34
    pill_x, pill_y = 24, 20
    
    # Pill background
    draw.rounded_rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + pill_h], radius=17, fill=(11, 19, 41, 220), outline=accent_color, width=2)
    # Circle indicator with accent
    draw.ellipse([pill_x + 7, pill_y + 7, pill_x + 27, pill_y + 27], fill=accent_color)
    # Role code in circle
    draw.text((pill_x + 17, pill_y + 17), role_code, font=get_font('calibri', 12, bold=True), fill=(11, 19, 41), anchor='mm')
    # Role label in pill
    draw.text((pill_x + 92, pill_y + 17), "ROLE " + role_code, font=get_font('calibri', 12, bold=True), fill=(255, 255, 255), anchor='mm')

    # Top-right category badge
    badge_font = get_font('calibri', 11, bold=True)
    badge_w = int(draw.textlength(badge_text, font=badge_font)) + 24
    badge_x = w - 24 - badge_w
    draw.rounded_rectangle([badge_x, pill_y, badge_x + badge_w, pill_y + pill_h], radius=17, fill=(11, 19, 41, 200), outline=(255, 255, 255, 130), width=1)
    draw.text((badge_x + badge_w // 2, pill_y + 17), badge_text, font=badge_font, fill=(241, 245, 249), anchor='mm')

    # 4. Bottom subtle vignette for HTML overlay legibility
    # Note: Text is dynamically rendered via HTML for maximum crispness and accessibility
    # out_path saving
    out_path = os.path.join(OUT_DIR, out_filename)
    base.save(out_path, 'WEBP', quality=92)
    print(f"Created: {out_path} ({os.path.getsize(out_path)} bytes)")

# Role 1: Weekend Bridge School Mentor
process_volunteer_card(
    base_image_path=os.path.join(ROOT, 'images', 'pillars', 'pillar-education.webp'),
    out_filename='role-bridge-mentor.webp',
    role_code='01',
    role_title='Weekend Bridge School Mentor',
    subtitle='Foundational numeracy, literacy & remedial street education',
    accent_color=(245, 158, 11), # Saffron Amber
    badge_text='BRIDGE PEDAGOGY'
)

# Role 2: Community Paralegal & Scheme Volunteer
process_volunteer_card(
    base_image_path=os.path.join(ROOT, 'images', 'pillars', 'pillar-health.webp'),
    out_filename='role-paralegal-volunteer.webp',
    role_code='02',
    role_title='Community Paralegal Volunteer',
    subtitle='Doorstep document audit, SSY & RTE 25% quota filing',
    accent_color=(16, 185, 129), # Emerald Green
    badge_text='CIVIC ENTITLEMENT'
)

# Role 3: Child Rights & Safe Custody Advocate
process_volunteer_card(
    base_image_path=os.path.join(ROOT, 'images', 'pillars', 'pillar-protection.webp'),
    out_filename='role-child-rights-advocate.webp',
    role_code='03',
    role_title='Child Rights & Safe Custody Advocate',
    subtitle='CWC guardianship drafting, POCSO legal casework & standing counsel',
    accent_color=(99, 102, 241), # Legal Indigo
    badge_text='STATUTORY DEFENSE'
)

# Role 4: Digital Literacy & Skill Center Tutor
process_volunteer_card(
    base_image_path=os.path.join(ROOT, 'images', 'pillars', 'pillar-skills.webp'),
    out_filename='role-digital-literacy-tutor.webp',
    role_code='04',
    role_title='Digital Literacy & Skill Tutor',
    subtitle='Computer labs, cyber safety hygiene & youth vocational tracks',
    accent_color=(15, 118, 110), # Teal Accent
    badge_text='DIGITAL EMPOWERMENT'
)

print("All 4 volunteer role images generated successfully!")
