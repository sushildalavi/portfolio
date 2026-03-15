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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <span className="text-accent text-sm font-mono tracking-widest uppercase">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
          {subtitle}
        </p>
      )}
      <div className="h-px w-16 bg-gradient-to-r from-accent to-accent-light mt-6" />
    </motion.div>
  )
}
