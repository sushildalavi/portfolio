"use client"

import { motion } from "framer-motion"
import { MapPin, ArrowUpRight } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { experiences } from "@/data/experience"
import { getTechIcon } from "@/lib/techIcons"
import { asset } from "@/lib/assetPath"

const ORG_LOGOS: Record<string, { logo: string; bg: string }> = {
  "USC Annenberg Norman Lear Center": {
    logo: "/logos/usc-annenberg.jpeg",
    bg: "#ffffff",
  },
  "Reliance Jio Platforms": {
    logo: "/logos/jio.png",
    bg: "#0a2885",
  },
}

function OrgLogo({ company }: { company: string }) {
  const config = ORG_LOGOS[company]
  if (!config) return null
  return (
    <div
      className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-foreground/[0.08] shadow-sm"
      style={{ backgroundColor: config.bg }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(config.logo)} alt={company} className="h-full w-full object-cover" />
    </div>
  )
}

function TechTag({ tech }: { tech: string }) {
  const entry = getTechIcon(tech)
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-md bg-foreground/[0.04] text-muted-foreground border border-foreground/[0.06] hover:border-foreground/[0.14] transition-colors">
      {entry && (
        <entry.icon size={11} style={{ color: entry.color }} className="shrink-0" />
      )}
      {tech}
    </span>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 px-6">
      <div className="pointer-events-none absolute top-1/4 left-0 h-[380px] w-[380px] rounded-full bg-accent/[0.03] blur-[140px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-14 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <SectionHeading
              label="Experience"
              title="Where I've built"
              subtitle="Shipping production ML and data systems — from research labs to telecom platforms."
            />
          </div>
        </div>

        <div className="relative">
          {/* Timeline axis */}
          <div className="absolute left-0 md:left-[148px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/35 via-foreground/[0.08] to-transparent" />

          <div className="space-y-16 md:space-y-20">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative grid grid-cols-[24px_1fr] md:grid-cols-[148px_1fr] gap-6 md:gap-10"
              >
                {/* Left column — date */}
                <div className="relative">
                  <div className="absolute left-0 md:left-auto md:right-0 top-2 flex items-center gap-3 md:flex-col md:items-end md:gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  </div>
                  <div className="hidden md:block pr-8 text-right pt-1">
                    <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/90">
                      {exp.period.split("—")[0]?.trim()}
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted mt-0.5">
                      {exp.period.split("—")[1]?.trim() || "Present"}
                    </div>
                  </div>
                </div>

                {/* Right column — content */}
                <div className="pt-1">
                  <div className="md:hidden mb-3 text-[11px] font-mono uppercase tracking-[0.22em] text-accent/80">
                    {exp.period}
                  </div>

                  <div className="flex items-start gap-4">
                    <OrgLogo company={exp.company} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground/95 tracking-tight">
                          {exp.role}
                        </h3>
                        <span className="text-muted">·</span>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="group/link inline-flex items-center gap-1 text-base md:text-lg font-medium text-accent/90 hover:text-accent transition-colors"
                        >
                          {exp.company}
                          <ArrowUpRight
                            size={13}
                            className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all"
                          />
                        </a>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                        <MapPin size={11} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground max-w-[65ch]">
                    {exp.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {exp.achievements.map((a, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.18 + j * 0.05 }}
                        className="flex items-start gap-3 text-[14px] text-muted-foreground leading-relaxed"
                      >
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/55" />
                        <span>{a}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <TechTag key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
