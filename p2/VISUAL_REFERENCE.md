# Intrex Premium Design — Visual Reference

## 🎨 Color Palette

### Primary Colors
```
┌─────────────────────────────────────────────────────────────┐
│ Electric Purple                                             │
│ #6D5BFF                                                     │
│ RGB(109, 91, 255)                                           │
│ HSL(256, 100%, 68%)                                         │
│ Usage: Primary CTAs, accents, highlights, glow effects      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Electric Cyan                                               │
│ #00D4FF                                                     │
│ RGB(0, 212, 255)                                            │
│ HSL(190, 100%, 50%)                                         │
│ Usage: Live states, AI activity, secondary accents          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Neon Mint                                                   │
│ #10F0A0                                                     │
│ RGB(16, 240, 160)                                           │
│ HSL(155, 95%, 50%)                                          │
│ Usage: Success states, positive feedback, confidence        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Warm Amber                                                  │
│ #F59E0B                                                     │
│ RGB(245, 158, 11)                                           │
│ HSL(38, 92%, 50%)                                           │
│ Usage: Testimonial stars, premium touches                   │
└─────────────────────────────────────────────────────────────┘
```

### Background Colors
```
┌─────────────────────────────────────────────────────────────┐
│ Deep Black (Primary Background)                             │
│ #09090E                                                     │
│ RGB(9, 9, 14)                                               │
│ HSL(240, 22%, 4%)                                           │
│ Usage: Main background, near-black with blue undertone      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Secondary Background                                        │
│ #0C0D15                                                     │
│ RGB(12, 13, 21)                                             │
│ HSL(240, 27%, 6%)                                           │
│ Usage: Alternating sections for rhythm                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Surface (Card Background)                                   │
│ #0F1018                                                     │
│ RGB(15, 16, 24)                                             │
│ HSL(240, 23%, 8%)                                           │
│ Usage: Card surfaces with 1px borders                       │
└─────────────────────────────────────────────────────────────┘
```

### Text Colors
```
┌─────────────────────────────────────────────────────────────┐
│ Primary Text                                                │
│ #FFFFFF                                                     │
│ RGB(255, 255, 255)                                          │
│ Usage: Main text, headings                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Secondary Text                                              │
│ #9CA3C8                                                     │
│ RGB(156, 163, 200)                                          │
│ HSL(230, 27%, 70%)                                          │
│ Usage: Descriptions, secondary information                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Tertiary Text                                               │
│ #4B5280                                                     │
│ RGB(75, 82, 128)                                            │
│ HSL(230, 26%, 40%)                                          │
│ Usage: Subtle text, tertiary information                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Typography

### Font Stack
```
Headings:  Instrument Serif (serif)
Body:      DM Sans (sans-serif)
Data:      JetBrains Mono (monospace)
```

### Type Scale
```
Display (Hero)
├─ Size: clamp(52px, 6vw, 88px)
├─ Weight: Bold (700)
├─ Line Height: 1.05
└─ Font: Instrument Serif

Heading 1
├─ Size: 48px (md: 56px)
├─ Weight: Bold (700)
└─ Font: Instrument Serif

Heading 2
├─ Size: 32px
├─ Weight: Bold (700)
└─ Font: Instrument Serif

Heading 3
├─ Size: 24px
├─ Weight: Semibold (600)
└─ Font: Instrument Serif

Body Large
├─ Size: 18px
├─ Weight: Regular (400)
├─ Line Height: 1.6
└─ Font: DM Sans

Body Regular
├─ Size: 16px
├─ Weight: Regular (400)
├─ Line Height: 1.6
└─ Font: DM Sans

Body Small
├─ Size: 14px
├─ Weight: Regular (400)
├─ Line Height: 1.5
└─ Font: DM Sans

