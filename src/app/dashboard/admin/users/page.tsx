"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "MAHASISWA" })
  const [open, setOpen] = useState(false)

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users")
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => { fetchUsers() }, [])

  const handleCreate = async () => {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ name: "", email: "", password: "", role: "MAHASISWA" })
      setOpen(false)
      fetchUsers()
    }
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
    if (res.ok) fetchUsers()
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Daftar Pengguna</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default">+ Tambah</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Pengguna</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <Input placeholder="Nama" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <Input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <select className="w-full p-2 border rounded" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option value="MAHASISWA">MAHASISWA</option>
                  <option value="DOSEN">DOSEN</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <Button onClick={handleCreate}>Simpan</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email} - {user.role}</p>
              </div>
              <Button variant="destructive" onClick={() => handleDelete(user.id)}>Hapus</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
