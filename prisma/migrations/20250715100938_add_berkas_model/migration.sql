-- CreateTable
CREATE TABLE "Berkas" (
    "id" TEXT NOT NULL,
    "skripsiId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Menunggu',
    "komentar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Berkas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Berkas" ADD CONSTRAINT "Berkas_skripsiId_fkey" FOREIGN KEY ("skripsiId") REFERENCES "Skripsi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
