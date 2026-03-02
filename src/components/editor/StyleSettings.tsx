"use client"

import { useState } from "react"
import { Settings2, ChevronDown, ChevronUp } from "lucide-react"

export interface StyleConfig {
  primaryColor: string
  fontSize: number
  fontFamily: "sans" | "serif" | "mono"
  codeTheme: "dark" | "light" | "github" | "monokai"
  macCodeBlock: boolean
  lineNumbers: boolean
  paragraphIndent: boolean
  textJustify: boolean
}

export const defaultStyleConfig: StyleConfig = {
  primaryColor: "#1a8a5c",
  fontSize: 15,
  fontFamily: "sans",
  codeTheme: "dark",
  macCodeBlock: true,
  lineNumbers: false,
  paragraphIndent: false,
  textJustify: true,
}

const presetColors = [
  { color: "#1a8a5c", name: "绿" },
  { color: "#333333", name: "黑" },
  { color: "#576b95", name: "微信蓝" },
  { color: "#2980b9", name: "蓝" },
  { color: "#e67e22", name: "橙" },
  { color: "#e91e63", name: "粉" },
  { color: "#9b59b6", name: "紫" },
  { color: "#e74c3c", name: "红" },
  { color: "#1abc9c", name: "青" },
  { color: "#f39c12", name: "金" },
  { color: "#34495e", name: "灰" },
]

