"use client"

import { motion } from "framer-motion"
import { profile } from "@/data/profile"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-foreground/[0.06] py-8 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.p
          className="text-sm text-muted hover:text-foreground transition-colors duration-300 cursor-default"
          whileHover={{ scale: 1.03 }}
        >
          &copy; {new Date().getFullYear()} {profile.name}
        </motion.p>
        <div className="flex items-center gap-2 text-xs text-muted/60">
          {["Next.js", "Three.js", "Framer Motion"].map((tech, i) => (
            <motion.span
              key={tech}
              className="hover:text-accent transition-colors duration-200 cursor-default"
              whileHover={{ scale: 1.15, y: -2 }}
            >
              {tech}
              {i < 2 && <span className="ml-2">&middot;</span>}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
