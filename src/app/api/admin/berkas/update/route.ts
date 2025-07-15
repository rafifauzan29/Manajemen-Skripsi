import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  try {
    const { id, status, komentar } = await req.json()

    const updated = await prisma.berkas.update({
      where: { id },
      data: {
        status,
        komentar,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("❌ ERROR PATCH /api/admin/berkas/update:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
