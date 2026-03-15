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
      className="mb-16"
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, x: -20 },
          show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        }}
        className="inline-block text-accent text-sm font-mono tracking-widest uppercase"
      >
        {label}
      </motion.span>

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
        }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 tracking-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.2 },
            },
          }}
          className="text-muted-foreground mt-4 max-w-2xl text-lg"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        variants={{
          hidden: { width: 0, opacity: 0 },
          show: {
            width: 64,
            opacity: 1,
            transition: { duration: 0.8, delay: 0.3, ease: "easeOut" as const },
          },
        }}
        className="h-px bg-gradient-to-r from-accent to-accent-light mt-6"
      />
    </motion.div>
  )
}
