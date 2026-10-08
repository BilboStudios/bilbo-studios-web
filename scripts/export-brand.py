"""Deterministic exports from the exact 9 x 10 brand grid; requires Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/assets/social'
OUT.mkdir(parents=True, exist_ok=True)
GRID = ['######...', '#######..', '###..###.', '###..###.', '#######..', '########.', '###...###', '###...###', '########.', '#######..']
FOREST = '#0F2620'
ORANGE = '#FF7A2F'
def modules(draw, x, y, unit):
    for row, line in enumerate(GRID):
        for col, value in enumerate(line):
            if value == '#':
                draw.rectangle((x+col*unit, y+row*unit, x+(col+1)*unit-1, y+(row+1)*unit-1), fill=ORANGE)
def svg(width, height, unit, x, y, background):
    rects = ''.join(f'<rect x="{x+c*unit}" y="{y+r*unit}" width="{unit}" height="{unit}"/>' for r,line in enumerate(GRID) for c,value in enumerate(line) if value=='#')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" shape-rendering="crispEdges"><rect width="{width}" height="{height}" fill="{background}"/><g fill="{ORANGE}">{rects}</g></svg>\n'
# Square upload; platforms provide their own circular crop. B is 50% of height.
im=Image.new('RGB',(1000,1000),FOREST);modules(ImageDraw.Draw(im),275,250,50)
im.save(OUT/'bilbo-studios-avatar.png')
(OUT/'bilbo-studios-avatar.svg').write_text(svg(1000,1000,50,275,250,FOREST))
im=Image.new('RGB',(1200,630),FOREST);modules(ImageDraw.Draw(im),465,165,30)
im.save(OUT/'bilbo-studios-social.png')
(OUT/'bilbo-studios-social.svg').write_text(svg(1200,630,30,465,165,FOREST))
print('Exported avatar (1000²) and social preview (1200 × 630).')
