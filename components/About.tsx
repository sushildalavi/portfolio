"use client"

import { motion } from "framer-motion"
import { GraduationCap, MapPin } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { profile } from "@/data/profile"
import { asset } from "@/lib/assetPath"

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06 },
  }),
}

function EduRow({
  edu,
  index,
}: {
  edu: (typeof profile.education)[number]
  index: number
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      className="group grid grid-cols-[40px_1fr_auto] items-center gap-4 py-4 border-b border-foreground/[0.06] last:border-b-0"
    >
      <div
        className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-foreground/[0.08]"
        style={{ backgroundColor: edu.accentColor }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(edu.logo)} alt={edu.school} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-foreground/90 leading-tight">
          {edu.degree}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">{edu.school}</p>
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted">
          <MapPin size={11} />
          {edu.location}
        </div>
      </div>
      <div className="text-right">
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/90">
          {edu.period.split("—")[0]?.trim()}
        </div>
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted mt-0.5">
          {edu.period.split("—")[1]?.trim()}
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      <div className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-accent/[0.035] blur-[140px]" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionHeading
            label="About"
            title="A short bio"
            subtitle="Architect-minded AI engineer. Measurable outcomes over ceremony."
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-14 lg:gap-20 mt-2">
            {/* Left — prose */}
            <div className="space-y-6">
              {profile.about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className={`leading-[1.75] ${
                    i === 0
                      ? "text-[19px] md:text-[20px] text-foreground/90 tracking-[-0.01em]"
                      : "text-[15px] text-muted-foreground"
                  }`}
                >
                  {p}
                </motion.p>
              ))}

              {/* Focus tags */}
              <motion.div custom={profile.about.paragraphs.length} variants={fadeUp} className="pt-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted mb-4">
                  Focus
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.about.focus.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center rounded-md border border-foreground/[0.08] bg-foreground/[0.02] px-2.5 py-1 text-[12px] text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — education card */}
            <motion.div
              custom={2}
              variants={fadeUp}
              className="relative rounded-2xl border border-foreground/[0.08] bg-background/50 backdrop-blur-xl p-6 md:p-7 h-fit lg:sticky lg:top-24"
            >
              <div className="flex items-center gap-2 text-accent">
                <GraduationCap size={15} />
                <span className="text-[11px] font-mono uppercase tracking-[0.28em]">
                  Education
                </span>
              </div>

              <div className="mt-5">
                {profile.education.map((edu, i) => (
                  <EduRow key={edu.degree} edu={edu} index={i} />
                ))}
              </div>

              {profile.education[0]?.coursework && (
                <div className="mt-6 pt-5 border-t border-foreground/[0.06]">
                  <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted mb-3">
                    Relevant Coursework
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.education[0].coursework.map((c) => (
                      <span
                        key={c}
                        className="text-[11px] px-2 py-1 rounded-md bg-foreground/[0.04] text-muted-foreground border border-foreground/[0.04]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
