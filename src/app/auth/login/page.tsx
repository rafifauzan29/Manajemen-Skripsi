"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Label } from "@/components/ui/label"

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

  const onSubmit = async (data: any) => {
    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (res?.ok) {
      router.push("/dashboard") // redirector per role
    } else {
      setError("Login gagal. Cek email atau password.")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-md shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>
    </div>
  )
}
