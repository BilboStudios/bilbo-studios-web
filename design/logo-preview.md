# Logo de Bilbo Studios — integración en la web

Se usa la B mayúscula pixelada normal del concepto 13 (Arcade), con los dos huecos rectangulares. El usuario descartó las últimas exploraciones y pidió ver esta versión en los colores existentes de la web.

El archivo `docs/assets/bilbo-pixel-b.png` es una extracción generada de la B sobre transparencia. Se reutiliza sin redibujar en los tres formatos, con los estilos compartidos de `docs/assets/brand.css`. La máscara permite aplicar el coral `#ff5c6c` y ajustar sus márgenes transparentes para alinear la B con las letras. El nombre usa el blanco cálido `#f2f0eb` de la web.

## Tres formatos

1. **Principal:** B pixelada grande, encima del nombre completo BILBO / STUDIOS.
2. **Nombre integrado:** la B pixelada sustituye a la primera letra de BILBO; se alinea con la altura y la base de ILBO, con STUDIOS debajo. Es el formato aplicado en la cabecera.
3. **Símbolo:** la B pixelada sola. Es la firma aplicada en el pie, sobre el fondo claro existente.

La lámina `design/logo-formats.html` presenta los tres formatos y contiene los recursos necesarios para abrirse por sí sola. `design/logo-formats.png` es su vista estática. Ambas utilizan la misma B normal. El formato principal se muestra en la lámina; no vuelve a añadirse a la portada.

Tras revisar la prueba, el usuario pidió retirar el logo y el nombre repetidos de la portada, junto con la línea «Independent game studio». La portada comienza directamente con «Play comes first.» y recupera su altura anterior.

El usuario encontró redundante la B al lado de BILBO y propuso estos tres formatos, incluyendo la sustitución de la primera B del nombre por el símbolo pixelado.

La integración se revisó en una vista previa local y el usuario aprobó su publicación en la web el 8 de septiembre de 2026. El PNG y la tipografía HTML no se presentan como un original vectorial definitivo.

## Favicon

El favicon utiliza la misma B normal y el coral `#ff5c6c` sobre transparencia. Se exportó el componente existente a 16, 32, 48 y 64 píxeles sin generar otra versión del símbolo. `docs/favicon.ico` contiene esos cuatro tamaños y `docs/favicon-32.png` es la alternativa PNG. Ambos se declaran en la cabecera HTML y forman parte de la versión aprobada para la web.

## Generación del recurso

Herramienta de imágenes integrada (`image_gen`). Referencia: el PNG `13-arcade.png` de las propuestas del estudio. El PNG generado se copió sin modificar al directorio de recursos de la web.

### Prompt

Use case: background-extraction / precise-object-edit.
Input image is the selected NORMAL pixel B concept for Bilbo Studios. Extract ONLY the large uppercase pixel B symbol from the top of this image as a clean, flat website icon on a genuinely transparent background.
Preserve its exact normal proportions and all broad stair-step positions. Keep the thick perfectly straight left stem, flat top, upper rectangular counter, slightly wider lower rectangular counter, and larger lower bowl. The upper bowl has two large steps down the upper-right edge; the lower bowl projects one broad step farther right and steps back at the bottom. This is the original normal B, not the compact version or finer-pixel version.
Remove all BILBO and STUDIOS text. Remove the dark background completely, including inside both counters. Make the entire solid B pure opaque WHITE #FFFFFF, with no texture, shading, gradients, halo, glow, lighting, contour line or decoration. It will be used as an alpha mask and colored in CSS, so every interior pixel of the symbol must have uniform opacity and white color. Counters and outside area must have alpha 0.
Square 1024x1024 canvas. Center the symbol and enlarge it to fill the canvas with approximately 32 pixels clear margin on all sides, preserving its proportions. Crisp square grid edges. Output only this one flat transparent B icon.
