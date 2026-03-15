"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ChevronRight } from "lucide-react"
import type { Project } from "@/data/projects"

export default function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const isFeatured = project.featured

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-2xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/25 transition-all duration-500 overflow-hidden ${
        isFeatured ? "p-6 md:p-8" : "p-5 md:p-6"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/10 text-accent/80"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3
          className={`font-bold tracking-tight ${isFeatured ? "text-xl md:text-2xl" : "text-lg"}`}
        >
          {project.title}
        </h3>
        <p className="text-accent/70 text-sm mt-1 font-medium">
          {project.tagline}
        </p>

        <p
          className={`text-muted-foreground leading-relaxed mt-4 ${isFeatured ? "text-[15px]" : "text-sm"}`}
        >
          {project.description}
        </p>

        {isFeatured && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-6">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="px-4 py-3 rounded-xl bg-accent/[0.07] border border-accent/10"
              >
                <p className="text-lg font-bold text-accent">{metric.value}</p>
                <p className="text-[11px] text-muted mt-0.5">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {isFeatured && (
          <ul className="mt-6 space-y-2">
            {project.highlights.slice(0, 4).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <ChevronRight
                  size={14}
                  className="text-accent/40 mt-0.5 shrink-0"
                />
                <span className="text-muted-foreground">{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-1.5 mt-6">
          {project.technologies.slice(0, isFeatured ? 8 : 5).map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-1 rounded-md bg-foreground/[0.04] text-muted-foreground border border-foreground/[0.04]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > (isFeatured ? 8 : 5) && (
            <span className="text-[11px] text-muted">
              +{project.technologies.length - (isFeatured ? 8 : 5)}
            </span>
          )}
        </div>

        {(project.links.github || project.links.live) && (
          <div className="flex gap-3 mt-6 pt-4 border-t border-foreground/[0.04]">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <Github size={14} />
                Source
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.links.paper && (
              <a
                href={project.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <ExternalLink size={14} />
                Paper
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}
