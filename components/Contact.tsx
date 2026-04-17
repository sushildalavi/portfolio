"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, FileText, ArrowUpRight } from "lucide-react"
import { profile } from "@/data/profile"
import { asset } from "@/lib/assetPath"

const links = [
  {
    label: "Email",
    href: `mailto:${profile.links.email}`,
    icon: Mail,
    value: profile.links.email,
  },
  {
    label: "GitHub",
    href: profile.links.github,
    icon: Github,
    value: "github.com/sushildalavi",
    external: true,
  },
  {
    label: "LinkedIn",
    href: profile.links.linkedin,
    icon: Linkedin,
    value: "linkedin.com/in/sushildalavi",
    external: true,
  },
  {
    label: "Résumé",
    href: asset(profile.links.resume),
    icon: FileText,
    value: "Download PDF",
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-6">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[560px] w-[560px] rounded-full bg-accent/[0.04] blur-[140px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3 text-accent text-[11px] font-mono tracking-[0.28em] uppercase">
              <span className="h-px w-8 bg-accent/60" />
              Contact
            </div>
            <h2 className="mt-5 text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.98]">
              Let&apos;s build
              <br />
              <span className="text-accent">something real.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-[1.7] text-muted-foreground">
              I&apos;m open to full-time SDE / AI engineering roles, research
              collaborations, and serious engineering conversations. Reach out
              and I&apos;ll reply within a day.
            </p>

            <a
              href={`mailto:${profile.links.email}`}
              className="group relative mt-10 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#0a0e1a] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_24px_50px_var(--accent-glow-val)]"
            >
              <Mail size={15} className="relative z-10" />
              <span className="relative z-10">Say hello</span>
              <ArrowUpRight
                size={14}
                className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>

            <div className="mt-10 flex flex-wrap gap-1.5">
              {["AI Engineering", "Retrieval Systems", "ML Platforms", "Open to SDE roles"].map(
                (t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-md border border-foreground/[0.08] bg-foreground/[0.02] px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* Right — link grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-2xl border border-foreground/[0.08] bg-background/50 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-foreground/[0.06] flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted">
                Channels
              </p>
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-accent/80">
                0{links.length}
              </span>
            </div>
            <div className="divide-y divide-foreground/[0.05]">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  className="group flex items-center justify-between gap-5 px-6 py-4 hover:bg-foreground/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-accent/10 grid place-items-center shrink-0">
                      <link.icon size={16} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                        {link.label}
                      </p>
                      <p className="text-[14px] font-medium text-foreground/88 group-hover:text-accent transition-colors truncate">
                        {link.value}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted shrink-0 transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
