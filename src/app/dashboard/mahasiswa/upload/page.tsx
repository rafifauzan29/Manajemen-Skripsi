"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function UploadPage() {
  const [berkas, setBerkas] = useState([])
  const [nama, setNama] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchBerkas = async () => {
    const res = await fetch("/api/mahasiswa/berkas")
    const json = await res.json()
    setBerkas(json)
  }

  useEffect(() => {
    fetchBerkas()
  }, [])

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file || !nama) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("nama", nama)

    await fetch("/api/mahasiswa/berkas", {
      method: "POST",
      body: formData,
    })

    setNama("")
    if (fileRef.current) fileRef.current.value = ""
    fetchBerkas()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Dokumen Skripsi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input placeholder="Nama Dokumen (misal: Bab 1, Draft Akhir)" value={nama} onChange={(e) => setNama(e.target.value)} />
          <Input type="file" ref={fileRef} accept=".pdf" />
          <Button onClick={handleUpload}>Upload</Button>
        </div>

        <div className="mt-6 space-y-3">
          {berkas.length === 0 ? (
            <p className="text-sm text-zinc-600">Belum ada dokumen diunggah.</p>
          ) : (
            berkas.map((b: any) => (
              <div key={b.id} className="border p-3 rounded bg-white shadow-sm space-y-1">
                <p><strong>Nama:</strong> {b.nama}</p>
                <p><strong>Status:</strong> {b.status}</p>
                {b.komentar && <p><strong>Komentar:</strong> {b.komentar}</p>}
                <a href={b.url} className="text-blue-600 underline text-sm" target="_blank" rel="noopener noreferrer">Lihat Dokumen</a>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
