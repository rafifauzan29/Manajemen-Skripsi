"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    mahasiswa: 0,
    dosen: 0,
    skripsiAktif: 0,
    sidangTerjadwal: 0,
  })

  const [grafik, setGrafik] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/admin/dashboard")
      const data = await res.json()
      setStats(data.stats)
      setGrafik(data.grafik)
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Dashboard Admin</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-gray-500">Total Mahasiswa</h3>
            <p className="text-2xl font-bold">{stats.mahasiswa}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-gray-500">Total Dosen</h3>
            <p className="text-2xl font-bold">{stats.dosen}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-gray-500">Skripsi Aktif</h3>
            <p className="text-2xl font-bold">{stats.skripsiAktif}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-gray-500">Sidang Terjadwal</h3>
            <p className="text-2xl font-bold">{stats.sidangTerjadwal}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Grafik Status Skripsi</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={grafik}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jumlah" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
