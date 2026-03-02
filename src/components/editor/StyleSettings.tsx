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

// Merged preset colors: WX Editor originals + Bootstrap 5.3 palette
const presetColors = [
  // Row 1: WX Editor
  { color: "#1a8a5c", name: "WX 绿" },
  { color: "#333333", name: "经典黑" },
  { color: "#576b95", name: "微信蓝" },
  { color: "#e91e63", name: "少女粉" },
  { color: "#e67e22", name: "暖阳橙" },
  { color: "#f39c12", name: "金色" },
  // Row 2: Bootstrap 5.3
  { color: "#0d6efd", name: "Bootstrap Blue" },
  { color: "#6610f2", name: "Bootstrap Indigo" },
  { color: "#6f42c1", name: "Bootstrap Purple" },
  { color: "#d63384", name: "Bootstrap Pink" },
  { color: "#dc3545", name: "Bootstrap Red" },
  { color: "#fd7e14", name: "Bootstrap Orange" },
  { color: "#ffc107", name: "Bootstrap Yellow" },
  { color: "#198754", name: "Bootstrap Green" },
  { color: "#20c997", name: "Bootstrap Teal" },
  { color: "#0dcaf0", name: "Bootstrap Cyan" },
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
    <div className="border-b border-gray-100">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-700 bg-gradient-to-r from-gray-50 to-transparent transition"
      >
        <span className="flex items-center gap-1.5">
          <Settings2 size={13} />
          排版设置
        </span>
        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {expanded && (
        <div className="px-4 pb-3.5 space-y-3.5">
          {/* Primary Color */}
          <div>
            <label className="text-[11px] font-medium text-gray-400 mb-1.5 block">主题色</label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {presetColors.map((c) => (
                <button
                  key={c.color}
                  onClick={() => update({ primaryColor: c.color })}
                  title={c.name}
                  className={`w-[18px] h-[18px] rounded-full transition-all duration-150 ${
                    config.primaryColor === c.color
                      ? "ring-2 ring-offset-1 ring-gray-400 scale-125"
                      : "hover:scale-125 ring-1 ring-black/5"
                  }`}
                  style={{ backgroundColor: c.color }}
                />
              ))}
              <div className="relative ml-1">
                <input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => update({ primaryColor: e.target.value })}
                  className="w-[18px] h-[18px] rounded-full cursor-pointer border-0 opacity-0 absolute inset-0"
                  title="自定义颜色"
                />
                <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-red-400 via-yellow-400 via-green-400 to-blue-400 ring-1 ring-black/10 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-[11px] font-medium text-gray-400 mb-1.5 block">字号</label>
            <div className="flex items-center gap-1">
              {[13, 14, 15, 16, 17, 18].map((s) => (
                <button
                  key={s}
                  onClick={() => update({ fontSize: s })}
                  className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-all ${
                    config.fontSize === s
                      ? "bg-emerald-500 text-white shadow-sm shadow-emerald-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {s}px
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="text-[11px] font-medium text-gray-400 mb-1.5 block">字体</label>
            <div className="flex items-center gap-1.5">
              {(Object.keys(fontFamilyMap) as Array<keyof typeof fontFamilyMap>).map((key) => (
                <button
                  key={key}
                  onClick={() => update({ fontFamily: key })}
                  className={`px-3 py-1 text-[11px] rounded-lg font-medium transition-all ${
                    config.fontFamily === key
                      ? "bg-emerald-500 text-white shadow-sm shadow-emerald-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {fontFamilyMap[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* Code Theme */}
          <div>
            <label className="text-[11px] font-medium text-gray-400 mb-1.5 block">代码块主题</label>
            <div className="flex items-center gap-1.5">
              {codeThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => update({ codeTheme: t.id })}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-lg font-medium border transition-all ${
                    config.codeTheme === t.id
                      ? "border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded" style={{ background: t.bg, border: "1px solid rgba(0,0,0,0.1)" }} />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles Row */}
          <div className="flex items-center gap-4 flex-wrap pt-0.5">
            <ToggleSwitch
              label="Mac 代码块"
              checked={config.macCodeBlock}
              onChange={(v) => update({ macCodeBlock: v })}
            />
            <ToggleSwitch
              label="行号"
              checked={config.lineNumbers}
              onChange={(v) => update({ lineNumbers: v })}
            />
            <ToggleSwitch
              label="段落缩进"
              checked={config.paragraphIndent}
              onChange={(v) => update({ paragraphIndent: v })}
            />
            <ToggleSwitch
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

function ToggleSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-1.5 cursor-pointer select-none group">
      <button
        onClick={() => onChange(!checked)}
        className={`w-8 h-[18px] rounded-full transition-all duration-200 relative shadow-inner ${
          checked ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-all duration-200 ${
            checked ? "translate-x-[16px]" : "translate-x-[2px]"
          }`}
        />
      </button>
      <span className="text-[11px] text-gray-500 group-hover:text-gray-700 font-medium transition">{label}</span>
    </label>
  )
}

// Generate CSS overrides based on StyleConfig
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
