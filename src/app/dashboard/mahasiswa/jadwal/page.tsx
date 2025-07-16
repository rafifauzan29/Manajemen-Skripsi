"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { format } from "date-fns"

export default function JadwalSidangPage() {
  const [jadwal, setJadwal] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchJadwal = async () => {
    const res = await fetch("/api/mahasiswa/jadwal")
    const json = await res.json()
    setJadwal(json)
    setLoading(false)
  }

  useEffect(() => {
    fetchJadwal()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!jadwal) {
    return <p className="text-sm text-center text-zinc-600">Belum ada jadwal sidang tersedia.</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jadwal Sidang Saya</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <p><strong>Judul Skripsi:</strong> {jadwal.skripsi.title}</p>
        <p><strong>Tanggal:</strong> {format(new Date(jadwal.tanggal), "dd MMM yyyy HH:mm")}</p>
        <p><strong>Ruang:</strong> {jadwal.ruang}</p>
        <p><strong>Penguji 1:</strong> {jadwal.penguji1.name}</p>
        <p><strong>Penguji 2:</strong> {jadwal.penguji2.name}</p>
      </CardContent>
    </Card>
  )
}
