# Sayak's Portfolio

A modern, responsive portfolio website built with React, Typescript, and Express.js.

## 🌐 Live Site

Visit the live site: [https://sayaksen.me/](https://sayaksen.me/)

## 📋 Project Overview

This portfolio showcases my work, skills, and experience as a developer. Built with a modern tech stack including:

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tools**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sayak-portfolio.git
cd sayak-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5000`.

## 🏗️ Project Structure

```
sayak-portfolio/
├── client/             # Frontend React application
│   ├── public/         # Static files
│   └── src/            # React components and logic
│       ├── components/ # UI components
│       ├── hooks/      # Custom React hooks
│       ├── lib/        # Utilities and helpers
│       ├── pages/      # Page components
│       └── schemas/    # Form validation schemas
├── .github/workflows/  # GitHub Actions deployment workflow
├── CNAME               # Custom domain configuration
└── README.md           # Project documentation
```

## 🔧 Build and Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 🌐 Custom Domain Setup

This project is configured to work with GitHub Pages and a custom domain.

### Key Files for Domain Configuration

1. **CNAME** file in the root directory contains the custom domain: `sayaksen.me`
2. **package.json** includes scripts for GitHub Pages deployment:
   ```json
   "scripts": {
     "postbuild": "node -e \"const fs = require('fs'); if (fs.existsSync('CNAME')) { fs.copyFileSync('CNAME', 'dist/CNAME'); }\"",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   },
   "homepage": "https://sayaksen.me/"
   ```
3. **vite.config.ts** with base path:
   ```typescript
   export default defineConfig({
     base: "/",
     // ...
   });
   ```
4. **SEO/Meta files** in the public directory:
   - robots.txt
   - sitemap.xml
   - _headers (security headers)

### Rebuilding From Scratch

When rebuilding the project, make sure to:

1. Keep the `CNAME` file in the root directory
2. Include the deployment scripts in `package.json`
3. Install the `gh-pages` dependency
4. Set `base: "/"` in `vite.config.ts` 
5. Copy the SEO meta files to the public directory
6. Add proper meta tags for custom domain in `index.html`

## 📝 License

MIT

## 👤 Contact

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/yourprofile)
- GitHub: [Your GitHub](https://github.com/yourusername)
