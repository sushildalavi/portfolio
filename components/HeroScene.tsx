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
   Laptop with animated code screen
   ═══════════════════════════════════════════ */

function CodeScreen() {
  const ref = useRef<THREE.ShaderMaterial>(null!)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame((s) => {
    if (ref.current) ref.current.uniforms.uTime.value = s.clock.getElapsedTime()
  })
  return (
    <mesh position={[0, 0, 0.022]}>
      <planeGeometry args={[0.72, 0.48]} />
      <shaderMaterial ref={ref} uniforms={uniforms} vertexShader={screenVS} fragmentShader={screenFS} />
    </mesh>
  )
}

function LaptopOnDesk() {
  const dark = "#0f172a"
  return (
    <group position={[0, 0.92, -0.15]}>
      {/* base */}
      <mesh>
        <boxGeometry args={[0.82, 0.022, 0.52]} />
        <meshStandardMaterial color={dark} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* trackpad */}
      <mesh position={[0, 0.013, 0.1]}>
        <boxGeometry args={[0.22, 0.003, 0.14]} />
        <meshStandardMaterial color="#1a2744" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* screen assembly */}
      <group position={[0, 0.3, -0.24]} rotation={[-0.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.82, 0.56, 0.018]} />
          <meshStandardMaterial color={dark} metalness={0.9} roughness={0.1} />
        </mesh>
        <CodeScreen />
        {/* gold accent line */}
        <mesh position={[0, 0.285, 0.012]}>
          <boxGeometry args={[0.74, 0.005, 0.005]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.35} />
        </mesh>
      </group>
      {/* hinge gold accent */}
      <mesh position={[0, 0.013, -0.24]}>
        <boxGeometry args={[0.4, 0.012, 0.02]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   Blocky coding character  (Real Madrid kit)
   ═══════════════════════════════════════════ */

function Character() {
  const leftArmRef = useRef<THREE.Group>(null!)
  const rightArmRef = useRef<THREE.Group>(null!)
  const headRef = useRef<THREE.Group>(null!)

  const gold = "#FFD700"
  const white = "#ffffff"
  const skin = "#e8b88a"
  const hair = "#1a1a2e"
  const dark = "#0f172a"

  useFrame((s) => {
    const t = s.clock.getElapsedTime()
    if (leftArmRef.current)
      leftArmRef.current.rotation.x = -0.55 + Math.sin(t * 4.5) * 0.07
    if (rightArmRef.current)
      rightArmRef.current.rotation.x = -0.55 + Math.sin(t * 4.5 + Math.PI) * 0.07
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 0.6) * 0.04
      headRef.current.rotation.x = Math.sin(t * 0.4) * 0.02
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
        {/* hair */}
        <mesh position={[0, 0.17, -0.01]}>
          <boxGeometry args={[0.34, 0.1, 0.34]} />
          <meshStandardMaterial color={hair} />
        </mesh>
        {/* eyes */}
        <mesh position={[-0.07, 0.02, 0.165]}>
          <boxGeometry args={[0.055, 0.035, 0.01]} />
          <meshStandardMaterial color={dark} />
        </mesh>
        <mesh position={[0.07, 0.02, 0.165]}>
          <boxGeometry args={[0.055, 0.035, 0.01]} />
          <meshStandardMaterial color={dark} />
        </mesh>
      </group>

      {/* ── Torso (gold jersey) ── */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.42, 0.44, 0.22]} />
        <meshStandardMaterial color={gold} metalness={0.35} roughness={0.55} />
      </mesh>
      {/* collar stripe */}
      <mesh position={[0, 1.5, 0.115]}>
        <boxGeometry args={[0.13, 0.035, 0.01]} />
        <meshStandardMaterial color={white} />
      </mesh>

      {/* ── Left arm (typing) ── */}
      <group ref={leftArmRef} position={[-0.28, 1.48, 0]}>
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[0.11, 0.24, 0.11]} />
          <meshStandardMaterial color={gold} metalness={0.35} roughness={0.55} />
        </mesh>
        <mesh position={[0, -0.3, 0.06]}>
          <boxGeometry args={[0.09, 0.16, 0.09]} />
          <meshStandardMaterial color={skin} />
        </mesh>
      </group>

      {/* ── Right arm (typing) ── */}
      <group ref={rightArmRef} position={[0.28, 1.48, 0]}>
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[0.11, 0.24, 0.11]} />
          <meshStandardMaterial color={gold} metalness={0.35} roughness={0.55} />
        </mesh>
        <mesh position={[0, -0.3, 0.06]}>
          <boxGeometry args={[0.09, 0.16, 0.09]} />
          <meshStandardMaterial color={skin} />
        </mesh>
      </group>

      {/* ── Legs (sitting, white shorts) ── */}
      <mesh position={[-0.1, 1.0, -0.06]} rotation={[1.1, 0, 0]}>
        <boxGeometry args={[0.15, 0.26, 0.14]} />
        <meshStandardMaterial color={white} />
      </mesh>
      <mesh position={[0.1, 1.0, -0.06]} rotation={[1.1, 0, 0]}>
        <boxGeometry args={[0.15, 0.26, 0.14]} />
        <meshStandardMaterial color={white} />
      </mesh>
      {/* shins */}
      <mesh position={[-0.1, 0.75, -0.22]}>
        <boxGeometry args={[0.13, 0.28, 0.13]} />
        <meshStandardMaterial color={white} />
      </mesh>
      <mesh position={[0.1, 0.75, -0.22]}>
        <boxGeometry args={[0.13, 0.28, 0.13]} />
        <meshStandardMaterial color={white} />
      </mesh>
      {/* shoes */}
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
   Desk + Chair + Accessories
   ═══════════════════════════════════════════ */

