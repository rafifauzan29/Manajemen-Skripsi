import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function DosenDashboard() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "DOSEN") {
    redirect("/unauthorized")
  }

  return <div>📘 Selamat datang Dosen!</div>
}
