"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import ProjectCard from "./ProjectCard"
import { projects } from "@/data/projects"

/**
 * Desktop: a pinned horizontal scroll showcase. Vertical page scroll
 * translates the project rail horizontally, creating a signature
 * "scroll moment" for featured work.
 * Mobile & reduced-motion: a stacked vertical grid.
 */
export default function FeaturedProjects() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
  const other = projects
    .filter((p) => !p.featured)
    .sort((a, b) => a.order - b.order)

  const reduced = useReducedMotion()

  const trackRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  // Measured distance (px) the rail must translate to reveal all cards.
  const [maxTranslate, setMaxTranslate] = useState(0)
  const [ready, setReady] = useState(false)

  const measure = () => {
    const rail = railRef.current
    const viewport = viewportRef.current
    if (!rail || !viewport) return
    const railWidth = rail.scrollWidth
    const viewportWidth = viewport.clientWidth
    const next = Math.max(0, railWidth - viewportWidth)
    setMaxTranslate(next)
    setReady(true)
  }

  // Measure after first paint and on resize.
  useLayoutEffect(() => {
    measure()
    // Re-measure after fonts/images settle.
    const t = setTimeout(measure, 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })

  const railX = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Pinned section height: 1vh of natural pin + 1px per px of rail travel.
  // Feels like a normal scroll distance regardless of card count / viewport.
  const sectionHeight =
    ready && maxTranslate > 0
      ? `calc(100vh + ${maxTranslate}px)`
      : `${(featured.length + 0.5) * 100}vh`

  return (
    <section id="projects" className="relative">
      {/* Pinned horizontal scroll — desktop only */}
      <div
        ref={trackRef}
        className="hidden lg:block relative"
        style={{ height: sectionHeight }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[420px] h-[420px] bg-accent/[0.04] rounded-full blur-[140px]" />
            <div className="absolute bottom-1/4 right-0 w-[420px] h-[420px] bg-secondary/[0.05] rounded-full blur-[140px]" />
          </div>

          <div className="relative h-full flex flex-col">
            {/* Heading rail */}
            <div className="pt-20 px-10 2xl:px-14 flex items-end justify-between gap-8">
              <div className="max-w-2xl">
                <SectionHeading
                  label="Projects"
                  title="Featured Work"
                  subtitle="Systems I've architected end-to-end — retrieval, distributed workflows, and production ML."
                />
              </div>
              <div className="hidden xl:flex items-center gap-4 text-muted text-xs font-mono uppercase tracking-[0.22em]">
                <span>Scroll</span>
                <motion.span
                  aria-hidden
                  className="inline-block w-10 h-px bg-accent/50 origin-left"
                  style={{ scaleX: progressScale }}
                />
                <span className="text-accent/70">horizontally</span>
              </div>
            </div>

            {/* Horizontal rail viewport */}
            <div
              ref={viewportRef}
              className="flex-1 flex items-center overflow-hidden"
            >
              <motion.div
                ref={railRef}
                style={reduced ? undefined : { x: railX }}
                className="flex gap-8 pl-10 pr-10 2xl:pl-14 2xl:pr-14 will-change-transform"
              >
                {featured.map((project, i) => (
                  <div
                    key={project.id}
                    className="shrink-0 w-[58vw] xl:w-[52vw] 2xl:w-[46vw] max-w-[820px]"
                  >
                    {/* Visible immediately — IntersectionObserver is unreliable
                        for cards that mount off-screen inside a translated rail. */}
                    <ProjectCard
                      project={project}
                      index={i}
                      inRail
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="px-10 2xl:px-14 pb-8">
              <div className="relative h-[2px] bg-foreground/[0.06] rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: progressScale, transformOrigin: "left" }}
                  className="absolute inset-0 bg-gradient-to-r from-accent via-accent-light to-accent"
                />
              </div>
              <div className="mt-3 flex justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-muted">
                <span>01 · {featured[0]?.title}</span>
                <span>
                  {String(featured.length).padStart(2, "0")} ·{" "}
                  {featured[featured.length - 1]?.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile + reduced motion fallback — stacked grid */}
      <div className="lg:hidden py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-panel section-panel-accent rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
            <div className="max-w-3xl">
              <SectionHeading
                label="Projects"
                title="Featured Work"
                subtitle="Systems I've architected end-to-end — retrieval, distributed workflows, and production ML."
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              {featured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Other projects — always vertical */}
      {other.length > 0 && (
        <div className="py-16 md:py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="section-panel rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
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
          </div>
        </div>
      )}
    </section>
  )
}
