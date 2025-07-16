"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSetting } from "@/hooks/useSetting"

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
  role: z.enum(["MAHASISWA", "DOSEN", "ADMIN"]),
})

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "MAHASISWA",
    },
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { value: namaUniversitas, isLoading: namaLoading } = useSetting("nama_universitas")
  const { value: logoUrl, isLoading: logoLoading } = useSetting("logo_url")

  const onSubmit = async (data: any) => {
    setLoading(true)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (res.ok) {
      router.push("/auth/login")
    } else {
      const errorMsg = await res.json()
      setError(errorMsg.error || "Gagal mendaftar")
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
          <p className="text-zinc-500 text-sm">Formulir pendaftaran akun pengguna</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

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

          <div>
            <Label htmlFor="role">Peran</Label>
            <Select
              defaultValue="MAHASISWA"
              onValueChange={(val: "MAHASISWA" | "DOSEN" | "ADMIN") => setValue("role", val)}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Pilih peran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MAHASISWA">Mahasiswa</SelectItem>
                <SelectItem value="DOSEN">Dosen</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Mendaftar..." : "Daftar"}
          </Button>
        </form>
      </div>
    </div>
  )
}
