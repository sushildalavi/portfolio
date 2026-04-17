"use client"

import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import { skillGroups } from "@/data/skills"
import { getTechIcon } from "@/lib/techIcons"

function SkillChip({ skill }: { skill: string }) {
  const tech = getTechIcon(skill)
  return (
    <span className="group/chip inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-md bg-foreground/[0.03] text-muted-foreground border border-foreground/[0.06] hover:border-foreground/[0.16] hover:text-foreground/90 transition-colors">
      {tech && (
        <tech.icon size={12} style={{ color: tech.color }} className="shrink-0" />
      )}
      {skill}
    </span>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 px-6">
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-secondary/[0.04] blur-[130px]" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Toolchain"
          title="What I build with"
          subtitle="Stacks and tools I reach for when shipping production systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-4">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid grid-cols-[140px_1fr] gap-6 items-start pb-8 border-b border-foreground/[0.05] last:border-b-0 md:last:border-b md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-accent/80">
                  0{i + 1}
                </p>
                <p className="mt-2 text-[15px] font-semibold text-foreground/92 tracking-tight leading-snug">
                  {group.title}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {group.skills.map((skill) => (
                  <SkillChip key={skill} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
