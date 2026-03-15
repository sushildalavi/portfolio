import type { MouseEvent } from "react"

export function getTiltTransform(
  e: MouseEvent<HTMLElement>,
  intensity = 6
): string {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
  return `perspective(600px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02, 1.02, 1.02)`
}
