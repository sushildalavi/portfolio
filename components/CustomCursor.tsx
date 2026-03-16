"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion"

type CursorMode = "default" | "interactive" | "card"

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, summary, [role='button'], [data-hover='interactive'], [data-hover='link']"

const CARD_SELECTOR = ".card-glow, [data-hover='card']"

const shellSpring = {
  type: "spring",
  damping: 28,
  stiffness: 360,
  mass: 0.42,
} as const

const glyphSpring = {
  type: "spring",
  damping: 24,
  stiffness: 420,
  mass: 0.32,
} as const

function resolveMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof HTMLElement)) {
    return "default"
  }

  if (target.closest(INTERACTIVE_SELECTOR)) {
    return "interactive"
  }

  if (target.closest(CARD_SELECTOR)) {
    return "card"
  }

  return "default"
}

function DefaultGlyph() {
  return (
    <div className="relative h-3.5 w-3.5">
      <span className="absolute inset-0 rotate-45 rounded-[3px] border border-current/80" />
      <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current/70" />
    </div>
  )
}

function CardGlyph() {
  return (
    <div className="relative h-4 w-4">
      <span className="absolute inset-0 rotate-45 rounded-[3px] border border-current/70" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current/70" />
    </div>
  )
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>("default")
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  const shellX = useSpring(x, { damping: 26, stiffness: 420, mass: 0.28 })
  const shellY = useSpring(y, { damping: 26, stiffness: 420, mass: 0.28 })
  const auraX = useSpring(x, { damping: 20, stiffness: 260, mass: 0.6 })
  const auraY = useSpring(y, { damping: 20, stiffness: 260, mass: 0.6 })

  const hoveredModeRef = useRef<CursorMode>("default")
  const pressedRef = useRef(false)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const enableFrame = window.requestAnimationFrame(() => {
      setEnabled(true)
    })

    const syncMode = (nextMode: CursorMode) => {
      hoveredModeRef.current = nextMode
      if (!pressedRef.current) {
        setMode(nextMode)
      }
    }

    const hideCursor = () => {
      setVisible(false)
      hoveredModeRef.current = "default"
      if (!pressedRef.current) {
        setMode("default")
      }
    }

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return
      }

      setVisible(true)
      x.set(event.clientX)
      y.set(event.clientY)
    }

    const handleOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return
      }

      syncMode(resolveMode(event.target))
    }

    const handleDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return
      }

      pressedRef.current = true
      setPressed(true)
    }

    const handleUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return
      }

      pressedRef.current = false
      setPressed(false)
      syncMode(resolveMode(event.target))
    }

    const handleWindowOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        hideCursor()
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hideCursor()
      }
    }

    window.addEventListener("pointermove", handleMove, { passive: true })
    document.addEventListener("pointerover", handleOver)
    document.addEventListener("pointerdown", handleDown)
    document.addEventListener("pointerup", handleUp)
    window.addEventListener("mouseout", handleWindowOut)
    window.addEventListener("blur", hideCursor)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.cancelAnimationFrame(enableFrame)
      window.removeEventListener("pointermove", handleMove)
      document.removeEventListener("pointerover", handleOver)
      document.removeEventListener("pointerdown", handleDown)
      document.removeEventListener("pointerup", handleUp)
      window.removeEventListener("mouseout", handleWindowOut)
      window.removeEventListener("blur", hideCursor)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [x, y])

  if (!enabled) {
    return null
  }

  const isInteractive = mode === "interactive"
  const isCard = mode === "card"

  const shellSize = pressed ? 24 : isInteractive ? 42 : isCard ? 54 : 18
  const auraSize = pressed ? 58 : isInteractive ? 94 : isCard ? 116 : 52
  const shellRotation = pressed ? 0 : isInteractive ? 0 : isCard ? 0 : 45
  const shellRadius = pressed ? 999 : isInteractive ? 999 : isCard ? 20 : 7
  const shellColor = pressed ? "var(--bg-primary)" : "var(--accent-val)"
  const shellBorderColor = pressed
    ? "transparent"
    : isInteractive
      ? "color-mix(in srgb, var(--accent-val) 72%, transparent)"
      : isCard
        ? "color-mix(in srgb, var(--accent-val) 48%, transparent)"
        : "color-mix(in srgb, var(--accent-val) 58%, transparent)"
  const shellBackground = pressed
    ? "var(--accent-val)"
    : isInteractive
      ? "color-mix(in srgb, var(--accent-val) 20%, transparent)"
      : isCard
        ? "color-mix(in srgb, var(--accent-val) 12%, transparent)"
        : "color-mix(in srgb, var(--accent-val) 10%, transparent)"
  const shellShadow = pressed
    ? "0 12px 30px color-mix(in srgb, var(--accent-val) 32%, transparent)"
    : isInteractive
      ? "0 10px 28px color-mix(in srgb, var(--accent-val) 18%, transparent)"
      : isCard
        ? "0 12px 36px color-mix(in srgb, var(--accent-val) 14%, transparent)"
        : "0 8px 22px color-mix(in srgb, var(--accent-val) 12%, transparent)"
  const auraBackground = isInteractive
    ? "radial-gradient(circle, color-mix(in srgb, var(--accent-val) 22%, transparent) 0%, transparent 68%)"
    : isCard
      ? "radial-gradient(circle, color-mix(in srgb, var(--accent-val) 16%, transparent) 0%, transparent 70%)"
      : "radial-gradient(circle, color-mix(in srgb, var(--accent-val) 14%, transparent) 0%, transparent 70%)"

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full blur-[18px]"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          background: auraBackground,
        }}
        animate={{
          width: auraSize,
          height: auraSize,
          opacity: visible ? (pressed ? 0.24 : isInteractive ? 0.3 : isCard ? 0.22 : 0.16) : 0,
          scale: visible ? (pressed ? 0.82 : 1) : 0.7,
        }}
        transition={shellSpring}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center overflow-hidden border"
        style={{
          x: shellX,
          y: shellY,
          translateX: "-50%",
          translateY: "-50%",
          color: shellColor,
          boxShadow: shellShadow,
          backdropFilter: "blur(14px)",
        }}
        animate={{
          width: shellSize,
          height: shellSize,
          opacity: visible ? 1 : 0,
          scale: visible ? (pressed ? 0.92 : 1) : 0.72,
          rotate: shellRotation,
          borderRadius: shellRadius,
          borderWidth: pressed ? 0 : isInteractive ? 1.5 : 1,
          borderColor: shellBorderColor,
          backgroundColor: shellBackground,
        }}
        transition={shellSpring}
      >
        <motion.span
          className="pointer-events-none absolute inset-x-[22%] top-[18%] h-px rounded-full bg-white/35"
          animate={{
            opacity: pressed ? 0 : isInteractive ? 0.4 : 0.26,
            scaleX: isInteractive ? 1 : 0.8,
          }}
          transition={glyphSpring}
        />

        <AnimatePresence mode="wait" initial={false}>
          {pressed ? (
            <motion.div
              key="pressed"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={glyphSpring}
              className="h-1.5 w-1.5 rounded-full bg-current"
            />
          ) : isInteractive ? (
            <motion.div
              key="interactive"
              initial={{ opacity: 0, scale: 0.65, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.65, rotate: 18 }}
              transition={glyphSpring}
              className="flex items-center justify-center"
            >
              <ArrowUpRight size={14} strokeWidth={2.1} />
            </motion.div>
          ) : isCard ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={glyphSpring}
            >
              <CardGlyph />
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 12 }}
              transition={glyphSpring}
              className="-rotate-45"
            >
              <DefaultGlyph />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
