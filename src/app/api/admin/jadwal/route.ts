import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const data = await prisma.logBimbingan.findMany({
    include: {
      skripsi: {
        include: {
          mahasiswa: true,
          pembimbing: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(data)
}
