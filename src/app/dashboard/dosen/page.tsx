"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function DosenDashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/dosen/dashboard")
      const json = await res.json()
      setData(json)
    }

    fetchData()
  }, [])

  if (!data) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>👨‍🎓 Mahasiswa Bimbingan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.mahasiswaCount}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>✍️ Bimbingan Menunggu</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.bimbinganPending}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📅 Jadwal Sidang</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.sidangCount}</p>
        </CardContent>
      </Card>
    </div>
  )
}
