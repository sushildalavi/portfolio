"use client"

import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import ProjectCard from "./ProjectCard"
import { projects } from "@/data/projects"

export default function FeaturedProjects() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
  const other = projects
    .filter((p) => !p.featured)
    .sort((a, b) => a.order - b.order)

  return (
    <section id="projects" className="py-20 md:py-28 px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/[0.04] rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="section-panel section-panel-accent rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <SectionHeading
              label="Projects"
              title="Featured Work"
              subtitle="Systems I've designed and built — from retrieval-augmented research assistants to production ML pipelines."
            />
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="rounded-2xl border border-foreground/[0.08] bg-background/55 px-5 py-4 backdrop-blur-sm"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-accent/80">
                Snapshot
              </p>
              <p className="mt-3 text-2xl font-bold tracking-tight">
                {featured.length} featured
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Focused on RAG, NLP, and production AI systems with measurable outcomes.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {other.length > 0 && (
            <div className="mt-14 border-t border-foreground/[0.08] pt-10">
              <motion.h3
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-sm font-mono text-muted tracking-wider uppercase mb-6"
              >
                More Projects
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {other.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i + featured.length}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
