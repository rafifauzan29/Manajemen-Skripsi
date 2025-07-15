import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { mkdir, writeFile } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function GET() {
  try {
    const settings = await prisma.setting.findMany()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error GET settings:", error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const contentType = req.headers.get("content-type") || ""

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      const id = formData.get("id") as string
      const file = formData.get("file") as File

      if (!file || !id) {
        return NextResponse.json({ error: "File atau ID kosong" }, { status: 400 })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadDir = path.join(process.cwd(), "public/uploads")
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
      }

      const fileName = `logo-${Date.now()}-${file.name.replace(/\s+/g, "-")}`
      const filePath = path.join(uploadDir, fileName)

      await writeFile(filePath, buffer)

      const url = `/uploads/${fileName}`

      await prisma.setting.update({
        where: { id },
        data: { value: url },
      })

      return NextResponse.json({ success: true, url })
    } else {
      const body = await req.json()
      const { id, value } = body

      if (!id || typeof value === "undefined") {
        return NextResponse.json({ error: "ID atau value tidak valid" }, { status: 400 })
      }

      await prisma.setting.update({
        where: { id },
        data: { value },
      })

      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error("Error PATCH /api/admin/setting:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
