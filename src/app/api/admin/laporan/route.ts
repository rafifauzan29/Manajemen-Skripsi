import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const totalUsers = await prisma.user.count()
  const totalMahasiswa = await prisma.user.count({ where: { role: "MAHASISWA" } })
  const totalDosen = await prisma.user.count({ where: { role: "DOSEN" } })
  const totalAdmin = await prisma.user.count({ where: { role: "ADMIN" } })

  const totalSkripsi = await prisma.skripsi.count()
  const skripsiByStatus = await prisma.skripsi.groupBy({
    by: ["status"],
    _count: { status: true },
  })

  const bimbinganPerBulan = await prisma.logBimbingan.groupBy({
    by: ["createdAt"],
    _count: true,
    orderBy: { createdAt: "asc" },
  })

  return NextResponse.json({
    totalUsers,
    totalMahasiswa,
    totalDosen,
    totalAdmin,
    totalSkripsi,
    skripsiByStatus,
    bimbinganPerBulan,
  })
}
