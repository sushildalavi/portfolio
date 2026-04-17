"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles, X, ArrowUp, RotateCcw } from "lucide-react"
import { match, type MatchedAnswer } from "@/lib/assistantKnowledge"

type Message =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "assistant"; answers: MatchedAnswer[] }

const SUGGESTED = [
  "What's Sushil working on right now?",
  "Walk me through JobSense",
  "Retrieval system numbers?",
  "How do I reach him?",
]

const INTRO: Message = {
  id: "intro",
  role: "assistant",
  answers: [
    {
      title: "Hey — I'm Sushil's site assistant.",
      body: "Ask me anything about his work, shipped projects, technical stack, or how to get in touch. I'm trained on his resume, experience, and project case studies.",
      score: 1,
    },
  ],
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([INTRO])
  const [pending, setPending] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 280)
    }
  }, [open])

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, pending])

  const send = (raw: string) => {
    const text = raw.trim()
    if (!text || pending) return
    const userMsg: Message = { id: uid(), role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setPending(true)

    // Simulate a short think — feels like the model is considering.
    setTimeout(() => {
      const answers = match(text, 2)
      const reply: Message = { id: uid(), role: "assistant", answers }
      setMessages((prev) => [...prev, reply])
      setPending(false)
    }, 420 + Math.random() * 320)
  }

  const reset = () => {
    setMessages([INTRO])
    setInput("")
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        aria-label="Open Sushil's AI assistant"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 group"
      >
        <span className="absolute inset-0 rounded-full bg-accent/25 blur-xl group-hover:bg-accent/40 transition-colors" />
        <span className="relative flex items-center gap-2 rounded-full border border-accent/30 bg-background/85 backdrop-blur-xl pl-3.5 pr-4 py-2.5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(180deg,var(--accent-val),var(--accent-hover-val))] shadow-inner">
            <Sparkles size={12} className="text-[#050607]" />
          </span>
          <span className="text-[12px] font-semibold text-foreground/90 tracking-tight">
            Ask me anything
          </span>
          <span className="hidden md:inline-block rounded-md border border-foreground/[0.1] px-1.5 py-0.5 text-[10px] font-mono text-muted">
            /
          </span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed z-50 bottom-20 right-4 md:bottom-24 md:right-8 left-4 md:left-auto md:w-[420px] max-h-[min(640px,82vh)] rounded-3xl border border-foreground/[0.1] bg-background/95 backdrop-blur-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-foreground/[0.06]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-8 w-8 rounded-xl border border-accent/30 bg-[linear-gradient(180deg,#0e1011,#050607)] flex items-center justify-center">
                    <Sparkles size={14} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground/92 truncate">
                      Sushil&apos;s Assistant
                    </p>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted truncate">
                      Trained on · résumé · projects · stack
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={reset}
                    aria-label="Reset chat"
                    className="p-2 rounded-lg text-muted hover:text-accent hover:bg-foreground/[0.04] transition-colors"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close assistant"
                    className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollerRef}
                className="flex-1 overflow-y-auto px-5 py-4 space-y-5 text-[14px]"
              >
                {messages.map((m) =>
                  m.role === "user" ? (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-accent/25 bg-accent/10 px-3.5 py-2 text-[13.5px] text-foreground/90">
                        {m.content}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-3"
                    >
                      {m.answers.map((a, i) => (
                        <div
                          key={i}
                          className="rounded-2xl rounded-tl-sm border border-foreground/[0.08] bg-foreground/[0.02] px-4 py-3"
                        >
                          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/90 mb-2">
                            {a.title}
                          </div>
                          <p className="text-[13.5px] leading-[1.65] text-foreground/82">
                            {a.body}
                          </p>
                          {a.links && a.links.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {a.links.map((l) => (
                                <a
                                  key={l.href}
                                  href={l.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center rounded-md border border-accent/25 bg-accent/5 px-2 py-1 text-[11px] text-accent hover:bg-accent/10 transition-colors"
                                >
                                  {l.label} ↗
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  ),
                )}

                {pending && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-foreground/[0.08] bg-foreground/[0.02] px-3.5 py-3"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {messages.length === 1 && !pending && (
                  <div className="pt-1">
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted mb-2">
                      Try asking
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="inline-flex items-center rounded-full border border-foreground/[0.1] bg-foreground/[0.02] px-2.5 py-1 text-[11.5px] text-muted-foreground hover:border-accent/40 hover:text-accent hover:bg-accent/[0.05] transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
                className="border-t border-foreground/[0.06] bg-background/60 p-3"
              >
                <div className="flex items-end gap-2 rounded-2xl border border-foreground/[0.1] bg-background/60 px-3 py-2 focus-within:border-accent/40 transition-colors">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        send(input)
                      }
                    }}
                    placeholder="Ask about projects, stack, experience…"
                    className="flex-1 resize-none bg-transparent text-[13.5px] leading-[1.5] placeholder:text-muted/70 outline-none max-h-28"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || pending}
                    aria-label="Send"
                    className="shrink-0 h-8 w-8 rounded-xl bg-accent text-[#050607] grid place-items-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-hover transition-colors"
                  >
                    <ArrowUp size={15} />
                  </button>
                </div>
                <p className="mt-2 px-1 text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                  Local knowledge base · ships no tokens off-device
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
