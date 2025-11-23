---
inclusion: manual
---

# Typography System Guide

## Overview
This project uses a centralized typography system with semantic CSS classes for all headings and titles. This ensures consistency and allows for global font weight changes without modifying individual components.

## Semantic Heading Classes

All heading classes are defined in `app/globals.css` and automatically apply `font-weight: 600` (semibold).

### Available Classes

- **`.heading-1`** - Main page titles (clamp 1.75rem - 3rem)
- **`.heading-2`** - Section titles (1.875rem)
- **`.heading-3`** - Subsection titles (1.5rem)
- **`.heading-4`** - Card/component titles (1.125rem)
- **`.heading-5`** - Small titles (1rem)
- **`.heading-6`** - Extra small titles (0.875rem)
- **`.subheading`** - Alternative to heading-5
- **`.subtitle`** - Lighter weight text (500)

## Usage Examples

```tsx
// Section title
<h2 className="heading-2 text-white mb-3">My Section</h2>

// Card title
<h3 className="heading-4 text-white mb-2">Card Title</h3>

// Small component title
<h4 className="heading-5 text-white">Component Title</h4>
```

## Making Global Changes

To change the font weight for all headings globally:

1. Open `app/globals.css`
2. Find the "Semantic Typography Classes" section
3. Update the `font-weight` property in the desired class
4. All components using that class will automatically update

### Example: Change all headings to bold (700)

```css
.heading-1 {
  font-weight: 700; /* Changed from 600 */
  /* ... rest of properties */
}
```

## Components Using Typography System

### Headings (Semibold - 600)
- `SectionHeader.tsx` - Uses `.heading-2`
- `About.tsx` - Uses `.heading-4` and `.heading-5`
- `TechStack.tsx` - Uses `.heading-4`
- `Contact.tsx` - Uses `.heading-3`, `.heading-5`, `.heading-6`
- `Projects.tsx` - Uses `.heading-3`
- `Footer.tsx` - Uses `font-semibold`
- `[id]/page.tsx` - Uses `font-semibold`

### Interactive Components (Regular - 400)
- `Button.tsx` - Uses `font-normal`
- `FloatingNav.tsx` - Uses `font-normal` for labels
- `LanguageToggle.tsx` - Uses `font-normal` for buttons
- `BackButton.tsx` - Uses `font-normal`
- `Tooltip.tsx` - Uses `font-normal`
- `TechTag.tsx` - Uses `font-normal`
- `Modal.tsx` - Uses `font-normal` for action buttons
- `DemoCredentialsModal.tsx` - Uses `font-normal` for buttons and feedback

## Font Weight Strategy

### Headings & Titles (Semibold - 600)
Use for all h1-h6 tags and section titles. This creates visual hierarchy and draws attention to important content.

### Interactive Components (Regular - 400)
Use for buttons, navigation items, toggles, tooltips, and other UI controls. This keeps the interface clean and differentiates interactive elements from titles.

### Body Text (Regular - 400)
Use for paragraphs, descriptions, and general content. Configured globally in `globals.css`.

## Migration Notes

Some components still use inline `font-semibold` classes. These can be migrated to semantic classes for better maintainability:

- `Footer.tsx` - h3 and h4 tags
- `[id]/page.tsx` - h1 and h2 tags

To migrate, replace `font-semibold` with the appropriate heading class.
