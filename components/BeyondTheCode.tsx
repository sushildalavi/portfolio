"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { profile } from "@/data/profile"

export default function BeyondTheCode() {
  return (
    <section id="beyond" className="relative py-24 md:py-32 px-6">
      <div className="pointer-events-none absolute top-0 left-1/3 h-[380px] w-[380px] rounded-full bg-accent/[0.03] blur-[130px]" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Off Hours"
          title="Beyond the terminal"
          subtitle="What keeps perspective — the things worth stepping away for."
        />

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr_0.9fr] gap-6">
          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-foreground/[0.08] bg-background/50 backdrop-blur-xl p-7"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted mb-5">
              Interests
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map(({ label, emoji }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.02] px-3 py-1.5 text-xs text-muted-foreground hover:border-accent/30 hover:text-accent hover:bg-accent/[0.04] transition-colors"
                >
                  <span>{emoji}</span>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Real Madrid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.06] to-transparent p-7"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 text-8xl opacity-[0.08] select-none">
              ⚽
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-accent/90 mb-5">
              Hala Madrid
            </p>
            <p className="text-lg font-bold text-foreground/92 tracking-[-0.01em]">
              Real Madrid CF
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {profile.realMadrid.description}
            </p>
            <p className="mt-4 text-[12px] font-mono italic text-accent/75">
              “{profile.realMadrid.tagline}”
            </p>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="rounded-2xl border border-foreground/[0.08] bg-background/50 backdrop-blur-xl p-7"
          >
            <Quote size={18} className="text-accent/35" />
            <p className="mt-4 text-[15px] leading-[1.7] italic text-foreground/82">
              “{profile.quote.text}”
            </p>
            <div className="mt-5 text-[11px] font-mono uppercase tracking-[0.22em]">
              <span className="text-accent/80">— {profile.quote.author}</span>
              <br />
              <span className="text-muted/60 normal-case tracking-wide italic">
                {profile.quote.coauthor}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
