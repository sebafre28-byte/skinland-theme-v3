import sys, json, numpy as np
from PIL import Image, ImageDraw, ImageFilter
S = 1600
def escena_prueba(path):
    rng = np.random.default_rng(3)
    bg = Image.new('RGB', (S, S), (240, 236, 230)); d = ImageDraw.Draw(bg)
    for y in range(S):  # degradado suave
        t = y / S; d.line([(0, y), (S, y)], fill=(int(243 - 8*t), int(239 - 9*t), int(233 - 10*t)))
    slots = []
    for cx, top, w in [(330, 1030, 400), (800, 1090, 440), (1270, 1010, 400)]:
        pod = Image.new('RGBA', (S, S), (0, 0, 0, 0)); pd = ImageDraw.Draw(pod)
        pd.rounded_rectangle([cx - w//2, top, cx + w//2, 1500], 26, fill=(222, 208, 190, 255))
        n = (rng.normal(0, 7, (S, S, 1)) * np.array([1, 1, 1])).astype(int)
        a = np.asarray(pod).astype(int); a[..., :3] = np.clip(a[..., :3] + n, 0, 255)
        bg.paste(Image.fromarray(a.astype('uint8'), 'RGBA'), (0, 0), Image.fromarray(a.astype('uint8'), 'RGBA'))
        slots.append({'cx': cx, 'base': top + 6, 'h': 0})
    bg.save(path); return slots
def sombra(prod, base_w):
    w, h = prod.size; sh = Image.new('L', (w + 200, 120), 0); ImageDraw.Draw(sh).ellipse([100 + w*0.05, 52, 100 + w*0.95, 76], fill=170)
    return sh.filter(ImageFilter.GaussianBlur(9))
def componer(escena, slots, prods, alturas, out):
    img = Image.open(escena).convert('RGBA')
    for sl, p, h in zip(slots, prods, alturas):
        p = Image.open(p).convert('RGBA'); al = p.getchannel('A').filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(0.8)); p.putalpha(al); k = h / p.height; p = p.resize((round(p.width * k), h), Image.LANCZOS)
        sh = sombra(p, p.width); layer = Image.new('RGBA', img.size, (0, 0, 0, 0))
        layer.paste((60, 45, 30, 255), (sl['cx'] - sh.width // 2, sl['base'] - 62), sh); img = Image.alpha_composite(img, layer)
        img.alpha_composite(p, (sl['cx'] - p.width // 2, sl['base'] - p.height + 4))
    img.convert('RGB').save(out, quality=92)
if __name__ == '__main__':
    slots = escena_prueba('escena-prueba-3.png')
    # alturas relativas por formato real: limpiador 150ml > crema 75ml > SPF 50ml (ajustables)
    componer('escena-prueba-3.png', slots, ['src/limpiador.png', 'src/crema.png', 'src/spf.png'], [760, 600, 520], 'piloto-express-grasa-prueba.jpg')
