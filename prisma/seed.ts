import { prisma } from '../src/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kampus.ac.id' },
    update: {},
    create: {
      name: 'Admin Kampus',
      email: 'admin@kampus.ac.id',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
  })

  const dosen = await prisma.user.upsert({
    where: { email: 'dosen@kampus.ac.id' },
    update: {},
    create: {
      name: 'Dr. Budi',
      email: 'dosen@kampus.ac.id',
      password: await bcrypt.hash('dosen123', 10),
      role: 'DOSEN',
    },
  })

  const mahasiswa = await prisma.user.upsert({
    where: { email: 'mahasiswa@kampus.ac.id' },
    update: {},
    create: {
      name: 'Rafi Fauzan',
      email: 'mahasiswa@kampus.ac.id',
      password: await bcrypt.hash('mahasiswa123', 10),
      role: 'MAHASISWA',
    },
  })

  console.log({ admin, dosen, mahasiswa })
}

main()
  .then(() => {
    console.log('✅ Seeding selesai.')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
