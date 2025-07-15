import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const mahasiswa = await prisma.user.count({ where: { role: "MAHASISWA" } })
  const dosen = await prisma.user.count({ where: { role: "DOSEN" } })

  const skripsiAktif = await prisma.skripsi.count({
    where: { status: { not: "SELESAI" } },
  })

  const sidangTerjadwal = await prisma.sidang.count()

  const grafik = await prisma.skripsi.groupBy({
    by: ["status"],
    _count: { status: true },
  })

  return NextResponse.json({
    stats: { mahasiswa, dosen, skripsiAktif, sidangTerjadwal },
    grafik: grafik.map((item) => ({
      status: item.status,
      jumlah: item._count.status,
    })),
  })
}
