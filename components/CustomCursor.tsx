"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const cx = useMotionValue(-100)
  const cy = useMotionValue(-100)

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const rx = useSpring(cx, springConfig)
  const ry = useSpring(cy, springConfig)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return

    const move = (e: MouseEvent) => {
      cx.set(e.clientX)
      cy.set(e.clientY)
    }

    const over = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).closest(
          "a, button, [data-hover], input, textarea, select"
        )
      )
        setHovering(true)
    }
    const out = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).closest(
          "a, button, [data-hover], input, textarea, select"
        )
      )
        setHovering(false)
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseover", over)
    document.addEventListener("mouseout", out)
    document.addEventListener("mousedown", down)
    document.addEventListener("mouseup", up)
    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseover", over)
      document.removeEventListener("mouseout", out)
      document.removeEventListener("mousedown", down)
      document.removeEventListener("mouseup", up)
    }
  }, [cx, cy])

  return (
    <>
      {/* Dot — follows instantly */}
      <motion.div
        className="fixed top-0 left-0 w-[8px] h-[8px] rounded-full pointer-events-none z-[9999]"
        style={{
          x: cx,
          y: cy,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--accent-val)",
        }}
        animate={{
          scale: clicking ? 0.5 : hovering ? 1.6 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      />
      {/* Ring — trails with spring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border-2"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--accent-val)",
        }}
        animate={{
          width: clicking ? 18 : hovering ? 60 : 36,
          height: clicking ? 18 : hovering ? 60 : 36,
          opacity: clicking ? 0.6 : hovering ? 0.45 : 0.2,
        }}
        transition={{ type: "spring", damping: 18, stiffness: 280 }}
      />
      {/* Glow ring — on hover */}
      {hovering && (
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
          style={{
            x: rx,
            y: ry,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, var(--accent-glow-val) 0%, transparent 70%)",
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: 120, height: 120, opacity: 1 }}
          exit={{ width: 0, height: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        />
      )}
    </>
  )
}
