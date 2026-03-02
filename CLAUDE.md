# WX Editor — 下一代微信 Markdown 编辑器

## 项目概述
- **域名**: wx.aieii.com
- **仓库**: github.com/upgiorgio/wx-editor
- **部署**: Cloudflare Pages
- **技术栈**: Next.js 16 + Tiptap + TypeScript + TailwindCSS

## 核心差异化 (vs doocs/md)
1. 远程图片自动抓取 → R2 缓存
2. 29万+图标面板 (Iconify)
3. Emoji 双风格 (Twemoji + Fluent)
4. Mermaid 自动光栅化
5. 5+精美主题 + 主题市场
6. 微信一键复制

## 目录结构
```
src/
├── app/
│   ├── api/icon/        # 图标代理 API
│   ├── api/proxy-image/ # 图片代理 API
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── editor/          # 核心编辑器
│   ├── emoji/           # Emoji 选择器
│   ├── icons/           # 图标选择器
│   ├── themes/          # 主题选择器
│   └── ui/              # 通用 UI 组件
├── data/
│   ├── icon-sets.ts     # 图标库配置
│   └── themes.ts        # 主题 CSS
├── lib/
│   └── utils.ts         # 工具函数
└── styles/
```

## Cloudflare 配置
- Account: Account A (Admin098)
- Zone: aieii.com (ee91a811543ec32c9f7e81cbc2f1e8fa)
- 部署: Cloudflare Pages (连接 GitHub)

## 版权
Copyright © 2024-2026 QIAOZHI LIN. All rights reserved.
