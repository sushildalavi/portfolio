"use client"

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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
          {skillGroups.map((group) => {
            const Icon = iconMap[group.icon] || Code2
            return (
              <motion.div
                key={group.title}
                variants={cardVariants}
                className="group p-5 rounded-xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/20 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h3 className="text-sm font-semibold">{group.title}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2.5 py-1.5 rounded-md bg-foreground/[0.04] text-muted-foreground border border-foreground/[0.04] hover:border-accent/20 hover:text-accent transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
