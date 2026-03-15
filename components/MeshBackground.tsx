"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const PARTICLE_COUNT = 55
const CONNECTION_DIST = 130

export default function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const rafId = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMove)

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      radius: Math.random() * 1.2 + 0.3,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark =
        document.documentElement.getAttribute("data-theme") !== "light"
      const rgb = isDark ? "255,215,0" : "184,134,11"

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Gentle mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const d = Math.hypot(dx, dy)
        if (d < 100 && d > 0) {
          p.vx += (dx / d) * 0.01
          p.vy += (dy / d) * 0.01
        }

        // Speed cap + dampen
        const speed = Math.hypot(p.vx, p.vy)
        if (speed > 0.55) {
          p.vx = (p.vx / speed) * 0.55
          p.vy = (p.vy / speed) * 0.55
        }
        p.vx *= 0.999
        p.vy *= 0.999

        // Bounce edges
        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx = -Math.abs(p.vx) }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy = -Math.abs(p.vy) }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},0.18)`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.055
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${rgb},${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      rafId.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <>
      {/* Canvas particle network */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Floating gradient orbs — aptifolio-style ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Orb 1 — top-left */}
        <div
          className="orb-float absolute rounded-full opacity-[0.28] dark:opacity-[0.18]"
          style={{
            width: 700,
            height: 700,
            left: "-15%",
            top: "-10%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-val) 60%, transparent) 0%, transparent 70%)",
            animationDuration: "22s",
            animationDelay: "0s",
          }}
        />
        {/* Orb 2 — bottom-right */}
        <div
          className="orb-float absolute rounded-full opacity-[0.22] dark:opacity-[0.13]"
          style={{
            width: 600,
            height: 600,
            right: "-12%",
            bottom: "5%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-val) 50%, transparent) 0%, transparent 70%)",
            animationDuration: "28s",
            animationDelay: "-10s",
          }}
        />
        {/* Orb 3 — center-right mid-page */}
        <div
          className="orb-float absolute rounded-full opacity-[0.15] dark:opacity-[0.09]"
          style={{
            width: 500,
            height: 500,
            right: "20%",
            top: "40%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-val) 45%, transparent) 0%, transparent 70%)",
            animationDuration: "34s",
            animationDelay: "-18s",
          }}
        />
      </div>
    </>
  )
}
