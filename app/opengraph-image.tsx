import { ImageResponse } from "next/og"

export const dynamic = "force-static"
export const runtime = "nodejs"
export const alt = "Sushil Dalavi — AI Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse at top left, #0a2e22 0%, #050607 55%)",
          backgroundColor: "#050607",
          color: "#fafafa",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top row: monogram + meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                border: "1px solid rgba(16,185,129,0.35)",
                background: "linear-gradient(180deg,#0e1011,#050607)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 22,
                color: "#6ee7b7",
                letterSpacing: "-0.04em",
              }}
            >
              SD
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.2,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
                Sushil Dalavi
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#a1a1aa",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                sushildalavi.dev
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#34d399",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 99,
                background: "#34d399",
              }}
            />
            Available
          </div>
        </div>

        {/* Big headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#fafafa",
            }}
          >
            AI Engineer.
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ color: "#d4d4d8" }}>Production AI systems</span>
            <span style={{ color: "#6ee7b7" }}>for retrieval, ML & data.</span>
          </div>
        </div>

        {/* Bottom meta bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 44,
              color: "#a1a1aa",
              fontSize: 18,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
              <span style={{ color: "#fafafa", fontWeight: 700, fontSize: 22 }}>
                USC Annenberg
              </span>
              <span style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Norman Lear Center
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
              <span style={{ color: "#fafafa", fontWeight: 700, fontSize: 22 }}>
                MS CS · USC
              </span>
              <span style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Class of 2026
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color: "#71717a",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Los Angeles, CA
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
