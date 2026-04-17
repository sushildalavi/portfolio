"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles, X, ArrowUp, RotateCcw, Command } from "lucide-react"
import { match, type MatchedAnswer } from "@/lib/assistantKnowledge"

type Message =
  | { id: string; role: "user"; content: string }
  | {
      id: string
      role: "assistant"
      answers: MatchedAnswer[]
      /** characters streamed so far across the combined assistant text */
      streamed: number
    }

const INTRO: Message = {
  id: "intro",
  role: "assistant",
  streamed: 1e6,
  answers: [
    {
      id: "intro",
      title: "Hey — I'm Sushil's site assistant.",
      body:
        "Ask me anything about his work, shipped projects, technical stack, or how to get in touch.\n\nI'm trained on his résumé, experience, and project case studies.",
      score: 1,
      followUps: [
        "What's he working on now?",
        "Walk me through JobSense",
        "Retrieval numbers?",
        "How do I reach him?",
      ],
    },
  ],
}

const DEFAULT_SUGGESTIONS = [
  "What is Sushil working on now?",
  "Tell me about JobSense",
  "ScholarRAG numbers",
  "What's his stack?",
  "Is he open to hire?",
  "How do I reach him?",
]

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

/** Render markdown-lite strings: **bold**, `code`, "- " bullets, line breaks. */
function renderInline(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = regex.exec(line))) {
    if (m.index > last) parts.push(line.slice(last, m.index))
    const tok = m[0]
    if (tok.startsWith("**")) {
      parts.push(
        <strong key={`b${key++}`} className="font-semibold text-foreground/95">
          {tok.slice(2, -2)}
        </strong>,
      )
    } else if (tok.startsWith("`")) {
      parts.push(
        <code
          key={`c${key++}`}
          className="rounded bg-foreground/[0.06] border border-foreground/[0.08] px-1 py-0.5 font-mono text-[12px] text-accent/90"
        >
          {tok.slice(1, -1)}
        </code>,
      )
    }
    last = m.index + tok.length
  }
  if (last < line.length) parts.push(line.slice(last))
  return parts
}

function Rendered({ text }: { text: string }) {
  const lines = text.split("\n")
  const blocks: React.ReactNode[] = []
  let bulletBuf: string[] = []
  let key = 0

  const flushBullets = () => {
    if (bulletBuf.length === 0) return
    blocks.push(
      <ul key={`u${key++}`} className="my-1.5 space-y-1 pl-1">
        {bulletBuf.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            <span>{renderInline(b)}</span>
          </li>
        ))}
      </ul>,
    )
    bulletBuf = []
  }

  lines.forEach((raw, i) => {
    const trimmed = raw.trimStart()
    if (trimmed.startsWith("- ")) {
      bulletBuf.push(trimmed.slice(2))
      return
    }
    flushBullets()
    if (trimmed.length === 0) {
      blocks.push(<div key={`s${i}`} className="h-2" />)
      return
    }
    blocks.push(
      <p key={`p${i}`} className="leading-[1.68]">
        {renderInline(trimmed)}
      </p>,
    )
  })
  flushBullets()
  return <div className="space-y-1 text-[13.5px] text-foreground/82">{blocks}</div>
}

