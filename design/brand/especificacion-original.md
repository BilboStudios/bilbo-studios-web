# Bilbo Studios · Especificación de la web

Oct 9, 2026 · @Fafi

## Objetivo y alcance

Rediseñar la home de bilbostudios.com con la nueva paleta bosque y naranja, la B pixelada redibujada en retícula de 9 × 10 y una presentación de juegos más grande. Este documento es la especificación completa: quien la implemente no debería tener que inventar ningún valor.

**Se cambia:**

- Paleta de colores completa (fondo negro → verde bosque, acento coral → naranja).
- Símbolo: la B deja de ser un PNG con máscara CSS y pasa a SVG en retícula exacta.
- Logotipo: "ILBO" pasa de Arial Black a Inter Black.
- Estructura de la home: portada, catálogo de juegos, estudio, contacto y pie.
- Favicon nuevo.

**No se cambia:**

- Los textos en inglés de los juegos y sus enlaces a Poki y CrazyGames.
- La versión en castellano (`/es/`) sigue existiendo; se le aplica el mismo diseño con sus propios textos.
- El dominio, el hosting y el correo de contacto (info@bilbostudios.com).

Referencia visual: el prototipo HTML "Bilbo Studios Web Bosque" que acompaña a este documento. Donde el prototipo y este documento no coincidan, manda este documento (incluye correcciones posteriores al prototipo).

## Marca

El símbolo es una B pixelada en una retícula de 9 columnas × 10 filas con módulos cuadrados iguales. Se usa siempre como SVG con bordes nítidos, nunca como imagen escalada ni suavizada.

### Símbolo (mapa de módulos)

`#` = módulo relleno. Anchos por fila: 6 · 7 · 8 · 8 · 7 · 8 · 9 · 9 · 8 · 7.

```
######...
#######..
###..###.
###..###.
#######..
########.
###...###
###...###
########.
#######..
```

### Símbolo (SVG)

`El color se hereda con currentColor: basta con poner color: var(--accent) en el elemento que lo contiene.`

```html
<svg viewBox="0 0 9 10" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h6v1h-6zM0 1h7v1h-7zM0 2h3v1h-3zM5 2h3v1h-3zM0 3h3v1h-3zM5 3h3v1h-3zM0 4h7v1h-7zM0 5h8v1h-8zM0 6h3v1h-3zM6 6h3v1h-3zM0 7h3v1h-3zM6 7h3v1h-3zM0 8h8v1h-8zM0 9h7v1h-7z"/></svg>
```

### Logotipo

La B sustituye a la inicial de BILBO. Debajo va STUDIOS, centrado. Se construye en HTML con el SVG de la B más texto en Inter, todo escalado desde un único `font-size` del contenedor.

| Elemento | Especificación |
| --- | --- |
| Contenedor | `display:inline-flex; text-transform:uppercase; line-height:1` |
| Fila del nombre | `display:inline-flex; align-items:flex-end; gap:.06em; font-weight:900; letter-spacing:-.01em; line-height:.9` |
| B (SVG) | alto `.73em`, ancho `.657em`, `margin-bottom:.09em`, color acento |
| ILBO | Inter 900, `letter-spacing:.02em`, color texto |
| STUDIOS | Inter 700, `font-size:.318em`, `letter-spacing:.48em`, `padding-left:.48em` (compensa el espaciado final), centrado bajo el nombre, separación `.27em` |

Tamaños de uso: cabecera 24 px de `font-size`, pie 30 px. Tamaño mínimo del logotipo completo: 120 px de ancho. Por debajo se usa solo la B.

### Favicon

