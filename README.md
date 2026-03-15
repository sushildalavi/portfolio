# Sushil Dalavi — Portfolio

A production-grade personal portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber. Features a 3D knowledge-graph hero, scroll-driven animations, and a data-driven architecture for easy content updates.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Three.js
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Main page composing all sections
│   └── globals.css         # Global styles and Tailwind theme
├── components/
│   ├── Navbar.tsx           # Sticky navbar with scroll effects
│   ├── Hero.tsx             # Hero section with 3D integration
│   ├── HeroScene.tsx        # Three.js knowledge graph scene
│   ├── About.tsx            # About section
│   ├── FeaturedProjects.tsx # Projects grid
│   ├── ProjectCard.tsx      # Individual project card
│   ├── Experience.tsx       # Work experience timeline
│   ├── Skills.tsx           # Skills/toolbox grid
│   ├── Publications.tsx     # Publications and IP
│   ├── Contact.tsx          # Contact section
│   ├── Footer.tsx           # Footer
│   └── SectionHeading.tsx   # Reusable section header
├── data/
│   ├── profile.ts           # Personal info, links, education
│   ├── projects.ts          # Project entries
│   ├── experience.ts        # Work experience entries
│   ├── skills.ts            # Skill groups
│   └── publications.ts      # Publications and patents
└── lib/
    └── utils.ts             # Utility functions (cn helper)
```

## Updating Content

All content is centralized in the `data/` directory. To update:

- **Profile info**: Edit `data/profile.ts`
- **Projects**: Add/modify entries in `data/projects.ts`
- **Experience**: Edit `data/experience.ts`
- **Skills**: Update skill groups in `data/skills.ts`
- **Publications**: Add entries to `data/publications.ts`

Each data file exports typed arrays/objects so TypeScript will catch any structural issues.

## Deployment

This site is deployment-ready for platforms like Vercel:

```bash
# Deploy to Vercel
npx vercel
```

Or build and serve statically:

```bash
npm run build
npm start
```
