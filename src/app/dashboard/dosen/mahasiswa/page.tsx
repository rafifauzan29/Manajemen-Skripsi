"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function DosenMahasiswaPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/dosen/mahasiswa")
      const json = await res.json()
      setData(json)
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Mahasiswa Bimbingan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {data.length === 0 ? (
          <p className="text-zinc-600">Belum ada mahasiswa bimbingan.</p>
        ) : (
          data.map((s: any) => (
            <div key={s.id} className="border p-3 rounded bg-white space-y-1">
              <p><strong>Nama:</strong> {s.mahasiswa.name}</p>
              <p><strong>Email:</strong> {s.mahasiswa.email}</p>
              <p><strong>Judul Skripsi:</strong> {s.title}</p>
              <p><strong>Status:</strong> {s.status}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
