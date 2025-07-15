"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useSetting } from "@/hooks/useSetting"

interface SessionUser {
  name: string
  role: "ADMIN" | "DOSEN" | "MAHASISWA"
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await fetch("/api/auth/session")
        const data = await res.json()
        if (!data?.user) {
          router.push("/auth/login")
        } else {
          setSession(data.user)
        }
      } catch (error) {
        console.error("Failed to fetch session:", error)
      }
    }

    getSession()
  }, [router])

  const { value: namaUniversitas, isLoading: namaLoading } = useSetting("nama_universitas")
  const { value: logoUniversitas, isLoading: logoLoading } = useSetting("logo_url")

  if (!session) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  const { name, role } = session

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-zinc-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {logoLoading ? (
            <div className="h-8 w-8 rounded bg-gray-300 animate-pulse"></div>
          ) : logoUniversitas ? (
            <div className="relative h-8 w-8">
              <Image
                src={logoUniversitas}
                alt="Logo"
                fill
                className="rounded bg-white p-1 object-contain"
                unoptimized={true}
              />
            </div>
          ) : (
            <div className="h-8 w-8 rounded bg-gray-300"></div>
          )}

          <h1 className="font-semibold text-lg">
            {namaLoading ? (
              <span className="h-4 w-40 bg-gray-300 animate-pulse block rounded"></span>
            ) : namaUniversitas || "Sistem Manajemen Skripsi"}
          </h1>
        </div>

        <div className="text-sm">
          {name} ({role}) |{" "}
          <form action="/api/auth/signout" method="POST" className="inline">
            <button type="submit" className="underline hover:text-red-300">Logout</button>
          </form>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-100 p-4 border-r space-y-2 text-sm">
          <h2 className="font-semibold mb-2">Menu {role}</h2>
          <nav className="flex flex-col space-y-1">
            {role === "ADMIN" && (
              <>
                <Link href="/dashboard/admin">🏠 Dashboard</Link>
                <Link href="/dashboard/admin/users">👥 Kelola Pengguna</Link>
                <Link href="/dashboard/admin/assign">🧑‍🏫 Penugasan Dosen</Link>
                <Link href="/dashboard/admin/jadwal">📅 Jadwal Sidang</Link>
                <Link href="/dashboard/admin/berkas">📎 Berkas Mahasiswa</Link>
                <Link href="/dashboard/admin/laporan">📊 Laporan & Statistik</Link>
                <Link href="/dashboard/admin/settings">⚙️ Pengaturan Sistem</Link>
              </>
            )}

            {role === "DOSEN" && (
              <>
                <Link href="/dashboard/dosen">🏠 Dashboard</Link>
                <Link href="/dashboard/dosen/mahasiswa">👨‍🎓 Daftar Mahasiswa</Link>
                <Link href="/dashboard/dosen/validasi">📥 Validasi Judul Skripsi</Link>
                <Link href="/dashboard/dosen/bimbingan">✍️ Bimbingan Mahasiswa</Link>
                <Link href="/dashboard/dosen/revisi">📄 Revisi & Nilai</Link>
                <Link href="/dashboard/dosen/jadwal">📅 Jadwal Sidang</Link>
                <Link href="/dashboard/dosen/berkas">📎 Berkas Mahasiswa</Link>
              </>
            )}

            {role === "MAHASISWA" && (
              <>
                <Link href="/dashboard/mahasiswa">🏠 Dashboard</Link>
                <Link href="/dashboard/mahasiswa/ajukan">📝 Ajukan Judul Skripsi</Link>
                <Link href="/dashboard/mahasiswa/skripsi">📚 Skripsi Saya</Link>
                <Link href="/dashboard/mahasiswa/bimbingan">📋 Riwayat Bimbingan</Link>
                <Link href="/dashboard/mahasiswa/upload">📤 Upload Dokumen</Link>
                <Link href="/dashboard/mahasiswa/jadwal">📅 Jadwal Sidang</Link>
                <Link href="/dashboard/mahasiswa/hasil">📊 Hasil & Revisi</Link>
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-zinc-50">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-200 text-center py-3 text-sm text-zinc-600">
        &copy; {new Date().getFullYear()} {namaUniversitas || "Kampus AI"} - All rights reserved.
      </footer>
    </div>
  )
}
