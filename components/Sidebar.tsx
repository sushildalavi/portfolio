"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, FileText, Menu, X, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { profile } from "@/data/profile"
import { useTheme } from "@/components/ThemeProvider"
import { asset } from "@/lib/assetPath"

const navLinks = [
  { label: "Home", href: "#hero", num: "01" },
  { label: "About", href: "#about", num: "02" },
  { label: "Work", href: "#projects", num: "03" },
  { label: "Experience", href: "#experience", num: "04" },
  { label: "Toolchain", href: "#skills", num: "05" },
  { label: "Research", href: "#publications", num: "06" },
  { label: "Contact", href: "#contact", num: "07" },
]

const socialLinks = [
  { href: profile.links.github, icon: Github, label: "GitHub" },
  { href: profile.links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${profile.links.email}`, icon: Mail, label: "Email" },
]

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const [activeSection, setActiveSection] = useState("hero")
  const { toggleTheme } = useTheme()
  const resumeHref = asset(profile.links.resume)

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1))

    const observers: IntersectionObserver[] = sectionIds
      .map((id) => {
        const el = document.getElementById(id)
        if (!el) return null
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(id)
          },
          { rootMargin: "-40% 0px -60% 0px" }
        )
        observer.observe(el)
        return observer
      })
      .filter(Boolean) as IntersectionObserver[]

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (href: string) => {
    onLinkClick?.()
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col h-full px-5 py-8 overflow-y-auto">
      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-accent/25 bg-[linear-gradient(180deg,#0e1011,#050607)] flex items-center justify-center shadow-[0_4px_18px_rgba(0,0,0,0.35)]">
            <span className="pointer-events-none absolute left-1.5 top-1.5 block h-[7px] w-[7px] border-l border-t border-accent/70" />
            <span className="pointer-events-none absolute right-1.5 bottom-1.5 block h-[7px] w-[7px] border-r border-b border-accent/70" />
            <span className="text-[13px] font-black tracking-[-0.04em] bg-gradient-to-br from-[#6ee7b7] to-[#10b981] bg-clip-text text-transparent">
              SD
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="text-[13px] font-bold tracking-tight text-foreground truncate">
              {profile.name}
            </h1>
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{profile.role}</p>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase border border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-400/90">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Available
        </div>
      </motion.div>

      <div className="h-px bg-foreground/[0.06] mb-6" />

      {/* Nav links */}
      <nav className="flex-1" aria-label="Main navigation">
        <ul className="space-y-0.5">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
              >
                <button
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-3 group",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/85"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-[0.2em] transition-colors duration-200",
                      isActive ? "text-accent" : "text-muted/60 group-hover:text-muted",
                    )}
                  >
                    {link.num}
                  </span>
                  <span
                    className={cn(
                      "h-px transition-all duration-300",
                      isActive ? "w-6 bg-accent" : "w-2 bg-foreground/15 group-hover:w-4 group-hover:bg-foreground/30",
                    )}
                  />
                  <span className={cn("text-[13px]", isActive && "font-semibold")}>{link.label}</span>
                </button>
              </motion.li>
            )
          })}
        </ul>
      </nav>

      <div className="h-px bg-foreground/[0.06] my-6" />

      {/* Bottom actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="space-y-4"
      >
        {/* Social links */}
        <div className="flex items-center gap-1.5">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/8 transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>

        {/* Theme + Resume */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/8 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85, rotate: 180 }}
          >
            <span className="theme-toggle-icons" aria-hidden="true">
              <Sun size={15} className="theme-icon theme-icon-sun" />
              <Moon size={15} className="theme-icon theme-icon-moon" />
            </span>
          </motion.button>

          <motion.a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-accent/25 text-accent hover:bg-accent/8 transition-all duration-200 overflow-hidden relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <FileText size={12} />
              Resume
            </span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toggleTheme } = useTheme()

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[268px] border-r border-foreground/[0.06] bg-background/96 backdrop-blur-2xl z-40">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-background/95 backdrop-blur-xl border-b border-foreground/[0.06]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-bold tracking-tight hover:text-accent transition-colors"
        >
          {profile.name.split(" ")[0]}
          <motion.span
            className="text-accent inline-block"
            animate={{ rotate: [0, 0, 0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          >
            .
          </motion.span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-muted-foreground hover:text-accent transition-colors"
          >
            <span className="theme-toggle-icons" aria-hidden="true">
              <Sun size={15} className="theme-icon theme-icon-sun" />
              <Moon size={15} className="theme-icon theme-icon-moon" />
            </span>
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[268px] z-50 bg-background border-r border-foreground/[0.06]"
            >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
              >
                <X size={18} />
              </button>
              <SidebarContent onLinkClick={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
