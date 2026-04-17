"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { publications } from "@/data/publications"

export default function Publications() {
  return (
    <section id="publications" className="relative py-24 md:py-32 px-6">
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Research"
          title="Publications & IP"
          subtitle="Peer-reviewed papers and registered intellectual property."
        />

        <div className="mt-4 divide-y divide-foreground/[0.06] border-t border-b border-foreground/[0.06]">
          {publications.map((pub, i) => {
            const Tag = pub.link ? "a" : "div"
            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Tag
                  {...(pub.link
                    ? {
                        href: pub.link,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className="group block py-7 transition-colors hover:bg-foreground/[0.02] px-0 md:px-4 -mx-0 md:-mx-4 rounded-none"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[90px_1fr_auto] gap-4 md:gap-8 items-start">
                    {/* Left — year */}
                    <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-muted md:pt-1">
                      {pub.year}
                    </div>

                    {/* Middle — title + venue */}
                    <div className="min-w-0">
                      <h3 className="text-[17px] md:text-[19px] font-semibold tracking-[-0.015em] text-foreground/92 group-hover:text-accent transition-colors leading-snug">
                        {pub.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.2em] ${
                            pub.type === "patent"
                              ? "bg-accent/10 text-accent border border-accent/20"
                              : "bg-secondary/10 text-secondary border border-secondary/20"
                          }`}
                        >
                          {pub.type === "patent" ? "IP" : "Paper"}
                        </span>
                        <span className="text-muted-foreground">{pub.venue}</span>
                      </div>
                      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground max-w-[70ch]">
                        {pub.description}
                      </p>
                    </div>

                    {/* Right — arrow */}
                    {pub.link && (
                      <div className="hidden md:flex items-start justify-end pt-1 text-muted-foreground group-hover:text-accent transition-colors">
                        <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    )}
                  </div>
                </Tag>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
