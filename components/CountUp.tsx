"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface CountUpProps {
  value: string
  className?: string
}

export default function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!inView) return

    const numMatch = value.match(/[\d.]+/)
    if (!numMatch) {
      setDisplay(value)
      return
    }

    const target = parseFloat(numMatch[0])
    const prefix = value.slice(0, numMatch.index)
    const suffix = value.slice((numMatch.index ?? 0) + numMatch[0].length)
    const isFloat = numMatch[0].includes(".")
    const decimals = isFloat ? (numMatch[0].split(".")[1]?.length ?? 0) : 0

    const duration = 1200
    const steps = 40
    const stepTime = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current++
      const progress = current / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const val = target * eased

      setDisplay(
        `${prefix}${isFloat ? val.toFixed(decimals) : Math.round(val)}${suffix}`
      )

      if (current >= steps) {
        clearInterval(timer)
        setDisplay(value)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {display}
    </motion.span>
  )
}
