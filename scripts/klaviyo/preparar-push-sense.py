#!/usr/bin/env python3
"""Prepara los 10 archivos del feed para subirlos al tema publicado (Sense) con `shopify theme push --only`.
Copia desde skinland-theme-v3 y agrega respaldo a los ajustes que Sense no tiene. No escribe nada en Shopify.
Salida: docs/klaviyo/sense-push/{templates,snippets}/..."""
import os, re, shutil
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(REPO, 'docs/klaviyo/sense-push')
ARCHIVOS = ['templates/page.klaviyo-feed.liquid'] + [f'snippets/{n}.liquid' for n in (
    'sl-feed-rutina', 'sl-feed-componente', 'sl-feed-paso', 'sl-feed-piel', 'sl-feed-ref',
    'sl-feed-img', 'sl-bundle-sum', 'sl-paso', 'sl-color-necesidad')]
COLORES = {'durazno': '#FFB38A', 'celeste': '#A9D8FF', 'lila': '#CBB8FF', 'lima': '#DCF56C',
           'amarillo': '#FFE58A', 'rosa': '#FFA3C8', 'menta': '#8EE3B8'}
PASOS = {'limpieza': 'Limpia', 'serum': 'Trata', 'crema': 'Hidrata', 'spf': 'Protege', 'local': 'Granito puntual'}

def reemplazar(s, a, b):
    assert s.count(a) == 1, a
    return s.replace(a, b)

shutil.rmtree(OUT, ignore_errors=True)
for rel in ARCHIVOS:
    s = open(os.path.join(REPO, rel), encoding='utf-8').read()
    if rel.endswith('page.klaviyo-feed.liquid'):
        s = reemplazar(s, 'settings.sl_envio_gratis_umbral | plus: 0', 'settings.sl_envio_gratis_umbral | default: 64990 | plus: 0')
    if rel.endswith('sl-feed-rutina.liquid'):
        for k, hexa in COLORES.items():
            s = reemplazar(s, f'assign color_hex = settings.sl_color_{k}\n', f"assign color_hex = settings.sl_color_{k} | default: '{hexa}'\n")
    if rel.endswith('sl-paso.liquid'):
        for k, txt in PASOS.items():
            s = reemplazar(s, f'echo settings.sl_paso_n_{k}\n', f"echo settings.sl_paso_n_{k} | default: '{txt}'\n")
    destino = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    open(destino, 'w', encoding='utf-8').write(s)
# todo ajuste restante debe tener respaldo o ser el de complemento (que puede quedar vacio)
for rel in ARCHIVOS:
    for n, ln in enumerate(open(os.path.join(OUT, rel), encoding='utf-8'), 1):
        if 'settings.' in ln and 'default:' not in ln and 'sl_complemento_envio' not in ln and not ln.strip().startswith(('Parámetro', '#')):
            print('AVISO sin respaldo:', rel, n, ln.strip())
print(len(ARCHIVOS), 'archivos en', OUT)
