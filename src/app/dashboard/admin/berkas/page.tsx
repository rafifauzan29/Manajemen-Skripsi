"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
// import { toast } from "react-hot-toast" // (opsional)

export default function BerkasPage() {
    type BerkasItem = {
        id: string
        nama: string
        url: string
        status: string
        komentar?: string
        skripsi: {
            mahasiswa: {
                name: string
            }
        }
    }

    const [berkas, setBerkas] = useState<BerkasItem[]>([])


    const fetchData = async () => {
        try {
            const res = await fetch("/api/admin/berkas")
            if (!res.ok) throw new Error(await res.text())
            const json = await res.json()
            setBerkas(json)
        } catch (error) {
            console.error("Gagal mengambil data:", error)
            // toast.error("Gagal memuat data") // opsional
        }
    }

    useEffect(() => { fetchData() }, [])

    const handleUpdate = async (id: string, status: string, komentar: string) => {
        try {
            const res = await fetch("/api/admin/berkas/update", {
                method: "PATCH",
                body: JSON.stringify({ id, status, komentar }),
            })
            if (!res.ok) throw new Error(await res.text())
            // toast.success("Status berkas diperbarui!") // opsional
            fetchData()
        } catch (error) {
            console.error("Update gagal:", error)
            // toast.error("Gagal mengubah status") // opsional
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manajemen Berkas Mahasiswa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {berkas.map((b: any, i) => (
                    <div key={b.id} className="border p-3 rounded space-y-2">
                        <p><strong>Mahasiswa:</strong> {b.skripsi.mahasiswa.name}</p>
                        <p><strong>Nama Berkas:</strong> {b.nama}</p>
                        <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">📎 Lihat Berkas</a>
                        <p><strong>Status:</strong> {b.status}</p>

                        <Textarea
                            placeholder="Komentar (Opsional)"
                            onChange={(e) => {
                                const newBerkas = [...berkas]
                                newBerkas[i].komentar = e.target.value
                                setBerkas(newBerkas)
                            }}
                            value={b.komentar || ""}
                        />

                        <div className="flex gap-2">
                            <Button
                                onClick={() => {
                                    if (!b.komentar?.trim()) {
                                        alert("Komentar wajib diisi sebelum menyetujui.")
                                        return
                                    }
                                    handleUpdate(b.id, "Disetujui", b.komentar)
                                }}
                            >
                                ✅ Setujui
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => handleUpdate(b.id, "Ditolak", b.komentar || "")}
                            >
                                ❌ Tolak
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
