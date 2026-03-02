"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { X, Search, Star, Loader2 } from "lucide-react"
import { iconSets, getIconUrl } from "@/data/icon-sets"

interface IconPickerDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (iconUrl: string, alt: string) => void
}

export function IconPickerDialog({ open, onClose, onSelect }: IconPickerDialogProps) {
  const [query, setQuery] = useState("")
  const [selectedSet, setSelectedSet] = useState<string | null>(null)
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [tab, setTab] = useState<"icons" | "brands" | "favorites">("icons")
  const [size, setSize] = useState(24)
  const [color, setColor] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wx-editor-icon-favorites")
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      // Load default icons
      if (results.length === 0 && !query) {
        searchIcons("home")
      }
    }
  }, [open])

  const searchIcons = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const prefixes = selectedSet
        ? [selectedSet]
        : tab === "brands"
        ? ["simple-icons", "logos"]
        : iconSets.filter((s) => s.category === "ui").map((s) => s.prefix)

      const params = new URLSearchParams({
        query: q,
        limit: "80",
        ...(prefixes.length <= 10 ? { prefixes: prefixes.join(",") } : {}),
      })
      const res = await fetch(`https://api.iconify.design/search?${params}`)
      const data = await res.json()
      setResults(data.icons || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [selectedSet, tab])

  const handleQueryChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => searchIcons(value), 300)
  }

  const handleSelect = (icon: string) => {
    const [prefix, name] = icon.split(":")
    const url = getIconUrl(prefix, name, size, color || undefined)
    onSelect(url, icon)
  }

  const toggleFavorite = (icon: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const next = favorites.includes(icon)
      ? favorites.filter((f) => f !== icon)
      : [...favorites, icon]
    setFavorites(next)
    localStorage.setItem("wx-editor-icon-favorites", JSON.stringify(next))
  }

  if (!open) return null

  const uiSets = iconSets.filter((s) => s.category === "ui")
  const brandSets = iconSets.filter((s) => s.category === "brand")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-[720px] max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">插入图标</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Powered by Iconify · 290,000+ 图标</span>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
              <X size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3">
          {(["icons", "brands", "favorites"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setSelectedSet(null); setQuery(""); setResults([]) }}
              className={`px-3 py-1.5 text-sm rounded-md transition ${
                tab === t ? "bg-emerald-100 text-emerald-700 font-medium" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {t === "icons" && "📦 图标库"}
              {t === "brands" && "🏢 品牌"}
              {t === "favorites" && `⭐ 收藏 (${favorites.length})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="px-5 pt-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="搜索图标... (如: home, arrow, settings, chart)"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
            />
            {loading && <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />}
          </div>
        </div>

        {/* Set filter chips */}
        {tab !== "favorites" && (
          <div className="flex items-center gap-1.5 px-5 pt-2 pb-1 overflow-x-auto">
            <button
              onClick={() => { setSelectedSet(null); if (query) searchIcons(query) }}
              className={`shrink-0 px-2.5 py-1 text-xs rounded-full transition ${
                !selectedSet ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              全部
            </button>
            {(tab === "brands" ? brandSets : uiSets).map((set) => (
              <button
                key={set.prefix}
                onClick={() => {
                  setSelectedSet(set.prefix === selectedSet ? null : set.prefix)
                  if (query) setTimeout(() => searchIcons(query), 50)
                }}
                className={`shrink-0 px-2.5 py-1 text-xs rounded-full transition ${
                  selectedSet === set.prefix
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {set.name} ({set.total.toLocaleString()})
              </button>
            ))}
          </div>
        )}

        {/* Size & Color */}
        <div className="flex items-center gap-4 px-5 py-2 text-xs text-gray-500">
          <label className="flex items-center gap-1.5">
            尺寸:
            {[16, 20, 24, 32, 48].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-1.5 py-0.5 rounded ${
                  size === s ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
                }`}
              >
                {s}
              </button>
            ))}
          </label>
          <label className="flex items-center gap-1.5">
            颜色:
            <input
              type="color"
              value={color || "#333333"}
              onChange={(e) => setColor(e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border-0"
            />
            {color && (
              <button onClick={() => setColor("")} className="text-gray-400 hover:text-gray-600">
                重置
              </button>
            )}
          </label>
        </div>

        {/* Results grid */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {tab === "favorites" ? (
            <div className="grid grid-cols-8 gap-2">
              {favorites.map((icon) => {
                const [prefix, name] = icon.split(":")
                return (
                  <button
                    key={icon}
                    onClick={() => handleSelect(icon)}
                    className="group relative flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition"
                    title={icon}
                  >
                    <img
                      src={getIconUrl(prefix, name, 32, color || undefined)}
                      alt={icon}
                      width={32}
                      height={32}
                      loading="lazy"
                    />
                    <span className="text-[10px] text-gray-400 truncate w-full text-center">{name}</span>
                    <button
                      onClick={(e) => toggleFavorite(icon, e)}
                      className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 p-0.5"
                    >
                      <Star size={10} className="fill-yellow-400 text-yellow-400" />
                    </button>
                  </button>
                )
              })}
              {favorites.length === 0 && (
                <div className="col-span-8 text-center py-12 text-gray-400 text-sm">
                  还没有收藏的图标，搜索后点击 ⭐ 收藏
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-8 gap-2">
              {results.map((icon) => {
                const [prefix, name] = icon.split(":")
                const isFav = favorites.includes(icon)
                return (
                  <button
                    key={icon}
                    onClick={() => handleSelect(icon)}
                    className="group relative flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition"
                    title={icon}
                  >
                    <img
                      src={getIconUrl(prefix, name, 32, color || undefined)}
                      alt={icon}
                      width={32}
                      height={32}
                      loading="lazy"
                    />
                    <span className="text-[10px] text-gray-400 truncate w-full text-center">{name}</span>
                    <button
                      onClick={(e) => toggleFavorite(icon, e)}
                      className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 p-0.5"
                    >
                      <Star size={10} className={isFav ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                    </button>
                  </button>
                )
              })}
              {!loading && results.length === 0 && query && (
                <div className="col-span-8 text-center py-12 text-gray-400 text-sm">
                  未找到匹配的图标，试试其他关键词
                </div>
              )}
              {!loading && results.length === 0 && !query && (
                <div className="col-span-8 text-center py-12 text-gray-400 text-sm">
                  输入关键词搜索 290,000+ 图标
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
