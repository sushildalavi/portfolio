"use client"

import { ReactNode, useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion"

/**
 * Aceternity-style container scroll — tilts the child container into
 * 3D perspective on scroll, flattening as it enters the viewport.
 * Used to showcase a framed mockup of the site / project work.
 */
export default function ContainerScroll({
  titleEyebrow,
  title,
  subtitle,
  children,
}: {
  titleEyebrow?: string
  title: ReactNode
  subtitle?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.4, 1], [22, 0, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.92, 1.02, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.4, 1], [0, -20, -60])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25, 0.6], [0, 1, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.25], [30, 0])

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 px-6"
      style={{ perspective: 1400 } as React.CSSProperties}
    >
      <div className="relative mx-auto max-w-6xl">
        <Header
          eyebrow={titleEyebrow}
          title={title}
          subtitle={subtitle}
          opacity={headerOpacity}
          translateY={headerY}
          reduced={reduced ?? false}
        />

        <motion.div
          style={
            reduced
              ? undefined
              : {
                  rotateX,
                  scale,
                  y: translateY,
                  transformStyle: "preserve-3d",
                }
          }
          className="mt-10 md:mt-14 relative rounded-[28px] border border-foreground/[0.08] bg-background/50 backdrop-blur-xl shadow-[0_30px_120px_-30px_var(--accent-glow-val)] overflow-hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-secondary/[0.04]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          />
          <div className="relative p-6 md:p-10">{children}</div>
        </motion.div>
      </div>
    </section>
  )
}

function Header({
  eyebrow,
  title,
  subtitle,
  opacity,
  translateY,
  reduced,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  opacity: MotionValue<number>
  translateY: MotionValue<number>
  reduced: boolean
}) {
  return (
    <motion.div
      style={reduced ? undefined : { opacity, y: translateY }}
      className="mx-auto max-w-2xl text-center"
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-accent/90">
          <span className="h-px w-8 bg-accent/60" />
          {eyebrow}
          <span className="h-px w-8 bg-accent/60" />
        </div>
      )}
      <h2 className="mt-5 text-4xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] leading-[1.02]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
