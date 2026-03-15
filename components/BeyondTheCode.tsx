"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { profile } from "@/data/profile"

export default function BeyondTheCode() {
  return (
    <section id="beyond" className="py-16 md:py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          label="Beyond the Code"
          title="Life Outside the Terminal"
          subtitle="The interests and passions that keep things in perspective."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-2xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/20 transition-all duration-300 card-glow"
          >
            <div className="card-spotlight" />
            <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-4">
              Interests
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map(({ label, emoji }) => (
                <motion.span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-foreground/[0.04] border border-foreground/[0.06] text-muted-foreground hover:border-accent/25 hover:text-accent hover:bg-accent/5 transition-all duration-200 cursor-default"
                  whileHover={{ scale: 1.08, y: -2 }}
                >
                  <span>{emoji}</span>
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Real Madrid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent hover:border-accent/35 transition-all duration-300 relative overflow-hidden card-glow"
          >
            <div className="card-spotlight" />
            <div className="pointer-events-none absolute -right-4 -top-4 text-7xl opacity-10 select-none">
              ⚽
            </div>
            <p className="text-xs font-mono text-accent tracking-wider uppercase mb-2">
              Hala Madrid
            </p>
            <p className="text-sm font-bold text-foreground/80 mb-1">
              Real Madrid CF
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {profile.realMadrid.description}
            </p>
            <p className="text-xs font-mono text-accent/70 mt-3 italic">
              &ldquo;{profile.realMadrid.tagline}&rdquo;
            </p>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-5 rounded-2xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/20 transition-all duration-300 relative card-glow"
          >
            <div className="card-spotlight" />
            <Quote size={18} className="text-accent/30 mb-3" />
            <p className="text-sm text-foreground/75 leading-relaxed italic">
              &ldquo;{profile.quote.text}&rdquo;
            </p>
            <div className="mt-3 text-xs text-muted-foreground font-mono">
              <span className="text-accent/70">— {profile.quote.author}</span>
              <br />
              <span className="text-muted/60">{profile.quote.coauthor}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
