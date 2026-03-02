// Section dividers for WeChat Official Account articles
// All SVGs are inline — zero external dependencies, all under 1KB each
// Safe for WeChat rich-text: uses only <svg> attributes, no CSS classes, no JS

export interface Divider {
  id: string
  name: string           // Chinese display name
  nameEn: string         // English name for search
  category: DividerCategory
  tags: string[]
  // The raw SVG string to embed as an <img src="data:image/svg+xml,..."> or inline
  svg: string
  // Approximate byte size of the SVG string
  approxBytes: number
}

export type DividerCategory =
  | "line"       // Simple line variants
  | "wave"       // Wave / flowing patterns
  | "dot"        // Dot / circle patterns
  | "star"       // Star / sparkle patterns
  | "floral"     // Flower / leaf / botanical
  | "geometric"  // Geometric shapes
  | "arrow"      // Arrow / chevron patterns
  | "text"       // Text-based / symbol dividers

// ---------------------------------------------------------------------------
// Helper — generate a data-URI suitable for an <img src="...">
// ---------------------------------------------------------------------------
export function svgToDataUri(svg: string): string {
  // Encode minimal set of chars so the URI is valid without Base64 bloat
  const encoded = svg
    .replace(/\n\s*/g, " ")
    .replace(/"/g, "'")
    .replace(/#/g, "%23")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/&/g, "%26")
  return `data:image/svg+xml,${encoded}`
}

// ---------------------------------------------------------------------------
// Divider catalogue — 24 designs across 8 categories
// ---------------------------------------------------------------------------
export const dividers: Divider[] = [

  // =========================================================================
  // CATEGORY: line
  // =========================================================================
  {
    id: "line-thin",
    name: "细线",
    nameEn: "Thin Line",
    category: "line",
    tags: ["simple", "minimal", "clean"],
    approxBytes: 140,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <line x1="0" y1="10" x2="600" y2="10" stroke="#cccccc" stroke-width="1"/>
</svg>`,
  },

  {
    id: "line-double",
    name: "双线",
    nameEn: "Double Line",
    category: "line",
    tags: ["classic", "formal", "elegant"],
    approxBytes: 220,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <line x1="0" y1="7"  x2="600" y2="7"  stroke="#bbbbbb" stroke-width="1"/>
  <line x1="0" y1="13" x2="600" y2="13" stroke="#bbbbbb" stroke-width="1"/>
</svg>`,
  },

  {
    id: "line-dashed",
    name: "虚线",
    nameEn: "Dashed Line",
    category: "line",
    tags: ["dashed", "casual", "light"],
    approxBytes: 180,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <line x1="0" y1="10" x2="600" y2="10" stroke="#cccccc" stroke-width="1.5" stroke-dasharray="8 6"/>
</svg>`,
  },

  {
    id: "line-gradient-fade",
    name: "渐隐线",
    nameEn: "Gradient Fade Line",
    category: "line",
    tags: ["gradient", "fade", "modern"],
    approxBytes: 420,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <defs>
    <linearGradient id="fg" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%"   stop-color="#cccccc" stop-opacity="0"/>
      <stop offset="30%"  stop-color="#cccccc" stop-opacity="1"/>
      <stop offset="70%"  stop-color="#cccccc" stop-opacity="1"/>
      <stop offset="100%" stop-color="#cccccc" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <line x1="0" y1="10" x2="600" y2="10" stroke="url(#fg)" stroke-width="1.5"/>
</svg>`,
  },

  {
    id: "line-diamond-center",
    name: "菱形居中线",
    nameEn: "Diamond Center Line",
    category: "line",
    tags: ["diamond", "decorative", "center"],
    approxBytes: 380,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="24" viewBox="0 0 600 24">
  <line x1="0"   y1="12" x2="270" y2="12" stroke="#cccccc" stroke-width="1"/>
  <polygon points="300,4 312,12 300,20 288,12" fill="#cccccc"/>
  <line x1="330" y1="12" x2="600" y2="12" stroke="#cccccc" stroke-width="1"/>
</svg>`,
  },

  {
    id: "line-center-circle",
    name: "圆点居中线",
    nameEn: "Circle Center Line",
    category: "line",
    tags: ["circle", "minimal", "center"],
    approxBytes: 330,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <line x1="0"   y1="10" x2="282" y2="10" stroke="#cccccc" stroke-width="1"/>
  <circle cx="300" cy="10" r="5" fill="#cccccc"/>
  <line x1="318" y1="10" x2="600" y2="10" stroke="#cccccc" stroke-width="1"/>
</svg>`,
  },

  // =========================================================================
  // CATEGORY: wave
  // =========================================================================
  {
    id: "wave-gentle",
    name: "柔和波浪",
    nameEn: "Gentle Wave",
    category: "wave",
    tags: ["wave", "smooth", "natural"],
    approxBytes: 310,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="24" viewBox="0 0 600 24">
  <path d="M0 12 C50 4,100 20,150 12 S250 4,300 12 S400 20,450 12 S550 4,600 12"
        fill="none" stroke="#cccccc" stroke-width="1.5"/>
</svg>`,
  },

  {
    id: "wave-double",
    name: "双波浪",
    nameEn: "Double Wave",
    category: "wave",
    tags: ["wave", "double", "decorative"],
    approxBytes: 440,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="28" viewBox="0 0 600 28">
  <path d="M0 9  C50 2,100 16,150 9  S250 2,300 9  S400 16,450 9  S550 2,600 9"
        fill="none" stroke="#cccccc" stroke-width="1.2"/>
  <path d="M0 19 C50 12,100 26,150 19 S250 12,300 19 S400 26,450 19 S550 12,600 19"
        fill="none" stroke="#cccccc" stroke-width="1.2"/>
</svg>`,
  },

  {
    id: "wave-zigzag",
    name: "锯齿线",
    nameEn: "Zigzag Line",
    category: "wave",
    tags: ["zigzag", "angular", "playful"],
    approxBytes: 280,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <polyline points="0,16 30,4 60,16 90,4 120,16 150,4 180,16 210,4 240,16 270,4 300,16 330,4 360,16 390,4 420,16 450,4 480,16 510,4 540,16 570,4 600,16"
            fill="none" stroke="#cccccc" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`,
  },

  // =========================================================================
  // CATEGORY: dot
  // =========================================================================
  {
    id: "dot-simple",
    name: "圆点排列",
    nameEn: "Dot Row",
    category: "dot",
    tags: ["dots", "minimal", "clean"],
    approxBytes: 360,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <circle cx="240" cy="10" r="3" fill="#cccccc"/>
  <circle cx="260" cy="10" r="3" fill="#cccccc"/>
  <circle cx="280" cy="10" r="3" fill="#cccccc"/>
  <circle cx="300" cy="10" r="3" fill="#cccccc"/>
  <circle cx="320" cy="10" r="3" fill="#cccccc"/>
  <circle cx="340" cy="10" r="3" fill="#cccccc"/>
  <circle cx="360" cy="10" r="3" fill="#cccccc"/>
</svg>`,
  },

  {
    id: "dot-spread",
    name: "渐散圆点",
    nameEn: "Spreading Dots",
    category: "dot",
    tags: ["dots", "gradient", "spread"],
    approxBytes: 560,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <circle cx="300" cy="10" r="4"   fill="#999999"/>
  <circle cx="326" cy="10" r="3.5" fill="#aaaaaa"/>
  <circle cx="350" cy="10" r="3"   fill="#bbbbbb"/>
  <circle cx="372" cy="10" r="2.5" fill="#cccccc"/>
  <circle cx="392" cy="10" r="2"   fill="#dddddd"/>
  <circle cx="274" cy="10" r="3.5" fill="#aaaaaa"/>
  <circle cx="250" cy="10" r="3"   fill="#bbbbbb"/>
  <circle cx="228" cy="10" r="2.5" fill="#cccccc"/>
  <circle cx="208" cy="10" r="2"   fill="#dddddd"/>
</svg>`,
  },

  {
    id: "dot-diamond-row",
    name: "菱形点列",
    nameEn: "Diamond Dots",
    category: "dot",
    tags: ["diamond", "dots", "geometric"],
    approxBytes: 460,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <polygon points="254,10 258,6 262,10 258,14" fill="#cccccc"/>
  <polygon points="274,10 278,6 282,10 278,14" fill="#cccccc"/>
  <polygon points="294,10 298,6 302,10 298,14" fill="#cccccc"/>
  <polygon points="314,10 318,6 322,10 318,14" fill="#cccccc"/>
  <polygon points="334,10 338,6 342,10 338,14" fill="#cccccc"/>
  <polygon points="344,10 348,6 352,10 348,14" fill="#bbbbbb" opacity="0.5"/>
</svg>`,
  },

  // =========================================================================
  // CATEGORY: star
  // =========================================================================
  {
    id: "star-triple",
    name: "三星分隔",
    nameEn: "Triple Star",
    category: "star",
    tags: ["star", "sparkle", "elegant"],
    approxBytes: 420,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="28" viewBox="0 0 600 28">
  <line x1="0"   y1="14" x2="240" y2="14" stroke="#cccccc" stroke-width="1"/>
  <text x="256" y="19" font-size="14" fill="#aaaaaa" font-family="serif">✦</text>
  <text x="284" y="19" font-size="18" fill="#888888" font-family="serif">✦</text>
  <text x="314" y="19" font-size="14" fill="#aaaaaa" font-family="serif">✦</text>
  <line x1="340" y1="14" x2="600" y2="14" stroke="#cccccc" stroke-width="1"/>
</svg>`,
  },

  {
    id: "star-sparkle-row",
    name: "星光闪烁",
    nameEn: "Sparkle Row",
    category: "star",
    tags: ["sparkle", "glitter", "festive"],
    approxBytes: 760,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="24" viewBox="0 0 600 24">
  <!-- 4-pointed star shape repeated -->
  <path d="M220 12 l4-8 l4 8 l8 4 l-8 4 l-4 8 l-4-8 l-8-4 z" fill="#dddddd"/>
  <path d="M252 12 l3-6 l3 6 l6 3 l-6 3 l-3 6 l-3-6 l-6-3 z"  fill="#bbbbbb"/>
  <path d="M280 12 l5-10 l5 10 l10 5 l-10 5 l-5 10 l-5-10 l-10-5 z" fill="#999999"/>
  <path d="M316 12 l3-6 l3 6 l6 3 l-6 3 l-3 6 l-3-6 l-6-3 z"  fill="#bbbbbb"/>
  <path d="M348 12 l4-8 l4 8 l8 4 l-8 4 l-4 8 l-4-8 l-8-4 z" fill="#dddddd"/>
</svg>`,
  },

  {
    id: "star-five-center",
    name: "五角星居中",
    nameEn: "Five-Point Star Center",
    category: "star",
    tags: ["star", "five-point", "center"],
    approxBytes: 380,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="28" viewBox="0 0 600 28">
  <line x1="0"   y1="14" x2="270" y2="14" stroke="#cccccc" stroke-width="1"/>
  <polygon points="300,4 303,11 311,11 305,16 307,23 300,19 293,23 295,16 289,11 297,11"
           fill="#cccccc"/>
  <line x1="330" y1="14" x2="600" y2="14" stroke="#cccccc" stroke-width="1"/>
</svg>`,
  },

  // =========================================================================
  // CATEGORY: floral
  // =========================================================================
  {
    id: "floral-plum",
    name: "梅花分隔",
    nameEn: "Plum Blossom",
    category: "floral",
    tags: ["flower", "plum", "chinese", "traditional"],
    approxBytes: 680,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="28" viewBox="0 0 600 28">
  <line x1="0"   y1="14" x2="265" y2="14" stroke="#dddddd" stroke-width="1"/>
  <!-- plum blossom: 5 circles around center -->
  <circle cx="300" cy="7"  r="4" fill="#dddddd"/>
  <circle cx="308" cy="12" r="4" fill="#dddddd"/>
  <circle cx="305" cy="21" r="4" fill="#dddddd"/>
  <circle cx="295" cy="21" r="4" fill="#dddddd"/>
  <circle cx="292" cy="12" r="4" fill="#dddddd"/>
  <circle cx="300" cy="14" r="3" fill="#f0f0f0"/>
  <line x1="335" y1="14" x2="600" y2="14" stroke="#dddddd" stroke-width="1"/>
</svg>`,
  },

  {
    id: "floral-leaf-vine",
    name: "藤蔓叶饰",
    nameEn: "Leaf Vine",
    category: "floral",
    tags: ["leaf", "vine", "nature", "organic"],
    approxBytes: 590,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="24" viewBox="0 0 600 24">
  <path d="M0 12 Q30 4 60 12 Q90 20 120 12 Q150 4 180 12 Q210 20 240 12"
        fill="none" stroke="#cccccc" stroke-width="1"/>
  <!-- center leaf cluster -->
  <ellipse cx="300" cy="8"  rx="8" ry="4" fill="#cccccc" transform="rotate(-30,300,8)"/>
  <ellipse cx="300" cy="16" rx="8" ry="4" fill="#cccccc" transform="rotate(30,300,16)"/>
  <path d="M360 12 Q390 4 420 12 Q450 20 480 12 Q510 4 540 12 Q570 20 600 12"
        fill="none" stroke="#cccccc" stroke-width="1"/>
</svg>`,
  },

  {
    id: "floral-four-petal",
    name: "四瓣花居中",
    nameEn: "Four Petal Flower",
    category: "floral",
    tags: ["flower", "four-petal", "symmetry"],
    approxBytes: 480,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="28" viewBox="0 0 600 28">
  <line x1="0"   y1="14" x2="274" y2="14" stroke="#cccccc" stroke-width="1"/>
  <!-- four-petal flower -->
  <ellipse cx="300" cy="8"  rx="5" ry="7" fill="#dddddd"/>
  <ellipse cx="300" cy="20" rx="5" ry="7" fill="#dddddd"/>
  <ellipse cx="293" cy="14" rx="7" ry="5" fill="#dddddd"/>
  <ellipse cx="307" cy="14" rx="7" ry="5" fill="#dddddd"/>
  <circle  cx="300" cy="14" r="3"         fill="#ffffff"/>
  <line x1="326" y1="14" x2="600" y2="14" stroke="#cccccc" stroke-width="1"/>
</svg>`,
  },

  // =========================================================================
  // CATEGORY: geometric
  // =========================================================================
  {
    id: "geometric-triangles",
    name: "三角图案",
    nameEn: "Triangle Pattern",
    category: "geometric",
    tags: ["triangle", "geometric", "modern"],
    approxBytes: 460,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <polygon points="248,18 256,2 264,18"  fill="none" stroke="#cccccc" stroke-width="1.2"/>
  <polygon points="268,18 276,2 284,18"  fill="#dddddd"/>
  <polygon points="288,2  296,18 304,2"  fill="#dddddd"/>
  <polygon points="308,18 316,2 324,18"  fill="#dddddd"/>
  <polygon points="328,2  336,18 344,2"  fill="none" stroke="#cccccc" stroke-width="1.2"/>
</svg>`,
  },

  {
    id: "geometric-hexagons",
    name: "六边形链",
    nameEn: "Hexagon Chain",
    category: "geometric",
    tags: ["hexagon", "geometric", "tech", "modern"],
    approxBytes: 540,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="26" viewBox="0 0 600 26">
  <polygon points="270,2 280,2 285,11 280,20 270,20 265,11" fill="none" stroke="#cccccc" stroke-width="1.2"/>
  <polygon points="285,11 295,2 305,2 310,11 305,20 295,20" fill="#e0e0e0"/>
  <polygon points="310,11 320,2 330,2 335,11 330,20 320,20" fill="#e0e0e0"/>
  <polygon points="335,11 345,2 355,2 360,11 355,20 345,20" fill="none" stroke="#cccccc" stroke-width="1.2"/>
</svg>`,
  },

  {
    id: "geometric-cross-line",
    name: "十字装饰线",
    nameEn: "Cross Ornament Line",
    category: "geometric",
    tags: ["cross", "ornament", "classic"],
    approxBytes: 460,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <line x1="0"   y1="10" x2="270" y2="10" stroke="#cccccc" stroke-width="1"/>
  <rect x="293" y="7" width="6" height="6" fill="#cccccc" transform="rotate(45,296,10)"/>
  <rect x="282" y="8" width="4" height="4" fill="#dddddd" transform="rotate(45,284,10)"/>
  <rect x="312" y="8" width="4" height="4" fill="#dddddd" transform="rotate(45,314,10)"/>
  <line x1="330" y1="10" x2="600" y2="10" stroke="#cccccc" stroke-width="1"/>
</svg>`,
  },

  // =========================================================================
  // CATEGORY: arrow
  // =========================================================================
  {
    id: "arrow-chevrons",
    name: "箭头链",
    nameEn: "Chevron Chain",
    category: "arrow",
    tags: ["arrow", "chevron", "direction", "flow"],
    approxBytes: 340,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <polyline points="256,4 268,10 256,16" fill="none" stroke="#cccccc" stroke-width="1.5" stroke-linejoin="round"/>
  <polyline points="270,4 282,10 270,16" fill="none" stroke="#bbbbbb" stroke-width="1.5" stroke-linejoin="round"/>
  <polyline points="284,4 296,10 284,16" fill="none" stroke="#aaaaaa" stroke-width="1.5" stroke-linejoin="round"/>
  <polyline points="298,4 310,10 298,16" fill="none" stroke="#aaaaaa" stroke-width="1.5" stroke-linejoin="round"/>
  <polyline points="312,4 324,10 312,16" fill="none" stroke="#bbbbbb" stroke-width="1.5" stroke-linejoin="round"/>
  <polyline points="326,4 338,10 326,16" fill="none" stroke="#cccccc" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`,
  },

  {
    id: "arrow-line-both",
    name: "双向箭头线",
    nameEn: "Bi-Directional Arrow Line",
    category: "arrow",
    tags: ["arrow", "line", "both", "direction"],
    approxBytes: 380,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="20" viewBox="0 0 600 20">
  <!-- left arrowhead -->
  <polyline points="20,10 8,4 8,16 20,10" fill="#cccccc" stroke="none"/>
  <line x1="20" y1="10" x2="580" y2="10" stroke="#cccccc" stroke-width="1"/>
  <!-- right arrowhead -->
  <polyline points="580,10 592,4 592,16 580,10" fill="#cccccc" stroke="none"/>
</svg>`,
  },

  // =========================================================================
  // CATEGORY: text
  // =========================================================================
  {
    id: "text-sparkles",
    name: "✦ 星花符 ✦",
    nameEn: "Sparkle Symbols",
    category: "text",
    tags: ["symbol", "unicode", "sparkle", "elegant"],
    approxBytes: 320,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="28" viewBox="0 0 600 28">
  <text x="50%" y="20" font-size="16" fill="#aaaaaa" font-family="serif"
        text-anchor="middle" letter-spacing="8">✦  ✦  ✦</text>
</svg>`,
  },

  {
    id: "text-em-dash",
    name: "破折号线",
    nameEn: "Em Dash Line",
    category: "text",
    tags: ["dash", "minimal", "text"],
    approxBytes: 260,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="24" viewBox="0 0 600 24">
  <text x="50%" y="17" font-size="14" fill="#cccccc" font-family="sans-serif"
        text-anchor="middle" letter-spacing="4">— — —</text>
</svg>`,
  },

  {
    id: "text-diamond-dots",
    name: "◆ 菱形符 ◆",
    nameEn: "Diamond Symbol Row",
    category: "text",
    tags: ["symbol", "diamond", "unicode"],
    approxBytes: 300,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="28" viewBox="0 0 600 28">
  <text x="50%" y="20" font-size="13" fill="#bbbbbb" font-family="sans-serif"
        text-anchor="middle" letter-spacing="6">◆  ◇  ◆  ◇  ◆</text>
</svg>`,
  },

  {
    id: "text-wave-symbol",
    name: "波浪符号",
    nameEn: "Tilde Wave Symbols",
    category: "text",
    tags: ["tilde", "wave", "symbol", "casual"],
    approxBytes: 280,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="24" viewBox="0 0 600 24">
  <text x="50%" y="17" font-size="16" fill="#cccccc" font-family="sans-serif"
        text-anchor="middle" letter-spacing="2">〜 〜 〜 〜 〜</text>
</svg>`,
  },

  {
    id: "text-scissors",
    name: "✂ 剪刀线",
    nameEn: "Scissors Cut Line",
    category: "text",
    tags: ["scissors", "cut", "playful", "dashed"],
    approxBytes: 340,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="24" viewBox="0 0 600 24">
  <text x="28" y="17" font-size="15" fill="#aaaaaa" font-family="sans-serif">✂</text>
  <line x1="48" y1="12" x2="600" y2="12" stroke="#cccccc" stroke-width="1"
        stroke-dasharray="6 4"/>
</svg>`,
  },
]

// ---------------------------------------------------------------------------
// Utility exports
// ---------------------------------------------------------------------------

export const dividerCategories: { id: DividerCategory; label: string }[] = [
  { id: "line",      label: "线条" },
  { id: "wave",      label: "波浪" },
  { id: "dot",       label: "圆点" },
  { id: "star",      label: "星形" },
  { id: "floral",    label: "花草" },
  { id: "geometric", label: "几何" },
  { id: "arrow",     label: "箭头" },
  { id: "text",      label: "符号" },
]

export function getDividersByCategory(category: DividerCategory): Divider[] {
  return dividers.filter((d) => d.category === category)
}

export function searchDividers(query: string): Divider[] {
  const q = query.toLowerCase()
  return dividers.filter(
    (d) =>
      d.name.includes(query) ||
      d.nameEn.toLowerCase().includes(q) ||
      d.tags.some((t) => t.includes(q))
  )
}

// Returns an <img>-safe data URI for the given divider.
// Pass a tintColor (hex, e.g. "#576b95") to recolor the SVG on-the-fly.
export function getDividerDataUri(divider: Divider, tintColor?: string): string {
  let svg = divider.svg
  if (tintColor) {
    // Replace all occurrences of the neutral grays with the tint color
    svg = svg
      .replace(/#cccccc/gi, tintColor)
      .replace(/#bbbbbb/gi, tintColor)
      .replace(/#aaaaaa/gi, tintColor)
      .replace(/#999999/gi, tintColor)
      .replace(/#888888/gi, tintColor)
      .replace(/#dddddd/gi, tintColor + "aa")  // lighter variant ~66% opacity
      .replace(/#e0e0e0/gi, tintColor + "99")
  }
  return svgToDataUri(svg)
}
