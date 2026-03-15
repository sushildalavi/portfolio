"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, RoundedBox, Sparkles } from "@react-three/drei"
import * as THREE from "three"

type Emote = "typing" | "drinking" | "nodding" | "celebrating"

type EmoteSegment = {
  emote: Emote
  duration: number
}

type TimelineState = {
  emote: Emote
  raw: number
}

const EMOTE_SEQUENCE: EmoteSegment[] = [
  { emote: "typing", duration: 5.6 },
  { emote: "drinking", duration: 3.6 },
  { emote: "typing", duration: 4.6 },
  { emote: "nodding", duration: 2.3 },
  { emote: "typing", duration: 3.8 },
  { emote: "celebrating", duration: 3.3 },
]

const TOTAL_CYCLE = EMOTE_SEQUENCE.reduce(
  (total, segment) => total + segment.duration,
  0
)

const displayVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const displayFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uVariant;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * mix(0.42, 0.62, uVariant);

    vec3 bgA = mix(vec3(0.02, 0.03, 0.06), vec3(0.03, 0.03, 0.09), uVariant);
    vec3 bgB = mix(vec3(0.06, 0.10, 0.18), vec3(0.04, 0.08, 0.16), uVariant);
    vec3 lineA = mix(vec3(0.28, 0.85, 0.78), vec3(0.31, 0.63, 0.98), uVariant);
    vec3 lineB = mix(vec3(1.00, 0.80, 0.28), vec3(0.12, 0.96, 0.62), uVariant);
    vec3 lineC = mix(vec3(0.86, 0.46, 0.88), vec3(0.96, 0.65, 0.42), uVariant);

    vec3 color = mix(bgA, bgB, uv.y);

    float scan = 0.03 * sin((uv.y + t * 0.18) * 280.0);
    color += scan;

    float graph = smoothstep(0.03, 0.0, abs(uv.y - (0.30 + uv.x * 0.12 + sin((uv.x * 8.0 + t * 1.8) * 6.28318) * 0.035)));
    float echo = smoothstep(0.02, 0.0, abs(uv.y - (0.58 - uv.x * 0.08 + sin((uv.x * 5.0 + t * 1.2) * 6.28318) * 0.03)));
    color = mix(color, lineA, graph * 0.9);
    color = mix(color, lineB, echo * 0.6);

    float row = floor((uv.y + t * 0.06) * 16.0);
    float band = step(0.16, fract((uv.y + t * 0.06) * 16.0)) * step(fract((uv.y + t * 0.06) * 16.0), 0.72);
    float indent = 0.08 + floor(hash(vec2(row, 1.0)) * 4.0) * 0.06;
    float width1 = 0.12 + hash(vec2(row, 2.0)) * 0.28;
    float width2 = 0.08 + hash(vec2(row, 3.0)) * 0.16;
    float block1 = step(indent, uv.x) * step(uv.x, indent + width1) * band;
    float block2 = step(indent + width1 + 0.03, uv.x) * step(uv.x, indent + width1 + 0.03 + width2) * band * step(0.35, hash(vec2(row, 4.0)));
    color = mix(color, lineC, clamp(block1 + block2, 0.0, 1.0) * 0.36);

    float ring = smoothstep(0.19, 0.17, abs(length(uv - vec2(0.82, 0.24)) - 0.10));
    color = mix(color, lineB, ring * 0.8);

    float vignette = 1.0 - smoothstep(0.38, 0.92, length((uv - 0.5) * vec2(1.2, 1.0)));
    color *= 0.82 + vignette * 0.42;

    gl_FragColor = vec4(color, 1.0);
  }
