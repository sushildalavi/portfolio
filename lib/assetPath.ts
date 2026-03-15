const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "")
const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://sushildalavi.github.io"

/** Prepend the Next.js basePath to a public-folder asset path. */
export const asset = (path: string) => {
  if (!path.startsWith("/")) {
    return path
  }

  return `${basePath}${path}`
}

export const absoluteUrl = (path = "/") =>
  new URL(asset(path), `${siteOrigin}/`).toString()
