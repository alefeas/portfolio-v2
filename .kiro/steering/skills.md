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
14. [Performance](#performance)
15. [Guía para Descripciones de Proyectos](#guía-para-descripciones-de-proyectos)

---

## 🏗️ Estructura del Proyecto

```
app/
├── components/
│   ├── layout/          # Componentes de layout (Navbar, Footer, ScrollManager, etc.)
│   ├── sections/        # Secciones principales (Hero, Projects, Contact, etc.)
│   └── ui/              # Componentes reutilizables (Button, Card, Input, etc.)
├── constants/           # Datos estáticos (navigation, projects, contact, etc.)
├── contexts/            # React Contexts (LanguageContext)
├── hooks/               # Custom hooks (useTranslation)
├── lib/                 # Utilidades (translations, animations)
├── types/               # Definiciones de tipos TypeScript
├── projects/
│   ├── [id]/
│   │   ├── layout.tsx   # Metadata dinámica por proyecto
│   │   └── page.tsx     # Detalle de proyecto
│   └── layout.tsx
├── layout.tsx           # Root layout con providers
├── page.tsx             # Página principal
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

```typescript
// ✅ CORRECTO
const content = t('projectTitle') as string;

// ❌ INCORRECTO
const content = 'Project Title'; // Hardcoded
```

---

## 🎨 Componentes UI — Estilos Base

Esta es la sección más importante para mantener consistencia visual. **Todos los componentes deben usar estos mismos tokens de estilo.**

### Token de Estilo Principal — Glass/Card

Todos los contenedores, botones, modales y cards usan este patrón base:

```
bg-gradient-to-br from-slate-900/40 to-slate-800/30
backdrop-blur-xl
border border-slate-700/30
```

Para elementos interactivos (botones nav, carousel, paginación) la versión más opaca:

```
bg-gradient-to-br from-slate-900/60 to-slate-800/40
backdrop-blur-sm
border border-slate-700/30
```

En hover:
```
hover:border-slate-600/50
hover:from-slate-900/80 hover:to-slate-800/60
```

### Token de Color — Verde Primario

```
text-green-400          # texto activo/destacado
text-green-500          # íconos, acentos
bg-green-500/10         # fondo elemento activo
border-green-500/50     # borde elemento activo
bg-green-500/20         # badge Live
border-green-500/30     # borde badge Live
```

### Token de Color — Estado Deshabilitado / Inactivo

```
text-white/60           # texto inactivo
opacity-30              # elemento disabled
disabled:cursor-not-allowed
```

### Token de Borde Sutil

```
border border-slate-700/30    # borde estándar
rounded-full                  # botones circulares (nav, carousel, paginación)
rounded-lg / rounded-xl       # cards, inputs, contenedores
rounded-2xl / rounded-3xl     # cards grandes, carousels
```

### Token de Transición

```
transition-all duration-300   # estándar para la mayoría
transition-colors duration-150 # para botones de submit
```

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
className="... bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl border border-slate-700/30 shadow-2xl ..."
```

#### Cards de contenido

```typescript
// Card estándar
className="bg-gradient-to-br from-slate-900/40 to-slate-800/30 rounded-2xl border border-slate-700/30 ..."

// Card con hover
className="... hover:border-slate-600/50 transition-all duration-300"
```

#### Badges de estado

```typescript
// Live
className="bg-green-500/20 text-green-400 border-green-500/30"

// In Development
className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"

// Categoría / neutro
className="bg-gradient-to-br from-slate-900/40 to-slate-800/30 text-white/60 border border-slate-700/30"
```

### Regla: No mezclar estilos

```typescript
// ✅ CORRECTO — usar los tokens definidos
className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm border border-slate-700/30 text-white/60 hover:text-white"

// ❌ INCORRECTO — inventar estilos hardcodeados
className="w-9 h-9 rounded-lg bg-gray-800 border border-gray-600 text-gray-300"
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
<Button href="/projects" variant="cta">Explore More</Button>
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
// Datos RAW con keys de traducción
export const projectsRaw: ProjectRaw[] = [{ id: 1, titleKey: 'paytoTitle', ... }];

// Función que transforma con traducciones (usada en Projects.tsx y [id]/page.tsx)
export const getProjects = (t) => projectsRaw.map(p => ({ ...p, title: t(p.titleKey) as string, ... }));
```

**No duplicar** esta información en otros archivos. Un solo origen.

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

### Convenciones del Hero (referencia de velocidad)

```typescript
// Entrada rápida — sin filter blur (costoso en GPU)
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.2, delay: 0.08, ease: "easeOut" }}

// Stagger entre elementos: delay += 0.08 por elemento
// Stagger entre botones: delay += 0.03 por botón
```

### Reglas de Animaciones

- **No usar `filter: blur()`** en animaciones de entrada — es muy costoso en GPU y retrasa el paint
- **Duración**: 0.2s para entradas rápidas (Hero), 0.3-0.6s para secciones
- **y inicial**: 20px máximo para entradas sutiles
- **Easing**: `easeOut` para entradas, `easeInOut` para loops
- **Loops en Hero**: `duration: 1.2, repeat: Infinity` para animaciones sutiles (ej: flecha CTA)

---

## 🎨 Estilos y Tailwind CSS

### Convenciones

1. **Tailwind primero** — no crear clases CSS nuevas si Tailwind lo cubre
2. **Responsive**: `md:`, `lg:`, `sm:` para breakpoints — mobile first
3. **Sin estilos inline** para colores o espaciado

```typescript
// ✅ CORRECTO
<div className="px-4 md:px-6 py-3 bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 rounded-lg">

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
2. **Back button desde project detail** → navega a `/` con `router.push('/')` (no `router.back()`) y scroll instantáneo a `#projects` vía `sessionStorage`

### Patrón Back Button con scroll a sección

```typescript
// En BackButton — guardar target y navegar explícito a home (evita historial sucio por #hash)
const handleClick = () => {
  if (scrollToId) {
    sessionStorage.setItem('scrollTo', scrollToId);
    router.push('/');
    return;
  }
  router.back();
};
```

**Por qué no `router.back()` en project detail:** los links internos de sección no deben usar `#hash` (ensucian URL e historial). El back debe ser predecible: siempre volver a Projects en home.

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
  className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm border border-slate-700/30 flex items-center justify-center text-white transition-all duration-300 hover:border-slate-600/50 hover:from-slate-900/80 hover:to-slate-800/60 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</button>

{/* Número de página — activo */}
className="w-9 h-9 rounded-full border-green-500/50 bg-green-500/10 text-green-400 ..."

{/* Número de página — inactivo */}
className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-900/60 to-slate-800/40 border-slate-700/30 text-white/60 hover:border-slate-600/50 hover:from-slate-900/80 hover:to-slate-800/60 hover:text-white ..."

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
const project = useMemo(() => projects.find(p => p.id === projectId), [projects, projectId]);
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

### Lenguaje Profesional

**✅ CORRECTO:**
- "Production-grade full-stack platform"
- "Architected entirely with..."
- "Reinforced my expertise in..."
- "Validated my ability to deliver..."

**❌ INCORRECTO:**
- "I built from scratch"
- "I learned how to..."
- "This was my first time..."
- "I gained experience in..."

### Estructura por Proyecto

1. **Título**: claro y profesional
2. **Descripción corta**: 1 línea con lo principal
3. **Descripción detallada**: qué es, para quién, stack, arquitectura
4. **Features**: 12-14 ítems
5. **Challenges**: desafíos técnicos reales
6. **Learnings**: qué reforzó/validó (no "aprendí")

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
- [ ] ¿Back desde project detail usa `router.push('/')` + `scrollToId`? → No `router.back()` cuando hay `scrollToId`
- [ ] ¿Demo offline usa `demoUnavailable` en `projects.ts`? → No hardcodear `projectId`
- [ ] ¿Editaste CV HTML? → Correr `npm run resume` para regenerar PDFs
- [ ] ¿Se exporta desde `index.ts` solo si se usa? → No dead exports
- [ ] ¿Usa `<Image>` de Next.js? → No `<img>`
- [ ] ¿Sin `filter: blur()` en animaciones? → Performance
- [ ] ¿Es responsive? → Mobile first, `md:`, `lg:`
- [ ] ¿Todo el código en inglés? → Variables, comentarios, nombres

---

**Última actualización**: Julio 2026
**Versión del Proyecto**: 2.0
