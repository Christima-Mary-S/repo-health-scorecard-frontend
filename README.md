# RepoHealth Dashboard

A modern SaaS dashboard for analyzing GitHub repository health, built with Next.js 15, TypeScript, and Tailwind CSS v4.

## Features

- 🔍 **Repository Analysis**: Comprehensive health scoring for any public GitHub repository
- 📊 **Interactive Charts**: Radar charts, gauges, and metric cards for data visualization
- 🌙 **Dark Mode**: Complete dark/light theme support with system preference detection
- 📱 **Responsive Design**: Optimized for desktop (1440×1024) and mobile (375×812) breakpoints
- 🔒 **Authentication Flow**: GitHub OAuth integration ready
- ⚡ **Real-time API**: Connects to your backend API for live repository data
- 🎨 **Modern UI**: Clean, professional SaaS interface with Tailwind CSS v4

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (alpha) with @config syntax
- **Icons**: Lucide React
- **State Management**: React Hooks + Custom Hooks
- **API Integration**: Fetch API with custom service layer

## Quick Start

```bash
# Clone and install
npx create-next-app@latest repo-health-dashboard --typescript --tailwind --eslint --app
cd repo-health-dashboard

# Install Tailwind v4 and dependencies
npm install tailwindcss@next @tailwindcss/vite@next lucide-react

# Remove old config files (not needed in v4)
rm tailwind.config.js postcss.config.js

# Start development server
npm run dev
```

## Project Structure

```
repo-health-dashboard/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components (Button, Card, etc.)
│   ├── layout/            # Layout components (Header, Sidebar, etc.)
│   ├── modals/            # Modal components
│   └── sections/          # Page sections
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and services
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

## API Integration

The dashboard connects to your backend API. Update the API base URL in `lib/constants.ts`:

```typescript
export const API_BASE_URL = "http://localhost:3001/api";
```

Expected API endpoint: `GET /api/score/{owner}/{repo}`

## Key Features

### 🎨 Tailwind CSS v4 Integration

- No config files needed - everything in CSS with `@config`
- Custom design system with brand colors
- Component classes for consistent styling

### 📱 Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile
- Adaptive layouts for all screen sizes

### 🔗 Type-Safe API Layer

- Custom hooks for data fetching
- Comprehensive TypeScript types
- Error handling and loading states

### 🌙 Theme System

- System preference detection
- Persistent theme storage
- Smooth transitions between themes

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel, Netlify, or any Node.js hosting platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different screen sizes
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
