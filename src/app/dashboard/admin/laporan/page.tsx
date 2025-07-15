"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function LaporanPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/admin/laporan")
      .then((res) => res.json())
      .then(setData)
  }, [])

  if (!data) return <p>Loading...</p>

  const chartData = data.bimbinganPerBulan.map((item: any) => ({
    bulan: new Date(item.createdAt).toLocaleDateString("id-ID", { month: "short", year: "numeric" }),
    jumlah: item._count,
  }))

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader><CardTitle>Statistik Pengguna</CardTitle></CardHeader>
        <CardContent>
          <p>👨‍🎓 Mahasiswa: {data.totalMahasiswa}</p>
          <p>🧑‍🏫 Dosen: {data.totalDosen}</p>
          <p>🛠 Admin: {data.totalAdmin}</p>
          <p>👥 Total: {data.totalUsers}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Status Skripsi</CardTitle></CardHeader>
        <CardContent>
          {data.skripsiByStatus.map((s: any) => (
            <p key={s.status}>
              📄 {s.status}: {s._count.status}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>📊 Grafik Aktivitas Bimbingan</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
