"use client"

import type { Theme } from "@/data/themes"
import { useState, useRef, useEffect } from "react"
import { Paintbrush, Check } from "lucide-react"

interface ThemeSelectorProps {
  themes: Theme[]
  activeTheme: Theme
  onSelect: (theme: Theme) => void
}

export function ThemeSelector({ themes, activeTheme, onSelect }: ThemeSelectorProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const themeColors: Record<string, string> = {
    default: "#333333",
    "elegant-green": "#1a8a5c",
    "warm-orange": "#e67e22",
    "deep-blue": "#2980b9",
    "minimal-pink": "#e91e63",
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition"
      >
        <Paintbrush size={14} />
        <span className="hidden sm:inline">{activeTheme.name}</span>
        <div
          className="w-3 h-3 rounded-full border border-gray-300"
          style={{ backgroundColor: themeColors[activeTheme.id] || "#333" }}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
          <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase">选择主题</div>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => { onSelect(theme); setOpen(false) }}
              className={`w-full px-3 py-2 flex items-center gap-3 text-left hover:bg-gray-50 transition ${
                activeTheme.id === theme.id ? "bg-emerald-50" : ""
              }`}
            >
              <div
                className="w-4 h-4 rounded-full border border-gray-200 shrink-0"
                style={{ backgroundColor: themeColors[theme.id] || "#333" }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-700">{theme.name}</div>
                <div className="text-xs text-gray-400 truncate">{theme.description}</div>
              </div>
              {activeTheme.id === theme.id && <Check size={14} className="text-emerald-600 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
