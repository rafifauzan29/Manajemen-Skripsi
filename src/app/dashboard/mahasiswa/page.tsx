"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function DashboardMahasiswa() {
  const [data, setData] = useState<any>(null)

  const fetchData = async () => {
    const res = await fetch("/api/mahasiswa/dashboard")
    const json = await res.json()
    setData(json.skripsi)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Selamat datang, Mahasiswa!</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-zinc-700 space-y-2">
          <p><strong>Judul Skripsi:</strong> {data?.judul || "Belum diajukan"}</p>
          <p><strong>Status:</strong> {data?.status || "Belum diajukan"}</p>
          <p><strong>Dosen Pembimbing:</strong> {data?.pembimbing?.name || "Belum ditugaskan"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terakhir</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-zinc-700 space-y-2">
          <p><strong>Bimbingan Terakhir:</strong> {data?.bimbingan?.[0]?.catatan || "Belum ada"}</p>
          <p><strong>Status Berkas:</strong> {data?.berkas?.[0]?.status || "Belum diupload"}</p>
          <p><strong>Jadwal Sidang:</strong> {data?.jadwal?.tanggal ? new Date(data.jadwal.tanggal).toLocaleDateString() : "Belum dijadwalkan"}</p>
        </CardContent>
      </Card>
    </div>
  )
}
