"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ValidasiJudulPage() {
  const [skripsi, setSkripsi] = useState([])

  const fetchData = async () => {
    const res = await fetch("/api/dosen/validasi")
    const json = await res.json()
    setSkripsi(json)
  }

  useEffect(() => { fetchData() }, [])

  const handleUpdate = async (id: string, status: string, komentar: string) => {
    await fetch("/api/dosen/validasi/update", {
      method: "PATCH",
      body: JSON.stringify({ id, status, komentar }),
    })
    fetchData()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validasi Judul Skripsi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {skripsi.length === 0 ? (
          <p className="text-zinc-600">Tidak ada pengajuan judul baru.</p>
        ) : (
          skripsi.map((s: any) => (
            <div key={s.id} className="border p-3 rounded space-y-2">
              <p><strong>Nama:</strong> {s.mahasiswa.name}</p>
              <p><strong>Email:</strong> {s.mahasiswa.email}</p>
              <p><strong>Judul Skripsi:</strong> {s.title}</p>
              <Textarea
                placeholder="Komentar (jika menolak)"
                onChange={(e) => (s.komentar = e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={() => handleUpdate(s.id, "Disetujui", s.komentar)}>Setujui</Button>
                <Button variant="destructive" onClick={() => handleUpdate(s.id, "Ditolak", s.komentar)}>Tolak</Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
