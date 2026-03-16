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
          <div className="max-w-3xl">
            <SectionHeading
              label="Projects"
              title="Featured Work"
              subtitle="Systems I've designed and built — from retrieval-augmented research assistants to production ML pipelines."
            />
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
