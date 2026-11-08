# Abigail Caricato — Portfolio

Portfolio de Abigail Caricato, diseño gráfico y dirección de arte. Sitio estático en español e inglés.

**Concepto: «En registro».** El sitio es un pliego de imprenta: marcas de corte, cruces de registro, barra de color CMYK
y el nombre impreso en tres tintas (cian, magenta y amarillo) que entran en registro al cargar. Papel y tinta como fondos,
magenta de proceso como única luz.

## Stack

Next.js (App Router, `output: 'export'`) + TypeScript + GSAP/ScrollTrigger. Tipografías autoalojadas con `next/font`:
Bodoni Moda (títulos), Hanken Grotesk (texto) y DM Mono (datos y rótulos). Sin otras dependencias.

## Comandos

```sh
npm ci
npm run dev        # http://localhost:3000/es/
npm run typecheck
npm test           # paridad de textos es/en
npm run build      # → out/
```

## Contenido

- Textos: `messages/es.json` y `messages/en.json` (mismas claves; lo verifica `npm test`).
- Contacto: `content/site.ts`. Vacío = no se muestra. **Completar con los datos reales de Abigail.**
- Proyectos: textos en `messages/*.json` (`work.projects`); dibujos y datos fijos (herramientas, tipografías) en `components/art/arts.tsx`.

## Antes de compartirlo

- **La historia es un primer borrador inventado** («Seis pliegos»: la mesa de la cocina, Photoshop, Illustrator, InDesign,
  After Effects, hoy). Abigail tiene que revisarla y reemplazar lo que no sea cierto.
- **Los seis proyectos son conceptuales** (Nácar, Umbral, Ola Lenta, Almácigo, Vértigo, Lumbre): marcas ficticias, rotuladas así en
  el sitio. Cuando haya trabajos reales, se reemplazan.
- El sitio sale con `noindex` (no aparece en buscadores) hasta que el contenido esté aprobado: variable de repo `PAGES_NOINDEX=0` para indexarlo.

## Deploy

`.github/workflows/pages.yml`: en cada push a `main` corre typecheck, tests y build, y publica `out/` en GitHub Pages
(fuente: GitHub Actions). La ruta base sale de `actions/configure-pages`. Con dominio propio no hace falta ruta base.
