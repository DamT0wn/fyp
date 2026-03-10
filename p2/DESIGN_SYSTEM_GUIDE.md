# Intrex Design System Guide

## 🎯 Brand Identity

### Brand Name
**Intrex** — Interview Mastery Platform

### Tagline
"Master Every Interview with AI-Powered Analytics"

### Brand Voice
- Refined & Ambitious
- Confident & Data-Forward
- Clean but with Personality
- Like Bloomberg Terminal met Figma's marketing site

---

## 🎨 Color System

### Primary Colors
| Color | Hex | Usage | CSS Variable |
|-------|-----|-------|--------------|
| Electric Purple | `#6D5BFF` | Primary CTAs, accents, highlights | `brand-primary` |
| Electric Cyan | `#00D4FF` | Live states, AI activity, secondary accents | `brand-secondary` |
| Neon Mint | `#10F0A0` | Success states, positive feedback | `brand-success` |
| Warm Amber | `#F59E0B` | Testimonial stars, premium touches | `brand-accent` |

### Background Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Black | `#09090E` | Primary background (near-black with blue undertone) |
| Secondary | `#0C0D15` | Alternating sections for rhythm |
| Surface | `#0F1018` | Card surfaces |

### Text Colors
| Color | Hex | Usage |
|-------|-----|-------|
| White | `#FFFFFF` | Primary text, headings |
| Secondary | `#9CA3C8` | Secondary text, descriptions |
| Tertiary | `#4B5280` | Tertiary text, subtle info |

### Borders & Dividers
- Primary: `rgba(255, 255, 255, 0.06)` — Card borders
- Secondary: `rgba(255, 255, 255, 0.10)` — Hover states
- Tertiary: `rgba(255, 255, 255, 0.03)` — Grid patterns

---

## 📝 Typography

### Font Stack
```css
/* Headings */
font-family: 'Instrument Serif', serif;

/* Body & UI */
font-family: 'DM Sans', system-ui, sans-serif;

/* Numbers & Data */
font-family: 'JetBrains Mono', monospace;
```

### Type Scale

#### Display (Hero)
- Size: `clamp(52px, 6vw, 88px)`
- Weight: Bold (700)
- Line Height: 1.05
- Font: Instrument Serif
- Usage: Main headline

#### Heading 1
- Size: 48px (md: 56px)
- Weight: Bold (700)
- Font: Instrument Serif
- Usage: Section titles

#### Heading 2
- Size: 32px
- Weight: Bold (700)
- Font: Instrument Serif
- Usage: Subsection titles

#### Heading 3
- Size: 24px
- Weight: Semibold (600)
- Font: Instrument Serif
- Usage: Card titles

#### Body Large
- Size: 18px
- Weight: Regular (400)
- Line Height: 1.6
- Font: DM Sans
- Usage: Subtitle, descriptions

#### Body Regular
- Size: 16px
- Weight: Regular (400)
- Line Height: 1.6
- Font: DM Sans
- Usage: Body text

#### Body Small
- Size: 14px
- Weight: Regular (400)
- Line Height: 1.5
- Font: DM Sans
- Usage: Secondary text, labels

#### Mono (Data)
- Size: 16px-32px
- Weight: Bold (600)
- Font: JetBrains Mono
- Usage: Numbers, stats, metrics

---

## 🎭 Component Styles

### Buttons

#### Primary Button
```css
Background: linear-gradient(to right, #6D5BFF, #00D4FF)
Color: White
Padding: 12px 24px (sm), 16px 32px (lg)
Border Radius: 8px
Box Shadow: 0 0 24px rgba(109, 91, 255, 0.4)
Hover: scale(1.05), enhanced shadow
Active: scale(0.95)
```

#### Secondary Button
```css
Background: rgba(255, 255, 255, 0.05)
Color: White
Padding: 12px 24px (sm), 16px 32px (lg)
Border: 1px solid rgba(255, 255, 255, 0.20)
Border Radius: 8px
Backdrop Filter: blur(12px)
Hover: bg-white/10, border-brand-primary/50
```

#### Ghost Button
```css
Background: Transparent
Color: White
Border: 1px solid rgba(255, 255, 255, 0.10)
Hover: bg-white/5, border-white/20
```

### Cards

#### Feature Card
```css
Background: rgba(255, 255, 255, 0.05)
Backdrop Filter: blur(16px)
Border: 1px solid rgba(255, 255, 255, 0.10)
Border Radius: 12px
Padding: 24px
Hover: 
  - Border: rgba(255, 255, 255, 0.20)
  - Transform: translateY(-4px)
  - Shadow: 0 20px 40px rgba(0, 0, 0, 0.3)
```

#### Testimonial Card
```css
Background: rgba(255, 255, 255, 0.05)
Backdrop Filter: blur(16px)
Border: 1px solid rgba(255, 255, 255, 0.10)
Border Radius: 12px
Padding: 32px
Quote Mark: 5% opacity watermark
Avatar: Gradient circle (12px radius)
```

### Badges & Pills

#### Live Badge
```css
Background: rgba(16, 240, 160, 0.20)
Color: #10F0A0
Border: 1px solid rgba(16, 240, 160, 0.40)
Border Radius: 9999px
Padding: 4px 12px
Font Size: 10px
Font Weight: Bold
Animation: pulse-glow (2s infinite)
```

