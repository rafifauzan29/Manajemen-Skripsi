"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Setting {
  id: string
  key: string
  value: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/settings")
      const data = await res.json()
      setSettings(data)
    } catch (err) {
      console.error("Gagal mengambil data:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (id: string, value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value } : s))
    )
  }

  const handleUpdate = async (id: string, value: string) => {
    await fetch("/api/admin/settings", {
      method: "PATCH",
      body: JSON.stringify({ id, value }),
    })
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Sistem</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading && <p className="text-sm text-gray-500">Memuat pengaturan...</p>}

        {settings.map((s) => (
          <div key={s.id} className="border p-4 rounded-md space-y-2">
            <label className="block font-medium capitalize">
              {s.key.replace("_", " ")}
            </label>

            {/* Logo khusus */}
            {s.key === "logo_url" ? (
              <>
                <Input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={s.value}
                  onChange={(e) => handleChange(s.id, e.target.value)}
                />
                {s.value && (
                  <div className="mt-2">
                    <Image
                      src={s.value}
                      alt="Logo Preview"
                      width={120}
                      height={120}
                      className="rounded-md border bg-white p-2"
                    />
                  </div>
                )}
              </>
            ) : (
              <Input
                value={s.value}
                onChange={(e) => handleChange(s.id, e.target.value)}
              />
            )}

            <Button onClick={() => handleUpdate(s.id, s.value)}>Simpan</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
