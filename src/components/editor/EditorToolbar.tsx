"use client"

import type { Editor } from "@tiptap/react"
import {
  Bold, Italic, Underline, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, ListChecks, Quote, Minus, Image, Link, Table,
  AlignLeft, AlignCenter, AlignRight, Highlighter, Undo2, Redo2,
  SmilePlus, Palette, CodeXml, SeparatorHorizontal, Copy, Check, ChevronDown,
} from "lucide-react"
import { useCallback, useState, useRef, useEffect } from "react"
import copyToClipboard from "copy-to-clipboard"

interface ToolbarProps {
  editor: Editor
  onIconClick: () => void
  onEmojiClick: () => void
  onDividerClick: () => void
}

function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-lg transition-all duration-150 ${
        active
          ? "bg-emerald-100 text-emerald-700 shadow-sm shadow-emerald-100"
          : "text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm"
      } ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  )
}

function ToolbarGroup({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="flex items-center gap-0.5 px-1 py-0.5 rounded-lg bg-gray-50/80" title={label}>
      {children}
    </div>
  )
}

function Separator() {
  return <div className="w-px h-4 bg-gray-200 mx-0.5" />
}

const copyTargets = [
  { id: "wechat", label: "微信公众号", icon: "📱" },
  { id: "zhihu", label: "知乎", icon: "📝" },
  { id: "juejin", label: "掘金", icon: "💎" },
  { id: "html", label: "复制 HTML", icon: "📄" },
  { id: "markdown", label: "复制 Markdown", icon: "📋" },
]

export function EditorToolbar({ editor, onIconClick, onEmojiClick, onDividerClick }: ToolbarProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle")
  const [showCopyMenu, setShowCopyMenu] = useState(false)
  const copyMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (copyMenuRef.current && !copyMenuRef.current.contains(e.target as Node)) setShowCopyMenu(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const addImage = useCallback(() => {
    const url = window.prompt("输入图片URL（远程图片将自动代理下载）:")
    if (!url) return
    editor.chain().focus().setImage({ src: url }).run()
  }, [editor])

  const addLink = useCallback(() => {
    const url = window.prompt("输入链接URL:")
    if (!url) return
    editor.chain().focus().setLink({ href: url }).run()
  }, [editor])

  const handleCopy = useCallback((targetId: string) => {
    const html = editor.getHTML()
    if (targetId === "markdown") {
      // For markdown, copy plain text version
      const text = editor.getText()
      copyToClipboard(text)
    } else if (targetId === "html") {
      copyToClipboard(html)
    } else {
      // For WeChat / Zhihu / Juejin — copy rich HTML
      const styledHtml = `<div class="wx-content">${html}</div>`
      copyToClipboard(styledHtml, { format: "text/html" })
    }
    setCopyStatus("copied")
    setShowCopyMenu(false)
    setTimeout(() => setCopyStatus("idle"), 2000)
  }, [editor])

  const addTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  const s = 15

  return (
    <div className="glass border-b border-white/20 px-3 py-1.5 flex items-center gap-1 flex-wrap shrink-0">
      {/* Undo/Redo */}
      <ToolbarGroup label="撤销">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="撤销">
          <Undo2 size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="重做">
          <Redo2 size={s} />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator />

      {/* Headings */}
      <ToolbarGroup label="标题">
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="标题1">
          <Heading1 size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="标题2">
          <Heading2 size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="标题3">
          <Heading3 size={s} />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator />

      {/* Text formatting */}
      <ToolbarGroup label="格式">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="加粗">
          <Bold size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="斜体">
          <Italic size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="下划线">
          <Underline size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="删除线">
          <Strikethrough size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="高亮">
          <Highlighter size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="行内代码">
          <Code size={s} />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator />

      {/* Alignment */}
      <ToolbarGroup label="对齐">
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="左对齐">
          <AlignLeft size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="居中">
          <AlignCenter size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="右对齐">
          <AlignRight size={s} />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator />

      {/* Lists & Blocks */}
      <ToolbarGroup label="列表">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="无序列表">
          <List size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="有序列表">
          <ListOrdered size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive("taskList")} title="任务列表">
          <ListChecks size={s} />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator />

      {/* Block elements */}
      <ToolbarGroup label="区块">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="引用">
          <Quote size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="代码块">
          <CodeXml size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="分割线">
          <Minus size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={onDividerClick} title="装饰分隔线 (24款)">
          <SeparatorHorizontal size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={addTable} title="插入表格">
          <Table size={s} />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator />

      {/* Media & Icons */}
      <ToolbarGroup label="媒体">
        <ToolbarButton onClick={addImage} title="插入图片">
          <Image size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={addLink} title="插入链接">
          <Link size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={onIconClick} title="插入图标 (29万+)">
          <Palette size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={onEmojiClick} title="插入 Emoji">
          <SmilePlus size={s} />
        </ToolbarButton>
      </ToolbarGroup>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Copy Button with dropdown */}
      <div className="relative" ref={copyMenuRef}>
        <div className="flex items-center">
          <button
            onClick={() => handleCopy("wechat")}
            className={`flex items-center gap-1.5 pl-4 pr-2 py-1.5 rounded-l-xl text-sm font-medium transition-all ${
              copyStatus === "copied"
                ? "bg-emerald-500 text-white"
                : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-md shadow-emerald-200/50"
            }`}
          >
            {copyStatus === "copied" ? <Check size={14} /> : <Copy size={14} />}
            {copyStatus === "copied" ? "已复制" : "复制到微信"}
          </button>
          <button
            onClick={() => setShowCopyMenu(!showCopyMenu)}
            className="flex items-center px-2 py-1.5 rounded-r-xl text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-l border-teal-400/50 transition-all shadow-md shadow-emerald-200/50"
          >
            <ChevronDown size={13} />
          </button>
        </div>

        {showCopyMenu && (
          <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-1 dialog-panel">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">导出到平台</div>
            {copyTargets.map((t) => (
              <button
                key={t.id}
                onClick={() => handleCopy(t.id)}
                className="w-full px-3 py-2 flex items-center gap-2.5 text-sm text-gray-700 hover:bg-gray-50 transition rounded-lg mx-0"
              >
                <span className="text-base">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
