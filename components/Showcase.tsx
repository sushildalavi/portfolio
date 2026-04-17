"use client"

import { motion } from "framer-motion"
import ContainerScroll from "./ContainerScroll"

const terminalLines = [
  { text: "$ cat ~/work/manifest.yaml", color: "text-muted" },
  { text: "role: AI Engineer · USC Annenberg NLC", color: "text-foreground/80" },
  { text: "currently_shipping:", color: "text-foreground/80" },
  { text: "  - multi_modal_alignment:  F1=0.993 · cov=0.999", color: "text-accent" },
  { text: "  - aws_data_platform:      records=1.2M · regions=4", color: "text-accent" },
  { text: "  - distributed_workflows:  tools=12 · retries=auto", color: "text-accent" },
  { text: "  - hybrid_retrieval:       MRR+21.8% · nDCG+18.0%", color: "text-accent" },
  { text: "stack:", color: "text-foreground/80" },
  { text: "  - python · fastapi · temporal · pytorch", color: "text-secondary" },
  { text: "  - aws (s3, glue, sagemaker, bedrock)", color: "text-secondary" },
  { text: "  - pgvector · qdrant · mlflow · ragas", color: "text-secondary" },
  { text: "availability: open_to_sde_swe_ai_ml_roles", color: "text-accent-light" },
  { text: "", color: "" },
  { text: "$ _", color: "text-accent" },
]

export default function Showcase() {
  return (
    <ContainerScroll
      titleEyebrow="The short version"
      title={
        <>
          Everything I&apos;m shipping,
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent-light to-secondary">
            at a glance.
          </span>
        </>
      }
      subtitle="Scroll to unfold the manifest."
    >
      {/* Fake terminal */}
      <div className="rounded-2xl border border-foreground/[0.08] bg-[#050607] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/[0.06] bg-foreground/[0.02]">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-amber-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          <span className="ml-4 text-[11px] font-mono tracking-[0.18em] text-muted uppercase">
            sushil@sushildalavi.dev
          </span>
        </div>
        <div className="px-6 py-6 md:px-8 md:py-8 font-mono text-[12.5px] md:text-[13.5px] leading-[1.85]">
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.3, delay: 0.03 * i }}
              className={`${line.color || "text-muted"}`}
            >
              {line.text || "\u00A0"}
            </motion.div>
          ))}
        </div>
      </div>
    </ContainerScroll>
  )
}
