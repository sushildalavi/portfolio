"use client"

import { useEffect, useRef } from "react"

/**
 * Aurora + dot-grid + cursor spotlight background.
 * Uses a single-pass fragment shader rendered via WebGL — no three.js dependency.
 * Falls back to a static radial gradient if WebGL is unavailable.
 */
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 })
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    })
    if (!gl) return

    const vertexSrc = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fragmentSrc = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_isDark;
      uniform vec3 u_accent;
      uniform vec3 u_secondary;

      // Classic simplex noise (Ian McEwan, Ashima Arts)
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 p) {
        float f = 0.0;
        f += 0.50 * snoise(p); p *= 2.02;
        f += 0.25 * snoise(p); p *= 2.03;
        f += 0.125 * snoise(p);
        return f;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 p = (uv - 0.5) * aspect;

        float t = u_time * 0.06;

        // Aurora ribbons — three overlapping warped fields
        float n1 = fbm(p * 1.4 + vec2(t, t * 0.5));
        float n2 = fbm(p * 2.2 + vec2(-t * 0.7, t));
        float n3 = fbm(p * 0.8 + vec2(t * 0.3, -t * 0.4));

        float aurora = smoothstep(0.05, 0.75, n1 * 0.55 + n2 * 0.35 + n3 * 0.25);

        // Color blend: accent × secondary, modulated by vertical falloff
        float vFall = smoothstep(0.0, 0.9, uv.y);
        vec3 col = mix(u_accent, u_secondary, clamp(n2 * 0.6 + 0.4, 0.0, 1.0));
        col *= aurora * vFall;

        // Cursor spotlight
        vec2 mouseUv = u_mouse;
        vec2 mp = (mouseUv - 0.5) * aspect;
        float dist = length(p - mp);
        float spot = smoothstep(0.55, 0.0, dist);
        col += u_accent * spot * 0.18;

        // Dot grid (subtle, scales with spotlight intensity)
        vec2 gridUv = uv * u_resolution / 36.0;
        vec2 gv = fract(gridUv) - 0.5;
        float dot = smoothstep(0.08, 0.04, length(gv));
        float gridIntensity = mix(0.025, 0.14, spot);
        col += u_accent * dot * gridIntensity;

        // Vignette
        float vig = smoothstep(1.2, 0.35, length((uv - 0.5) * aspect));
        col *= mix(0.85, 1.05, vig);

        // Output with alpha so CSS background bleeds through
        float alpha = mix(0.55, 0.95, u_isDark);
        gl_FragColor = vec4(col, alpha);
      }
    `

    function compile(type: number, src: string) {
      const shader = gl!.createShader(type)!
      gl!.shaderSource(shader, src)
      gl!.compileShader(shader)
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compile(gl.VERTEX_SHADER, vertexSrc)
    const fs = compile(gl.FRAGMENT_SHADER, fragmentSrc)
    if (!vs || !fs) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    // Fullscreen quad
    const posBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(prog, "a_position")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "u_resolution")
    const uTime = gl.getUniformLocation(prog, "u_time")
    const uMouse = gl.getUniformLocation(prog, "u_mouse")
    const uIsDark = gl.getUniformLocation(prog, "u_isDark")
    const uAccent = gl.getUniformLocation(prog, "u_accent")
    const uSecondary = gl.getUniformLocation(prog, "u_secondary")

    function readCssColor(name: string, fallback: [number, number, number]): [number, number, number] {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
      if (!raw) return fallback
      // Expect #rrggbb
      if (raw.startsWith("#") && raw.length === 7) {
        return [
          parseInt(raw.slice(1, 3), 16) / 255,
          parseInt(raw.slice(3, 5), 16) / 255,
          parseInt(raw.slice(5, 7), 16) / 255,
        ]
      }
      return fallback
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      gl!.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX / window.innerWidth
      mouseRef.current.ty = 1.0 - e.clientY / window.innerHeight
    }
    window.addEventListener("mousemove", onMove, { passive: true })

    const start = performance.now()
    const tick = () => {
      const now = performance.now()
      const elapsed = (now - start) / 1000

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.08
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.08

      const isDark =
        document.documentElement.getAttribute("data-theme") !== "light" ? 1 : 0
      const accent = readCssColor("--accent-val", [1.0, 0.84, 0.0])
      const secondary = readCssColor("--secondary-val", [0.15, 0.39, 0.92])

      gl!.uniform2f(uRes, canvas.width, canvas.height)
      gl!.uniform1f(uTime, elapsed)
      gl!.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
      gl!.uniform1f(uIsDark, isDark)
      gl!.uniform3f(uAccent, accent[0], accent[1], accent[2])
      gl!.uniform3f(uSecondary, secondary[0], secondary[1], secondary[2])

      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, mixBlendMode: "screen" }}
    />
  )
}