const fontFamilyMap = {
  sans: { label: "无衬线", family: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif' },
  serif: { label: "衬线", family: '"Noto Serif SC", "Source Han Serif SC", "STSong", Georgia, serif' },
  mono: { label: "等宽", family: '"JetBrains Mono", "Fira Code", "SF Mono", "Menlo", monospace' },
}

const codeThemes = [
  { id: "dark" as const, name: "暗色", bg: "#1e1e1e", fg: "#d4d4d4" },
  { id: "light" as const, name: "亮色", bg: "#f8f8f8", fg: "#333333" },
  { id: "github" as const, name: "GitHub", bg: "#f6f8fa", fg: "#24292e" },
  { id: "monokai" as const, name: "Monokai", bg: "#272822", fg: "#f8f8f2" },
]

interface StyleSettingsProps {
  config: StyleConfig
  onChange: (config: StyleConfig) => void
}

export function StyleSettings({ config, onChange }: StyleSettingsProps) {
  const [expanded, setExpanded] = useState(true)

  const update = (partial: Partial<StyleConfig>) => {
    onChange({ ...config, ...partial })
  }

  return (
    <div className="border-b border-gray-100 bg-gray-50/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 transition"
      >
        <span className="flex items-center gap-1.5">
          <Settings2 size={13} />
          排版设置
        </span>
        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {expanded && (
        <div className="px-4 pb-3 space-y-3">
          {/* Primary Color */}
          <div>
            <label className="text-[11px] text-gray-400 mb-1 block">主题色</label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {presetColors.map((c) => (
                <button
                  key={c.color}
                  onClick={() => update({ primaryColor: c.color })}
                  title={c.name}
                  className={`w-5 h-5 rounded-full border-2 transition ${
                    config.primaryColor === c.color ? "border-gray-800 scale-110" : "border-transparent hover:scale-110"
                  }`}
                  style={{ backgroundColor: c.color }}
                />
              ))}
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => update({ primaryColor: e.target.value })}
                className="w-5 h-5 rounded cursor-pointer border-0 ml-1"
                title="自定义颜色"
              />
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-[11px] text-gray-400 mb-1 block">字号</label>
            <div className="flex items-center gap-1">
              {[13, 14, 15, 16, 17, 18].map((s) => (
                <button
                  key={s}
                  onClick={() => update({ fontSize: s })}
                  className={`px-2 py-0.5 text-xs rounded transition ${
                    config.fontSize === s
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "bg-white text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="text-[11px] text-gray-400 mb-1 block">字体</label>
            <div className="flex items-center gap-1">
              {(Object.keys(fontFamilyMap) as Array<keyof typeof fontFamilyMap>).map((key) => (
                <button
                  key={key}
                  onClick={() => update({ fontFamily: key })}
                  className={`px-2.5 py-0.5 text-xs rounded transition ${
                    config.fontFamily === key
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "bg-white text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {fontFamilyMap[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* Code Theme */}
          <div>
            <label className="text-[11px] text-gray-400 mb-1 block">代码块</label>
            <div className="flex items-center gap-1.5">
              {codeThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => update({ codeTheme: t.id })}
                  className={`flex items-center gap-1 px-2 py-0.5 text-xs rounded border transition ${
                    config.codeTheme === t.id
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="w-3 h-3 rounded-sm" style={{ background: t.bg, border: "1px solid #ddd" }} />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles Row */}
          <div className="flex items-center gap-3 flex-wrap">
            <ToggleOption
              label="Mac 风格代码块"
              checked={config.macCodeBlock}
              onChange={(v) => update({ macCodeBlock: v })}
            />
            <ToggleOption
              label="行号"
              checked={config.lineNumbers}
              onChange={(v) => update({ lineNumbers: v })}
            />
            <ToggleOption
              label="段落缩进"
              checked={config.paragraphIndent}
              onChange={(v) => update({ paragraphIndent: v })}
            />
            <ToggleOption
              label="两端对齐"
              checked={config.textJustify}
              onChange={(v) => update({ textJustify: v })}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function ToggleOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-1.5 cursor-pointer select-none">
      <button
        onClick={() => onChange(!checked)}
        className={`w-7 h-4 rounded-full transition-colors relative ${
          checked ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </button>
      <span className="text-[11px] text-gray-500">{label}</span>
    </label>
  )
}

// Generate CSS overrides based on StyleConfig — applied to .wx-content
export function generateStyleOverrides(config: StyleConfig): string {
  const font = fontFamilyMap[config.fontFamily].family
  const ct = codeThemes.find((t) => t.id === config.codeTheme) || codeThemes[0]

  const macDots = config.macCodeBlock
    ? `
    .wx-content pre::before {
      content: "";
      display: block;
      height: 20px;
      margin: -8px -16px 10px;
      background: ${ct.bg === "#1e1e1e" || ct.bg === "#272822" ? "#333" : "#e0e0e0"};
      border-radius: 8px 8px 0 0;
      background-image: radial-gradient(circle at 16px 10px, #ff5f56 5px, transparent 5px),
                         radial-gradient(circle at 36px 10px, #ffbd2e 5px, transparent 5px),
                         radial-gradient(circle at 56px 10px, #27c93f 5px, transparent 5px);
    }`
    : ""

  return `
    .wx-content {
      --md-primary-color: ${config.primaryColor};
      font-family: ${font};
      font-size: ${config.fontSize}px;
      ${config.textJustify ? "text-align: justify;" : ""}
    }
    .wx-content p {
      ${config.paragraphIndent ? "text-indent: 2em;" : ""}
      ${config.textJustify ? "text-align: justify;" : ""}
    }
    .wx-content h1 { color: var(--md-primary-color); }
    .wx-content h2 { color: var(--md-primary-color); border-color: var(--md-primary-color); }
    .wx-content h3 { color: var(--md-primary-color); }
    .wx-content blockquote { border-left-color: var(--md-primary-color); }
    .wx-content code { color: var(--md-primary-color); }
    .wx-content a { color: var(--md-primary-color); }
    .wx-content strong { color: var(--md-primary-color); }
    .wx-content th { color: var(--md-primary-color); }
    .wx-content pre {
      background: ${ct.bg};
      color: ${ct.fg};
      position: relative;
      overflow: hidden;
      ${config.macCodeBlock ? "padding-top: 16px;" : ""}
      border-radius: 8px;
    }
    .wx-content pre code {
      ${config.lineNumbers ? "counter-reset: line;" : ""}
    }
    ${macDots}
  `
}
