import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const mahasiswaCount = await prisma.skripsi.count({
    where: { pembimbingId: userId },
  })

  const bimbinganPending = await prisma.logBimbingan.count({
    where: {
      skripsi: { pembimbingId: userId },
      status: "Diajukan",
    },
  })

  const sidangCount = await prisma.sidang.count({
    where: {
      OR: [{ penguji1Id: userId }, { penguji2Id: userId }],
    },
  })

  return NextResponse.json({
    mahasiswaCount,
    bimbinganPending,
    sidangCount,
  })
}