`

function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1)
}

function easeInOut(value: number) {
  return value * value * (3 - 2 * value)
}

function getTimelineState(time: number): TimelineState {
  const cycleTime = time % TOTAL_CYCLE
  let elapsed = 0

  for (const segment of EMOTE_SEQUENCE) {
    if (cycleTime <= elapsed + segment.duration) {
      return {
        emote: segment.emote,
        raw: clamp01((cycleTime - elapsed) / segment.duration),
      }
    }

    elapsed += segment.duration
  }

  return { emote: "typing", raw: 0 }
}

function createCurvedPlaneGeometry(
  width: number,
  height: number,
  segments: number,
  curveDepth: number
) {
  const geometry = new THREE.PlaneGeometry(width, height, segments, 1)
  const positions = geometry.attributes.position as THREE.BufferAttribute

  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index)
    const normalizedX = x / (width * 0.5)
    const curve =
      Math.cos(normalizedX * Math.PI * 0.5) * curveDepth - curveDepth
    positions.setZ(index, curve)
  }

  positions.needsUpdate = true
  geometry.computeVertexNormals()
  return geometry
}

function ScreenSurface({
  width,
  height,
  variant,
  curved = false,
  curveDepth = 0.04,
}: {
  width: number
  height: number
  variant: "laptop" | "monitor"
  curved?: boolean
  curveDepth?: number
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uVariant: { value: variant === "monitor" ? 1 : 0 },
    }),
    [variant]
  )

  const geometry = useMemo(
    () =>
      curved
        ? createCurvedPlaneGeometry(width, height, 48, curveDepth)
        : new THREE.PlaneGeometry(width, height, 1, 1),
    [curveDepth, curved, height, width]
  )

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state) => {
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
  })

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={displayVertexShader}
        fragmentShader={displayFragmentShader}
      />
    </mesh>
  )
}

function Steam({ active = true }: { active?: boolean }) {
  const puffs = useRef<Array<THREE.Mesh | null>>([])
  const offsets = useMemo(() => Array.from({ length: 6 }, (_, index) => index / 6), [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    puffs.current.forEach((puff, index) => {
      if (!puff) return

      const progress = (time * 0.24 + offsets[index]) % 1
      puff.position.set(
        Math.sin(progress * Math.PI * 2 + index) * 0.02,
        0.05 + progress * 0.2,
        Math.cos(progress * Math.PI * 2 + index * 1.4) * 0.012
      )

      const scale = 0.35 + progress * 0.9
      puff.scale.setScalar(scale)

      const material = puff.material as THREE.MeshBasicMaterial
      material.opacity = active ? (1 - progress) * 0.16 : 0
    })
  })

  return (
    <group position={[0, 0.02, 0]}>
      {offsets.map((offset, index) => (
        <mesh
          key={offset}
          ref={(node) => {
            puffs.current[index] = node
          }}
        >
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshBasicMaterial color="#f8fafc" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function CoffeeCup({ activeSteam = true }: { activeSteam?: boolean }) {
  return (
    <group>
      <mesh castShadow position={[0, 0.055, 0]}>
        <cylinderGeometry args={[0.045, 0.038, 0.11, 24]} />
        <meshStandardMaterial color="#faf7f3" roughness={0.28} metalness={0.06} />
      </mesh>
      <mesh position={[0.05, 0.055, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.024, 0.006, 10, 18, Math.PI * 1.18]} />
        <meshStandardMaterial color="#faf7f3" roughness={0.24} metalness={0.06} />
      </mesh>
      <mesh position={[0, 0.104, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.034, 24]} />
        <meshStandardMaterial color="#3f2415" roughness={0.72} />
      </mesh>
      <Steam active={activeSteam} />
    </group>
  )
}

function LaptopKeyboard() {
  const keys = useMemo(() => {
    const rows = 4
    const columns = 11
    const generated: Array<{ x: number; z: number; width: number }> = []

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        generated.push({
          x: -0.2 + column * 0.04 + (row % 2 === 0 ? 0 : 0.01),
          z: -0.06 + row * 0.045,
          width: column === columns - 1 ? 0.052 : 0.032,
        })
      }
    }

    return generated
  }, [])

  return (
    <group position={[0, 0.016, 0.015]}>
      {keys.map((key, index) => (
        <mesh key={`${key.x}-${key.z}-${index}`} castShadow position={[key.x, 0, key.z]}>
          <boxGeometry args={[key.width, 0.004, 0.028]} />
          <meshStandardMaterial color="#131722" roughness={0.28} metalness={0.36} />
        </mesh>
      ))}

      <RoundedBox args={[0.26, 0.004, 0.16]} radius={0.012} smoothness={4} position={[0.02, 0, 0.165]}>
        <meshStandardMaterial color="#cfd4dc" roughness={0.2} metalness={0.82} />
      </RoundedBox>
    </group>
  )
}

function MacBookAir() {
  const hingeGlowRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const material = hingeGlowRef.current.material as THREE.MeshStandardMaterial
    material.emissiveIntensity = 0.26 + Math.sin(state.clock.getElapsedTime() * 1.6) * 0.06
  })

  return (
    <group position={[0.58, 1.08, 0.16]} rotation={[0, -0.54, 0]}>
      <RoundedBox args={[0.82, 0.035, 0.56]} radius={0.03} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#d5dae1" metalness={0.92} roughness={0.14} />
      </RoundedBox>

      <LaptopKeyboard />

      <group position={[0, 0.31, -0.21]} rotation={[-0.26, 0, 0]}>
        <RoundedBox args={[0.82, 0.54, 0.02]} radius={0.026} smoothness={4} castShadow>
          <meshStandardMaterial color="#141923" metalness={0.84} roughness={0.16} />
        </RoundedBox>

        <mesh position={[0, 0, 0.012]}>
          <ScreenSurface width={0.75} height={0.46} variant="laptop" />
        </mesh>

        <RoundedBox args={[0.09, 0.018, 0.004]} radius={0.004} smoothness={4} position={[0, 0.257, 0.014]}>
          <meshStandardMaterial color="#1a2230" roughness={0.28} />
        </RoundedBox>
      </group>

      <mesh ref={hingeGlowRef} position={[0, 0.018, -0.22]}>
        <boxGeometry args={[0.44, 0.016, 0.02]} />
        <meshStandardMaterial
          color="#8a92a0"
          metalness={0.92}
          roughness={0.12}
          emissive="#6ec5ff"
          emissiveIntensity={0.24}
        />
      </mesh>
    </group>
  )
}

function AlienwareMonitor() {
  const bezelGeometry = useMemo(
    () => createCurvedPlaneGeometry(1.2, 0.72, 52, 0.055),
    []
  )
  const haloRef = useRef<THREE.Mesh>(null!)

  useEffect(() => () => bezelGeometry.dispose(), [bezelGeometry])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    haloRef.current.rotation.z = time * 0.28
    const material = haloRef.current.material as THREE.MeshStandardMaterial
    material.emissiveIntensity = 0.48 + Math.sin(time * 2.0) * 0.12
  })

  return (
    <group position={[-0.12, 1.1, -0.28]}>
      <mesh geometry={bezelGeometry} castShadow receiveShadow position={[0, 0.52, -0.03]}>
        <meshStandardMaterial color="#0f1623" metalness={0.68} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.52, -0.002]}>
        <ScreenSurface
          width={1.08}
          height={0.64}
          variant="monitor"
          curved
          curveDepth={0.046}
        />
      </mesh>

      <mesh ref={haloRef} position={[0, 0.53, -0.12]} rotation={[0.28, 0.12, 0]}>
        <torusGeometry args={[0.26, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#82b4ff"
          emissive="#82b4ff"
          emissiveIntensity={0.48}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      <RoundedBox args={[0.14, 0.38, 0.08]} radius={0.03} smoothness={4} castShadow position={[0, 0.16, 0.03]}>
        <meshStandardMaterial color="#171d28" roughness={0.32} metalness={0.62} />
      </RoundedBox>

      <RoundedBox args={[0.42, 0.05, 0.18]} radius={0.03} smoothness={4} castShadow position={[0, 0.0, 0.08]}>
        <meshStandardMaterial color="#171d28" roughness={0.32} metalness={0.62} />
      </RoundedBox>

      <RoundedBox args={[0.22, 0.04, 0.06]} radius={0.02} smoothness={4} castShadow position={[-0.16, -0.06, 0.1]} rotation={[0, 0, 0.52]}>
        <meshStandardMaterial color="#171d28" roughness={0.32} metalness={0.62} />
      </RoundedBox>

      <RoundedBox args={[0.22, 0.04, 0.06]} radius={0.02} smoothness={4} castShadow position={[0.16, -0.06, 0.1]} rotation={[0, 0, -0.52]}>
        <meshStandardMaterial color="#171d28" roughness={0.32} metalness={0.62} />
      </RoundedBox>

      <RoundedBox args={[0.14, 0.016, 0.012]} radius={0.004} smoothness={4} position={[0, 0.21, 0.028]}>
        <meshStandardMaterial
          color="#60f0c3"
          emissive="#60f0c3"
          emissiveIntensity={0.72}
          roughness={0.18}
        />
      </RoundedBox>
    </group>
  )
}

function Desk() {
  return (
    <group position={[0.1, 0, 0.02]}>
      <RoundedBox args={[2.1, 0.07, 0.98]} radius={0.04} smoothness={4} castShadow receiveShadow position={[0, 1.03, 0]}>
        <meshStandardMaterial color="#724421" roughness={0.52} metalness={0.12} />
      </RoundedBox>

      <RoundedBox args={[1.34, 0.012, 0.5]} radius={0.02} smoothness={4} position={[0.02, 1.07, 0.04]}>
        <meshStandardMaterial color="#0f1726" roughness={0.74} metalness={0.08} />
      </RoundedBox>

      {[
        [-0.98, 0.51, -0.38],
        [0.98, 0.51, -0.38],
        [-0.98, 0.51, 0.38],
        [0.98, 0.51, 0.38],
      ].map(([x, y, z]) => (
        <RoundedBox
          key={`${x}-${z}`}
          args={[0.08, 1.02, 0.08]}
          radius={0.02}
          smoothness={4}
          castShadow
          position={[x, y, z]}
        >
          <meshStandardMaterial color="#1b2431" roughness={0.42} metalness={0.56} />
        </RoundedBox>
      ))}

      <RoundedBox args={[1.28, 0.045, 0.12]} radius={0.02} smoothness={4} castShadow position={[0, 0.74, -0.4]}>
        <meshStandardMaterial color="#1c2532" roughness={0.4} metalness={0.58} />
      </RoundedBox>
    </group>
  )
}

function Character() {
  const rootRef = useRef<THREE.Group>(null!)
  const torsoRef = useRef<THREE.Group>(null!)
  const headRef = useRef<THREE.Group>(null!)
  const leftUpperArmRef = useRef<THREE.Group>(null!)
  const rightUpperArmRef = useRef<THREE.Group>(null!)
  const leftLowerArmRef = useRef<THREE.Group>(null!)
  const rightLowerArmRef = useRef<THREE.Group>(null!)
  const leftUpperLegRef = useRef<THREE.Group>(null!)
  const rightUpperLegRef = useRef<THREE.Group>(null!)
  const leftLowerLegRef = useRef<THREE.Group>(null!)
  const rightLowerLegRef = useRef<THREE.Group>(null!)
  const cupRef = useRef<THREE.Group>(null!)

  const jersey = "#0a2448"
  const jerseyShadow = "#071936"
  const jerseyTrim = "#d4b057"
  const shorts = "#0c1f42"
  const skin = "#d7a27d"
  const hair = "#151821"
  const socks = "#eef2ff"
  const boots = "#131722"

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const timeline = getTimelineState(time)
    const typing = Math.sin(time * 7.8)
    const idle = Math.sin(time * 1.8) * 0.018

    let rootY = idle
    let torsoX = 0.18
    let torsoY = -0.1 + Math.sin(time * 0.7) * 0.04
    let torsoZ = 0
    let headX = 0.05 + idle * 0.6
    let headY = -0.14 + Math.sin(time * 0.55) * 0.05
    let headZ = Math.sin(time * 0.6) * 0.025
    let leftUpperArmX = -0.84 + typing * 0.05
    let rightUpperArmX = -0.88 + Math.sin(time * 7.8 + 0.7) * 0.05
    let leftUpperArmZ = 0.24
    let rightUpperArmZ = -0.22
    let leftLowerArmX = -0.82 + Math.sin(time * 7.8 + 1.2) * 0.07
    let rightLowerArmX = -0.68 + Math.sin(time * 7.8 + 2.1) * 0.07
    const leftUpperLegX = 1.28
    const rightUpperLegX = 1.25
    const leftLowerLegX = -1.42
    const rightLowerLegX = -1.4
    let cupVisible = false
    let cupY = 0.0
    let cupZ = 0.08
    let cupRotX = 0.12

    if (timeline.emote === "drinking") {
      const lift =
        timeline.raw < 0.34
          ? easeInOut(timeline.raw / 0.34)
          : timeline.raw < 0.72
            ? 1
            : 1 - easeInOut((timeline.raw - 0.72) / 0.28)

      torsoX = 0.14
      torsoY = -0.16
      headX = 0.18 * lift + 0.02
      headY = -0.22
      headZ = 0
      rightUpperArmX = -0.9 + lift * 1.5
      rightUpperArmZ = -0.36
      rightLowerArmX = -0.72 - lift * 1.12
      leftUpperArmX = -0.78
      leftLowerArmX = -0.78
      cupVisible = lift > 0.05
      cupY = 0.02 + lift * 0.08
      cupZ = 0.08 + lift * 0.14
      cupRotX = 0.1 - lift * 0.72
    }

    if (timeline.emote === "nodding") {
      const nod = Math.sin(timeline.raw * Math.PI * 4) * 0.2
      torsoX = 0.16
      headX = 0.03 + nod
      headY = -0.15
      leftUpperArmX = -0.8
      rightUpperArmX = -0.82
      leftLowerArmX = -0.86
      rightLowerArmX = -0.76
    }

    if (timeline.emote === "celebrating") {
      const burst = Math.sin(timeline.raw * Math.PI)
      const sway = Math.sin(timeline.raw * Math.PI * 2) * 0.18
      rootY = burst * 0.05
      torsoX = 0.03
      torsoY = sway - 0.08
      torsoZ = Math.sin(timeline.raw * Math.PI * 3) * 0.04
      headX = -0.1 * burst
      headY = sway * 0.25 - 0.1
      headZ = 0
      leftUpperArmX = -0.4 + burst * 1.62
      rightUpperArmX = -0.46 + burst * 1.58
      leftUpperArmZ = 0.92 * burst
      rightUpperArmZ = -0.92 * burst
      leftLowerArmX = -0.18 - burst * 0.72
      rightLowerArmX = -0.12 - burst * 0.66
    }

    rootRef.current.position.y = THREE.MathUtils.damp(
      rootRef.current.position.y,
      0.96 + rootY,
      6,
      delta
    )

    torsoRef.current.rotation.x = THREE.MathUtils.damp(
      torsoRef.current.rotation.x,
      torsoX,
      7,
      delta
    )
    torsoRef.current.rotation.y = THREE.MathUtils.damp(
      torsoRef.current.rotation.y,
      torsoY,
      7,
      delta
    )
    torsoRef.current.rotation.z = THREE.MathUtils.damp(
      torsoRef.current.rotation.z,
      torsoZ,
      7,
      delta
    )

    headRef.current.rotation.x = THREE.MathUtils.damp(
      headRef.current.rotation.x,
      headX,
      8,
      delta
    )
    headRef.current.rotation.y = THREE.MathUtils.damp(
      headRef.current.rotation.y,
      headY,
      8,
      delta
    )
    headRef.current.rotation.z = THREE.MathUtils.damp(
      headRef.current.rotation.z,
      headZ,
      8,
      delta
    )

    leftUpperArmRef.current.rotation.x = THREE.MathUtils.damp(
      leftUpperArmRef.current.rotation.x,
      leftUpperArmX,
      8,
      delta
    )
    rightUpperArmRef.current.rotation.x = THREE.MathUtils.damp(
      rightUpperArmRef.current.rotation.x,
      rightUpperArmX,
      8,
      delta
    )
    leftUpperArmRef.current.rotation.z = THREE.MathUtils.damp(
      leftUpperArmRef.current.rotation.z,
      leftUpperArmZ,
      8,
      delta
    )
    rightUpperArmRef.current.rotation.z = THREE.MathUtils.damp(
      rightUpperArmRef.current.rotation.z,
      rightUpperArmZ,
      8,
      delta
    )
    leftLowerArmRef.current.rotation.x = THREE.MathUtils.damp(
      leftLowerArmRef.current.rotation.x,
      leftLowerArmX,
      8,
      delta
    )
    rightLowerArmRef.current.rotation.x = THREE.MathUtils.damp(
      rightLowerArmRef.current.rotation.x,
      rightLowerArmX,
      8,
      delta
    )

    leftUpperLegRef.current.rotation.x = THREE.MathUtils.damp(
      leftUpperLegRef.current.rotation.x,
      leftUpperLegX,
      8,
      delta
    )
    rightUpperLegRef.current.rotation.x = THREE.MathUtils.damp(
      rightUpperLegRef.current.rotation.x,
      rightUpperLegX,
      8,
      delta
    )
    leftLowerLegRef.current.rotation.x = THREE.MathUtils.damp(
      leftLowerLegRef.current.rotation.x,
      leftLowerLegX,
      8,
      delta
    )
    rightLowerLegRef.current.rotation.x = THREE.MathUtils.damp(
      rightLowerLegRef.current.rotation.x,
      rightLowerLegX,
      8,
      delta
    )

    cupRef.current.visible = cupVisible
    cupRef.current.position.y = THREE.MathUtils.damp(cupRef.current.position.y, cupY, 10, delta)
    cupRef.current.position.z = THREE.MathUtils.damp(cupRef.current.position.z, cupZ, 10, delta)
    cupRef.current.rotation.x = THREE.MathUtils.damp(cupRef.current.rotation.x, cupRotX, 10, delta)
  })

  return (
    <group ref={rootRef} position={[0, 0.96, 0.08]}>
      <group ref={torsoRef} position={[0, 0.28, -0.03]}>
        <mesh castShadow position={[0, 0.08, 0]}>
          <capsuleGeometry args={[0.18, 0.3, 8, 16]} />
          <meshStandardMaterial color={jersey} roughness={0.58} metalness={0.12} />
        </mesh>

        <mesh castShadow position={[0, -0.17, 0.01]}>
          <capsuleGeometry args={[0.15, 0.12, 8, 16]} />
          <meshStandardMaterial color={jerseyShadow} roughness={0.62} metalness={0.1} />
        </mesh>

        <RoundedBox args={[0.18, 0.032, 0.016]} radius={0.008} smoothness={4} position={[0, 0.27, 0.17]}>
          <meshStandardMaterial color={jerseyTrim} roughness={0.34} metalness={0.42} />
        </RoundedBox>

        <RoundedBox args={[0.08, 0.11, 0.014]} radius={0.006} smoothness={4} position={[0, 0.08, 0.17]}>
          <meshStandardMaterial color={jerseyTrim} roughness={0.34} metalness={0.42} />
        </RoundedBox>

        {[-0.12, 0, 0.12].map((x) => (
          <RoundedBox key={x} args={[0.055, 0.012, 0.012]} radius={0.004} smoothness={4} position={[x, 0.31, 0.17]}>
            <meshStandardMaterial color={jerseyTrim} roughness={0.3} metalness={0.44} />
          </RoundedBox>
        ))}
      </group>

      <group ref={headRef} position={[0, 0.84, 0.02]}>
        <mesh castShadow>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color={skin} roughness={0.76} />
        </mesh>

        <mesh position={[0, 0.09, -0.015]} scale={[1.02, 0.66, 1.02]}>
          <sphereGeometry args={[0.19, 24, 24]} />
          <meshStandardMaterial color={hair} roughness={0.86} />
        </mesh>

        <mesh position={[0, 0.03, -0.14]}>
          <boxGeometry args={[0.2, 0.12, 0.09]} />
          <meshStandardMaterial color={hair} roughness={0.86} />
        </mesh>

        <mesh position={[-0.07, 0.02, 0.16]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshStandardMaterial color="#111827" />
        </mesh>

        <mesh position={[0.07, 0.02, 0.16]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      </group>

      <group ref={leftUpperArmRef} position={[-0.23, 0.6, 0.05]}>
        <mesh castShadow position={[0, -0.16, 0]}>
          <capsuleGeometry args={[0.06, 0.24, 8, 16]} />
          <meshStandardMaterial color={jersey} roughness={0.58} metalness={0.12} />
        </mesh>

        <group ref={leftLowerArmRef} position={[0, -0.34, 0.02]}>
          <mesh castShadow position={[0, -0.14, 0]}>
            <capsuleGeometry args={[0.05, 0.2, 8, 16]} />
            <meshStandardMaterial color={skin} roughness={0.76} />
          </mesh>

          <mesh castShadow position={[0, -0.3, 0.05]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color={skin} roughness={0.76} />
          </mesh>
        </group>
      </group>

      <group ref={rightUpperArmRef} position={[0.23, 0.6, 0.05]}>
        <mesh castShadow position={[0, -0.16, 0]}>
          <capsuleGeometry args={[0.06, 0.24, 8, 16]} />
          <meshStandardMaterial color={jersey} roughness={0.58} metalness={0.12} />
        </mesh>

        <group ref={rightLowerArmRef} position={[0, -0.34, 0.02]}>
          <mesh castShadow position={[0, -0.14, 0]}>
            <capsuleGeometry args={[0.05, 0.2, 8, 16]} />
            <meshStandardMaterial color={skin} roughness={0.76} />
          </mesh>

          <mesh castShadow position={[0, -0.3, 0.05]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color={skin} roughness={0.76} />
          </mesh>

          <group ref={cupRef} position={[0, 0, 0.08]} visible={false}>
            <CoffeeCup activeSteam={false} />
          </group>
        </group>
      </group>

      <group ref={leftUpperLegRef} position={[-0.11, 0.04, 0.03]}>
        <mesh castShadow position={[0, -0.18, 0]}>
          <capsuleGeometry args={[0.07, 0.24, 8, 16]} />
          <meshStandardMaterial color={shorts} roughness={0.6} metalness={0.12} />
        </mesh>

        <group ref={leftLowerLegRef} position={[0, -0.34, 0.12]}>
          <mesh castShadow position={[0, -0.13, 0]}>
            <capsuleGeometry args={[0.055, 0.18, 8, 16]} />
            <meshStandardMaterial color={socks} roughness={0.72} />
          </mesh>

          <RoundedBox args={[0.17, 0.07, 0.28]} radius={0.03} smoothness={4} castShadow position={[0, -0.3, 0.07]}>
            <meshStandardMaterial color={boots} roughness={0.56} metalness={0.18} />
          </RoundedBox>
        </group>
      </group>

      <group ref={rightUpperLegRef} position={[0.11, 0.04, 0.03]}>
        <mesh castShadow position={[0, -0.18, 0]}>
          <capsuleGeometry args={[0.07, 0.24, 8, 16]} />
          <meshStandardMaterial color={shorts} roughness={0.6} metalness={0.12} />
        </mesh>

        <group ref={rightLowerLegRef} position={[0, -0.34, 0.12]}>
          <mesh castShadow position={[0, -0.13, 0]}>
            <capsuleGeometry args={[0.055, 0.18, 8, 16]} />
            <meshStandardMaterial color={socks} roughness={0.72} />
          </mesh>

          <RoundedBox args={[0.17, 0.07, 0.28]} radius={0.03} smoothness={4} castShadow position={[0, -0.3, 0.07]}>
            <meshStandardMaterial color={boots} roughness={0.56} metalness={0.18} />
          </RoundedBox>
        </group>
      </group>
    </group>
  )
}

function DeskMug() {
  const ref = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const timeline = getTimelineState(state.clock.getElapsedTime())
    ref.current.visible =
      timeline.emote !== "drinking" || timeline.raw < 0.08 || timeline.raw > 0.9
    ref.current.position.y = 1.075 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.004
  })

  return (
    <group ref={ref} position={[-0.48, 1.075, 0.22]}>
      <CoffeeCup activeSteam />
    </group>
  )
}

function SecretlabChair() {
  const ref = useRef<THREE.Group>(null!)
  const backrestRef = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const timeline = getTimelineState(time)
    const celebrate = timeline.emote === "celebrating" ? Math.sin(timeline.raw * Math.PI) : 0
    const typingTurn = timeline.emote === "typing" ? Math.sin(time * 0.7) * 0.04 : 0

    ref.current.rotation.y = THREE.MathUtils.damp(
      ref.current.rotation.y,
      -0.1 + typingTurn,
      4,
      delta
    )
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      celebrate * 0.03,
      4,
      delta
    )
    backrestRef.current.rotation.x = THREE.MathUtils.damp(
      backrestRef.current.rotation.x,
      -0.06 - celebrate * 0.12,
      4,
      delta
    )
  })

  return (
    <group ref={ref} position={[-0.46, 0, 0.42]}>
      <mesh castShadow position={[0, 0.54, 0.01]}>
        <cylinderGeometry args={[0.07, 0.1, 0.84, 18]} />
        <meshStandardMaterial color="#171d27" roughness={0.24} metalness={0.72} />
      </mesh>

      <RoundedBox args={[0.72, 0.14, 0.7]} radius={0.08} smoothness={4} castShadow position={[0, 0.83, 0.04]}>
        <meshStandardMaterial color="#101317" roughness={0.42} metalness={0.18} />
      </RoundedBox>

      <RoundedBox args={[0.54, 0.06, 0.22]} radius={0.06} smoothness={4} castShadow position={[0, 0.78, 0.28]}>
        <meshStandardMaterial color="#0d1117" roughness={0.44} metalness={0.14} />
      </RoundedBox>

      <group ref={backrestRef} position={[0, 1.22, -0.12]}>
        <RoundedBox args={[0.62, 0.9, 0.12]} radius={0.08} smoothness={4} castShadow>
          <meshStandardMaterial color="#0f1218" roughness={0.4} metalness={0.18} />
        </RoundedBox>

        <RoundedBox args={[0.18, 0.18, 0.02]} radius={0.02} smoothness={4} position={[0, -0.1, 0.07]}>
          <meshStandardMaterial
            color="#d6b15b"
            emissive="#d6b15b"
            emissiveIntensity={0.16}
            roughness={0.3}
            metalness={0.5}
          />
        </RoundedBox>

        <RoundedBox args={[0.34, 0.2, 0.03]} radius={0.03} smoothness={4} position={[0, 0.26, 0.07]}>
          <meshStandardMaterial
            color="#c6982f"
            emissive="#c6982f"
            emissiveIntensity={0.12}
            roughness={0.34}
            metalness={0.46}
          />
        </RoundedBox>
      </group>

      <RoundedBox args={[0.1, 0.24, 0.42]} radius={0.03} smoothness={4} castShadow position={[-0.39, 0.98, 0.08]}>
        <meshStandardMaterial color="#171d26" roughness={0.32} metalness={0.38} />
      </RoundedBox>

      <RoundedBox args={[0.1, 0.24, 0.42]} radius={0.03} smoothness={4} castShadow position={[0.39, 0.98, 0.08]}>
        <meshStandardMaterial color="#171d26" roughness={0.32} metalness={0.38} />
      </RoundedBox>

      {[0, 1, 2, 3, 4].map((index) => {
        const angle = (index / 5) * Math.PI * 2
        const x = Math.cos(angle) * 0.34
        const z = Math.sin(angle) * 0.34
        return (
          <group key={index}>
            <RoundedBox args={[0.34, 0.04, 0.08]} radius={0.02} smoothness={4} castShadow position={[x * 0.54, 0.2, z * 0.54]} rotation={[0, -angle, 0]}>
              <meshStandardMaterial color="#171d27" roughness={0.24} metalness={0.68} />
            </RoundedBox>

            <mesh castShadow position={[x, 0.04, z]}>
              <sphereGeometry args={[0.045, 14, 14]} />
              <meshStandardMaterial color="#0f1724" roughness={0.32} metalness={0.38} />
            </mesh>
          </group>
        )
      })}

      <Character />
    </group>
  )
}

function AmbientAccents() {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.18
  })

  return (
    <>
      <mesh position={[0.18, 1.74, -1.42]} scale={[1.9, 1.2, 1]}>
        <sphereGeometry args={[0.72, 24, 24]} />
        <meshBasicMaterial color="#ffd96f" transparent opacity={0.08} depthWrite={false} />
      </mesh>

      <mesh ref={ringRef} position={[0.45, 2.12, -1.14]} rotation={[0.18, 0.1, 0.24]}>
        <torusGeometry args={[0.96, 0.014, 12, 96]} />
        <meshStandardMaterial
          color="#e8d58b"
          emissive="#e8d58b"
          emissiveIntensity={0.34}
          transparent
          opacity={0.68}
        />
      </mesh>

      <Sparkles
        count={34}
        scale={[6.4, 4.2, 5.8]}
        size={2}
        speed={0.24}
        opacity={0.42}
        color="#ffe49b"
      />
    </>
  )
}

function Scene({ mobile = false }: { mobile?: boolean }) {
  const rigRef = useRef<THREE.Group>(null!)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    if (!rigRef.current) return

    const time = state.clock.getElapsedTime()
    const autoYaw = Math.sin(time * 0.24) * 0.05
    const autoPitch = Math.sin(time * 0.18) * 0.02

    const targetYaw = -0.28 + autoYaw + mouse.current.x * 0.09
    const targetPitch = 0.04 + autoPitch + mouse.current.y * 0.045

    rigRef.current.rotation.y = THREE.MathUtils.damp(
      rigRef.current.rotation.y,
      targetYaw,
      3,
      delta
    )
    rigRef.current.rotation.x = THREE.MathUtils.damp(
      rigRef.current.rotation.x,
      targetPitch,
      3,
      delta
    )
    rigRef.current.position.y = THREE.MathUtils.damp(
      rigRef.current.position.y,
      mobile ? -0.9 : -0.82,
      4,
      delta
    )
  })

  return (
    <>
      <group ref={rigRef} scale={mobile ? 0.86 : 1}>
        <Desk />
        <AlienwareMonitor />
        <MacBookAir />
        <DeskMug />
        <SecretlabChair />
        <AmbientAccents />
      </group>

      <ContactShadows
        position={[0, 0.02, 0]}
        scale={6.8}
        blur={2.3}
        far={4}
        opacity={0.42}
        resolution={1024}
        color="#05070d"
      />

      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.48} color="#fdf7ea" groundColor="#0a0f18" />
      <directionalLight
        castShadow
        position={[4.6, 5.2, 3.1]}
        intensity={2.2}
        color="#fff2cb"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-3.4, 2.8, -2.1]} intensity={1.35} color="#75b4ff" />
      <pointLight position={[2.8, 1.8, 2.2]} intensity={1.0} color="#60f5c1" />
      <spotLight
        position={[0.5, 4.0, 1.6]}
        intensity={1.2}
        angle={0.5}
        penumbra={0.9}
        color="#ffd86b"
      />
    </>
  )
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768)
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)
    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  return (
    <Canvas
      shadows
      camera={{ position: [0.4, 1.9, 4.8], fov: isMobile ? 32 : 28 }}
      dpr={[1, isMobile ? 1.3 : 1.9]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene mobile={isMobile} />
    </Canvas>
  )
}
