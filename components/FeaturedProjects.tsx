"use client"

import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import ProjectCard from "./ProjectCard"
import { projects } from "@/data/projects"

/**
 * Clean, staff-eng style project showcase.
 * Featured: large hero card on top, remaining featured cards below in a 2-col grid.
 * Rest: simple 2-col grid.
 */
export default function FeaturedProjects() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
  const other = projects
    .filter((p) => !p.featured)
    .sort((a, b) => a.order - b.order)

  const [hero, ...rest] = featured

  return (
    <section id="projects" className="relative py-24 md:py-32 px-6">
      <div className="pointer-events-none absolute top-1/3 right-0 h-[520px] w-[520px] rounded-full bg-accent/[0.035] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-[420px] w-[420px] rounded-full bg-secondary/[0.04] blur-[140px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-14 md:mb-20 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <SectionHeading
              label="Selected Work"
              title="Systems I've shipped"
              subtitle="Production AI, retrieval, and distributed workflow platforms — architected end-to-end."
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted"
          >
            <span className="text-accent">{String(featured.length).padStart(2, "0")}</span>
            <span>/ featured</span>
          </motion.div>
        </div>

        {hero && (
          <div className="mb-6">
            <ProjectCard project={hero} index={0} variant="hero" />
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i + 1}
                variant="featured"
              />
            ))}
          </div>
        )}

        {other.length > 0 && (
          <div className="mt-20 pt-14 border-t border-foreground/[0.06]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-end justify-between"
            >
              <h3 className="text-sm font-mono text-muted tracking-[0.22em] uppercase">
                More Projects
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted">
                {String(other.length).padStart(2, "0")} / archive
              </span>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {other.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i + featured.length}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
