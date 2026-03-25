import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createHmac } from "crypto"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme"
const COOKIE_NAME = "admin_session"

function makeToken(): string {
  return createHmac("sha256", ADMIN_PASSWORD).update("admin").digest("hex")
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const password = (body?.password as string) ?? ""

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return NextResponse.json({ ok: true })
}
