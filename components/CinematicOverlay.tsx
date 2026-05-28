"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

const dots = [
  { x: "8%", y: "14%", d: 4.8, s: 1.2 },
  { x: "18%", y: "78%", d: 6.2, s: 1.4 },
  { x: "32%", y: "42%", d: 5.6, s: 1.1 },
  { x: "47%", y: "24%", d: 7.4, s: 1.5 },
  { x: "61%", y: "64%", d: 5.3, s: 1.2 },
  { x: "74%", y: "18%", d: 6.6, s: 1.35 },
  { x: "86%", y: "52%", d: 5.9, s: 1.1 },
  { x: "92%", y: "84%", d: 7.8, s: 1.6 },
]

export default function CinematicOverlay() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1024px)").matches
    if (mobile || reduced) {
      setEnabled(false)
      return
    }
    setEnabled(true)
  }, [reduced])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-24 left-[-18%] h-[34vh] w-[58vw] rotate-[-8deg] bg-gradient-to-r from-transparent via-accent/[0.12] to-transparent blur-3xl"
        animate={{ x: ["-8%", "22%", "-8%"], opacity: [0.18, 0.42, 0.18] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-18%] right-[-18%] h-[36vh] w-[54vw] rotate-[12deg] bg-gradient-to-l from-transparent via-secondary/[0.1] to-transparent blur-3xl"
        animate={{ x: ["10%", "-16%", "10%"], y: ["4%", "-10%", "4%"], opacity: [0.14, 0.35, 0.14] }}
        transition={{ duration: 12.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {dots.map((dot, i) => (
        <motion.span
          key={i}
          className="absolute block h-1 w-1 rounded-full bg-accent/70"
          style={{ left: dot.x, top: dot.y }}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [dot.s, dot.s * 1.55, dot.s],
            y: [0, -8, 0],
          }}
          transition={{ duration: dot.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.28 }}
        />
      ))}

      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent"
        animate={{ y: [0, 560, 0], opacity: [0.22, 0.52, 0.22] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}
