import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  const { skripsiId, nilai, komentar } = await req.json()

  const existing = await prisma.penilaian.findUnique({ where: { skripsiId } })

  let result
  if (existing) {
    result = await prisma.penilaian.update({
      where: { skripsiId },
      data: { nilai, komentar },
    })
  } else {
    result = await prisma.penilaian.create({
      data: { skripsiId, nilai, komentar },
    })
  }

  return NextResponse.json(result)
}
