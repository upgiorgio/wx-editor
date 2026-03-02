"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { Link } from "@tiptap/extension-link"
import { Placeholder } from "@tiptap/extension-placeholder"
import { Underline } from "@tiptap/extension-underline"
import { TextAlign } from "@tiptap/extension-text-align"
import { Highlight } from "@tiptap/extension-highlight"
import { TaskList } from "@tiptap/extension-task-list"
import { TaskItem } from "@tiptap/extension-task-item"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight"
import { Typography } from "@tiptap/extension-typography"
import { TextStyle, Color } from "@tiptap/extension-text-style"
import { common, createLowlight } from "lowlight"
import { useState, useCallback } from "react"
import { EditorToolbar } from "./EditorToolbar"
import { PreviewPanel } from "./PreviewPanel"
import { ThemeSelector } from "../themes/ThemeSelector"
import { IconPickerDialog } from "../icons/IconPickerDialog"
import { EmojiPickerDialog } from "../emoji/EmojiPickerDialog"
import { themes } from "@/data/themes"

const lowlight = createLowlight(common)

export function WxEditor() {
  const [activeTheme, setActiveTheme] = useState(themes[0])
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Image.configure({ inline: true, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "开始写作... 用 / 触发命令" }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlockLowlight.configure({ lowlight }),
      Typography,
      TextStyle,
      Color,
    ],
    content: `<h1>WX Editor — 下一代微信 Markdown 编辑器</h1>
<p>开始写你的文章吧！支持以下功能：</p>
<ul>
  <li>📦 <strong>29万+图标</strong> — 点击工具栏图标按钮插入</li>
  <li>😀 <strong>Emoji 双风格</strong> — Twemoji 扁平 + Fluent 3D</li>
  <li>🖼️ <strong>远程图片自动抓取</strong> — 粘贴URL自动代理下载</li>
  <li>🎨 <strong>5+精美主题</strong> — 一键切换排版风格</li>
  <li>📋 <strong>一键复制</strong> — 完美适配微信公众号</li>
</ul>
<blockquote><p>提示：点击右上角「复制到微信」按钮，粘贴到公众号编辑器即可。</p></blockquote>`,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[500px] px-6 py-4",
      },
    },
  })

  const insertIcon = useCallback(
    (iconUrl: string, alt: string) => {
      if (!editor) return
      editor
        .chain()
        .focus()
        .setImage({ src: iconUrl, alt, title: alt })
        .run()
      setShowIconPicker(false)
    },
    [editor]
  )

  const insertEmoji = useCallback(
    (emojiUrl: string, alt: string) => {
      if (!editor) return
      editor
        .chain()
        .focus()
        .setImage({ src: emojiUrl, alt, title: alt })
        .run()
      setShowEmojiPicker(false)
    },
    [editor]
  )

  if (!editor) return null

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-800">
            <span className="text-emerald-600">WX</span> Editor
          </h1>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Beta</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSelector
            themes={themes}
            activeTheme={activeTheme}
            onSelect={setActiveTheme}
          />
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-3 py-1.5 text-sm rounded-md transition ${
              showPreview
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {showPreview ? "隐藏预览" : "显示预览"}
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <EditorToolbar
        editor={editor}
        onIconClick={() => setShowIconPicker(true)}
        onEmojiClick={() => setShowEmojiPicker(true)}
      />

      {/* Editor + Preview */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div
          className={`${
            showPreview ? "w-1/2" : "w-full"
          } overflow-y-auto bg-white border-r border-gray-200`}
        >
          <EditorContent editor={editor} />
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="w-1/2 overflow-y-auto bg-white">
            <PreviewPanel editor={editor} theme={activeTheme} />
          </div>
        )}
      </div>

      {/* Icon Picker Dialog */}
      <IconPickerDialog
        open={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        onSelect={insertIcon}
      />

      {/* Emoji Picker Dialog */}
      <EmojiPickerDialog
        open={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onSelect={insertEmoji}
      />
    </div>
  )
}
