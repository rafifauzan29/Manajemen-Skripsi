import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const skripsi = await prisma.skripsi.findFirst({
    where: { mahasiswaId: userId },
    select: { id: true },
  })

  if (!skripsi) {
    return NextResponse.json([])
  }

  const bimbingan = await prisma.logBimbingan.findMany({
    where: { skripsiId: skripsi.id },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(bimbingan)
}
