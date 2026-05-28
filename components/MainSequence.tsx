"use client"

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Showcase from "@/components/Showcase"
import FeaturedProjects from "@/components/FeaturedProjects"
import Experience from "@/components/Experience"
import Skills from "@/components/Skills"
import Publications from "@/components/Publications"
import BeyondTheCode from "@/components/BeyondTheCode"
import Contact from "@/components/Contact"

const sections = [
  Hero,
  About,
  Showcase,
  FeaturedProjects,
  Experience,
  Skills,
  Publications,
  BeyondTheCode,
  Contact,
]

export default function MainSequence() {
  const reduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.35,
  })

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const heavyMotion = !reduced && !isMobile

  return (
    <>
      <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-[42vh] w-[2px] -translate-y-1/2 rounded-full bg-foreground/[0.12] lg:block">
        <motion.div
          className="w-full origin-top rounded-full bg-gradient-to-b from-accent via-secondary to-accent-light"
          style={{ scaleY: progress, height: "100%" }}
        />
      </div>
      {heavyMotion && <motion.div
        aria-hidden
        className="pointer-events-none fixed left-[290px] top-24 z-30 hidden h-28 w-28 rounded-full bg-accent/[0.12] blur-3xl lg:block"
        animate={{ y: [0, 22, 0], x: [0, 10, 0], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
      />}
      {heavyMotion && <motion.div
        aria-hidden
        className="pointer-events-none fixed right-20 bottom-20 z-30 hidden h-24 w-24 rounded-full bg-secondary/[0.14] blur-3xl lg:block"
        animate={{ y: [0, -18, 0], x: [0, -8, 0], opacity: [0.35, 0.68, 0.35] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      />}

      <main>
        {sections.map((Comp, i) => (
          <motion.div
            key={i}
            initial={heavyMotion ? { opacity: 0, y: 72, scale: 0.975, filter: "blur(8px)" } : { opacity: 0, y: 24 }}
            whileInView={heavyMotion ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: heavyMotion ? 1.05 : 0.55, ease: [0.22, 1, 0.36, 1], delay: i * (heavyMotion ? 0.04 : 0.015) }}
          >
            {heavyMotion && <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.08 }}
            />}
            <Comp />
          </motion.div>
        ))}
      </main>
    </>
  )
}
