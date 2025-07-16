"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import { useSetting } from "@/hooks/useSetting"

const formSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
})

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) })

  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { value: namaUniversitas, isLoading: namaLoading } = useSetting("nama_universitas")
  const { value: logoUrl, isLoading: logoLoading } = useSetting("logo_url")

  const onSubmit = async (data: any) => {
    setLoading(true)
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (res?.ok) {
      router.push("/dashboard")
    } else {
      setError("Login gagal. Cek email atau password.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-8">
        <div className="flex flex-col items-center mb-6">
          {logoLoading ? (
            <div className="h-16 w-16 bg-zinc-300 rounded-full animate-pulse" />
          ) : logoUrl ? (
            <Image
              src={logoUrl}
              alt="Logo Kampus"
              width={64}
              height={64}
              className="rounded-full bg-white border p-1"
              unoptimized
            />
          ) : null}

          <h1 className="text-xl font-semibold text-center mt-3 text-zinc-800">
            {namaLoading ? "..." : namaUniversitas || "Sistem Manajemen Skripsi"}
          </h1>
          <p className="text-zinc-500 text-sm">Silakan login untuk melanjutkan</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </div>
    </div>
  )
}
