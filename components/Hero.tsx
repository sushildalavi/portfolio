"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { profile } from "@/data/profile"
import FloatingParticles from "./FloatingParticles"

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

type CodePart = { text: string; className: string }
type CodeLine = CodePart[]

const codeLines: CodeLine[] = [
  [
    { text: "const ", className: "text-secondary/90" },
    { text: "engineer", className: "text-foreground/85" },
    { text: " = {", className: "text-foreground/40" },
  ],
  [
    { text: "  name", className: "text-muted-foreground" },
    { text: ": ", className: "text-foreground/40" },
    { text: '"Sushil Dalavi"', className: "text-accent" },
    { text: ",", className: "text-foreground/40" },
  ],
  [
    { text: "  role", className: "text-muted-foreground" },
    { text: ": ", className: "text-foreground/40" },
    { text: '"AI Research Engineer"', className: "text-accent" },
    { text: ",", className: "text-foreground/40" },
  ],
  [
    { text: "  based", className: "text-muted-foreground" },
    { text: ": ", className: "text-foreground/40" },
    { text: '"Los Angeles, CA"', className: "text-accent" },
    { text: ",", className: "text-foreground/40" },
  ],
  [
    { text: "  education", className: "text-muted-foreground" },
    { text: ": ", className: "text-foreground/40" },
    { text: '"MS CS @ USC"', className: "text-accent" },
    { text: ",", className: "text-foreground/40" },
  ],
  [
    { text: "  focus", className: "text-muted-foreground" },
    { text: ": [", className: "text-foreground/40" },
  ],
  [
    { text: '    "NLP & RAG"', className: "text-accent/80" },
    { text: ",", className: "text-foreground/40" },
  ],
  [
    { text: '    "LLM Systems"', className: "text-accent/80" },
    { text: ",", className: "text-foreground/40" },
  ],
  [
    { text: '    "Healthcare AI"', className: "text-accent/80" },
    { text: ",", className: "text-foreground/40" },
  ],
  [{ text: "  ],", className: "text-foreground/40" }],
  [
    { text: "  status", className: "text-muted-foreground" },
    { text: ": ", className: "text-foreground/40" },
    { text: '"open to work ✓"', className: "text-accent" },
    { text: ",", className: "text-foreground/40" },
  ],
  [{ text: "}", className: "text-foreground/40" }],
]

function CodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" as const }}
      className="relative w-full max-w-[360px] xl:max-w-[400px]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-accent/8 blur-3xl scale-110" />

      <div className="relative rounded-2xl border border-foreground/10 bg-surface/90 backdrop-blur-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.25)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/[0.06] bg-foreground/[0.015]">
          <div className="w-3 h-3 rounded-full bg-red-400/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
          <span className="ml-3 text-[11px] font-mono text-muted tracking-widest select-none">
            sushil.ts
          </span>
        </div>

        {/* Code body */}
        <div className="px-4 py-5 font-mono text-[12.5px] leading-[1.9]">
          {codeLines.map((line, lineIndex) => (
            <motion.div
              key={lineIndex}
              className="flex"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.9 + lineIndex * 0.07,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <span className="select-none w-5 text-right mr-4 text-muted/25 text-[11px] leading-[1.9] shrink-0">
                {lineIndex + 1}
              </span>
              <span>
                {line.map((part, partIndex) => (
                  <span key={partIndex} className={part.className}>
                    {part.text}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}

          {/* Blinking cursor */}
          <motion.div
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 + codeLines.length * 0.07 + 0.3 }}
          >
            <span className="select-none w-5 text-right mr-4 text-muted/25 text-[11px] leading-[1.9] shrink-0">
              {codeLines.length + 1}
            </span>
            <motion.span
              className="inline-block w-[7px] h-[14px] mt-[5px] bg-accent/75 rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const firstName = profile.name.split(" ")[0]

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-20 pb-12 lg:h-[min(100svh,920px)] lg:min-h-[820px] lg:items-start lg:pt-20 lg:pb-20"
    >
      <FloatingParticles count={22} />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-accent/6 blur-[160px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-secondary/10 blur-[140px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-16 lg:px-12 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-20">
        {/* Left: text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-xl space-y-6 lg:pt-6"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-2 text-[11px] font-mono tracking-[0.26em] text-accent">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-accent"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              {profile.role.toUpperCase()}
            </span>
          </motion.div>

          <div className="text-[clamp(2.7rem,5.5vw,5rem)] font-black leading-[0.9] tracking-[-0.05em]">
            <motion.div variants={fadeUp} className="text-foreground/88 mb-1">
              Hi, I&apos;m{" "}
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
                    whileHover={{ scale: 1.08, y: -4, rotate: index % 2 === 0 ? 4 : -4 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="text-foreground/88">.</span>
            </motion.div>

            <motion.div variants={fadeUp} className="text-foreground/72 leading-[0.95]">
              {profile.headline.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.p
            variants={fadeUp}
            className="text-[1.05rem] leading-relaxed text-muted-foreground"
          >
            {profile.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-1">
            <motion.button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative overflow-hidden rounded-full bg-accent px-7 py-3.5 font-semibold text-[#0a0e1a] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_18px_40px_var(--accent-glow-val)]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="relative z-10">
                View Projects
                <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1.5">
                  →
                </span>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.button>

            <motion.button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full border border-foreground/10 bg-background/55 px-7 py-3.5 font-medium text-foreground/75 backdrop-blur-xl transition-all duration-300 hover:border-accent/35 hover:bg-accent/6 hover:text-accent"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 text-sm"
          >
            <div className="flex gap-4">
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

            <div className="h-4 w-px bg-foreground/10" />

            <span className="text-xs font-mono text-muted">
              Los Angeles · Open to work
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-6 pt-2 border-t border-foreground/[0.06]"
          >
            {profile.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.45, ease: "easeOut" }}
              >
                <span
                  className="text-xl font-black text-accent leading-none"
                  style={{ textShadow: "0 0 18px var(--accent-glow-val)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[11px] text-muted font-mono mt-0.5 tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: code window (desktop only) */}
        <div className="hidden lg:flex justify-end">
          <CodeWindow />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
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
