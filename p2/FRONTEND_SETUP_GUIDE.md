# Frontend Setup Guide - InterviewAI

## Quick Start

### 1. Install Dependencies

```bash
cd p2/frontend
npm install
```

This will install:
- React 18.2.0
- React Router DOM 6.21.1
- Tailwind CSS 3.4.1
- Framer Motion 10.18.0
- Lucide React 0.309.0
- Recharts 2.10.3
- Axios 1.6.5

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

## What's New

### Modern Design System
- Dark mode first with glassmorphism effects
- Custom color palette (deep navy background, blue-purple gradients)
- Inter font family for clean typography
- Smooth animations with Framer Motion

### New Pages

1. **Landing Page** (`/`)
   - Hero section with animated preview
   - Features showcase
   - How it works section
   - Testimonials
   - Professional footer

2. **Live Interview** (`/live-interview`)
   - Real-time interview simulation
   - Split-screen layout
   - Webcam integration
   - Live metrics display

3. **Upload Page** (`/upload`)
   - Drag & drop file upload
   - Progress tracking
   - Multi-file support

4. **Dashboard** (`/dashboard`)
   - Performance analytics
   - Radar and line charts
   - Strengths and improvements
   - Practice suggestions

### New Components

All components are in `src/components/`:
- `Navbar.jsx` - Responsive navigation
- `HeroSection.jsx` - Landing hero
- `FeatureCard.jsx` - Reusable feature cards
- `FeaturesSection.jsx` - Features grid
- `HowItWorks.jsx` - Process steps
- `TestimonialCard.jsx` - Testimonial cards
- `TestimonialsSection.jsx` - Testimonials grid
- `Footer.jsx` - Site footer

## Design Tokens

### Colors
```js
// Background
bg-dark-900: #0F172A

// Gradients
bg-gradient-accent: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)

// Text
text-white: Primary text
text-gray-400: Secondary text
text-gray-500: Muted text
```

### Custom Utilities
```css
.glass - Glassmorphism effect
.glass-hover - Glass with hover state
.glow - Blue glow effect
.glow-purple - Purple glow effect
```

## File Structure

```
p2/frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── api/             # API client
│   ├── App.jsx          # Main app with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── FRONTEND_README.md   # Detailed documentation
```

## Key Features

✅ Fully responsive (mobile, tablet, desktop)
✅ Dark mode optimized
✅ Smooth animations
✅ Glassmorphism UI
✅ Clean component architecture
✅ Production-ready
✅ Accessible design

## Routes

- `/` - Landing page
- `/live-interview` - Real-time interview
- `/upload` - Upload recording
- `/dashboard` - Analytics dashboard
- `/home` - Original home (legacy)
- `/results/:id` - Results page (legacy)

## Development Tips

1. **Hot Reload**: Changes auto-refresh in dev mode
2. **Component Reusability**: Import from `src/components/index.js`
3. **Styling**: Use Tailwind classes, custom utilities in `index.css`
4. **Icons**: Use Lucide React for consistent icons
5. **Animations**: Framer Motion for smooth transitions

## Browser Testing

Test on:
- Chrome (primary)
- Firefox
- Safari
- Edge

## Next Steps

1. Connect to backend API (update `src/api/api.js`)
2. Implement WebRTC for live video
3. Add authentication
4. Integrate real AI analysis
5. Add more interview scenarios

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check for TypeScript errors
npm run build -- --mode development
```

## Support

For issues or questions:
1. Check `FRONTEND_README.md` for detailed docs
2. Review component code in `src/components/`
3. Check Tailwind config in `tailwind.config.js`

---

**Ready to go!** Run `npm run dev` and visit `http://localhost:5173`
