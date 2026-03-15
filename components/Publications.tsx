"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, FileText, ExternalLink } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { publications } from "@/data/publications"
import { getTiltTransform } from "@/lib/tilt"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
}

function PubCard({ pub }: { pub: (typeof publications)[number] }) {
  const [tilt, setTilt] = useState("")

  return (
    <motion.article
      variants={itemVariants}
      className="card-glow group p-5 md:p-6 rounded-xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/25 hover:shadow-[0_0_30px_var(--accent-glow-val)] transition-all duration-500"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width) * 100}%`)
        e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - r.top) / r.height) * 100}%`)
        setTilt(getTiltTransform(e as never))
      }}
      onMouseLeave={() => setTilt("")}
      style={{ transform: tilt, transition: "transform 0.15s ease-out" }}
    >
      <div className="card-spotlight" />
      <div className="flex items-start gap-4">
        <motion.div
          className="p-2 rounded-lg bg-accent/10 shrink-0 mt-0.5"
          whileHover={{ rotate: 15, scale: 1.15 }}
        >
          {pub.type === "patent" ? (
            <Award size={18} className="text-accent" />
          ) : (
            <FileText size={18} className="text-accent" />
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <motion.span
              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/10 text-accent/80 hover:bg-accent/20 transition-all duration-200 cursor-default"
              whileHover={{ scale: 1.08 }}
            >
              {pub.type === "patent" ? "Intellectual Property" : pub.venue}
            </motion.span>
            <span className="text-xs text-muted">{pub.year}</span>
          </div>

          <h3 className="text-sm md:text-base font-semibold leading-snug group-hover:text-accent transition-colors duration-300">
            {pub.title}
          </h3>

          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {pub.description}
          </p>

          {pub.link && (
            <motion.a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent/60 hover:text-accent mt-3 transition-colors"
              whileHover={{ x: 4 }}
            >
              <ExternalLink size={12} />
              View Publication
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
              >
                →
              </motion.span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Publications() {
  return (
    <section id="publications" className="py-16 md:py-24 px-6 relative">
      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          label="Publications & IP"
          title="Research Output"
          subtitle="Published research and registered intellectual property in AI and NLP."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-4"
        >
          {publications.map((pub) => (
            <PubCard key={pub.id} pub={pub} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
