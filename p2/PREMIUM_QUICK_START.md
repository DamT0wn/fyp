# Premium Landing Page — Quick Start Guide

## 🚀 Getting Started

### What's New?
The website has been completely redesigned with a premium, refined aesthetic following the "Bloomberg meets Linear.app" design brief. The new landing page is now the default at `/`.

### Key Features
✨ **Premium Design** — Refined, ambitious, data-forward
🎨 **Electric Colors** — Purple (#6D5BFF), Cyan (#00D4FF), Mint (#10F0A0)
📝 **Editorial Typography** — Serif headings + geometric body
✨ **Smooth Animations** — Staggered fade-ups, glowing effects, counter animations
📱 **Fully Responsive** — Mobile, tablet, and desktop optimized
♿ **Accessible** — WCAG AA compliant with focus indicators

---

## 📂 File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── EnhancedNavbar.jsx              ← Premium navbar
│   │   ├── PremiumHeroSection.jsx          ← Hero with animations
│   │   ├── PremiumFeaturesSection.jsx      ← Feature cards
│   │   ├── PremiumHowItWorks.jsx           ← Step guide
│   │   ├── PremiumTestimonialsSection.jsx  ← Testimonials
│   │   └── PremiumFooter.jsx               ← Enhanced footer
│   ├── pages/
│   │   └── PremiumLanding.jsx              ← Main page
│   ├── App.jsx                             ← Updated routing
│   ├── index.css                           ← Enhanced styles
│   └── main.jsx
├── tailwind.config.js                      ← Updated config
└── package.json
```

---

## 🎨 Color Palette

### Quick Reference
```
Primary:    #6D5BFF (Electric Purple)
Secondary:  #00D4FF (Electric Cyan)
Success:    #10F0A0 (Neon Mint)
Accent:     #F59E0B (Warm Amber)
Background: #09090E (Deep Black)
Surface:    #0F1018 (Card Surface)
```

### Usage in Tailwind
```jsx
// Primary button
<button className="bg-gradient-to-r from-brand-primary to-brand-secondary">
  Start Now
</button>

// Secondary button
<button className="bg-white/5 border border-white/10">
  Learn More
</button>

// Text colors
<p className="text-white">Primary text</p>
<p className="text-text-secondary">Secondary text</p>
<p className="text-text-tertiary">Tertiary text</p>
```

---

## 🎬 Running the Project

### Install Dependencies
```bash
cd frontend
npm install
```

### Development Server
```bash
npm run dev
# Opens at http://localhost:5173
```

### Build for Production
```bash
npm run build
# Output in dist/
```

### Preview Build
```bash
npm run preview
# Test production build locally
```

---

## 🧩 Component Usage

### Using Premium Components
```jsx
import EnhancedNavbar from '../components/EnhancedNavbar';
import PremiumHeroSection from '../components/PremiumHeroSection';
import PremiumFeaturesSection from '../components/PremiumFeaturesSection';

export default function MyPage() {
  return (
    <div>
      <EnhancedNavbar />
      <PremiumHeroSection />
      <PremiumFeaturesSection />
    </div>
  );
}
```

### Creating New Components
```jsx
// Follow the same pattern
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-24 bg-bg-primary">
      {/* Your content */}
    </section>
  );
};

export default MyComponent;
```

---

## 🎨 Customization Guide

### Changing Colors
Edit `tailwind.config.js`:
```js
colors: {
  brand: {
    primary: '#6D5BFF',    // Change this
    secondary: '#00D4FF',  // Or this
    success: '#10F0A0',    // Or this
  }
}
```

### Adjusting Animations
Edit `tailwind.config.js` keyframes:
```js
keyframes: {
  'fade-up': {
    'from': { opacity: '0', transform: 'translateY(20px)' },
    'to': { opacity: '1', transform: 'translateY(0)' },
  }
}
```

### Modifying Typography
Edit `index.css`:
```css
@layer base {
  h1 {
    font-family: 'Instrument Serif', serif;
    font-size: 3rem;
    font-weight: 700;
  }
}
```

---

## 📱 Responsive Breakpoints

### Tailwind Breakpoints
```
sm:  640px   (mobile)
md:  768px   (tablet)
lg:  1024px  (desktop)
xl:  1280px  (large desktop)
```

### Usage
```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

---

## ✨ Animation Classes

