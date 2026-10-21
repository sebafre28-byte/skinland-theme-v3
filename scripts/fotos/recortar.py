"""Recorta los envases con rembg (u2net). El recorte por color no sirve: los envases son casi blancos sobre fondo crema.
Uso: python3 scripts/fotos/recortar.py entrada.jpg [salida.png]"""
import sys
from rembg import remove, new_session
from PIL import Image
src = sys.argv[1]; dst = sys.argv[2] if len(sys.argv) > 2 else src.rsplit('.', 1)[0] + '.png'
o = remove(Image.open(src), session=new_session('u2net')); o.crop(o.getbbox()).save(dst)
