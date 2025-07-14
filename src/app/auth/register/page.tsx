"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
  role: z.enum(["MAHASISWA", "DOSEN", "ADMIN"]),
});

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
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      const errorMsg = await res.json();
      setError(errorMsg.error || "Gagal mendaftar");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-md shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Daftar Akun</h1>
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

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Mendaftar..." : "Daftar"}
        </Button>
      </form>
    </div>
  );
}
