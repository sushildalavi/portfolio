"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { profile } from "@/data/profile"

const HeroVisual = dynamic(() => import("./HeroVisual"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 lg:px-12"
    >
      {/* Masked dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--accent-val) 20%, transparent) 1px, transparent 0)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 45%, #000 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 45%, #000 20%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-12 lg:gap-16 items-center">
        {/* Left — text column */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* Status pill */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-foreground/[0.08] bg-background/60 backdrop-blur-xl px-4 py-1.5 text-[11px] font-mono tracking-[0.24em] uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-muted-foreground">Available</span>
              <span className="h-3 w-px bg-foreground/10" />
              <span className="text-accent/90">{profile.role}</span>
            </div>
          </motion.div>

          <div className="mt-8">
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[0.94] tracking-[-0.04em] text-foreground/95"
            >
              Sushil Dalavi.
            </motion.h1>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-[clamp(1.35rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground/60"
            >
              {profile.headline.split("\n").map((line, i) => (
                <span key={i} className={`block ${i === 1 ? "text-accent" : ""}`}>
                  {line}
                </span>
              ))}
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-[16px] leading-[1.65] text-muted-foreground"
          >
            {profile.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#050607] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_20px_44px_var(--accent-glow-val)]"
            >
              <span className="relative z-10">View selected work</span>
              <ArrowUpRight
                size={15}
                className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 rounded-full border border-foreground/[0.12] bg-background/50 backdrop-blur-xl px-6 py-3 text-sm font-medium text-foreground/80 transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
            >
              Get in touch
            </button>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              <span>Résumé</span>
              <ArrowUpRight
                size={13}
                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-foreground/[0.06]"
          >
            <div className="flex items-center gap-5 text-sm">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted">
                Connect
              </span>
              <div className="flex items-center gap-4">
                {[
                  { href: profile.links.github, icon: Github, label: "GitHub" },
                  { href: profile.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: `mailto:${profile.links.email}`, icon: Mail, label: "Email" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-foreground/40 transition-all duration-200 hover:text-accent hover:-translate-y-0.5"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
              <span>LA</span>
              <span className="h-3 w-px bg-foreground/10" />
              <span>USC &apos;26</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — 3D morphing shape */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:block relative h-[460px] xl:h-[520px]"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-10 rounded-full bg-accent/[0.06] blur-[90px]" />
            <div className="absolute inset-20 rounded-full bg-secondary/[0.08] blur-[110px]" />
          </div>
          <HeroVisual className="relative z-10 w-full h-full" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="text-foreground/20" size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
