"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { profile } from "@/data/profile"

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-14 h-14 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  ),
})

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-20 lg:pt-0">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-accent text-sm font-mono tracking-widest"
          >
            {profile.role.toUpperCase()}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
              {profile.name.split(" ")[0]}
            </span>
            .
            <br />
            <span className="text-foreground/90">
              {profile.headline.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            {profile.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group px-6 py-3 bg-accent hover:bg-accent-hover text-[#0a0e1a] rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              View Projects
              <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 border border-foreground/10 hover:border-accent/30 rounded-full hover:bg-accent/5 transition-all duration-300"
            >
              Get in Touch
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-5 pt-2">
            {[
              { href: profile.links.github, icon: Github, label: "GitHub" },
              {
                href: profile.links.linkedin,
                icon: Linkedin,
                label: "LinkedIn",
              },
              {
                href: `mailto:${profile.links.email}`,
                icon: Mail,
                label: "Email",
              },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-foreground/30 hover:text-accent transition-colors duration-200"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" as const }}
          className="h-[350px] sm:h-[400px] lg:h-[520px] w-full"
        >
          <HeroScene />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut" as const,
          }}
        >
          <ArrowDown className="text-foreground/20" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
