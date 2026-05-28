"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const ROLES = [
  "Software Developer",
  "Software Engineer",
  "Machine Learning Engineer",
  "AI Engineer",
]

export default function RotatingRole({
  className = "",
  intervalMs = 1800,
}: {
  className?: string
  intervalMs?: number
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="inline-block"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

