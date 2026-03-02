"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { X, Search, Loader2 } from "lucide-react"
import { getIconUrl } from "@/data/icon-sets"

type EmojiStyle = "twemoji" | "fluent-emoji-flat" | "noto" | "openmoji"

interface EmojiPickerDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (emojiUrl: string, alt: string) => void
}

const emojiStyles: { id: EmojiStyle; name: string; desc: string }[] = [
  { id: "twemoji", name: "Twemoji", desc: "Twitter 扁平风格" },
  { id: "fluent-emoji-flat", name: "Fluent", desc: "Microsoft 风格" },
  { id: "noto", name: "Noto", desc: "Google 风格" },
  { id: "openmoji", name: "OpenMoji", desc: "开放风格" },
]

const emojiCategories = [
  { id: "face", name: "😀 表情", query: "face smile laugh" },
  { id: "hand", name: "👋 手势", query: "hand thumb point wave" },
  { id: "heart", name: "❤️ 心形", query: "heart love" },
  { id: "animal", name: "🐱 动物", query: "cat dog animal" },
  { id: "food", name: "🍕 食物", query: "food fruit drink" },
  { id: "activity", name: "⚽ 运动", query: "sport ball game" },
  { id: "travel", name: "🚗 交通", query: "car travel plane" },
  { id: "object", name: "💡 物品", query: "light tool office" },
  { id: "symbol", name: "✨ 符号", query: "star symbol sign" },
  { id: "flag", name: "🏁 旗帜", query: "flag" },
  { id: "weather", name: "🌤️ 天气", query: "sun cloud rain weather" },
  { id: "plant", name: "🌸 植物", query: "flower tree plant" },
]

export function EmojiPickerDialog({ open, onClose, onSelect }: EmojiPickerDialogProps) {
  const [style, setStyle] = useState<EmojiStyle>("twemoji")
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(emojiCategories[0])
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [size, setSize] = useState(24)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      searchEmoji(category.query)
    }
  }, [open])

  const searchEmoji = useCallback(
    async (q: string) => {
      if (!q.trim()) return
      setLoading(true)
      try {
        const params = new URLSearchParams({
          query: q,
          limit: "80",
          prefixes: style,
        })
        const res = await fetch(`https://api.iconify.design/search?${params}`)
        const data = await res.json()
        setResults(data.icons || [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    },
    [style]
  )

  const handleQueryChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => searchEmoji(value), 300)
  }

  const handleCategoryClick = (cat: (typeof emojiCategories)[0]) => {
    setCategory(cat)
    setQuery("")
    searchEmoji(cat.query)
  }

  const handleStyleChange = (s: EmojiStyle) => {
    setStyle(s)
    // Re-search with new style
    setTimeout(() => searchEmoji(query || category.query), 50)
  }

  const handleSelect = (icon: string) => {
    const [prefix, name] = icon.split(":")
    const url = getIconUrl(prefix, name, size)
    onSelect(url, name)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-[680px] max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">插入 Emoji</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Style selector */}
        <div className="flex items-center gap-2 px-5 pt-3">
          {emojiStyles.map((s) => (
            <button
              key={s.id}
              onClick={() => handleStyleChange(s.id)}
              className={`px-3 py-1.5 text-sm rounded-lg transition ${
                style === s.id
                  ? "bg-emerald-100 text-emerald-700 font-medium"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {s.name}
              <span className="text-[10px] ml-1 opacity-60">{s.desc}</span>
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
              placeholder="搜索 emoji... (如: smile, heart, fire, rocket)"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            {loading && <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />}
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 px-5 pt-2 pb-1 overflow-x-auto">
          {emojiCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className={`shrink-0 px-2.5 py-1 text-xs rounded-full transition ${
                category.id === cat.id && !query
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Size selector */}
        <div className="flex items-center gap-2 px-5 py-1.5 text-xs text-gray-500">
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
        </div>

        {/* Results grid */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="grid grid-cols-10 gap-1.5">
            {results.map((icon) => {
              const [prefix, name] = icon.split(":")
              return (
                <button
                  key={icon}
                  onClick={() => handleSelect(icon)}
                  className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg hover:bg-gray-50 transition"
                  title={name}
                >
                  <img
                    src={getIconUrl(prefix, name, 36)}
                    alt={name}
                    width={36}
                    height={36}
                    loading="lazy"
                  />
                </button>
              )
            })}
            {!loading && results.length === 0 && (
              <div className="col-span-10 text-center py-12 text-gray-400 text-sm">
                {query ? "未找到匹配的 Emoji" : "选择分类或搜索"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
