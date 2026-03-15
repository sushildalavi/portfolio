import type { NextConfig } from "next"

const isStaticExport = process.env.NEXT_EXPORT === "true"
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "")

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
        ...(basePath
          ? {
              basePath,
              assetPrefix: basePath,
            }
          : {}),
      }
    : {}),
}

export default nextConfig
