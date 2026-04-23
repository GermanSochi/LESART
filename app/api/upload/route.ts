import { NextResponse } from "next/server"
import { promises as fs } from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

export const runtime = "nodejs"

function safeExtFromFilename(filename: string) {
  const ext = path.extname(filename || "").toLowerCase()
  if (!ext) return ""
  // allow common media; everything else becomes empty
  if ([".mp3", ".wav", ".m4a", ".ogg", ".webm", ".mp4", ".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) return ext
  return ""
}

function folderFromMime(mime: string) {
  if (mime.startsWith("audio/")) return "audio"
  if (mime.startsWith("video/")) return "video"
  if (mime.startsWith("image/")) return "images"
  return "files"
}

export async function POST(req: Request) {
  const form = await req.formData()
  const file = form.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const mime = file.type || "application/octet-stream"
  const ext = safeExtFromFilename(file.name) || ""
  const hash = crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 16)
  const base = `${Date.now()}-${hash}${ext}`
  const folder = folderFromMime(mime)

  const publicDir = path.join(process.cwd(), "public")
  const uploadDir = path.join(publicDir, "uploads", folder)
  await fs.mkdir(uploadDir, { recursive: true })
  const absPath = path.join(uploadDir, base)
  await fs.writeFile(absPath, buffer)

  const urlPath = `/uploads/${folder}/${base}`
  return NextResponse.json({ ok: true, url: urlPath, mime, size: buffer.length })
}

