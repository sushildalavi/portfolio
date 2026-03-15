"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, ChevronRight } from "lucide-react"
import type { Project } from "@/data/projects"
import { getTiltTransform } from "@/lib/tilt"

export default function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const isFeatured = project.featured
  const [tilt, setTilt] = useState("")

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <article
        className={`group relative rounded-2xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/30 hover:shadow-[0_0_40px_rgba(255,215,0,0.05)] transition-all duration-500 overflow-hidden ${
          isFeatured ? "p-6 md:p-8" : "p-5 md:p-6"
        }`}
        onMouseMove={(e) => setTilt(getTiltTransform(e))}
        onMouseLeave={() => setTilt("")}
        style={{ transform: tilt, transition: "transform 0.15s ease-out" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Category tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.categories.map((cat) => (
              <motion.span
                key={cat}
                className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/10 text-accent/80 hover:bg-accent/20 hover:text-accent transition-all duration-200 cursor-default"
                whileHover={{ scale: 1.12, y: -2 }}
              >
                {cat}
              </motion.span>
            ))}
          </div>

          <h3
            className={`font-bold tracking-tight group-hover:text-accent transition-colors duration-300 ${isFeatured ? "text-xl md:text-2xl" : "text-lg"}`}
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

          {/* Metrics */}
          {isFeatured && project.metrics.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6">
              {project.metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  className="px-4 py-3 rounded-xl bg-accent/[0.07] border border-accent/10 hover:border-accent/25 transition-all duration-200"
                  whileHover={{ scale: 1.06, y: -2 }}
                >
                  <p className="text-lg font-bold text-accent">{metric.value}</p>
                  <p className="text-[11px] text-muted mt-0.5">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Highlights */}
          {isFeatured && (
            <ul className="mt-6 space-y-2">
              {project.highlights.slice(0, 4).map((h, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <ChevronRight
                    size={14}
                    className="text-accent/40 mt-0.5 shrink-0"
                  />
                  <span className="text-muted-foreground">{h}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-6">
            {project.technologies.slice(0, isFeatured ? 8 : 5).map((tech) => (
              <motion.span
                key={tech}
                className="text-[11px] px-2 py-1 rounded-md bg-foreground/[0.04] text-muted-foreground border border-foreground/[0.04] hover:border-accent/25 hover:text-accent hover:bg-accent/5 transition-all duration-200 cursor-default"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > (isFeatured ? 8 : 5) && (
              <span className="text-[11px] text-muted">
                +{project.technologies.length - (isFeatured ? 8 : 5)}
              </span>
            )}
          </div>

          {/* Links */}
          {(project.links.github || project.links.live) && (
            <div className="flex gap-3 mt-6 pt-4 border-t border-foreground/[0.04]">
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <Github size={14} />
                  Source
                </motion.a>
              )}
              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <ExternalLink size={14} />
                  Live Demo
                </motion.a>
              )}
              {project.links.paper && (
                <motion.a
                  href={project.links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <ExternalLink size={14} />
                  Paper
                </motion.a>
              )}
            </div>
          )}
        </div>
      </article>
    </motion.div>
  )
}
