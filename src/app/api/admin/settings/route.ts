import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const settings = await prisma.setting.findMany({ orderBy: { key: "asc" } })
  return NextResponse.json(settings)
}

export async function PATCH(req: Request) {
  const body = await req.json()
  const { id, value } = body as { id: string; value: string }

  const updated = await prisma.setting.update({
    where: { id },
    data: { value },
  })

  return NextResponse.json(updated)
}