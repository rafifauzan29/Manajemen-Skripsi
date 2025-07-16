import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  const skripsi = await prisma.skripsi.findFirst({
    where: { mahasiswaId: userId },
  })

  if (!skripsi) return NextResponse.json([])

  const berkas = await prisma.berkas.findMany({
    where: { skripsiId: skripsi.id },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(berkas)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  const formData = await req.formData()
  const nama = formData.get("nama") as string
  const file = formData.get("file") as File

  const skripsi = await prisma.skripsi.findFirst({
    where: { mahasiswaId: userId },
  })

  if (!skripsi || !file) {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const url = `https://fakeupload.local/${file.name}`

  const berkas = await prisma.berkas.create({
    data: {
      skripsiId: skripsi.id,
      nama,
      url,
    },
  })

  return NextResponse.json(berkas)
}
