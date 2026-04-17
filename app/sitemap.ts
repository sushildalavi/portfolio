import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/assetPath"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const sections = ["", "#about", "#projects", "#experience", "#skills", "#publications", "#contact"]
  return sections.map((s, i) => ({
    url: absoluteUrl(`/${s}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: i === 0 ? 1 : 0.7,
  }))
}
