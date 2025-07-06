# replit.md

## Overview

This is a modern full-stack portfolio website built with React/TypeScript on the frontend and Express.js/Node.js on the backend. The application showcases a personal portfolio for "Alex Chen," a Computer Science Engineering student, featuring sections for about, projects, skills, and contact functionality. The architecture follows a clean separation between client and server with shared type definitions and database schema.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API**: RESTful endpoints with JSON responses
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot reload with tsx

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Centralized schema definitions in `/shared` folder
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless driver

## Key Components

### Shared Layer (`/shared`)
- **Schema Definitions**: Database tables and validation schemas
- **Type Safety**: Shared TypeScript types between client and server
- **Contact Messages**: Schema for storing contact form submissions

### Client Components (`/client/src`)
- **Portfolio Sections**: Hero, About, Projects, Skills, Contact
- **UI Components**: Comprehensive shadcn/ui component library
- **Custom Hooks**: Smooth scrolling, intersection observer, mobile detection
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Server Layer (`/server`)
- **Express App**: Main application server with middleware
- **Routes**: API endpoints for contact form submission
- **Storage**: In-memory storage implementation (development)
- **Vite Integration**: Development server with HMR support

## Data Flow

### Contact Form Submission
1. User fills out contact form on frontend
2. React Hook Form validates input using Zod schema
3. TanStack Query sends POST request to `/api/contact`
4. Server validates request data against shared schema
5. Contact message stored in memory (development) or database (production)
6. Success/error response sent back to client
7. UI updated with toast notification

### Development Workflow
1. Vite serves React application with HMR
2. Express server handles API requests
3. Shared schemas ensure type safety across stack
4. Real-time error overlay for development debugging

## External Dependencies

### UI/Styling
- **Radix UI**: Headless component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management

### Data/State Management
- **TanStack Query**: Server state management
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation library
- **Drizzle ORM**: Type-safe database ORM

### Development Tools
- **Vite**: Fast build tool and dev server
- **TypeScript**: Static type checking
- **ESBuild**: Production bundling
- **Replit Plugins**: Development environment integration

## Deployment Strategy

### Development
- Vite dev server serves frontend with HMR
- Express server runs alongside with nodemon-like behavior
- In-memory storage for rapid development iteration
- Real-time error reporting and debugging

### Production Build
1. Vite builds optimized React bundle to `/dist/public`
2. ESBuild bundles Express server to `/dist/index.js`
3. Static files served by Express in production
4. Database migrations applied via Drizzle Kit
5. Environment variables configure production database

### Database Strategy
- Development: In-memory storage for rapid iteration
- Production: PostgreSQL via Neon Database serverless
- Schema-first approach with type-safe operations
- Migration-based schema evolution

## Changelog

```
Changelog:
- July 06, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```