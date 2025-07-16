"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { format } from "date-fns"

export default function JadwalSidangDosenPage() {
  const [jadwal, setJadwal] = useState([])

  const fetchData = async () => {
    const res = await fetch("/api/dosen/jadwal")
    const json = await res.json()
    setJadwal(json)
  }

  useEffect(() => { fetchData() }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jadwal Sidang Saya</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {jadwal.length === 0 ? (
          <p className="text-zinc-600">Belum ada jadwal sidang.</p>
        ) : (
          jadwal.map((s: any) => (
            <div key={s.id} className="border p-3 rounded space-y-1">
              <p><strong>Mahasiswa:</strong> {s.skripsi.mahasiswa.name}</p>
              <p><strong>Judul Skripsi:</strong> {s.skripsi.title}</p>
              <p><strong>Tanggal:</strong> {format(new Date(s.tanggal), "dd MMM yyyy HH:mm")}</p>
              <p><strong>Ruang:</strong> {s.ruang}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
