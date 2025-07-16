"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export default function BimbinganPage() {
  const [logs, setLogs] = useState([])

  const fetchData = async () => {
    const res = await fetch("/api/dosen/bimbingan")
    const json = await res.json()
    setLogs(json)
  }

  useEffect(() => { fetchData() }, [])

  const handleUpdate = async (id: string, status: string, komentar: string, jadwal: string) => {
    await fetch("/api/dosen/bimbingan/update", {
      method: "PATCH",
      body: JSON.stringify({ id, status, komentar, jadwal }),
    })
    fetchData()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Bimbingan Mahasiswa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {logs.length === 0 ? (
          <p className="text-zinc-600">Belum ada bimbingan dari mahasiswa.</p>
        ) : (
          logs.map((log: any) => (
            <div key={log.id} className="border p-3 rounded space-y-2">
              <p><strong>Nama:</strong> {log.skripsi.mahasiswa.name}</p>
              <p><strong>Judul:</strong> {log.skripsi.title}</p>
              <p><strong>Isi:</strong> {log.isi}</p>
              <p><strong>Status:</strong> {log.status}</p>
              {log.jadwal && (
                <p><strong>Jadwal:</strong> {format(new Date(log.jadwal), "dd MMM yyyy HH:mm")}</p>
              )}
              <Textarea placeholder="Komentar..." onChange={(e) => (log.komentar = e.target.value)} />
              <Input type="datetime-local" onChange={(e) => (log.jadwal = e.target.value)} />
              <div className="flex gap-2">
                <Button onClick={() => handleUpdate(log.id, "Disetujui", log.komentar, log.jadwal)}>Setujui</Button>
                <Button variant="destructive" onClick={() => handleUpdate(log.id, "Ditolak", log.komentar, log.jadwal)}>Tolak</Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
