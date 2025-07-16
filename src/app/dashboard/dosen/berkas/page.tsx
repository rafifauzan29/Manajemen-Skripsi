"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function BerkasDosenPage() {
  const [berkas, setBerkas] = useState([])

  const fetchData = async () => {
    const res = await fetch("/api/dosen/berkas")
    const json = await res.json()
    setBerkas(json)
  }

  useEffect(() => { fetchData() }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Berkas Mahasiswa Bimbingan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {berkas.length === 0 ? (
          <p className="text-zinc-600">Belum ada berkas yang diunggah mahasiswa.</p>
        ) : (
          berkas.map((b: any) => (
            <div key={b.id} className="border p-3 rounded space-y-1">
              <p><strong>Nama:</strong> {b.skripsi.mahasiswa.name}</p>
              <p><strong>Judul Skripsi:</strong> {b.skripsi.title}</p>
              <p><strong>Nama Berkas:</strong> {b.nama}</p>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Buka Berkas
              </a>
              <p><strong>Status:</strong> {b.status}</p>
              {b.komentar && (
                <p><strong>Catatan:</strong> {b.komentar}</p>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
