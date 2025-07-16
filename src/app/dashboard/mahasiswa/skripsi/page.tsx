"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function SkripsiSayaPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch("/api/mahasiswa/skripsi")
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!data) {
    return <p className="text-center text-sm text-zinc-600">Belum ada skripsi diajukan.</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skripsi Saya</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p><strong>Judul:</strong> {data.title}</p>
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Pembimbing:</strong> {data.pembimbing?.name || "-"}</p>
        <p><strong>Nilai:</strong> {data.penilaian?.nilai ?? "-"}</p>
        <p><strong>Komentar Penilaian:</strong> {data.penilaian?.komentar ?? "-"}</p>

        {data.sidang && (
          <>
            <p><strong>Status Sidang:</strong> Dijadwalkan</p>
            <p><strong>Tanggal Sidang:</strong> {new Date(data.sidang.tanggal).toLocaleString()}</p>
            <p><strong>Ruang:</strong> {data.sidang.ruang}</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
