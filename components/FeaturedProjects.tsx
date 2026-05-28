"use client"

import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import ProjectCard from "./ProjectCard"
import { projects } from "@/data/projects"

/**
 * All featured projects share the same case-study layout.
 * Stacked vertically, each gets full width + metrics column on the right.
 */
export default function FeaturedProjects() {
  const ordered = [...projects].sort((a, b) => a.order - b.order)

  return (
    <section id="projects" className="relative py-24 md:py-32 px-6">
      <div className="pointer-events-none absolute top-1/3 right-0 h-[520px] w-[520px] rounded-full bg-accent/[0.03] blur-[140px] bg-blob" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-24 h-56 w-56 rounded-full bg-secondary/[0.09] blur-[110px]"
        animate={{ x: [0, 20, 0], y: [0, -18, 0], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-14 md:mb-20 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <SectionHeading
              label="Selected Work"
              title="Selected engineering work"
              subtitle="Backend, observability, workflow, and AI infrastructure projects built end-to-end, with clear reliability, latency, and throughput outcomes."
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted"
          >
            <span className="text-accent">{String(ordered.length).padStart(2, "0")}</span>
            <span>/ projects</span>
          </motion.div>
        </div>

        <div className="space-y-6 md:space-y-8">
          {ordered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              variant="case-study"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
