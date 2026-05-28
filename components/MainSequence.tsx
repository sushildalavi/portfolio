"use client"

import { motion, useScroll, useSpring } from "framer-motion"
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
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.35,
  })

  return (
    <>
      <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-[42vh] w-[2px] -translate-y-1/2 rounded-full bg-foreground/[0.12] lg:block">
        <motion.div
          className="w-full origin-top rounded-full bg-gradient-to-b from-accent via-secondary to-accent-light"
          style={{ scaleY: progress, height: "100%" }}
        />
      </div>

      <main>
        {sections.map((Comp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 48, scale: 0.988 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.03 }}
          >
            <Comp />
          </motion.div>
        ))}
      </main>
    </>
  )
}
