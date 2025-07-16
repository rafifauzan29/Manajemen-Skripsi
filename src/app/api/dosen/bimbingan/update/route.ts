import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  const { id, status, komentar, jadwal } = await req.json()

  const update = await prisma.logBimbingan.update({
    where: { id },
    data: {
      status,
      komentar,
      jadwal: jadwal ? new Date(jadwal) : null,
    },
  })

  return NextResponse.json(update)
}