Mono (Data)
├─ Size: 16px-32px
├─ Weight: Bold (600)
└─ Font: JetBrains Mono
```

---

## 🎭 Component Styles

### Button Styles

#### Primary Button
```
┌─────────────────────────────────────────────────────────────┐
│ START NOW                                                   │
│                                                             │
│ Background: Linear gradient (#6D5BFF → #00D4FF)            │
│ Color: White                                                │
│ Padding: 16px 32px                                          │
│ Border Radius: 8px                                          │
│ Box Shadow: 0 0 24px rgba(109, 91, 255, 0.4)               │
│ Hover: scale(1.05), enhanced shadow                         │
│ Active: scale(0.95)                                         │
└─────────────────────────────────────────────────────────────┘
```

#### Secondary Button
```
┌─────────────────────────────────────────────────────────────┐
│ UPLOAD RECORDING                                            │
│                                                             │
│ Background: rgba(255, 255, 255, 0.05)                      │
│ Color: White                                                │
│ Border: 1px solid rgba(255, 255, 255, 0.20)                │
│ Padding: 16px 32px                                          │
│ Border Radius: 8px                                          │
│ Backdrop Filter: blur(12px)                                 │
│ Hover: bg-white/10, border-brand-primary/50                │
└─────────────────────────────────────────────────────────────┘
```

### Card Styles

#### Feature Card
```
┌─────────────────────────────────────────────────────────────┐
│ 🧠 AI-Powered Analysis                                      │
│                                                             │
│ Advanced machine learning analyzes your performance         │
│ across 50+ metrics in real-time.                            │
│                                                             │
│ Background: rgba(255, 255, 255, 0.05)                      │
│ Backdrop Filter: blur(16px)                                 │
│ Border: 1px solid rgba(255, 255, 255, 0.10)                │
│ Border Radius: 12px                                         │
│ Padding: 24px                                               │
│ Hover: translateY(-4px), enhanced shadow                    │
└─────────────────────────────────────────────────────────────┘
```

#### Testimonial Card
```
┌─────────────────────────────────────────────────────────────┐
│ ★★★★★                                                       │
│                                                             │
│ "Intrex helped me identify my weak points in technical      │
│ interviews. The real-time feedback was invaluable. I        │
│ landed my dream role at Google!"                            │
│                                                             │
│ ─────────────────────────────────────────────────────────   │
│                                                             │
│ [SC] Sarah Chen                                             │
│      Software Engineer at Google                            │
│                                                             │
│ Background: rgba(255, 255, 255, 0.05)                      │
│ Backdrop Filter: blur(16px)                                 │
│ Border: 1px solid rgba(255, 255, 255, 0.10)                │
│ Border Radius: 12px                                         │
│ Padding: 32px                                               │
│ Quote Mark: 5% opacity watermark                            │
└─────────────────────────────────────────────────────────────┘
```

### Badge Styles

#### Live Badge
```
┌──────────────────────┐
│ 🟢 LIVE              │
│                      │
│ Background: rgba(16, 240, 160, 0.20)                       │
│ Color: #10F0A0                                              │
│ Border: 1px solid rgba(16, 240, 160, 0.40)                 │
│ Border Radius: 9999px                                       │
│ Padding: 4px 12px                                           │
│ Animation: pulse-glow (2s infinite)                         │
└──────────────────────┘
```

#### Trust Badge
```
┌──────────────────────────────────────┐
│ ✓ Free first session                 │
│                                      │
│ Background: rgba(255, 255, 255, 0.05)│
│ Color: #9CA3C8                        │
│ Border Left: 2px solid #10F0A0        │
│ Border Radius: 9999px                 │
│ Padding: 6px 12px                     │
└──────────────────────────────────────┘
```

---

## ✨ Effects & Shadows

### Glow Effects
```
Glow Purple
└─ box-shadow: 0 0 24px rgba(109, 91, 255, 0.4)

Glow Cyan
└─ box-shadow: 0 0 24px rgba(0, 212, 255, 0.3)

Glow Mint
└─ box-shadow: 0 0 24px rgba(16, 240, 160, 0.3)

Card Shadow
└─ box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3)
```

### Backdrop Effects
```
Blur XS (2px)
├─ backdrop-filter: blur(2px)
└─ Usage: Subtle blur

Blur SM (4px)
├─ backdrop-filter: blur(4px)
└─ Usage: Light blur

Blur MD (8px)
├─ backdrop-filter: blur(8px)
└─ Usage: Medium blur

Blur LG (12px)
├─ backdrop-filter: blur(12px)
└─ Usage: Strong blur (buttons, cards)

Blur XL (16px)
├─ backdrop-filter: blur(16px)
└─ Usage: Very strong blur

