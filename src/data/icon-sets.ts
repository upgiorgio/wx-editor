export interface IconSet {
  prefix: string
  name: string
  total: number
  license: string
  category: "ui" | "brand" | "emoji"
}

export const iconSets: IconSet[] = [
  { prefix: "lucide", name: "Lucide", total: 1600, license: "ISC", category: "ui" },
  { prefix: "tabler", name: "Tabler Icons", total: 5900, license: "MIT", category: "ui" },
  { prefix: "ph", name: "Phosphor", total: 9000, license: "MIT", category: "ui" },
  { prefix: "ri", name: "Remix Icon", total: 2800, license: "Apache 2.0", category: "ui" },
  { prefix: "bi", name: "Bootstrap Icons", total: 2100, license: "MIT", category: "ui" },
  { prefix: "mdi", name: "Material Design", total: 7400, license: "Apache 2.0", category: "ui" },
  { prefix: "heroicons", name: "Heroicons", total: 300, license: "MIT", category: "ui" },
  { prefix: "fa6-solid", name: "Font Awesome", total: 1535, license: "CC BY 4.0", category: "ui" },
  { prefix: "iconoir", name: "Iconoir", total: 1600, license: "MIT", category: "ui" },
  { prefix: "solar", name: "Solar", total: 1000, license: "CC BY 4.0", category: "ui" },
  { prefix: "mingcute", name: "MingCute", total: 2800, license: "Apache 2.0", category: "ui" },
  { prefix: "hugeicons", name: "Huge Icons", total: 4000, license: "MIT", category: "ui" },
  { prefix: "carbon", name: "Carbon", total: 2300, license: "Apache 2.0", category: "ui" },
  { prefix: "simple-icons", name: "Simple Icons", total: 3400, license: "CC0", category: "brand" },
  { prefix: "logos", name: "SVG Logos", total: 1700, license: "CC0", category: "brand" },
  { prefix: "twemoji", name: "Twemoji", total: 3700, license: "CC BY 4.0", category: "emoji" },
  { prefix: "fluent-emoji-flat", name: "Fluent Emoji (Flat)", total: 1800, license: "MIT", category: "emoji" },
  { prefix: "fluent-emoji-high-contrast", name: "Fluent Emoji (HC)", total: 1800, license: "MIT", category: "emoji" },
  { prefix: "noto", name: "Noto Emoji", total: 3600, license: "Apache 2.0", category: "emoji" },
  { prefix: "openmoji", name: "OpenMoji", total: 4000, license: "CC BY-SA", category: "emoji" },
  { prefix: "emojione", name: "EmojiOne", total: 1800, license: "CC BY 4.0", category: "emoji" },
  { prefix: "fxemoji", name: "Firefox Emoji", total: 1000, license: "CC BY 4.0", category: "emoji" },
]

export function getIconUrl(prefix: string, name: string, size = 24, color?: string): string {
  let url = `https://api.iconify.design/${prefix}/${name}.svg?width=${size}&height=${size}`
  if (color) url += `&color=${encodeURIComponent(color)}`
  return url
}

export async function searchIcons(query: string, prefixes?: string[], limit = 60): Promise<string[]> {
  const params = new URLSearchParams({ query, limit: String(limit) })
  if (prefixes?.length) params.set("prefixes", prefixes.join(","))
  const res = await fetch(`https://api.iconify.design/search?${params}`)
  const data = await res.json()
  return data.icons || []
}
