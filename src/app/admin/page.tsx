"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loggingIn, setLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState("")

  const [isLive, setIsLive] = useState(false)
  const [zoomLink, setZoomLink] = useState("")
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")

  async function loadSettings() {
    const res = await fetch("/api/admin/settings", { credentials: "include" })
    if (res.status === 401) {
      setAuthenticated(false)
      return false
    }
    if (!res.ok) {
      setAuthenticated(false)
      return false
    }
    const data = await res.json()
    setIsLive(data.is_live ?? false)
    setZoomLink(data.zoom_link ?? "")
    setAuthenticated(true)
    return true
  }

  useEffect(() => {
    loadSettings().then(() => setLoading(false))
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError("")
    setLoggingIn(true)
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
      credentials: "include",
    })
    setLoggingIn(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setLoginError(data?.error ?? "Login failed")
      return
    }
    setPassword("")
    await loadSettings()
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" })
    setAuthenticated(false)
  }

  async function handleSave() {
    setSaving(true)
    setSaveMsg("")
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_live: isLive, zoom_link: zoomLink }),
      credentials: "include",
    })
    setSaving(false)
    if (!res.ok) {
      setSaveMsg("Failed to save settings.")
      return
    }
    setSaveMsg("Settings saved!")
    setTimeout(() => setSaveMsg(""), 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef3f9] flex items-center justify-center">
        <div className="text-[#1e5fa8] font-mono text-lg font-bold uppercase tracking-widest">Loading…</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#eef3f9] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border-4 border-[#1e5fa8] shadow-[8px_8px_0px_0px_rgba(30,95,168,0.6)] p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#1e5fa8] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-[#0d2f5a] uppercase tracking-tight">Admin</h2>
          </div>
          <p className="text-sm text-[#1e5fa8]/60 font-mono mb-6">Enter password to continue.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="block text-xs font-black text-[#0d2f5a] uppercase tracking-widest mb-2">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
                autoComplete="current-password"
                className="w-full border-3 border-[#1e5fa8] px-4 py-3 text-sm font-mono bg-white focus:outline-none focus:ring-4 focus:ring-[#1e5fa8]/20"
              />
            </div>
            {loginError && (
              <div className="bg-red-500 text-white px-4 py-2 border-2 border-red-700 font-mono text-sm font-bold">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-[#1e5fa8] text-white px-6 py-3 text-sm font-black uppercase tracking-widest hover:bg-[#0d2f5a] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 transition-all"
            >
              {loggingIn ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p className="mt-6 text-center">
            <Link href="/" className="text-sm font-mono font-bold text-[#1e5fa8] underline decoration-2 underline-offset-4 hover:decoration-[#1e5fa8]/40">
              &larr; Back to site
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#eef3f9]">
      <header className="border-b-4 border-[#1e5fa8] bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black text-[#0d2f5a] uppercase tracking-tight">TMC Admin</h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-mono font-bold text-[#1e5fa8] underline decoration-2 underline-offset-4 hover:decoration-[#1e5fa8]/40">
              Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-black uppercase tracking-wider border-3 border-[#1e5fa8] text-[#1e5fa8] px-4 py-2 hover:bg-[#1e5fa8] hover:text-white active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white border-4 border-[#1e5fa8] shadow-[8px_8px_0px_0px_rgba(30,95,168,0.6)] p-8">
          <div className="mb-2">
            <h2 className="text-2xl font-black text-[#0d2f5a] uppercase tracking-tight">Live Status</h2>
          </div>
          <p className="text-sm text-[#1e5fa8]/60 font-mono mb-8">
            Control the &quot;We Are Live&quot; banner on the homepage.
          </p>

          <div className="space-y-8">
            {/* Toggle */}
            <div className="flex items-center justify-between border-3 border-[#1e5fa8]/30 bg-[#f8fafd] p-5">
              <div>
                <p className="text-sm font-black text-[#0d2f5a] uppercase tracking-wider">We are live</p>
                <p className="text-xs text-[#1e5fa8]/50 font-mono mt-1">Show the live banner on the homepage</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isLive}
                onClick={() => setIsLive(!isLive)}
                className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer border-3 transition-colors ${
                  isLive ? "bg-green-400 border-green-600" : "bg-gray-200 border-[#1e5fa8]/30"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-full w-7 transition-transform ${
                    isLive ? "translate-x-[calc(100%+3px)] bg-green-800" : "translate-x-0 bg-[#1e5fa8]"
                  }`}
                />
              </button>
            </div>

            {/* Zoom link */}
            <div>
              <label htmlFor="zoom-link" className="block text-xs font-black text-[#0d2f5a] uppercase tracking-widest mb-2">
                Zoom Link
              </label>
              <p className="text-xs text-[#1e5fa8]/50 font-mono mb-3">
                The link visitors go to when they click &quot;Join Now&quot;.
              </p>
              <input
                id="zoom-link"
                type="url"
                value={zoomLink}
                onChange={(e) => setZoomLink(e.target.value)}
                placeholder="https://zoom.us/j/..."
                className="w-full border-3 border-[#1e5fa8] px-4 py-3 text-sm font-mono bg-white focus:outline-none focus:ring-4 focus:ring-[#1e5fa8]/20"
              />
            </div>

            {/* Save */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#1e5fa8] text-white px-8 py-3 text-sm font-black uppercase tracking-widest hover:bg-[#0d2f5a] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 transition-all shadow-[4px_4px_0px_0px_rgba(30,95,168,0.6)] hover:shadow-[2px_2px_0px_0px_rgba(30,95,168,0.6)]"
              >
                {saving ? "Saving…" : "Save Settings"}
              </button>
              {saveMsg && (
                <div className={`px-4 py-2 border-2 font-mono text-sm font-bold ${
                  saveMsg.includes("Failed") ? "bg-red-100 text-red-700 border-red-400" : "bg-green-100 text-green-700 border-green-400"
                }`}>
                  {saveMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
