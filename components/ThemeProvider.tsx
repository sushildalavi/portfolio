"use client"

import {
  createContext,
  useContext,
  type ReactNode,
} from "react"

interface ThemeContextValue {
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const toggleTheme = () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark"
    const next = current === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", next)
    localStorage.setItem("portfolio-theme", next)
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
