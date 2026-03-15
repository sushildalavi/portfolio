"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, FileText, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { profile } from "@/data/profile"
import { useTheme } from "@/components/ThemeProvider"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-foreground/[0.06]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-bold tracking-tight hover:text-accent transition-colors"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          {profile.name.split(" ")[0]}
          <motion.span
            className="text-accent inline-block"
            animate={{ rotate: [0, 0, 0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          >
            .
          </motion.span>
        </motion.button>

        {/* Desktop nav links with animated underline */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="relative text-sm text-foreground/60 hover:text-accent transition-colors duration-200 py-1"
              whileHover="hover"
              initial="rest"
            >
              {link.label}
              <motion.span
                className="absolute left-0 bottom-0 h-[2px] w-full bg-accent origin-left"
                variants={{
                  rest: { scaleX: 0, opacity: 0 },
                  hover: { scaleX: 1, opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
              />
            </motion.button>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle with spin */}
          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-foreground/50 hover:text-accent hover:bg-foreground/[0.05] transition-all duration-200"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85, rotate: 180 }}
          >
            <span className="theme-toggle-icons" aria-hidden="true">
              <Sun size={16} className="theme-icon theme-icon-sun" />
              <Moon size={16} className="theme-icon theme-icon-moon" />
            </span>
          </motion.button>

          {/* Resume button with shimmer */}
          <motion.a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-accent/30 text-accent overflow-hidden"
            whileHover={{ scale: 1.06, borderColor: "var(--accent-val)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <FileText size={14} />
              Resume
            </span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
          </motion.a>
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-foreground/50 hover:text-accent transition-colors"
            whileTap={{ scale: 0.85, rotate: 180 }}
          >
            <span className="theme-toggle-icons" aria-hidden="true">
              <Sun size={16} className="theme-icon theme-icon-sun" />
              <Moon size={16} className="theme-icon theme-icon-moon" />
            </span>
          </motion.button>
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.85 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-foreground/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-foreground/60 hover:text-accent active:text-accent transition-colors text-left py-1.5"
                  whileHover={{ x: 8 }}
                  whileTap={{ x: 12, scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                    {link.label}
                  </span>
                </motion.button>
              ))}
              <motion.a
                href={profile.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors w-fit mt-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText size={14} />
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
