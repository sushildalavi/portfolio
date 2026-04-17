"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  label: string
  title: string
  subtitle?: string
}

export default function SectionHeading({
  label,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-10"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -12 },
          show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        }}
        className="flex items-center gap-3 text-accent text-[11px] font-mono tracking-[0.28em] uppercase"
      >
        <span className="h-px w-8 bg-accent/60" />
        {label}
      </motion.div>

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 } },
        }}
        className="text-4xl md:text-5xl lg:text-[56px] font-bold mt-5 tracking-[-0.025em] leading-[1.02]"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.18 },
            },
          }}
          className="text-muted-foreground mt-5 max-w-2xl text-[17px] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