Placa verde con la B naranja desplazada 3 módulos desde arriba y la izquierda. Exportar también a PNG de 32, 180 (apple-touch-icon) y 512 px escalando por enteros.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges"><rect width="16" height="16" rx="3" fill="#0A1C17"/><path transform="translate(3 3)" fill="#FF7A2F" d="M0 0h6v1h-6zM0 1h7v1h-7zM0 2h3v1h-3zM5 2h3v1h-3zM0 3h3v1h-3zM5 3h3v1h-3zM0 4h7v1h-7zM0 5h8v1h-8zM0 6h3v1h-3zM6 6h3v1h-3zM0 7h3v1h-3zM6 7h3v1h-3zM0 8h8v1h-8zM0 9h7v1h-7z"/></svg>
```

No se permite: deformar, girar, cambiar colores, añadir sombras o brillos, suavizar los bordes de la B ni volver a usar Arial Black.

### Fondo de la B (para no recordar a Bitcoin)

La B naranja va siempre sobre verde (`--forest` o `--forest-deep`). Nunca se pone la B dentro de un círculo naranja, porque a tamaño pequeño recuerda al logo de Bitcoin.

- Avatar de redes: círculo `#0F2620` con la B `#FF7A2F` centrada, ocupando un 50 % del diámetro.
- Icono de app: cuadrado `#0A1C17` con la B `#FF7A2F` al 50 % del lado.
- Favicon: el de esta sección.

## Paleta

La web es oscura y de un solo tema: fondo verde bosque, texto crema y un único acento naranja. El naranja es el complementario del azul que domina en las portadas, así que botones y etiquetas destacan junto a ellas.

| Token | HEX | Uso |
| --- | --- | --- |
| `--forest` | `#0F2620` | Fondo general de la página |
| `--forest-deep` | `#0A1C17` | Bandas (franja de datos), placa del favicon |
| `--moss` | `#173630` | Superficies: tarjetas de juego, bloques |
| `--moss-hi` | `#1F443C` | Hover de superficies |
| `--cream` | `#F1EBDD` | Texto principal y titulares |
| `--sage` | `#9DB3A8` | Texto secundario, navegación, etiquetas |
| `--accent` | `#FF7A2F` | B del logo, botones principales, etiquetas destacadas, bloque de contacto |
| `--line` | `rgba(241,235,221,.14)` | Bordes y separadores |

```css
:root {
  --forest: #0F2620;
  --forest-deep: #0A1C17;
  --moss: #173630;
  --moss-hi: #1F443C;
  --cream: #F1EBDD;
  --sage: #9DB3A8;
  --accent: #FF7A2F;
  --line: rgba(241, 235, 221, .14);
  color-scheme: dark;
}
body { background: var(--forest); color: var(--cream); }
```

En el `<head>`, actualizar `<meta name="theme-color" content="#0F2620">`.

### Contrastes (WCAG 2.1)

| Combinación | Contraste | Uso |
| --- | --- | --- |
| Crema sobre bosque | 13,4 : 1 | Todo el texto |
| Salvia sobre bosque | 7,17 : 1 | Texto secundario |
| Naranja sobre bosque | 6,13 : 1 | Etiquetas, enlaces destacados |
| Bosque sobre naranja | 6,13 : 1 | Texto de botones y del bloque de contacto |
| Salvia sobre musgo | 5,88 : 1 | Texto secundario dentro de tarjetas |
| Naranja sobre musgo | 5,03 : 1 | Enlaces dentro de tarjetas |

Nunca poner texto crema o blanco sobre naranja: el texto sobre naranja va siempre en `--forest`.

Proporción aproximada de uso: bosque y musgo 75 %, crema 15 %, salvia 6 %, naranja 4 %. El naranja se reserva para lo importante; si aparece en todas partes deja de destacar.

## Tipografía

