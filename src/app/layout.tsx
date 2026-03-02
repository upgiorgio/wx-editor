import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "WX Editor — 下一代微信 Markdown 编辑器",
  description: "超越 doocs/md 的微信编辑器：29万+图标、Emoji双风格、远程图片自动抓取、AI补全、5+精美主题",
  keywords: "微信编辑器, markdown, 公众号, WeChat editor, icons, emoji",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}
