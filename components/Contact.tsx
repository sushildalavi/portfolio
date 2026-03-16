"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, FileText, ArrowUpRight } from "lucide-react"
import { profile } from "@/data/profile"
import { getTiltTransform } from "@/lib/tilt"
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
    label: "Resume",
    href: asset(profile.links.resume),
    icon: FileText,
    value: "Download PDF",
    external: true,
  },
]

function ContactCard({
  link,
  index,
}: {
  link: (typeof links)[number]
  index: number
}) {
  const [tilt, setTilt] = useState("")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
    >
      <a
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
        className="card-glow group flex items-center gap-4 p-4 rounded-xl bg-background/62 border border-foreground/[0.08] hover:border-accent/30 hover:shadow-[0_0_30px_var(--accent-glow-val)] transition-all duration-300"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width) * 100}%`)
          e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - r.top) / r.height) * 100}%`)
          setTilt(getTiltTransform(e as never, 8))
        }}
        onMouseLeave={() => setTilt("")}
        style={{ transform: tilt, transition: "transform 0.15s ease-out" }}
      >
        <div className="card-spotlight" />
        <motion.div
          className="p-2.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300"
          whileHover={{ rotate: 15, scale: 1.15 }}
        >
          <link.icon size={18} className="text-accent" />
        </motion.div>
        <div className="text-left flex-1 min-w-0">
          <p className="text-xs text-muted">{link.label}</p>
          <p className="text-sm text-foreground/70 truncate group-hover:text-accent transition-colors duration-300">
            {link.value}
          </p>
        </div>
        <motion.div
          className="shrink-0"
          animate={{ x: 0, y: 0 }}
          whileHover={{ x: 3, y: -3 }}
        >
          <ArrowUpRight
            size={14}
            className="text-muted group-hover:text-accent transition-colors duration-300"
          />
        </motion.div>
      </a>
    </motion.div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-24 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="section-panel section-panel-accent rounded-[2rem] px-6 py-10 md:px-10 md:py-12 overflow-hidden">
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <span className="text-accent text-sm font-mono tracking-widest uppercase">
                Contact
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
                Let&apos;s Build Something
              </h2>
              <p className="text-muted-foreground mt-4 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                I&apos;m always open to discussing AI research, engineering
                challenges, or new opportunities. Feel free to reach out.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
                {["AI systems", "Research engineering", "Open to opportunities"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-accent/15 bg-accent/8 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-accent/80"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <motion.a
                href={`mailto:${profile.links.email}`}
                className="group relative mt-10 inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-[#0a0e1a] rounded-full font-medium transition-all duration-300 hover:shadow-[0_8px_30px_var(--accent-glow-val)] overflow-hidden"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail size={18} />
                  Say Hello
                  <span className="inline-block transition-transform group-hover:translate-x-1.5">
                    &rarr;
                  </span>
                </span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </motion.a>
            </motion.div>

            <div className="lg:pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {links.map((link, i) => (
                  <ContactCard key={link.label} link={link} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
