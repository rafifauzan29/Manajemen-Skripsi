"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { format } from "date-fns"

export default function RiwayatBimbinganPage() {
  const [bimbingan, setBimbingan] = useState([])

  const fetchData = async () => {
    const res = await fetch("/api/mahasiswa/bimbingan")
    const json = await res.json()
    setBimbingan(json)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Bimbingan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bimbingan.length === 0 ? (
          <p className="text-sm text-zinc-600">Belum ada bimbingan.</p>
        ) : (
          bimbingan.map((log: any) => (
            <div
              key={log.id}
              className="border p-3 rounded space-y-2 bg-white shadow-sm"
            >
              <p><strong>Tanggal:</strong> {format(new Date(log.createdAt), "dd MMM yyyy HH:mm")}</p>
              <p><strong>Status:</strong> {log.status}</p>
              <p><strong>Isi:</strong> {log.isi}</p>
              {log.komentar && (
                <p><strong>Komentar Dosen:</strong> {log.komentar}</p>
              )}
              {log.jadwal && (
                <p><strong>Jadwal Bimbingan:</strong> {format(new Date(log.jadwal), "dd MMM yyyy HH:mm")}</p>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
