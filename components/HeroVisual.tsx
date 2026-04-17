"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Splite from "./Splite"

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

/**
 * Hero's 3D visual. Primary renderer is Splite (Serafim's Spline
 * wrapper); on load failure we transparently fall back to HeroScene
 * (react-three-fiber icosahedron) so the slot never stays empty.
 */
export default function HeroVisual({
  className = "",
  /**
   * Default scene is a generic placeholder from Spline. Swap to any
   * .splinecode URL exported from spline.design to change the hero
   * visual without touching code elsewhere.
   */
  scene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
}: {
  className?: string
  scene?: string
}) {
  const [sceneFailed, setSceneFailed] = useState(false)
  const [reachable, setReachable] = useState<boolean | null>(null)

  // Pre-flight check — if the .splinecode URL isn't reachable within
  // 2s, skip straight to the fallback. Avoids a stuck "Loading scene".
  useEffect(() => {
    let cancelled = false
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 2200)

    fetch(scene, { method: "HEAD", mode: "cors", signal: ctrl.signal })
      .then((r) => {
        if (!cancelled) setReachable(r.ok)
      })
      .catch(() => {
        if (!cancelled) setReachable(false)
      })
      .finally(() => clearTimeout(timer))

    return () => {
      cancelled = true
      ctrl.abort()
      clearTimeout(timer)
    }
  }, [scene])

  if (reachable === false || sceneFailed) {
    return <HeroScene className={className} />
  }

  return (
    <div className={className}>
      <ErrorBoundary onError={() => setSceneFailed(true)}>
        <Splite scene={scene} className="w-full h-full" />
      </ErrorBoundary>
    </div>
  )
}

/** Minimal class-based error boundary for Splite's lazy chunk. */
import React from "react"
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch() {
    this.props.onError()
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}
