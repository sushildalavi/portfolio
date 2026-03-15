"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

/* ═══════════════════════════════════════════
   Animated code-on-screen GLSL shader
   ═══════════════════════════════════════════ */

const screenVS = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const screenFS = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float scroll = uTime * 0.025;
    float lineIdx = floor((uv.y + scroll) * 26.0);
    float linePhase = fract((uv.y + scroll) * 26.0);
    float lineVis = step(0.18, linePhase) * step(linePhase, 0.72);

    float indent = floor(hash(vec2(lineIdx, 0.0)) * 5.0) * 0.04;
    float len1 = 0.08 + hash(vec2(lineIdx, 1.0)) * 0.42;
    float inT1 = step(indent + 0.04, uv.x) * step(uv.x, indent + 0.04 + len1);

    float gap = 0.015;
    float t2s = indent + 0.04 + len1 + gap;
    float len2 = hash(vec2(lineIdx, 2.0)) * 0.22;
    float hasT2 = step(0.45, hash(vec2(lineIdx, 3.0)));
    float inT2 = step(t2s, uv.x) * step(uv.x, min(t2s + len2, 0.95)) * hasT2;

    float t3s = t2s + len2 + gap;
    float len3 = hash(vec2(lineIdx, 5.0)) * 0.14;
    float hasT3 = step(0.55, hash(vec2(lineIdx, 6.0))) * hasT2;
    float inT3 = step(t3s, uv.x) * step(uv.x, min(t3s + len3, 0.95)) * hasT3;

    float isCode = lineVis * clamp(inT1 + inT2 + inT3, 0.0, 1.0);

    vec3 gold   = vec3(1.0, 0.84, 0.0);
    vec3 cyan   = vec3(0.29, 0.87, 0.79);
    vec3 blue   = vec3(0.38, 0.65, 0.96);
    vec3 white  = vec3(0.85, 0.85, 0.85);
    vec3 purple = vec3(0.69, 0.49, 0.96);

    float cs = hash(vec2(lineIdx, 4.0));
    vec3 codeColor = gold;
    codeColor = mix(codeColor, cyan,   step(0.25, cs));
    codeColor = mix(codeColor, blue,   step(0.45, cs));
    codeColor = mix(codeColor, white,  step(0.65, cs));
    codeColor = mix(codeColor, purple, step(0.82, cs));

    vec3 bg = vec3(0.02, 0.025, 0.055);
    vec3 col = mix(bg, codeColor, isCode * 0.65);

    float inGutter = step(0.01, uv.x) * step(uv.x, 0.035) * lineVis;
    col = mix(col, vec3(0.18, 0.22, 0.32), inGutter * 0.45);

    float topLine = floor(scroll * 26.0 + 24.0);
    float onCursor = 1.0 - step(0.5, abs(lineIdx - topLine));
    float blink = step(0.5, fract(uTime * 1.2));
    float cursorX = indent + 0.04 + len1 + gap;
    float inCursor = step(cursorX, uv.x) * step(uv.x, cursorX + 0.007)
                     * lineVis * blink * onCursor;
    col = mix(col, gold, inCursor);

    col *= 0.9 + 0.1 * sin(uv.y * 380.0);
    col *= 1.0 - 0.3 * pow(length((uv - 0.5) * 1.35), 2.0);

    gl_FragColor = vec4(col, 1.0);
  }
