# 🚀 Quick Start Guide - InterviewAI Frontend

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation (Choose One Method)

### Method 1: Automated Setup (Recommended)

**Windows:**
```bash
cd p2
setup_frontend.bat
```

**Mac/Linux:**
```bash
cd p2
chmod +x setup_frontend.sh
./setup_frontend.sh
```

### Method 2: Manual Setup

```bash
# Navigate to frontend directory
cd p2/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Access the Application

Once the server starts, open your browser to:
```
http://localhost:5173
```

## What You'll See

### 1. Landing Page (/)
- Modern hero section with animated preview
- Feature showcase
- How it works section
- Testimonials
- Professional footer

### 2. Live Interview (/live-interview)
- Real-time interview simulation
- AI interviewer with questions
- Webcam preview
- Live performance metrics

### 3. Upload Page (/upload)
- Drag & drop file upload
- Multi-file support
- Progress tracking

### 4. Dashboard (/dashboard)
- Performance analytics
- Charts and visualizations
- Strengths and improvements
- Practice suggestions

## Project Structure

```
p2/frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── api/           # API client
│   └── App.jsx        # Main app
├── package.json       # Dependencies
└── tailwind.config.js # Styling config
```

## Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Key Features

✅ Modern, minimal design
✅ Dark mode optimized
✅ Fully responsive
✅ Smooth animations
✅ Glassmorphism UI
✅ Real-time metrics
✅ File upload support
✅ Analytics dashboard

## Tech Stack

- React 18.2.0
- Tailwind CSS 3.4.1
- Framer Motion 10.18.0
- Lucide React (icons)
- Recharts (charts)
- React Router DOM

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme.

### Components
All components are in `src/components/` and can be easily modified.

### Pages
Page layouts are in `src/pages/` and use the component library.

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check for errors
npm run build
```

## Next Steps

1. ✅ Frontend is running
2. 🔄 Connect to backend API
3. 🎥 Implement WebRTC for live video
4. 🔐 Add authentication
5. 🤖 Integrate real AI analysis

## Documentation

- **FRONTEND_README.md** - Comprehensive documentation
- **COMPONENT_GUIDE.md** - Component usage guide
- **DESIGN_TOKENS.md** - Design system reference
- **MODERN_FRONTEND_SUMMARY.md** - Implementation overview

## Support

For issues or questions:
1. Check the documentation files
2. Review component code
3. Check browser console for errors

## Development Tips

- Use browser DevTools for debugging
- Check Network tab for API calls
- Use React DevTools extension
- Hot reload works automatically
- Changes save automatically

---

**You're all set!** 🎉

The frontend is now running. Navigate through the pages to see the modern, premium interface in action.

**Main Routes:**
- `/` - Landing page
- `/live-interview` - Live interview
- `/upload` - Upload recording
- `/dashboard` - Analytics dashboard

Enjoy building with InterviewAI! 🚀