function Desk() {
  const wood = "#5c3a1e"
  const woodLight = "#7a4f2e"
  return (
    <group>
      {/* surface */}
      <mesh position={[0, 0.9, -0.15]}>
        <boxGeometry args={[1.6, 0.04, 0.7]} />
        <meshStandardMaterial color={woodLight} roughness={0.6} />
      </mesh>
      {/* legs */}
      {[[-0.72, -0.42], [0.72, -0.42], [-0.72, 0.08], [0.72, 0.08]].map(
        ([x, z], i) => (
          <mesh key={i} position={[x, 0.44, z]}>
            <boxGeometry args={[0.04, 0.88, 0.04]} />
            <meshStandardMaterial color={wood} roughness={0.7} />
          </mesh>
        )
      )}
    </group>
  )
}

function Chair() {
  const c = "#2a2a3e"
  return (
    <group position={[0, 0, 0.35]}>
      {/* seat */}
      <mesh position={[0, 0.78, 0]}>
        <boxGeometry args={[0.42, 0.04, 0.38]} />
        <meshStandardMaterial color={c} />
      </mesh>
      {/* backrest */}
      <mesh position={[0, 1.08, 0.18]}>
        <boxGeometry args={[0.4, 0.55, 0.04]} />
        <meshStandardMaterial color={c} />
      </mesh>
      {/* legs */}
      {[[-0.18, -0.15], [0.18, -0.15], [-0.18, 0.15], [0.18, 0.15]].map(
        ([x, z], i) => (
          <mesh key={i} position={[x, 0.38, z]}>
            <cylinderGeometry args={[0.015, 0.015, 0.76, 6]} />
            <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
          </mesh>
        )
      )}
      {/* wheels */}
      {[[-0.18, -0.15], [0.18, -0.15], [-0.18, 0.15], [0.18, 0.15]].map(
        ([x, z], i) => (
          <mesh key={`w${i}`} position={[x, 0.02, z]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        )
      )}
    </group>
  )
}

function CoffeeMug() {
  return (
    <group position={[0.55, 0.92, -0.3]}>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.1, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      {/* handle */}
      <mesh position={[0.05, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.025, 0.006, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* coffee surface */}
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.035, 12]} />
        <meshStandardMaterial color="#3e1f0d" />
      </mesh>
    </group>
  )
}

function BookStack() {
  const colors = ["#c0392b", "#2980b9", "#27ae60"]
  return (
    <group position={[-0.55, 0.92, -0.32]}>
      {colors.map((c, i) => (
        <mesh key={i} position={[0, i * 0.04, 0]}>
          <boxGeometry args={[0.16, 0.035, 0.11]} />
          <meshStandardMaterial color={c} roughness={0.7} />
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
      [new THREE.IcosahedronGeometry(0.12), [-1.2, 0.5, 1.2], "#2563eb", 2.2, 1.6],
      [new THREE.DodecahedronGeometry(0.13), [0.2, 2.2, -0.5], "#FFD700", 1.2, 0.8],
      [new THREE.TetrahedronGeometry(0.12), [-0.4, -0.1, 1.4], "#2563eb", 1.7, 1.3],
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

/* ═══════════════════════════════════════════
   Ambient particles
   ═══════════════════════════════════════════ */

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
   Main Scene (composition + lighting + mouse)
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
        <Chair />
        <LaptopOnDesk />
        <CoffeeMug />
        <BookStack />
        <FloatingShapes />
      </group>
      <Particles />

      {/* Lighting: gold key from laptop, blue rim, warm fill */}
      <ambientLight intensity={0.18} />
      <pointLight position={[0, 2, 2]} intensity={3} color="#FFD700" distance={8} decay={2} />
      <pointLight position={[-3, 3, -1]} intensity={1.2} color="#2563eb" distance={10} decay={2} />
      <pointLight position={[3, 0, 3]} intensity={0.6} color="#FFD700" distance={7} decay={2} />
      <spotLight position={[0, 4, 1]} intensity={0.5} angle={0.6} penumbra={0.8} color="#fff5e0" />
    </>
  )
}

/* ═══════════════════════════════════════════
   Canvas export
   ═══════════════════════════════════════════ */

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <Canvas
      camera={{ position: [2, 2, 3.8], fov: 34 }}
      dpr={[1, isMobile ? 1 : 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  )
}
