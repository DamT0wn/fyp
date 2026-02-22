# Component Usage Guide

## Core Components

### Navbar
**Location:** `src/components/Navbar.jsx`

**Features:**
- Fixed position with glassmorphism
- Responsive mobile menu
- Active route highlighting
- Gradient logo with icon
- CTA button

**Usage:**
```jsx
import Navbar from './components/Navbar';

<Navbar />
```

---

### HeroSection
**Location:** `src/components/HeroSection.jsx`

**Features:**
- Animated background gradients
- Dual CTA buttons
- Stats display (3 metrics)
- Animated AI interface preview
- Responsive grid layout

**Usage:**
```jsx
import HeroSection from './components/HeroSection';

<HeroSection />
```

---

### FeatureCard
**Location:** `src/components/FeatureCard.jsx`

**Props:**
- `icon` - Lucide React icon component
- `title` - Card title (string)
- `description` - Card description (string)
- `delay` - Animation delay (number, optional)

**Usage:**
```jsx
import FeatureCard from './components/FeatureCard';
import { Video } from 'lucide-react';

<FeatureCard
  icon={Video}
  title="Real-Time Interview"
  description="Practice with AI interviewer"
  delay={0.1}
/>
```

---

### FeaturesSection
**Location:** `src/components/FeaturesSection.jsx`

**Features:**
- 6 feature cards in responsive grid
- Scroll-triggered animations
- Staggered card appearance
- Section header with gradient text

**Usage:**
```jsx
import FeaturesSection from './components/FeaturesSection';

<FeaturesSection />
```

---

### HowItWorks
**Location:** `src/components/HowItWorks.jsx`

**Features:**
- 3-step horizontal process
- Numbered steps
- Gradient icons
- Connection lines (desktop)
- Responsive layout

**Usage:**
```jsx
import HowItWorks from './components/HowItWorks';

<HowItWorks />
```

---

### TestimonialCard
**Location:** `src/components/TestimonialCard.jsx`

**Props:**
- `name` - Person's name (string)
- `role` - Job title (string)
- `company` - Company name (string)
- `content` - Testimonial text (string)
- `rating` - Star rating (number, 1-5)
- `delay` - Animation delay (number, optional)

**Usage:**
```jsx
import TestimonialCard from './components/TestimonialCard';

<TestimonialCard
  name="Sarah Chen"
  role="Software Engineer"
  company="Google"
  content="InterviewAI helped me land my dream job!"
  rating={5}
  delay={0.1}
/>
```

---

### TestimonialsSection
**Location:** `src/components/TestimonialsSection.jsx`

**Features:**
- 3 testimonial cards
- Responsive grid
- Section header
- Scroll animations

**Usage:**
```jsx
import TestimonialsSection from './components/TestimonialsSection';

<TestimonialsSection />
```

---

### Footer
**Location:** `src/components/Footer.jsx`

**Features:**
- 4-column layout (responsive)
- Brand section with social links
- Product, Company, Legal links
- Copyright notice
- Hover effects on links

**Usage:**
```jsx
import Footer from './components/Footer';

<Footer />
```

---

## Page Components

### Landing
**Location:** `src/pages/Landing.jsx`

**Composition:**
- Navbar
- HeroSection
- FeaturesSection
- HowItWorks
- TestimonialsSection
- Footer

**Route:** `/`

---

### LiveInterview
**Location:** `src/pages/LiveInterview.jsx`

**Features:**
- Split-screen layout
- AI interviewer panel
- Webcam preview
- Recording controls
- Real-time metrics
- Question progression
- Timer

**Route:** `/live-interview`

**State Management:**
- `isRecording` - Recording status
- `isMuted` - Audio mute status
- `isVideoOff` - Video toggle status
- `currentQuestion` - Current question index
- `timer` - Interview duration

---

### Upload
**Location:** `src/pages/Upload.jsx`

**Features:**
- Drag & drop zone
- File browser
- Multi-file support
- File list with remove
- Upload progress
- Info cards

**Route:** `/upload`

**State Management:**
- `dragActive` - Drag state
- `files` - Selected files array
- `uploading` - Upload status
- `uploadProgress` - Progress percentage

---

### Dashboard
**Location:** `src/pages/Dashboard.jsx`

**Features:**
- 4 score cards
- Radar chart (Recharts)
- Line chart (Recharts)
- Strengths list
- Improvements list
- Practice questions
- CTA button

**Route:** `/dashboard`

**Data Structure:**
```js
// Radar chart data
const radarData = [
  { subject: 'Confidence', score: 85, fullMark: 100 },
  // ...
];

// Progress chart data
const progressData = [
  { session: '1', confidence: 65 },
  // ...
];
```

---

## Styling Utilities

