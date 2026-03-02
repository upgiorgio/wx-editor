"use client"

import type { Editor } from "@tiptap/react"
import type { Theme } from "@/data/themes"
import { useEffect, useState } from "react"
import { Smartphone } from "lucide-react"
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

      <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Smartphone size={13} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-600">{theme.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">375px</span>
          <span className="text-[10px] text-gray-400">微信效果预览</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-gray-50/80 to-gray-100/40">
        {/* Phone frame mockup */}
        <div className="max-w-[375px] mx-auto">
          {/* Phone notch */}
          <div className="flex justify-center mb-1">
            <div className="w-20 h-1 bg-gray-300 rounded-full" />
          </div>
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-300/30 border border-gray-200/80 overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: theme.css + overrideCss }} />
            <div
              className="wx-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
