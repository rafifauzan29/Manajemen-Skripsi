import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { key: string } }) {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: params.key },
    })

    if (!setting) {
      return NextResponse.json({ error: "Setting not found" }, { status: 404 })
    }

    return NextResponse.json(setting)
  } catch (error) {
    console.error("Error GET setting by key:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
