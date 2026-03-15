"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Brain,
  Search,
  Server,
  Cloud,
  BarChart3,
  Code2,
  type LucideIcon,
} from "lucide-react"
import SectionHeading from "./SectionHeading"
import { skillGroups } from "@/data/skills"
import { getTiltTransform } from "@/lib/tilt"
import { getTechIcon } from "@/lib/techIcons"

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Search,
  Server,
  Cloud,
  BarChart3,
  Code2,
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
}

function SkillTag({ skill }: { skill: string }) {
  const tech = getTechIcon(skill)

  return (
    <motion.span
      className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md bg-foreground/[0.04] text-muted-foreground border border-foreground/[0.04] hover:border-accent/25 hover:text-accent hover:bg-accent/5 transition-all duration-200 cursor-default"
      whileHover={{ scale: 1.12, y: -2 }}
    >
      {tech && (
        <tech.icon size={13} style={{ color: tech.color }} className="shrink-0" />
      )}
      {skill}
    </motion.span>
  )
}

function SkillCard({ group }: { group: (typeof skillGroups)[number] }) {
  const Icon = iconMap[group.icon] || Code2
  const [tilt, setTilt] = useState("")

  return (
    <motion.div variants={cardVariants}>
      <div
        className="group p-5 rounded-xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/25 hover:shadow-[0_0_30px_rgba(255,215,0,0.04)] transition-all duration-500 h-full"
        onMouseMove={(e) => setTilt(getTiltTransform(e, 8))}
        onMouseLeave={() => setTilt("")}
        style={{ transform: tilt, transition: "transform 0.15s ease-out" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon size={18} className="text-accent" />
          </motion.div>
          <h3 className="text-sm font-semibold group-hover:text-accent transition-colors duration-300">
            {group.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {group.skills.map((skill) => (
            <SkillTag key={skill} skill={skill} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 relative">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/[0.04] rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          label="Skills"
          title="Technical Toolbox"
          subtitle="The technologies and frameworks I work with to build intelligent systems."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
