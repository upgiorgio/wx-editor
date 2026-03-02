"use client"

import { useState, useRef, useEffect } from "react"
import { X, Search } from "lucide-react"
import {
  dividers,
  dividerCategories,
  getDividersByCategory,
  searchDividers,
  getDividerDataUri,
  type DividerCategory,
} from "@/data/dividers"

interface DividerPickerDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (html: string) => void
  tintColor?: string
}

export function DividerPickerDialog({ open, onClose, onSelect, tintColor }: DividerPickerDialogProps) {
  const [category, setCategory] = useState<DividerCategory>("line")
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  if (!open) return null

  const items = query ? searchDividers(query) : getDividersByCategory(category)

  const handleSelect = (idx: number) => {
    const d = items[idx]
    const dataUri = getDividerDataUri(d, tintColor)
    const html = `<img src="${dataUri}" alt="${d.name}" style="display:block;width:100%;margin:16px 0;height:auto;" />`
    onSelect(html)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm dialog-backdrop" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-[640px] max-h-[70vh] flex flex-col overflow-hidden border border-gray-100 dialog-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-transparent">
          <h2 className="text-base font-bold text-gray-800">插入分隔线</h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">{dividers.length} 款精选</span>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
              <X size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-5 pt-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索分隔线... (如: 波浪, star, flower)"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition"
            />
          </div>
        </div>

        {/* Category chips */}
        {!query && (
          <div className="flex items-center gap-1.5 px-5 pt-2 pb-1 overflow-x-auto">
            {dividerCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`shrink-0 px-3 py-1 text-xs rounded-full font-medium transition-all ${
                  category === cat.id
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            {items.map((d, i) => (
              <button
                key={d.id}
                onClick={() => handleSelect(i)}
                className="group flex flex-col gap-1.5 p-4 rounded-xl border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/20 hover:shadow-sm transition-all"
                title={d.name}
              >
                <div className="w-full h-8 flex items-center justify-center overflow-hidden">
                  <img
                    src={getDividerDataUri(d, tintColor)}
                    alt={d.name}
                    className="w-full h-auto"
                    style={{ maxHeight: "28px" }}
                  />
                </div>
                <span className="text-[11px] text-gray-400 group-hover:text-emerald-600 font-medium transition">
                  {d.name}
                </span>
              </button>
            ))}
          </div>
          {items.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-sm">
              未找到匹配的分隔线
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
