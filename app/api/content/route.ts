import { NextResponse } from "next/server"
import { readSiteContent, writeSiteContent, type SiteContent } from "@/lib/site-content"

export const runtime = "nodejs"

export async function GET() {
  const content = await readSiteContent()
  return NextResponse.json(content)
}

export async function PUT(req: Request) {
  const body = (await req.json()) as SiteContent
  await writeSiteContent(body)
  return NextResponse.json({ ok: true })
}

