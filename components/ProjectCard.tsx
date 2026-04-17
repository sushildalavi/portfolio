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

type Variant = "hero" | "featured" | "compact"

function TechTag({ tech }: { tech: string }) {
  const entry = getTechIcon(tech)
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md bg-foreground/[0.04] text-muted-foreground border border-foreground/[0.06] group-hover:border-foreground/[0.12] transition-colors duration-200">
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
  variant = "featured",
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

  const rotY = useTransform(smx, [0, 1], [-3, 3])
  const rotX = useTransform(smy, [0, 1], [3, -3])

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

  const isHero = variant === "hero"
  const isCompact = variant === "compact"

  const pad = isHero ? "p-8 md:p-12" : isCompact ? "p-6" : "p-7 md:p-8"

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4) }}
      style={{ perspective: 1400 }}
    >
      <motion.article
        ref={cardRef}
        className={`card-magnetic group relative overflow-hidden rounded-3xl border border-foreground/[0.08] bg-background/60 backdrop-blur-xl transition-colors duration-500 hover:border-accent/30 ${pad}`}
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
        {/* Cursor-trail gradient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(520px circle at var(--mouse-x,50%) var(--mouse-y,50%), color-mix(in srgb, var(--accent-val) 16%, transparent), transparent 55%)",
          }}
        />
        {/* Border glow ring */}
        <div className="card-border-glow" aria-hidden />

        <div className={`relative z-10 ${isHero ? "grid lg:grid-cols-[1.3fr_1fr] gap-10" : ""}`}>
          {/* Primary content column */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-accent/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-6 bg-accent/40" />
              {project.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h3
              className={`font-bold tracking-[-0.02em] text-foreground/95 group-hover:text-accent transition-colors duration-500 ${
                isHero
                  ? "text-4xl md:text-5xl lg:text-6xl leading-[0.95]"
                  : isCompact
                    ? "text-xl"
                    : "text-2xl md:text-3xl leading-[1.05]"
              }`}
            >
              {project.title}
            </h3>

            <p
              className={`text-accent/80 font-medium mt-3 ${
                isHero ? "text-lg md:text-xl" : "text-sm"
              }`}
            >
              {project.tagline}
            </p>

            <p
              className={`text-muted-foreground leading-relaxed mt-5 ${
                isHero ? "text-[15px] md:text-[16px] max-w-[55ch]" : "text-sm max-w-[58ch]"
              }`}
            >
              {project.description}
            </p>

            {!isCompact && (
              <ul className="mt-6 space-y-2.5">
                {project.highlights.slice(0, isHero ? 4 : 2).map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    <span className="leading-relaxed">{h}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center gap-1.5 mt-7">
              {project.technologies
                .slice(0, isHero ? 8 : isCompact ? 4 : 6)
                .map((tech) => (
                  <TechTag key={tech} tech={tech} />
                ))}
              {project.technologies.length > (isHero ? 8 : isCompact ? 4 : 6) && (
                <span className="text-[11px] text-muted font-mono">
                  +{project.technologies.length - (isHero ? 8 : isCompact ? 4 : 6)}
                </span>
              )}
            </div>

            {(project.links.github || project.links.live) && (
              <div className="flex items-center gap-5 mt-8 pt-6 border-t border-foreground/[0.06]">
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

          {/* Metrics column — hero variant only */}
          {isHero && project.metrics.length > 0 && (
            <div className="relative">
              <div className="sticky top-8 space-y-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                  Shipped Metrics
                </p>
                <div className="grid gap-3">
                  {project.metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + i * 0.08 }}
                      className="rounded-2xl border border-accent/15 bg-accent/[0.04] p-5"
                    >
                      <CountUp
                        value={metric.value}
                        className="text-3xl md:text-4xl font-bold text-accent tracking-tight"
                      />
                      <p className="text-xs text-muted mt-1">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Featured (non-hero) metrics — inline strip */}
          {!isHero && !isCompact && project.metrics.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-2">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] px-3 py-2.5"
                >
                  <CountUp
                    value={metric.value}
                    className="text-sm font-bold text-accent"
                  />
                  <p className="text-[10px] text-muted mt-0.5 truncate">{metric.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  )
}
