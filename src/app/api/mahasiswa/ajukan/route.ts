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
  })

  return NextResponse.json(skripsi)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title } = await req.json()

  const existing = await prisma.skripsi.findFirst({
    where: { mahasiswaId: userId },
  })

  let skripsi

  if (existing) {
    skripsi = await prisma.skripsi.update({
      where: { id: existing.id },
      data: {
        title,
        status: "Diajukan",
      },
    })
  } else {
    skripsi = await prisma.skripsi.create({
      data: {
        mahasiswaId: userId,
        pembimbingId: userId, 
        title,
        status: "Diajukan",
      },
    })
  }

  return NextResponse.json(skripsi)
}
