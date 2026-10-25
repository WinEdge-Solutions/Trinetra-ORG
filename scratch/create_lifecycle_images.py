import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

ROOT = r'd:\Trinetra ORG'
OUT_DIR = os.path.join(ROOT, 'images', 'lifecycle')
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

def process_lifecycle_card(base_image_path, out_filename, stage_num, stage_title, subtitle, accent_color, badge_text):
    w, h = 800, 500
    
    # 1. Load and crop base image
    if os.path.exists(base_image_path):
        base = Image.open(base_image_path).convert('RGB')
        # Smart crop to w:h ratio (800:500)
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
        # Fallback gradient canvas
        base = Image.new('RGB', (w, h), (23, 37, 84))
        draw_b = ImageDraw.Draw(base)
        for y in range(h):
            r = int(23 + (154 - 23) * (y / h))
            g = int(37 + (52 - 37) * (y / h))
            b = int(84 + (18 - 84) * (y / h))
            draw_b.line([(0, y), (w, y)], fill=(r, g, b))

    # Enhance warmth and color slightly for rich documentary aesthetic
    enhancer = ImageEnhance.Color(base)
    base = enhancer.enhance(1.12)
    contrast = ImageEnhance.Contrast(base)
    base = contrast.enhance(1.05)

    # 2. Add subtle cinematic documentary gradient vignette
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d_over = ImageDraw.Draw(overlay)
    
    # Top subtle vignette
    for y in range(80):
        alpha = int(90 * (1 - y / 80))
        d_over.line([(0, y), (w, y)], fill=(15, 23, 42, alpha))
        
    # Bottom solid dark gradient for crisp text readability
    for y in range(h - 180, h):
        ratio = (y - (h - 180)) / 180
        alpha = int(220 * (ratio ** 1.3))
        d_over.line([(0, y), (w, y)], fill=(15, 23, 42, alpha))

    base = Image.alpha_composite(base.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(base)

    # 3. Top pill badge (Stage Number & Accent)
    pill_w, pill_h = 160, 36
    pill_x, pill_y = 28, 24
    
    # Pill background
    draw.rounded_rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + pill_h], radius=18, fill=(15, 23, 42, 210), outline=accent_color, width=2)
    # Circle indicator
    draw.ellipse([pill_x + 8, pill_y + 8, pill_x + 28, pill_y + 28], fill=accent_color)
    # Stage number in circle
    draw.text((pill_x + 18, pill_y + 18), stage_num, font=get_font('calibri', 13, bold=True), fill=(15, 23, 42), anchor='mm')
    # Stage label in pill
    draw.text((pill_x + 90, pill_y + 18), "STAGE " + stage_num, font=get_font('calibri', 13, bold=True), fill=(255, 255, 255), anchor='mm')

    # Top right category badge
    badge_font = get_font('calibri', 11, bold=True)
    badge_w = int(draw.textlength(badge_text, font=badge_font)) + 24
    badge_x = w - 28 - badge_w
    draw.rounded_rectangle([badge_x, pill_y, badge_x + badge_w, pill_y + pill_h], radius=18, fill=(15, 23, 42, 190), outline=(255, 255, 255, 120), width=1)
    draw.text((badge_x + badge_w // 2, pill_y + 18), badge_text, font=badge_font, fill=(241, 245, 249), anchor='mm')

    # 4. Bottom typography
    bot_y = h - 68
    draw.text((28, bot_y), stage_title, font=get_font('georgia', 26, bold=True), fill=(255, 255, 255))
    draw.text((28, bot_y + 36), subtitle, font=get_font('calibri', 14), fill=(203, 213, 225))

    # Save as high-quality WebP
    out_path = os.path.join(OUT_DIR, out_filename)
    base.save(out_path, 'WEBP', quality=92)
    print(f"Created: {out_path} ({os.path.getsize(out_path)} bytes)")

# Stage 1: Identification & Mapping
process_lifecycle_card(
    base_image_path=os.path.join(ROOT, 'images', 'stories', 'event-conclave.webp'),
    out_filename='stage-1-identification.webp',
    stage_num='01',
    stage_title='Identification & Ground Mapping',
    subtitle='Surveillance across brick kilns, tea stalls & informal settlements',
    accent_color=(245, 158, 11), # Radiant Amber
    badge_text='FIELD SURVEILLANCE'
)

# Stage 2: Rescue & Legal Safe-Custody
process_lifecycle_card(
    base_image_path=os.path.join(ROOT, 'images', 'pillars', 'pillar-protection.webp'),
    out_filename='stage-2-rescue.webp',
    stage_num='02',
    stage_title='Rescue & Legal Safe-Custody',
    subtitle='Joint taskforce raids with Police & statutory Child Welfare Committees',
    accent_color=(239, 68, 68), # Emergency Crimson
    badge_text='LEGAL SAFEGUARD'
)

# Stage 3: Bridge Rehabilitation
process_lifecycle_card(
    base_image_path=os.path.join(ROOT, 'images', 'pillars', 'pillar-education.webp'),
    out_filename='stage-3-rehabilitation.webp',
    stage_num='03',
    stage_title='Bridge Rehabilitation',
    subtitle='Accelerated learning centres, trauma counseling & pediatric nutrition',
    accent_color=(245, 158, 11), # Saffron Amber
    badge_text='REMEDIAL PEDAGOGY'
)

# Stage 4: Mainstream Integration
process_lifecycle_card(
    base_image_path=os.path.join(ROOT, 'images', 'pillars', 'pillar-skills.webp'),
    out_filename='stage-4-integration.webp',
    stage_num='04',
    stage_title='Mainstream Integration',
    subtitle='Formal school admission & vocational trades with 3-year safety checks',
    accent_color=(16, 185, 129), # Emerald Green
    badge_text='ACADEMIC AUTONOMY'
)

print("All 4 lifecycle images generated successfully!")
