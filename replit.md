# Tech-Business Roadmap 2025 - Gen Z Mobile Application

## Overview

This is a React-based progressive web application designed to guide Gen Z professionals in Pakistan through a tech-business development roadmap. The application provides a mobile-first experience with interactive progress tracking, skills monitoring, and income stream management.

## Recent Changes (January 2025)

- **Database Integration**: Connected PostgreSQL database for persistent user data storage
- **Interactive Features**: Added clickable skills, income streams, and roadmap phases for real-time progress updates
- **API Integration**: Implemented REST API endpoints for progress, skills, and income data
- **LinkedIn Integration**: Added "Start Learning" button linking to developer's LinkedIn profile (linkedin.com/in/uzair-ahmed-me/)
- **Loading States**: Added skeleton loading animations throughout the application

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with custom Gen Z-themed dark mode design
- **UI Components**: Radix UI primitives wrapped in custom shadcn/ui components
- **State Management**: React Query (@tanstack/react-query) for server state
- **Navigation**: Wouter for lightweight client-side routing
- **Mobile Optimization**: Custom hooks for swipe gestures, pull-to-refresh, and responsive design

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for fast compilation and bundling

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless configuration
- **Schema**: Shared TypeScript schema definitions with Zod validation
- **Migrations**: Drizzle Kit for database schema management
- **Development Storage**: In-memory storage implementation for rapid prototyping

## Key Components

### Mobile-First UI System
- **Glass Morphism Design**: Custom glass-card components with backdrop blur effects
- **Gesture Navigation**: Swipe gestures for section navigation
- **Pull-to-Refresh**: Native mobile interaction patterns
- **Bottom Navigation**: Fixed navigation bar optimized for thumb navigation
- **Responsive Components**: Mobile-first responsive design with touch-optimized targets

### Progress Tracking System
- **Phase Management**: 4-phase roadmap progression (Foundation, Integration, Expansion, Pivot & Scale)
- **Task Completion**: JSON-based task tracking with visual progress indicators
- **Real-time Updates**: Instant progress synchronization across sessions

### Skills Assessment
- **Category-based Skills**: Technical, Business, and AI skill categories
- **Visual Progress Meters**: Custom skill meter components with gradient progress bars
- **Level Tracking**: 0-100 percentage-based skill progression

### Income Stream Management
- **Multiple Revenue Sources**: SaaS, Freelancing, Digital Products, Consulting
- **Revenue Tracking**: Monthly income tracking with visual summaries
- **Goal Setting**: Income target management and progress visualization

## Data Flow

1. **Client Initialization**: React app loads with dark theme and mobile optimizations
2. **API Communication**: RESTful endpoints for CRUD operations on user data
3. **State Management**: React Query handles caching, synchronization, and optimistic updates
4. **Local Storage**: Browser storage for theme preferences and session data
5. **Real-time Updates**: Immediate UI feedback with server synchronization

## External Dependencies

### UI Framework
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **React Hook Form**: Form state management with validation
- **Hookform Resolvers**: Zod integration for form validation

### Mobile Experience
- **Wouter**: Lightweight routing library
- **Custom Hooks**: Swipe gestures, pull-to-refresh, mobile detection
- **Touch Optimization**: Custom CSS for mobile interactions

### Database & Validation
- **Drizzle ORM**: PostgreSQL ORM with TypeScript support
- **Zod**: Runtime type validation and schema generation
- **Neon Database**: Serverless PostgreSQL hosting

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across frontend and backend
- **ESLint**: Code quality and consistency
- **Replit Integration**: Development environment optimization

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with instant updates
- **TypeScript Compilation**: Real-time type checking and error reporting
- **API Proxy**: Seamless frontend-backend communication in development

### Production Build
- **Frontend**: Vite builds optimized React application to static assets
- **Backend**: esbuild compiles TypeScript server to ESM format
- **Asset Optimization**: Minification, tree-shaking, and code splitting
- **Environment Variables**: Secure configuration management

### Database Management
- **Schema Migrations**: Drizzle Kit handles database schema evolution
- **Connection Pooling**: Neon serverless PostgreSQL with automatic scaling
- **Development Flexibility**: In-memory storage fallback for rapid prototyping

### Mobile Deployment
- **Progressive Web App**: Service worker support and offline capabilities
- **Responsive Design**: Mobile-first approach with touch optimization
- **Performance**: Optimized for mobile networks and devices