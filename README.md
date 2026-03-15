# Sushil Dalavi — Portfolio

A production-grade personal portfolio built with Next.js 16, React Three Fiber, and Framer Motion. Features a 3D animated coding character, custom cursor, 60+ branded tech logos, and extensive micro-interactions.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with CSS variable theming
- **3D Graphics**: React Three Fiber + drei + Three.js + custom GLSL shaders
- **Animation**: Framer Motion (60+ animated components)
- **Icons**: Lucide React + react-icons (Simple Icons, Font Awesome)
- **Fonts**: Geist Sans & Geist Mono

## Features

- **3D Hero Scene** — Blocky character coding at a desk with GLSL animated screen, orbiting wireframe shapes, and ambient particles
- **Custom Animated Cursor** — Dot + trailing ring with spring physics, hover glow, click feedback
- **Dark / Light Theme** — Real Madrid gold palette, localStorage persistence, FOUC prevention
- **Tech Logo Marquee** — Infinite scrolling strip of 24 branded tech icons in original colors
- **3D Card Tilt** — All cards respond to cursor position with perspective transform
- **Count-Up Metrics** — Project numbers animate from 0 on scroll
- **Canvas Particles** — Floating connected particles on the About section
- **Page Preloader** — Animated splash with character-by-character name reveal
- **Scroll-to-Top** — Floating gold button appears on scroll
- **Accessibility** — Skip to content, focus-visible rings, prefers-reduced-motion support
- **SEO** — OpenGraph metadata, robots.txt, sitemap.xml

## Getting Started

```bash
# Clone the repository
git clone https://github.com/sushildalavi/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click Deploy
4. Custom domain: add in Vercel dashboard → Settings → Domains

### Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

### Self-hosted

```bash
npm run build
npm start  # Starts on port 3000
```

## Project Structure

```
├── app/
│   ├── globals.css          # Theme variables, animations, utilities
│   ├── layout.tsx           # Root layout, fonts, metadata, theme
│   ├── page.tsx             # Main page composing all sections
│   ├── robots.ts            # SEO robots.txt
│   └── sitemap.ts           # SEO sitemap.xml
├── components/
│   ├── HeroScene.tsx        # 3D character scene (R3F + GLSL)
│   ├── CustomCursor.tsx     # Animated cursor with spring physics
│   ├── TechMarquee.tsx      # Scrolling tech logo strip
│   ├── PageLoader.tsx       # Splash screen animation
│   ├── ScrollToTop.tsx      # Floating scroll button
│   ├── CountUp.tsx          # Animated number counter
│   ├── FloatingParticles.tsx # Canvas particle network
│   ├── Navbar.tsx           # Sticky nav with animated underlines
│   ├── Hero.tsx             # Hero section with 3D integration
│   ├── About.tsx            # About with focus areas + education
│   ├── ProjectCard.tsx      # Tilt-enabled project cards
│   ├── FeaturedProjects.tsx # Project grid layout
│   ├── Experience.tsx       # Timeline with pulse dots
│   ├── Skills.tsx           # Skill grid with branded icons
│   ├── Publications.tsx     # Research papers + patent
│   ├── Contact.tsx          # Contact links + CTA
│   ├── Footer.tsx           # Minimal footer
│   ├── SectionHeading.tsx   # Reusable section header
│   └── ThemeProvider.tsx    # Dark/light theme context
├── data/
│   ├── profile.ts           # Personal info + education
│   ├── projects.ts          # Project entries
│   ├── experience.ts        # Work experience
│   ├── skills.ts            # Skill categories
│   └── publications.ts      # Papers + patent
└── lib/
    ├── utils.ts             # Tailwind class merge utility
    ├── tilt.ts              # 3D card tilt transform
    └── techIcons.ts         # Tech name → branded icon mapping
```

## Updating Content

All content lives in the `data/` directory as typed TypeScript objects. Edit any file and the site updates automatically:

- **Profile**: `data/profile.ts` — name, role, headline, about, education, links
- **Projects**: `data/projects.ts` — add/edit project entries
- **Experience**: `data/experience.ts` — add/edit work entries
- **Skills**: `data/skills.ts` — add/edit skill categories
- **Publications**: `data/publications.ts` — add/edit papers with links

To add a tech icon for a new skill, add the mapping in `lib/techIcons.ts`.

## License

MIT
