import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function DashboardRedirect() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/auth/login")

  const role = session.user.role?.toLowerCase()
  redirect(`/dashboard/${role}`)
}
