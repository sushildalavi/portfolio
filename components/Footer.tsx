import { profile } from "@/data/profile"

export default function Footer() {
  return (
    <footer className="border-t border-foreground/[0.06] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <p className="text-xs text-muted/60">
          Next.js &middot; Three.js &middot; Framer Motion
        </p>
      </div>
    </footer>
  )
}
