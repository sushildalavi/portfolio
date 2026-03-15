"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, ChevronRight } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { experiences } from "@/data/experience"
import { getTiltTransform } from "@/lib/tilt"
import { getTechIcon } from "@/lib/techIcons"
import { asset } from "@/lib/assetPath"

const ORG_LOGOS: Record<string, { logo: string; bg: string; pad?: boolean }> = {
  "USC Annenberg Norman Lear Center": {
    logo: "/logos/usc-annenberg.jpeg",
    bg: "#ffffff",
    pad: false,
  },
  "Reliance Jio Platforms": {
    logo: "/logos/jio.png",
    bg: "#0a2885",
    pad: false,
  },
}

function OrgLogo({ company }: { company: string }) {
  const config = ORG_LOGOS[company]
  if (!config) return null

  return (
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-md ${config.pad ? "p-1.5" : ""}`}
      style={{ backgroundColor: config.bg, border: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(config.logo)}
        alt={company}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

function TechTag({ tech }: { tech: string }) {
  const entry = getTechIcon(tech)

  return (
    <motion.span
      className="inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-md bg-foreground/[0.04] text-muted-foreground border border-foreground/[0.04] hover:border-accent/25 hover:text-accent hover:bg-accent/5 transition-all duration-200 cursor-default"
      whileHover={{ scale: 1.1, y: -2 }}
    >
      {entry && (
        <entry.icon
          size={12}
          style={{ color: entry.color }}
          className="shrink-0"
        />
      )}
      {tech}
    </motion.span>
  )
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number]
  index: number
}) {
  const [tilt, setTilt] = useState("")

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative md:pl-12"
    >
      <div className="hidden md:block absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-accent/40 bg-background z-10">
        <div className="absolute inset-1 rounded-full bg-accent/60" />
        <div
          className="absolute inset-0 rounded-full border-2 border-accent/30"
          style={{ animation: "pulse-ring 2s ease-out infinite" }}
        />
      </div>

      <div
        className="card-glow group relative p-6 md:p-8 rounded-2xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/25 hover:shadow-[0_0_40px_var(--accent-glow-val)] transition-all duration-500 overflow-hidden"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width) * 100}%`)
          e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - r.top) / r.height) * 100}%`)
          setTilt(getTiltTransform(e))
        }}
        onMouseLeave={() => setTilt("")}
        style={{ transform: tilt, transition: "transform 0.15s ease-out" }}
      >
        <div className="card-spotlight" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div className="flex items-start gap-3">
              <OrgLogo company={exp.company} />
              <div>
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors duration-300">
                  {exp.company}
                </h3>
                <p className="text-accent text-sm font-medium mt-0.5">
                  {exp.role}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-1">
              <span className="text-sm text-muted font-mono">{exp.period}</span>
              <div className="flex items-center gap-1">
                <MapPin size={12} className="text-muted" />
                <span className="text-xs text-muted">{exp.location}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {exp.description}
          </p>

          <ul className="space-y-2.5">
            {exp.achievements.map((achievement, j) => (
              <motion.li
                key={j}
                className="flex items-start gap-2 text-sm"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + j * 0.06 }}
              >
                <ChevronRight
                  size={14}
                  className="text-accent/40 mt-0.5 shrink-0"
                />
                <span className="text-muted-foreground">{achievement}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mt-6">
            {exp.technologies.map((tech) => (
              <TechTag key={tech} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 px-6 relative">
      <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          label="Experience"
          title="Where I've Worked"
          subtitle="Building production AI systems across research and industry."
        />

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
