"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { format } from "date-fns"

export default function HasilRevisiPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const res = await fetch("/api/mahasiswa/hasil")
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
    return <p className="text-sm text-center text-zinc-600">Data tidak ditemukan.</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil & Revisi Skripsi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p><strong>Judul Skripsi:</strong> {data.title}</p>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Nilai Akhir:</strong> {data.penilaian?.nilai ?? "Belum Dinilai"}</p>
          <p><strong>Komentar Penilaian:</strong> {data.penilaian?.komentar ?? "-"}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Revisi dari Dosen</h3>
          {data.bimbingan.length === 0 ? (
            <p className="text-zinc-600">Tidak ada revisi yang ditolak.</p>
          ) : (
            data.bimbingan.map((rev: any) => (
              <div key={rev.id} className="border p-3 rounded bg-white space-y-1 mb-2 shadow-sm">
                <p><strong>Tanggal:</strong> {format(new Date(rev.createdAt), "dd MMM yyyy HH:mm")}</p>
                <p><strong>Isi:</strong> {rev.isi}</p>
                <p><strong>Komentar:</strong> {rev.komentar}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
