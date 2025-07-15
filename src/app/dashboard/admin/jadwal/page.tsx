"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BimbinganPage() {
  const [bimbingan, setBimbingan] = useState([])

  const fetchData = async () => {
    const res = await fetch("/api/admin/bimbingan")
    const json = await res.json()
    setBimbingan(json)
  }

  useEffect(() => { fetchData() }, [])

  const handleUpdate = async (id: string, status: string, jadwal: string) => {
    await fetch("/api/admin/bimbingan/update", {
      method: "PATCH",
      body: JSON.stringify({ id, status, jadwal }),
    })
    fetchData()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Jadwal & Status Bimbingan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bimbingan.map((b: any) => (
          <div key={b.id} className="border p-3 rounded space-y-2">
            <p><strong>Mahasiswa:</strong> {b.skripsi.mahasiswa.name}</p>
            <p><strong>Pembimbing:</strong> {b.skripsi.pembimbing.name}</p>
            <p><strong>Isi Bimbingan:</strong> {b.isi}</p>
            <p><strong>Status:</strong> {b.status}</p>
            <div className="flex gap-2">
              <Input type="datetime-local" onChange={(e) => (b.jadwal = e.target.value)} />
              <Button onClick={() => handleUpdate(b.id, "Disetujui", b.jadwal)}>Setujui</Button>
              <Button variant="destructive" onClick={() => handleUpdate(b.id, "Ditolak", "")}>Tolak</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
