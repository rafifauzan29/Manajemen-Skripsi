import { prisma } from "@/lib/prisma"

export async function getSettingValue(key: string) {
  const setting = await prisma.setting.findUnique({ where: { key } })
  return setting?.value ?? ""
}
