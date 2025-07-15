"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { toast } from "sonner"

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
      const res = await fetch("/api/admin/setting") 
      if (!res.ok) throw new Error("Failed to fetch settings")
      const data = await res.json()
      setSettings(data)
    } catch (err) {
      console.error("Gagal mengambil data:", err)
      toast.error("Gagal memuat pengaturan")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateText = async (id: string, value: string) => {
    try {
      const res = await fetch("/api/admin/setting", { // <--- ubah di sini
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, value }),
      })

      if (!res.ok) throw new Error("Update failed")

      toast.success("Pengaturan berhasil diperbarui")
      fetchData()
    } catch (err) {
      console.error("Gagal update:", err)
      toast.error("Gagal memperbarui pengaturan")
    }
  }

  const handleUpload = async (id: string, file: File) => {
    const formData = new FormData()
    formData.append("id", id)
    formData.append("file", file)

    try {
      const res = await fetch("/api/admin/setting", { 
        method: "PATCH",
        body: formData,
      })

      if (!res.ok) throw new Error(`Upload failed (${res.status})`)

      const result = await res.json()
      toast.success("Logo berhasil diupload")
      fetchData()
    } catch (err) {
      console.error("Gagal upload file:", err)
      toast.error("Gagal mengupload logo")
    }
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
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border p-4 rounded-md space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && settings.length === 0 && (
          <p className="text-sm text-gray-500">Tidak ada pengaturan yang ditemukan</p>
        )}

        {settings.map((s) => (
          <div key={s.id} className="border p-4 rounded-md space-y-2">
            <label className="block font-medium capitalize">
              {s.key.replace("_", " ")}
            </label>

            {s.key === "logo_url" ? (
              <>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUpload(s.id, e.target.files[0])
                    }
                  }}
                />
                {s.value && (
                  <div className="mt-2">
                    <div className="relative w-32 h-32">
                      <Image
                        src={s.value}
                        alt="Logo Preview"
                        fill
                        className="rounded-md border bg-white p-2 object-contain"
                        unoptimized={true}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={s.value}
                  onChange={(e) => {
                    setSettings(prev =>
                      prev.map(setting =>
                        setting.id === s.id
                          ? { ...setting, value: e.target.value }
                          : setting
                      )
                    )
                  }}
                />
                <Button
                  onClick={() => handleUpdateText(s.id, s.value)}
                  disabled={loading}
                >
                  Simpan
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
