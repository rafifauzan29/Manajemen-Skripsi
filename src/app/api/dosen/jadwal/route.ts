import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const data = await prisma.sidang.findMany({
    where: {
      OR: [
        { penguji1Id: userId },
        { penguji2Id: userId },
      ],
    },
    include: {
      skripsi: {
        include: {
          mahasiswa: true,
        },
      },
    },
    orderBy: {
      tanggal: "asc",
    },
  })

  return NextResponse.json(data)
}
