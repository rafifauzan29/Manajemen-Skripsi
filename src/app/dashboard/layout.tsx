import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ReactNode } from "react"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/auth/login")

  const role = session.user.role
  const name = session.user.name

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-zinc-800 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="font-semibold text-lg">🎓 Sistem Manajemen Skripsi</h1>
        <div className="text-sm">
          {name} ({role}) |{" "}
          <form action="/api/auth/signout" method="POST" className="inline">
            <button type="submit" className="underline hover:text-red-300">
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-100 p-4 border-r space-y-2 text-sm">
          <h2 className="font-semibold mb-2">Menu {role}</h2>
          <nav className="flex flex-col space-y-1">
            {/* ADMIN MENU */}
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

            {/* DOSEN MENU */}
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

            {/* MAHASISWA MENU */}
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
        &copy; {new Date().getFullYear()} Kampus AI - All rights reserved.
      </footer>
    </div>
  )
}