/** Streams text in by revealing characters one frame at a time. */
function StreamedBody({ text, streamed }: { text: string; streamed: number }) {
  const visible = text.slice(0, Math.min(streamed, text.length))
  return <Rendered text={visible} />
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([INTRO])
  const [pending, setPending] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Keyboard shortcut: "/" opens, "Esc" closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      const inField = tag === "INPUT" || tag === "TEXTAREA"
      if (!open && !inField && e.key === "/") {
        e.preventDefault()
        setOpen(true)
      }
      if (open && e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 260)
  }, [open])

  // Auto-scroll on new content
  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, pending])

  // Streaming loop for the latest assistant message
  useEffect(() => {
    const last = messages[messages.length - 1]
    if (!last || last.role !== "user") {
      if (last && last.role === "assistant") {
        const totalLen = last.answers.reduce((n, a) => n + a.title.length + 2 + a.body.length + 4, 0)
        if (last.streamed < totalLen) {
          const id = window.setTimeout(() => {
            setMessages((prev) => {
              const copy = prev.slice()
              const tail = copy[copy.length - 1]
              if (tail && tail.role === "assistant") {
                copy[copy.length - 1] = { ...tail, streamed: tail.streamed + 6 }
              }
              return copy
            })
          }, 14)
          return () => clearTimeout(id)
        }
      }
    }
  }, [messages])

  const send = (raw: string) => {
    const text = raw.trim()
    if (!text || pending) return
    const userMsg: Message = { id: uid(), role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setPending(true)

    window.setTimeout(() => {
      const answers = match(text, 2)
      const reply: Message = {
        id: uid(),
        role: "assistant",
        answers,
        streamed: 0,
      }
      setMessages((prev) => [...prev, reply])
      setPending(false)
    }, 320 + Math.random() * 240)
  }

  const reset = () => {
    setMessages([INTRO])
    setInput("")
  }

  // Flattened stream text per answer, for progressive reveal
  const renderAnswer = (m: Extract<Message, { role: "assistant" }>, i: number, a: MatchedAnswer) => {
    // Compute cumulative offset for streaming
    let offset = 0
    for (let j = 0; j < i; j++) {
      const prev = m.answers[j]
      offset += prev.title.length + 2 + prev.body.length + 4
    }
    const titleBudget = Math.max(0, m.streamed - offset)
    const bodyBudget = Math.max(0, titleBudget - a.title.length - 2)

    return (
      <div
        key={`${m.id}-${i}`}
        className="relative pl-4"
      >
        <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent" />
        <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-accent/90 mb-2">
          {a.title.slice(0, titleBudget)}
          {titleBudget < a.title.length && (
            <span className="inline-block w-1.5 h-3 bg-accent/70 align-middle animate-pulse ml-0.5" />
          )}
        </div>
        {bodyBudget > 0 && <StreamedBody text={a.body} streamed={bodyBudget} />}
        {a.links && a.links.length > 0 && bodyBudget >= a.body.length && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {a.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-accent/30 bg-accent/5 px-2 py-1 text-[11px] text-accent hover:bg-accent/15 transition-colors"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
        {a.followUps && a.followUps.length > 0 && bodyBudget >= a.body.length && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {a.followUps.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="inline-flex items-center gap-1 rounded-full border border-foreground/[0.1] bg-foreground/[0.02] px-2.5 py-1 text-[11.5px] text-muted-foreground hover:border-accent/40 hover:text-accent hover:bg-accent/[0.05] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  const suggestionPool = useMemo(() => DEFAULT_SUGGESTIONS, [])

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        aria-label="Open Sushil's AI assistant"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 group"
      >
        <span className="absolute inset-0 rounded-full bg-accent/30 blur-2xl group-hover:bg-accent/50 transition-colors" />
        <span className="relative flex items-center gap-2 rounded-full border border-accent/30 bg-background/85 backdrop-blur-xl pl-3.5 pr-4 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(180deg,var(--accent-val),var(--accent-hover-val))]">
            <Sparkles size={12} className="text-[#050607]" />
          </span>
          <span className="text-[12.5px] font-semibold text-foreground/92 tracking-tight">
            Ask about Sushil
          </span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 rounded-md border border-foreground/[0.1] bg-foreground/[0.04] px-1.5 py-[1px] text-[10px] font-mono text-muted">
            /
          </kbd>
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[3px]"
            />
            <motion.aside
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
              className="fixed right-0 top-0 z-50 h-[100dvh] w-full md:w-[480px] lg:w-[520px] bg-[var(--bg-primary)]/95 backdrop-blur-2xl border-l border-foreground/[0.08] flex flex-col shadow-[-40px_0_80px_-20px_rgba(0,0,0,0.55)]"
              aria-label="Sushil's AI assistant"
            >
              {/* Header */}
              <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-foreground/[0.06]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-9 w-9 rounded-xl border border-accent/30 bg-[linear-gradient(180deg,#0e1011,#050607)] flex items-center justify-center">
                    <Sparkles size={14} className="text-accent" />
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-background" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold tracking-tight text-foreground/92 truncate">
                      Sushil&apos;s Assistant
                    </p>
                    <p className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-muted truncate">
                      Local · résumé + projects
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={reset}
                    aria-label="Reset chat"
                    className="p-2 rounded-lg text-muted hover:text-accent hover:bg-foreground/[0.04] transition-colors"
                    title="Reset chat"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close assistant"
                    className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
                    title="Close (Esc)"
                  >
                    <X size={16} />
                  </button>
                </div>
              </header>

              {/* Scroller */}
              <div
                ref={scrollerRef}
                className="flex-1 overflow-y-auto px-5 py-6 space-y-6"
              >
                {messages.map((m) =>
                  m.role === "user" ? (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-accent/25 bg-accent/10 px-3.5 py-2 text-[13.5px] text-foreground/92 leading-[1.55]">
                        {m.content}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-5"
                    >
                      {m.answers.map((a, i) => renderAnswer(m, i, a))}
                    </motion.div>
                  ),
                )}

                {pending && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center gap-1.5 pl-4"
                  >
                    <span className="h-px w-3 bg-accent/60" />
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          delay: i * 0.14,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Suggestions row (persistent) */}
              <div className="px-5 pt-2 pb-3 border-t border-foreground/[0.06]">
                <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
                  {suggestionPool.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="shrink-0 inline-flex items-center gap-1 rounded-full border border-foreground/[0.1] bg-foreground/[0.02] px-3 py-1.5 text-[12px] text-muted-foreground hover:border-accent/40 hover:text-accent hover:bg-accent/[0.05] transition-colors whitespace-nowrap"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
                className="border-t border-foreground/[0.06] bg-background/60 p-4"
              >
                <div className="flex items-end gap-2 rounded-2xl border border-foreground/[0.12] bg-background/70 px-3.5 py-2.5 focus-within:border-accent/50 transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
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
                    placeholder="Ask about projects, stack, metrics, contact…"
                    className="flex-1 resize-none bg-transparent text-[14px] leading-[1.55] placeholder:text-muted/70 outline-none max-h-32"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || pending}
                    aria-label="Send"
                    className="shrink-0 h-9 w-9 rounded-xl bg-accent text-[#050607] grid place-items-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-hover transition-all hover:scale-[1.04] active:scale-95"
                  >
                    <ArrowUp size={16} />
                  </button>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[10.5px] font-mono uppercase tracking-[0.22em] text-muted">
                  <span>Local inference · 0 tokens off-device</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Command size={10} /> shift · enter for newline
                  </span>
                </div>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
