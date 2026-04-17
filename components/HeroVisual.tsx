"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import Splite from "./Splite"

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

/**
 * Hero's 3D visual. Primary renderer is Splite (Serafim's Spline
 * wrapper) loading the interactive robot scene; if Splite throws
 * during load/render we transparently fall back to HeroScene
 * (react-three-fiber icosahedron).
 *
 * Swap the `scene` prop to any .splinecode URL exported from
 * https://spline.design to change the hero visual without touching
 * other files.
 */
export default function HeroVisual({
  className = "",
  /**
   * Spline's "Interactive AI / Model Scene" demo. Swap to any
   * .splinecode URL you export from https://spline.design to pin a
   * different scene — e.g. the Robot-follows-cursor scene from
   * Serafim's 21st.dev demo (requires publishing it yourself; the
   * 21st.dev asset URL is not publicly fetchable across origins).
   */
  scene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
}: {
  className?: string
  scene?: string
}) {
  const [sceneFailed, setSceneFailed] = useState(false)

  if (sceneFailed) {
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
