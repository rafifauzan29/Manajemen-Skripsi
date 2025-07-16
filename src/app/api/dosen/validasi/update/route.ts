import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  const { id, status, komentar } = await req.json()

  const update = await prisma.skripsi.update({
    where: { id },
    data: {
      status,
      ...(komentar && { komentar }),
    },
  })

  return NextResponse.json(update)
}
