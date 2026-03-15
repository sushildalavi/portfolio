"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, FileText, ArrowUpRight } from "lucide-react"
import { profile } from "@/data/profile"

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
    href: profile.links.resume,
    icon: FileText,
    value: "Download PDF",
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent text-sm font-mono tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
            Let&apos;s Build Something
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-lg mx-auto leading-relaxed">
            I&apos;m always open to discussing AI research, engineering
            challenges, or new opportunities. Feel free to reach out.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 p-4 rounded-xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/25 transition-all duration-300"
            >
              <div className="p-2.5 rounded-lg bg-accent/10 group-hover:bg-accent/15 transition-colors">
                <link.icon size={18} className="text-accent" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs text-muted">{link.label}</p>
                <p className="text-sm text-foreground/70 truncate">
                  {link.value}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="text-muted group-hover:text-accent transition-colors shrink-0"
              />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <a
            href={`mailto:${profile.links.email}`}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-[#0a0e1a] rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
          >
            <Mail size={18} />
            Say Hello
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
