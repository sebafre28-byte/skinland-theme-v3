#!/usr/bin/env python3
"""Aplana templates/page.klaviyo-feed.liquid en UN solo archivo para el tema publicado (Sense).

Expande cada `render 'sl-...'` dentro del mismo archivo (variables con prefijo único para que no se pisen)
y reemplaza los ajustes del tema por respaldos:
  - settings.sl_envio_gratis_umbral  -> | default: 64990
  - settings.sl_color_*              -> | default: '<hex>'
  - settings.sl_complemento_envio    -> se quita; el complemento sale solo de custom.complemento_envio del producto
  - settings.sl_paso_n_*             -> se quita (el feed siempre usa los nombres cortos Limpia/Trata/Hidrata/Protege)

Uso: python3 scripts/klaviyo/aplanar-feed.py [salida]   (por defecto docs/klaviyo/sense/page.klaviyo-feed.liquid)
No escribe nada en Shopify.
"""
import re, sys, os

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(REPO, 'docs/klaviyo/sense/page.klaviyo-feed.liquid')

def leer(ruta):
    return open(os.path.join(REPO, ruta), encoding='utf-8').read()

# ---- fuentes con los respaldos aplicados -------------------------------------------------------------
COLORES = {'durazno': '#FFB38A', 'celeste': '#A9D8FF', 'lila': '#CBB8FF', 'lima': '#DCF56C',
           'amarillo': '#FFE58A', 'rosa': '#FFA3C8', 'menta': '#8EE3B8'}

def fuente(nombre):
    s = leer(f'snippets/{nombre}.liquid')
    if nombre == 'sl-feed-rutina':
        for k, hexa in COLORES.items():
            a = f'assign color_hex = settings.sl_color_{k}\n'
            assert a in s, a
            s = s.replace(a, f"assign color_hex = settings.sl_color_{k} | default: '{hexa}'\n")
        bloque = "    unless cp\n      assign cp = settings.sl_complemento_envio\n    endunless\n"
        assert bloque in s
        s = s.replace(bloque, '')
    if nombre == 'sl-paso':
        # El feed nunca pasa el parametro "nombre": solo existen las etiquetas cortas.
        s = re.sub(r"if nombre\n\s+echo settings\.\w+\n\s+else\n\s+(echo '[^']+')\n\s+endif", r"\1", s)
        assert 'settings' not in re.sub(r'\{%-\s*comment.*?endcomment\s*-%\}', '', s, flags=re.S)
    return s

PLANTILLA = leer('templates/page.klaviyo-feed.liquid')
a = "assign umbral = settings.sl_envio_gratis_umbral | plus: 0"
assert a in PLANTILLA
PLANTILLA = PLANTILLA.replace(a, "assign umbral = settings.sl_envio_gratis_umbral | default: 64990 | plus: 0")

# ---- analisis de snippet -----------------------------------------------------------------------------
BLOQUE = re.compile(r'\{%-\s*liquid\n(.*?)\n-%\}', re.S)

def partir(src):
    """Devuelve (lineas_liquid, markup_final) de un snippet o de un bloque de liquid."""
    m = BLOQUE.search(src)
    assert m, 'sin bloque liquid'
    return m.group(1).split('\n'), src[m.end():].strip('\n')

CNT = [0]
ID = r'[A-Za-z_]\w*'

def variables_locales(lineas, params):
    loc = set(params)
    for ln in lineas:
        t = ln.strip()
        for rx in (r'^assign\s+(%s)\s*=' % ID, r'^capture\s+(%s)\b' % ID, r'^for\s+(%s)\s+in\b' % ID):
            m = re.match(rx, t)
            if m:
                loc.add(m.group(1))
    return loc

TOK = re.compile(r"'[^']*'|\"[^\"]*\"|%s" % ID)

def renombrar_expr(txt, loc, pref):
    out, i = [], 0
    for m in TOK.finditer(txt):
        out.append(txt[i:m.start()])
        tok = m.group(0)
        if tok[0] in '\'"':
            out.append(tok)
        else:
            antes = txt[:m.start()].rstrip()
            if tok in loc and not antes.endswith('.'):
                out.append(pref + tok)
            else:
                out.append(tok)
        i = m.end()
    out.append(txt[i:])
    return ''.join(out)

def renombrar_markup(txt, loc, pref):
    # solo dentro de {{ }} y {% %}
    def sub(m):
        return renombrar_expr(m.group(0), loc, pref)
    return re.sub(r'\{\{.*?\}\}|\{%.*?%\}', sub, txt, flags=re.S)

RENDER = re.compile(r"^render\s+'([\w-]+)'\s*(?:,\s*(.*))?$")

def parse_args(txt):
    if not txt:
        return []
    partes = re.split(r',\s*(?=%s:)' % ID, txt.strip())
    res = []
    for p in partes:
        k, v = p.split(':', 1)
        res.append((k.strip(), v.strip()))
    return res

