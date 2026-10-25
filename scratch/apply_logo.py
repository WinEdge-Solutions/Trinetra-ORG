import os, re

files = [
    'index.html',
    'about.html',
    'our-work.html',
    'government-schemes.html',
    'stories-events.html',
    'volunteer-partner.html',
    'help-report.html'
]

header_svg_pattern = re.compile(
    r'<div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/35 flex items-center justify-center text-primary group-hover:border-amber-500 group-hover:scale-105 transition-all shadow-xs shrink-0">\s*<svg.*?</svg>\s*</div>',
    re.DOTALL
)

header_replacement = '''<div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 border border-amber-500/35 flex items-center justify-center p-1 group-hover:border-amber-500 group-hover:scale-105 transition-all shadow-xs shrink-0">
        <img src="logo-symbol.webp" alt="Trinetra Gargi Foundation Logo" class="w-full h-full object-contain" width="40" height="40" />
      </div>'''

footer_pattern = re.compile(
    r'<div class="w-9 h-9 rounded-xl bg-gradient-to-br from-highlight-amber-soft to-marigold-bright/30 flex items-center justify-center text-primary border border-marigold-bright/40">\s*<span class="material-symbols-outlined text-xl">wb_sunny</span>\s*</div>',
    re.DOTALL
)

footer_replacement = '''<div class="w-10 h-10 rounded-xl bg-white/90 dark:bg-stone-800/90 p-1 flex items-center justify-center text-primary border border-amber-500/35 shadow-xs shrink-0">
            <img src="logo-symbol.webp" alt="Trinetra Gargi Foundation Logo" class="w-full h-full object-contain" width="40" height="40" />
          </div>'''

favicon_tags = '''  <link rel="icon" type="image/png" href="favicon.png" />
  <link rel="apple-touch-icon" href="favicon-192.png" />
</head>'''

for fname in files:
    if not os.path.exists(fname):
        continue
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Header logo
    content, h_count = header_svg_pattern.subn(header_replacement, content)
    
    # 2. Footer logo
    content, f_count = footer_pattern.subn(footer_replacement, content)
    
    # 3. Favicon in head
    if 'href="favicon.png"' not in content:
        content = content.replace('</head>', favicon_tags)
    
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname}: replaced header={h_count}, footer={f_count}')

# Update main.js
main_js = 'main.js'
with open(main_js, 'r', encoding='utf-8') as f:
    js_content = f.read()

js_target = '<div class="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center font-bold text-xs shadow-xs">TG</div>'
js_replacement = '<div class="w-9 h-9 rounded-xl bg-white border border-amber-500/30 flex items-center justify-center p-1 shadow-xs"><img src="logo-symbol.webp" alt="Trinetra Gargi Foundation Logo" class="w-full h-full object-contain" /></div>'

if js_target in js_content:
    js_content = js_content.replace(js_target, js_replacement)
    with open(main_js, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print('main.js: mobile nav drawer logo updated')
