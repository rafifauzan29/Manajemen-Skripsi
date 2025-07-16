"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useSetting } from "@/hooks/useSetting"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, LogOut } from "lucide-react"

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

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const { name, role } = session

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#0058a8] text-white px-6 py-3 flex justify-between items-center shadow-md h-[60px]">
        <div className="flex items-center gap-3">
          {logoLoading ? (
            <div className="h-9 w-9 bg-zinc-300 rounded animate-pulse" />
          ) : logoUniversitas ? (
            <div className="relative h-9 w-9">
              <Image
                src={logoUniversitas}
                alt="Logo Universitas"
                fill
                className="object-contain bg-white p-1 rounded"
                unoptimized
              />
            </div>
          ) : (
            <div className="h-9 w-9 bg-zinc-300 rounded" />
          )}

          <h1 className="font-semibold text-base md:text-lg tracking-tight">
            {namaUniversitas || "Sistem Manajemen Skripsi"}
          </h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white focus:text-white focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              {name} ({role})
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <form action="/api/auth/signout" method="POST">
              <DropdownMenuItem asChild>
                <button type="submit" className="flex items-center w-full text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-zinc-200 p-4 overflow-y-auto">
          <h2 className="text-zinc-600 font-bold text-xs uppercase mb-3 tracking-wide">
            Menu {role}
          </h2>
          <nav className="space-y-1 text-sm font-medium">
            {role === "ADMIN" && (
              <>
                <SidebarLink href="/dashboard/admin" label="🏠 Dashboard" />
                <SidebarLink href="/dashboard/admin/users" label="👥 Kelola Pengguna" />
                <SidebarLink href="/dashboard/admin/assign" label="🧑‍🏫 Penugasan Dosen" />
                <SidebarLink href="/dashboard/admin/jadwal" label="📅 Jadwal Sidang" />
                <SidebarLink href="/dashboard/admin/berkas" label="📎 Berkas Mahasiswa" />
                <SidebarLink href="/dashboard/admin/laporan" label="📊 Laporan & Statistik" />
                <SidebarLink href="/dashboard/admin/settings" label="⚙️ Pengaturan Sistem" />
              </>
            )}
            {role === "DOSEN" && (
              <>
                <SidebarLink href="/dashboard/dosen" label="🏠 Dashboard" />
                <SidebarLink href="/dashboard/dosen/mahasiswa" label="👨‍🎓 Daftar Mahasiswa" />
                <SidebarLink href="/dashboard/dosen/validasi" label="📥 Validasi Judul Skripsi" />
                <SidebarLink href="/dashboard/dosen/bimbingan" label="✍️ Bimbingan Mahasiswa" />
                <SidebarLink href="/dashboard/dosen/revisi" label="📄 Revisi & Nilai" />
                <SidebarLink href="/dashboard/dosen/jadwal" label="📅 Jadwal Sidang" />
                <SidebarLink href="/dashboard/dosen/berkas" label="📎 Berkas Mahasiswa" />
              </>
            )}
            {role === "MAHASISWA" && (
              <>
                <SidebarLink href="/dashboard/mahasiswa" label="🏠 Dashboard" />
                <SidebarLink href="/dashboard/mahasiswa/ajukan" label="📝 Ajukan Judul Skripsi" />
                <SidebarLink href="/dashboard/mahasiswa/skripsi" label="📚 Skripsi Saya" />
                <SidebarLink href="/dashboard/mahasiswa/bimbingan" label="📋 Riwayat Bimbingan" />
                <SidebarLink href="/dashboard/mahasiswa/upload" label="📤 Upload Dokumen" />
                <SidebarLink href="/dashboard/mahasiswa/jadwal" label="📅 Jadwal Sidang" />
                <SidebarLink href="/dashboard/mahasiswa/hasil" label="📊 Hasil & Revisi" />
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-zinc-50 overflow-y-auto">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-[#0058a8] text-white text-xs h-[48px] flex items-center justify-center shadow-inner mt-auto">
        &copy; {new Date().getFullYear()} {namaUniversitas || "Kampus AI"} — All rights reserved.
      </footer>
    </div>
  )
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  const path = usePathname()
  const isActive = path === href

  return (
    <Link
      href={href}
      className={cn(
        "block px-3 py-2 rounded-md transition",
        isActive
          ? "bg-[#0058a8]/10 text-[#0058a8] font-semibold"
          : "hover:bg-zinc-100 text-zinc-700"
      )}
    >
      {label}
    </Link>
  )
}
