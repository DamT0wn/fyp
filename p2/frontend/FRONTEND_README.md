# InterviewAI - Modern Frontend

A premium, minimal, and modern frontend for an AI-powered Mock Interview application built with React, Tailwind CSS, and Framer Motion.

## Design Philosophy

- **Minimal but Powerful**: Clean interface inspired by Stripe, Linear, and Notion
- **Dark Mode First**: Calm dark theme with soft gradients and glassmorphism
- **Professional**: Communicates intelligence, career growth, and trust
- **Target Audience**: College students (18-24), freshers, and professionals switching jobs

## Tech Stack

- **React 18** - Modern functional components with hooks
- **Tailwind CSS** - Utility-first styling with custom theme
- **Framer Motion** - Subtle, professional animations
- **Lucide React** - Clean, consistent icons
- **Recharts** - Beautiful data visualizations
- **React Router** - Client-side routing

## Installation

1. Install dependencies:
```bash
cd p2/frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Main navigation with mobile support
│   ├── HeroSection.jsx         # Landing page hero with CTA
│   ├── FeatureCard.jsx         # Reusable feature card component
│   ├── FeaturesSection.jsx     # Features grid section
│   ├── HowItWorks.jsx          # 3-step process section
│   ├── TestimonialCard.jsx     # Reusable testimonial card
│   ├── TestimonialsSection.jsx # Testimonials grid section
│   └── Footer.jsx              # Site footer with links
├── pages/
│   ├── Landing.jsx             # Main landing page
│   ├── LiveInterview.jsx       # Real-time interview interface
│   ├── Upload.jsx              # File upload interface
│   ├── Dashboard.jsx           # Analytics dashboard
│   ├── Home.jsx                # Original home (legacy)
│   └── Results.jsx             # Results page (legacy)
├── api/
│   └── api.js                  # API client
├── App.jsx                     # Main app component with routing
├── main.jsx                    # App entry point
└── index.css                   # Global styles with custom utilities

## Pages

### 🏠 Landing Page (`/`)
- Hero section with animated AI interface preview
- Features showcase (6 key features)
- How it works (3-step process)
- Testimonials section
- Professional footer

### 🎤 Live Interview (`/live-interview`)
- Split-screen layout
- AI interviewer panel with questions
- User webcam preview with real-time metrics
- Recording controls (mute, video toggle)
- Progress tracking
- Timer and question navigation

### 📤 Upload Page (`/upload`)
- Drag & drop file upload
- Multiple file support
- Upload progress indicator
- File management (add/remove)
- Supported formats: MP4, MOV, AVI, MP3, WAV

### 📊 Dashboard (`/dashboard`)
- Performance score cards (4 key metrics)
- Radar chart for overall performance
- Line chart for progress tracking
- Strengths and improvements lists
- Suggested practice questions
- Quick action to start new interview

## Color System

### Primary Colors
- **Background**: `#0F172A` (dark-900)
- **Accent Gradient**: Blue (#0ea5e9) → Purple (#8b5cf6)
- **Text Primary**: White / near white
- **Text Secondary**: Gray-400
- **Text Muted**: Gray-500

### Component Colors
- **Glass Effect**: `bg-white/5` with backdrop blur
- **Borders**: `border-white/10`
- **Hover States**: `bg-white/10` with `border-white/20`

## Custom Utilities

### Glass Effect
```jsx
className="glass"                    // Base glass effect
className="glass glass-hover"        // Glass with hover state
```

### Glow Effects
```jsx
className="glow"                     // Blue glow
className="glow-purple"              // Purple glow
```

### Gradients
```jsx
className="bg-gradient-accent"       // Blue to purple gradient
className="bg-gradient-primary"      // Primary gradient
```

## Typography

- **Font Family**: Inter (Google Fonts)
- **Hero**: 4xl-7xl, bold
- **Section Titles**: 2xl-5xl, semi-bold
- **Card Titles**: lg-xl, bold
- **Body**: base, regular
- **Small Text**: sm-xs, regular

## Animations

All animations use Framer Motion with subtle, professional effects:

- **Fade in on scroll**: `initial={{ opacity: 0, y: 20 }}`
- **Card lift on hover**: `whileHover={{ y: -5 }}`
- **Button interactions**: `whileHover={{ scale: 1.05 }}`
- **Smooth transitions**: 300-600ms duration

## Responsive Design

- **Mobile**: < 768px (single column, hamburger menu)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (full layout, 3 columns)

## Key Features

✅ Fully responsive design
✅ Dark mode optimized
✅ Glassmorphism effects
✅ Smooth animations
✅ Accessible components
✅ Clean component architecture
✅ Reusable components
✅ Production-ready code

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading for images
- Code splitting with React Router
- Optimized animations (GPU-accelerated)
- Minimal bundle size

## Future Enhancements

- [ ] Light mode toggle
- [ ] User authentication
- [ ] Real-time WebRTC integration
- [ ] Advanced analytics
- [ ] Export reports as PDF
- [ ] Interview history
- [ ] Custom question sets
- [ ] Multi-language support

## Contributing

1. Follow the existing code style
2. Use functional components with hooks
3. Keep components small and focused
4. Add comments for complex logic
5. Test responsive design on all breakpoints

## License

MIT License - feel free to use this for your projects!
