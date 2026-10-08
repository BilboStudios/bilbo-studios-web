# Bilbo Studios · Marca y diseño vigente

Decisión del 9 de octubre de 2026: la web adopta la propuesta Universo de Claude,
con los juegos y sus vídeos como contenido principal. Se conserva la paleta
bosque del documento de diseño suministrado por el usuario.

## Documentación

- `especificacion-original.md`: copia íntegra del documento recibido. Se guarda
  como referencia histórica; su estructura de portada y textos han sido
  sustituidos por las decisiones posteriores del usuario.
- Diseño vigente: escenario de vídeo, título y enlace del juego, selector de
  cuatro juegos y contacto breve. Sin eslogan obligatorio ni biografía personal.
- Prototipo elegido: `../../docs/concepts/universe/claude.html`.
- Implementación: `../../src/home.html`, `../../docs/assets/home.css` y
  `../../docs/assets/site.js`. Versiones estáticas en inglés `/` y castellano `/es/`.

## Identidad

| Token | Color |
| --- | --- |
| Bosque | #0F2620 |
| Bosque profundo | #0A1C17 |
| Musgo | #173630 |
| Musgo hover | #1F443C |
| Crema | #F1EBDD |
| Salvia | #9DB3A8 |
| Naranja | #FF7A2F |

La B pixelada usa la retícula SVG original de 9 × 10. Es naranja, sustituye a
la B inicial de BILBO y se coloca junto a ILBO en crema, con STUDIOS debajo.
Inter 900 para el nombre. Los vídeos conservan sus colores originales.

## Avatares y archivos compartibles

En `../../docs/assets/social/`:

- `bilbo-studios-avatar.svg`: fuente vectorial exacta.
- `bilbo-studios-avatar.png`: 1000 × 1000, B naranja de 500 px de alto sobre
  bosque. Apto para el recorte circular de YouTube, TikTok y LinkedIn.
- `bilbo-studios-social.svg` y `.png`: vista previa de enlaces, 1200 × 630.

Exportación reproducible: `python3 scripts/export-brand.py` (requiere Pillow).
No se han regenerado las formas con IA ni se han modificado los banners.

## Vídeos

Pirates.io, Stellar Swarm y Pocket Goal reutilizan los clips existentes.
Uninstall Humanity utiliza el teaser pixel art, etiquetado como Teaser.
Solo se carga y reproduce el vídeo seleccionado, silenciado, con pausa y
respeto a la preferencia de movimiento reducido. En móvil se preserva el
encuadre completo de los clips horizontales.

## Aplicación en redes · 9 de octubre de 2026

Avatar actualizado y guardado en los tres perfiles autorizados:

- YouTube: https://www.youtube.com/@BilboStudiosGames — Studio confirmó
  «Se han guardado todos los cambios» y el canal muestra la B naranja.
- TikTok: https://www.tiktok.com/@bilbostudiosgames — guardado en Editar perfil
  y comprobado tras recargar la página.
- LinkedIn: https://www.linkedin.com/company/bilbo-studios/ — logo guardado
  desde Edit Page; comprobado posteriormente en la identidad de la empresa.

No se modificaron banners, descripciones ni publicaciones.

Comprobaciones de la web: compilación completa, recursos locales en ambas
versiones, metadatos, vista de 360 px sin desbordamiento, selección de vídeo,
pausa, cambio de idioma conservando el juego y copia del correo.
