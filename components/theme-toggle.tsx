"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-8 w-16 rounded-full bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-1 backdrop-blur-sm transition-colors duration-500 border border-gray-700"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform duration-500 flex items-center justify-center ${
          theme === "dark" ? "left-1" : "left-9"
        }`}
      >
        {theme === "dark" ? (
          <Moon size={14} className="text-purple-900" />
        ) : (
          <Sun size={14} className="text-amber-500" />
        )}
      </div>
    </button>
  )
}
