"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── timing constants (ms) ────────────────────────────────────────
const BOOT_END = 220
const CHECK_FIRST = 260
const CHECK_STEP = 140        // gap between each system check completing
const CHECKS_COUNT = 5
const CHECKS_END = CHECK_FIRST + CHECKS_COUNT * CHECK_STEP + 40   // ~1000
const COUNTDOWN_FROM = 3
const TICK = 240               // ms per countdown tick
const LAUNCH_AT = CHECKS_END + COUNTDOWN_FROM * TICK              // ~1720
const LIFTOFF_AT = LAUNCH_AT + 340                                 // ~2060
const HIDE_AT = LIFTOFF_AT + 260                                   // ~2320

const SYSTEMS = [
  "NEURAL CORE.........",
  "NLP ENGINE..........",
  "RAG PIPELINE........",
  "LLM INTERFACE.......",
  "PORTFOLIO ASSETS....",
]

type Phase = "boot" | "checks" | "countdown" | "launch" | "done"

function CornerBrackets() {
  return (
    <>
      {[
        "top-0 left-0 border-t-2 border-l-2",
        "top-0 right-0 border-t-2 border-r-2",
        "bottom-0 left-0 border-b-2 border-l-2",
        "bottom-0 right-0 border-b-2 border-r-2",
      ].map((cls) => (
        <motion.div
          key={cls}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className={`absolute w-5 h-5 border-accent z-10 ${cls}`}
        />
      ))}
    </>
  )
}

