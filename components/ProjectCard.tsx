"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import type { Project } from "@/data/projects"
import { getTechIcon } from "@/lib/techIcons"
import CountUp from "./CountUp"

type Variant = "case-study" | "compact"

function TechTag({ tech }: { tech: string }) {
  const entry = getTechIcon(tech)
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md bg-foreground/[0.035] text-muted-foreground border border-foreground/[0.06] group-hover:border-foreground/[0.14] transition-colors duration-300">
      {entry && (
        <entry.icon
          size={11}
          style={{ color: entry.color }}
          className="shrink-0"
        />
      )}
      {tech}
    </span>
  )
}

export default function ProjectCard({
  project,
  index,
  variant = "case-study",
}: {
  project: Project
  index: number
  variant?: Variant
}) {
  const cardRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const spring = { stiffness: 240, damping: 26, mass: 0.6 }
  const smx = useSpring(mx, spring)
  const smy = useSpring(my, spring)

  const rotY = useTransform(smx, [0, 1], [-2, 2])
  const rotX = useTransform(smy, [0, 1], [2, -2])

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

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3) }}
        style={{ perspective: 1400 }}
      >
        <motion.article
          ref={cardRef}
          className="card-magnetic group relative overflow-hidden rounded-2xl border border-foreground/[0.08] bg-background/50 backdrop-blur-xl p-6 transition-colors duration-500 hover:border-accent/25"
          onMouseMove={reduced ? undefined : handleMove}
          onMouseLeave={reduced ? undefined : handleLeave}
          style={
            reduced
              ? undefined
              : {
                  rotateX: rotX,
                  rotateY: rotY,
                  transformStyle: "preserve-3d",
                }
          }
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%), color-mix(in srgb, var(--accent-val) 12%, transparent), transparent 55%)",
            }}
          />
          <div className="card-border-glow" aria-hidden />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
              <span className="text-accent/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-4 bg-foreground/20" />
              {project.categories[0]}
            </div>
            <h3 className="mt-4 text-xl font-bold tracking-[-0.015em] text-foreground/92 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-accent/70 mt-1 font-medium">{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <TechTag key={tech} tech={tech} />
              ))}
              {project.technologies.length > 4 && (
                <span className="text-[11px] text-muted font-mono">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </motion.article>
      </motion.div>
    )
  }

  // case-study variant — all featured projects use this
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.08, 0.3) }}
      style={{ perspective: 1600 }}
    >
      <motion.article
        ref={cardRef}
        className="card-magnetic group relative overflow-hidden rounded-3xl border border-foreground/[0.08] bg-background/55 backdrop-blur-xl transition-colors duration-500 hover:border-accent/25"
        onMouseMove={reduced ? undefined : handleMove}
        onMouseLeave={reduced ? undefined : handleLeave}
        style={
          reduced
            ? undefined
            : {
                rotateX: rotX,
                rotateY: rotY,
                transformStyle: "preserve-3d",
              }
        }
      >
        {/* Cursor wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(640px circle at var(--mouse-x,50%) var(--mouse-y,50%), color-mix(in srgb, var(--accent-val) 14%, transparent), transparent 55%)",
          }}
        />
        <div className="card-border-glow" aria-hidden />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr]">
          {/* Content column */}
          <div className="p-8 md:p-12 lg:border-r lg:border-foreground/[0.05]">
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em]">
              <span className="text-accent/90">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-accent/40" />
              {project.categories.slice(0, 2).map((cat, i) => (
                <span key={cat} className="text-muted-foreground">
                  {cat}{i < Math.min(project.categories.length, 2) - 1 ? " ·" : ""}
                </span>
              ))}
            </div>

            <h3 className="mt-6 text-4xl md:text-5xl lg:text-[56px] font-bold leading-[0.96] tracking-[-0.025em] text-foreground/95 group-hover:text-accent transition-colors duration-500">
              {project.title}
            </h3>

            <p className="mt-3 text-lg md:text-xl font-medium text-accent/85">
              {project.tagline}
            </p>

            <p className="mt-6 text-[15px] md:text-[16px] leading-[1.7] text-muted-foreground max-w-[58ch]">
              {project.description}
            </p>

            <ul className="mt-7 space-y-3">
              {project.highlights.slice(0, 4).map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + i * 0.05 }}
                  className="flex items-start gap-3 text-[14.5px] text-muted-foreground leading-relaxed"
                >
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-1.5">
              {project.technologies.slice(0, 8).map((tech) => (
                <TechTag key={tech} tech={tech} />
              ))}
              {project.technologies.length > 8 && (
                <span className="text-[11px] text-muted font-mono">
                  +{project.technologies.length - 8}
                </span>
              )}
            </div>

            {(project.links.github || project.links.live || project.links.paper) && (
              <div className="mt-8 pt-6 border-t border-foreground/[0.06] flex items-center gap-6">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors group/link"
                  >
                    <Github size={15} />
                    <span>Source</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all"
                    />
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors group/link"
                  >
                    <span>Live</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all"
                    />
                  </a>
                )}
                {project.links.paper && (
                  <a
                    href={project.links.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors group/link"
                  >
                    <span>Paper</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all"
                    />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Metrics column */}
          <div className="p-8 md:p-12 lg:p-10 border-t lg:border-t-0 border-foreground/[0.05] bg-foreground/[0.015]">
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
              Shipped Metrics
            </p>

            {project.metrics.length > 0 ? (
              <div className="mt-6 space-y-4">
                {project.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    className="rounded-2xl border border-accent/15 bg-accent/[0.04] p-5"
                  >
                    <CountUp
                      value={metric.value}
                      className="text-3xl md:text-[34px] font-bold text-accent tracking-[-0.02em] leading-none"
                    />
                    <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted">
                      {metric.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] p-5">
                <p className="text-sm text-muted">
                  Metrics captured in codebase.
                </p>
              </div>
            )}

            {/* Stack section — tags stacked */}
            <div className="mt-10 pt-6 border-t border-foreground/[0.06]">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted mb-3">
                Stack
              </p>
              <div className="space-y-1.5">
                {project.technologies.slice(0, 6).map((tech) => {
                  const entry = getTechIcon(tech)
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-2.5 text-[13px] text-foreground/75"
                    >
                      {entry ? (
                        <entry.icon
                          size={12}
                          style={{ color: entry.color }}
                          className="shrink-0"
                        />
                      ) : (
                        <span className="h-1 w-1 rounded-full bg-foreground/30 shrink-0" />
                      )}
                      {tech}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}
