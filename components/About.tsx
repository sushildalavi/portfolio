"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, MapPin } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { profile } from "@/data/profile"
import { getTiltTransform } from "@/lib/tilt"
import FloatingParticles from "./FloatingParticles"
import { asset } from "@/lib/assetPath"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function UniLogo({ edu }: { edu: (typeof profile.education)[number] }) {
  return (
    <div
      className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-black/8 shadow-md"
      style={{ backgroundColor: edu.accentColor, border: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(edu.logo)}
        alt={edu.school}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

function EduCard({
  edu,
  index,
}: {
  edu: (typeof profile.education)[number]
  index: number
}) {
  const [tilt, setTilt] = useState("")

  return (
    <div
      className="card-glow group relative overflow-hidden rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] p-4 transition-all duration-300 hover:border-accent/25 hover:shadow-[0_0_26px_var(--accent-glow-val)]"
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
      <div className="relative z-10 flex gap-4">
        <UniLogo edu={edu} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-base font-semibold leading-snug text-foreground/92">
                {edu.degree}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{edu.school}</p>
            </div>
            <span className="rounded-full border border-foreground/[0.08] bg-background/72 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-accent/80">
              {index === 0 ? "Current" : edu.shortName}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={12} className="shrink-0" />
            <span>{edu.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-6 relative">
      <FloatingParticles count={20} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="section-panel rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.08fr)_340px] lg:gap-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="min-w-0"
            >
              <SectionHeading
                label="About"
                title="Who I Am"
                subtitle="AI systems engineer with a product-minded approach to building intelligent infrastructure."
              />

              <div className="space-y-6">
                <motion.p
                  variants={itemVariants}
                  className="max-w-3xl text-[1.08rem] leading-8 text-foreground/88"
                >
                  {profile.about.paragraphs[0]}
                </motion.p>

                <div className="grid gap-4 md:grid-cols-2">
                  {profile.about.paragraphs.slice(1).map((paragraph, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="rounded-2xl border border-foreground/[0.06] bg-background/52 p-5"
                    >
                      <p className="text-sm leading-7 text-muted-foreground">
                        {paragraph}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5 lg:pt-22"
            >
              <div className="rounded-[1.6rem] border border-foreground/[0.08] bg-background/58 p-5 md:p-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-accent/80">
                  Focus Areas
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {profile.about.focus.map((area) => (
                    <motion.span
                      key={area}
                      className="inline-flex rounded-full border border-accent/12 bg-accent/[0.05] px-3 py-1.5 text-xs text-accent transition-all duration-200 hover:border-accent/28 hover:bg-accent/10"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {area}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-foreground/[0.08] bg-background/58 p-5 md:p-6">
                <div className="flex items-center gap-2 text-accent">
                  <GraduationCap size={16} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em]">
                    Education
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Formal training in computer science, from core engineering fundamentals to advanced systems and research-oriented work.
                </p>

                <div className="mt-5 space-y-4">
                  {profile.education.map((edu, index) => (
                    <EduCard key={edu.degree} edu={edu} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
