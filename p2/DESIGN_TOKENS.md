# Design Tokens - InterviewAI

## Color Palette

### Background Colors
```
Dark 900 (Main Background)
HEX: #0F172A
RGB: 15, 23, 42
Usage: Main app background

Dark 800 (Secondary Background)
HEX: #1E293B
RGB: 30, 41, 59
Usage: Card backgrounds, panels

Dark 700 (Tertiary Background)
HEX: #334155
RGB: 51, 65, 85
Usage: Hover states, borders
```

### Text Colors
```
White (Primary Text)
HEX: #FFFFFF
RGB: 255, 255, 255
Usage: Headings, primary content

Gray 400 (Secondary Text)
HEX: #94A3B8
RGB: 148, 163, 184
Usage: Descriptions, labels

Gray 500 (Muted Text)
HEX: #64748B
RGB: 100, 116, 139
Usage: Timestamps, metadata
```

### Accent Colors
```
Blue 400 (Primary Accent)
HEX: #38BDF8
RGB: 56, 189, 248
Usage: Links, primary actions

Blue 500 (Primary Accent Dark)
HEX: #0EA5E9
RGB: 14, 165, 233
Usage: Gradient start, hover states

Purple 400 (Secondary Accent)
HEX: #A78BFA
RGB: 167, 139, 250
Usage: Gradient text, highlights

Purple 500 (Secondary Accent Dark)
HEX: #8B5CF6
RGB: 139, 92, 246
Usage: Gradient end, glow effects
```

### Status Colors
```
Green 400 (Success)
HEX: #4ADE80
RGB: 74, 222, 128
Usage: Success states, positive metrics

Red 400 (Error/Warning)
HEX: #F87171
RGB: 248, 113, 113
Usage: Errors, warnings, danger actions

Yellow 400 (Warning)
HEX: #FACC15
RGB: 250, 204, 21
Usage: Ratings, caution states

Orange 400 (Info)
HEX: #FB923C
RGB: 251, 146, 60
Usage: Improvements, notifications
```

## Gradients

### Primary Gradient (Accent)
```css
background: linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%);
```
**Usage:** Primary buttons, CTAs, highlights

### Secondary Gradient (Primary)
```css
background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
```
**Usage:** Alternative buttons, special sections

### Text Gradient
```css
background: linear-gradient(to right, #38BDF8, #A78BFA, #F472B6);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```
**Usage:** Hero headlines, section titles

## Typography

### Font Family
```
Primary: 'Inter', system-ui, sans-serif
Weights: 300, 400, 500, 600, 700, 800
```

### Font Sizes
```
Hero (Desktop)
- text-7xl: 72px / 4.5rem
- text-6xl: 60px / 3.75rem
- text-5xl: 48px / 3rem

Hero (Mobile)
- text-4xl: 36px / 2.25rem

Section Titles
- text-5xl: 48px / 3rem (Desktop)
- text-4xl: 36px / 2.25rem (Mobile)
- text-2xl: 24px / 1.5rem (Subsections)

Card Titles
- text-xl: 20px / 1.25rem
- text-lg: 18px / 1.125rem

Body Text
- text-base: 16px / 1rem
- text-sm: 14px / 0.875rem
- text-xs: 12px / 0.75rem
```

### Font Weights
```
Light: 300
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
Extrabold: 800
```

### Line Heights
```
Tight: 1.25 (Headings)
Normal: 1.5 (Body)
Relaxed: 1.75 (Long-form content)
```

## Spacing

### Padding Scale
```
px-2: 8px
px-3: 12px
px-4: 16px
px-6: 24px
px-8: 32px
px-12: 48px

py-2: 8px
py-3: 12px
py-4: 16px
py-6: 24px
py-8: 32px
py-12: 48px
```

### Margin Scale
```
mb-2: 8px
mb-3: 12px
mb-4: 16px
mb-6: 24px
mb-8: 32px
mb-12: 48px
mb-16: 64px
```

### Gap Scale
```
gap-2: 8px
gap-3: 12px
gap-4: 16px
gap-6: 24px
gap-8: 32px
```

## Border Radius

```
rounded-lg: 8px
rounded-xl: 12px
rounded-2xl: 16px
rounded-full: 9999px
```

## Shadows & Effects

### Glass Effect
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Glow Effect (Blue)
```css
box-shadow: 0 0 20px rgba(14, 165, 233, 0.3);
```

### Glow Effect (Purple)
```css
box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
```

### Subtle Shadow
```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

## Opacity Scale

```
opacity-0: 0%
opacity-5: 5%
opacity-10: 10%
opacity-20: 20%
opacity-50: 50%
opacity-100: 100%
```

## Transitions

### Duration
```
duration-150: 150ms
duration-300: 300ms (Default)
duration-500: 500ms
duration-700: 700ms
```

### Timing Functions
```
ease-in: cubic-bezier(0.4, 0, 1, 1)
ease-out: cubic-bezier(0, 0, 0.2, 1)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) (Default)
```

## Breakpoints

```
sm: 640px   (Mobile landscape)
md: 768px   (Tablet)
lg: 1024px  (Desktop)
xl: 1280px  (Large desktop)
2xl: 1536px (Extra large)
```

## Z-Index Scale

```
z-0: 0
z-10: 10
z-20: 20
z-30: 30
z-40: 40
z-50: 50 (Navbar, modals)
```

## Component Tokens

### Button Sizes
```
Small:
- px-4 py-2
- text-sm
- rounded-lg

Medium (Default):
- px-6 py-3
- text-base
- rounded-xl

Large:
- px-8 py-4
- text-lg
- rounded-xl
```

### Card Sizes
```
Small:
- p-4
- rounded-lg

Medium (Default):
- p-6 or p-8
- rounded-xl or rounded-2xl

Large:
- p-12
- rounded-2xl
```

### Icon Sizes
```
Small: w-4 h-4 (16px)
Medium: w-5 h-5 (20px)
Large: w-6 h-6 (24px)
XLarge: w-8 h-8 (32px)
```

## Animation Tokens

### Fade In
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Scale
```jsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Slide
```jsx
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
```

## Usage Examples

### Primary Button
```jsx
<button className="px-6 py-3 bg-gradient-accent text-white rounded-xl font-semibold text-base glow hover:glow-purple transition-all duration-300">
  Start Interview
</button>
```

### Glass Card
```jsx
<div className="glass glass-hover rounded-2xl p-8 border border-white/10">
  Card content
</div>
```

### Section Header
```jsx
<h2 className="text-4xl md:text-5xl font-bold mb-4">
  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
    Gradient Text
  </span>
</h2>
```

### Metric Card
```jsx
<div className="glass rounded-lg p-4 text-center">
  <div className="text-2xl font-bold text-blue-400">85</div>
  <div className="text-xs text-gray-400">Confidence</div>
</div>
```

## Accessibility

### Contrast Ratios
```
White on Dark-900: 15.8:1 (AAA)
Gray-400 on Dark-900: 7.2:1 (AA)
Blue-400 on Dark-900: 8.5:1 (AAA)
```

### Focus States
```css
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:ring-offset-2
focus:ring-offset-dark-900
```

### Touch Targets
```
Minimum: 44px × 44px
Recommended: 48px × 48px
```

## Print Styles

Not applicable - this is a web-only application.

---

**Note:** All values are defined in `tailwind.config.js` and can be customized as needed. The design system prioritizes consistency, accessibility, and visual hierarchy.
