"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function RevisiNilaiPage() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const res = await fetch("/api/dosen/revisi")
    const json = await res.json()
    setData(json)
  }

  useEffect(() => { fetchData() }, [])

  const handleSave = async (skripsiId: string, nilai: number, komentar: string) => {
    await fetch("/api/dosen/revisi/update", {
      method: "PATCH",
      body: JSON.stringify({ skripsiId, nilai, komentar }),
    })
    fetchData()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revisi & Nilai Skripsi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <p className="text-zinc-600">Belum ada mahasiswa yang bisa dinilai.</p>
        ) : (
          data.map((s: any) => (
            <div key={s.id} className="border p-3 rounded space-y-2">
              <p><strong>Nama:</strong> {s.mahasiswa.name}</p>
              <p><strong>Judul Skripsi:</strong> {s.title}</p>
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Nilai (0 - 100)"
                defaultValue={s.penilaian?.nilai || ""}
                onChange={(e) => (s.nilai = parseFloat(e.target.value))}
              />
              <Textarea
                placeholder="Komentar Revisi"
                defaultValue={s.penilaian?.komentar || ""}
                onChange={(e) => (s.komentar = e.target.value)}
              />
              <Button onClick={() => handleSave(s.id, s.nilai, s.komentar)}>
                Simpan
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