Toda la web usa una sola familia, Inter, cargada desde Google Fonts con los pesos 400, 500, 600, 700, 800 y 900. Los titulares van muy pesados y con el interletrado muy cerrado; las etiquetas, en mayúsculas y espaciadas.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
```

```css
font-family: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
```

Para datos y numeraciones pequeñas (por ejemplo "04 games") se puede usar una monoespaciada: JetBrains Mono 500 a 12–13 px. Es opcional.

| Estilo | Tamaño (escritorio → móvil) | Peso | Interletrado | Interlineado | Dónde |
| --- | --- | --- | --- | --- | --- |
| Portada | `clamp(64px, 10vw, 140px)` | 780 | −0,075 em | 0,84 | "Play comes first." |
| Contacto | `clamp(72px, 13vw, 180px)` | 780 | −0,08 em | 0,82 | "Let's talk." |
| Título de sección | `clamp(44px, 6.4vw, 84px)` | 760 | −0,07 em | 0,88 | "Our games." |
| Título de juego | `clamp(32px, 3.4vw, 48px)` | 740 | −0,06 em | 0,92 | Nombre en cada tarjeta |
| Subtítulo | `clamp(40px, 5.4vw, 68px)` | 740 | −0,065 em | 0,92 | Sección del estudio |
| Entradilla | 18 px | 400 | normal | 1,6 | Textos de introducción |
| Cuerpo | 16 px | 400 | normal | 1,6 | Descripciones |
| Navegación | 13 px | 650 | normal | 1 | Menú superior |
| Botón | 13 px | 750 | +0,08 em, mayúsculas | 1 | Botones |
| Etiqueta | 12 px | 700 | +0,16 em, mayúsculas | 1 | Antetítulos, géneros |

Reglas:

- Los titulares terminan en punto, como ahora: "Play comes first.", "Our games.", "Uninstall Humanity.".
- `text-wrap: balance` en todos los titulares.
- Líneas de texto corrido de 65 caracteres como máximo (`max-width: 44ch`–52ch\` en entradillas).

## Retícula, espaciado y breakpoints

El contenido vive en una columna centrada de 1240 px como máximo, con 24 px de margen lateral en todos los tamaños. Las bandas de color (franja de datos y contacto) ocupan todo el ancho de la ventana.

| Medida | Valor |
| --- | --- |
| Ancho máximo del contenido | 1240 px |
| Margen lateral | 24 px (nunca menos de 16 px) |
| Separación entre secciones | 104 px escritorio, 72 px móvil |
| Separación entre tarjetas | 24 px |
| Relleno interior de tarjeta | 24 px (móvil 20 px) |
| Radio de esquinas | 0. Todo es recto, como la B. Única excepción: el favicon (3/16) |
| Sombras | Ninguna difuminada. Solo sombra dura desplazada en hover de botón principal y en la ficha de la portada |

Breakpoints:

- **≥ 900 px:** portada a dos columnas, catálogo a dos columnas.
- **< 900 px:** todo a una columna. La B gigante de la portada pasa debajo del texto.
- **< 700 px:** el menú muestra solo "Games" y "Contact"; el resto se oculta.

La página nunca debe tener scroll horizontal, tampoco a 360 px de ancho.

## Estructura de la home

La home tiene siete bloques en este orden. Respecto al prototipo hay dos correcciones: la portada ya no muestra la ficha de Uninstall Humanity (era redundante con el catálogo) y los juegos se presentan en tarjetas grandes de dos en dos.

1. **Cabecera.** Logotipo a la izquierda (24 px). A la derecha: Games, New release, Studio, Contact y el selector EN / ES. Borde inferior de 1 px `--line`. No es fija.
2. **Portada.** Dos columnas.
   - Izquierda: antetítulo "Independent game studio · Bilbao, Spain"; titular "Play / comes / first." en tres líneas con "first." en naranja; entradilla "We make action, arcade and multiplayer games for the browser. Built to be fun from the very first run."; botones "See our games ↘" (principal, ancla a #games) y "Play Uninstall Humanity ↗" (secundario, enlace a Poki).
   - Encima del titular, un aviso de lanzamiento en una línea: píldora naranja "New" + "Uninstall Humanity is out on Poki →", que baja a la tarjeta del juego en el catálogo. Es la única mención al lanzamiento fuera del catálogo.
   - Derecha: la B gigante hecha con sus 90 módulos (ver Componentes), unos 470 px de alto.
3. **Franja de datos.** Banda a todo el ancho en `--forest-deep` con bordes de 1 px arriba y abajo. Cuatro datos en mayúsculas separados por un cuadrado naranja de 8 px: "4 games", "Action · Arcade · Multiplayer", "On Poki & CrazyGames", "Est. 2026".
4. **Juegos** (`id="games"`). Antetítulo "Selected work", título "Our games." y a la derecha el contador "04 games". Debajo, rejilla de 2 × 2 tarjetas grandes del mismo tamaño, en este orden: Uninstall Humanity (con pegatina "New"), Pirates.io, Stellar Swarm, Pocket Goal: World Cup. En móvil, una columna.
5. **Estudio** (`id="studio"`). Dos columnas. Izquierda: antetítulo "The studio", título "Independent games. Made in Bilbao." y el texto actual. Derecha: ficha de datos (Founded: 2026, Bilbao · Games: 4 released and in preview · Genres: Action, arcade, sports, multiplayer · Play on: Poki · CrazyGames).
6. **Contacto** (`id="contact"`). Banda a todo el ancho en naranja con todo el texto en `--forest`. "Let's talk." enorme a la izquierda. A la derecha: "Publishing, collaborations, press or just a hello.", el correo info@bilbostudios.com en una caja verde y un botón "Copy" que lo copia al portapapeles.
7. **Pie.** Logotipo (30 px) a la izquierda; enlaces Games, Studio, Contact y "© 2026 Bilbo Studios" a la derecha.

### Datos de cada juego

| Juego | Género (etiqueta) | Descripción | Botón | Enlace |
| --- | --- | --- | --- | --- |
| Uninstall Humanity | Vehicular horde survival | The machines have taken over. You're still driving. Tear through robot hordes, upgrade your ride, and fight for one more run. | Play on Poki ↗ | [poki.com/en/g/uninstall-humanity](https://poki.com/en/g/uninstall-humanity) |
| Pirates.io | Multiplayer · Naval combat | Multiplayer naval combat across an open ocean of islands, treasure, and rival captains. | Play the Poki preview ↗ | El enlace de preview actual de Poki |
| Stellar Swarm | Arcade · Action | Survive the swarm, evolve your ship, and turn every run into a new build. | Play on CrazyGames ↗ | [crazygames.com/game/stellar-swarm](https://www.crazygames.com/game/stellar-swarm) |
| Pocket Goal: World Cup | Sports · Arcade | Fast table-football matches, quick tournaments, and instant local competition. | Play on CrazyGames ↗ | [crazygames.com/game/pocket-goal-world-cup-trj](https://www.crazygames.com/game/pocket-goal-world-cup-trj) |

La portada de Uninstall Humanity es cuadrada y el resto son 16:9. En la tarjeta todas se muestran a 16:9 con `object-fit: cover`. Para Uninstall Humanity, usar `object-position: center 30%` para no cortar el título, o mejor exportar una versión 16:9 de la portada.

## Componentes

Todos los componentes tienen esquinas rectas y usan solo los tokens de la paleta.

| Componente | Especificación |
| --- | --- |
| Botón principal | Fondo `--accent`, texto `--forest`, Inter 750 13 px mayúsculas +0,08 em, relleno 16 × 20 px, flecha al final (↗ enlace externo, ↘ ancla). Hover: se desplaza 2 px arriba-izquierda con sombra dura `4px 4px 0 var(--cream)` |
| Botón secundario | Transparente, borde 1 px `--line`, texto `--cream`. Hover: borde y texto en `--accent` |
| Antetítulo | Inter 700 12 px mayúsculas +0,16 em, color `--sage`, precedido de un cuadrado `--accent` de 8 × 8 px con 10 px de separación. El cuadrado es un módulo de la B |
| Etiqueta (chip) | Inter o JetBrains Mono 600 11 px mayúsculas +0,06 em, relleno 8 × 10 px, borde 1 px `--line`, color `--sage`. Variante activa: borde y texto `--accent` |
| Pegatina "New" | Fondo `--accent`, texto `--forest`, Inter 800 12 px mayúsculas +0,1 em, relleno 12 × 14 px, girada 6°, saliendo 16 px por la esquina superior derecha de la tarjeta |
| Tarjeta de juego | Fondo `--moss`, borde 1 px `--line`. Arriba la portada a 16:9 a todo el ancho. Debajo, relleno 24 px: número y género ("01 · Vehicular horde survival", 12 px, `--sage`), título del juego, descripción (16 px, `--sage`, máx. 3 líneas) y botón principal con el texto de la plataforma. Toda la tarjeta es enlace. Hover: sube 4 px y el borde pasa a `--accent` |
| B gigante (portada) | SVG `viewBox="0 0 9 10"` con un `<rect>` por módulo de 0,88 × 0,88 desplazado 0,06 (deja una junta fina entre módulos). Relleno `--moss`; cuatro módulos en `--accent`: (0,0), (8,6), (5,9) y (2,4) en coordenadas (columna, fila) |
| Aviso de lanzamiento | Línea con píldora "New" (como la pegatina pero sin girar y a 11 px) y texto 14 px `--cream` con flecha →. Hover: subrayado |
| Ficha de datos | Lista de pares en filas separadas por 1 px `--line`. Etiqueta en mayúsculas 12 px `--sage` en una columna de 140 px; valor en Inter 600 `--cream` |
| Caja de correo | Texto del correo en JetBrains Mono 600 18 px, fondo `--forest`, color `--cream`, relleno 12 × 14 px. Botón "Copy" al lado con borde 1,5 px `--forest`. Al pulsar cambia a "Copied" durante 1,6 s |

## Interacción, movimiento y accesibilidad

El movimiento es mínimo: solo transiciones de hover de 150–200 ms. No hay animaciones de entrada que oculten contenido al cargar.

- Desplazamiento suave a las anclas (`scroll-behavior: smooth`).
- Si el usuario tiene `prefers-reduced-motion: reduce`, se desactivan el desplazamiento suave y todas las transiciones.
- Se mantiene el botón "Pause motion" solo si sigue habiendo algún fondo animado. Si no, se elimina.
- Foco de teclado visible en todo lo interactivo: `outline: 2px solid var(--accent); outline-offset: 3px`.
- Cada portada lleva su texto alternativo (se pueden reutilizar los `alt` actuales de la web).
- El SVG de la B lleva `aria-hidden="true"` y el enlace del logotipo, `aria-label="Bilbo Studios"`.
- El botón "Copy" usa `navigator.clipboard.writeText`; si falla, selecciona el texto del correo para copiarlo a mano.
- Los enlaces a Poki y CrazyGames se abren en la misma pestaña, como ahora (o en pestaña nueva con `rel="noopener"`, a decidir).
- Mantener las etiquetas Open Graph actuales, cambiando solo `theme-color`.

## Recursos y archivos

Casi todo lo necesario ya existe en la web o está en este documento. Solo hay que crear los favicons en PNG y, si se puede, una portada 16:9 de Uninstall Humanity.

| Archivo | Estado | Notas |
| --- | --- | --- |
| B en SVG | Listo | Código en la sección Marca. Sustituye a `assets/bilbo-pixel-b.png` y a su máscara CSS |
| `favicon.svg` | Listo | Código en la sección Marca |
| `favicon-32.png`, `apple-touch-icon.png` (180), `icon-512.png` | Por crear | Exportar desde el SVG escalando por enteros, sin suavizado |
| `favicon.ico` | Por crear | 16, 32 y 48 px desde el SVG |
| Portadas de los juegos | Existen | `games/uninstall-humanity-cover.webp`, `pirates-io-cover.png`, `pocket-goal-cover.jpg`, `stellar-swarm-cover.jpg`. Recomendado convertir a WebP de 1280 px de ancho y `loading="lazy"` salvo la primera |
| Portada 16:9 de Uninstall Humanity | Opcional | Para que la tarjeta no recorte el título |
| Prototipo HTML | Referencia | "Bilbo Studios Web Bosque": muestra colores, tipografía, componentes y la B gigante. La portada y el catálogo de este documento lo corrigen |

## Criterios de aceptación y pendientes

La web está terminada cuando cumple todo lo siguiente en Chrome, Safari y Firefox, en escritorio y en un móvil de 375 px.

- [ ] Todos los colores salen de los tokens de la paleta; no queda ningún `#0b0b0d` ni `#ff5c6c` en el CSS.
- [ ] La B es SVG, con bordes nítidos a 16, 24, 32 y 96 px, y coincide módulo a módulo con el mapa de 9 × 10.
- [ ] El logotipo usa Inter 900 y no aparece Arial Black en ningún sitio.
- [ ] La portada no repite la ficha de Uninstall Humanity; el lanzamiento solo aparece en el aviso de una línea y en su tarjeta.
- [ ] Los cuatro juegos se ven en tarjetas de 2 × 2 del mismo tamaño en escritorio y en una columna en móvil.
- [ ] Todos los enlaces a Poki y CrazyGames funcionan.
- [ ] Sin scroll horizontal a 360 px.
- [ ] Foco de teclado visible y `prefers-reduced-motion` respetado.
- [ ] Favicon nuevo visible en pestañas claras y oscuras.
- [ ] La versión `/es/` tiene el mismo diseño con sus textos en castellano.

**Pendiente de decidir** (no bloquea la implementación):

- Voz: la web dice "We make…" y a la vez se presenta como estudio de una persona. Se mantiene el plural hasta que se decida.
- Si los enlaces a las plataformas abren en pestaña nueva.
