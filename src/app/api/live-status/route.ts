import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export const revalidate = 0 // no caching

export async function GET() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("is_live, zoom_link")
    .limit(1)
    .single()

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ is_live: false, zoom_link: "" })
  }

  return NextResponse.json({
    is_live: data?.is_live ?? false,
    zoom_link: data?.zoom_link ?? "",
  })
}
