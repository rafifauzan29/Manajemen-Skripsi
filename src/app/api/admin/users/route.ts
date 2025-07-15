import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json()

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 })

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashed, role },
  })

  return NextResponse.json(user)
}
