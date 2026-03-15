"use client"

import { motion } from "framer-motion"
import { Award, FileText, ExternalLink } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { publications } from "@/data/publications"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Publications() {
  return (
    <section id="publications" className="py-24 md:py-32 px-6 relative">
      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          label="Publications & IP"
          title="Research Output"
          subtitle="Published research and registered intellectual property in AI and NLP."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-4"
        >
          {publications.map((pub) => (
            <motion.article
              key={pub.id}
              variants={itemVariants}
              className="group p-5 md:p-6 rounded-xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-accent/20 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-accent/10 shrink-0 mt-0.5">
                  {pub.type === "patent" ? (
                    <Award size={18} className="text-accent" />
                  ) : (
                    <FileText size={18} className="text-accent" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/10 text-accent/80">
                      {pub.type === "patent"
                        ? "Intellectual Property"
                        : pub.venue}
                    </span>
                    <span className="text-xs text-muted">{pub.year}</span>
                  </div>

                  <h3 className="text-sm md:text-base font-semibold leading-snug group-hover:text-accent transition-colors">
                    {pub.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {pub.description}
                  </p>

                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent/60 hover:text-accent mt-3 transition-colors"
                    >
                      <ExternalLink size={12} />
                      View Publication
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
