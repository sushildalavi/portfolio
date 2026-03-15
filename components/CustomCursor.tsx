"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type CursorState = "default" | "link" | "card" | "clicking"

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default")
  const cx = useMotionValue(-200)
  const cy = useMotionValue(-200)

  const rx = useSpring(cx, { damping: 22, stiffness: 380, mass: 0.45 })
  const ry = useSpring(cy, { damping: 22, stiffness: 380, mass: 0.45 })

  const stateRef = useRef<CursorState>("default")
  stateRef.current = state

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return

    const move = (e: MouseEvent) => {
      cx.set(e.clientX)
      cy.set(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest("a, button, [data-hover]")) setState("link")
      else if (t.closest(".card-glow")) setState("card")
    }

    const out = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest("a, button, [data-hover], .card-glow")) setState("default")
    }

    const down = () => setState("clicking")
    const up = () =>
      setState(stateRef.current === "clicking" ? "default" : stateRef.current)

    window.addEventListener("mousemove", move, { passive: true })
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

  const isLink = state === "link"
  const isCard = state === "card"
  const isClicking = state === "clicking"

  return (
    <>
      {/* Dot — follows instantly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cx,
          y: cy,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--accent-val)",
        }}
        animate={{
          width: isClicking ? 3 : isLink ? 5 : 4,
          height: isClicking ? 3 : isLink ? 5 : 4,
          opacity: isClicking ? 0.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 800, mass: 0.2 }}
      />

      {/* Ring — spring trailing */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--accent-val)",
          borderStyle: "solid",
        }}
        animate={{
          width: isClicking ? 18 : isLink ? 46 : isCard ? 36 : 28,
          height: isClicking ? 18 : isLink ? 46 : isCard ? 36 : 28,
          borderWidth: isLink ? 1.5 : 1,
          opacity: isClicking ? 0.9 : isLink ? 0.9 : isCard ? 0.55 : 0.38,
          backgroundColor: isLink
            ? "color-mix(in srgb, var(--accent-val) 10%, transparent)"
            : "transparent",
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      />
    </>
  )
}