### Available Animations
```jsx
// Fade up
<div className="animate-fade-up">Content</div>

// Pulse glow
<div className="animate-pulse-glow">Glowing element</div>

// Shimmer
<button className="shimmer">Shimmer button</button>

// Radar pulse
<div className="animate-radar-pulse">Radar</div>

// Count up
<CountUpNumber target={1000} />
```

---

## 🔧 Common Tasks

### Add a New Section
```jsx
const NewSection = () => {
  return (
    <section className="relative py-24 bg-bg-primary">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Your content */}
      </div>
    </section>
  );
};
```

### Add a New Button
```jsx
<button className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg font-semibold hover:shadow-glow-purple transition-all duration-300 transform hover:scale-105 active:scale-95">
  Click Me
</button>
```

### Add a New Card
```jsx
<div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl">
  {/* Card content */}
</div>
```

---

## 🐛 Troubleshooting

### Styles Not Applying
1. Check if class names are in `tailwind.config.js`
2. Verify Tailwind is processing the file
3. Clear cache: `rm -rf node_modules/.cache`
4. Rebuild: `npm run dev`

### Animations Not Playing
1. Check if animation is defined in `tailwind.config.js`
2. Verify `animation-` class is applied
3. Check browser DevTools for CSS errors
4. Test in different browser

### Colors Look Wrong
1. Verify hex codes in `tailwind.config.js`
2. Check if color is being overridden
3. Inspect element in DevTools
4. Clear browser cache

### Responsive Layout Broken
1. Check breakpoint prefixes (sm:, md:, lg:)
2. Verify grid/flex classes
3. Test on actual device
4. Check viewport meta tag

---

## 📚 Documentation

### Full Guides
- [Premium Design Implementation](./PREMIUM_DESIGN_IMPLEMENTATION.md)
- [Design System Guide](./DESIGN_SYSTEM_GUIDE.md)
- [Launch Checklist](./PREMIUM_LAUNCH_CHECKLIST.md)

### Component Docs
Each component has inline comments explaining:
- Purpose and usage
- Props and state
- Animation details
- Responsive behavior

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Environment Variables
Create `.env.local`:
```
VITE_API_URL=https://api.intrex.com
VITE_FIREBASE_CONFIG=...
```

---

## 📊 Performance Tips

### Optimize Images
```bash
# Use WebP format
# Compress with TinyPNG or similar
# Add alt text to all images
```

### Reduce Bundle Size
```bash
# Check bundle size
npm run build -- --analyze

# Remove unused dependencies
npm prune
```

### Improve Load Time
```bash
# Enable gzip compression
# Use CDN for static assets
# Lazy load images
# Code split routes
```

---

## 🎯 Next Steps

1. **Test Locally**
   ```bash
   npm run dev
   # Visit http://localhost:5173
   ```

2. **Review Design**
   - Check all sections
   - Test animations
   - Verify responsive design
   - Test on mobile

3. **Make Changes**
   - Update colors if needed
   - Modify copy/content
   - Add your own sections
   - Customize components

4. **Deploy**
   ```bash
   npm run build
   # Deploy dist/ folder
   ```

---

## 💡 Pro Tips

### Use CSS Variables
```css
:root {
  --primary: #6D5BFF;
  --secondary: #00D4FF;
}

/* Use in CSS */
.button {
  background: var(--primary);
}
```

### Create Utility Classes
```css
@layer utilities {
  .card-premium {
    @apply bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10;
  }
}

/* Use in JSX */
<div className="card-premium">Content</div>
```

### Extend Tailwind Config
```js
// Add custom colors
colors: {
  custom: '#FF00FF'
}

// Add custom animations
animation: {
  'custom': 'custom 2s ease-in-out infinite'
}
```

---

## 🆘 Getting Help

### Check Documentation
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)

### Debug in Browser
1. Open DevTools (F12)
2. Inspect element
3. Check computed styles
4. Check console for errors

### Common Issues
- **Styles not applying**: Check Tailwind config
- **Animations stuttering**: Check GPU acceleration
- **Layout shifts**: Check for missing dimensions
- **Slow performance**: Check bundle size

---

## 📞 Support

For issues or questions:
1. Check documentation first
2. Search existing issues
3. Create detailed bug report
4. Include screenshots/videos

---

## 🎉 You're Ready!

The premium landing page is ready to use. Start by:
1. Running `npm run dev`
2. Exploring the components
3. Customizing colors and content
4. Testing on different devices
5. Deploying to production

**Happy coding!** 🚀

---

**Version**: 1.0.0
**Last Updated**: March 2026
**Status**: Production Ready