#### Trust Badge
```css
Background: rgba(255, 255, 255, 0.05)
Color: #9CA3C8
Border Left: 2px solid (brand color)
Border Radius: 9999px
Padding: 6px 12px
Font Size: 12px
```

---

## ✨ Effects & Animations

### Shadows

#### Glow Purple
```css
box-shadow: 0 0 24px rgba(109, 91, 255, 0.4)
```

#### Glow Cyan
```css
box-shadow: 0 0 24px rgba(0, 212, 255, 0.3)
```

#### Glow Mint
```css
box-shadow: 0 0 24px rgba(16, 240, 160, 0.3)
```

#### Card Shadow
```css
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3)
```

### Animations

#### Fade Up
```css
animation: fade-up 0.6s ease-out forwards
```

#### Pulse Glow
```css
animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
```

#### Shimmer
```css
animation: shimmer 2s infinite
```

#### Radar Pulse
```css
animation: radar-pulse 2s ease-out infinite
```

#### Count Up
```css
animation: count-up 2s ease-out forwards
```

### Transitions

#### Smooth
```css
transition: all 0.3s ease
```

#### Smooth Slow
```css
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)
```

#### Transform & Shadow
```css
transition: transform 0.3s ease, box-shadow 0.3s ease
```

---

## 🎯 Layout & Spacing

### Spacing Scale
```
4px   (0.25rem)
8px   (0.5rem)
12px  (0.75rem)
16px  (1rem)
24px  (1.5rem)
32px  (2rem)
48px  (3rem)
64px  (4rem)
96px  (6rem)
```

### Container
```css
Max Width: 1280px (7xl)
Padding: 16px (sm), 24px (md), 32px (lg)
```

### Grid
```css
Desktop: 3-4 columns
Tablet: 2 columns
Mobile: 1 column
Gap: 24px
```

### Section Padding
```css
Vertical: 96px (py-24)
Horizontal: 16px-32px (px-4 to px-8)
```

---

## 🎬 Interaction Patterns

### Hover States
- Buttons: scale(1.05) + shadow bloom
- Cards: translateY(-4px) + enhanced shadow
- Links: underline slides in from left
- Icons: scale(1.1) + color change

### Active States
- Buttons: scale(0.95)
- Links: color change + underline visible
- Navigation: background highlight

### Focus States
- Outline: 2px solid #6D5BFF
- Outline Offset: 2px
- Border Radius: 4px

### Disabled States
- Opacity: 0.5
- Cursor: not-allowed
- Pointer Events: none

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Mobile | < 640px | Single column, stacked layout |
| Tablet | 640px - 1024px | 2 columns, optimized spacing |
| Desktop | > 1024px | 3-4 columns, full effects |

### Mobile Adjustments
- Font sizes: Reduced by 10-15%
- Padding: Reduced by 25%
- Gaps: Reduced by 20%
- Animations: Simplified for performance
- Navigation: Hamburger menu

---

## 🎨 Gradient Combinations

### Primary Gradient
```css
background: linear-gradient(to right, #6D5BFF, #00D4FF)
```

### Mesh Gradient
```css
background: radial-gradient(circle at 30% 50%, rgba(109, 91, 255, 0.15) 0%, transparent 50%)
```

### Subtle Gradient
```css
background: linear-gradient(180deg, #09090E 0%, #0C0D15 100%)
```

---

## 🔍 Accessibility

### Color Contrast
- Text on background: 7:1 (AAA)
- Text on surface: 5.5:1 (AA)
- Interactive elements: 3:1 minimum

### Focus Indicators
- Visible on all interactive elements
- High contrast (2px solid #6D5BFF)
- Offset for clarity

### Motion
- Respects `prefers-reduced-motion`
- Animations disabled for users who prefer reduced motion
- Fallback to instant transitions

### Semantic HTML
- Proper heading hierarchy
- ARIA labels where needed
- Semantic button and link elements

---

## 📊 Data Visualization

### Number Styling
```css
Font Family: JetBrains Mono
Font Weight: Bold (600)
Font Size: 24px-48px
Color: Brand color (primary, secondary, or success)
```

### Metric Cards
```css
Background: rgba(255, 255, 255, 0.05)
Border: 1px solid rgba(255, 255, 255, 0.10)
Padding: 16px
Border Radius: 8px
Number: Large, bold, colored
Label: Small, secondary text
```

---

## 🚀 Performance Considerations

### GPU Acceleration
```css
transform: translateZ(0)
backface-visibility: hidden
perspective: 1000px
```

### Will-Change
```css
will-change: transform
will-change: opacity
```

### Backdrop Filter
- Used sparingly (performance impact)
- Only on non-critical elements
- Fallback for older browsers

---

## 📋 Implementation Checklist

- [x] Color palette defined
- [x] Typography system established
- [x] Component styles documented
- [x] Animation specifications
- [x] Responsive breakpoints
- [x] Accessibility guidelines
- [x] Performance optimizations
- [x] Interaction patterns

---

## 🔗 Related Files

- `tailwind.config.js` — Color and animation configuration
- `index.css` — Global styles and utilities
- `EnhancedNavbar.jsx` — Navigation component
- `PremiumHeroSection.jsx` — Hero section
- `PremiumFeaturesSection.jsx` — Features grid
- `PremiumHowItWorks.jsx` — Step-by-step guide
- `PremiumTestimonialsSection.jsx` — Testimonials
- `PremiumFooter.jsx` — Footer

---

**Last Updated**: March 2026
**Design System Version**: 1.0
**Status**: Production Ready
