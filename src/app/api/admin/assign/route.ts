import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const mahasiswa = await prisma.user.findMany({
    where: { role: "MAHASISWA" },
    include: {
      skripsis: true,
    },
  })

  const dosen = await prisma.user.findMany({
    where: { role: "DOSEN" },
  })

  return NextResponse.json({ mahasiswa, dosen })
}
