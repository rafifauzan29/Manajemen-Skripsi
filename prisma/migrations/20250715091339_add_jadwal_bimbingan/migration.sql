-- AlterTable
ALTER TABLE "LogBimbingan" ADD COLUMN     "jadwal" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'Diajukan',
ALTER COLUMN "komentar" DROP NOT NULL;
