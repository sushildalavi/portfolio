"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { GraduationCap, MapPin } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { profile } from "@/data/profile"
import { getTiltTransform } from "@/lib/tilt"
import FloatingParticles from "./FloatingParticles"
import { asset } from "@/lib/assetPath"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

const wordContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.024, delayChildren: 0.08 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.44, ease: "easeOut" as const },
  },
}

function LeadParagraph({
  text,
  reducedMotion,
}: {
  text: string
  reducedMotion: boolean
}) {
  if (reducedMotion) {
    return (
      <motion.p
        variants={itemVariants}
        className="max-w-3xl text-[1.08rem] leading-8 text-foreground/88"
      >
        {text}
      </motion.p>
    )
  }

  return (
    <motion.p
      variants={wordContainer}
      className="max-w-3xl text-[1.08rem] leading-8 text-foreground/88"
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className="mr-[0.34em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

function UniLogo({
  edu,
  index,
  reducedMotion,
}: {
  edu: (typeof profile.education)[number]
  index: number
  reducedMotion: boolean
}) {
  return (
    <motion.div
      className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-black/8 shadow-md"
      style={{ backgroundColor: edu.accentColor, border: "1px solid rgba(0,0,0,0.08)" }}
      animate={
        reducedMotion
          ? undefined
          : { y: [0, index === 0 ? -4 : -2, 0], rotate: [0, index === 0 ? 2 : -1.5, 0] }
      }
      transition={{
        duration: index === 0 ? 4.8 : 5.6,
        delay: index * 0.25,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(edu.logo)}
        alt={edu.school}
        className="w-full h-full object-cover"
      />
      {index === 0 && !reducedMotion && (
        <motion.span
          className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-background bg-accent"
          animate={{ scale: [1, 1.45, 1], opacity: [0.95, 0.45, 0.95] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  )
}

function EduCard({
  edu,
  index,
  reducedMotion,
}: {
  edu: (typeof profile.education)[number]
  index: number
  reducedMotion: boolean
}) {
  const [tilt, setTilt] = useState("")

  return (
    <motion.div
      initial={{ opacity: 0, x: 24, y: 18, rotate: index === 0 ? -1.5 : 1.5 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: 0.12 + index * 0.12 }}
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
      <motion.div
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent"
        animate={reducedMotion ? undefined : { x: ["-22%", "22%", "-22%"], opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 4.4 + index * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="relative z-10 flex gap-4">
        <UniLogo edu={edu} index={index} reducedMotion={reducedMotion} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-base font-semibold leading-snug text-foreground/92">
                {edu.degree}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{edu.school}</p>
            </div>
            <motion.span
              className="rounded-full border border-foreground/[0.08] bg-background/72 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-accent/80"
              animate={reducedMotion ? undefined : { y: [0, -2, 0] }}
              transition={{
                duration: 2.6 + index * 0.35,
                delay: index * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {index === 0 ? "Current" : edu.shortName}
            </motion.span>
          </div>

          <motion.div
            className="mt-3 flex items-center gap-1.5 text-sm text-muted"
            animate={reducedMotion ? undefined : { x: [0, 2, 0] }}
            transition={{
              duration: 3.4 + index * 0.25,
              delay: 0.25 + index * 0.12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <MapPin size={12} className="shrink-0" />
            <span>{edu.location}</span>
          </motion.div>

          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted/80">
            {edu.period}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  const reducedMotion = Boolean(useReducedMotion())

  return (
    <section id="about" className="py-16 md:py-24 px-6 relative">
      <FloatingParticles count={20} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[128px] pointer-events-none" />
      <motion.div
        className="pointer-events-none absolute left-[-2rem] top-24 h-36 w-36 rounded-full bg-accent/[0.08] blur-[72px]"
        animate={
          reducedMotion
            ? undefined
            : { x: [0, 28, -10, 0], y: [0, -20, 16, 0], scale: [1, 1.08, 0.95, 1] }
        }
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-10 top-40 h-44 w-44 rounded-full bg-secondary/[0.08] blur-[88px]"
        animate={
          reducedMotion
            ? undefined
            : { x: [0, -24, 18, 0], y: [0, 20, -12, 0], scale: [1, 0.94, 1.06, 1] }
        }
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/3 top-[28rem] h-28 w-28 rounded-full bg-accent/[0.06] blur-[70px]"
        animate={
          reducedMotion
            ? undefined
            : { x: [0, 22, -14, 0], y: [0, 14, -18, 0], scale: [1, 1.12, 0.92, 1] }
        }
        transition={{ duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="section-panel overflow-hidden rounded-[2rem] px-6 py-8 md:px-10 md:py-10"
        >
          <motion.div
            className="pointer-events-none absolute left-12 right-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent"
            animate={reducedMotion ? undefined : { x: ["-12%", "12%", "-12%"], opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 5.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
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
                <LeadParagraph text={profile.about.paragraphs[0]} reducedMotion={reducedMotion} />

                <div className="grid gap-4 md:grid-cols-2">
                  {profile.about.paragraphs.slice(1).map((paragraph, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="group relative overflow-hidden rounded-2xl border border-foreground/[0.06] bg-background/52 p-5"
                      whileHover={{ y: -6, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
                        animate={
                          reducedMotion
                            ? undefined
                            : { x: ["-18%", "18%", "-18%"], opacity: [0.25, 0.8, 0.25] }
                        }
                        transition={{
                          duration: 4.2 + i * 0.5,
                          delay: i * 0.25,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
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
              <motion.div
                initial={{ opacity: 0, x: 26, rotate: 1.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="relative overflow-hidden rounded-[1.6rem] border border-foreground/[0.08] bg-background/58 p-5 md:p-6"
              >
                <motion.div
                  className="pointer-events-none absolute right-[-10%] top-[-10%] h-24 w-24 rounded-full bg-accent/[0.08] blur-3xl"
                  animate={reducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.3, 0.65, 0.3] }}
                  transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.p
                  className="text-[10px] font-mono uppercase tracking-[0.24em] text-accent/80"
                  animate={reducedMotion ? undefined : { letterSpacing: ["0.24em", "0.3em", "0.24em"] }}
                  transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  Focus Areas
                </motion.p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {profile.about.focus.map((area, index) => (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, scale: 0.82, y: 16 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.35, delay: 0.22 + index * 0.06 }}
                    >
                      <motion.span
                        className="inline-flex rounded-full border border-accent/12 bg-accent/[0.05] px-3 py-1.5 text-xs text-accent transition-all duration-200 hover:border-accent/28 hover:bg-accent/10"
                        animate={reducedMotion ? undefined : { y: [0, -3, 0], scale: [1, 1.02, 1] }}
                        transition={{
                          duration: 2.6 + index * 0.16,
                          delay: index * 0.14,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {area}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 26, rotate: -1.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.28 }}
                className="relative overflow-hidden rounded-[1.6rem] border border-foreground/[0.08] bg-background/58 p-5 md:p-6"
              >
                <motion.div
                  className="pointer-events-none absolute left-[-8%] top-8 h-20 w-20 rounded-full bg-secondary/[0.07] blur-3xl"
                  animate={reducedMotion ? undefined : { x: [0, 16, 0], y: [0, -10, 0], opacity: [0.28, 0.55, 0.28] }}
                  transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                  className="flex items-center gap-2 text-accent"
                  animate={reducedMotion ? undefined : { x: [0, 2, 0] }}
                  transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <GraduationCap size={16} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em]">
                    Education
                  </span>
                </motion.div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Formal training in computer science, from core engineering fundamentals to advanced systems and research-oriented work.
                </p>

                <div className="mt-5 space-y-4">
                  {profile.education.map((edu, index) => (
                    <EduCard
                      key={edu.degree}
                      edu={edu}
                      index={index}
                      reducedMotion={reducedMotion}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