### Glass Effect
```jsx
className="glass"
// Applies: bg-white/5 backdrop-blur-xl border border-white/10

className="glass glass-hover"
// Adds hover state: hover:bg-white/10 hover:border-white/20
```

### Glow Effects
```jsx
className="glow"
// Blue glow: box-shadow: 0 0 20px rgba(14, 165, 233, 0.3)

className="glow-purple"
// Purple glow: box-shadow: 0 0 20px rgba(139, 92, 246, 0.3)
```

### Gradients
```jsx
className="bg-gradient-accent"
// Blue to purple: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)

className="bg-gradient-primary"
// Custom primary gradient
```

---

## Animation Patterns

### Fade In on Scroll
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Card Hover Lift
```jsx
<motion.div
  whileHover={{ y: -5 }}
  className="glass"
>
  Card content
</motion.div>
```

### Button Interactions
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-gradient-accent"
>
  Click me
</motion.button>
```

### Staggered List
```jsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {item}
  </motion.div>
))}
```

---

## Icon Usage

**Import from Lucide React:**
```jsx
import { 
  Video, 
  Brain, 
  BarChart3, 
  Mic, 
  Eye, 
  TrendingUp,
  Upload,
  Play,
  ArrowRight
} from 'lucide-react';

// Usage
<Video className="w-5 h-5 text-white" />
```

**Common Sizes:**
- `w-4 h-4` - Small (16px)
- `w-5 h-5` - Medium (20px)
- `w-6 h-6` - Large (24px)
- `w-8 h-8` - Extra Large (32px)

---

## Color Classes

### Background
```jsx
bg-dark-900    // #0F172A (main background)
bg-dark-800    // #1e293b (secondary)
bg-dark-700    // #334155 (tertiary)
```

### Text
```jsx
text-white       // Primary text
text-gray-400    // Secondary text
text-gray-500    // Muted text
text-blue-400    // Accent blue
text-purple-400  // Accent purple
```

### Borders
```jsx
border-white/10   // Subtle border
border-white/20   // Hover border
border-blue-500/20  // Colored border
```

---

## Responsive Classes

### Grid Layouts
```jsx
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"

// Mobile: 1 column, Desktop: 2 columns
className="grid lg:grid-cols-2 gap-8"
```

### Visibility
```jsx
className="hidden md:block"     // Hide on mobile
className="md:hidden"           // Show only on mobile
className="hidden lg:block"     // Show only on desktop
```

### Text Sizes
```jsx
className="text-4xl md:text-5xl lg:text-7xl"  // Responsive hero
className="text-base md:text-lg"              // Responsive body
```

---

## Best Practices

### Component Structure
1. Import dependencies
2. Define component
3. State management (if needed)
4. Event handlers
5. Return JSX
6. Export default

### Naming Conventions
- Components: PascalCase (`FeatureCard.jsx`)
- Functions: camelCase (`handleClick`)
- Constants: UPPER_SNAKE_CASE (`API_URL`)

### File Organization
```
Component.jsx
├── Imports
├── Component definition
├── State hooks
├── Effect hooks
├── Event handlers
├── Helper functions
├── JSX return
└── Export
```

### Performance Tips
1. Use `viewport={{ once: true }}` for scroll animations
2. Memoize expensive calculations
3. Lazy load images
4. Use proper key props in lists
5. Avoid inline function definitions in render

---

## Common Patterns

### Loading State
```jsx
{loading ? (
  <Loader className="w-5 h-5 animate-spin" />
) : (
  <span>Submit</span>
)}
```

### Empty State
```jsx
{items.length === 0 ? (
  <div className="text-center text-gray-400">
    No items found
  </div>
) : (
  <ItemList items={items} />
)}
```

### Error Handling
```jsx
{error && (
  <div className="bg-red-500/20 border border-red-500/20 rounded-lg p-4">
    <p className="text-red-400">{error}</p>
  </div>
)}
```

---

## Quick Reference

### Button Styles
```jsx
// Primary CTA
className="px-6 py-3 bg-gradient-accent text-white rounded-xl font-semibold glow"

// Secondary
className="px-6 py-3 glass glass-hover text-white rounded-xl font-semibold"

// Danger
className="px-6 py-3 bg-red-500/20 text-red-400 rounded-xl border border-red-500/20"
```

### Card Styles
```jsx
// Standard card
className="glass rounded-2xl p-8 border border-white/10"

// Hoverable card
className="glass glass-hover rounded-2xl p-8 border border-white/10"

// Metric card
className="glass rounded-lg p-4 text-center"
```

### Input Styles
```jsx
// Text input
className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-blue-500 outline-none"

// File input (hidden)
className="hidden"
```

---

This guide covers all major components and patterns used in the InterviewAI frontend. Refer to individual component files for detailed implementation.
