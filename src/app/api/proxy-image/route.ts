import { NextRequest, NextResponse } from "next/server"

/**
 * Image Proxy API
 * Fetches remote images server-side to bypass CORS
 * In production, this would cache to R2 and return a CDN URL
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 })
  }

  try {
    const parsed = new URL(url)
    // Block private/internal URLs
    if (
      parsed.hostname === "localhost" ||
      parsed.hostname.startsWith("127.") ||
      parsed.hostname.startsWith("10.") ||
      parsed.hostname.startsWith("192.168.")
    ) {
      return NextResponse.json({ error: "Internal URLs not allowed" }, { status: 403 })
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "WXEditor/1.0 ImageProxy",
        Accept: "image/*",
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${response.status}` },
        { status: response.status }
      )
    }

    const contentType = response.headers.get("content-type") || "image/png"

    // Validate it's actually an image
    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ error: "URL does not point to an image" }, { status: 400 })
    }

    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to proxy image" },
      { status: 500 }
    )
  }
}
