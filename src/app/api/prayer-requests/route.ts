import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const LIMITS = {
  request: 5000,
  field: 255,
} as const

function trimStr(v: unknown, max: number): string | null {
  if (v == null || typeof v !== "string") return null
  const s = v.trim()
  if (s.length === 0) return null
  return s.length > max ? s.slice(0, max) : s
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }

  const o = body as Record<string, unknown>
  const requestText = trimStr(o.request, LIMITS.request)
  if (!requestText) {
    return NextResponse.json(
      { error: "Prayer request message is required." },
      { status: 400 }
    )
  }

  const name = trimStr(o.name, LIMITS.field)
  const email = trimStr(o.email, LIMITS.field)
  const phone = trimStr(o.phone, LIMITS.field)

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  const { error } = await supabase.from("prayer_requests").insert({
    name,
    email,
    phone,
    request: requestText,
  })

  if (error) {
    console.error("[prayer-requests]", error)
    return NextResponse.json(
      { error: "Could not save your request. Please try again later." },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
