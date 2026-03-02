export interface Theme {
  id: string
  name: string
  description: string
  css: string
}

const baseFont = '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif'

export const themes: Theme[] = [
  {
    id: "default",
    name: "经典默认",
    description: "简洁清爽，适用于所有场景",
    css: `
      .wx-content { font-family: ${baseFont}; font-size: 15px; color: #333; line-height: 1.75; padding: 20px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 24px 0 12px; border-bottom: 2px solid #333; padding-bottom: 6px; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 20px 0 10px; border-left: 4px solid #333; padding-left: 10px; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 16px 0 8px; }
      .wx-content p { margin: 8px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #ccc; padding: 8px 16px; margin: 12px 0; color: #666; background: #f9f9f9; border-radius: 0 6px 6px 0; }
      .wx-content code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #e83e8c; }
      .wx-content pre { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 10px; overflow-x: auto; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 6px; margin: 8px 0; }
      .wx-content a { color: #576b95; text-decoration: none; border-bottom: 1px solid #576b95; }
      .wx-content ul, .wx-content ol { padding-left: 24px; margin: 8px 0; }
      .wx-content li { margin: 4px 0; }
      .wx-content table { border-collapse: collapse; width: 100%; margin: 12px 0; }
      .wx-content th, .wx-content td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
      .wx-content th { background: #f5f5f5; font-weight: 600; }
      .wx-content hr { border: none; border-top: 1px solid #e5e5e5; margin: 20px 0; }
      .wx-content strong { font-weight: 700; color: #000; }
    `,
  },
  {
    id: "elegant-green",
    name: "优雅绿",
    description: "清新绿色，适合技术文章",
    css: `
      .wx-content { font-family: ${baseFont}; font-size: 15px; color: #2c3e50; line-height: 1.8; padding: 20px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #1a8a5c; text-align: center; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #1a8a5c; border-bottom: 2px solid #1a8a5c; padding-bottom: 4px; display: inline-block; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #27ae60; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #27ae60; padding: 10px 16px; margin: 14px 0; color: #555; background: #f0faf5; border-radius: 0 6px 6px 0; }
      .wx-content code { background: #e8f5e9; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #1a8a5c; }
      .wx-content pre { background: #263238; color: #eeffff; padding: 16px; border-radius: 10px; overflow-x: auto; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 8px; margin: 10px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .wx-content a { color: #1a8a5c; text-decoration: none; font-weight: 500; }
      .wx-content ul, .wx-content ol { padding-left: 24px; margin: 10px 0; }
      .wx-content li { margin: 4px 0; }
      .wx-content table { border-collapse: collapse; width: 100%; margin: 14px 0; }
      .wx-content th, .wx-content td { border: 1px solid #c8e6c9; padding: 8px 12px; }
      .wx-content th { background: #e8f5e9; font-weight: 600; color: #1a8a5c; }
      .wx-content hr { border: none; border-top: 2px dashed #a5d6a7; margin: 24px 0; }
      .wx-content strong { font-weight: 700; color: #1a8a5c; }
    `,
  },
  {
    id: "warm-orange",
    name: "暖阳橙",
    description: "温暖活力，适合生活分享",
    css: `
      .wx-content { font-family: ${baseFont}; font-size: 15px; color: #3d3d3d; line-height: 1.8; padding: 20px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #e67e22; text-align: center; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #e67e22; background: linear-gradient(to right, #fef3e7, transparent); padding: 6px 12px; border-radius: 6px; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #f39c12; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #f39c12; padding: 10px 16px; margin: 14px 0; color: #666; background: #fef9f0; border-radius: 0 6px 6px 0; }
      .wx-content code { background: #fef3e7; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #e67e22; }
      .wx-content pre { background: #2d2d2d; color: #f8f8f2; padding: 16px; border-radius: 10px; overflow-x: auto; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 8px; margin: 10px 0; }
      .wx-content a { color: #e67e22; text-decoration: none; font-weight: 500; }
      .wx-content strong { font-weight: 700; color: #d35400; }
    `,
  },
  {
    id: "deep-blue",
    name: "深邃蓝",
    description: "专业商务，适合企业内容",
    css: `
      .wx-content { font-family: ${baseFont}; font-size: 15px; color: #2c3e50; line-height: 1.75; padding: 20px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #2c3e80; border-bottom: 3px solid #3498db; padding-bottom: 6px; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #2980b9; border-left: 4px solid #3498db; padding-left: 10px; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #3498db; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #3498db; padding: 10px 16px; margin: 14px 0; color: #555; background: #eaf2f8; border-radius: 0 6px 6px 0; }
      .wx-content code { background: #eaf2f8; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #2980b9; }
      .wx-content pre { background: #1a1a2e; color: #e0e0e0; padding: 16px; border-radius: 10px; overflow-x: auto; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 6px; margin: 10px 0; }
      .wx-content a { color: #2980b9; text-decoration: none; border-bottom: 1px solid #3498db; }
      .wx-content strong { font-weight: 700; color: #2c3e80; }
    `,
  },
  {
    id: "minimal-pink",
    name: "少女粉",
    description: "柔和粉色，适合生活美学",
    css: `
      .wx-content { font-family: ${baseFont}; font-size: 15px; color: #4a4a4a; line-height: 1.8; padding: 20px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #e91e63; text-align: center; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #e91e63; background: linear-gradient(to right, #fce4ec, transparent); padding: 6px 12px; border-radius: 20px; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #f06292; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #f48fb1; padding: 10px 16px; margin: 14px 0; color: #666; background: #fce4ec; border-radius: 0 8px 8px 0; }
      .wx-content code { background: #fce4ec; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #e91e63; }
      .wx-content pre { background: #2d2d2d; color: #f8f8f2; padding: 16px; border-radius: 12px; overflow-x: auto; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 12px; margin: 10px 0; }
      .wx-content a { color: #e91e63; text-decoration: none; }
      .wx-content strong { font-weight: 700; color: #c2185b; }
    `,
  },

  // Bootstrap-inspired themes
  {
    id: "bootstrap-blue",
    name: "Bootstrap 蓝",
    description: "Bootstrap 5 经典蓝色方案",
    css: `
      .wx-content { font-family: ${baseFont}; font-size: 15px; color: #212529; line-height: 1.75; padding: 20px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #0d6efd; border-bottom: 3px solid #0d6efd; padding-bottom: 8px; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #0d6efd; background: linear-gradient(135deg, #e7f1ff, transparent); padding: 8px 14px; border-radius: 8px; border-left: 4px solid #0d6efd; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #0a58ca; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #0d6efd; padding: 12px 16px; margin: 14px 0; color: #495057; background: #f8f9fa; border-radius: 0 8px 8px 0; }
      .wx-content code { background: #e7f1ff; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #0d6efd; }
      .wx-content pre { background: #212529; color: #f8f9fa; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #343a40; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 8px; margin: 10px 0; border: 1px solid #dee2e6; }
      .wx-content a { color: #0d6efd; text-decoration: none; }
      .wx-content a:hover { text-decoration: underline; }
      .wx-content ul, .wx-content ol { padding-left: 24px; margin: 10px 0; }
      .wx-content li { margin: 4px 0; }
      .wx-content table { border-collapse: collapse; width: 100%; margin: 14px 0; }
      .wx-content th, .wx-content td { border: 1px solid #dee2e6; padding: 10px 14px; }
      .wx-content th { background: #e7f1ff; font-weight: 600; color: #0d6efd; }
      .wx-content hr { border: none; border-top: 1px solid #dee2e6; margin: 24px 0; }
      .wx-content strong { font-weight: 700; color: #0a58ca; }
    `,
  },
  {
    id: "bootstrap-dark",
    name: "Bootstrap 暗夜",
    description: "Bootstrap 5 深色模式配色",
    css: `
      .wx-content { font-family: ${baseFont}; font-size: 15px; color: #dee2e6; line-height: 1.75; padding: 20px; background: #212529; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #f8f9fa; border-bottom: 3px solid #0d6efd; padding-bottom: 8px; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #6ea8fe; background: rgba(13,110,253,0.1); padding: 8px 14px; border-radius: 8px; border-left: 4px solid #0d6efd; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #6ea8fe; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #495057; padding: 12px 16px; margin: 14px 0; color: #adb5bd; background: #2b3035; border-radius: 0 8px 8px 0; }
      .wx-content code { background: #2b3035; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #e685b5; }
      .wx-content pre { background: #1a1d20; color: #e9ecef; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #343a40; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 8px; margin: 10px 0; border: 1px solid #495057; }
      .wx-content a { color: #6ea8fe; text-decoration: none; }
      .wx-content ul, .wx-content ol { padding-left: 24px; margin: 10px 0; }
      .wx-content li { margin: 4px 0; }
      .wx-content table { border-collapse: collapse; width: 100%; margin: 14px 0; }
      .wx-content th, .wx-content td { border: 1px solid #495057; padding: 10px 14px; }
      .wx-content th { background: #2b3035; font-weight: 600; color: #6ea8fe; }
      .wx-content hr { border: none; border-top: 1px solid #495057; margin: 24px 0; }
      .wx-content strong { font-weight: 700; color: #f8f9fa; }
    `,
  },
  {
    id: "bootstrap-purple",
    name: "Bootstrap 紫韵",
    description: "Bootstrap 5 紫色创意风格",
    css: `
      .wx-content { font-family: ${baseFont}; font-size: 15px; color: #2c2c54; line-height: 1.8; padding: 20px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #6f42c1; text-align: center; background: linear-gradient(135deg, #f3e8ff, #ede4ff, transparent); padding: 12px; border-radius: 12px; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #6f42c1; border-left: 4px solid #6f42c1; padding-left: 12px; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #7c3aed; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #a78bfa; padding: 12px 16px; margin: 14px 0; color: #555; background: linear-gradient(135deg, #faf5ff, #f5f3ff); border-radius: 0 10px 10px 0; }
      .wx-content code { background: #f3e8ff; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #6f42c1; }
      .wx-content pre { background: #1e1b2e; color: #e2d9f3; padding: 16px; border-radius: 10px; overflow-x: auto; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 10px; margin: 10px 0; box-shadow: 0 4px 12px rgba(111,66,193,0.1); }
      .wx-content a { color: #6f42c1; text-decoration: none; font-weight: 500; }
      .wx-content ul, .wx-content ol { padding-left: 24px; margin: 10px 0; }
      .wx-content li { margin: 4px 0; }
      .wx-content table { border-collapse: collapse; width: 100%; margin: 14px 0; }
      .wx-content th, .wx-content td { border: 1px solid #e9d5ff; padding: 10px 14px; }
      .wx-content th { background: #f3e8ff; font-weight: 600; color: #6f42c1; }
      .wx-content hr { border: none; border-top: 2px dashed #d8b4fe; margin: 24px 0; }
      .wx-content strong { font-weight: 700; color: #6f42c1; }
    `,
  },
]
