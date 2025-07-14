import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "Email sudah terdaftar" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  return new Response(JSON.stringify({ message: "Registrasi berhasil", user }), { status: 201 });
}
