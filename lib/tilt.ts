import type { MouseEvent, CSSProperties } from "react"

export function getTiltTransform(
  e: MouseEvent<HTMLElement>,
  intensity = 6
): string {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
  return `perspective(600px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02, 1.02, 1.02)`
}

/** Returns transform + CSS vars for the card spotlight effect */
export function getCardStyle(
  e: MouseEvent<HTMLElement>,
  intensity = 6
): CSSProperties {
  const rect = e.currentTarget.getBoundingClientRect()
  const rx = (e.clientX - rect.left) / rect.width
  const ry = (e.clientY - rect.top) / rect.height
  const tx = (rx - 0.5) * 2
  const ty = (ry - 0.5) * 2
  return {
    transform: `perspective(600px) rotateX(${-ty * intensity}deg) rotateY(${tx * intensity}deg) scale3d(1.02, 1.02, 1.02)`,
    "--mouse-x": `${rx * 100}%`,
    "--mouse-y": `${ry * 100}%`,
  } as CSSProperties
}
