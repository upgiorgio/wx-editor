"use client"

import type { Editor } from "@tiptap/react"
import {
  Bold, Italic, Underline, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, ListChecks, Quote, Minus, Image, Link, Table,
  AlignLeft, AlignCenter, AlignRight, Highlighter, Undo2, Redo2,
  Copy, SmilePlus, Palette, CodeXml,
} from "lucide-react"
import { useCallback, useState } from "react"
import copyToClipboard from "copy-to-clipboard"

interface ToolbarProps {
  editor: Editor
  onIconClick: () => void
  onEmojiClick: () => void
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
      className={`p-1.5 rounded-md transition-colors ${
        active
          ? "bg-emerald-100 text-emerald-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  )
}

function Separator() {
  return <div className="w-px h-5 bg-gray-200 mx-1" />
}

export function EditorToolbar({ editor, onIconClick, onEmojiClick }: ToolbarProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle")

  const addImage = useCallback(() => {
    const url = window.prompt("输入图片URL（远程图片将自动代理下载）:")
    if (!url) return
    // For now insert directly; in Phase 1 we'll add proxy fetch
    editor.chain().focus().setImage({ src: url }).run()
  }, [editor])

  const addLink = useCallback(() => {
    const url = window.prompt("输入链接URL:")
    if (!url) return
    editor.chain().focus().setLink({ href: url }).run()
  }, [editor])

  const copyToWechat = useCallback(() => {
    const html = editor.getHTML()
    // Wrap with theme styles for clipboard
    const styledHtml = `<div class="wx-content">${html}</div>`
    copyToClipboard(styledHtml, { format: "text/html" })
    setCopyStatus("copied")
    setTimeout(() => setCopyStatus("idle"), 2000)
  }, [editor])

  const addTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  const s = 16

  return (
    <div className="bg-white border-b border-gray-200 px-3 py-1.5 flex items-center gap-0.5 flex-wrap shrink-0">
      {/* Undo/Redo */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="撤销">
        <Undo2 size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="重做">
        <Redo2 size={s} />
      </ToolbarButton>

      <Separator />

      {/* Headings */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="标题1">
        <Heading1 size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="标题2">
        <Heading2 size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="标题3">
        <Heading3 size={s} />
      </ToolbarButton>

      <Separator />

      {/* Text formatting */}
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

      <Separator />

      {/* Alignment */}
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="左对齐">
        <AlignLeft size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="居中">
        <AlignCenter size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="右对齐">
        <AlignRight size={s} />
      </ToolbarButton>

      <Separator />

      {/* Lists */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="无序列表">
        <List size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="有序列表">
        <ListOrdered size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive("taskList")} title="任务列表">
        <ListChecks size={s} />
      </ToolbarButton>

      <Separator />

      {/* Block elements */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="引用">
        <Quote size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="代码块">
        <CodeXml size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="分割线">
        <Minus size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={addTable} title="插入表格">
        <Table size={s} />
      </ToolbarButton>

      <Separator />

      {/* Media */}
      <ToolbarButton onClick={addImage} title="插入图片">
        <Image size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={addLink} title="插入链接">
        <Link size={s} />
      </ToolbarButton>

      <Separator />

      {/* Icons & Emoji */}
      <ToolbarButton onClick={onIconClick} title="插入图标 (29万+)">
        <Palette size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={onEmojiClick} title="插入 Emoji">
        <SmilePlus size={s} />
      </ToolbarButton>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Copy to WeChat */}
      <button
        onClick={copyToWechat}
        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
          copyStatus === "copied"
            ? "bg-emerald-500 text-white"
            : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
        }`}
      >
        {copyStatus === "copied" ? "✓ 已复制" : "复制到微信"}
      </button>
    </div>
  )
}
