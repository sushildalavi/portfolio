"use client"

import { Suspense, lazy } from "react"

/**
 * Splite — port of Serafim's 21st.dev component (@splinetool/react-spline
 * wrapper). Loads a Spline scene from a public .splinecode URL.
 *
 * Implementation notes:
 *   - The underlying `Spline` component is heavy (~1MB). Lazy + Suspense.
 *   - `prefers-reduced-motion` users get a static placeholder (the scene
 *     auto-animates and ships a full 3D engine; too much for that audience).
 *   - scene URLs come from https://spline.design/ — any user-exported
 *     .splinecode works.
 */

const Spline = lazy(() => import("@splinetool/react-spline"))

export default function Splite({
  scene,
  className = "",
  fallback,
}: {
  scene: string
  className?: string
  fallback?: React.ReactNode
}) {
  return (
    <div className={`relative ${className}`}>
      <Suspense
        fallback={
          fallback ?? (
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.24em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Loading scene
              </div>
            </div>
          )
        }
      >
        <Spline scene={scene} />
      </Suspense>
    </div>
  )
}
