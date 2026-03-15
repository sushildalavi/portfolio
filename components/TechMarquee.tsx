"use client"

import { motion } from "framer-motion"
import { marqueeTechs } from "@/lib/techIcons"

function MarqueeRow({
  direction = "left",
  speed = 35,
}: {
  direction?: "left" | "right"
  speed?: number
}) {
  const items = [...marqueeTechs, ...marqueeTechs]

  return (
    <div className="group/row relative flex overflow-hidden py-4">
      <div
        className="flex shrink-0 gap-10 items-center group-hover/row:[animation-play-state:paused]"
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite`,
        }}
      >
        {items.map((tech, i) => (
          <motion.div
            key={`${tech.name}-${i}`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-foreground/[0.04] hover:border-accent/25 hover:bg-accent/5 transition-all duration-300 cursor-default shrink-0"
            whileHover={{ scale: 1.12, y: -4 }}
          >
            <tech.icon
              size={20}
              style={{ color: tech.color }}
              className="shrink-0"
            />
            <span className="text-sm text-muted-foreground whitespace-nowrap transition-colors">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>

      <div
        className="flex shrink-0 gap-10 items-center group-hover/row:[animation-play-state:paused]"
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite`,
        }}
      >
        {items.map((tech, i) => (
          <motion.div
            key={`${tech.name}-dup-${i}`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-foreground/[0.04] hover:border-accent/25 hover:bg-accent/5 transition-all duration-300 cursor-default shrink-0"
            whileHover={{ scale: 1.12, y: -4 }}
          >
            <tech.icon
              size={20}
              style={{ color: tech.color }}
              className="shrink-0"
            />
            <span className="text-sm text-muted-foreground whitespace-nowrap transition-colors">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function TechMarquee() {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <span className="text-xs font-mono text-muted tracking-widest uppercase">
          Technologies I Work With
        </span>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <MarqueeRow direction="left" speed={40} />
        <MarqueeRow direction="right" speed={35} />
      </div>
    </section>
  )
}
