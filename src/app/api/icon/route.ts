import { NextRequest, NextResponse } from "next/server"

/**
 * Icon Proxy API
 * Proxies Iconify icons server-side for China accessibility
 * Caches with long TTL headers
 */
export async function GET(request: NextRequest) {
  const icon = request.nextUrl.searchParams.get("icon") // format: "prefix:name"
  const size = request.nextUrl.searchParams.get("size") || "24"
  const color = request.nextUrl.searchParams.get("color")

  if (!icon || !icon.includes(":")) {
    return NextResponse.json({ error: "Missing icon parameter (format: prefix:name)" }, { status: 400 })
  }

  const [prefix, name] = icon.split(":")

  try {
    let url = `https://api.iconify.design/${prefix}/${name}.svg?width=${size}&height=${size}`
    if (color) url += `&color=${encodeURIComponent(color)}`

    const response = await fetch(url, {
      headers: { Accept: "image/svg+xml" },
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Icon not found: ${icon}` },
        { status: 404 }
      )
    }

    const svg = await response.text()

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=604800, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch {
    return NextResponse.json({ error: "Failed to fetch icon" }, { status: 500 })
  }
}
