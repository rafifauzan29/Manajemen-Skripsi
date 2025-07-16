"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function AjukanSkripsiPage() {
  const [judul, setJudul] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch("/api/mahasiswa/ajukan")
    const json = await res.json()
    if (json?.title) {
      setJudul(json.title)
      setStatus(json.status)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await fetch("/api/mahasiswa/ajukan", {
      method: "POST",
      body: JSON.stringify({ title: judul }),
    })
    await fetchData()
    setIsSubmitting(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajukan Judul Skripsi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Judul Skripsi</label>
          <Textarea
            rows={4}
            placeholder="Masukkan judul skripsi"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
        </div>

        {status && (
          <p className="text-sm">
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-white text-xs ${
                status === "Disetujui"
                  ? "bg-green-600"
                  : status === "Ditolak"
                  ? "bg-red-600"
                  : "bg-yellow-600"
              }`}
            >
              {status}
            </span>
          </p>
        )}

        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Mengirim..." : "Ajukan"}
        </Button>
      </CardContent>
    </Card>
  )
}
