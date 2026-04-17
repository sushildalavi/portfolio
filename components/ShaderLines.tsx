"use client"

import { useEffect, useRef } from "react"

/**
 * Animated shader lines background — an alternative to the aurora.
 * Renders flowing horizontal ribbons of light with a cursor-driven
 * distortion field, all via a single fragment shader.
 */
export default function ShaderLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 })
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

      // Hash noise
      float hash(float n) { return fract(sin(n) * 43758.5453123); }

      // 1D value noise
      float noise(float x) {
        float i = floor(x);
        float f = fract(x);
        float u = f * f * (3.0 - 2.0 * f);
        return mix(hash(i), hash(i + 1.0), u);
      }

      float fbm1(float x) {
        float f = 0.0, a = 0.5;
        for (int i = 0; i < 5; i++) {
          f += a * noise(x);
          x *= 2.0;
          a *= 0.5;
        }
        return f;
      }

      // Draw a horizontal ribbon centered at y0 with given thickness and phase
      float ribbon(vec2 p, float y0, float thickness, float phase, float speed) {
        float y = y0 + 0.07 * (fbm1(p.x * 1.8 + phase + u_time * speed) - 0.5);
        float d = abs(p.y - y);
        return smoothstep(thickness, 0.0, d);
      }

      void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 p = (uv - 0.5) * aspect;

        // Cursor-driven ripple
        vec2 mp = (u_mouse - 0.5) * aspect;
        float md = length(p - mp);
        float ripple = exp(-md * 3.5) * 0.04;
        p.y += ripple * sin(u_time * 2.2 + md * 20.0);

        // Layer several ribbons
        float r = 0.0;
        r += ribbon(p, -0.35, 0.008, 1.2, 0.25) * 0.9;
        r += ribbon(p, -0.18, 0.006, 3.1, 0.32) * 0.7;
        r += ribbon(p,  0.02, 0.010, 5.7, 0.18) * 1.0;
        r += ribbon(p,  0.22, 0.005, 8.4, 0.38) * 0.6;
        r += ribbon(p,  0.38, 0.007, 11.0, 0.22) * 0.8;

        // Horizontal fade so ribbons don't touch the frame edges
        float hFade = smoothstep(-0.95, -0.35, p.x) * smoothstep(0.95, 0.35, p.x);
        r *= mix(0.55, 1.05, hFade);

        // Color: mix accent + secondary along length
        float mixK = smoothstep(-0.6, 0.6, p.x + 0.1 * sin(u_time * 0.3));
        vec3 col = mix(u_accent, u_secondary, mixK) * r;

        // Cursor spotlight
        float spot = smoothstep(0.45, 0.0, md);
        col += u_accent * spot * 0.08;

        // Very subtle vertical vignette
        float vig = smoothstep(1.25, 0.35, length((uv - 0.5) * aspect));
        col *= mix(0.75, 1.02, vig);

        float alpha = mix(0.45, 0.95, u_isDark);
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

    function hex2rgb(raw: string, fallback: [number, number, number]): [number, number, number] {
      if (!raw) return fallback
      const s = raw.trim()
      if (s.startsWith("#") && s.length === 7) {
        return [
          parseInt(s.slice(1, 3), 16) / 255,
          parseInt(s.slice(3, 5), 16) / 255,
          parseInt(s.slice(5, 7), 16) / 255,
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
      mouse.current.tx = e.clientX / window.innerWidth
      mouse.current.ty = 1.0 - e.clientY / window.innerHeight
    }
    window.addEventListener("mousemove", onMove, { passive: true })

    const start = performance.now()
    const tick = () => {
      const now = performance.now()
      const elapsed = (now - start) / 1000

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06

      const isDark = document.documentElement.getAttribute("data-theme") !== "light" ? 1 : 0
      const cs = getComputedStyle(document.documentElement)
      const accent = hex2rgb(cs.getPropertyValue("--accent-val"), [0.06, 0.72, 0.51])
      const secondary = hex2rgb(cs.getPropertyValue("--secondary-val"), [0.22, 0.74, 0.97])

      gl!.uniform2f(uRes, canvas.width, canvas.height)
      gl!.uniform1f(uTime, elapsed)
      gl!.uniform2f(uMouse, mouse.current.x, mouse.current.y)
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
