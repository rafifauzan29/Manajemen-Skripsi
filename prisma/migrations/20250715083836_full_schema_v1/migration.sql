-- CreateTable
CREATE TABLE "Sidang" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "ruang" TEXT NOT NULL,
    "skripsiId" TEXT NOT NULL,
    "penguji1Id" TEXT NOT NULL,
    "penguji2Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sidang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sidang_skripsiId_key" ON "Sidang"("skripsiId");

-- AddForeignKey
ALTER TABLE "Sidang" ADD CONSTRAINT "Sidang_skripsiId_fkey" FOREIGN KEY ("skripsiId") REFERENCES "Skripsi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sidang" ADD CONSTRAINT "Sidang_penguji1Id_fkey" FOREIGN KEY ("penguji1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sidang" ADD CONSTRAINT "Sidang_penguji2Id_fkey" FOREIGN KEY ("penguji2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
