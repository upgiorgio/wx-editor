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
import { Star, Github, Eye, EyeOff } from "lucide-react"
import { EditorToolbar } from "./EditorToolbar"
import { PreviewPanel } from "./PreviewPanel"
import { ThemeSelector } from "../themes/ThemeSelector"
import { IconPickerDialog } from "../icons/IconPickerDialog"
import { EmojiPickerDialog } from "../emoji/EmojiPickerDialog"
import { DividerPickerDialog } from "../dividers/DividerPickerDialog"
import { themes } from "@/data/themes"
import { defaultStyleConfig, type StyleConfig } from "./StyleSettings"

const lowlight = createLowlight(common)

export function WxEditor() {
  const [activeTheme, setActiveTheme] = useState(themes[0])
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showDividerPicker, setShowDividerPicker] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [styleConfig, setStyleConfig] = useState<StyleConfig>(defaultStyleConfig)

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
      editor.chain().focus().setImage({ src: iconUrl, alt, title: alt }).run()
      setShowIconPicker(false)
    },
    [editor]
  )

  const insertEmoji = useCallback(
    (emojiUrl: string, alt: string) => {
      if (!editor) return
      editor.chain().focus().setImage({ src: emojiUrl, alt, title: alt }).run()
      setShowEmojiPicker(false)
    },
    [editor]
  )

  const insertDivider = useCallback(
    (html: string) => {
      if (!editor) return
      editor.chain().focus().insertContent(html).run()
      setShowDividerPicker(false)
    },
    [editor]
  )

  if (!editor) return null

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="glass border-b border-white/20 px-5 py-2.5 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-200">
              <span className="text-white font-black text-sm">W</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-800 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">WX</span>
                <span className="text-gray-700"> Editor</span>
              </h1>
              <p className="text-[10px] text-gray-400 leading-tight -mt-0.5">下一代微信排版编辑器</p>
            </div>
          </div>
          <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Beta</span>
        </div>

        <div className="flex items-center gap-2">
          {/* GitHub Star CTA */}
          <a
            href="https://github.com/upgiorgio/wx-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 transition-all shadow-sm hover:shadow-md group"
          >
            <Github size={14} />
            <Star size={11} className="text-yellow-400 group-hover:fill-yellow-400 transition" />
            <span className="hidden sm:inline font-medium">Star</span>
          </a>
          <span className="hidden lg:inline text-[10px] text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full">免费开源</span>

          <div className="w-px h-5 bg-gray-200 mx-1" />

          <ThemeSelector
            themes={themes}
            activeTheme={activeTheme}
            onSelect={setActiveTheme}
          />
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all shadow-sm ${
              showPreview
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-200"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {showPreview ? <Eye size={13} /> : <EyeOff size={13} />}
            {showPreview ? "预览" : "预览"}
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <EditorToolbar
        editor={editor}
        onIconClick={() => setShowIconPicker(true)}
        onEmojiClick={() => setShowEmojiPicker(true)}
        onDividerClick={() => setShowDividerPicker(true)}
      />

      {/* Editor + Preview */}
      <div className="flex flex-1 overflow-hidden mx-3 mb-3 gap-3">
        {/* Editor Panel */}
        <div
          className={`${
            showPreview ? "w-1/2" : "w-full"
          } overflow-y-auto bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100`}
        >
          <EditorContent editor={editor} />
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 overflow-hidden bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col">
            <PreviewPanel editor={editor} theme={activeTheme} styleConfig={styleConfig} onStyleChange={setStyleConfig} />
          </div>
        )}
      </div>

      {/* Dialogs */}
      <IconPickerDialog
        open={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        onSelect={insertIcon}
      />
      <EmojiPickerDialog
        open={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onSelect={insertEmoji}
      />
      <DividerPickerDialog
        open={showDividerPicker}
        onClose={() => setShowDividerPicker(false)}
        onSelect={insertDivider}
        tintColor={styleConfig.primaryColor}
      />
    </div>
  )
}
