"use client"

import { motion } from "framer-motion"
import { GraduationCap, MapPin } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { profile } from "@/data/profile"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          label="About"
          title="Who I Am"
          subtitle="AI systems engineer with a product-minded approach to building intelligent infrastructure."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3 space-y-5"
          >
            {profile.about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={itemVariants}
                className="text-muted-foreground leading-relaxed text-[15px]"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-mono text-accent tracking-wider uppercase mb-4">
                Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.about.focus.map((area) => (
                  <span
                    key={area}
                    className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/10"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-mono text-accent tracking-wider uppercase mb-4">
                Education
              </h3>
              <div className="space-y-4">
                {profile.education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="group p-4 rounded-xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/20 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <GraduationCap
                        size={18}
                        className="text-accent/60 mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-sm font-medium">{edu.degree}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {edu.school}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin size={10} className="text-muted" />
                          <p className="text-xs text-muted">{edu.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