Blur 2XL (24px)
├─ backdrop-filter: blur(24px)
└─ Usage: Navbar, overlays
```

---

## 🎬 Animation Reference

### Fade Up
```
Duration: 0.6s
Easing: ease-out
From: opacity 0, translateY(20px)
To: opacity 1, translateY(0)
Usage: Page load, section entrance
```

### Pulse Glow
```
Duration: 2s
Easing: cubic-bezier(0.4, 0, 0.6, 1)
Loop: infinite
Effect: Opacity pulse with glow
Usage: Live indicators, badges
```

### Shimmer
```
Duration: 2s
Loop: infinite
Effect: Gradient slide across element
Usage: Button hover, loading states
```

### Radar Pulse
```
Duration: 2s
Easing: ease-out
Loop: infinite
Effect: Scale from 1 to 2, opacity 1 to 0
Usage: Live analysis indicator
```

### Count Up
```
Duration: 2s
Easing: ease-out
From: opacity 0, translateY(10px)
To: opacity 1, translateY(0)
Usage: Number animations, stats
```

---

## 📐 Spacing & Layout

### Spacing Scale
```
4px   (0.25rem)  ├─ Micro spacing
8px   (0.5rem)   ├─ Small spacing
12px  (0.75rem)  ├─ Small-medium spacing
16px  (1rem)     ├─ Standard spacing
24px  (1.5rem)   ├─ Medium spacing
32px  (2rem)     ├─ Large spacing
48px  (3rem)     ├─ Extra large spacing
64px  (4rem)     ├─ 2x large spacing
96px  (6rem)     └─ 3x large spacing
```

### Container
```
Max Width: 1280px (7xl)
Padding: 16px (sm), 24px (md), 32px (lg)
Margin: 0 auto
```

### Grid
```
Desktop: 3-4 columns
Tablet: 2 columns
Mobile: 1 column
Gap: 24px
```

### Section Padding
```
Vertical: 96px (py-24)
Horizontal: 16px-32px (px-4 to px-8)
```

---

## 🎯 Responsive Breakpoints

### Tailwind Breakpoints
```
sm:  640px   ├─ Mobile
md:  768px   ├─ Tablet
lg:  1024px  ├─ Desktop
xl:  1280px  └─ Large Desktop
```

### Mobile Adjustments
```
Font Sizes: -10-15%
Padding: -25%
Gaps: -20%
Animations: Simplified
Navigation: Hamburger menu
```

---

## 🎨 Gradient Combinations

### Primary Gradient
```
Direction: to right
From: #6D5BFF (Electric Purple)
To: #00D4FF (Electric Cyan)
Usage: Primary buttons, hero text
```

### Mesh Gradient
```
Type: Radial
Center: 30% 50%
From: rgba(109, 91, 255, 0.15)
To: transparent
Usage: Background effects
```

### Subtle Gradient
```
Direction: 180deg
From: #09090E (Deep Black)
To: #0C0D15 (Secondary)
Usage: Section backgrounds
```

---

## 🔍 Accessibility

### Color Contrast
```
Text on Background: 7:1 (AAA)
├─ White (#FFFFFF) on #09090E
└─ Meets WCAG AAA standard

Text on Surface: 5.5:1 (AA)
├─ White (#FFFFFF) on #0F1018
└─ Meets WCAG AA standard

Interactive Elements: 3:1 minimum
└─ Meets WCAG AA standard
```

### Focus Indicators
```
Outline: 2px solid #6D5BFF
Outline Offset: 2px
Border Radius: 4px
Visible on all interactive elements
```

---

## 📊 Data Visualization

### Number Styling
```
Font Family: JetBrains Mono
Font Weight: Bold (600)
Font Size: 24px-48px
Color: Brand color (primary, secondary, or success)
```

### Metric Cards
```
Background: rgba(255, 255, 255, 0.05)
Border: 1px solid rgba(255, 255, 255, 0.10)
Padding: 16px
Border Radius: 8px
Number: Large, bold, colored
Label: Small, secondary text
```

---

## 🎭 Interaction States

### Hover States
```
Buttons: scale(1.05) + shadow bloom
Cards: translateY(-4px) + enhanced shadow
Links: underline slides in from left
Icons: scale(1.1) + color change
```

### Active States
```
Buttons: scale(0.95)
Links: color change + underline visible
Navigation: background highlight
```

### Focus States
```
Outline: 2px solid #6D5BFF
Outline Offset: 2px
Border Radius: 4px
```

### Disabled States
```
Opacity: 0.5
Cursor: not-allowed
Pointer Events: none
```

---

## 🎨 Design Tokens

### Colors
```
brand-primary:   #6D5BFF
brand-secondary: #00D4FF
brand-success:   #10F0A0
brand-accent:    #F59E0B
bg-primary:      #09090E
bg-secondary:    #0C0D15
bg-surface:      #0F1018
text-primary:    #FFFFFF
text-secondary:  #9CA3C8
text-tertiary:   #4B5280
```

### Typography
```
font-serif:  Instrument Serif
font-sans:   DM Sans
font-mono:   JetBrains Mono
```

### Spacing
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
```

### Shadows
```
glow-purple: 0 0 24px rgba(109, 91, 255, 0.4)
glow-cyan:   0 0 24px rgba(0, 212, 255, 0.3)
glow-mint:   0 0 24px rgba(16, 240, 160, 0.3)
card:        0 20px 40px rgba(0, 0, 0, 0.3)
```

---

## 📋 Component Checklist

- [x] Navbar — Premium styling with animations
- [x] Hero — Animated gradients and counter animations
- [x] Features — Glassmorphism cards with hover effects
- [x] How It Works — Step progression with visual hierarchy
- [x] Testimonials — Asymmetric layout with avatars
- [x] Footer — CTA strip and social links
- [x] Buttons — Primary, secondary, ghost variants
- [x] Cards — Feature, testimonial, metric variants
- [x] Badges — Live, trust, status variants
- [x] Animations — Fade-up, pulse, shimmer, radar pulse
- [x] Responsive — Mobile, tablet, desktop optimized
- [x] Accessibility — WCAG AA compliant

---

**Design System Version**: 1.0
**Last Updated**: March 2026
**Status**: Production Ready

🎨 **Visual design complete and ready for implementation!**
