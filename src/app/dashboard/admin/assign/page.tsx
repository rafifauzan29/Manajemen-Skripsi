"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function AssignPage() {
  const [data, setData] = useState<any>({ mahasiswa: [], dosen: [] })
  const [selected, setSelected] = useState<Record<string, string>>({})

  const fetchData = async () => {
    const res = await fetch("/api/admin/assign")
    const json = await res.json()
    setData(json)
  }

  useEffect(() => { fetchData() }, [])

  const handleAssign = async (mahasiswaId: string) => {
    const pembimbingId = selected[mahasiswaId]
    if (!pembimbingId) return

    const res = await fetch("/api/admin/assign/assign", {
      method: "POST",
      body: JSON.stringify({ mahasiswaId, pembimbingId }),
    })

    if (res.ok) fetchData()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Penugasan Dosen Pembimbing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.mahasiswa.map((mhs: any) => (
          <div key={mhs.id} className="flex items-center justify-between border p-3 rounded">
            <div>
              <p className="font-medium">{mhs.name}</p>
              <p className="text-sm text-gray-500">{mhs.email}</p>
            </div>

            {mhs.skripsis.length > 0 ? (
              <span className="text-green-600">Sudah ditugaskan</span>
            ) : (
              <div className="flex items-center gap-2">
                <Select onValueChange={(value) => setSelected({ ...selected, [mhs.id]: value })}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Dosen" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.dosen.map((dsn: any) => (
                      <SelectItem key={dsn.id} value={dsn.id}>
                        {dsn.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => handleAssign(mhs.id)}>Assign</Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
