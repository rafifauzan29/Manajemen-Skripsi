import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  const { id, status, komentar, jadwal } = await req.json()

  const updated = await prisma.logBimbingan.update({
    where: { id },
    data: {
      status,
      komentar,
      jadwal: jadwal ? new Date(jadwal) : undefined,
    },
  })

  return NextResponse.json(updated)
}