`

/* ═══════════════════════════════════════════
   MacBook M3 Air — thin, sleek, silver
   ═══════════════════════════════════════════ */

function CodeScreen() {
  const ref = useRef<THREE.ShaderMaterial>(null!)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame((s) => {
    if (ref.current) ref.current.uniforms.uTime.value = s.clock.getElapsedTime()
  })
  return (
    <mesh position={[0, 0, 0.012]}>
      <planeGeometry args={[0.58, 0.38]} />
      <shaderMaterial ref={ref} uniforms={uniforms} vertexShader={screenVS} fragmentShader={screenFS} />
    </mesh>
  )
}

function MacBookM3Air() {
  const silver = "#c0c0c0"
  const dark = "#1a1a1a"
  return (
    <group position={[0.15, 0.92, -0.12]}>
      {/* base — ultra thin */}
      <mesh>
        <boxGeometry args={[0.62, 0.012, 0.42]} />
        <meshStandardMaterial color={silver} metalness={0.95} roughness={0.08} />
      </mesh>
      {/* trackpad notch */}
      <mesh position={[0, 0.008, 0.08]}>
        <boxGeometry args={[0.18, 0.002, 0.1]} />
        <meshStandardMaterial color={dark} metalness={0.98} roughness={0.02} />
      </mesh>
      {/* screen — thin lid */}
      <group position={[0, 0.22, -0.2]} rotation={[-0.25, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.62, 0.42, 0.01]} />
          <meshStandardMaterial color={dark} metalness={0.95} roughness={0.05} />
        </mesh>
        <CodeScreen />
        {/* notch / camera area */}
        <mesh position={[0, 0.2, 0.008]}>
          <boxGeometry args={[0.06, 0.012, 0.008]} />
          <meshStandardMaterial color={dark} />
        </mesh>
      </group>
      {/* hinge */}
      <mesh position={[0, 0.008, -0.2]}>
        <boxGeometry args={[0.35, 0.008, 0.015]} />
        <meshStandardMaterial color={silver} metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   Alienware AW3225QF — 32" curved QD-OLED
   ═══════════════════════════════════════════ */

function AlienwareMonitor() {
  const dark = "#0d0d0d"
  const alienGreen = "#00ff88"
  return (
    <group position={[-0.25, 0.92, -0.35]}>
      {/* curved screen — wide 32" aspect */}
      <mesh position={[0, 0.55, 0]} rotation={[-0.08, 0, 0]}>
        <planeGeometry args={[0.95, 0.55]} />
        <meshStandardMaterial color="#0a0a12" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* screen content — code glow */}
      <mesh position={[0, 0.55, 0.002]} rotation={[-0.08, 0, 0]}>
        <planeGeometry args={[0.9, 0.5]} />
        <meshBasicMaterial color="#0a1520" transparent opacity={0.9} />
      </mesh>
      {/* bezel — Alienware style */}
      <mesh position={[0, 0.55, -0.008]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[0.98, 0.58, 0.02]} />
        <meshStandardMaterial color={dark} metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Alienware logo accent */}
      <mesh position={[0, 0.25, 0.01]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[0.12, 0.02, 0.001]} />
        <meshBasicMaterial color={alienGreen} transparent opacity={0.6} />
      </mesh>
      {/* stand — V-shaped Alienware */}
      <mesh position={[0, 0.15, 0.12]}>
        <boxGeometry args={[0.25, 0.04, 0.15]} />
        <meshStandardMaterial color={dark} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.18, 0.08, 0.12]}>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color={dark} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.18, 0.08, 0.12]}>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color={dark} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   Secretlab TITAN Evo — premium gaming chair
   ═══════════════════════════════════════════ */

function SecretlabChair() {
  const black = "#0f0f0f"
  const orange = "#ff6b35"
  return (
    <group position={[0, 0, 0.42]}>
      {/* seat — ergonomic, thick */}
      <mesh position={[0, 0.78, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.48]} />
        <meshStandardMaterial color={black} roughness={0.4} />
      </mesh>
      {/* seat edge curve */}
      <mesh position={[0, 0.81, -0.18]}>
        <boxGeometry args={[0.48, 0.03, 0.12]} />
        <meshStandardMaterial color={black} roughness={0.4} />
      </mesh>
      {/* backrest — tall, curved */}
      <mesh position={[0, 1.15, 0.22]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.48, 0.7, 0.06]} />
        <meshStandardMaterial color={black} roughness={0.4} />
      </mesh>
      {/* lumbar support area */}
      <mesh position={[0, 1.0, 0.26]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.2, 0.15, 0.02]} />
        <meshStandardMaterial color={orange} emissive={orange} emissiveIntensity={0.15} />
      </mesh>
      {/* headrest */}
      <mesh position={[0, 1.52, 0.28]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.35, 0.2, 0.05]} />
        <meshStandardMaterial color={black} roughness={0.4} />
      </mesh>
      {/* armrests — TITAN signature */}
      <mesh position={[-0.3, 0.95, 0.08]}>
        <boxGeometry args={[0.06, 0.08, 0.35]} />
        <meshStandardMaterial color={black} roughness={0.3} />
      </mesh>
      <mesh position={[0.3, 0.95, 0.08]}>
        <boxGeometry args={[0.06, 0.08, 0.35]} />
        <meshStandardMaterial color={black} roughness={0.3} />
      </mesh>
      {/* base — 5-star */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.22, 0.45, Math.sin(a) * 0.22]}>
            <boxGeometry args={[0.04, 0.35, 0.04]} />
            <meshStandardMaterial color={black} metalness={0.7} roughness={0.3} />
          </mesh>
        )
      })}
      {/* center hub */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.06, 8]} />
        <meshStandardMaterial color={black} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* wheels */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.25, 0.02, Math.sin(a) * 0.25]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        )
      })}
    </group>
  )
}

/* ═══════════════════════════════════════════
   Coffee mug — for drinking emote
   ═══════════════════════════════════════════ */

function CoffeeMugModel() {
  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.035, 0.03, 0.09, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0.04, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.02, 0.005, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.028, 12]} />
        <meshStandardMaterial color="#3e1f0d" />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   Character — Real Madrid 25-26 blue third kit + emotes
   ═══════════════════════════════════════════ */

type Emote = "typing" | "drinking" | "nodding" | "stretch"

function Character() {
  const leftArmRef = useRef<THREE.Group>(null!)
  const rightArmRef = useRef<THREE.Group>(null!)
  const headRef = useRef<THREE.Group>(null!)
  const mugRef = useRef<THREE.Group>(null!)
  const torsoRef = useRef<THREE.Group>(null!)

  const rmBlue = "#0a1628"
  const rmBlueLight = "#0d1f3c"
  const gold = "#FFD700"
  const skin = "#e8b88a"
  const hair = "#1a1a2e"
  const dark = "#0f172a"

  const emoteCycle: { emote: Emote; duration: number }[] = [
    { emote: "typing", duration: 6 },
    { emote: "drinking", duration: 4 },
    { emote: "typing", duration: 5 },
    { emote: "nodding", duration: 2 },
    { emote: "typing", duration: 6 },
    { emote: "stretch", duration: 3 },
  ]

  const totalCycle = emoteCycle.reduce((a, b) => a + b.duration, 0)

  useFrame((s) => {
    const t = s.clock.getElapsedTime()
    const cycleTime = t % totalCycle

    let elapsed = 0
    let currentEmote: Emote = "typing"
    let phaseStart = 0
    for (const { emote, duration } of emoteCycle) {
      if (cycleTime < elapsed + duration) {
        currentEmote = emote
        phaseStart = elapsed
        break
      }
      elapsed += duration
    }
    const phaseT = (cycleTime - phaseStart) / (emoteCycle.find((e) => e.emote === currentEmote)?.duration ?? 1)

    if (headRef.current) {
      if (currentEmote === "nodding") {
        headRef.current.rotation.x = Math.sin(phaseT * Math.PI * 3) * 0.15
        headRef.current.rotation.z = 0
      } else if (currentEmote === "stretch") {
        headRef.current.rotation.x = -0.1 - phaseT * 0.08
        headRef.current.rotation.z = 0
      } else {
        headRef.current.rotation.z = Math.sin(t * 0.6) * 0.03
        headRef.current.rotation.x = Math.sin(t * 0.4) * 0.02
      }
    }

    if (torsoRef.current && currentEmote === "stretch") {
      torsoRef.current.rotation.x = -phaseT * 0.12
    } else if (torsoRef.current) {
      torsoRef.current.rotation.x = 0
    }

    if (currentEmote === "typing") {
      if (leftArmRef.current)
        leftArmRef.current.rotation.x = -0.55 + Math.sin(t * 4.5) * 0.07
      if (rightArmRef.current)
        rightArmRef.current.rotation.x = -0.55 + Math.sin(t * 4.5 + Math.PI) * 0.07
      if (mugRef.current) {
        mugRef.current.visible = false
      }
    } else if (currentEmote === "drinking") {
      let lift = 0
      if (phaseT < 0.3) lift = phaseT / 0.3
      else if (phaseT < 0.6) lift = 1
      else lift = Math.max(0, (1 - phaseT) / 0.4)
      const armRot = -0.55 + lift * 1.5
      if (rightArmRef.current) rightArmRef.current.rotation.x = armRot
      if (leftArmRef.current) leftArmRef.current.rotation.x = -0.55
      if (mugRef.current) {
        mugRef.current.visible = true
        mugRef.current.position.set(0.32, 1.1 + lift * 0.45, 0.08 + lift * 0.15)
        mugRef.current.rotation.x = -0.25 - lift * 0.6
      }
    } else {
      if (leftArmRef.current) leftArmRef.current.rotation.x = -0.55
      if (rightArmRef.current) rightArmRef.current.rotation.x = -0.55
      if (mugRef.current) mugRef.current.visible = false
    }
  })

  return (
    <group position={[0, 0, 0.2]}>
      {/* ── Head ── */}
      <group ref={headRef} position={[0, 1.68, 0]}>
        <mesh>
          <boxGeometry args={[0.32, 0.32, 0.32]} />
          <meshStandardMaterial color={skin} />
        </mesh>
        <mesh position={[0, 0.17, -0.01]}>
          <boxGeometry args={[0.34, 0.1, 0.34]} />
          <meshStandardMaterial color={hair} />
        </mesh>
        <mesh position={[-0.07, 0.02, 0.165]}>
          <boxGeometry args={[0.055, 0.035, 0.01]} />
          <meshStandardMaterial color={dark} />
        </mesh>
        <mesh position={[0.07, 0.02, 0.165]}>
          <boxGeometry args={[0.055, 0.035, 0.01]} />
          <meshStandardMaterial color={dark} />
        </mesh>
      </group>

      {/* ── Torso (Real Madrid 25-26 blue third kit) ── */}
      <group ref={torsoRef}>
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[0.42, 0.44, 0.22]} />
          <meshStandardMaterial color={rmBlue} metalness={0.2} roughness={0.6} />
        </mesh>
        {/* gold trim stripe */}
        <mesh position={[0, 1.5, 0.115]}>
          <boxGeometry args={[0.14, 0.03, 0.01]} />
          <meshStandardMaterial color={gold} metalness={0.5} roughness={0.4} />
        </mesh>
        {/* crest area */}
        <mesh position={[0, 1.35, 0.115]}>
          <boxGeometry args={[0.08, 0.1, 0.01]} />
          <meshStandardMaterial color={gold} metalness={0.4} roughness={0.5} />
        </mesh>
      </group>

      {/* ── Left arm ── */}
      <group ref={leftArmRef} position={[-0.28, 1.48, 0]}>
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[0.11, 0.24, 0.11]} />
          <meshStandardMaterial color={rmBlue} metalness={0.2} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.3, 0.06]}>
          <boxGeometry args={[0.09, 0.16, 0.09]} />
          <meshStandardMaterial color={skin} />
        </mesh>
      </group>

      {/* ── Right arm (typing / holds mug when drinking) ── */}
      <group ref={rightArmRef} position={[0.28, 1.48, 0]}>
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[0.11, 0.24, 0.11]} />
          <meshStandardMaterial color={rmBlue} metalness={0.2} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.3, 0.06]}>
          <boxGeometry args={[0.09, 0.16, 0.09]} />
          <meshStandardMaterial color={skin} />
        </mesh>
      </group>

      {/* ── Coffee mug (in hand when drinking emote) ── */}
      <group ref={mugRef} position={[0.32, 1.1, 0.08]} visible={false}>
        <CoffeeMugModel />
      </group>

      {/* ── Legs (blue shorts — third kit) ── */}
      <mesh position={[-0.1, 1.0, -0.06]} rotation={[1.1, 0, 0]}>
        <boxGeometry args={[0.15, 0.26, 0.14]} />
        <meshStandardMaterial color={rmBlueLight} />
      </mesh>
      <mesh position={[0.1, 1.0, -0.06]} rotation={[1.1, 0, 0]}>
        <boxGeometry args={[0.15, 0.26, 0.14]} />
        <meshStandardMaterial color={rmBlueLight} />
      </mesh>
      <mesh position={[-0.1, 0.75, -0.22]}>
        <boxGeometry args={[0.13, 0.28, 0.13]} />
        <meshStandardMaterial color={rmBlueLight} />
      </mesh>
      <mesh position={[0.1, 0.75, -0.22]}>
        <boxGeometry args={[0.13, 0.28, 0.13]} />
        <meshStandardMaterial color={rmBlueLight} />
      </mesh>
      <mesh position={[-0.1, 0.59, -0.17]}>
        <boxGeometry args={[0.14, 0.05, 0.18]} />
        <meshStandardMaterial color={dark} />
      </mesh>
      <mesh position={[0.1, 0.59, -0.17]}>
        <boxGeometry args={[0.14, 0.05, 0.18]} />
        <meshStandardMaterial color={dark} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   Desk + desk mug (when not drinking)
   ═══════════════════════════════════════════ */

function DeskMug() {
  return (
    <group position={[0.5, 0.92, -0.25]}>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.035, 0.03, 0.09, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0.04, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.02, 0.005, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.028, 12]} />
        <meshStandardMaterial color="#3e1f0d" />
      </mesh>
    </group>
  )
}

function Desk() {
  const wood = "#5c3a1e"
  const woodLight = "#7a4f2e"
  return (
    <group>
      <mesh position={[0, 0.9, -0.2]}>
        <boxGeometry args={[1.9, 0.04, 0.85]} />
        <meshStandardMaterial color={woodLight} roughness={0.6} />
      </mesh>
      {[[-0.85, -0.5], [0.85, -0.5], [-0.85, 0.1], [0.85, 0.1]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.44, z]}>
          <boxGeometry args={[0.04, 0.88, 0.04]} />
          <meshStandardMaterial color={wood} roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════
   Floating wireframe shapes
   ═══════════════════════════════════════════ */

function FloatingShapes() {
  const outerRef = useRef<THREE.Group>(null!)
  useFrame((s) => {
    if (outerRef.current) outerRef.current.rotation.y = s.clock.getElapsedTime() * 0.06
  })

  const shapes: [THREE.BufferGeometry, [number, number, number], string, number, number][] = useMemo(
    () => [
      [new THREE.OctahedronGeometry(0.15), [1.6, 1.8, 0.3], "#FFD700", 2.0, 1.8],
      [new THREE.BoxGeometry(0.18, 0.18, 0.18), [-1.5, 1.5, 0.4], "#FFD700", 1.5, 1.4],
      [new THREE.TorusGeometry(0.12, 0.04, 12, 24), [1.3, 0.3, 1.0], "#FFD700", 1.8, 1.0],
      [new THREE.IcosahedronGeometry(0.12), [-1.2, 0.5, 1.2], "#0a1628", 2.2, 1.6],
      [new THREE.DodecahedronGeometry(0.13), [0.2, 2.2, -0.5], "#FFD700", 1.2, 0.8],
      [new THREE.TetrahedronGeometry(0.12), [-0.4, -0.1, 1.4], "#00ff88", 1.7, 1.3],
      [new THREE.ConeGeometry(0.08, 0.18, 6), [1.7, 0.8, -0.6], "#FFD700", 1.9, 1.1],
    ],
    []
  )

  return (
    <group ref={outerRef}>
      {shapes.map(([geo, pos, color, speed, ri], i) => (
        <Float key={i} speed={speed} rotationIntensity={ri} floatIntensity={0.8} position={pos}>
          <mesh geometry={geo}>
            <meshStandardMaterial color={color} wireframe metalness={0.7} roughness={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function Particles({ count = 100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)
  const geo = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 12
      p[i * 3 + 1] = (Math.random() - 0.5) * 12
      p[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3))
    return g
  }, [count])

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.01
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.018}
        color="#FFD700"
        transparent
        opacity={0.22}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ═══════════════════════════════════════════
   Main Scene
   ═══════════════════════════════════════════ */

function Scene() {
  const groupRef = useRef<THREE.Group>(null!)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener("mousemove", h)
    return () => window.removeEventListener("mousemove", h)
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    const targetY = -0.45 + mouse.current.x * 0.2
    const targetX = 0.1 + mouse.current.y * 0.1
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03
  })

  return (
    <>
      <group ref={groupRef}>
        <Character />
        <Desk />
        <SecretlabChair />
        <MacBookM3Air />
        <AlienwareMonitor />
        <DeskMug />
        <FloatingShapes />
      </group>
      <Particles />

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 2, 2]} intensity={3} color="#FFD700" distance={8} decay={2} />
      <pointLight position={[-3, 3, -1]} intensity={1.2} color="#2563eb" distance={10} decay={2} />
      <pointLight position={[3, 0, 3]} intensity={0.6} color="#00ff88" distance={7} decay={2} />
      <spotLight position={[0, 4, 1]} intensity={0.5} angle={0.6} penumbra={0.8} color="#fff5e0" />
    </>
  )
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <Canvas
      camera={{ position: [2, 2, 4], fov: 34 }}
      dpr={[1, isMobile ? 1 : 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  )
}