export default function PageLoader() {
  const [phase, setPhase] = useState<Phase>("boot")
  const [completedChecks, setCompletedChecks] = useState(0)
  const [countdown, setCountdown] = useState(COUNTDOWN_FROM)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []

    t.push(setTimeout(() => setPhase("checks"), BOOT_END))

    for (let i = 0; i < CHECKS_COUNT; i++) {
      t.push(setTimeout(() => setCompletedChecks(i + 1), CHECK_FIRST + (i + 1) * CHECK_STEP))
    }

    t.push(setTimeout(() => setPhase("countdown"), CHECKS_END))

    for (let c = COUNTDOWN_FROM - 1; c >= 0; c--) {
      t.push(
        setTimeout(
          () => setCountdown(c),
          CHECKS_END + (COUNTDOWN_FROM - c) * TICK
        )
      )
    }

    t.push(setTimeout(() => setPhase("launch"), LAUNCH_AT))
    t.push(setTimeout(() => setPhase("done"), LIFTOFF_AT))
    t.push(setTimeout(() => setShow(false), HIDE_AT))

    return () => t.forEach(clearTimeout)
  }, [])

  const progress =
    phase === "boot"
      ? 5
      : phase === "checks"
      ? 8 + Math.round((completedChecks / CHECKS_COUNT) * 65)
      : phase === "countdown"
      ? 73 + Math.round(((COUNTDOWN_FROM - countdown) / COUNTDOWN_FROM) * 22)
      : 100

  if (!show) return null

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* CRT scanlines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)",
            }}
          />

          {/* CRT vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
          </div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-[520px] mx-5"
          >
            <CornerBrackets />

            <div
              className="border border-accent/20 bg-background p-6 md:p-8 relative"
              style={{
                boxShadow:
                  "0 0 80px rgba(184,134,11,0.06), inset 0 0 80px rgba(0,0,0,0.4)",
              }}
            >
              {/* ── Header ── */}
              <div className="text-center mb-5 space-y-1 font-mono">
                <motion.p
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="text-[9px] tracking-[0.55em] text-accent/50"
                >
                  ▸ MISSION CONTROL — EARTH STATION 01 ◂
                </motion.p>

                <h1
                  className="text-2xl md:text-3xl font-black tracking-[0.18em] text-accent"
                  style={{
                    textShadow:
                      "0 0 18px var(--accent-val), 0 0 36px color-mix(in srgb, var(--accent-val) 40%, transparent)",
                  }}
                >
                  PORTFOLIO.SYS
                </h1>

                <p className="text-[10px] tracking-[0.3em] text-muted">
                  SUSHIL DALAVI · AI RESEARCH ENGINEER · v2.0.25
                </p>
              </div>

              {/* ── Progress bar ── */}
              <div className="relative h-[2px] bg-foreground/8 mb-5 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35, ease: "linear" }}
                  style={{ boxShadow: "0 0 10px var(--accent-val)" }}
                />
                {/* Shimmer on the bar */}
                <motion.div
                  className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-4rem", "600px"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* ── System checks ── */}
              <div className="space-y-2 mb-5 font-mono">
                {SYSTEMS.map((name, i) => {
                  const done = i < completedChecks
                  const active = i === completedChecks && phase === "checks"
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{
                        opacity: done || active ? 1 : 0.2,
                        x: 0,
                      }}
                      transition={{ delay: 0.15 + i * 0.04, duration: 0.3 }}
                      className="flex items-center justify-between text-[11px] md:text-[12px] gap-2"
                    >
                      <span
                        className={`flex items-center gap-2 transition-colors duration-300 ${
                          done
                            ? "text-foreground/55"
                            : active
                            ? "text-foreground/75"
                            : "text-muted/25"
                        }`}
                      >
                        <span className="text-accent/35 shrink-0">►</span>
                        {name}
                      </span>

                      <span
                        className={`shrink-0 px-2 py-0.5 text-[9px] tracking-[0.2em] border transition-all duration-300 ${
                          done
                            ? "text-accent border-accent/30 bg-accent/8"
                            : active
                            ? "text-yellow-400/80 border-yellow-400/30"
                            : "text-muted/20 border-foreground/5"
                        }`}
                        style={
                          done
                            ? { boxShadow: "0 0 8px color-mix(in srgb, var(--accent-val) 30%, transparent)" }
                            : {}
                        }
                      >
                        {done ? "[ OK ]" : active ? "[INIT]" : "[----]"}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* ── Divider ── */}
              <div className="h-px bg-foreground/8 mb-5" />

              {/* ── Countdown / Launch ── */}
              <div className="font-mono text-center min-h-[88px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {phase === "boot" && (
                    <motion.p
                      key="boot"
                      exit={{ opacity: 0 }}
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 0.55, repeat: Infinity }}
                      className="text-[10px] tracking-[0.45em] text-accent/50"
                    >
                      INITIALIZING SYSTEMS...
                    </motion.p>
                  )}

                  {phase === "checks" && (
                    <motion.div
                      key="checks"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-1 text-center"
                    >
                      <p className="text-[9px] tracking-[0.4em] text-muted/45">
                        RUNNING DIAGNOSTICS
                      </p>
                      <motion.div
                        className="flex gap-1.5 justify-center mt-2"
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-accent/60"
                            animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.18,
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {phase === "countdown" && (
                    <motion.div
                      key="countdown"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-[9px] tracking-[0.45em] text-muted/45 mb-3">
                        LAUNCH SEQUENCE INITIATED
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={countdown}
                          initial={{ opacity: 0, scale: 1.7, y: -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.65, y: 8 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="text-5xl md:text-6xl font-black text-accent tracking-tighter"
                          style={{
                            textShadow:
                              "0 0 30px var(--accent-val), 0 0 70px color-mix(in srgb, var(--accent-val) 40%, transparent)",
                          }}
                        >
                          T-0{countdown}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {phase === "launch" && (
                    <motion.div
                      key="launch"
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{
                        opacity: [0, 1, 1, 0.8],
                        scale: [0.75, 1.06, 1.0, 1.0],
                      }}
                      transition={{ duration: 0.5, times: [0, 0.3, 0.6, 1] }}
                    >
                      <motion.p
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 0.12, repeat: 3 }}
                        className="text-2xl md:text-3xl font-black tracking-[0.25em] text-accent"
                        style={{
                          textShadow:
                            "0 0 24px var(--accent-val), 0 0 50px var(--accent-val)",
                        }}
                      >
                        🚀 LIFTOFF
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Bottom telemetry strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 left-0 right-0 flex justify-center"
          >
            <motion.p
              animate={{ opacity: [0.3, 0.65, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="font-mono text-[8px] md:text-[9px] tracking-[0.35em] text-muted/40"
            >
              ALL SYSTEMS NOMINAL · STANDBY FOR DEPLOYMENT · LAT 34.02° N / LON 118.28° W
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
