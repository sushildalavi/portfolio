"use client"

import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Float,
  MeshDistortMaterial,
  Environment,
  Icosahedron,
  OrbitControls,
} from "@react-three/drei"
import * as THREE from "three"

/**
 * Spline-like 3D hero visual — a distorting icosahedron wrapped in
 * chromatic wireframe, floating with subtle mouse-parallax. Pure
 * react-three-fiber, no external .splinecode assets, no network.
 */

function MorphingShape({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.18
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.15
    const mx = state.mouse.x
    const my = state.mouse.y
    ref.current.rotation.y += mx * 0.3
    ref.current.rotation.x += my * 0.2
  })

  const accent = isDark ? "#10b981" : "#059669"
  const secondary = isDark ? "#38bdf8" : "#0369a1"

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
      <Icosahedron args={[1.2, 2]} ref={ref}>
        <MeshDistortMaterial
          color={accent}
          roughness={0.25}
          metalness={0.65}
          distort={0.38}
          speed={1.4}
          emissive={accent}
          emissiveIntensity={0.28}
        />
      </Icosahedron>

      <Icosahedron args={[1.56, 1]}>
        <meshBasicMaterial
          color={secondary}
          wireframe
          transparent
          opacity={0.28}
        />
      </Icosahedron>

      <Icosahedron args={[1.82, 0]}>
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={0.18}
        />
      </Icosahedron>
    </Float>
  )
}

function Particles({ count = 160, isDark }: { count?: number; isDark: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.5
    }
    return arr
  }, [count])

  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.y = s.clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        color={isDark ? "#6ee7b7" : "#10b981"}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  )
}

export default function HeroScene({
  className = "",
  theme = "dark",
}: {
  className?: string
  theme?: "dark" | "light"
}) {
  const isDark = theme === "dark"
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 4, 5]} intensity={0.7} />
        <pointLight position={[-3, 2, -2]} intensity={0.6} color={isDark ? "#38bdf8" : "#0369a1"} />

        <Suspense fallback={null}>
          <MorphingShape isDark={isDark} />
          <Particles isDark={isDark} />
          <Environment preset="night" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  )
}
