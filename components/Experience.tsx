"use client"

import { motion } from "framer-motion"
import { MapPin, ChevronRight } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { experiences } from "@/data/experience"

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 relative">
      <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          label="Experience"
          title="Where I've Worked"
          subtitle="Building production AI systems across research and industry."
        />

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative md:pl-12"
              >
                <div className="hidden md:block absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-accent/40 bg-background z-10">
                  <div className="absolute inset-1 rounded-full bg-accent/60" />
                </div>

                <div className="group relative p-6 md:p-8 rounded-2xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/20 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{exp.company}</h3>
                        <p className="text-accent text-sm font-medium mt-0.5">
                          {exp.role}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1">
                        <span className="text-sm text-muted font-mono">
                          {exp.period}
                        </span>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="text-muted" />
                          <span className="text-xs text-muted">
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-2.5">
                      {exp.achievements.map((achievement, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm"
                        >
                          <ChevronRight
                            size={14}
                            className="text-accent/40 mt-0.5 shrink-0"
                          />
                          <span className="text-muted-foreground">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-6">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] px-2 py-1 rounded-md bg-foreground/[0.04] text-muted-foreground border border-foreground/[0.04]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
