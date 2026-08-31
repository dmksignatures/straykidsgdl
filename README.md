# STAY GDL — Petición para que Stray Kids venga a Guadalajara

Sitio estático: pantalla de registro por correo → petición con meta de
firmas (753/100,000, cada clic suma 1).

## Antes de publicarlo — 2 pasos obligatorios

Este sitio es 100% estático (sin servidor propio), así que usa dos
servicios gratuitos externos para las dos funciones que pediste. **Sin
configurarlos, el envío de correo y el contador compartido no van a
funcionar de verdad.**

### 1. Que el correo registrado te llegue a ti (Formspree)

1. Entra a [formspree.io](https://formspree.io) y crea una cuenta gratis
   con **mateogalvez5995@gmail.com**.
2. Crea un formulario nuevo (New Form). Formspree te da una URL como:
   `https://formspree.io/f/xyzabcde`
3. Abre `script.js` y reemplaza esta línea con tu URL real:
   ```js
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/TU_ID_DE_FORMSPREE";
   ```
4. Listo: cada vez que alguien deje su correo, te va a llegar un email a
   tu cuenta con esa dirección.

El plan gratuito de Formspree tiene un límite de envíos al mes; si esperas
mucho tráfico revisa sus planes pagados.

### 2. El contador de firmas

El contador (753 → 100,000) está hecho completamente en `script.js`, sin
llamar a ningún servicio externo. No necesitas configurar nada para que
funcione: arranca en 753 y sube de uno en uno cada vez que alguien le da
a "Firmar la petición".

**Limitación técnica a tener en cuenta:** GitHub Pages solo sirve
archivos estáticos, no ejecuta código en un servidor. Eso significa que
el número que ve cada visitante se guarda en su propio navegador
(`localStorage`), no en un lugar central compartido por todos. Dos
personas en dos computadoras distintas no ven exactamente el mismo
número en tiempo real — cada quien parte de 753 y sube según sus propias
firmas en ese navegador.

Un contador verdaderamente global y compartido por todos los
visitantes, sin depender de ningún servicio externo, requiere un
backend propio (un servidor con una base de datos) — eso ya no cabe en
un sitio 100% estático como GitHub Pages. Si más adelante quieres esa
versión "de verdad compartida", avísame y lo armamos con un pequeño
backend tuyo.

### Nota sobre "una firma por persona"

Como es un sitio sin servidor, el sitio evita firmas repetidas guardando
un aviso en el propio navegador de la persona (`localStorage`). Esto
impide que alguien firme dos veces *en el mismo navegador*, pero no evita
que firme desde otro navegador o dispositivo — eso solo se puede prevenir
con una base de datos real y, típicamente, verificación de correo.

## Publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público).
2. Sube estos tres archivos a la raíz del repositorio:
   - `index.html`
   - `style.css`
   - `script.js`
3. Ve a **Settings → Pages** en tu repositorio.
4. En "Source" elige la rama `main` y la carpeta `/ (root)`.
5. Guarda. GitHub te va a dar una URL como:
   `https://tu-usuario.github.io/nombre-del-repo/`

Con eso el sitio ya queda público.

## Estructura del proyecto

```
.
├── index.html   → estructura de las dos pantallas (registro y petición)
├── style.css    → todos los estilos
├── script.js    → registro por correo, contador y lógica de firmar
└── README.md    → este archivo
```

## Personalizar contenido

- El texto de la petición, el "por qué" y las cifras están directamente
  en `index.html` — puedes editarlos con cualquier editor de texto.
- La meta (100000) y el valor inicial (753) están al principio de
  `script.js` en `GOAL` y `START_VALUE`, por si los quieres cambiar.