def markup_a_lineas(markup, loc, pref, sangria):
    """Convierte el marcado final de un snippet ({{ }}, {% if %} y texto) en lineas de un bloque liquid (echo/if/endif)."""
    out = []
    i = 0
    for m in re.finditer(r'\{\{-?(.*?)-?\}\}|\{%-?(.*?)-?%\}', markup, flags=re.S):
        texto = markup[i:m.start()]
        if texto:
            assert "'" not in texto and '\n' not in texto, texto
            out.append(f"{sangria}echo '{texto}'")
        if m.group(1) is not None:
            out.append(f"{sangria}echo {renombrar_expr(m.group(1).strip(), loc, pref)}")
        else:
            tag = renombrar_expr(m.group(2).strip(), loc, pref)
            assert re.match(r'(if|elsif|else|endif|unless|endunless)\b', tag), tag
            out.append(f"{sangria}{tag}")
        i = m.end()
    resto = markup[i:]
    if resto:
        assert "'" not in resto and '\n' not in resto, resto
        out.append(f"{sangria}echo '{resto}'")
    return out

def expandir_lineas(lineas, loc, pref, renombrar=True):
    """Convierte lineas de un bloque liquid: expande cada render en su lugar. Devuelve lista de lineas."""
    res = []
    for ln in lineas:
        t = ln.strip()
        m = RENDER.match(t)
        if m:
            nombre = m.group(1)
            args = parse_args(m.group(2))
            args = [(k, renombrar_expr(v, loc, pref) if renombrar else v) for k, v in args]
            sangria = ln[:len(ln) - len(ln.lstrip())]
            res.extend(expandir_snippet(nombre, args, sangria))
        else:
            res.append(renombrar_expr(ln, loc, pref) if renombrar else ln)
    return res

def expandir_snippet(nombre, args, sangria):
    CNT[0] += 1
    pref = f'_f{CNT[0]}_'
    lineas, markup = partir(fuente(nombre))
    params = [k for k, _ in args]
    loc = variables_locales(lineas, params)
    res = [f'{sangria}assign {pref}{k} = {v}' for k, v in args]
    res.extend(sangria + l if l.strip() else l for l in expandir_lineas(lineas, loc, pref))
    if markup.strip():
        res.extend(markup_a_lineas(markup.strip(), loc, pref, sangria + '  '))
    return res

# ---- armado del archivo final ------------------------------------------------------------------------
def procesar_bloques(src):
    res, i = [], 0
    for m in BLOQUE.finditer(src):
        res.append(src[i:m.start()])
        lineas = m.group(1).split('\n')
        if any(RENDER.match(l.strip()) for l in lineas):
            res.append('{%- liquid\n' + '\n'.join(expandir_lineas(lineas, set(), '', renombrar=False)) + '\n-%}')
        else:
            res.append(m.group(0))
        i = m.end()
    res.append(src[i:])
    return ''.join(res)

salida = procesar_bloques(PLANTILLA)
# comentario de cabecera para quien lo lea en el tema publicado
cabecera = ("{%- comment -%}\n"
            "  Archivo generado por scripts/klaviyo/aplanar-feed.py a partir de templates/page.klaviyo-feed.liquid de skinland-theme-v3.\n"
            "  Es autosuficiente: no usa snippets ni ajustes del tema. Umbral de envio gratis 64990 y colores con respaldo;\n"
            "  el complemento de envio sale solo del metacampo custom.complemento_envio del producto.\n"
            "  No editar a mano: regenerar con el script.\n"
            "{%- endcomment -%}\n")
salida = salida.replace('{% layout none %}\n', '{% layout none %}\n' + cabecera, 1)
assert 'render ' not in re.sub(r'\{%-\s*comment.*?endcomment\s*-%\}', '', salida, flags=re.S), 'quedo un render'
assert 'settings.sl_complemento' not in salida and 'sl_paso_n' not in salida

# ---- compactar: sin sangrias, lineas en blanco ni comentarios internos (no cambia el resultado) -----------
def compactar(src):
    def bloque(m):
        lineas, dentro = [], False
        for ln in m.group(1).split('\n'):
            t = ln.strip()
            if t == 'comment':
                dentro = True
                continue
            if t == 'endcomment':
                dentro = False
                continue
            if dentro or not t:
                continue
            lineas.append(t)
        return '{%- liquid\n' + '\n'.join(lineas) + '\n-%}'
    src = BLOQUE.sub(bloque, src)
    # comentarios de plantilla: se conserva solo el de cabecera
    n = [0]
    def com(m):
        n[0] += 1
        return m.group(0) if n[0] == 1 else ''
    src = re.sub(r'\{%-\s*comment\s*-%\}.*?\{%-\s*endcomment\s*-%\}\n?', com, src, flags=re.S)
    return src

salida = compactar(salida)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(salida)
print(OUT, len(salida.encode()), 'bytes', salida.count('\n'), 'lineas', CNT[0], 'expansiones')
