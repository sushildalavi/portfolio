"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, MapPin } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { profile } from "@/data/profile"
import { getTiltTransform } from "@/lib/tilt"
import FloatingParticles from "./FloatingParticles"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function EduCard({ edu }: { edu: (typeof profile.education)[number] }) {
  const [tilt, setTilt] = useState("")

  return (
    <div
      className="group p-4 rounded-xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/25 hover:shadow-[0_0_30px_rgba(255,215,0,0.04)] transition-all duration-300"
      onMouseMove={(e) => setTilt(getTiltTransform(e))}
      onMouseLeave={() => setTilt("")}
      style={{ transform: tilt, transition: "transform 0.15s ease-out" }}
    >
      <div className="flex items-start gap-3">
        <motion.div
          className="shrink-0 mt-0.5"
          whileHover={{ rotate: 15, scale: 1.2 }}
        >
          <GraduationCap size={18} className="text-accent/60" />
        </motion.div>
        <div>
          <p className="text-sm font-medium">{edu.degree}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{edu.school}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={10} className="text-muted" />
            <p className="text-xs text-muted">{edu.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 relative">
      <FloatingParticles count={25} />
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
                  <motion.span
                    key={area}
                    className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/10 hover:bg-accent/20 hover:border-accent/30 hover:shadow-[0_0_12px_rgba(255,215,0,0.1)] transition-all duration-200 cursor-default inline-block"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-mono text-accent tracking-wider uppercase mb-4">
                Education
              </h3>
              <div className="space-y-4">
                {profile.education.map((edu) => (
                  <EduCard key={edu.degree} edu={edu} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
