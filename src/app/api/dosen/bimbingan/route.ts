import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const logs = await prisma.logBimbingan.findMany({
    where: {
      skripsi: {
        pembimbingId: userId,
      },
    },
    include: {
      skripsi: {
        include: {
          mahasiswa: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return NextResponse.json(logs)
}
