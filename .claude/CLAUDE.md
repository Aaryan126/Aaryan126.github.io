# Portfolio Website - Project Context

## Overview
Personal portfolio for Aaryan Kandiah - AI Engineer & Data Scientist.
Built with React 19 + Vite, deployed to GitHub Pages.

## Tech Stack
- **Framework**: React 19.2.0
- **Build**: Vite 7.2.4
- **Styling**: Vanilla CSS with custom properties
- **Icons**: Font Awesome 6.0.0
- **Fonts**: Google Fonts (Inter)
- **Deployment**: GitHub Pages (gh-pages branch)

## Key Files
- `src/index.css` - All global styles (1200+ lines)
- `src/App.jsx` - Main layout
- `src/components/` - React components
- `src/hooks/` - Custom React hooks
- `src/context/ThemeContext.jsx` - Dark/light theme

## Theming System
Uses CSS custom properties with `[data-theme="dark"]` selectors:
```css
:root { /* light mode */ }
[data-theme="dark"] { /* dark mode */ }
```

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Deploy to GitHub Pages
```

## Design Guidelines
- Maintain dark/light mode support
- Use existing CSS variables
- Follow component patterns in src/components/
- Keep animations performant (CSS preferred)
