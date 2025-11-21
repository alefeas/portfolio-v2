# Guía de Imágenes de Proyectos

## Estructura de Carpetas

Crea la siguiente estructura en `/public/images/`:

```
public/
└── images/
    ├── payto/
    │   ├── hero.jpg (1200x600px)
    │   ├── screenshot-1.jpg (1200x800px)
    │   ├── screenshot-2.jpg (1200x800px)
    │   ├── screenshot-3.jpg (1200x800px)
    │   └── screenshot-4.jpg (1200x800px)
    └── argentum/
        ├── hero.jpg (1200x600px)
        ├── screenshot-1.jpg (1200x800px)
        ├── screenshot-2.jpg (1200x800px)
        ├── screenshot-3.jpg (1200x800px)
        └── screenshot-4.jpg (1200x800px)
```

## Resoluciones Recomendadas

- **Hero Image**: 1200x600px (relación 2:1)
- **Carousel Images**: 1200x800px (relación 1.5:1)
- **Máximo de imágenes por proyecto**: 5 (ideal 3-4)

## Cómo Agregar las Imágenes

En `app/projects/[id]/page.tsx`, actualiza el array `images` de cada proyecto:

### Ejemplo para PayTo:
```typescript
{
  id: 1,
  // ... otros campos ...
  images: [
    '/images/payto/screenshot-1.jpg',
    '/images/payto/screenshot-2.jpg',
    '/images/payto/screenshot-3.jpg',
    '/images/payto/screenshot-4.jpg'
  ]
}
```

### Ejemplo para Argentum:
```typescript
{
  id: 2,
  // ... otros campos ...
  images: [
    '/images/argentum/screenshot-1.jpg',
    '/images/argentum/screenshot-2.jpg',
    '/images/argentum/screenshot-3.jpg'
  ]
}
```

## Formatos Soportados

- JPG/JPEG (recomendado para fotos)
- PNG (para screenshots con transparencia)
- WebP (mejor compresión)

## Notas

- Las imágenes se mostrarán en el carousel de la página de detalle (`/projects/[id]`)
- El hero image se muestra como fondo en la sección superior
- Las imágenes deben estar optimizadas para web (máximo 500KB cada una)
- Usa herramientas como TinyPNG o ImageOptim para comprimir
