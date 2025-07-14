-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MAHASISWA', 'DOSEN', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MAHASISWA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skripsi" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "mahasiswaId" TEXT NOT NULL,
    "pembimbingId" TEXT NOT NULL,
    "bab1" TEXT,
    "bab2" TEXT,
    "bab3" TEXT,
    "bab4" TEXT,
    "bab5" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skripsi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogBimbingan" (
    "id" TEXT NOT NULL,
    "skripsiId" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "komentar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogBimbingan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penilaian" (
    "id" TEXT NOT NULL,
    "skripsiId" TEXT NOT NULL,
    "nilai" DOUBLE PRECISION NOT NULL,
    "komentar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Penilaian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Penilaian_skripsiId_key" ON "Penilaian"("skripsiId");

-- AddForeignKey
ALTER TABLE "Skripsi" ADD CONSTRAINT "Skripsi_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi" ADD CONSTRAINT "Skripsi_pembimbingId_fkey" FOREIGN KEY ("pembimbingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogBimbingan" ADD CONSTRAINT "LogBimbingan_skripsiId_fkey" FOREIGN KEY ("skripsiId") REFERENCES "Skripsi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penilaian" ADD CONSTRAINT "Penilaian_skripsiId_fkey" FOREIGN KEY ("skripsiId") REFERENCES "Skripsi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
