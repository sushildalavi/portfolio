"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { profile } from "@/data/profile"

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-14 w-14 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
    </div>
  ),
})

const sceneTags = [
  "Secretlab TITAN Evo",
  "MacBook Air M3",
  "Alienware AW3225QF",
  "Real Madrid third kit",
]

const sceneStats = [
  { label: "Emotes", value: "4-loop" },
  { label: "Camera", value: "Reactive" },
  { label: "Mood", value: "Desk setup" },
  { label: "Coffee", value: "Yes" },
]

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
}

const letterAnimation = {
  hidden: { opacity: 0, y: 34, rotateX: -32 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.42,
      delay: 0.38 + index * 0.035,
      ease: "easeOut" as const,
    },
  }),
}

export default function Hero() {
  const firstName = profile.name.split(" ")[0]

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-12 lg:pt-28"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-accent/6 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-28 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-[24rem] w-[24rem] rounded-full bg-secondary/12 blur-[140px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(380px,0.88fr)] lg:gap-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-2xl space-y-5"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-accent/25 bg-accent/8 px-4 py-2 text-[11px] font-mono tracking-[0.28em] text-accent">
              {profile.role.toUpperCase()}
            </span>
            <span className="text-sm text-muted-foreground">
              Research systems, product-minded execution, and applied AI.
            </span>
          </motion.div>

          <div className="max-w-[10.6ch] text-[clamp(2.7rem,5.1vw,4.9rem)] font-black leading-[0.92] tracking-[-0.05em] text-foreground">
            <motion.span variants={fadeUp} className="inline-block">
              Hi, I&apos;m{" "}
            </motion.span>
            <span className="inline-flex" style={{ perspective: 600 }}>
              {firstName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterAnimation}
                  initial="hidden"
                  animate="show"
                  className="animate-gradient-text inline-block bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent"
                  style={{ display: "inline-block" }}
                  whileHover={{ scale: 1.08, y: -3, rotate: index % 2 === 0 ? 4 : -4 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <motion.span variants={fadeUp} className="inline-block">
              .
            </motion.span>
            <br />
            <motion.span variants={fadeUp} className="inline-block text-foreground/92">
              {profile.headline.split("\n").map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </motion.span>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground"
          >
            {profile.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-1">
            <motion.button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative overflow-hidden rounded-full bg-accent px-7 py-3.5 font-medium text-[#0a0e1a] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_18px_40px_rgba(184,134,11,0.22)]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="relative z-10">
                View Projects
                <span className="ml-1 inline-block transition-transform group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.button>

            <motion.button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full border border-foreground/10 bg-background/55 px-7 py-3.5 font-medium text-foreground/78 backdrop-blur-xl transition-all duration-300 hover:border-accent/35 hover:bg-accent/6"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-5 pt-1 text-sm text-muted-foreground"
          >
            <div className="flex gap-5">
              {[
                { href: profile.links.github, icon: Github, label: "GitHub" },
                { href: profile.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${profile.links.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-foreground/35 transition-colors duration-200 hover:text-accent"
                  whileHover={{ scale: 1.25, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["NLP", "RAG", "LLM systems"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-foreground/10 bg-background/50 px-3 py-1 backdrop-blur-xl"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.22, ease: "easeOut" as const }}
          className="relative mx-auto w-full max-w-[39rem]"
        >
          <div className="pointer-events-none absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/18 via-accent/6 to-secondary/14 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2.3rem] border border-foreground/10 bg-background/72 shadow-[0_35px_90px_rgba(10,14,26,0.18)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,134,11,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(30,58,95,0.16),transparent_32%)]" />

            <div className="absolute left-5 right-5 top-5 z-10 flex flex-wrap gap-2">
              {sceneTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-[11px] font-medium text-foreground/70 backdrop-blur-xl"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative h-[400px] w-full pt-14 sm:h-[480px] lg:h-[560px]">
              <HeroScene />
            </div>

            <div className="absolute inset-x-5 bottom-5 z-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-sm rounded-[1.4rem] border border-foreground/10 bg-background/72 px-4 py-3 backdrop-blur-2xl">
                <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-accent/90">
                  Live Scene
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/72">
                  Typing, coffee break, nod, and celebration loops in a cleaner
                  3D desk setup.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:w-[13.5rem]">
                {sceneStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-foreground/10 bg-background/66 px-3 py-2 backdrop-blur-xl"
                  >
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground/80">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut" as const,
          }}
        >
          <ArrowDown className="text-foreground/20" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
