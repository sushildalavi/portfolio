"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { profile } from "@/data/profile"

export default function Footer() {
  return (
    <footer className="border-t border-foreground/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold tracking-[-0.02em] text-foreground/90">
                Sushil Dalavi
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
                AI Engineer · USC
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Los Angeles, CA · Available for full-time roles starting 2026.
            </p>
          </div>

          <div className="flex items-center gap-1">
            {[
              { href: profile.links.github, icon: Github, label: "GitHub" },
              { href: profile.links.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${profile.links.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-muted hover:text-accent hover:bg-foreground/[0.04] transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-foreground/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>
            Built with Next.js · Framer Motion · WebGL
          </span>
        </div>
      </div>
    </footer>
  )
}
