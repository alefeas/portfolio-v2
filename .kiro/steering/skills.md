# Portfolio Project - Skills & Best Practices Guide

Este documento detalla las prácticas, patrones y convenciones utilizadas en este portfolio. Léelo antes de realizar cambios para mantener la consistencia del proyecto.

---

## 📋 Tabla de Contenidos

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Sistema de Idiomas (i18n)](#sistema-de-idiomas-i18n)
3. [Componentes UI — Estilos Base](#componentes-ui--estilos-base)
4. [Componentes UI — Uso](#componentes-ui--uso)
5. [Gestión de Tipos](#gestión-de-tipos)
6. [Constantes y Datos](#constantes-y-datos)
7. [Animaciones](#animaciones)
8. [Estilos y Tailwind CSS](#estilos-y-tailwind-css)
9. [Scroll y Navegación](#scroll-y-navegación)
10. [Paginación](#paginación)
11. [Patrones de Código](#patrones-de-código)
12. [Convenciones de Nombres](#convenciones-de-nombres)
13. [Flujo de Datos](#flujo-de-datos)
14. [SEO](#seo)
15. [Accesibilidad](#accesibilidad)
16. [Formulario de Contacto](#formulario-de-contacto)
17. [Performance](#performance)
18. [Guía para Descripciones de Proyectos](#guía-para-descripciones-de-proyectos)

---

## 🏗️ Estructura del Proyecto

```
app/
├── components/
│   ├── layout/          # Layout (Navbar, Footer, ScrollManager, AmbientBackground, SectionNavOverlay, etc.)
│   ├── sections/        # Secciones principales (Hero, Projects, Contact, etc.)
│   └── ui/              # Componentes reutilizables (Button, Card, Input, etc.)
├── constants/           # Datos estáticos (navigation, projects, contact, etc.)
├── contexts/            # React Contexts (LanguageContext)
├── hooks/               # Custom hooks (useTranslation)
├── lib/                 # Utilidades (translations, animations, site, validation)
├── types/               # Definiciones de tipos TypeScript
├── projects/
│   ├── [slug]/
│   │   ├── layout.tsx   # Metadata dinámica + generateStaticParams
│   │   └── page.tsx     # Detalle de proyecto
│   └── layout.tsx
├── layout.tsx           # Root layout con providers, metadata SEO, JSON-LD
├── page.tsx             # Página principal (metadata propia)
├── robots.ts            # robots.txt generado
├── sitemap.ts           # sitemap.xml generado
└── globals.css          # Estilos globales
.kiro/
└── steering/
    ├── skills.md            # Este archivo
    └── typography-system.md # Sistema de tipografía
```

### Principios de Organización

- **Separación de responsabilidades**: Cada carpeta tiene un propósito específico
- **Escalabilidad**: La estructura permite crecer sin desorden
- **Reutilización**: Los componentes UI son agnósticos del contenido
- **Sin dead code**: No exportar desde `index.ts` componentes que no se usan en ningún lugar

---

## 🌍 Sistema de Idiomas (i18n)

El proyecto es **completamente bilingüe** (Español e Inglés). El sistema de idiomas está centralizado y es muy importante mantenerlo consistente.

### Cómo Funciona

1. **Contexto Global**: `LanguageContext.tsx` proporciona el idioma actual a toda la app
2. **Traducciones Centralizadas**: `app/lib/translations.ts` contiene TODAS las traducciones
3. **Hook Personalizado**: `useTranslation()` accede a las traducciones
4. **Persistencia**: Cookie `portfolio-locale` leída por SSR + `localStorage` en cliente — sin flash al recargar

### Cómo Usar Traducciones

```typescript
'use client';

import { useTranslation } from '@/app/hooks/useTranslation';

export default function MyComponent() {
  const { t, ts, language } = useTranslation();
  
  // t() retorna string | string[] (para arrays de características)
  const title = t('myTitle') as string;
  const features = t('myFeatures') as string[];
  
  // ts() siempre retorna string (convierte arrays a string)
  const label = ts('myLabel');
  
  // language es 'en' o 'es'
  const cvFile = language === 'es' ? 'CV_ES.pdf' : 'CV_EN.pdf';
  
  return <h1>{title}</h1>;
}
```

### Reglas Importantes

1. **Nunca hardcodear texto** — todo debe estar en `translations.ts`
2. **Siempre en AMBOS idiomas** — si agregas key en `en`, debe existir en `es`
3. **Keys descriptivas** — `paytoTitle`, `houseOfCbDesc`, no `title1`, `desc2`
4. **Agrupar por sección** — usar comentarios para organizar
5. **Usar TranslationKey type** — para type-safety

### Persistencia del idioma (sin flash al recargar)

El idioma se guarda en dos lugares para garantizar que SSR y cliente siempre coincidan:

- **Cookie** (`portfolio-locale`) — SSR la lee en `app/layout.tsx` y renderiza el idioma correcto desde el inicio
- **localStorage** (`portfolio-locale`) — backup en cliente, sincronizado por `useLayoutEffect`

`app/layout.tsx` es `async` y lee la cookie via `cookies()` de `next/headers`, pasando `initialLanguage` al `LanguageProvider`.

`setLanguage()` en `LanguageContext.tsx` escribe ambos simultáneamente:

```typescript
const setLanguage = (lang: Language) => {
  setLanguageState(lang);
  localStorage.setItem('portfolio-locale', lang);
  document.cookie = `portfolio-locale=${lang}; path=/; max-age=${365 * 24 * 60 * 60}`;
};
```

```typescript
// ✅ CORRECTO
const content = t('projectTitle') as string;

// ❌ INCORRECTO
const content = 'Project Title'; // Hardcoded
```

---

## 🎨 Componentes UI — Estilos Base

Esta es la sección más importante para mantener consistencia visual. **Todos los componentes deben usar estos mismos tokens de estilo.**

### Token de Estilo Principal — Paneles calmados

Contenido (cards, inputs, features) usa fondo blanco y borde suave. **No** pintar todo con `bg-surface` — ese tono es para hovers / muted / chrome flotante.

```
bg-background
border border-border
text-foreground
```

Chips / tags suaves:

```
bg-muted
border border-border
text-muted-foreground
```

Chrome flotante (nav, language toggle):

```
bg-background/90 backdrop-blur-md
border border-border
shadow-sm   /* solo chrome fijo + Tooltip — nunca en cards/inputs/paneles estáticos */
```

**Sombras:** prohibidas en contenido estático (Card, Input, FeatureItem, TechTag, project cards, etc.). Permitidas solo en chrome fijo (`FloatingNav`, `LanguageToggle`, `MobileNav`, `BackButton`) y `Tooltip`.

### Token de Color — Primario Navy

```
text-primary              # texto activo/destacado (#001D51)
text-emphasis             # palabras resaltadas en copy (Alejo, Apasionado…) — azul #1B4F9C + weight 600
text-accent               # acentos mid-navy (#3D5A80)
bg-primary                # CTAs, footer, bloques de marca
text-primary-foreground   # texto sobre primary (#F8FAFC)
bg-primary/10             # fondo elemento activo
border-primary/50         # borde elemento activo
bg-muted + text-muted-foreground  # badges neutros (categoría, En Vivo)
```

### Token de Color — Estado Deshabilitado / Inactivo

```
text-muted-foreground     # texto secundario, navy suave (#4A6282)
opacity-30                # elemento disabled
disabled:cursor-not-allowed
```

### Token de Borde Sutil

```
border border-border      # borde estándar (#A8B4C4)
rounded-full              # botones circulares (nav, carousel, paginación)
rounded-lg / rounded-xl   # cards, inputs, contenedores
rounded-2xl / rounded-3xl # cards grandes, carousels
```

### Token de Transición

```
transition-all duration-300   # estándar para la mayoría
transition-colors duration-150 # para botones de submit
```

### Fondo ambient — AmbientBackground

Único fondo de página. Vive en `app/components/layout/AmbientBackground.tsx`, montado en el root layout (`fixed inset-0 -z-10`).

- Base blanca + tres orbes muy suaves (opacidad vía `--ambient-orb-*` en `:root`)
- Un solo glow bajo el cursor (`--ambient-cursor`), sin estela de múltiples ghosts
- Grano estático mínimo
- Sin canvas, sin WebGL, sin `filter: blur()` en el motion
- `prefers-reduced-motion` / touch: orbes quietos, sin glow de cursor

No recrear el bloque “Prismatic Aurora” en el Hero. No usar `bg-surface` / grises fuertes en cards solo porque el ambient use navy.

### Deep link externo — `/go/[section]` + SectionNavOverlay

Apps externas (AFM, LinkedIn, CV) deben usar:

```
https://afeas.vercel.app/go/projects
https://afeas.vercel.app/go/contact
```

No `/#projects` ni `?section=`. `SectionNavOverlay` cubre la pantalla (blanco + spinner navy) desde el primer paint de `/go/...` hasta que `ScrollManager` dispara `section-nav-settled` (sin fade ni delays artificiales: se oculta apenas el scroll termina). La página `/go/[section]` setea `sectionNavHold` antes del `replace('/')` — no volver a depender de `return null` sin overlay.

### Ejemplos Concretos por Componente

#### CarouselNavButton — referencia canónica de botón circular

Componente con dos variantes. **Siempre usar este componente** para botones de navegación circulares, nunca duplicar el SVG o los estilos inline.

```typescript
import { CarouselNavButton } from '@/app/components/ui';

// variant carousel (default) — posicionado absolute dentro del carousel
// absolute, top-1/2, left/right, lg:opacity-0 group-hover:opacity-100, lg:w-10 lg:h-10
<CarouselNavButton direction="prev" onClick={prevImage} />
<CarouselNavButton direction="next" onClick={nextImage} />

// variant standalone — para paginación u otros usos fuera del carousel
// sin absolute ni opacity, con disabled support, w-9 h-9 fijo
<CarouselNavButton direction="prev" onClick={() => setPage(p => p - 1)} disabled={page === 1} variant="standalone" />
<CarouselNavButton direction="next" onClick={() => setPage(p => p + 1)} disabled={page === totalPages} variant="standalone" />
```

**Diferencias clave entre variantes:**
- `carousel`: `absolute`, posición left/right hardcodeada, `lg:opacity-0 group-hover:opacity-100`, ícono `w-4 h-4 lg:w-5 lg:h-5`
- `standalone`: sin absolute, sin opacity tricks, `disabled` support, ícono `w-4 h-4` fijo

#### Floating Nav / Back Button / Modales

```typescript
// Contenedor nav floating o back button
className="... bg-background/90 backdrop-blur-md border border-border shadow-sm ..."
```

#### Cards de contenido

```typescript
// Card estándar
className="bg-surface rounded-2xl border border-border ..."

// Card con hover
className="... hover:border-accent transition-all duration-300"
```

#### Badges de estado

```typescript
// Live / categoría — mismos tokens neutros de la paleta
className="bg-muted text-muted-foreground border border-border"

// In Development — secondary de la paleta (sin amarillo hardcodeado)
className="bg-secondary text-secondary-foreground border border-border"
```

### Regla: No mezclar estilos

```typescript
// ✅ CORRECTO — usar los tokens definidos
className="w-9 h-9 rounded-full bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-accent"

// ❌ INCORRECTO — inventar estilos hardcodeados o volver al glass verde oscuro
className="w-9 h-9 rounded-lg bg-gray-800 border border-gray-600 text-gray-300"
className="bg-green-500 from-slate-900/40"
```

---

## 🧩 Componentes UI — Uso

Los componentes UI son **reutilizables, agnósticos y sin lógica de negocio**. Viven en `app/components/ui/`.

### Exportación Central

Todos los componentes se exportan desde `app/components/ui/index.ts`. Si un componente no se usa en ningún lado, **no exportarlo** (dead code = bundle weight innecesario).

### Componentes Principales

#### Button
```typescript
import { Button } from '@/app/components/ui';
<Button href="/projects" variant="cta">View Projects</Button>
// Variantes: 'primary' | 'secondary' | 'ghost' | 'cta'
```

#### Card
```typescript
<Card variant="hover" className="p-4">Content</Card>
// Variantes: 'default' | 'hover'
```

#### Input
```typescript
<Input type="email" name="email" label="Email" placeholder="your@email.com" value={value} onChange={handleChange} maxLength={100} />
```

#### SectionHeader
```typescript
<SectionHeader
  icon={<IconSVG />}
  badge={t('projects')}
  title={t('selectedWork')}
  description={t('selectedWorkDesc')}
  highlightText={t('digitalSolutions')}
/>
// Badge usa <span>, no <h1> — evita múltiples h1 en la home
// title usa <h2> — jerarquía correcta bajo el h1 del Hero
```

#### Carousel
```typescript
<Carousel images={['/img1.avif', '/img2.avif']} title="Project Name" />
```

Sub-componentes: `CarouselNavButton`, `CarouselCounter`, `CarouselDots`. Los estilos de `CarouselNavButton` son la referencia para cualquier botón circular de navegación en el proyecto.

### Crear Nuevo Componente UI

1. Crear en `app/components/ui/MiComponente.tsx`
2. Definir props en `app/types/ui.ts`
3. Exportar desde `app/components/ui/index.ts` **solo si se usa en algún lugar**
4. Usar los tokens de estilo definidos en la sección anterior

---

## 📝 Gestión de Tipos

TypeScript con `strict: true`. Todos los tipos centralizados en `app/types/`.

```
app/types/
├── index.ts      # Exporta todos los tipos
├── contexts.ts   # Tipos de contextos
├── domain.ts     # Tipos de dominio (Project, Technology, etc.)
└── ui.ts         # Props de componentes UI
```

```typescript
// ✅ Importar siempre desde @/app/types
import { ButtonProps, Project } from '@/app/types';

// ❌ No importar desde archivos específicos
import { ButtonProps } from '@/app/types/ui';
```

---

## 📦 Constantes y Datos

### `projects.ts` — Única fuente de verdad

```typescript
// Datos RAW con keys de traducción + slug SEO
export const projectsRaw: ProjectRaw[] = [{ id: 1, slug: 'house-of-cb', titleKey: 'paytoTitle', ... }];

// Transforma con traducciones (Projects.tsx y [slug]/page.tsx)
export const getProjects = (t) => projectsRaw.map(p => ({ ...p, title: t(p.titleKey) as string, ... }));

// Lookup por slug (metadata en [slug]/layout.tsx)
export const getProjectBySlug = (slug) => projectsRaw.find(p => p.slug === slug);
```

**No duplicar** esta información en otros archivos. Un solo origen.

#### Orden en la grilla de proyectos

- El **orden del array** `projectsRaw` es el orden de visualización en la home (`Projects.tsx`, `PAGE_SIZE = 6` por página).
- Reordenar = mover el bloque del proyecto en el array; **no borrar** entradas salvo que el proyecto deje de publicarse.
- `id` numérico solo alimenta redirects legacy `/projects/{id}` → `/projects/{slug}` en `next.config.ts`; no define la posición en la grilla.
- `statusKey`: `live` o `inDevelopment` (ambos con badges de la paleta: muted / secondary). `isLive` se deriva en `getProjects`.

#### Slugs y URLs de proyectos

- Cada proyecto tiene `slug: string` en `ProjectRaw` (ej: `payto`, `house-of-cb`)
- Rutas públicas: `/projects/{slug}` — **nunca** `/projects/{id}`
- Redirects 301 en `next.config.ts`: `/projects/1` → `/projects/house-of-cb` (links viejos)
- Links en UI: `href={`/projects/${project.slug}`}`

#### Imágenes de proyectos (SEO)

- Formato: `.avif` en `public/projects/{carpeta}/`
- Nombres descriptivos: `{slug}-hero.avif`, `{slug}-screenshot-1.avif`, etc.
- Rutas en `projects.ts` deben coincidir con el nombre real del archivo
- Ejemplo: `/projects/payto/payto-hero.avif`

#### Flags opcionales en proyectos

- `isPrivate?: boolean` — oculta repos en la UI cuando corresponde
- `demoUnavailable?: boolean` — muestra el modal "Demo Unavailable" al clickear Live Demo (ej: PayTo con backend offline). **No hardcodear por `projectId`**.

### CV / Resume (`public/resume/`)

- Fuentes editables: `CV_Alejo_Feas_Matej_EN.html` y `CV_Alejo_Feas_Matej_ES.html`
- PDFs generados: mismos nombres con extensión `.pdf` (los sirve el Hero / DownloadCV)
- Regenerar tras editar HTML:

```bash
npm run resume:setup   # solo la primera vez (instala Chromium para Playwright)
npm run resume         # genera ambos PDF
```

- Tooltip del ícono Resume en Hero: key `resumeTooltip` en `translations.ts` (EN: Resume / ES: Currículum)

### Patrón datos + traducciones

1. Los datos RAW tienen **keys de traducción**, no texto directo
2. `getProjects(t)` transforma los datos usando `t()`
3. Los componentes reciben datos ya traducidos

---

## ✨ Animaciones

Animaciones con **Framer Motion**. Predefinidas en `app/lib/animations.ts`.

### Entrada del chrome

Easing: `premiumEase = [0.16, 1, 0.3, 1]` en `app/lib/animations.ts`.

- Solo FloatingNav, LanguageToggle, MobileNav y BackButton: misma entrada CSS `.chrome-enter` (`translateY(-14px)`, 0.7s, `cubic-bezier(0.16, 1, 0.3, 1)`). En `/go` el chrome no se monta y `body[data-chrome-hold]` pausa la animación hasta que el loader termina, para que se vea completa igual que al recargar.
- `useReducedMotion()` apaga el movimiento
- **Sin** reveals al scrollear ni animaciones de entrada en Hero / secciones / footer
- Hero H1 usa `font-medium` (menos bold, más natural)

### Reglas de Animaciones

- **No usar `filter: blur()`** en animaciones de entrada
- **No** `whileInView` / Reveal en contenido de página
- Hover/interacción OK (tech cards, etc.)
- **Easing**: `premiumEase` para chrome; `easeOut` / `easeInOut` para el resto

---

## 🎨 Estilos y Tailwind CSS

### Convenciones

1. **Tailwind primero** — no crear clases CSS nuevas si Tailwind lo cubre
2. **Responsive**: `md:`, `lg:`, `sm:` para breakpoints — mobile first
3. **Sin estilos inline** para colores o espaciado

```typescript
// ✅ CORRECTO
<div className="px-4 md:px-6 py-3 bg-surface border border-border rounded-lg">

// ❌ INCORRECTO
<div style={{ padding: '16px', backgroundColor: '#1e293b' }}>
```

### Clases personalizadas en globals.css

Ver `typography-system.md` para el sistema completo de headings.

```css
/* Usar siempre estas clases para headings */
.heading-1 / .heading-2 / .heading-3 / .heading-4 / .heading-5 / .heading-6
```

---

## 🔀 Scroll y Navegación

### ScrollManager (`app/components/layout/ScrollManager.tsx`)

Componente global en el root layout. Maneja dos comportamientos:

1. **F5 / recarga** → siempre va al top (`window.history.scrollRestoration = 'manual'` + `window.scrollTo(0, 0)`)
2. **Navegación a sección** (BackButton, `/go/[section]`, etc.) → lee `sessionStorage` y hace `scrollIntoView({ behavior: 'instant' })` apenas el DOM tiene el target (primer intento inmediato; retry solo si el nodo aún no existe)

### Patrón Back Button con scroll a sección

```typescript
// En BackButton — mismo flujo que deep links externos
const handleClick = () => {
  if (scrollToId && isSectionId(scrollToId)) {
    router.push(`/go/${scrollToId}`);
    return;
  }
  router.back();
};
```

**Por qué `/go/[section]` y no `router.back()` / `push('/')` directo:** cubre el salto de scroll con `SectionNavOverlay`, reutiliza el deep-link path, y evita historial sucio por `#hash`. En project detail el back siempre vuelve a Projects en home.

### Navegación por secciones en Project Detail

**No usar** `<Link href="#overview">` ni similares. Usar botones + scroll programático:

```typescript
const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
};

<button type="button" onClick={() => scrollToSection('overview')} className={sectionNavClassName}>
  {t('overview')}
</button>
```

Los `id` en las secciones del contenido se mantienen (`overview`, `features`, etc.) solo como anchors de scroll, no en la URL.

// En ScrollManager — leer y aplicar después del render
useEffect(() => {
  if (pathname === '/') {
    const target = sessionStorage.getItem('scrollTo');
    if (target) {
      sessionStorage.removeItem('scrollTo');
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'instant' }); // instant, no smooth
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  }
}, [pathname]);
```

**Importante**: Usar `behavior: 'instant'` (no `smooth`) cuando se viene del back button, para que la página aparezca directamente posicionada sin el viaje visual desde el top.

### Patrón links de navegación desde cualquier página (Footer, etc.)

Cuando un link necesita navegar a una sección de home desde cualquier página, usar el mismo patrón de `sessionStorage` — no `scrollIntoView` directo (solo funciona si ya estás en `/`):

```typescript
'use client';
import { useRouter, usePathname } from 'next/navigation';

const router = useRouter();
const pathname = usePathname();

const scrollToSection = useCallback((id: string) => {
  if (pathname === '/') {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  } else {
    sessionStorage.setItem('scrollTo', id);
    router.push('/');
  }
}, [pathname, router]);
```

El `ScrollManager` ya lee `sessionStorage` al llegar a `/`, así que no requiere cambios adicionales.

### Links externos desde otra app (AFM, LinkedIn, CV, etc.)

**No usar** `/#projects` ni `?section=projects` — el portfolio no navega por hash y el `ScrollManager` fuerza top en recarga.

Usar la ruta dedicada `/go/[section]`, que replica el mismo flujo interno (`sessionStorage` + `router.replace('/')`) y muestra `SectionNavOverlay` hasta que el scroll termina:

```
https://afeas.vercel.app/go/projects
https://afeas.vercel.app/go/contact
```

Secciones válidas: `hero`, `projects`, `tech-stack`, `about`, `contact` (ver `floatingNavItems`).

Implementación: `app/go/[section]/page.tsx` + `SectionNavOverlay` + helper `app/lib/sectionNavigation.ts` (`buildSectionUrl` para generar el link desde otras apps). AFM consume la URL en `config/team.ts` (`projectsUrl`).

### Scroll programático dentro de la misma página

Cuando un cambio de estado requiere scroll (ej: cambio de página en paginación), usar `useEffect` para que ocurra **después del render**, no en el `onClick`:

```typescript
// ✅ CORRECTO — scroll después del render
const isFirstRender = useRef(true);
useEffect(() => {
  if (isFirstRender.current) { isFirstRender.current = false; return; }
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
}, [page]);

// ❌ INCORRECTO — scroll en el mismo onClick que dispara el re-render
onClick={() => { setPage(n); document.getElementById('projects')?.scrollIntoView(...); }}
```

---

## 📄 Paginación

### Patrón estándar — estado local

Para secciones paginadas dentro de la misma SPA (sin URL params):

```typescript
const PAGE_SIZE = 6; // constante en el top del archivo

const [page, setPage] = useState(1);
const totalPages = Math.ceil(items.length / PAGE_SIZE);
const paginated = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
```

### Scroll al cambiar página

```typescript
const isFirstRender = useRef(true);
useEffect(() => {
  if (isFirstRender.current) { isFirstRender.current = false; return; }
  document.getElementById('section-id')?.scrollIntoView({ behavior: 'smooth' });
}, [page]);
```

### Estilos de paginación (mismos que CarouselNavButton)

```typescript
{/* Prev / Next — botones circulares con SVG */}
<button
  onClick={() => setPage(p => p - 1)}
  disabled={page === 1}
  className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-foreground transition-all duration-300 hover:border-accent hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</button>

{/* Número de página — activo */}
className="w-9 h-9 rounded-full border-primary/50 bg-primary/10 text-primary ..."

{/* Número de página — inactivo */}
className="w-9 h-9 rounded-full bg-surface border-border text-muted-foreground hover:border-accent hover:bg-card hover:text-foreground ..."

{/* Renderizar paginación solo si hay más de una página */}
{totalPages > 1 && ( ... )}
```

---

## 🔄 Patrones de Código

### Next.js Image

**Siempre usar `<Image>` de Next.js**, nunca `<img>`.

```typescript
import Image from 'next/image';

// Tamaño fijo
<Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain" />

// Responsive con fill
<div className="relative w-full h-64">
  <Image src="/hero.jpg" alt="Hero" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
</div>
```

- `priority` para imágenes above-the-fold (LCP)
- `lazy` por defecto para below-the-fold
- `.avif` es el formato preferido para imágenes del proyecto
- `quality={95}` o `quality={100}` para fotos de perfil o imágenes donde la nitidez es crítica — el default `q=75` de Next.js es notablemente peor. Usar `100` es válido si la imagen está below-the-fold (hay tiempo de carga); para above-the-fold preferir `95` para no penalizar el LCP

### Client vs Server Components

```typescript
// Client — cuando usa hooks, estado, eventos
'use client';
import { useState } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';

// Server — por defecto, sin 'use client'
// No puede usar hooks ni eventos
```

### Wrapper para Contextos en Layout

```typescript
// NavbarWrapper.tsx — 'use client' para acceder a contexto
export default function NavbarWrapper() {
  const { language } = useLanguage();
  return <Navbar language={language} />;
}

// layout.tsx — usa wrapper, no el componente directo
<LanguageProvider>
  <NavbarWrapper />
</LanguageProvider>
```

### useMemo para datos pesados

```typescript
// En project detail — evitar recalcular en cada render
const projects = useMemo(() => getProjects(t), [t]);
const project = useMemo(() => projects.find(p => p.slug === projectSlug), [projects, projectSlug]);
const allImages = useMemo(() => {
  if (!project) return [];
  return project.heroImage ? [project.heroImage, ...(project.images || [])] : project.images || [];
}, [project]);
```

---

## 📛 Convenciones de Nombres

### ⚠️ TODO EL CÓDIGO EN INGLÉS

Variables, funciones, componentes, comentarios, archivos, carpetas — todo en inglés. Las únicas excepciones son el contenido de `translations.ts`.

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Archivos/Carpetas | PascalCase | `Button.tsx`, `projects.ts` |
| Variables | camelCase | `userEmail`, `isLoading` |
| Funciones | camelCase | `handleSubmit`, `getProjects` |
| Componentes | PascalCase | `ContactForm`, `ProjectCard` |
| Interfaces | PascalCase + Props | `ButtonProps`, `ProjectDetail` |
| Types | PascalCase | `Language`, `ButtonVariant` |
| Constantes módulo | UPPER_CASE | `PAGE_SIZE`, `API_URL` |
| Keys traducción | camelCase | `contactFormTitle`, `paytoDesc` |

---

## 🔀 Flujo de Datos

```
LanguageProvider (layout.tsx)
    ↓
LanguageContext → useTranslation()
    ↓
getProjects(t) — transforma RAW data con traducciones
    ↓
Componentes reciben datos ya traducidos
    ↓
Componentes UI (Button, Card, etc.) — sin lógica de negocio
    ↓
Estilos Tailwind + Animaciones Framer Motion
```

---

## 🔍 SEO

### Configuración central — `app/lib/site.ts`

Constantes compartidas para metadata, sitemap, robots y links sociales:

- `SITE_URL` — resuelve en orden: `NEXT_PUBLIC_SITE_URL` → `VERCEL_URL` → `http://localhost:3000`
- `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_NAME`, `DEFAULT_OG_IMAGE`
- `SOCIAL_LINKS` — github, linkedin, email, whatsapp (usar en Hero, Footer, Contact; no hardcodear URLs)

**Producción:** setear `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com` en Vercel.

### Metadata

| Archivo | Responsabilidad |
|---------|-----------------|
| `app/layout.tsx` | `metadataBase`, OG, Twitter Card, canonical, JSON-LD (`Person` + `WebSite`), favicon `public/favicon.png?v=2` (`image/png`) |
| `app/page.tsx` | `title` + `description` explícitos para home |
| `app/projects/[slug]/layout.tsx` | `generateMetadata` con título/descripción real del proyecto, OG image del hero, `generateStaticParams` |

Metadata de proyectos usa `translations.en[descriptionKey]` (idioma indexable fijo en EN).

### Archivos generados

- `app/sitemap.ts` — home + todas las rutas `/projects/{slug}`
- `app/robots.ts` — `Allow: /` + referencia al sitemap

### Jerarquía de headings (SEO + a11y)

- **Home:** un solo `<h1>` (Hero). SectionHeader badge = `<span>`, título de sección = `<h2>`
- **Project cards:** título = `<h3>` bajo el `<h2>` de la sección Projects
- **Project detail:** `<h1>` título → `<h2>` secciones. Label "Sections" en sidebar = `<p>` + `aria-labelledby` en `<nav>`, **no** `<h3>`

### Layout semántico

- Contenido principal envuelto en `<main id="main-content">` en `app/layout.tsx`
- Footer fuera de `<main>`

### next.config.ts

- **Un solo archivo** de config (`next.config.ts`). No crear `next.config.js` duplicado.
- Incluye `redirects()` (IDs → slugs) y `images.remotePatterns`
- Tras cambios de config o errores de chunks corruptos: borrar `.next` y `npm run build` de nuevo

---

## ♿ Accesibilidad

### Botones e iconos

- Botones solo con ícono: siempre `aria-label` (FloatingNav, IconButton, links sociales del Footer)
- FloatingNav: `<nav aria-label="Section navigation">` + `aria-label={`Go to ${item.label}`}` por botón

### Links sociales

- Centralizar URLs en `SOCIAL_LINKS` (`app/lib/site.ts`) — misma URL en Hero, Footer y Contact
- Iconos del Footer: `aria-label="GitHub"` / `"LinkedIn"` / `"Email"` / `"WhatsApp"` (no solo `title`)

### Headings

- No saltar niveles (`h1` → `h3` sin `h2` intermedio)
- Labels de navegación lateral no son headings — usar `<p>` o `<span>`

---

## 📬 Formulario de Contacto

- Backend: **Formspree** (`https://formspree.io/f/...`) — validación server-side más estricta que HTML5
- Validación front: `isValidEmail()` en `app/lib/validation.ts` — TLD mínimo 2 caracteres
- No confiar solo en `type="email"` del navegador (acepta `asd@a.c`)
- Usar `pattern="[^\s@]+@[^\s@]+\.[^\s@]{2,}"` + validación en `handleSubmit` antes del fetch
- Errores de email: mensaje bajo el campo (`invalidEmail` en `translations.ts` EN/ES)
- Header `Accept: application/json` para parsear errores de Formspree si el email falla en server
- Links de contacto en la sección Contact: grilla `grid-cols-2` (2×2), no columna única en desktop

---

## 🚀 Performance

### Reglas Anti-Slowdown

1. **No usar `filter: blur()` en animaciones** — costoso en GPU, retrasa el paint inicial
2. **No Suspense innecesario** — la app carga datos síncronamente desde constantes, no necesita Suspense
3. **No skeletons innecesarios** — si el dato ya está disponible client-side, no hay loading state
4. **No exportar dead code** desde `index.ts` — aumenta el bundle
5. **`useRef` para evitar efectos en primer render** — cuando un `useEffect` no debe correr en mount
6. **`useMemo` para cálculos pesados** — especialmente con `getProjects(t)` en pages de detalle
7. **Imágenes `.avif`** — formato más eficiente, ya implementado en todos los proyectos
8. **`behavior: 'instant'` vs `'smooth'`** — usar instant cuando la posición debe ser inmediata (back button), smooth cuando el usuario inicia la acción
9. **Consistencia de `sizes` entre componentes** — si la misma imagen se muestra en dos componentes distintos (ej: card en home y carousel en detalle), ambos deben usar `fill` + los mismos `sizes` para que Next.js genere la misma URL optimizada y el browser reutilice el cache. Nunca mezclar `width/height` fijo en un componente con `fill` en otro para la misma imagen.
10. **Preload de imágenes en Carousel** — preloadear con `<link rel="preload">` apuntando a la URL optimizada de Next.js, no con `new Image()` que descarga el archivo original sin optimizar:

```typescript
// ✅ CORRECTO — preload de la URL optimizada que Next.js realmente sirve
images.slice(1).forEach((src) => {
  const url = `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  document.head.appendChild(link);
});

// ❌ INCORRECTO — descarga el original, no la versión cacheada por Next.js
const img = new window.Image();
img.src = src;
```

### Qué NO agregar

- `Suspense` boundaries para componentes que no hacen async fetching
- Skeletons para datos que ya están disponibles en el bundle
- Loaders para transiciones de página si los datos son síncronos
- `filter: blur()` en animaciones de entrada

### Dependencias y seguridad

Next.js puede arrastrar `postcss < 8.5.10` como dependencia anidada. **No usar** `npm audit fix --force` (baja Next a versiones rotas). Usar override en `package.json`:

```json
"overrides": {
  "postcss": "^8.5.10"
}
```

Luego `npm install` y verificar con `npm audit`.

---

## 📚 Guía para Descripciones de Proyectos

### Objetivo

Contar **todo lo relevante** del proyecto — arquitectura, módulos, integraciones, infraestructura, prácticas — de forma **completa y profesional**. No filtrar capacidades importantes por miedo a ser “demasiado técnico”. El lector debe entender qué se construyó, cómo está armado y qué tan profundo es el trabajo.

### Formato de contenido — qué SÍ va en los textos

- **Stack y arquitectura**: monorepo, capas, BFF, apps separadas, bases de datos, caches, colas, etc.
- **Módulos funcionales**: reportes, markup, auth, notificaciones, composición de paquetes, etc.
- **Integraciones y tecnologías**: Redis, Socket.io, Playwright, Google Drive/Sheets, OAuth, etc.
- **Arquitectura y principios**: mencionar capas, SOLID, bounded contexts, etc. **sin** listar carpetas ni clases — una frase clara basta (ej. “arquitectura de cuatro capas + SOLID en API y admin”).
- **Infra de producción**: Docker, Cloudflare, Nginx, VPS, backups.
- **Desafíos y learnings** en lenguaje técnico pero legible (sin “aprendí”, “construí desde cero”).
- **Versiones exactas** en el array `tech[]` de `projects.ts` — no en la prosa de las descripciones salvo cuando aporta contexto arquitectónico (ej. “Express 5 API”, “Next.js 16”).

### Formato de contenido — qué NO va en los textos

Los textos describen **qué se hizo y con qué técnicas**, no son un inventario de código. **No incluir:**

| ❌ Evitar | ✅ En su lugar |
|-----------|----------------|
| URLs, dominios, links internos | Van solo en `demo` / `github` de `projects.ts` |
| Rutas de app (`/dashboard/...`, `/aruba/...`) | “dashboard admin”, “sitio público”, “módulo de reportes” |
| Endpoints (`POST /api/...`) | “composición live de paquetes”, “webhooks de revalidación” |
| Nombres de clases, schedulers, CRON jobs | “jobs programados”, “keepalive en background”, “cleanup de retención” |
| Entidades Prisma / modelos sueltos | “destinos paquete”, “reportes de vuelo”, “reglas de markup” |
| Paths de archivos (`back/Dockerfile`, etc.) | “imagen Docker de la API”, “monorepo TypeScript” |
| Variables de entorno | “acceso a carpeta Drive desde la UI” |
| Nombres de wholesalers/proveedores externos | “integraciones de inventario live”, “inventario browser-based” |
| Jerga de dominio sin contexto (“markup”, “GROSS/NET”, “FX”, “handoff”) | Explicar en la misma frase. ES: evitar siglas crudas — “modo neto (comisión sobre costo del proveedor) / modo bruto (comisión sobre precio de venta)”. EN: “net mode / gross mode” con la misma aclaración. |
| Features/features incompletas o a medio hacer | Omitir módulos no terminados (ej. asistente AI) |

### Lenguaje Profesional

**✅ CORRECTO:**
- "Production-grade full-stack platform"
- "Architected as a TypeScript monorepo with three separately deployed applications"
- "Reinforced expertise in..."
- "Validated end-to-end delivery from integration packages through production deploy"

**❌ INCORRECTO:**
- "I built from scratch"
- "I learned how to..."
- "This was my first time..."
- "I gained experience in..."
- Listar URLs del dashboard como features
- Copiar nombres de clases del repo en la descripción pública

### Estructura por Proyecto

1. **Título**: claro y profesional
2. **Descripción corta** (`*Desc`): 1 línea con lo principal
3. **Descripción detallada** (`*DetailDesc`): qué es, para quién, stack, arquitectura, módulos — **completa pero sin inventario de código**
4. **Features** (`*Features`): **12–14 ítems** — técnicas y capacidades, no links ni rutas
5. **Challenges** (`*Challenges`): desafíos técnicos reales
6. **Learnings** (`*Learnings`): qué reforzó/validó (no “aprendí”)
7. **Traducciones**: siempre **EN y ES** con el mismo nivel de detalle y las mismas capacidades cubiertas

### Tech array (`projects.ts`)

- Incluir **todas** las tecnologías relevantes del proyecto (infra incluida: Docker, Nginx, **Cloudflare**, AWS, etc.).
- Usar versiones exactas del lockfile cuando existan.
- No duplicar en `tech[]` lo que ya está implícito en el framework (ej. no listar React aparte si Next.js ya lo cubre, salvo que el proyecto lo use también fuera de Next).

---

## ✅ Checklist para Cambios

Antes de cualquier cambio, verificar:

- [ ] ¿Necesita traducciones? → `translations.ts` en EN **y** ES
- [ ] ¿Es un componente reutilizable? → `app/components/ui/`
- [ ] ¿Es una sección? → `app/components/sections/`
- [ ] ¿Tiene tipos? → `app/types/`
- [ ] ¿Usa los tokens de estilo correctos? → Ver sección "Estilos Base"
- [ ] ¿Los botones siguen el patrón `CarouselNavButton`? → `rounded-full`, gradients, `backdrop-blur-sm`
- [ ] ¿El scroll programático está en `useEffect`? → No en `onClick` (excepto nav interna de project detail con `scrollToSection`)
- [ ] ¿Links de sección en project detail usan botones, no `#hash`? → No ensuciar URL/historial
- [ ] ¿Back desde project detail usa `router.push(\`/go/${scrollToId}\`)` (ej. `/go/projects`)? → No `router.push('/')` ni `router.back()` cuando hay `scrollToId`
- [ ] ¿Demo offline usa `demoUnavailable` en `projects.ts`? → No hardcodear `projectId`
- [ ] ¿Proyecto nuevo? → Agregar `slug`, rutas de imagen SEO, entrada en sitemap vía `projectsRaw`
- [ ] ¿Reordenar destacados? → Mover bloques en `projectsRaw` (grilla paginada de 6); ver sección “Orden en la grilla”
- [ ] ¿Proyecto nuevo o textos editados? → Revisar guía “Descripciones de Proyectos”: completo, sin URLs/rutas/clases, EN **y** ES al mismo nivel
- [ ] ¿Links a proyectos usan `project.slug`? → No `/projects/${id}`
- [ ] ¿URLs sociales? → `SOCIAL_LINKS` en `site.ts`, no hardcodeadas
- [ ] ¿Metadata de proyecto? → Descripción real en `[slug]/layout.tsx`, no texto genérico
- [ ] ¿Headings? → Un h1 por página, sin saltos de nivel, badge SectionHeader = span
- [ ] ¿Formulario con email? → `isValidEmail()` + key `invalidEmail` en EN y ES
- [ ] ¿Editaste CV HTML? → Correr `npm run resume` para regenerar PDFs
- [ ] ¿Se exporta desde `index.ts` solo si se usa? → No dead exports
- [ ] ¿Usa `<Image>` de Next.js? → No `<img>`
- [ ] ¿Sin `filter: blur()` en animaciones? → Performance
- [ ] ¿Es responsive? → Mobile first, `md:`, `lg:`
- [ ] ¿Todo el código en inglés? → Variables, comentarios, nombres

---

**Última actualización**: Sep 2026 (paleta Essence, Fustat, favicon PNG, chrome-enter, BackButton → `/go/[section]`, Contact 2×2, sin scroll reveals)
**Versión del Proyecto**: 2.4
