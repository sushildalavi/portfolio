"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type CursorState = {
  active: boolean
  emphatic: boolean
}

const defaultState: CursorState = {
  active: false,
  emphatic: false,
}

const ACTION_SELECTOR =
  "a, button, input, textarea, select, summary, [role='button'], [data-hover='interactive'], [data-hover='link']"

const SURFACE_SELECTOR = ".card-glow, [data-hover='card'], [data-hover='surface']"

const shellSpring = {
  type: "spring",
  damping: 24,
  stiffness: 420,
  mass: 0.34,
} as const

const glyphSpring = {
  damping: 22,
  stiffness: 360,
  mass: 0.28,
} as const

function resolveState(target: EventTarget | null): CursorState {
  if (!(target instanceof HTMLElement)) {
    return defaultState
  }

  const isSurface = Boolean(target.closest(SURFACE_SELECTOR))
  const isAction = Boolean(target.closest(ACTION_SELECTOR))

  return {
    active: isSurface || isAction,
    emphatic: isAction && !isSurface,
  }
}

function CursorGlyph() {
  return (
    <div className="relative flex h-3.5 w-3.5 items-center justify-center">
      <ArrowUpRight size={12} strokeWidth={2.35} />
      <span className="absolute bottom-[2px] left-[3px] h-px w-2 rounded-full bg-current/70" />
    </div>
  )
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState(defaultState)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  const shellX = useSpring(x, { damping: 24, stiffness: 520, mass: 0.22 })
  const shellY = useSpring(y, { damping: 24, stiffness: 520, mass: 0.22 })
  const washX = useSpring(x, { damping: 20, stiffness: 300, mass: 0.5 })
  const washY = useSpring(y, { damping: 20, stiffness: 300, mass: 0.5 })
  const auraX = useSpring(x, { damping: 18, stiffness: 220, mass: 0.7 })
  const auraY = useSpring(y, { damping: 18, stiffness: 220, mass: 0.7 })

  const hoveredStateRef = useRef(defaultState)
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

    const syncState = (nextState: CursorState) => {
      hoveredStateRef.current = nextState
      if (!pressedRef.current) {
        setState(nextState)
      }
    }

    const hideCursor = () => {
      setVisible(false)
      hoveredStateRef.current = defaultState
      if (!pressedRef.current) {
        setState(defaultState)
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

      syncState(resolveState(event.target))
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
      syncState(resolveState(event.target))
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

  const { active, emphatic } = state

  const shellSize = pressed ? 22 : active ? (emphatic ? 38 : 34) : 18
  const shellRotation = pressed ? -6 : active ? -8 : -12
  const shellRadius = pressed ? 14 : active ? 18 : 10
  const shellColor = pressed ? "var(--bg-primary)" : "var(--accent-val)"
  const shellBorderColor = pressed
    ? "transparent"
    : active
      ? "color-mix(in srgb, var(--accent-val) 64%, transparent)"
      : "color-mix(in srgb, var(--accent-val) 32%, transparent)"
  const shellBackground = pressed
    ? "var(--accent-val)"
    : active
      ? "color-mix(in srgb, var(--accent-val) 18%, transparent)"
      : "color-mix(in srgb, var(--accent-val) 10%, transparent)"
  const shellShadow = pressed
    ? "0 14px 32px color-mix(in srgb, var(--accent-val) 28%, transparent)"
    : active
      ? "0 16px 34px color-mix(in srgb, var(--accent-val) 18%, transparent)"
      : "0 10px 24px color-mix(in srgb, var(--accent-val) 10%, transparent)"
  const washWidth = pressed ? 52 : active ? (emphatic ? 92 : 76) : 34
  const washHeight = pressed ? 52 : active ? 26 : 16
  const auraSize = pressed ? 52 : active ? (emphatic ? 118 : 98) : 48
  const auraBackground = active
    ? "radial-gradient(circle, color-mix(in srgb, var(--accent-val) 18%, transparent) 0%, transparent 72%)"
    : "radial-gradient(circle, color-mix(in srgb, var(--accent-val) 12%, transparent) 0%, transparent 72%)"

  return (
    <>
      <motion.div
        data-cursor-wash
        className="fixed left-0 top-0 z-[9996] pointer-events-none rounded-full blur-[18px]"
        style={{
          x: washX,
          y: washY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--accent-val) 0%, transparent), color-mix(in srgb, var(--accent-val) 20%, transparent), color-mix(in srgb, var(--accent-val) 0%, transparent))",
        }}
        animate={{
          width: washWidth,
          height: washHeight,
          opacity: visible ? (pressed ? 0.2 : active ? 0.28 : 0.12) : 0,
          scale: visible ? (pressed ? 0.88 : 1) : 0.68,
          rotate: shellRotation + 10,
        }}
        transition={shellSpring}
      />

      <motion.div
        data-cursor-aura
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
          opacity: visible ? (pressed ? 0.2 : active ? 0.24 : 0.14) : 0,
          scale: visible ? (pressed ? 0.82 : 1) : 0.7,
        }}
        transition={shellSpring}
      />

      <motion.div
        data-cursor-shell
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
          borderWidth: pressed ? 0 : active ? 1.4 : 1,
          borderColor: shellBorderColor,
          backgroundColor: shellBackground,
        }}
        transition={shellSpring}
      >
        <motion.span
          className="pointer-events-none absolute inset-x-[22%] top-[18%] h-px rounded-full bg-white/35"
          animate={{
            opacity: pressed ? 0 : active ? 0.5 : 0.26,
            scaleX: active ? 1 : 0.72,
          }}
          transition={glyphSpring}
        />

        <motion.div
          className="relative z-10 flex items-center justify-center"
          animate={{
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.86 : active ? 1 : 0.78,
            x: active ? 0.5 : 0,
            y: active ? -0.5 : 0,
          }}
          transition={glyphSpring}
        >
          <CursorGlyph />
        </motion.div>
      </motion.div>
    </>
  )
}
