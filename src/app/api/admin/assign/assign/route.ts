import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { mahasiswaId, pembimbingId } = await req.json()

  const skripsi = await prisma.skripsi.create({
    data: {
      title: "Judul Skripsi Sementara",
      mahasiswaId,
      pembimbingId,
    },
  })

  return NextResponse.json(skripsi)
}
