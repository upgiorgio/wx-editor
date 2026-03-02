export interface Theme {
  id: string
  name: string
  description: string
  css: string
}

export const themes: Theme[] = [
  {
    id: "default",
    name: "经典默认",
    description: "简洁清爽的默认主题",
    css: `
      .wx-content { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 15px; color: #333; line-height: 1.75; padding: 16px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 24px 0 12px; border-bottom: 2px solid #333; padding-bottom: 6px; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 20px 0 10px; border-left: 4px solid #333; padding-left: 10px; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 16px 0 8px; }
      .wx-content p { margin: 8px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #ccc; padding: 8px 16px; margin: 12px 0; color: #666; background: #f9f9f9; }
      .wx-content code { background: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-size: 13px; color: #e83e8c; }
      .wx-content pre { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 4px; margin: 8px 0; }
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
    description: "清新绿色主题，适合技术文章",
    css: `
      .wx-content { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 15px; color: #2c3e50; line-height: 1.8; padding: 16px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #1a8a5c; text-align: center; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #1a8a5c; border-bottom: 2px solid #1a8a5c; padding-bottom: 4px; display: inline-block; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #27ae60; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #27ae60; padding: 10px 16px; margin: 14px 0; color: #555; background: #f0faf5; border-radius: 0 4px 4px 0; }
      .wx-content code { background: #e8f5e9; padding: 2px 6px; border-radius: 3px; font-size: 13px; color: #1a8a5c; }
      .wx-content pre { background: #263238; color: #eeffff; padding: 16px; border-radius: 8px; overflow-x: auto; }
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
    description: "温暖橙色主题，适合生活分享",
    css: `
      .wx-content { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 15px; color: #3d3d3d; line-height: 1.8; padding: 16px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #e67e22; text-align: center; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #e67e22; background: linear-gradient(to right, #fef3e7, transparent); padding: 6px 12px; border-radius: 4px; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #f39c12; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #f39c12; padding: 10px 16px; margin: 14px 0; color: #666; background: #fef9f0; border-radius: 0 4px 4px 0; }
      .wx-content code { background: #fef3e7; padding: 2px 6px; border-radius: 3px; font-size: 13px; color: #e67e22; }
      .wx-content pre { background: #2d2d2d; color: #f8f8f2; padding: 16px; border-radius: 8px; overflow-x: auto; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 8px; margin: 10px 0; }
      .wx-content a { color: #e67e22; text-decoration: none; font-weight: 500; }
      .wx-content strong { font-weight: 700; color: #d35400; }
    `,
  },
  {
    id: "deep-blue",
    name: "深邃蓝",
    description: "专业蓝色主题，适合商务内容",
    css: `
      .wx-content { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 15px; color: #2c3e50; line-height: 1.75; padding: 16px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #2c3e80; border-bottom: 3px solid #3498db; padding-bottom: 6px; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #2980b9; border-left: 4px solid #3498db; padding-left: 10px; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #3498db; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #3498db; padding: 10px 16px; margin: 14px 0; color: #555; background: #eaf2f8; border-radius: 0 4px 4px 0; }
      .wx-content code { background: #eaf2f8; padding: 2px 6px; border-radius: 3px; font-size: 13px; color: #2980b9; }
      .wx-content pre { background: #1a1a2e; color: #e0e0e0; padding: 16px; border-radius: 8px; overflow-x: auto; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 6px; margin: 10px 0; }
      .wx-content a { color: #2980b9; text-decoration: none; border-bottom: 1px solid #3498db; }
      .wx-content strong { font-weight: 700; color: #2c3e80; }
    `,
  },
  {
    id: "minimal-pink",
    name: "少女粉",
    description: "柔和粉色主题，适合生活美学",
    css: `
      .wx-content { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 15px; color: #4a4a4a; line-height: 1.8; padding: 16px; }
      .wx-content h1 { font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #e91e63; text-align: center; }
      .wx-content h2 { font-size: 19px; font-weight: 700; margin: 22px 0 10px; color: #e91e63; background: linear-gradient(to right, #fce4ec, transparent); padding: 6px 12px; border-radius: 20px; }
      .wx-content h3 { font-size: 17px; font-weight: 600; margin: 18px 0 8px; color: #f06292; }
      .wx-content p { margin: 10px 0; text-align: justify; }
      .wx-content blockquote { border-left: 4px solid #f48fb1; padding: 10px 16px; margin: 14px 0; color: #666; background: #fce4ec; border-radius: 0 8px 8px 0; }
      .wx-content code { background: #fce4ec; padding: 2px 6px; border-radius: 3px; font-size: 13px; color: #e91e63; }
      .wx-content pre { background: #2d2d2d; color: #f8f8f2; padding: 16px; border-radius: 12px; overflow-x: auto; }
      .wx-content pre code { background: none; color: inherit; padding: 0; }
      .wx-content img { max-width: 100%; border-radius: 12px; margin: 10px 0; }
      .wx-content a { color: #e91e63; text-decoration: none; }
      .wx-content strong { font-weight: 700; color: #c2185b; }
    `,
  },
]
