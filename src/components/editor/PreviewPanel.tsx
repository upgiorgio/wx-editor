"use client"

import type { Editor } from "@tiptap/react"
import type { Theme } from "@/data/themes"
import { useEffect, useState } from "react"
import { StyleSettings, generateStyleOverrides, type StyleConfig } from "./StyleSettings"

interface PreviewPanelProps {
  editor: Editor
  theme: Theme
  styleConfig: StyleConfig
  onStyleChange: (config: StyleConfig) => void
}

export function PreviewPanel({ editor, theme, styleConfig, onStyleChange }: PreviewPanelProps) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    const update = () => setHtml(editor.getHTML())
    update()
    editor.on("update", update)
    return () => { editor.off("update", update) }
  }, [editor])

  const overrideCss = generateStyleOverrides(styleConfig)

  return (
    <div className="h-full flex flex-col">
      {/* Style Settings Panel */}
      <StyleSettings config={styleConfig} onChange={onStyleChange} />

      <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
        <span className="text-xs font-medium text-gray-500">预览 — {theme.name}</span>
        <span className="text-xs text-gray-400">微信公众号效果</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div
          className="max-w-[375px] mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <style dangerouslySetInnerHTML={{ __html: theme.css + overrideCss }} />
          <div
            className="wx-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}
