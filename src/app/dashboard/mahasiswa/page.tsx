import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function MahasiswaDashboard() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "MAHASISWA") {
    redirect("/unauthorized")
  }

  return <div>🎓 Selamat datang Mahasiswa!</div>
}
