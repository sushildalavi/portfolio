"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import { ExternalLink, Github, ChevronRight } from "lucide-react"
import type { Project } from "@/data/projects"
import { getTechIcon } from "@/lib/techIcons"
import CountUp from "./CountUp"

function TechTag({ tech }: { tech: string }) {
  const entry = getTechIcon(tech)

  return (
    <motion.span
      className="inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-md bg-foreground/[0.04] text-muted-foreground border border-foreground/[0.04] hover:border-accent/25 hover:text-accent hover:bg-accent/5 transition-all duration-200 cursor-default"
      whileHover={{ scale: 1.1, y: -2 }}
    >
      {entry && (
        <entry.icon
          size={12}
          style={{ color: entry.color }}
          className="shrink-0"
        />
      )}
      {tech}
    </motion.span>
  )
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const isFeatured = project.featured
  const cardRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // Raw mouse position (0..1) inside card
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  // Smooth springs for 3D tilt + magnetic translate
  const spring = { stiffness: 220, damping: 22, mass: 0.6 }
  const smx = useSpring(mx, spring)
  const smy = useSpring(my, spring)

  // Tilt rotations (centered — subtract 0.5)
  const rotateY = useTransform(smx, [0, 1], [-8, 8])
  const rotateX = useTransform(smy, [0, 1], [8, -8])
  // Magnetic translate — subtle pull toward cursor
  const translateX = useTransform(smx, [0, 1], [-6, 6])
  const translateY = useTransform(smy, [0, 1], [-6, 6])

  // Parallax for inner elements (small opposite offset)
  const innerX = useTransform(smx, [0, 1], [4, -4])
  const innerY = useTransform(smy, [0, 1], [4, -4])

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    mx.set(nx)
    my.set(ny)
    el.style.setProperty("--mouse-x", `${nx * 100}%`)
    el.style.setProperty("--mouse-y", `${ny * 100}%`)
  }

  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.article
        ref={cardRef}
        className={`card-glow card-magnetic group relative rounded-2xl bg-background/62 border hover:border-accent/35 hover:shadow-[0_28px_80px_var(--accent-glow-val)] transition-colors duration-500 overflow-hidden ${
          isFeatured
            ? "p-6 md:p-8 border-accent/20 animate-border-glow"
            : "p-5 md:p-6 border-foreground/[0.08]"
        }`}
        onMouseMove={reduced ? undefined : handleMove}
        onMouseLeave={reduced ? undefined : handleLeave}
        style={
          reduced
            ? undefined
            : {
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={reduced ? undefined : { scale: 1.015 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {/* Strong cursor spotlight */}
        <div className="card-spotlight card-spotlight-strong" />
        {/* Cursor-trail border glow */}
        <div className="card-border-glow" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.div
          className="relative z-10"
          style={
            reduced
              ? undefined
              : {
                  x: innerX,
                  y: innerY,
                  transformStyle: "preserve-3d",
                }
          }
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.categories.map((cat) => (
              <motion.span
                key={cat}
                className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/10 text-accent/80 hover:bg-accent/20 hover:text-accent transition-all duration-200 cursor-default"
                whileHover={{ scale: 1.12, y: -2 }}
                style={{ transform: "translateZ(20px)" }}
              >
                {cat}
              </motion.span>
            ))}
          </div>

          <h3
            className={`font-bold tracking-tight group-hover:text-accent transition-colors duration-300 ${
              isFeatured ? "text-xl md:text-2xl" : "text-lg"
            }`}
            style={{ transform: "translateZ(30px)" }}
          >
            {project.title}
          </h3>
          <p
            className="text-accent/70 text-sm mt-1 font-medium"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.tagline}
          </p>

          <p
            className={`text-muted-foreground leading-relaxed mt-4 ${
              isFeatured ? "text-[15px]" : "text-sm"
            }`}
          >
            {project.description}
          </p>

          {isFeatured && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  className="px-4 py-3 rounded-xl bg-accent/[0.08] border border-accent/12 hover:border-accent/28 transition-all duration-200"
                  whileHover={{ scale: 1.06, y: -2 }}
                  style={{ transform: "translateZ(24px)" }}
                >
                  <CountUp value={metric.value} className="text-lg font-bold text-accent" />
                  <p className="text-[11px] text-muted mt-0.5">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          {isFeatured && (
            <ul className="mt-6 space-y-2">
              {project.highlights.slice(0, 3).map((h, i) => (
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

          <div className="flex flex-wrap items-center gap-1.5 mt-6">
            {project.technologies
              .slice(0, isFeatured ? 6 : 4)
              .map((tech) => (
                <TechTag key={tech} tech={tech} />
              ))}
            {project.technologies.length > (isFeatured ? 6 : 4) && (
              <span className="text-[11px] text-muted">
                +{project.technologies.length - (isFeatured ? 6 : 4)}
              </span>
            )}
          </div>

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
        </motion.div>
      </motion.article>
    </motion.div>
  )
}
