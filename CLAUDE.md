# Portfolio de Abigail Caricato

Next.js estático (`output: 'export'`) + TypeScript + GSAP. Español (`/es/`) e inglés (`/en/`). Ver README.md.

## Reglas

- **Honestidad:** la historia («Seis pliegos») es un borrador inventado a pedido, pendiente de que Abigail la apruebe; no sumar
  empleos, clientes, premios, métricas ni testimonios inventados. Los proyectos son conceptuales y llevan su rótulo visible
  («Proyecto conceptual · Marca ficticia»); ninguna marca ficticia puede parecerse a una real. Sin logos de marcas (las
  herramientas se nombran en texto). Contacto solo con datos reales (`content/site.ts`).
- **Sin texto en componentes:** todo sale de `messages/{es,en}.json` (mismas claves; `npm test`).
- **Mobile-first:** sin scroll horizontal a 360 px, objetivos táctiles ≥ 44 px, texto ≥ 12 px.
- **Accesibilidad:** HTML semántico, teclado completo, foco visible, contraste AA (magenta de texto: `--m-deep` sobre papel,
  `--m-light` sobre tinta), `prefers-reduced-motion` en toda animación (estado final, sin movimiento).
- **Motion:** solo `transform`, `opacity`, `clip-path`, `stroke-dashoffset`. Nada en bucle fuera de pantalla (`useInView`).
  El recorrido horizontal de la historia solo con mouse/trackpad, ≥ 1024 px y movimiento permitido; en táctil se lee en vertical.
- **Dependencias:** no se agregan sin aprobación.

## Sistema

- Tokens en `app/globals.css` (`--ink`, `--paper`, `--c/--m/--y`, `--m-deep`, `--m-light`). Marcas de imprenta en `components/print.tsx`.
- Cada sección declara `data-hdr="paper|ink|magenta"`: el header toma ese color.
- Entradas: `[data-reveal]` y `<Lines>` con un solo IntersectionObserver (`components/Reveals.tsx`).
- Carga (`Loader`) → `markReady()` → entrada de la portada (`onReady`, `lib/ready.ts`).
- Dibujos: `components/art/arts.tsx` (proyectos) y `components/tools/ToolDemo.tsx` (herramientas); ids de gradiente por instancia.
