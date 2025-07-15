import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = await prisma.berkas.findMany({
      include: {
        skripsi: {
          include: {
            mahasiswa: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error("❌ ERROR GET /api/admin/berkas:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
