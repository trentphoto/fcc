import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createHmac } from "crypto"
import { supabase } from "@/lib/supabase"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme"
const COOKIE_NAME = "admin_session"

function makeToken(): string {
  return createHmac("sha256", ADMIN_PASSWORD).update("admin").digest("hex")
}

function isAuthed(token: string | undefined): boolean {
  return token === makeToken()
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!isAuthed(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("site_settings")
    .select("is_live, zoom_link")
    .limit(1)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error("Settings fetch error:", error)
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 })
  }

  return NextResponse.json({
    is_live: data?.is_live ?? false,
    zoom_link: data?.zoom_link ?? "",
  })
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!isAuthed(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const is_live = Boolean(body?.is_live)
  const zoom_link = (body?.zoom_link as string) ?? ""

  const { error } = await supabase
    .from("site_settings")
    .upsert(
      { id: 1, is_live, zoom_link, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    )

  if (error) {
    console.error("Settings save error:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
