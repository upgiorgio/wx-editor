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
    "bootstrap-blue": "#0d6efd",
    "bootstrap-dark": "#212529",
    "bootstrap-purple": "#6f42c1",
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
      >
        <Paintbrush size={13} className="text-gray-500" />
        <span className="hidden sm:inline text-gray-600">{activeTheme.name}</span>
        <div
          className="w-3 h-3 rounded-full ring-1 ring-black/10"
          style={{ backgroundColor: themeColors[activeTheme.id] || "#333" }}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-1.5 dialog-panel">
          <div className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">选择排版主题</div>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => { onSelect(theme); setOpen(false) }}
              className={`w-full px-3 py-2.5 flex items-center gap-3 text-left hover:bg-gray-50 transition-all rounded-lg mx-0 ${
                activeTheme.id === theme.id ? "bg-emerald-50/80" : ""
              }`}
            >
              <div
                className="w-5 h-5 rounded-lg ring-1 ring-black/5 shadow-sm shrink-0"
                style={{ backgroundColor: themeColors[theme.id] || "#333" }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-700">{theme.name}</div>
                <div className="text-[11px] text-gray-400 truncate">{theme.description}</div>
              </div>
              {activeTheme.id === theme.id && (
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
