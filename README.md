# Sayak Sen - Portfolio

A modern, high-performance portfolio website built with React, TypeScript, Vite, and Tailwind CSS. Features interactive 2D animations, responsive design, and optimized performance for an engaging user experience.

## ✨ Features

- **Interactive 2D Canvas Animations** - Floating particles, geometric shapes, and mouse interactions
- **Modern Black & Blue Design** - Sleek, professional color scheme with gradient backgrounds
- **High Performance** - Optimized for 60fps animations and fast loading (~145KB gzipped)
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Interactive Elements** - Confetti effects, particle connections, and hover animations
- **SEO Optimized** - Proper meta tags, sitemap, robots.txt, and semantic HTML
- **Production Ready** - Lint-free code, error handling, and performance monitoring
- **Modern Tech Stack** - Latest React 18, TypeScript 5, Vite 5, and Tailwind CSS 3

## 🚀 Technologies Used

- **Frontend**: [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 5](https://vitejs.dev/) with optimized chunking and tree shaking
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with custom animations
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with toast notifications
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + Custom Canvas 2D
- **Performance**: Bundle optimization, code splitting, and performance monitoring utilities

## 📱 Demo Sections

- **Hero Section** - Interactive animated background with floating particles
- **About Section** - Professional introduction with smooth animations
- **Projects Section** - 3D-styled project cards with hover effects
- **Skills Section** - Animated progress bars and skill categories
- **Education Section** - Timeline-based education history
- **Contact Section** - Contact form with toast notifications

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/) or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install dependencies:

```sh
git clone <YOUR_GIT_URL>
cd sayak-portfolio
npm install # or bun install or yarn install
```

### Running the Development Server

```sh
npm run dev # or bun run dev or yarn dev
```

The app will be available at http://localhost:5173 by default.

### Building for Production

```sh
npm run build # or bun run build or yarn build
```

### Preview Production Build

```sh
npm run preview # or bun run preview or yarn preview
```

### Linting

```sh
npm run lint # or bun run lint or yarn lint
```

## 🚀 Deployment

The project is optimized for deployment on modern static hosting providers:

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Netlify

1. Build: `npm run build`
2. Deploy folder: `dist`
3. Or drag & drop the `dist` folder to Netlify

### GitHub Pages

1. Update `vite.config.ts` with your GitHub repository base path
2. Run `npm run build`
3. Deploy the `dist` folder to your gh-pages branch

### Other Providers

The `dist` folder contains all static assets and can be deployed to any static hosting provider.

## 🎨 Customization

### Content

- Update sections in `src/components/portfolio/` directory:
  - `HeroSection.tsx` - Hero introduction and title
  - `AboutSection.tsx` - About me content
  - `ProjectsSection.tsx` - Projects showcase
  - `SkillsSection.tsx` - Skills and proficiency levels
  - `EducationSection.tsx` - Education timeline
  - `ContactSection.tsx` - Contact information

### Styling

- Modify `tailwind.config.ts` for color schemes and animations
- Update `src/index.css` for global styles
- Customize animations in `src/components/portfolio/SimpleCodeMatrix.tsx`

### Performance

- Adjust animation settings in `src/utils/performance.ts`
- Modify particle counts and effects for different devices
- Update Vite configuration in `vite.config.ts` for build optimization

## 📊 Performance Metrics

- **Bundle Size**: ~145KB gzipped (optimized with code splitting)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Animation FPS**: 60fps with performance monitoring
- **Mobile Optimized**: Reduced particle counts and smooth animations

## 🛠️ Development Features

- **Hot Module Replacement** - Instant updates during development
- **TypeScript** - Full type safety and IntelliSense
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting (via VSCode extensions)
- **Performance Monitoring** - Built-in performance utilities

## 📝 License

This project is open source and available under the MIT License.

---

**Built with ❤️ by Sayak Sen**
